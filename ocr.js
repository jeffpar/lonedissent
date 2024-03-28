import fs from "fs";
import glob from "glob";
import path from "path";
import { Storage } from '@google-cloud/storage';
import { v1 as vision } from '@google-cloud/vision';

import stdio from "./lib/stdio.js";
let printf = stdio.printf;
let sprintf = stdio.sprintf;

/**
 * ocrFile(bucket, srcFile, dstFolder)
 *
 * @param {string} bucket
 * @param {string} srcFile
 * @param {string} dstFolder
 */
async function ocrFile(bucket, srcFile, dstFolder)
{
    const client = new vision.ImageAnnotatorClient();
    const gcsSourceUri = `gs://${bucket}/${srcFile}`;
    const gcsDestinationUri = `gs://${bucket}/${dstFolder}`;

    printf("processing %s...\n", gcsSourceUri);

    const inputConfig = {
        // Supported mime_types are: 'application/pdf' and 'image/tiff'
        mimeType: 'application/pdf',
        gcsSource: {
            uri: gcsSourceUri
        }
    };
    const outputConfig = {
        gcsDestination: {
            uri: gcsDestinationUri
        }
    };
    const features = [
        {type: 'DOCUMENT_TEXT_DETECTION'}
    ];
    const request = {
        requests: [{
            inputConfig: inputConfig,
            features: features,
            outputConfig: outputConfig
        }]
    };
    const [operation] = await client.asyncBatchAnnotateFiles(request);
    const [filesResponse] = await operation.promise();
    const destinationUri = filesResponse.responses[0].outputConfig.gcsDestination.uri;
    printf("results saved to %s\n", destinationUri);
}

/**
 * uploadFile(bucket, srcFile, dstFile)
 *
 * @param {string} bucket
 * @param {string} srcFile
 * @param {string} dstFile
 */
async function uploadFile(bucket, srcFile, dstFile)
{
    const storage = new Storage();
    printf("uploading %s...\n", srcFile);
    /**
     * Upload file to the bucket.
     */
    async function upload() {
        const options = {
            destination: dstFile,
            preconditionOpts: { ifGenerationMatch: 0 }
        };
        await storage.bucket(bucket).upload(srcFile, options);
        printf("%s uploaded to %s/%s\n", srcFile, bucket, dstFile);
    }
    await upload().catch(console.error);
}

/**
 * downloadFile(bucket, srcFile, dstFile)
 */
async function downloadFile(bucket, srcFile, dstFile)
{
    const storage = new Storage();
    printf("downloading file %s...\n", srcFile);
    /**
     * download()
     */
    async function download() {
        const options = {
            destination: dstFile,
        };
        await storage.bucket(bucket).file(srcFile).download(options);
        printf("%s/%s downloaded to %s\n", bucket, srcFile, dstFile);
    }
    await download().catch(console.error);
}

/**
 * downloadFolder(bucket, srcFolder, dstFolder)
 *
 * @param {string} bucket
 * @param {string} srcFolder
 * @param {string} dstFolder
 */
async function downloadFolder(bucket, srcFolder, dstFolder)
{
    const storage = new Storage();
    printf("downloading folder %s...\n", srcFolder);
    /**
     * listFiles()
     */
    async function listFiles() {
        /**
         * This can be used to list all blobs in a "folder", e.g. "public/".
         *
         * The delimiter argument can be used to restrict the results to only the
         * "files" in the given "folder". Without the delimiter, the entire tree under
         * the prefix is returned. For example, given these blobs:
         *
         *   /a/1.txt
         *   /a/b/2.txt
         *
         * If you just specify prefix = 'a/', you'll get back:
         *
         *   /a/1.txt
         *   /a/b/2.txt
         *
         * However, if you specify prefix='a/' and delimiter='/', you'll get back:
         *
         *   /a/1.txt
         */
        const options = {
            prefix: srcFolder,
            delimiter: '/'
        };

        const [files] = await storage.bucket(bucket).getFiles(options);
        for (let file of files) {
            await downloadFile(bucket, file.name, path.join(dstFolder, path.basename(file.name)));
        }
    }
    await listFiles().catch(console.error);
}

/**
 * main(argc, argv)
 */
async function main(argc, argv)
{
    if (argc < 2) {
        printf("usage: node ocr.js [year]\n");
        return 0;
    }
    let srcDir = "sources/scotus/journals/";
    let srcFile = srcDir + argv[1] + ".pdf";
    if (!fs.existsSync(srcFile)) {
        printf("input file does not exist: %s\n", srcFile);
        return -1;
    }
    let textFile = srcDir + "text/" + argv[1] + ".txt";
    if (fs.existsSync(textFile)) {
        printf("output file already exists: %s\n", textFile);
        return -1;
    }
    let dstFolder = srcDir + "json/" + argv[1];
    if (!fs.existsSync(dstFolder)) {
        fs.mkdirSync(dstFolder, { recursive: true });
        let bucket = "scotus-docs";
        let dstFile = "journals/" + argv[1] + ".pdf";
        let srcFolder = "results/" + argv[1] + "/";
        await uploadFile(bucket, srcFile, dstFile);
        await ocrFile(bucket, dstFile, srcFolder);
        await downloadFolder(bucket, srcFolder, dstFolder);
    }
    let jsonFiles = glob.sync(dstFolder + "/*.json");
    if (!jsonFiles.length) {
        fs.rmdirSync(dstFolder);
        printf("JSON files missing: %s\n", dstFolder);
        return -1;
    }
    let text = "";
    let pageNumber = 1;
    do {
        let prefix = "output-" + pageNumber + "-";
        let jsonFile = jsonFiles.find(f => f.indexOf(prefix) >= 0);
        if (!jsonFile) break;
        let json = fs.readFileSync(jsonFile, "utf8");
        let data = JSON.parse(json);
        if (data && data.responses) {
            let pageIndex = 0;
            for (let response of data.responses) {
                if (!response.fullTextAnnotation || !response.fullTextAnnotation.text) {
                    printf("\nempty response in %s: %2j\n", jsonFile, response);
                    continue;
                }
                printf("\rprocessing page %d...", pageNumber + pageIndex);
                if (text) {
                    text += "\n\x0C\n";     // insert a FORMFEED between each page (yes, quaint, but also useful)
                }
                text += response.fullTextAnnotation.text;
                pageIndex++;
            }
        }
        pageNumber += 20;
    } while (true);
    if (text) {
        printf("\nwriting %s...\n", textFile);
        fs.writeFileSync(textFile, text, "utf8");
    }
}

main(process.argv.length-1, process.argv.slice(1));
