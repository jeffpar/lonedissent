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

let stdio = require("./lib/stdio");
let printf = stdio.printf;

let pkg = require("./package.json");

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

function extractYearsFromSCDB(done)
{
    let text = readTextFile(pkg.scdb.currentCSV);
    if (text) {
        let lines = text.split(/\r?\n/);
        let count = 0;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i]) count++;
        }
        printf("SCDB rows: %d\n", count);
    }
    done();
}

gulp.task("default", extractYearsFromSCDB);
