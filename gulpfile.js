/**
 * @fileoverview Gulp file for Lone Dissent
 * @author <a href="mailto:Jeff@pcjs.org">Jeff Parsons</a> (@jeffpar)
 * @copyright © Jeff Parsons 2018
 * @license GPL-3.0
 */

 "use strict";

let glob = require("glob");
let gulp = require("gulp");
let fs = require("fs");
let mkdirp = require("mkdirp");
let path = require("path");
let parseXML = require('xml2js').parseString;

let stdio = require("./lib/stdio");
let printf = stdio.printf;
let sprintf = stdio.sprintf;

let pkg = require("./package.json");

/**
 * @typedef {Object} Justice
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef {Object} Court
 * @property {string} id
 * @property {string} name
 * @property {Array.<Justice>} justices
 * @property {string} start
 * @property {string} startFormatted
 * @property {string} stop
 * @property {string} stopFormatted
 * @property {string} reason
 */

function readTextFile(fileName)
{
    let text;
    try {
        text = fs.readFileSync(fileName, "utf8");
    }
    catch(err) {
        printf("%s\n", err.message);
    }
    return text;
}

function writeTextFile(fileName, text, fOverwrite=false)
{
    if (fOverwrite || !fs.existsSync(fileName)) {
        try {
            let dir = path.dirname(fileName);
            if (!fs.existsSync(dir)) {
                mkdirp.sync(dir);
            }
            fs.writeFileSync(fileName, text);
        }
        catch(err) {
            printf("%s\n", err.message);
        }
    } else {
        printf("file already exists: %s\n", fileName);
    }
}

function readXMLFile(fileName)
{
    let xml;
    let text = readTextFile(fileName);
    if (text != null) {
        parseXML(text, function(err, result) {
            if (err) {
                printf("%s\n", err.message);
                return;
            }
            xml = result;
        });
    }
    return xml;
}

/**
 * readDataCourts()
 *
 * @return {Array.<Court>}
 */
function readDataCourts()
{
    let fixes = 0;
    let courts = JSON.parse(readTextFile(pkg.data.courts));
    for (let i = 0; i < courts.length; i++) {
        let court = courts[i];
        let start = court.start;
        let startFormatted = stdio.formatDate("l, F j, Y", start);
        if (startFormatted != court.startFormatted) {
            printf("%s != %s", startFormatted, court.startFormatted);
            court.startFormatted = startFormatted;
            fixes++;
        }
        let stop = court.stop;
        let stopFormatted = stdio.formatDate("l, F j, Y", stop);
        if (stopFormatted != court.stopFormatted) {
            printf("%s != %s\n", stopFormatted, court.stopFormatted);
            court.stopFormatted = stopFormatted;
            fixes++;
        }
        if (i < courts.length - 1) {
            let courtNext = courts[i+1];
            let dateFormatted = stdio.formatDate("l, F j, Y", stdio.adjustDate(new Date(court.stop), 1));
            if (dateFormatted != courtNext.startFormatted) {
                printf("end of %s court (%s) doesn't align with beginning of %s court (%s)\n", court.name, court.stopFormatted, courtNext.name, courtNext.startFormatted);
            }
        }
    }
    if (fixes) {
        printf("writing %d corrections to %s\n", fixes, pkg.data.courts);
        writeTextFile(pkg.data.courts, sprintf("%2j\n", courts), true);
    }
    return courts;
}

/**
 * readOyezCourts()
 *
 * @return {Array.<Court>}
 */
function readOyezCourts()
{
    let courts = [];
    let fileNames = glob.sync(pkg.oyez.courts);
    for (let i = 0; i < fileNames.length; i++) {
        let xml = readXMLFile(fileNames[i]);
        if (!xml) break;
        // printf("%s: %2j\n", fileNames[i], xml);
        let justices = [];
        for (let j = 0; j < xml.court.courtJustice.length; j++) {
            justices.push(xml.court.courtJustice[j].$.id);
        }
        let court = {
            "id": xml.court.courtName[0].$.id,
            "name": xml.court.courtName[0]._,
            "justices": justices,
            "start": xml.court.courtStartDate[0]._,
            "startFormatted": xml.court.courtStartDate[0].$.formatted,
            "stop": xml.court.courtEndDate[0]._,
            "stopFormatted": xml.court.courtEndDate[0].$.formatted,
            "reason": xml.court.courtDefined[0]
        };
        courts.push(court);
    }
    courts.sort(function(a,b) {
        return (a.start < b.start)? -1 : ((a.start > b.start)? 1 : 0);
    });
    return courts;
}

/**
 * buildCourts()
 *
 * @param {function()} done
 */
function buildCourts(done)
{
    let courts = readOyezCourts();
    printf("courts read: %d\n", courts.length);
    let json = sprintf("%2j\n", courts);
    writeTextFile(pkg.data.courts, json);
    courts = readDataCourts();
    done();
}

function extractSCDBYears(done)
{
    let text = readTextFile(pkg.scdb.combinedCSV);
    if (text != null) {
        let lines = text.split(/\r?\n/);
        let count = 0;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i]) count++;
        }
        printf("SCDB rows: %d\n", count);
    }
    done();
}

gulp.task("courts", buildCourts);
gulp.task("default", extractSCDBYears);
