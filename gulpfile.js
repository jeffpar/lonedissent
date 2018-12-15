/**
 * @fileoverview Gulp file for Lone Dissent
 * @author <a href="mailto:Jeff@pcjs.org">Jeff Parsons</a> (@jeffpar)
 * @copyright © Jeff Parsons 2018
 * @license GPL-3.0
 */

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
        console.log(err.message);
    }
    return text;
}

function writeTextFile(fileName, text)
{
    try {
        let dir = path.dirname(fileName);
        if (!fs.existsSync(dir)) {
            mkdirp.sync(dir);
        }
        fs.writeFileSync(fileName, text);
    }
    catch(err) {
        console.log(err.message);
    }
}

function readXMLFile(fileName)
{
    let xml;
    let text = readTextFile(fileName);
    if (text != null) {
        parseXML(text, function(err, result) {
            if (err) {
                console.log(err.message);
                return;
            }
            xml = result;
        });
    }
    return xml;
}

/**
 * readCourts()
 * 
 * Builds an array of Court objects.
 *
 * @return {Array.<Court>}
 */
function readCourts()
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
 * extractCourtsFromOyez()
 *
 * @param {function()} done
 */
function extractCourtsFromOyez(done)
{
    let courts = readCourts();
    printf("Courts read: %d\n", courts.length);
    let json = sprintf("%2j\n", courts);
    writeTextFile(pkg.results.courts, json);
    done();
}

function extractYearsFromSCDB(done)
{
    let text = readTextFile(pkg.scdb.currentCSV);
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

gulp.task("courts", extractCourtsFromOyez);
gulp.task("default", extractYearsFromSCDB);
