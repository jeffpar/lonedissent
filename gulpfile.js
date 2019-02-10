/**
 * @fileoverview Gulp file for Lone Dissent
 * @author <a href="mailto:Jeff@pcjs.org">Jeff Parsons</a> (@jeffpar)
 * @copyright © Jeff Parsons 2018-2019
 * @license GPL-3.0
 *
 * The following excerpts from "Explanation of certain items in the 'Justices of the Supreme Court' Table"
 * (https://www.thegreenpapers.com/Hx/JusticesExplanation.html) are helpful in understanding the evolution
 * of Supreme Court terms; however, it doesn't touch on any of the "Special Terms" established by the Court
 * from time to time -- a byproduct of the Court's ability to define its own terms, starting in 1911.
 *
 *     "[T]he Supreme Court was to ... meet twice a year, beginning on the first Monday in February
 *      and again on the first Monday in August....  From February 1790, when the Court had its first quorum ...
 *      (though, as the highest appellate court in a new Federal System in which even its lower courts were
 *      still getting themselves organized, there was no judicial business to transact in that very first Term
 *      of Court other than the appointment of clerks and admitting various attorneys to the bar of the Supreme
 *      Court itself), through August 1801, this schedule of Terms of Court was followed."
 *
 *     "[T]he [Judiciary Act of 1801 allowed] the Supreme Court to meet at different times of the year than
 *      heretofore, June and December, beginning in 1802."
 *
 *     "[T]he Judiciary Act of 1802 restored the February Term (to begin on the first Monday in February)
 *      but permanently abolished the August one; from now on, the Supreme Court would meet in annual Terms
 *      of Court instead of twice a year....  [I]t being after February 1802 by the time the new Act became
 *      law (and with no more August Term), the next time the Supreme Court would meet would be February 1803."
 *
 *     "In 1826, ... [t]he only relief for the Justices of the Supreme Court was moving the convening of the
 *      Term of Court up to the second Monday in January: this was in response to complaints that the Supreme
 *      Court had to complete its old February annual term by the end of March in order to give the Justices
 *      time to get out of Washington for Circuit Court duty."
 *
 *     "Similar complaints nearly two decades later (after two new Circuits had been created, mind you!) led
 *      to the Act of 17 June 1844 which would, effective in 1845, move the start of the Court's Term up to
 *      the first Monday in December."
 *
 *     "In 1873, Congress once again changed the start of Terms of the Supreme Court, moving the starting date
 *      up to the second Monday in October to help the Court clear their annual docket of an increasing amount
 *      of cases."
 *
 *     "The 1911 Judicial Code also permitted the Supreme Court to determine its own Terms of Court under its
 *      own rules....  In 1917, the Supreme Court exercised its new authority and moved the start of its Term up
 *      to the present (and rather well-known) first Monday in October."
 *
 * Our own observations, based on examination of selected volumes of U.S. Reports:
 *
 *   1) In 1790, and continuing through 1800, we see Feb and Aug terms; eg:
 *
 *      Feb Term 1790: http://cdn.loc.gov/service/ll/usrep/usrep002/usrep002399/usrep002399.pdf (the Court acknowledges appointments of the first five Justices)
 *      Aug Term 1790: http://cdn.loc.gov/service/ll/usrep/usrep002/usrep002400/usrep002400.pdf (the Court acknowledges appointment of Justice Iredell)
 *      Feb Term 1791: http://cdn.loc.gov/service/ll/usrep/usrep002/usrep002400/usrep002400.pdf (basically just admissions to the bar)
 *      Aug Term 1791: http://cdn.loc.gov/service/ll/usrep/usrep002/usrep002401/usrep002401.pdf (first opinion listed in SCDB)
 *      ...
 *      Feb Term 1800: http://cdn.loc.gov/service/ll/usrep/usrep004/usrep004012/usrep004012.pdf
 *      Aug Term 1800: http://cdn.loc.gov/service/ll/usrep/usrep004/usrep004028/usrep004028.pdf
 *
 *   2) In 1801, we see Aug and Dec terms (no Feb term, and NO terms in 1802):
 *
 *      Aug Term 1801: http://cdn.loc.gov/service/ll/usrep/usrep005/usrep005001/usrep005001.pdf
 *      Dec Term 1801: http://cdn.loc.gov/service/ll/usrep/usrep005/usrep005117/usrep005117.pdf
 *
 *      The presence of a Dec Term 1801 looks like an anomaly, perhaps due to the confusion wrought by
 *      the competing Judiciary Acts of 1801 and 1802.
 *
 *   3) In 1803, and continuing through 1826, we see only Feb terms:
 *
 *      Feb Term 1803: http://cdn.loc.gov/service/ll/usrep/usrep005/usrep005137/usrep005137.pdf (Marbury v. Madison)
 *      ...
 *      Feb Term 1806: http://cdn.loc.gov/service/ll/usrep/usrep007/usrep007241/usrep007241.pdf
 *      ...
 *
 *   4) In 1827, we see the first January term (Jan Term 1827).
 *
 *   5) In 1850, we see the final January term (Jan Term 1850) and the first December term (Dec Term 1850);
 *      technically however, December terms began in 1844.  The Court simply chose to continue calling them
 *      "January" terms until December 1850.  Consequently, there weren't really two terms in 1850, as some
 *      would suggest; I think it's more correct to say there were two terms in 1844, since what's called the
 *      "January 1845" term actually began in December 1844.
 *
 *      This is confirmed by the fact that, unlike 1843, there were numerous decisions handed down in
 *      December 1844.  Thus I suspect that the comment above that "the Act of 17 June 1844" became "effective
 *      in 1845" is incorrect.
 *
 *   6) In 1873, we see the first October Term (Oct Term 1873), beginning on the *second* Monday of October.
 *
 *   7) In 1917, we see the first October Term (Oct Term 1917), beginning on the *first* Monday of October.
 *
 * TODO: Make a list of all "Special Terms" created by the Court (presumably they are all after 1911).
 */

 "use strict";

let glob = require("glob");
let gulp = require("gulp");
let fs = require("fs");
let mkdirp = require("mkdirp");
let path = require("path");
let request = require("request");
let he = require("he");
let parseXML = require('xml2js').parseString;

let rootDir = ".";
let datelib = require(rootDir + "/lib/datelib");
let parseDate = datelib.parseDate;
let adjustDays = datelib.adjustDays;
let proclib = require(rootDir + "/lib/proclib");
let stdio = require(rootDir + "/lib/stdio");
let printf = stdio.printf;
let sprintf = stdio.sprintf;
let strlib = require(rootDir + "/lib/strlib");

let _data = require(rootDir + "/_data/_data.json");
let results = require(rootDir + "/results/_results.json");
let sources = require(rootDir + "/sources/_sources.json");
let argv = proclib.args.argv;
let warnings = 0;
let downloadTasks = [];

/**
 * @typedef {object} Justice
 * @property {string} id
 * @property {string} name
 * @property {string} position
 * @property {number} seat
 * @property {string} start
 * @property {string} startFormatted
 * @property {string} stop
 * @property {string} stopFormatted
 * @property {string} stopReason
 * @property {string} photo
 * @property {number} scdbJustice
 */

/**
 * @typedef {object} Court
 * @property {string} id
 * @property {string} name
 * @property {Array.<string>} justices
 * @property {string} start
 * @property {string} startFormatted
 * @property {string} stop
 * @property {string} stopFormatted
 * @property {string} reason
 * @property {string} photo
 */

/**
 * @typedef {object} Vote
 * @property {string} justice
 * @property {string} justiceName
 * @property {string} vote
 * @property {string} opinion
 * @property {string} direction
 * @property {string} majority
 * @property {string} firstAgreement
 * @property {string} secondAgreement
 */

/**
 * For a complete list of possible values for the following decision variables, see sources/scdb/vars.json.
 *
 * @typedef {object} Decision
 * @property {string} caseId
 * @property {string} docketId
 * @property {string} caseIssuesId
 * @property {string} voteId
 * @property {string} dateDecision
 * @property {number} decisionType
 * @property {string} usCite
 * @property {string} sctCite
 * @property {string} ledCite
 * @property {string} lexisCite
 * @property {number} term
 * @property {number} naturalCourt
 * @property {string} chief
 * @property {string} docket
 * @property {string} caseName
 * @property {string} caseTitle
 * @property {string} dateArgument
 * @property {string} dateRearg
 * @property {number} petitioner
 * @property {number} petitionerState
 * @property {number} respondent
 * @property {number} respondentState
 * @property {number} jurisdiction
 * @property {number} adminAction
 * @property {number} adminActionState
 * @property {number} threeJudgeFdc
 * @property {number} caseOrigin
 * @property {number} caseOriginState
 * @property {number} caseSource
 * @property {number} caseSourceState
 * @property {number} lcDisagreement
 * @property {number} certReason
 * @property {number} lcDisposition
 * @property {number} lcDispositionDirection
 * @property {number} declarationUncon
 * @property {number} caseDisposition
 * @property {number} caseDispositionUnusual
 * @property {number} partyWinning
 * @property {number} precedentAlteration
 * @property {number} voteUnclear
 * @property {number} issue
 * @property {number} issueArea
 * @property {number} decisionDirection
 * @property {number} decisionDirectionDissent
 * @property {number} authorityDecision1
 * @property {number} authorityDecision2
 * @property {number} lawType
 * @property {number} lawSupp
 * @property {string} lawMinor
 * @property {number} majOpinWriter
 * @property {number} majOpinAssigner
 * @property {number} splitVote
 * @property {number} majVotes
 * @property {number} minVotes
 * @property {number} justice
 * @property {string} justiceName
 * @property {number} vote
 * @property {number} opinion
 * @property {number} direction
 * @property {number} majority
 * @property {number} firstAgreement
 * @property {number} secondAgreement
 * @property {Array.<Vote>} justices (this array contains sets of the preceding 8 fields once all the records have been "factored")
 */

/**
 * mapValues(o, vars, strict)
 *
 * @param {object} o
 * @param {Array.<object>} vars
 * @param {boolean} [strict]
 * @return {number}
 */
function mapValues(o, vars, strict)
{
    let changes = 0;
    let keys = Object.keys(o);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (vars[key]) {
            let values = vars[key].values;
            if (values && typeof values == "string") {
                values = vars[values].values;
            }
            if (values && !Array.isArray(values)) {
                let value = values[o[key]];
                if (value !== undefined) {
                    o[key] = value;
                    if (changes >= 0) changes++;
                }
                else if (strict) {
                    if (vars[key].type != "number" || o[key]) {
                        printf("warning: code '%s' for key '%s' has no value\n", o[key], key);
                        changes = -1;
                    }
                }
            }
        }
        else if (Array.isArray(o[key])) {
            for (let j = 0; j < o[key].length; j++) {
                let n = mapValues(o[key][j], vars, strict);
                if (n < 0) {
                    changes = -1;
                } else {
                    changes += n;
                }
            }
        }
        else if (strict) {
            printf("warning: variable '%s' missing\n", key);
            changes = -1;
        }
    }
    return changes;
}

/**
 * removeValues(a, values)
 *
 * @param {Array} a
 * @param {Array} values
 */
function removeValues(a, values)
{
    values.forEach((value) => {
        let i = a.indexOf(value);
        if (i >= 0) {
            a.splice(i, 1);
        }
    });
}

/**
 * scanObjects(a, key, value)
 *
 * @param {Array.<object>} a
 * @param {string} key
 * @param {*} value
 * @return {number} (index of position, or -1 if not found)
 */
function scanObjects(a, key, value)
{
    let i;
    for (i = 0; i < a.length; i++) {
        if (a[i][key] == value) break;
    }
    return (i < a.length)? i : -1;
}

/**
 * binarySearch(a, v, compare, left, right)
 *
 * @param {Array} a
 * @param {*} v
 * @param {function(*,*} [compare]
 * @param {number} [left]
 * @param {number} [right]
 * @return {number} the (positive) index of matching entry, or the (negative) index + 1 of the insertion point
 */
function binarySearch(a, v, compare, left=0, right=a.length)
{
    let found = 0;
    if (compare === undefined) {
        compare = function(a, b) {
            return a > b ? 1 : a < b ? -1 : 0;
        };
    }
    while (left < right) {
        let middle = (left + right) >> 1;
        let compareResult;
        compareResult = compare(v, a[middle]);
        if (compareResult > 0) {
            left = middle + 1;
        } else {
            right = middle;
            found = !compareResult;
        }
    }
    return found ? left : ~left;
}

/**
 * binaryInsert(a, v, compare, left, right)
 *
 * If element v already exists in array a, the array is unchanged (we don't allow duplicates); otherwise, the
 * element is inserted into the array at the appropriate index.
 *
 * @param {Array} a
 * @param {*} v (value to insert)
 * @param {function(*,*} [compare]
 * @param {number} [left]
 * @param {number} [right]
 */
function binaryInsert(a, v, compare, left=0, right=a.length)
{
    let index = binarySearch(a, v, compare, left, right);
    if (index < 0) {
        a.splice(-(index + 1), 0, v);
    }
}

/**
 * addCSV(text, obj, keys, pairs)
 *
 * @param {string} text
 * @param {object} obj
 * @param {Array.<string>} keys
 * @param {Array} pairs
 * @return {string}
 */
function addCSV(text, obj, keys, ...pairs)
{
    if (!text) {
        for (let i = 0; i < keys.length; i++) {
            if (text) text += ',';
            text += keys[i];
        }
        for (let i = 0; i < pairs.length; i += 2) {
            if (text) text += ',';
            text += pairs[i];
        }
        text += '\n';
    }
    let line = "";
    for (let i = 0; i < keys.length; i++) {
        let s = obj[keys[i]];
        if (typeof s == "string") s = '"' + he.decode(s).replace(/"/g, '""') + '"';
        if (line) line += ',';
        line += s;
    }
    for (let i = 0; i < pairs.length; i += 2) {
        let s = pairs[i+1];
        if (typeof s == "string") s = '"' + he.decode(s).replace(/"/g, '""') + '"';
        if (line) line += ',';
        line += s;
    }
    line += '\n';
    if (text.indexOf(line) < 0) {
        text += line;
    }
    return text;
}

/**
 * insertCSV(rows, row, keys)
 *
 * @param {Array.<object>} rows
 * @param {object} row
 * @param {Array.<string>} keys
 */
function insertCSV(rows, row, keys)
{
    let compare = function(row1, row2) {
        for (let k = 0; k < keys.length; k++) {
            let key = keys[k];
            if (row1[key] > row2[key]) return 1;
            if (row1[key] < row2[key]) return -1;
            if (k == keys.length - 1) return 0;
        }
    };
    binaryInsert(rows, row, compare);
}

/**
 * isSortedCSV(rows, keys, fQuiet)
 *
 * @param {Array.<object>} rows
 * @param {Array.<string>} keys
 * @param {boolean} [fQuiet]
 * @return {boolean}
 */
function isSortedCSV(rows, keys, fQuiet)
{
    let isSorted = true;
    for (let i = 1; i < rows.length; i++) {
        let row1 = rows[i-1], row2 = rows[i];
        for (let k = 0; k < keys.length; k++) {
            let key = keys[k];
            if (row1[key] < row2[key]) break;
            if (row1[key] == row2[key]) continue;
            isSorted = false;
            if (fQuiet) {
                i = rows.length;
                break;
            }
            printf("warning: row %d '%s' (%s) > row %d '%s' (%s)\n", i+1, key, row1[key], i+2, key, row2[key]);
        }
    }
    return isSorted;
}

/**
 * parseCSV(text, encodeAs, maxRows, keyUnique, keySubset, saveUniqueKey, vars)
 *
 * By default, all CSV fields containing strings are returned as-is, unless encodeAs is "html", which triggers replacement
 * with HTML entities where appropriate.
 *
 * @param {string} text
 * @param {string} [encodeAs] (default is none; currently only "html" is supported)
 * @param {number} [maxRows] (default is zero, implying no maximum; heading row is not counted toward the limit)
 * @param {string} [keyUnique] (name of field, if any, that should be filtered; typically the key associated with the subset fields)
 * @param {string} [keySubset] (name of first subset field, if any, containing data for unique subsets)
 * @param {boolean} [saveUniqueKey] (default is false, to reduce space requirements)
 * @param {object|null} [vars]
 * @return {Array.<Object>}
 */
function parseCSV(text, encodeAs="", maxRows=0, keyUnique="", keySubset="", saveUniqueKey=false, vars=null)
{
    let rows = [];
    let headings, fields;
    let lines = text.split(/\r?\n/);
    let keyChildren = keySubset + 's';
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (!line) continue;
        let row = {};
        let fields = parseCSVFields(line, encodeAs, !headings);
        if (!headings) {
            headings = fields;
            /*
             * Make sure all headings are non-empty and unique.
             */
            for (let h = 0; h < headings.length; h++) {
                let heading = headings[h];
                if (!heading || row[headings[h]] !== undefined) {
                    printf("warning: CSV field heading %d (%s) is invalid or duplicate\n", h, heading);
                    heading = "field" + (h + 1);
                }
                row[heading] = h;
            }
        } else {
            let fieldUnique = "";
            let subset = null, hUnique = -1;
            let matchedPrevious = !!rows.length;
            for (let h = 0; h < headings.length; h++) {
                let field = fields[h];
                let heading = headings[h];
                if (vars) {
                    if (!vars[heading]) {
                        printf("warning: %s field is an undefined type, defaulting to string\n", heading);
                        vars[heading] = {type: "string", dump: true};
                    }
                    if (vars[heading]) {
                        let t = vars[heading];
                        if (field != "") {
                            if (t.dump) {
                                if (!t.values) t.values = [];
                                if (t.values.indexOf(field) < 0) t.values.push(field);
                            }
                            else {
                                let v = t.values;
                                if (v && typeof v == "string") {
                                    v = vars[v].values;
                                }
                                if (v && (Array.isArray(v) && v.indexOf(field) < 0 || !Array.isArray(v) && v[field] === undefined) || !v && field == "NULL") {
                                    if (argv['debug']) {
                                        if (fieldUnique && fieldUnique != "NULL") {
                                            printf("warning: record %s field %s has unexpected value '%s'\n", fieldUnique, heading, field);
                                        } else {
                                            printf("warning: CSV row %d field %s has unexpected value '%s'\n", i+1, heading, field);
                                        }
                                    }
                                }
                            }
                        }
                        if (t.type == "number") {
                            field = +field;
                        } else if (t.type == "date") {
                            if (field) {
                                field = sprintf("%#Y-%#02M-%#02D", field, field, field);
                            }
                        }
                    }
                }
                if (heading == keyUnique) {
                    fieldUnique = field;
                    if (saveUniqueKey) hUnique = h;
                    continue;
                }
                if (heading == keySubset) {
                    subset = {};
                    if (hUnique >= 0) {
                        subset[keyUnique] = fields[hUnique];
                    }
                }
                if (!subset && matchedPrevious) {
                    if (rows[rows.length-1][heading] != field) {
                        matchedPrevious = false;
                    }
                }
                if (!subset) {
                    row[heading] = field;
                } else {
                    subset[heading] = field;
                }
            }
            if (headings.length != fields.length) {
                printf("warning: CSV row %d has %d fields, expected %d\n", i+1, fields.length, headings.length);
            }
            if (subset) {
                if (!matchedPrevious) {
                    row[keyChildren] = [];
                    row[keyChildren].push(subset);
                } else {
                    rows[rows.length-1][keyChildren].push(subset);
                    continue;
                }
            }
            if (maxRows <= 0 || i <= maxRows) rows.push(row);
        }
    }
    if (vars) {
        for (let key in vars) {
            let t = vars[key];
            if (t.dump) {
                delete t.dump;
                if (vars[key].values) {
                    vars[key].values.sort(function(a, b) {
                        return a.localeCompare(b, 'en', {'sensitivity': 'base'});
                    });
                }
                printf('"%s": %2j\n', key, vars[key]);
            }
        }
    }
    return rows;
}

/**
 * parseCSVFields(line, encodeAs, fHeadings)
 *
 * @param {string} line
 * @param {string} [encodeAs]
 * @param {boolean} [fHeadings]
 * @return {Array.<string|number>}
 */
function parseCSVFields(line, encodeAs, fHeadings)
{
    let field = "";
    let fields = [];
    let fQuoted = false, inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        let ch = line[i];
        if (!inQuotes) {
            if (ch == ',') {
                if (!fQuoted && !fHeadings && !isNaN(field)) {
                    field = +field;
                } else {
                    field = encodeString(field, encodeAs);
                }
                fields.push(field);
                fQuoted = false;
                field = "";
            }
            else if (ch == '"' && !field.length) {
                fQuoted = inQuotes = true;
            }
            else {
                field += ch;
            }
        }
        else {
            if (ch == '"') {
                if (i < line.length - 1 && line[i+1] == '"') {
                    field += ch;
                    i += 1;
                } else {
                    inQuotes = false;
                }
            }
            else {
                field += ch;
            }
        }
    }
    if (!fQuoted && !fHeadings && !isNaN(field)) {
        field = +field;
    } else {
        field = encodeString(field, encodeAs);
    }
    fields.push(field);
    if (inQuotes) {
        printf("CSV quote error: %s\n", line);
    }
    return fields;
}

/**
 * readCSV(filePath, encodeAs)
 *
 * NOTE: We don't provide an encoding parameter for the readFile() call, because all our CSVs should be "utf-8".
 *
 * @param {string} filePath
 * @param {string} [encodeAs] (default is ""; use "html" if you want all string fields to contain HTML entities as appropriate)
 * @return {Array}
 */
function readCSV(filePath, encodeAs="")
{
    return parseCSV(readFile(filePath) || "", encodeAs);
}

/**
 * searchCSV(rows, row)
 *
 * @param {Array.<object>} rows
 * @param {object} row
 * @return {number}
 */
function searchCSV(rows, row)
{
    let keys = Object.keys(row);
    let compare = function(row1, row2) {
        for (let k = 0; k < keys.length; k++) {
            let key = keys[k];
            let v1 = row1[key], v2 = row2[key];
            if (typeof v1 == "string" && v1.slice(-1) == '.') v1 = v1.slice(0, -1);
            if (typeof v2 == "string" && v2.slice(-1) == '.') v2 = v2.slice(0, -1);
            if (v1 > v2) {
                // printf("%s: %s > %s: 1\n", key, v1, v1);
                return 1;
            }
            if (v1 < v2) {
                // printf("%s: %s < %s: -1\n", key, v1, v2);
                return -1;
            }
            if (k == keys.length - 1) {
                // printf("%s: %s == %s: 0\n", key, v1, v2);
                return 0;
            }
        }
    };
    return binarySearch(rows, row, compare);
}

/**
 * sortCSV(rows, keys)
 *
 * @param {Array.<object>} rows
 * @param {Array.<string>} keys
 */
function sortCSV(rows, keys)
{
    rows.sort(function(row1, row2) {
        for (let k = 0; k < keys.length; k++) {
            let key = keys[k];
            if (row1[key] > row2[key]) return 1;
            if (row1[key] < row2[key]) return -1;
            if (k == keys.length - 1) return 0;
        }
    });
}

/**
 * writeCSV(filePath, rows, fOverwrite)
 *
 * @param {string} filePath
 * @param {Array.<object>} rows
 * @param {boolean} [fOverwrite] (default is false)
 */
function writeCSV(filePath, rows, fOverwrite=argv['overwrite'])
{
    let text = "";
    let keys = Object.keys(rows[0]);
    keys.forEach((key) => {
        if (text) text += ',';
        text += key;
    });
    text += '\n';
    rows.forEach((row) => {
        let line = "";
        keys.forEach((key) => {
            if (line) line += ',';
            let s = row[key];
            if (typeof s == "string") s = '"' + he.decode(s).replace(/"/g, '""') + '"';
            line += s;
        });
        text += line + '\n';
    });
    writeFile(filePath, text, fOverwrite);
}

/**
 * readFile(filePath, encoding)
 *
 * @param {string} filePath
 * @param {string} [encoding] (default is "utf-8")
 * @return {string|undefined}
 */
function readFile(filePath, encoding="")
{
    let text;
    try {
        if (filePath[0] == '/') filePath = path.join(rootDir, filePath);
        text = fs.readFileSync(filePath, encoding || "utf-8");
        if (!encoding) checkASCII(text);
    }
    catch(err) {
        printf("%s\n", err.message);
    }
    return text;
}

/**
 * writeFile(filePath, text, fOverwrite)
 *
 * @param {string} filePath
 * @param {string|object} text (if you pass an object, we automatically "stringify" it into JSON)
 * @param {boolean} [fOverwrite] (default is false)
 */
function writeFile(filePath, text, fOverwrite=argv['overwrite'])
{
    if (typeof text == "object") {
        text = sprintf("%2j\n", text);
        checkASCII(text);
    }
    if (filePath[0] == '/') filePath = path.join(rootDir, filePath);
    if (fOverwrite || !fs.existsSync(filePath)) {
        try {
            let dirPath = path.dirname(filePath);
            if (!fs.existsSync(dirPath)) mkdirp.sync(dirPath);
            fs.writeFileSync(filePath, text);
        }
        catch(err) {
            printf("%s\n", err.message);
        }
    } else {
        printf("file %s already exists, use --overwrite to recreate\n", filePath);
    }
}

/**
 * readXMLFile(filePath, filters)
 *
 * @param {string} filePath
 * @param {Array.<string>} [filters]
 * @return {object}
 */
function readXMLFile(filePath, filters)
{
    let xml;
    let text = readFile(filePath);
    if (text != null) {
        if (filters) {
            let textNew = "";
            for (let i = 0; i < filters.length; i++) {
                let iStart = text.indexOf(filters[i]);
                if (iStart >= 0) {
                    let iStop = text.indexOf('\n', iStart);
                    if (iStop >= 0) {
                        textNew += text.substring(iStart, iStop + 1);
                    }
                }
            }
            text = textNew;
        }
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
 * checkASCII(text, fExtended)
 *
 * @param {string} text
 * @param {boolean} [fExtended] (true to check for extended ASCII characters)
 * @return {boolean} (true if valid, false otherwise)
 */
function checkASCII(text, fExtended)
{
    let valid = true;
    let lines = text.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        for (let j = 0; j < line.length; j++) {
            let ch = line.charCodeAt(j);
            if (ch < 0x20 && ch != 0x09 || fExtended && ch > 0x7f) {
                printf("warning: control character %02x at row %d col %d: '%s'\n", ch, i+1, j+1, line);
                valid = false;
            }
        }
    }
    return valid;
}

/**
 * fixASCII(text)
 *
 * @param {string} text
 * @return {string}
 */
function fixASCII(text)
{
    let textNew = "";
    for (let i = 0; i < text.length; i++) {
        let c = text.charCodeAt(i);
        switch(c) {
        case 0x91:
            textNew += "&lsquo;"
            break;
        case 0x92:
            textNew += "&rsquo;"
            break;
        case 0x93:
            textNew += "&ldquo;"
            break;
        case 0x94:
            textNew += "&rdquo;"
            break;
        case 0x96:
            textNew += "&ndash;"
            break;
        case 0xA7:
            textNew += "&sect;"
            break;
        default:
            if (c >= 0x7f) {
                // printf("warning: text '%s' contains unrecognized character '%c' (0x%02x) at pos %d\n", text, c, c, i + 1);
                break;
            }
            textNew += String.fromCharCode(c);
            break;
        }
    }
    if (text != textNew) {
        // printf("warning: old encoding '%s'\n         new encoding '%s'\n", text, textNew);
        warnings++;
    }
    return textNew;
}

/**
 * decodeString(text, fAll)
 *
 * @param {string} text
 * @param {boolean} [fAll]
 */
function decodeString(text, fAll=false)
{
    /*
     * Replace any old-fashioned "&c" references that could be misinterpreted as HTML entities.
     */
    text = text.replace(/&amp;C\.?/g, "ETC.").replace(/&amp;c\.?/g, "etc.");
    if (fAll) text = he.decode(text);
    return text;
}

/**
 * encodeString(text, encodeAs, fAllowQuotes)
 *
 * @param {string} text
 * @param {string} [encodeAs] (eg, "html")
 * @param {string} [fAllowQuotes] (default is true)
 * @return {string}
 */
function encodeString(text, encodeAs, fAllowQuotes=true)
{
    if (encodeAs == "html") {
        /*
         * In case there are already HTML entities in the string, decode first to avoid double-encoding.
         */
        text = decodeString(text, !fAllowQuotes);
        text = he.encode(text, {
            'encodeEverything': false,
            "useNamedReferences": true
        });
        if (fAllowQuotes) text = text.replace(/&apos;/g, "'").replace(/&quot;/g, '"');
        // text = fixASCII(text);
    }
    return text;
}

/**
 * getLOCPDF(volume, page, pageURL)
 *
 * @param {string} volume
 * @param {string} page
 * @param {string} [pageURL]
 */
function getLOCPDF(volume, page, pageURL)
{
    volume = +volume; page = +page;
    if (volume && page) {
        let name = 'download.loc.' + volume + '.' + page;
        let url = sprintf(sources.loc.download.pdf.url, volume, volume, +pageURL || page, volume, +pageURL || page);
        let bottom = Math.trunc((volume-1)/100)*100+1, top = bottom + 99;
        let dir = sprintf(sources.loc.download.pdf.dir, bottom, top, volume, page);
        let file = sprintf(sources.loc.download.pdf.file, volume, page);
        createDownloadTask(name, url, dir, file);
    }
}

/**
 * function getOldCite(volume, page)
 *
 * @param {number} volume
 * @param {number} page
 * @return {string}
 */
function getOldCite(volume, page)
{
    let oldCite = "", reporter = "", volBegin = 0;
    if (volume < 5) {
        volBegin = 1;
        reporter = "Dall.";
    } else if (volume < 14) {
        volBegin = 5;
        reporter = "Cranch";
    } else if (volume < 26) {
        volBegin = 14;
        reporter = "Wheat.";
    } else if (volume < 42) {
        volBegin = 26;
        reporter = "Pet.";
    } else if (volume < 66) {
        volBegin = 42;
        reporter = "How.";
    } else if (volume < 68) {
        volBegin = 66;
        reporter = "Black";
    } else if (volume < 91) {
        volBegin = 68;
        reporter = "Wall.";
    } else {
        reporter = "U.S.";
    }
    if (volBegin) {
        oldCite = sprintf("%d %s %d", volume - volBegin + 1, reporter, page);
    }
    return oldCite;
}

/**
 * readCourts()
 *
 * @return {Array.<Court>}
 */
function readCourts()
{
    let fixes = 0;
    let courts = JSON.parse(readFile(results.json.courts));
    /*
     * First, let's see how our data lines up with current Oyez HTML data.
     */
    let html = readFile(sources.oyez.courtsHTML);
    let reCourt = /lazy-img="([^"]*)"\s+alt="([^"]*)"/g, match;
    while ((match = reCourt.exec(html))) {
        let i, matched = false;
        let name = match[2].replace(/\s+/g, " ");
        for (i = courts.length - 1; i >= 0; i--) {
            if (courts[i].name == name) {
                matched = true;
                if (!courts[i].photo) {
                    courts[i].photo = path.join(rootDir, path.dirname(sources.oyez.courtsHTML), path.basename(sources.oyez.courtsHTML, ".html"), path.basename(match[1]));
                    fixes++;
                    break;
                }
            }
        }
        if (!matched) {
            printf("warning: unable to find HTML court '%s' in XML courts\n", name);
        }
    }
    /*
     * Next, let's see how our data lines up with itself.
     */
    for (let i = 0; i < courts.length; i++) {
        let court = courts[i];
        let start = court.start;
        if (court.photo) {
            let name = path.basename(court.photo, ".jpg");
            if (court.id != name) {
                court.id = name;
                fixes++;
            }
        }
        let startFormatted = sprintf("%#C", start);
        if (startFormatted != court.startFormatted) {
            printf("%s != %s\n", startFormatted, court.startFormatted);
            court.startFormatted = startFormatted;
            fixes++;
        }
        if (court.stop) {
            let stop = court.stop;
            let stopFormatted = sprintf("%#C", stop);
            if (stopFormatted != court.stopFormatted) {
                printf("%s != %s\n", stopFormatted, court.stopFormatted);
                court.stopFormatted = stopFormatted;
                fixes++;
            }
        }
        if (i < courts.length - 1) {
            let courtNext = courts[i+1];
            let date = datelib.adjustDays(parseDate(court.stop), 1);
            let dateFormatted = sprintf("%#C", date);
            if (dateFormatted != courtNext.startFormatted) {
                printf("end of %s court (%s) doesn't align with beginning of %s court (%s)\n", court.name, court.stopFormatted, courtNext.name, courtNext.startFormatted);
            }
        }
        if (!court.photoSmall) {
            let filePath = path.join("data/oyez/courts", court.id, "image-small.jpg");
            if (fs.existsSync(filePath)) {
                court.photoSmall = filePath;
                fixes++;
            }
        }
        if (!court.photoLarge) {
            let filePath = path.join("data/oyez/courts", court.id, "image-large.jpg");
            if (fs.existsSync(filePath)) {
                court.photoLarge = filePath;
                fixes++;
            }
        }
    }
    if (fixes) {
        printf("writing %d corrections to %s\n", fixes, results.json.courts);
        writeFile(results.json.courts, courts);
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
    let filePaths = glob.sync(rootDir + sources.oyez.courtsXML);
    for (let i = 0; i < filePaths.length; i++) {
        let xml = readXMLFile(filePaths[i]);
        if (!xml) break;
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
    courts.sort(function(a, b) {
        return (a.start < b.start)? -1 : ((a.start > b.start)? 1 : 0);
    });
    return courts;
}

/**
 * readOyezJustices()
 *
 * @return {Array.<Justice>}
 */
function readOyezJustices()
{
    let justices = [];
    let filePaths = glob.sync(rootDir + sources.oyez.justicesXML);
    for (let i = 0; i < filePaths.length; i++) {
        let xml = readXMLFile(filePaths[i]);
        if (!xml) break;
        for (let j = 0; j < xml.justice.justiceAppointment.length; j++) {
            let justice = {};
            justice.id = xml.justice.justiceName[0].$.id;
            justice.name = xml.justice.justiceName[0]._;
            let xmlAppt = xml.justice.justiceAppointment[j];
            justice.position = xmlAppt.justicePosition[0];
            justice.seat = +xmlAppt.justiceSeat[0];
            /*
             * For some reason, all the Oyez XML justice dates appear to be off-by-one, so we compensate here.
             */
            let date = datelib.adjustDays(parseDate(xmlAppt.justiceSwornDate[0]._), 1);
            justice.start = sprintf("%#Y-%#02M-%#02D", date, date, date);
            justice.startFormatted = sprintf("%#C", justice.start);
            if (xmlAppt.justiceEndDate) {
                date = datelib.adjustDays(parseDate(xmlAppt.justiceEndDate[0]._), 1);
                justice.stop = sprintf("%#Y-%#02M-%#02D", date, date, date);
                justice.stopFormatted = sprintf("%#C", justice.stop);
                if (xmlAppt.justiceReasonForLeaving) {
                    justice.stopReason = xmlAppt.justiceReasonForLeaving[0];
                } else {
                    printf("warning: justice '%s' stopped for no reason\n", justice.name);
                }
            }
            justices.push(justice);
        }
    }
    justices.sort(function(a, b) {
        return (a.start < b.start)? -1 : ((a.start > b.start)? 1 : 0);
    });
    return justices;
}

/**
 * readOyezLabsDecisions()
 *
 * @return {Array.<Decision>}
 */
function readOyezLabsDecisions()
{
    let decisions = [];
    printf("reading OyezLabs decisions...\n");
    let filePaths = glob.sync(rootDir + sources.oyezlabs.casesXML);
    printf("total OyezLabs XML files: %d\n", filePaths.length);
    for (let i = 0; i < filePaths.length; i++) {
        let xml = readXMLFile(filePaths[i], ["<case ", "<caseTitle ", "<caseDecisionDate ", "<caseOpinionVol ", "<caseOpinionPage ", "</case>"]);
        if (xml) {
            let decision = {};
            decision.caseTitle = xml.case.caseTitle[0]._;
            decision.dateDecision = xml.case.caseDecisionDate? xml.case.caseDecisionDate[0]._ : "";
            decision.usCite = xml.case.caseOpinionPage? (xml.case.caseOpinionVol[0]._ + " U.S. " + xml.case.caseOpinionPage[0]._) : "";
            decisions.push(decision);
            if (decisions.length % 1000 == 0) printf(".");
        }
    }
    printf("total OyezLabs decisions read: %d\n", decisions.length);
    return decisions;
}

/**
 * readSCDBCourts()
 *
 * @return {Array.<Court>}
 */
function readSCDBCourts()
{
    let startNext = null;
    let courts = readCSV(sources.scdb.courtsCSV, "html");
    for (let i = 0; i < courts.length; i++) {
        let court = courts[i];
        let start = parseDate(court.naturalStart);
        let stop = parseDate(court.naturalStop);
        if (startNext && start.getTime() != startNext.getTime()) {
            printf("warning: %s: current start date (%#C) does not match previous stop date (%#C)\n", court.naturalName, start, startNext);
            warnings++;
        }
        court.start = sprintf("%#Y-%#02M-%#02D", start, start, start);
        court.stop = sprintf("%#Y-%#02M-%#02D", stop, stop, stop);
        court.startFormatted = sprintf("%#C", start);
        court.stopFormatted = sprintf("%#C", stop);
        startNext = datelib.adjustDays(stop, 1);
    }
    return courts;
}

/**
 * readSCOTUSDecisions()
 *
 * @return {Array}
 */
function readSCOTUSDecisions()
{
    let startNext = null;
    let decisions = readCSV(results.csv.dates, "html");
    //
    // There are so many decision date differences in the Free Law/Court Listener CSV that the file is essentially worthless.  Sigh.
    //
    // let decisionsFreeLaw = readFile(sources.freelaw.decisionDatesCSV);
    // if (decisionsFreeLaw) {
    //     let rowsFreeLaw = decisionsFreeLaw.split('\n');
    //     for (let i = 0; i < rowsFreeLaw.length - 1; i++) {
    //         rowsFreeLaw[i] = rowsFreeLaw[i].split('|');
    //         rowsFreeLaw[i][1] = encodeString(rowsFreeLaw[i][1]);
    //     }
    //     for (let i = 0; i < rowsFreeLaw.length - 1; i++) {
    //         if (rowsFreeLaw[i][1] != decisions[i].caseTitle) {
    //             printf("warning: FreeLaw row %d (%s) does not match SCOTUS row (%s)\n", i + 1, rowsFreeLaw[i][1], decisions[i].caseTitle);
    //         }
    //         if (rowsFreeLaw[i][4] != decisions[i].dateDecision) {
    //             printf("warning: FreeLaw row %d (%s) does not match SCOTUS row (%s)\n", i + 1, rowsFreeLaw[i][4], decisions[i].dateDecision);
    //         }
    //     }
    // }
    //
    let decisionsScotus = {};
    for (let i = 0; i < decisions.length; i++) {
        let decision = decisions[i];
        if (!decision.dateDecision) {
            printf("warning: %s (%s) has no decision date\n", decision.caseTitle, decision.usCite);
            warnings++;
            continue;
        }
        let match = decision.usCite.match(/([0-9]+) U.S. ([0-9]+)/);
        if (!match) {
            printf("warning: %s (%s) has unrecognized citation\n", decision.caseTitle, decision.usCite);
            warnings++;
            continue;
        }
        decision.volume = match[1];
        decision.page = match[2];
        if (decision.dateDecision.length > 10) {
            let date = parseDate(decision.dateDecision);
            decision.dateDecision = sprintf("%#Y-%#02M-%#02D", date, date, date);
        }
        if (!decisionsScotus[decision.usCite]) decisionsScotus[decision.usCite] = [];
        decisionsScotus[decision.usCite].push(decision);
    }
    return decisionsScotus;
}

/**
 * buildCitations()
 *
 * @param {function()} done
 */
function buildCitations(done)
{
    /*
     * Phase 1: Build a set of citations from a snapshot of SCOTUS web pages as needed, or parse the existing CSV.
     */
    let rowsScotus = [], citesScotus = {}, volumesScotus = {};
    let csvScotus = readFile(results.csv.citations);
    if (!csvScotus || argv['build']) {
        if (!csvScotus) csvScotus = "volume,page,year,caseTitle,oldCite,usCite\n";
        let additions = 0;
        let filePaths = glob.sync(rootDir + sources.scotus.citationsHTML);
        for (let i = 0; i < filePaths.length; i++) {
            let isHTML = filePaths[i].indexOf(".html") > 0;
            let html = readFile(filePaths[i], isHTML? "latin1" : "utf-8");
            if (html) {
                if (isHTML) {
                    /*
                     * I like to replace any "&nbsp;"" with a space myself, because if I let he.decode() do it, it will
                     * replace the entity with "c2 a0" (aka "NO-BREAK SPACE"), and I'm not sure the RegExp whitespace token
                     * (\s) will match that particular character.  We also take this opportunity to remove any italicization
                     * and/or emphasis tags from the text.
                     */
                    html = html.replace(/<\/?(i|em)>/gi, "").replace(/&nbsp;/gi, ' ').replace(/\s+/g, ' ');
                    html = he.decode(html);
                }
                let re = /(?:>|^|\n)\s*([^>]*?)(,"|[,.])\s*([0-9]+|_+)\s*(U\.\s*S\.|[A-Z.]+)\s*([0-9]+|_+|[A-Z0-9 .]+?|)\s*[0-9]?\(?([0-9][0-9][0-9][0-9])\)?/gi, match, matches = 0;
                while ((match = re.exec(html))) {
                    let caseTitle = match[1];
                    if (match[2] == ',"') caseTitle += '"';
                    let volume = +match[3] || 0;
                    let reporter = match[4];
                    let volBegin = -1;
                    switch(reporter) {
                    case "Dall.":
                        volBegin = 1;
                        break;
                    case "Cranch":
                        volBegin = 5;
                        break;
                    case "Wheat.":
                        volBegin = 14;
                        break;
                    case "Pet.":
                        volBegin = 26;
                        break;
                    case "How.":
                        volBegin = 42;
                        break;
                    case "Black":
                        volBegin = 66;
                        break;
                    case "Wall.":
                    case "Wall":
                    case "Wal.":
                        volBegin = 68;
                        reporter = "Wall."
                        break;
                    case "U. S.":
                    case "U.S.":
                    case "U.S":
                    case "US.":
                        volBegin = 91;
                        reporter = "U.S.";
                        break;
                    }
                    if (volBegin < 0) {
                        printf("warning: unrecognized reporter '%s' for '%s' (see %s: '%s')\n", reporter, caseTitle, filePaths[i], html.substr(match.index, 100).trim());
                        warnings++;
                        continue;
                    }
                    let page = match[5];
                    let year = +match[6];
                    let oldCite = "";
                    if (volBegin < 91) {
                        if (!+page) {
                            printf("warning: unrecognized page '%s' for '%s' (see %s: '%s')\n", page, caseTitle, filePaths[i], html.substr(match.index, 100).trim());
                            warnings++;
                            continue;
                        }
                        oldCite = sprintf("%d %s %d", volume, reporter, +page);
                        volume += volBegin - 1;
                    }
                    let usCite = sprintf("%s U.S. %s", volume || "___", page || "___");
                    rowsScotus.push([volume, page, year, caseTitle, oldCite, usCite]);
                    matches++;
                    let cite = {volume, page, year, caseTitle, oldCite, usCite};
                    if (!citesScotus[usCite]) citesScotus[usCite] = [];
                    citesScotus[usCite].push(cite);
                    if (!volumesScotus[volume]) volumesScotus[volume] = [];
                    volumesScotus[volume].push(cite);
                }
                printf("total matches in %s: %d\n", filePaths[i], matches);
            }
        }
        rowsScotus.sort(function(row1, row2) {
            let v1 = row1[0] || 9999, p1 = +row1[1] || 9999, y1 = row1[2], t1 = row1[3];
            let v2 = row2[0] || 9999, p2 = +row2[1] || 9999, y2 = row2[2], t2 = row2[3];
            return v1 < v2? -1 : (v1 > v2? 1 : (p1 < p2? -1 : (p1 > p2? 1 : (y1 < y2? -1 : (y1 > y2? 1 : (t1 < t2? -1 : (t1 > t2? 1 : 0)))))));
        });
        printf("total citations matched: %d\n", rowsScotus.length);
        rowsScotus.forEach((row) => {
            let line = sprintf('%d,%d,%d,"%s","%s","%s"\n', row[0], +row[1] || 0, row[2], row[3].replace(/"/g, '""'), row[4], row[5]);
            if (csvScotus.indexOf(line) < 0) {
                // printf("addition: %s", line);
                csvScotus += line;
                additions++;
            }
        });
        printf("total citations added: %d\n", additions);
        if (additions) writeFile(results.csv.citations, csvScotus);
    }
    else {
        rowsScotus = parseCSV(csvScotus);
        rowsScotus.forEach((cite) => {
            let usCite = cite.usCite;
            let volume = cite.volume;
            if (!citesScotus[usCite]) citesScotus[usCite] = [];
            citesScotus[usCite].push(cite);
            if (!volumesScotus[volume]) volumesScotus[volume] = [];
            volumesScotus[volume].push(cite);
        });
    }

    /*
     * Phase 2: Build an independent set of citations for use as a cross-check, because apparently some of the old SCOTUS citations
     * were problematic.  See for yourself: https://web.archive.org/web/20080619081552/http://www.supremecourtus.gov/opinions/casefinder/casefinder_1790-1862.html;
     * eg, they used to cite "Wilson v. Mason' (5 U.S. 44)", while everyone else cites "Wilson v. Mason' (5 U.S. 45)" -- including SCOTUS today.
     */
    let citesJustia = {}, volumesJustia = {};
    let csvJustia = readFile(results.csv.citationsJustia);
    if (!csvJustia || argv['build']) {
        if (!csvJustia) csvJustia = "volume,page,year,dateDecision,caseTitle,oldCite,usCite\n";
        let filePaths = glob.sync(rootDir + sources.justia.download.volume.dir + "*.html");
        for (let i = 0; i < filePaths.length; i++) {
            let html = readFile(filePaths[i], "latin1");
            if (html) {
                html = he.decode(html);
                let match, re = /<a\s+href="(\/cases\/federal\/us)\/([0-9]+)\/([0-9]+)\/"\s+class="case-name">\s*<strong>\s*([^<]*)\s*<\/strong>\s*<\/a>[\s\S]*?<br\/>\s*<strong>Citation:<\/strong>\s*([0-9]+)\s+U\.S\.\s+([0-9]+)<br\/>([\s\S]*?)<a href="\1\/\2\/\3\/">/g;
                while ((match = re.exec(html))) {
                    let dateDecision = "", year = 0;
                    let caseTitle = match[4], volume = +match[5], page = +match[6];
                    let usCite = sprintf("%d U.S. %d", volume, page);
                    if (volume != +match[2] || page != +match[3]) {
                        printf("warning: citation (%s) does not match link (%s U.S. %s)\n", usCite, match[2], match[3]);
                        warnings++;
                    }
                    let oldCite = getOldCite(volume, page);
                    let matchDate = match[7].match(/<span[^>]*>\s*<strong>Date:<\/strong>\s*([^<]*)([0-9][0-9][0-9][0-9])\s*<\/span>/);
                    if (matchDate) {
                        let date = parseDate(matchDate[1] + matchDate[2]);
                        dateDecision = sprintf("%#Y-%#02M-%#02D", date, date, date);
                        year = +matchDate[2];
                    }
                    let cite = {volume, page, year, dateDecision, caseTitle, oldCite, usCite};
                    if (!citesJustia[usCite]) citesJustia[usCite] = [];
                    citesJustia[usCite].push(cite);
                    if (!volumesJustia[volume]) volumesJustia[volume] = [];
                    volumesJustia[volume].push(cite);
                    csvJustia += sprintf('%d,%d,%d,"%s","%s","%s","%s"\n', volume, page, year, dateDecision, caseTitle.replace(/"/g, '""'), oldCite, usCite);
                }
            }
        }
        writeFile(results.csv.citationsJustia, csvJustia);
    }
    else {
        let rowsJustia = parseCSV(csvJustia);
        rowsJustia.forEach((cite) => {
            let usCite = cite.usCite;
            let volume = cite.volume;
            if (!citesJustia[usCite]) citesJustia[usCite] = [];
            citesJustia[usCite].push(cite);
            if (!volumesJustia[volume]) volumesJustia[volume] = [];
            volumesJustia[volume].push(cite);
        });
    }

    /*
     * Phase 3: Build another independent set of citations for use as a cross-check from Library of Congress web pages.
     *
     * Examples of LOC citation text:
     *
     *      U.S. Reports: Turner v. Enrille, 4 U.S. (4 Dall.) 7 (1799).
     *      U.S. Reports: Young and Grundy, 10 U.S. (6 Cranch) 51 (1810).
     *      U.S. Reports: Martin v. Mott., 25 U.S. (12 Wheat.) 19 (1827).
     *      U.S. Reports: Keary et al. v. The Farmers and Merchants Bank of Memphis, 41 U.S. (16 Pet.) 89 (1842).
     *      U.S. Reports: Moore et al. v. American Transportation Co., 65 U.S. (24 How.) 1 (1861).
     *      U.S. Reports: United States v. Villalonga, 90 U.S. (23 Wall.) 35 (1874).
     *      U.S. Reports: Wilmington and Weldon Railroad Company v. King, Executor, 91 U.S. 3 (1875).
     */
    let locCites = {}, volumesLOC = {};
    let csvLOC = readFile(results.csv.citationsLOC);
    if (!csvLOC || argv['build']) {
        if (!csvLOC) csvLOC = "volume,page,year,pageURL,pagePDF,caseTitle,oldCite,usCite,pageTotal,subject,keywords\n";
        let filePaths = glob.sync(rootDir + sources.loc.download.volume.dir + "*.html");
        for (let i = 0; i < filePaths.length; i++) {
            let html = readFile(filePaths[i], "latin1");
            if (html) {
                html = he.decode(html);
                let match, re = /<span\s+class='item-description-title'>\s*<a\s+href='([^']*)'[^>]*>\s*U\.S\.\s+Reports:\s+(.*?),\s+([0-9]+)\s+U\.S\.\s+(\([^)]*\)\s+|)([0-9]+)\s*\(([0-9-]+)\)\.?/g;
                while ((match = re.exec(html))) {
                    let caseTitle = match[2], volume = +match[3], oldCite = match[4], page = +match[5], year = +match[6].slice(-4);
                    let usCite = sprintf("%d U.S. %d", volume, page);
                    if (oldCite) {
                        oldCite = oldCite.slice(1, -2) + ' ' + page;
                        if (volume == 12) {
                            oldCite = oldCite.replace(/9 Cranch /g, "8 Cranch ");
                        }
                        oldCite = oldCite.replace(/2 How /g, "2 How. ");
                    }
                    let line = sprintf('%d,%d,%d,%d,%d,"%s","%s","%s",%d,"%s","%s"\n', volume, page, year, 0, 0, caseTitle.replace(/"/g, '""'), oldCite, usCite, 0, "", "");
                    let cite = {volume, page, year, caseTitle, oldCite, usCite, line};
                    if (!locCites[usCite]) locCites[usCite] = [];
                    locCites[usCite].push(cite);
                    if (!volumesLOC[volume]) volumesLOC[volume] = [];
                    volumesLOC[volume].push(cite);
                    csvLOC += line;
                }
            }
        }
        writeFile(results.csv.citationsLOC, csvLOC);
    }
    else {
        let rowsLOC = parseCSV(csvLOC);
        rowsLOC.forEach((cite) => {
            cite.row = sprintf('%d,%d,%d,%d,%d,"%s","%s","%s",%d,"%s","%s"\n', cite.volume, cite.page, cite.year, cite.pageURL, cite.pagePDF, cite.caseTitle.replace(/"/g, '""'), cite.oldCite, cite.usCite, cite.pageTotal, cite.subject.replace(/"/g, '""'), cite.keywords.replace(/"/g, '""'));
            let usCite = cite.usCite;
            let volume = cite.volume;
            if (!locCites[usCite]) locCites[usCite] = [];
            locCites[usCite].push(cite);
            if (!volumesLOC[volume]) volumesLOC[volume] = [];
            volumesLOC[volume].push(cite);
        });
    }

    /*
     * Phase 4: Check SCOTUS cites against LOC cites.
     */
    let corrections = 0;
    let volumes = Object.keys(volumesScotus);
    volumes.forEach((volume) => {
        let citesLOCVolume = volumesLOC[volume];
        let citesScotusVolume = volumesScotus[volume];
        if (citesLOCVolume) {
            for (let iScotus = 0; iScotus < citesScotusVolume.length; iScotus++) {
                let citeScotus = citesScotusVolume[iScotus];
                if (+citeScotus.volume > 569 || isNaN(+citeScotus.page)) continue;
                let citeBest = null, scoreBest = -1;
                for (let iLoc = 0; iLoc < citesLOCVolume.length; iLoc++) {
                    let citeLoc = citesLOCVolume[iLoc];
                    if (citeLoc.matched) continue;
                    let score = scoreStrings(citeLoc.caseTitle, citeScotus.caseTitle);
                    if (citeLoc.usCite == citeScotus.usCite && (+citeLoc.pageURL || score > 50)) {
                        if (citeLoc.oldCite != citeScotus.oldCite) {
                            printf("warning: SCOTUS citation (%s) doesn't match LOC citation (%s)\n", citeScotus.oldCite, citeLoc.oldCite);
                            warnings++;
                        }
                        citeLoc.matched = true;
                        citeBest = citeLoc;
                        break;
                    }
                    if (scoreBest < score) {
                        scoreBest = score;
                        citeBest = citeLoc;
                    }
                }
                if (!citeBest) {
                    printf("warning: unable to find SCOTUS citation '%s' (%s) in LOC citations\n", citeScotus.caseTitle, citeScotus.usCite);
                    warnings++;
                }
                else if (citeScotus.usCite != citeBest.usCite && scoreBest > 75) {
                    // printf("correction: SCOTUS citation '%s' (%s) has better LOC match '%s' (%s): %d\n", citeScotus.caseTitle, citeScotus.usCite, citeBest.caseTitle, citeBest.usCite, scoreBest);
                    // corrections++;
                    getLOCPDF(citeScotus.volume, citeScotus.page);
                    getLOCPDF(citeBest.volume, citeBest.page, citeBest.pageURL);
                }
            }
        } else {
            let page = +citesScotusVolume[0].page;
            if (volume <= 569 && !isNaN(page)) {
                // printf("warning: unable to find SCOTUS volume %d in LOC citations\n", volume);
                // warnings++;
            }
        }
    });

    /*
     * Phase 5: Check LOC cites against SCOTUS cites.
     */
    let additions = 0;
    volumes = Object.keys(volumesLOC);
    volumes.forEach((volume) => {
        if (volume <= 4) return;
        let citesLOCVolume = volumesLOC[volume];
        let citesScotusVolume = volumesScotus[volume];
        if (citesScotusVolume) {
            for (let iLoc = 0; iLoc < citesLOCVolume.length; iLoc++) {
                let citeLoc = citesLOCVolume[iLoc];
                let citeBest = null, scoreBest = -1;
                for (let iScotus = 0; iScotus < citesScotusVolume.length; iScotus++) {
                    let citeScotus = citesScotusVolume[iScotus];
                    if (citeScotus.matched) continue;
                    let score = scoreStrings(citeScotus.caseTitle, citeLoc.caseTitle);
                    if (citeScotus.usCite == citeLoc.usCite && (score > 50 || locCites[citeLoc.usCite].length == 1 && citesScotus[citeScotus.usCite].length == 1)) {
                        if (citeScotus.oldCite != citeLoc.oldCite) {
                            printf("warning: LOC citation (%s) doesn't match SCOTUS citation (%s)\n", citeLoc.oldCite, citeScotus.oldCite);
                            warnings++;
                        }
                        citeScotus.matched = true;
                        scoreBest = score;
                        citeBest = citeScotus;
                        break;
                    }
                    if (scoreBest < score) {
                        scoreBest = score;
                        citeBest = citeScotus;
                    }
                }
                if ((!citeBest || citeBest.usCite != citeLoc.usCite) && citeLoc.caseTitle.indexOf(" v. ") < 0 && citeLoc.caseTitle.indexOf("Anonymous") < 0) {
                    printf("warning: unable to find LOC citation '%s' (%s) in SCOTUS citations\n", citeLoc.caseTitle, citeLoc.usCite);
                    warnings++;
                    let row = {
                        volume: citeLoc.volume,
                        page: citeLoc.page,
                        year: citeLoc.year,
                        caseTitle: citeLoc.caseTitle,
                        oldCite: citeLoc.oldCite,
                        usCite: citeLoc.usCite
                    };
                    insertCSV(rowsScotus, row, ["volume", "page", "caseTitle"]);
                    additions++;
                }
                else if (citeBest && citeLoc.usCite != citeBest.usCite && scoreBest > 75) {
                    printf("correction: LOC citation '%s' (%s) has better SCOTUS match '%s' (%s): %d\n", citeLoc.caseTitle, citeLoc.usCite, citeBest.caseTitle, citeBest.usCite, scoreBest);
                    corrections++;
                    getLOCPDF(citeLoc.volume, citeLoc.page, citeLoc.pageURL);
                    getLOCPDF(citeBest.volume, citeBest.page);
                }
            }
        }
        // else {
        //     printf("warning: unable to find LOC volume %d in SCOTUS citations\n", volume);
        //     warnings++;
        // }
    });

    /*
     * Phase 6: Verify that all cases in dates.csv are recorded in citations.csv
     */
    let rowsDates = readCSV(results.csv.dates);
    rowsDates.forEach((cite) => {
        let match = cite.usCite.match(/^([0-9]+) U.S. ([0-9]+)$/);
        if (match && !citesScotus[cite.usCite]) {
            printf("warning: unable to find date citation '%s' (%s) %s in SCOTUS citations\n", cite.caseTitle, cite.usCite, cite.dateDecision);
            warnings++;
            let row = {
                volume: +match[1],
                page: +match[2],
                year: +cite.dateDecision.substr(0, 4),
                caseTitle: cite.caseTitle,
                oldCite: getOldCite(+match[1], +match[2]),
                usCite: cite.usCite
            };
            insertCSV(rowsScotus, row, ["volume", "page", "caseTitle"]);
            additions++;
        }
    });

    printf("total additions: %d\n", additions);
    printf("total corrections: %d\n", corrections);

    if (additions || corrections) writeCSV(results.csv.citations, rowsScotus);

    printf("total warnings: %d\n", warnings);

    done();
}

/**
 * buildCourts()
 *
 * @param {function()} done
 */
function buildCourts(done)
{
    /*
     * Now that we've edited courts.json, we no longer want to rebuild it.
     *
     *      let courtsOyez = readOyezCourts();
     *      printf("Oyez courts read: %d\n", courtsOyez.length);
     *      writeFile(results.json.courts, courtsOyez);
     */
    let courts = readCourts();
    printf("courts read: %d\n", courts.length);

    /*
     * Let's verify that all the justices are appropriately slotted into the courts.
     */
    let lastCourtPrinted = "";
    let justices = JSON.parse(readFile(results.json.justices));
    for (let i = 0; i < justices.length; i++) {
        let justice = justices[i];
        let nCourts = 0;
        for (let j = 0; j < courts.length; j++) {
            let court = courts[j];
            if (justice.start >= court.start && (!court.stop || justice.start <= court.stop)) {
                let nDays = datelib.subtractDays(justice.start, court.start);
                if (lastCourtPrinted != court.id) {
                    if (nDays) printf("court %s: justice %s started within %d days\n", court.id, justice.name, nDays);
                    lastCourtPrinted = court.id;
                }
                nCourts++;
            }
        }
        if (nCourts != 1) {
            printf("warning: justice %s started in %d courts\n", justice.name, nCourts);
        }
    }

    /*
     * Now walk the courts data, interleaving the courtsSCDB data, to produce a reconciliation spreadsheet.
     */
    let courtsSCDB = readSCDBCourts();
    printf("SCDB courts read: %d\n", courtsSCDB.length);
    let j = 0;
    let csv = sprintf('"reconcileDB","reconcileName","reconcileStart","reconcileStop"\n');
    for (let i = 0; i <= courts.length; i++) {
        let court = courts[i];
        if (court) csv += sprintf('"OYEZ","%s","%s","%s"\n', court.name, court.startFormatted, court.stopFormatted);
        while (j < courtsSCDB.length) {
            if (court && courtsSCDB[j].start > court.stop) break;
            let courtSCDB = courtsSCDB[j];
            csv += sprintf('"SCDB","%s","%s","%s"\n', courtSCDB.naturalName, courtSCDB.startFormatted, courtSCDB.stopFormatted);
            j++;
        }
    }

    writeFile(results.csv.courts, csv);
    done();
}

/**
 * backupLonerDecisions()
 *
 * @param {function()} done
 */
function backupLonerDecisions(done)
{
    let backupDecisions = [];
    let backupKeys = ['caseId', 'termId', 'dissenterId', 'dissenterName', 'caseNotes', 'pdfSource', 'pdfPage', 'pdfPageDissent'];
    let lonerDecisions = JSON.parse(readFile(_data.lonerDecisions));
    lonerDecisions.forEach((decision) => {
        let backup = {};
        backupKeys.forEach((key) => {
            if (decision[key]) backup[key] = decision[key];
        });
        backupDecisions.push(backup);
    });
    writeFile(_data.lonerBackup, backupDecisions);
    done();
}

/**
 * buildDecisions()
 *
 * @param {function()} done
 */
function buildDecisions(done)
{
    let vars = JSON.parse(readFile(sources.scdb.vars));
    let decisions = parseCSV(readFile(sources.scdb.decisionsCSV, "latin1"), "html", 0, "voteId", "justice", false, vars);
    printf("SCDB decisions: %d\n", decisions.length);
    writeFile(results.json.decisions, decisions);
    done();
}

/**
 * buildJustices()
 *
 * @param {function()} done
 */
function buildJustices(done)
{
    let justicesOyez = readOyezJustices();
    printf("Oyez justices read: %d\n", justicesOyez.length);

    let justices = readCSV(sources.scdb.justicesCSV, "html");
    printf("SCDB justices read: %d\n", justices.length);
    for (let i = 0; i < justices.length; i++) {
        let first, last;
        let justice = justices[i];
        let match = justice.name.match(/(.*),\s*(.*)/);
        if (match) {
            first = match[2];
            last = match[1];
            justice.name =  first + ' ' + last;
        }
        let start = parseDate(justice.startDate);
        let stop = parseDate(justice.stopDate);
        delete justice.startDate;
        delete justice.stopDate;
        justice.start = sprintf("%#Y-%#02M-%#02D", start, start, start);
        justice.startFormatted = sprintf("%#C", start);
        justice.stop = sprintf("%#Y-%#02M-%#02D", stop, stop, stop);
        justice.stopFormatted = sprintf("%#C", stop);
        /*
         * Let's see if we can find a match in the Oyez list...
         */
        let j;
        let missing = true;
        for (j = 0; j < justicesOyez.length; j++) {
            let oyez = justicesOyez[j];
            /*
             * OYEZ uses "Brockholst Livingston" and "Frank Murphy",
             * whereas SCDB uses "Henry Livingston" and "Francis Murphy", so we need some variances.
             */
            if (oyez.name.indexOf(last) >= 0 && (oyez.name.indexOf(first) >= 0 || first == "Francis" || first == "Henry")) {
                missing = false;
                if (oyez.start == justice.start) {
                    oyez.scdbJustice = +justice.index;
                    break;
                } else {
                    printf("warning: SCDB justice '%s' date (%s) doesn't match OYEZ justice '%s' date (%s)\n", justice.name, justice.start, oyez.name, oyez.start);
                }
            }
        }
        if (missing) {
            // printf("warning: unable to find SCDB justice '%s' (%d) in OYEZ\n", justice.name, justice.index)
            justice.scdbJustice = +justice.index;
            delete justice.index;
            justicesOyez.push(justice);
        }
    }
    writeFile(results.json.justices, justicesOyez);
    done();
}

/**
 * scoreStrings(left, right)
 *
 * @param {string} left
 * @param {string} right
 * @return {number} (0-100)
 */
function scoreStrings(left, right)
{
    let score = 100;
    if (left != right) {
        score = 0;
        if (left && right) {
            left = left.replace("FEDERAL AVIATION ADMINISTRATION", "FAA");
            left = left.replace("FEDERAL COMMUNICATIONS COMMISSION", "FCC");
            left = left.replace("FEDERAL TRADE COMMISSION", "FTC");
            left = left.replace("FEDERAL ENERGY REGULATORY COMMISSION", "FERC");
            left = left.replace("ENVIRONMENTAL PROTECTION AGENCY", "EPA");
            left = left.toLowerCase().replace(/&amp;/g, " and ").replace(/(\s+|-)/g, ' ').replace(/[^a-z0-9 ]/g, '').trim();
            right = right.toLowerCase().replace(/&amp;/g, " and ").replace(/(\s+|-)/g, ' ').replace(/[^a-z0-9 ]/g, '').trim();
            let matchesRight = 0, totalRight = 0;
            let wordsLeft = left.split(' ');
            let wordsRight = right.split(' ');
            for (let r = 0; r < wordsRight.length; r++) {
                let wordRight = wordsRight[r];
                if (!wordRight || wordRight.length <= 2) continue;
                totalRight++;
                for (let l = 0; l < wordsLeft.length; l++) {
                    let wordLeft = wordsLeft[l];
                    if (!wordLeft) continue;
                    if (wordLeft == "versus" || wordLeft == "vs") wordLeft = "v";
                    if (wordLeft.length <= 2) continue;
                    if (wordRight == wordLeft) {
                        wordsLeft[l] = "";
                        matchesRight++;
                        break;
                    }
                }
            }
            if (matchesRight) score = ((matchesRight / totalRight) * 100)|0;
        }
    }
    // printf("\tscore for '%s' vs. '%s': %d\n", left, right, score);
    return score;
}

/**
 * getJusticeId(id)
 *
 * @param {string} id
 * @return {string} ("normalized" ID)
 */
function getJusticeId(id)
{
    if (id) {
        if (id == "CEHughes1" || id == "CEHughes2") id = "CEHughes";
        id = id.toLowerCase();
    }
    return id;
}

/**
 * getTermDate(term, termDelta, dayDelta, fPrint)
 *
 * @param {string} term (yyyy-mm, or yyyy if you're lazy, but that's not allowed for years with multiple terms)
 * @param {number} [termDelta]
 * @param {number} [dateDelta]
 * @param {boolean} [fPrint]
 * @return {string} (yyyy-mm-dd)
 */
function getTermDate(term, termDelta = 0, dateDelta = 0, fPrint = false)
{
    let sDate = "";
    let year = +term.substr(0, 4) || 0;
    let month = +term.substr(5, 2) || 0;
    if (year) {
        let weekday;            // target weekday (0 == Sunday, 1 == Monday, etc)
        let firstDate;          // first date of the month (bumped from 1 to 8 when we must find the *second* target weekday of the month)
        do {
            if (year >= 1917) {
                /*
                 * You might think that 1917 to present would be simplest (first Monday of October to first Monday of the following October),
                 * and it is, except for those pesky "special terms"....
                 */
                weekday = 1;
                firstDate = 1;
                if (!month) {
                    month = 10;
                }
                else if (month < 10 && termDelta) {
                    month = 10;
                    termDelta--;
                }
                else if (month != 10) {
                    if (year == 1942 || year == 1953 || year == 1958 || year == 1972) {
                        weekday = -1;
                        if (year == 1953) firstDate = 18;
                    } else {
                        month = 0;
                    }
                }
                if (termDelta) {
                    year++;
                    termDelta--;
                    if (year == 1942) {
                        month = 7;
                        weekday = -1;
                    } else if (year == 1953) {
                        month = 6;
                        firstDate = 18;
                        weekday = -1;
                    } else if (year == 1958) {
                        month = 8;
                        weekday = -1;
                    } else if (year == 1972) {
                        month = 7;
                        weekday = -1;
                    }
                }
            } else if (year >= 1873) {
                weekday = 1;
                firstDate = 8;
                if (!month) month = 10;
                if (month != 10) month = 0;
                if (termDelta) year++;
            } else if (year >= 1844) {
                weekday = 1;
                firstDate = 1;
                if (year > 1844) {
                    if (!month) month = 12;
                    if (month != 12) month = 0;
                } else {
                    if (month != 1 && month != 12) month = 0;
                    if (termDelta && month == 1) {
                        month = 12;
                        termDelta--;
                    }
                }
                if (termDelta) {
                    if (++year == 1873) month = 10;
                }
            } else if (year >= 1827) {
                weekday = 1;
                firstDate = 8;
                if (!month) month = 1;
                if (month != 1) month = 0;
                if (termDelta) {
                    if (++year == 1844) month = 1;
                }
            } else if (year >= 1803) {
                weekday = 1;
                firstDate = 1;
                if (!month) month = 2;
                if (month != 2) month = 0;
                if (termDelta) {
                    if (++year == 1827) month = 1;
                }
            } else if (year >= 1801) {
                weekday = 1;
                firstDate = 1;
                if (month != 8 && month != 12) month = 0;
                if (termDelta && month) {
                    if (month == 8) {
                        month = 12;
                    } else {
                        month = 8;
                        if (++year == 1803) month = 2;
                    }
                    termDelta--;
                }
            } else if (year >= 1790 && year < 1801) {
                weekday = 1;
                firstDate = 1;
                if (month != 2 && month != 8) month = 0;
                if (termDelta && month) {
                    if (month == 2) {
                        month = 8;
                    } else {
                        month = 2;
                        if (++year == 1801) month = 8;
                    }
                    termDelta--;
                }
            }
        } while (month && termDelta--);
        if (month) {
            let add = 0;
            let date = parseDate(year, month - 1, firstDate);
            if (weekday >= 0) {
                let day = date.getUTCDay();
                if (day <= weekday) {
                    add = weekday - day;
                } else {
                    add = 7 - (day - weekday);
                }
            }
            date = datelib.adjustDays(date, add + dateDelta);
            sDate = sprintf("%#Y-%#02M-%#02D", date, date, date);
            if (fPrint) printf("term %s: %s\n", dateDelta? "ending" : term, sprintf("%#C", date));
        }
    }
    return sDate;
}

/**
 * getTermName(termId)
 *
 * Makes accomodations for terms the Court named inconsistently for 6 years after the June 17, 1844 statute,
 * which changed the start of terms from second Monday of January to first Monday of the preceding December; also
 * deals with all known "special terms".
 *
 * @param {string} termId
 */
function getTermName(termId)
{
    let termName = sprintf("%#F Term %#Y", termId, termId);
    if (termId >= "1844-12" && termId <= "1849-12") {
        termName = "January Term " + (+termId.substr(0, 4) + 1);
    } else if (termId == "1942-07" || termId == "1953-06" || termId == "1958-08" || termId == "1972-07") {
        termName = sprintf("%#F Special Term %#Y", termId, termId);
    }
    return termName;
}

/**
 * sortVotesBySeniority(votes, date, vars, courts, justices)
 *
 * @param {Array.<Vote>} votes
 * @param {string} date
 * @param {object} vars
 * @param {Array.<Court>} courts
 * @param {Array.<Justice>} justices
 * @return {Array.<Vote>} (actually, each entry is a new object that is a subset of the Vote properties)
 */
function sortVotesBySeniority(votes, date, vars, courts, justices)
{
    let votesNew = [];
    let votesOld = votes.slice();
    let court = null;
    for (let i = 0; i < courts.length; i++) {
        if (date >= courts[i].start && (!courts[i].stop || date <= courts[i].stop)) {
            court = courts[i];
            break;
        }
    }
    if (court) {
        for (let i = 0; i < court.justices.length; i++) {
            let old = court.justices[i];
            let j = scanObjects(justices, "id", old);
            if (j >= 0) {
                j = justices[j].scdbJustice;
                if (j) {
                    j = vars.justice.values[j];
                    let k = scanObjects(votesOld, "justice", j);
                    if (k >= 0) {
                        votesNew.push({
                            justice: j,
                            majority: votesOld[k].majority
                        });
                        votesOld.splice(k, 1);
                    } else {
                        printf("warning: unable to find vote for %s for date %s in %s\n", j, date, court.name);
                    }
                } else {
                    printf("warning: unable to find SCDB ID for justice ID %s\n", old);
                }
            } else {
                printf("warning: unable to find justice ID %s\n", old);
            }
        }
        votesOld.forEach((vote) => {
            printf("warning: unable to find %s in list of justices for date %s in %s\n", vote.justice, date, court.name);
        });
    } else {
        printf("warning: unable to find suitable court for date %s\n", date);
    }
    return votesNew;
}

/**
 * findDecisions()
 *
 * You can use the "--start" and "--stop" options within this task to extract subsets of the decision data
 * (ie, by dateDecision); both dates are inclusive:
 *
 *      gulp --start=yyyy-mm-dd --stop=yyyy-mm-dd
 *
 * For example, this command:
 *
 *      gulp --start=1823-09-01 --stop=1824-02-09
 *
 * helps us determine if any decisions were handed down during the first 5+ months of the 'marshall12' court,
 * before Justice Smith Thompson joined (if we assume he didn't join until Feb 10, 1824).
 *
 * The "--term" option defines prescribed periods of time (that is, predefined "--start" and "--stop" values);
 * you should specify both a year and month (eg, 1790-02, 1790-08, 1844-01, 1844-12, etc).  You should no longer
 * use *just* a year to identify a particular term, in large part because the earliest years (1790 through 1801)
 * had two terms, and in small part because the Court (since 1911) has had the abilty to define its own terms,
 * including the occasional "special term" (eg, 1953-06).  Special terms are rare and usually occur in the summer,
 * after the Court has recessed but before the next October term has begun.  If you omit the month, the default
 * month for that year will be selected, unless there were multiple terms that year.
 *
 * Also, starting in 1844, terms technically began in December, but the Court still referred to them as "January" terms;
 * in 1850, after the "January 1850" term (which we identify as 1849-12), they finally changed the naming convention,
 * so what would have next been called the "January 1851" term was properly called the December 1850 term (1850-12).
 * This makes it *seem* as if there were two terms in 1850, but it's more accurate to say there were two terms in 1844,
 * when the change actually occurred (specifically, 1844-01 and 1844-12).
 *
 * The "--end" option accepts a term identifier as well; if specified along with "--term", then all terms from the
 * starting term through the ending term will be processed.
 *
 * The "--argued" option allows you to find any cases argued on the specified date (yyyy-mm-dd), month (yyyy-mm),
 * or year (yyyy).  Any matching cases are printed with the argument (or reargument) date, rather than the decision date.
 *
 * The "--decided" option works just like "--argued" but for decision dates.  It's a convenience option, since the
 * same could be accomplished with appropriate "--start" and "--stop" values, but it's less work.
 *
 * The "--month" option allows you to find cases that were decided in a particular month, optionally subject to start
 * and stop values as well.  This is useful for looking for cases that were argued in the summer (ie, potential "Special
 * Term" candidates), for example.
 *
 * The "--volume" and "--page" options allow you to further restrict results to a specific U.S. Reports volume number,
 * page number, or both; use both when looking for a specific citation; for example, to locate the decision reported as
 * "542 U.S. 241", use:
 *
 *      gulp --volume=542 --page=241
 *
 * The "--text" option allows you to search for strings in the caseName variable.  It can be repeated on the command-line
 * if you want to perform multiple "AND" searches.
 *
 * The "--caseTitle" option provides for exact caseTitle matches; in addition, "--caseTitle=""" will match any case
 * without a caseTitle.
 *
 * Finally, "--minVotes" (eg, "--minVotes=1") allows you to perform a search that's the equivalent of the "lonerDecisions"
 * task, but without all the implied per-term search results.
 *
 * @param {function()} done
 * @param {number} [minVotes] (0 or undefined for no minimum vote requirement)
 * @param {string} [sTerm]
 * @param {string} [sEnd]
 */
function findDecisions(done, minVotes, sTerm = "", sEnd = "")
{
    let caseId = argv['case'] || "";
    let term = argv['term'] || sTerm, termId;
    let end = argv['end'] || argv['term'] || sEnd, endTerm;
    if (end) endTerm = getTermDate(end);
    let decided = argv['decided'], argued = argv['argued'];
    let start = argv['start'] || "", stop = argv['stop'] || "";
    let month = argv['month'] && sprintf("-%02d-", +argv['month']) || "";
    let selectedCourt = argv['naturalCourt'] || 0;
    let volume = argv['volume'] || "", page = argv['page'] || "", usCite = sprintf("%s U.S. %s", volume, page);
    let caseTitle = argv['caseTitle'];
    if (argv['minVotes']) minVotes = +argv['minVotes'];

    let text = argv['text'] || "";
    let findText = function(target) {
        let exists = false;
        if (text) {
            target = target.toLowerCase();
            if (Array.isArray(text)) {
                exists = true;
                for (let i = 0; i < text.length; i++) {
                    if (target.indexOf(text[i].toLowerCase()) < 0) {
                        exists = false;
                        break;
                    }
                }
            } else {
                if (target.indexOf(text.toLowerCase()) >= 0) exists = true;
            }
        }
        return exists;
    };

    let decisionsAudited = [];
    let decisionsDuplicated = [];
    let decisions = JSON.parse(readFile(results.json.decisions));
    printf("decisions available: %d\n", decisions.length);
    let lonerBackup = JSON.parse(readFile(_data.lonerBackup) || "[]");

    let dataFile = minVotes == 1? _data.lonerDecisions : _data.allDecisions;
    let data = JSON.parse(!argv['overwrite'] && readFile(dataFile) || "[]");
    let vars = JSON.parse(readFile(sources.scdb.vars) || "{}");
    let courts = JSON.parse(readFile(results.json.courts) || "[]");
    let justices = JSON.parse(readFile(results.json.justices) || "[]");

    do {
        let year = 0;
        if (term) {
            if (termId) {
                term = getTermDate(termId, 1).substr(0, 7);
            }
            year = +term.substr(0, 4) || 0;
            start = getTermDate(term, 0, 0, true);
            stop = getTermDate(term, 1, -1, true);
            if (!start || !stop) {
                printf("unrecognized term (%s)%s\n", term, term.length == 4? ", try including a month (eg, 1790-02)" : "");
                break;
            }
            if (end && !endTerm) {
                printf("unrecognized end term (%s)%s\n", end, end.length == 4? ", try including a month (eg, 1790-08)" : "");
                break;
            }
            termId = start.substr(0, 7);
            printf("\nprocessing term %s...\n", termId);
        }

        let results = [];
        decisions.forEach((decision) => {
            if (!caseId || decision.caseId == caseId) {
                if (caseTitle === undefined || !caseTitle && !decision.caseTitle || caseTitle == decision.caseTitle) {
                    if (!minVotes || decision.minVotes == minVotes) {
                        if (!decided || decision.dateDecision.indexOf(decided) == 0) {
                            if (!selectedCourt || decision.naturalCourt == selectedCourt) {
                                if ((!start || decision.dateDecision >= start) && (!stop || decision.dateDecision <= stop)) {
                                    if (!month || decision.dateDecision.indexOf(month) > 0) {
                                        if (!volume || !page && decision.usCite.indexOf(usCite) == 0 || volume && page && decision.usCite == usCite) {
                                            if (!text || findText(decision.caseName)) {
                                                let datePrint = decision.dateDecision;
                                                if (!argued || (datePrint = decision.dateArgument).indexOf(argued) == 0 || (datePrint = decision.dateRearg).indexOf(argued) == 0) {
                                                    printf("%s: %s [%s] (%s): %d-%d\n", datePrint, decision.caseTitle || decision.caseName, decision.docket, decision.usCite, decision.majVotes, decision.minVotes);
                                                    results.push(decision);
                                                    if (decisionsAudited.indexOf(decision.caseId) < 0) {
                                                        decisionsAudited.push(decision.caseId);
                                                    } else {
                                                        decisionsDuplicated.push(decision.caseId);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        let range = (start || stop)? sprintf(" in range %s--%s", start, stop) : "";
        let condition = minVotes? sprintf(" with minVotes of %d", minVotes) : "";
        printf("results%s%s: %d\n", range, condition, results.length);

        if (results.length) {
            let additions = 0;
            vars['caseNotes'] = {"type": "string"};
            vars['pdfSource'] = {"type": "string"};
            vars['pdfPage'] = {"type": "number"};
            vars['pdfPageDissent'] = {"type": "number"};
            vars['volume'] = {"type": "number"};
            vars['page'] = {"type": "number"};
            for (let r = 0; r < results.length; r++) {
                let result = results[r]
                let match = result.usCite.match(/([0-9]+) U.S. ([0-9]+)/);
                if (match) {
                    result.volume = +match[1];
                    result.page = +match[2];
                } else {
                    result.volume = result.page = 0;
                }
                /*
                 * NOTE: Even if mapValues() returns an error (< 0), we now continue processing cases.
                 *
                 * Here's a list of suspect cases; not only did they contain one or more unknown values, but their votes were "0-0".
                 *
                 *      unable to find caseId '1918-233' in data set
                 *      unable to find caseId '1931-152' in data set
                 *      unable to find caseId '1915-245' in data set
                 *      unable to find caseId '1908-203' in data set
                 *      unable to find caseId '1898-184' in data set
                 *      unable to find caseId '1896-274' in data set
                 *      unable to find caseId '1922-231' in data set
                 *      unable to find caseId '1898-187' in data set
                 *      unable to find caseId '1901-204' in data set
                 *      unable to find caseId '1898-189' in data set
                 *      unable to find caseId '1911-251' in data set
                 *      unable to find caseId '1898-186' in data set
                 *      unable to find caseId '1897-224' in data set
                 *      unable to find caseId '1898-185' in data set
                 *      unable to find caseId '1898-188' in data set
                 *      unable to find caseId '1909-178' in data set
                 *      unable to find caseId '1909-179' in data set
                 *      unable to find caseId '1909-177' in data set
                 *      unable to find caseId '1916-217' in data set
                 *      unable to find caseId '1900-201' in data set
                 *      unable to find caseId '1900-202' in data set
                 *      unable to find caseId '1917-218' in data set
                 *      unable to find caseId '1901-202' in data set
                 *      unable to find caseId '1901-203' in data set
                 *      unable to find caseId '1919-181' in data set
                 */
                mapValues(result, vars, true);
                let i = scanObjects(data, "caseId", result.caseId);
                if (i < 0) {
                    if (termId) result['termId'] = termId;
                    if (minVotes == 1) {
                        /*
                         * Determine who the lone dissenter is now.
                         */
                        let dissenterId = "", dissenterName = "";
                        for (let i = 0; i < result.justices.length; i++) {
                            let justice = result.justices[i];
                            if (justice.vote == "dissent") {
                                if (!dissenterId) {
                                    dissenterId = justice.justice;
                                    dissenterName = justice.justiceName;
                                } else {
                                    printf("warning: case %s (%s) has multiple dissents (eg, %s, %s)\n", result.caseId, result.usCite, dissenterName, justice.justiceName);
                                }
                            }
                        }
                        if (dissenterId) {
                            result['dissenterId'] = dissenterId;
                            result['dissenterName'] = dissenterName;
                        } else {
                            printf("warning: unable to identify dissenter for case %s (%s)\n", result.caseId, result.usCite);
                        }
                    }
                    let b = scanObjects(lonerBackup, "caseId", result.caseId);
                    if (b >= 0) {
                        let backup = lonerBackup[b];
                        if (backup['caseNotes']) result['caseNotes'] = backup['caseNotes'];
                        if (backup['pdfSource']) result['pdfSource'] = backup['pdfSource'];
                        if (backup['pdfPage']) result['pdfPage'] = backup['pdfPage'];
                        if (backup['pdfPageDissent']) result['pdfPageDissent'] = backup['pdfPageDissent'];
                    }
                    if (!result['pdfSource']) {
                        if (year < 2004) {
                            result['pdfSource'] = "loc";            // ie, Library of Congress
                        } else if (year < 2012) {
                            result['pdfSource'] = "scotusBound";    // ie, supremecourt.gov, in the "Bound Volumes" folder
                        } else {
                            result['pdfSource'] = "slipopinion/" + (year % 100);
                        }
                    }
                    data.push(result);
                    additions++;
                } else {
                    let citation = (result.usCite || ('No. ' + result.docket));
                    if (argv['debug']) {
                        printf("warning: %s (%s) already exists in %s\n", result.caseId, citation, dataFile);
                    }
                    if (mapValues(data[i], vars) > 0) {
                        printf("warning: %s (%s) being updated in %s\n", result.caseId, citation, dataFile);
                        additions++;
                    }
                    results[r] = data[i];
                }
            }
            if (additions) {
                writeFile(dataFile, data);
            }
            if (term) {
                sortCSV(results, ["volume", "page", "caseTitle"]);
                /*
                 * Create a page for each term of decisions that doesn't already have one (eg, _pages/cases/loners/yyyy-mm.md)
                 */
                let category = minVotes == 1? "loners" : "all";
                let description = minVotes == 1? "Lone Dissents" : "All Opinions";
                let termName = getTermName(termId);
                let pathName = "/cases/" + category + "/" + termId;
                let fileName = "/_pages" + pathName + ".md";
                let fileText = '---\ntitle: "' + description + " from " + termName + ' of the U.S. Supreme Court"\npermalink: ' + pathName + '\nlayout: cases\n';
                fileText += 'cases:\n';
                results.forEach((result) => {
                    let volume = 0, page = 0;
                    let matchCite = result.usCite.match(/^([0-9]+)\s*U\.?\s*S\.?\s*([0-9]+)$/);
                    if (matchCite) {
                        volume = +matchCite[1];  page = +matchCite[2];
                    }
                    fileText += '  - id: "' + result.caseId + '"\n';
                    fileText += '    termId: "' + result.termId + '"\n';
                    fileText += '    title: "' + encodeString(result.caseTitle || result.caseName, "html", false) + '"\n';
                    /*
                     * The source of an opinion PDF varies.  For LOC (Library of Congress) opinions, the 'pdfSource'
                     * should be set to "loc".  When using SCOTUS bound volume PDFs, 'pdfSource' should be "scotusBound".
                     * And finally, when using SCOTUS slip opinions, 'pdfSource' should be a SCOTUS path (eg,
                     * "17pdf/17-21_p8k0").
                     *
                     * The LOC appears to have PDFs for everything up through U.S. Reports volume 542, which covers
                     * the end of the 2003 term, and SCOTUS has bound volumes for U.S. Reports volumes 502 through 569,
                     * which spans terms 1991 through 2012, so there's a healthy overlap between LOC and SCOTUS.
                     *
                     * SCOTUS also has slip opinions for the 2012 term and up.  Moreover, SCOTUS claims it will keep
                     * slip opinions until they have been posted in a bound volume PDF.  This means that going forward,
                     * every new SCOTUS opinion will have a SCOTUS source (ie, bound or slip); unfortunately, it also
                     * means that periodically (ie, whenever SCOTUS decides to post a new bound volume PDF and remove
                     * corresponding slip opinion PDFs), we will have to detect the missing opinions and remap them.
                     * Sigh.
                     *
                     * Regarding LOC, you can browse an entire volume like so:
                     *
                     *      https://www.loc.gov/search/?fa=partof:u.s.+reports:+volume+542
                     *
                     * For a case like 542 U.S. 241, the PDF is here:
                     *
                     *      https://cdn.loc.gov/service/ll/usrep/usrep542/usrep542241/usrep542241.pdf
                     *
                     * and the thumbnail is here:
                     *
                     *      https://cdn.loc.gov/service/ll/usrep/usrep542/usrep542241/usrep542241.gif
                     *
                     * Some of the LOC PDFs don't actually start on the correct page.  The above PDF, for example,
                     * actually starts with page 240 of volume 542, not page 241.  Such cases should have the 'pdfPage'
                     * property set (eg, 2); the default value for 'pdfPage' is 1, so it need not be set for PDFs
                     * where the opinion properly begins on the first page (hopefully the case for most LOC opinions).
                     *
                     * As for the dissents, they invariably start at some later page in the PDF, so the 'pdfPageDissent'
                     * property must be set.  Moreover, if the 'pdfPage' is some value greater than 1, then that difference
                     * must be applied to 'pdfPageDissent' as well; our page templates will *not* automatically add
                     * "pdfpage" minus 1 to the dissent page number.
                     */
                    if (volume) fileText += sprintf('    volume: "%03d"\n', volume);
                    if (page) fileText += sprintf('    page: "%03d"\n' , page);
                    if (result.pdfSource) fileText += '    pdfSource: "' + result.pdfSource + '"\n';
                    if (result.pdfPage) fileText += '    pdfPage: ' + result.pdfPage + '\n';
                    if (result.pdfPageDissent) fileText += '    pdfPageDissent: ' + result.pdfPageDissent + '\n';
                    fileText += '    dateDecision: "' + sprintf("%#C", result.dateDecision) + '"\n';
                    fileText += '    citation: "' + (result.usCite || ('No. ' + result.docket)) + '"\n';
                    fileText += '    voteMajority: ' + result.majVotes + '\n';
                    fileText += '    voteMinority: ' + result.minVotes + '\n';
                    if (result.dissenterId) {
                        fileText += '    dissenterId: ' + getJusticeId(result.dissenterId) + '\n';
                        fileText += '    dissenterName: "' + result.dissenterName + '"\n';
                    } else if (result.majOpinWriter && result.majOpinWriter != "none") {
                        fileText += '    authorId: ' + getJusticeId(result.majOpinWriter) + '\n';
                        fileText += '    authorName: "' + vars.justiceName.values[result.majOpinWriter] + '"\n';
                    }
                    if (result.justices) {
                        fileText += '    votes:\n';
                        let votes = sortVotesBySeniority(result.justices, result.dateDecision, vars, courts, justices);
                        votes.forEach((vote) => {
                            fileText += '      - id: ' + getJusticeId(vote.justice) + '\n';
                            fileText += '        name: "' + vars.justiceName.values[vote.justice] + '"\n';
                            fileText += '        majority: ' + (vote.majority == "majority"? "true" : "false") + '\n';
                        });
                    }
                });
                fileText += '---\n';
                writeFile(fileName, fileText);
                /*
                 * Let's make sure there's an index entry as well....
                 */
                fileName = "/_pages/cases/" + category + ".md";
                let index = readFile(fileName);
                if (index) {
                    let re = /^- \[.*?Term.*?\]\(\/cases\/[a-z]+\/([0-9-]+)\).*$/gm, match;
                    while ((match = re.exec(index))) {
                        if (match[1] >= termId) break;
                    }
                    if (match) {
                        let asterisks = "";
                        if (termId >= "1844-12" && termId <= "1849-12") {
                            asterisks = "*";
                        }
                        let entry = sprintf("- [%s](/cases/%s/%s)%s (%d %s%s)\n", termName, category, termId, asterisks, results.length, category == "loners"? "lone dissent" : "opinion", results.length == 1? '' : 's');
                        if (match[1] != termId) {
                            index = index.substr(0, match.index) + entry + index.substr(match.index);
                        } else {
                            index = index.substr(0, match.index) + entry + index.substr(match.index + match[0].length + 1);
                        }
                        writeFile(fileName, index);
                    }
                }
            }
        }
    } while (term && endTerm && start < endTerm);

    printf("totals: matched %d decisions out of %d\n", decisionsAudited.length, decisions.length);

    if (decisionsDuplicated.length) {
        printf("warning: checked %d decisions more than once (%j)\n", decisionsDuplicated.length, decisionsDuplicated);
        warnings++;
    }

    if (warnings) printf("warnings: %d\n", warnings);

    done();
}

/**
 * findLonerDecisions()
 *
 * @param {function()} done
 */
function findLonerDecisions(done)
{
    findDecisions(done, 1, '1790-02', '2017-10');
}

/**
 * findAllDecisions()
 *
 * @param {function()} done
 */
function findAllDecisions(done)
{
    findDecisions(done, 0, '1790-02', '2017-10');
}

/**
 * findJustices()
 *
 * @param {function()} done
 * @param {number} [minVotes] (0 or undefined for no minimum vote requirement)
 */
function findJustices(done, minVotes)
{
    /*
     * If we've already built lonerJustices.json, then use it; otherwiser, build it.
     */
    let lonerBackup = JSON.parse(readFile(_data.lonerBackup) || "[]");
    let dataFile = minVotes == 1? _data.lonerJustices : _data.allJustices;
    let data = JSON.parse(!argv['overwrite'] && readFile(dataFile) || "[]");
    if (!data.length) {
        let dataBuckets = {};
        let vars = JSON.parse(readFile(sources.scdb.vars));
        let justices = JSON.parse(readFile(results.json.justices));
        justices.forEach((justice) => {
            if (justice.scdbJustice) {
                let id = vars.justice.values[justice.scdbJustice];
                if (id == "CEHughes2") id = "CEHughes1";
                if (id) {
                    justice.scdbJustice = id;
                    if (!dataBuckets[justice.scdbJustice]) {
                        dataBuckets[justice.scdbJustice] = [];
                    } else {
                        printf("warning: SCDB justice ID %s listed multiple times\n", id);
                    }
                } else {
                    printf("warning: SCDB justice index %d has no SCDB justice ID\n", justice.scdbJustice);
                }
            } else {
                printf("warning: justice %s has no SCDB justice index\n", justice.id);
            }
        });
        let dataDecisions = JSON.parse(readFile(minVotes == 1? _data.lonerDecisions : _data.allDecisions));
        dataDecisions.forEach((decision) => {
            let justiceId = minVotes == 1? decision.dissenterId : decision.majOpinWriter;
            if (justiceId == "none") return;
            if (justiceId == "CEHughes2") justiceId = "CEHughes1";
            if (justiceId) {
                if (dataBuckets[justiceId]) {
                    dataBuckets[justiceId].push(decision);
                } else {
                    printf("warning: unable to find justice ID %s\n", justiceId);
                }
            }
        });
        let idsJustice = Object.keys(dataBuckets);
        idsJustice.forEach((id) => {
            if (minVotes == 1) {
                data.push({
                    id: getJusticeId(id),
                    name: vars.justiceName.values[id],
                    loneTotal: dataBuckets[id].length,
                    loneDissents: dataBuckets[id],
                });
            } else {
                data.push({
                    id: getJusticeId(id),
                    name: vars.justiceName.values[id],
                    majorityTotal: dataBuckets[id].length,
                    majorityOpinions: dataBuckets[id],
                });

            }
        });
        data.sort(function(a, b) {
            if (minVotes == 1) {
                return (a.loneTotal < b.loneTotal)? 1 : ((a.loneTotal > b.loneTotal)? -1 : 0);
            } else {
                return (a.majorityTotal < b.majorityTotal)? 1 : ((a.majorityTotal > b.majorityTotal)? -1 : 0);
            }
        });
        writeFile(dataFile, data);
    }
    let index = "";
    let category = minVotes == 1? "loners" : "all";
    let type = minVotes == 1? "lone dissent" : "opinion";
    let description = minVotes == 1? "Lone Dissents" : "Majority Opinions";
    data.forEach((justice) => {
        let total = (minVotes == 1? justice.loneTotal : justice.majorityTotal);
        printf("%s: %d %s%s\n", justice.name, total, type, total == 1? '' : 's');
        /*
        * Create a page for each Justice's lone dissents.
        */
        let pageName = sprintf("Justice %s's %s", justice.name, description);
        let pathName = "/justices/" + category + "/" + justice.id;
        let fileName = "/_pages" + pathName + ".md";
        let text = '---\ntitle: "' + pageName + '"\npermalink: ' + pathName + '\nlayout: cases\n';
        text += 'cases:\n';
        let opinions = minVotes == 1? justice.loneDissents : justice.majorityOpinions;
        opinions.forEach((opinion) => {
            let volume = 0, page = 0;
            let matchCite = opinion.usCite.match(/^([0-9]+)\s*U\.?\s*S\.?\s*([0-9]+)$/);
            if (matchCite) {
                volume = +matchCite[1];  page = +matchCite[2];
            }
            let b = scanObjects(lonerBackup, "caseId", opinion.caseId);
            if (b >= 0) {
                let backup = lonerBackup[b];
                if (backup['caseNotes']) opinion['caseNotes'] = backup['caseNotes'];
                if (backup['pdfSource']) opinion['pdfSource'] = backup['pdfSource'];
                if (backup['pdfPage']) opinion['pdfPage'] = backup['pdfPage'];
                if (backup['pdfPageDissent']) opinion['pdfPageDissent'] = backup['pdfPageDissent'];
            }
            text += '  - id: "' + opinion.caseId + '"\n';
            text += '    termId: "' + opinion.termId + '"\n';
            text += '    title: "' + encodeString(opinion.caseTitle || opinion.caseName, "html", false) + '"\n';
            if (volume) text += sprintf('    volume: "%03d"\n', volume);
            if (page) text += sprintf('    page: "%03d"\n' , page);
            if (opinion.pdfSource) text += '    pdfSource: "' + opinion.pdfSource + '"\n';
            if (opinion.pdfPage) text += '    pdfPage: ' + opinion.pdfPage + '\n';
            if (opinion.pdfPageDissent) text += '    pdfPageDissent: ' + opinion.pdfPageDissent + '\n';
            text += '    dateDecision: "' + sprintf("%#C", opinion.dateDecision) + '"\n';
            text += '    citation: "' + (opinion.usCite || ('No. ' + opinion.docket)) + '"\n';
            if (minVotes == 1) {
                text += '    dissenterId: ' + justice.id + '\n';
                text += '    dissenterName: "' + justice.name + '"\n';
            } else {
                text += '    authorId: ' + justice.id + '\n';
                text += '    authorName: "' + justice.name + '"\n';
            }
        });
        text += '---\n';
        writeFile(fileName, text, argv['overwrite'], true);
        index += sprintf("- [%s](/justices/%s/%s) (%d %s%s)\n", justice.name, category, justice.id, total, type, total == 1? '' : 's');
    });
    /*
     * And finally, build an index of all Justices with their opinions.
     */
    if (index) {
        let pathName = "/justices/" + category;
        let fileName = "/_pages" + pathName + ".md";
        index = '---\ntitle: "U.S. Supreme Court Justices with ' + description + '"\npermalink: ' + pathName + '\nlayout: page\n---\n\n' + index;
        writeFile(fileName, index);
    }
    done();
}

/**
 * findLonerJustices()
 *
 * @param {function()} done
 */
function findLonerJustices(done)
{
    findJustices(done, 1);
}

/**
 * findAllJustices()
 *
 * @param {function()} done
 */
function findAllJustices(done)
{
    findJustices(done, 0);
}

/**
 * findLonerParties()
 *
 * @param {function()} done
 */
function findLonerParties(done)
{
    let dateBuckets = {};
    let lonerJustices = JSON.parse(readFile(_data.lonerJustices) || "[]");
    lonerJustices.forEach((justice) => {
        justice.loneDissents.forEach((dissent) => {
            if (!dateBuckets[dissent.dateDecision]) {
                dateBuckets[dissent.dateDecision] = [];
            }
            dateBuckets[dissent.dateDecision].push(dissent);
        });
    });

    let pageName = sprintf("Loner Parties");
    let pathName = "/trivia/parties";
    let fileName = "/_pages" + pathName + ".md";
    let text = '---\ntitle: "' + pageName + '"\npermalink: ' + pathName + '\nlayout: page\n---\n';

    let dates = Object.keys(dateBuckets);
    dates.sort();
    dates.forEach((date) => {
        let bucket = dateBuckets[date];
        if (bucket.length > 1) {
            printf("date %s had %d lone dissents\n", date, bucket.length);
            text += sprintf("\n## %#C\n\n", date);
            bucket.forEach((dissent) => {
                text += '- [' + (dissent.caseTitle || dissent.caseName) + '](/cases/loners/' + dissent.termId + '#' + dissent.caseId + '): Dissent by [' + dissent.dissenterName + '](/justices/loners/' + getJusticeId(dissent.dissenterId) + '#' + dissent.caseId + ')\n';
            });
        }

    });
    writeFile(fileName, text);
    done();
}

/**
 * fixDecisions()
 *
 * If --citations, then match up every decision record with a citation row.
 * If --courts, then verify all decision dates against natural court dates.
 * If --dates, then verify all argument/decision dates aginst SCOTUS argument/decision dates.
 * If --oyezlabs, then match up every decision record with an oyezlabs record.
 *
 * @param {function()} done
 */
function fixDecisions(done)
{
    // let vars = JSON.parse(readFile(sources.scdb.vars) || "{}");
    // let courts = JSON.parse(readFile(results.json.courts) || "[]");
    // let justices = JSON.parse(readFile(results.json.justices) || "[]");

    let fixDates = false;
    let citesScotus = {}, citesLOC = {}, yearsScotus = {};
    let citations = [], citationsLOC = [];
    let citesLabs = {}, decisionsLabs = [];
    let courtsSCDB = [], decisionsScotus = {};

    if (argv['citations']) {
        citations = readCSV(results.csv.citations, "html");
        for (let i = 0; i < citations.length; i++) {
            let citation = citations[i];
            if (citation.volume) {
                citation.usCite = citation.usCite.replace("Appx. ", "");
                if (!citesScotus[citation.usCite]) citesScotus[citation.usCite] = [];
                citesScotus[citation.usCite].push(citation);
            }
            if (citation.year) {
                if (!yearsScotus[citation.year]) yearsScotus[citation.year] = [];
                yearsScotus[citation.year].push(citation);
            } else {
                printf("warning: missing year in case '%s'\n", citation.caseTitle);
            }
        }
        /*
         * NOTE: By merging LOC and Justia data with SCOTUS data, the only fields we can rely on are:
         *
         *      volume, page, caseTitle, usCite
         */
        citationsLOC = readCSV(results.csv.citationsLOC, "html");
        for (let i = 0; i < citationsLOC.length; i++) {
            let citation = citationsLOC[i];
            if (citation.volume) {
                if (!citesLOC[citation.usCite]) citesLOC[citation.usCite] = [];
                citesLOC[citation.usCite].push(citation);
                if (!citesScotus[citation.usCite]) citesScotus[citation.usCite] = [];
                citesScotus[citation.usCite].push(citation);
            }
        }

        // let citationsJustia = readCSV(results.csv.citationsJustia, "html");
        // for (let i = 0; i < citationsJustia.length; i++) {
        //     let citation = citationsJustia[i];
        //     if (citation.volume) {
        //         if (!citesScotus[citation.usCite]) citesScotus[citation.usCite] = [];
        //         citesScotus[citation.usCite].push(citation);
        //     }
        // }
    }
    if (argv['courts']) {
        courtsSCDB = readSCDBCourts();
    }
    if (argv['dates']) {
        fixDates = true;
        decisionsScotus = readSCOTUSDecisions();
    }
    if (argv['oyezlabs']) {
        decisionsLabs = readOyezLabsDecisions();
        for (let i = 0; i < decisionsLabs.length; i++) {
            let decision = decisionsLabs[i];
            if (decision.usCite && decision.dateDecision) {
                if (!citesLabs[decision.usCite]) citesLabs[decision.usCite] = [];
                citesLabs[decision.usCite].push(decision);
            }
        }
    }

    let changes = 0, citesDecisions = {};
    let decisions = JSON.parse(readFile(results.json.decisions));
    for (let i = 0; i < decisions.length; i++) {
        let decision = decisions[i];
        if (decision.usCite) {
            if (!citesDecisions[decision.usCite]) citesDecisions[decision.usCite] = [];
            citesDecisions[decision.usCite].push(decision);
        }
    }
    printf("decisions available: %d\n", decisions.length);

    let citesSCDB = {};
    let changedCourts = readFile(results.logs.csv.changedCourts) || "caseId,usCite,caseName,dateDecision,naturalCourt,naturalCourtNew\n";
    let changedDates = readFile(results.logs.csv.changedDates) || "caseId,usCite,caseName,dateDecision,dateDecisionNew\n";
    let missingCases = readFile(results.logs.csv.missingCases) || "usCite,caseTitle,dateDecision\n";
    let unknownCitations = readFile(results.logs.csv.unknownCitations) || "usCite,caseName,dateDecision\n";
    let unusualDates = readFile(results.logs.csv.unusualDates) || "caseId,usCite,caseName,dateDecision,dayOfWeek\n";
    let changedCourtsOrig = changedCourts, changedDatesOrig = changedDates, missingCasesOrig = missingCases, unknownCitationsOrig = unknownCitations, unusualDatesOrig = unusualDates;

    decisions.forEach((decision) => {
        let citeDate, i;
        if (decision.usCite) {
            if (citations.length) {
                /*
                 * The "--citations" option must have been specified.
                 */
                let citePrev, citeBest, scoreBest = -1;
                let cites = citesScotus[decision.usCite];
                if (cites) {
                    i = 0;
                    while (i < cites.length) {
                        let cite = cites[i++];
                        let score = scoreStrings(decision.caseName, cite.caseTitle);
                        if (argv['check'] && decision.caseTitle == cite.caseTitle && score < 10) {
                            printf("warning %s: '%s' == '%s' (%d)\n", decision.usCite, decision.caseTitle, decision.caseName, score);
                            warnings++;
                        }
                        if (cites.length == 1 && citesDecisions[decision.usCite].length == 1) {
                            citeBest = cite;
                            scoreBest = 200;
                            break;
                        }
                        if (scoreBest < score) {
                            scoreBest = score;
                            citeBest = cite;
                        }
                    }
                }
                else {
                    /*
                     * One of the reasons for a missing LOC citation is that it was simply considered part of the opinion for a preceding citation.
                     * To detect that, we must search citationsLOC for the current (volume,page), back up to the previous position, and see if that
                     * entry's page + pageTotal spans the page of the missing citation.
                     */
                    let match = decision.usCite.match(/([0-9]+) U.S. ([0-9]+)/);
                    if (match) {
                        let volume = +match[1], page = +match[2];
                        let tuple = {volume, page};
                        let i = searchCSV(citationsLOC, tuple);
                        if (i > 0) {
                            citePrev = citationsLOC[i];
                        } else if (i < 0) {
                            citePrev = citationsLOC[-i - 2];
                        }
                        if (citePrev && citePrev.volume == volume && citePrev.page + citePrev.pageTotal - 1 >= page) {
                            let score = scoreStrings(decision.caseName, citePrev.caseTitle);
                            if (scoreBest < score) {
                                scoreBest = score;
                                citeBest = citePrev;
                            }
                        }
                    }
                }
                if (scoreBest > 0 && !decision.caseTitle) {
                    if (scoreBest < 75) {
                        if (argv['debug']) printf("check   %s: '%s' == '%s' (%d)\n", decision.usCite, citeBest.caseTitle, decision.caseName, scoreBest);
                    }
                    else if (decision.usCite != "103 U.S. 515n" && decision.usCite != "174 U.S. 718") {
                        printf("update  %s: '%s'%s == '%s' (%d)\n", decision.usCite, citeBest.caseTitle, citePrev? (' (' + citeBest.usCite + ')') : "", decision.caseName, scoreBest);
                        decision.caseTitle = citeBest.caseTitle;
                        changes++;
                    }
                }
            }
            if (!citesSCDB[decision.usCite]) {
                citesSCDB[decision.usCite] = [];
            }
            if (citesSCDB[decision.usCite].length) {
                for (i = 0; i < citesSCDB[decision.usCite].length; i++) {
                    let scdbCite = citesSCDB[decision.usCite][i];
                    if (scdbCite.caseName == decision.caseName) {
                        printf("warning: %s (%s) may be duplicated (compare %s to %s)\n", decision.caseName, decision.usCite, scdbCite.caseId, decision.caseId);
                        warnings++;
                    }
                }
            }
            citesSCDB[decision.usCite].push(decision);
            let datesScotus = decisionsScotus[decision.usCite];
            if (datesScotus) {
                /*
                 * The "--dates" option must have been specified.
                 */
                for (i = 0; i < datesScotus.length; i++) {
                    citeDate = datesScotus[i];
                    if (decision.dateDecision == citeDate.dateDecision && !citeDate.matched) {
                        citeDate.matched = true;
                        break;
                    }
                }
                if (i == datesScotus.length && citeDate.dateDecision && decision.dateDecision != citeDate.dateDecision) {
                    citeDate.matched = true;
                    printf("warning: %s (%s) has decision date %s instead of SCOTUS date %s\n", decision.caseName, decision.usCite, decision.dateDecision, citeDate.dateDecision);
                    changedDates = addCSV(changedDates, decision, ["caseId", "usCite", "caseName", "dateDecision"], "dateDecisionNew", citeDate.dateDecision);
                    warnings++;
                    decision.dateDecision = citeDate.dateDecision;
                    changes++;
                }
            }
            if (decisionsLabs.length) {
                if (citesLabs[decision.usCite]) {
                    let cite, cites = citesLabs[decision.usCite];
                    for (i = 0; i < cites.length; i++) {
                        cite = cites[i];
                        if (cite.dateDecision == decision.dateDecision) break;
                    }
                    if (i == cites.length) {
                        printf("warning: %s (%s) decision date %s does not match OyezLabs '%s' decision date %s\n", decision.caseName, decision.usCite, decision.dateDecision, cite.caseTitle, cite.dateDecision);
                    }
                } else {
                    printf("warning: unable to find OyezLabs XML for %s (%s)\n", decision.caseName, decision.usCite);
                }
            }
        } else {
            if (citations.length) {
                /*
                * For cases without a citation, we need to scan for matches based on caseName and yearDecision.
                */
                let year = +decision.dateDecision.substr(0, 4);
                if (year) {
                    let years = yearsScotus[year];
                    if (years) {
                        let citeBest, scoreBest = -1;
                        for (let y = 0; y < years.length; y++) {
                            let cite = years[y];
                            let score = scoreStrings(decision.caseName, cite.caseTitle);
                            if (argv['check'] && decision.caseTitle == cite.caseTitle && score < 10) {
                                printf("warning %s: '%s' == '%s' (%d)\n", decision.dateDecision, decision.caseTitle, decision.caseName, score);
                                warnings++;
                            }
                            if (scoreBest < score) {
                                scoreBest = score;
                                citeBest = cite;
                            }
                        }
                        if (scoreBest > 0 && !decision.caseTitle) {
                            if (scoreBest < 75) {
                                if (argv['debug']) printf("check   %s: '%s' == '%s' (%d)\n", decision.dateDecision, citeBest.caseTitle, decision.caseName, scoreBest);
                            }
                            else {
                                printf("update  %s: '%s' == '%s' (%d)\n", decision.dateDecision, citeBest.caseTitle, decision.caseName, scoreBest);
                                decision.caseTitle = citeBest.caseTitle;
                                changes++;
                            }
                        }
                    }
                } else {
                    printf("warning: invalid dateDecision (%s)\n", decision.dateDecision);
                }
            }
        }

        if (decision.caseTitle) {
            let s = encodeString(decodeString(decision.caseTitle, true), "html");
            if (decision.caseTitle != s) {
                printf("warning: old caseTitle encoding '%s'\n         new caseTitle encoding '%s'\n", decision.caseTitle, s);
                decision.caseTitle = s;
                changes++;
            }
        }

        if (fixDates && (!citeDate || !citeDate.matched) && decision.dateDecision && decision.dateDecision.length == 10) {
            let dateDecision = parseDate(decision.dateDecision);
            let dayOfWeek = dateDecision.getUTCDay();
            if (dayOfWeek == 0 || dayOfWeek == 6) {
                printf("warning: %s (%s) has unusual decision day: %#C\n", decision.caseName, decision.usCite, dateDecision);
                unusualDates = addCSV(unusualDates, decision, ["caseId", "usCite", "caseName", "dateDecision"], "dayOfWeek", sprintf("%#W", dateDecision) /*, "matchesSCOTUS", citeDate && citeDate.dateDecision == decision.dateDecision? true : false */);
                warnings++;
            }
        }

        if (courtsSCDB.length) {
            for (i = 0; i < courtsSCDB.length; i++) {
                let court = courtsSCDB[i];
                if (decision.dateDecision >= court.start && decision.dateDecision <= court.stop) {
                    let naturalCourt = +court.naturalCourt;
                    if (decision.naturalCourt != naturalCourt) {
                        printf("warning: %s (%s): decision date %s lies within court %s (%d) but naturalCourt is different (%d)\n", decision.caseName, decision.usCite, decision.dateDecision, court.naturalName, naturalCourt, decision.naturalCourt);
                        changedCourts = addCSV(changedCourts, decision, ["caseId", "usCite", "caseName", "dateDecision", "naturalCourt"], "naturalCourtNew", naturalCourt);
                        warnings++;
                        decision.naturalCourt = naturalCourt;
                        changes++;
                    }
                    break;
                }
            }
            if (i == courtsSCDB.length) {
                printf("warning: %s (%s): decision date %s lies outside of any court; naturalCourt is %d\n", decision.caseName, decision.usCite, decision.dateDecision, decision.naturalCourt);
                warnings++;
            }
        }
    });

    let scotusCites = Object.keys(decisionsScotus);
    scotusCites.forEach((usCite) => {
        let datesScotus = decisionsScotus[usCite];
        datesScotus.forEach((decisionScotus) => {
            if (!decisionScotus.matched) {
                printf("warning: %s (%s) with SCOTUS decision date %s has no matching SCDB entry\n", decisionScotus.caseTitle, decisionScotus.usCite, decisionScotus.dateDecision);
                missingCases = addCSV(missingCases, decisionScotus, ["usCite", "caseTitle", "dateDecision"]);
                warnings++;
            }
        });
    });

    if (argv['citations']) {
        decisions.forEach((decision) => {
            if (decision.usCite && !decision.caseTitle && decision.minVotes == 1) {
                printf("warning: %s (%s) has no matching citation entry\n", decision.caseName, decision.usCite, decision.dateDecision);
                unknownCitations = addCSV(unknownCitations, decision, ["usCite", "caseName", "dateDecision"]);
                warnings++;
            }
        });
    }

    if (changedCourts != changedCourtsOrig) {
        writeFile(results.logs.csv.changedCourts, changedCourts);
    }
    if (changedDates != changedDatesOrig) {
        writeFile(results.logs.csv.changedDates, changedDates);
    }
    if (missingCases != missingCasesOrig) {
        writeFile(results.logs.csv.missingCases, missingCases);
    }
    if (unknownCitations != unknownCitationsOrig) {
        writeFile(results.logs.csv.unknownCitations, unknownCitations);
    }
    if (unusualDates != unusualDatesOrig) {
        writeFile(results.logs.csv.unusualDates, unusualDates);
    }

    if (changes) {
        printf("changes: %d\n", changes);
        writeFile(results.json.decisions, decisions);
    }

    if (warnings) printf("warnings: %d\n", warnings);

    done();
}

/**
 * updateLOC()
 *
 * Add some new columns to citationsLOC.csv (eg, pageTotal, subject, keywords).
 *
 * @param {function()} done
 */
function updateLOC(done)
{
    let success = true;
    let rowsLOC = readCSV(results.csv.citationsLOC);
    let rowsMisc = readCSV(results.csv.miscLOC);
    let rowsAll = [rowsLOC, rowsMisc];
    rowsAll.forEach((rows) => {
        if (!isSortedCSV(rows, ["volume", "page", "caseTitle"], true)) {
            sortCSV(rows, ["volume", "page", "caseTitle"])
            if (!isSortedCSV(rows, ["volume", "page", "caseTitle"])) {
                printf("warning: unable to sort CSV\n");
                warnings++;
                success = false;
            }
        }
    });
    if (success) {
        let info = readFile(sources.loc.download.pdf.info);
        if (info) {
            let updates = 0;
            let match, re = /sources\/loc\/pdfs\/.*?\/([0-9]*)us([^.]*)\.pdf\s*Title:\s*U\.\s*S\.\s*Reports:\s*(.*?)\.?,\s*([0-9]+)\s*U\.S\.\s*(?:\(.*?\)\s*|)(\S+).*?\s*Subject:\s*(.*?)\s*Keywords:\s*([^\n]*)\s*[\s\S]*?Pages:\s*([0-9]*)/g;
            while ((match = re.exec(info))) {
                let caseTitle = match[3].replace(/\s+/g, ' ').trim();
                let volume = +match[4];
                let page = +match[5];
                let subject = match[6];
                let keywords = match[7];
                let pageTotal = +match[8];
                let phrases = keywords.toLowerCase().split("; ");
                removeValues(phrases, ["law", "law library", "supreme court", "united states", "government documents", "u.s. reports", "common law", "judicial review and appeals", "court opinions", "judicial decisions", "court cases", "court decisions"]);
                keywords = phrases.join("; ");
                let volumePDF = +match[1];
                let pagePDF = +match[2];
                if (!isNaN(pagePDF)) {
                    page = pagePDF;
                } else {
                    printf("warning: unexpected PDF page number (%s)\n", match[2]);
                    warnings++;
                }
                // printf('"%s","%d U.S. %d",%d\n', caseTitle, volume, page, pageTotal);
                let o = {volume, page, caseTitle};
                let i = searchCSV(rowsLOC, o);
                if (i < 0) {
                    i = searchCSV(rowsMisc, o);
                    if (i < 0) {
                        printf('warning: unable to find "%s","%d U.S. %d" (see %03dus%03d.pdf)\n', caseTitle, volume, page, volumePDF, pagePDF);
                        warnings++;
                    }
                }
                if (i >= 0) {
                    o = rowsLOC[i];
                    if (!o.pageTotal) {
                        printf('updating: "%s","%d U.S. %d" with %d pages\n', caseTitle, volume, page, pageTotal);
                        o.pageTotal = pageTotal;
                        o.subject = subject;
                        o.keywords = keywords;
                        updates++;
                    }
                    /*
                     * Look for neighboring entries with matching volume and page that should be updated as well, first backwards then forwards.
                     */
                    for (let direction = -1; direction <= 1; direction += 2) {
                        for (let j = i + direction; j > 0 && j < rowsLOC.length; j += direction) {
                            let row = rowsLOC[j];
                            if (row.volume != volume || row.page != page) break;
                            if (!row.pageTotal) {
                                row.pageTotal = pageTotal;
                                row.subject = row.keywords = "";        // it's unclear whether the subject and/or keywords have any applicability to other cases on the same page....
                                updates++;
                            }
                        }
                    }
                }
            }
            if (updates) {
                printf("updates: %d\n", updates);
                writeCSV(results.csv.citationsLOC, rowsLOC);
            }
        }
    }
    printf("warnings: %d\n", warnings);
    done();
}

/**
 * testDates()
 *
 * @param {function()} done
 */
function testDates(done)
{
    let date, format;

    date = parseDate("2018-08-10");
    printf("\nparseDate(\"2018-08-10\")\n");
    format = "%s\t%#C\n\t%#T\n";
    printf(format, format, date, date);
    format = "%s\t%W, %.3F %D, %Y - %I:%02N:%02S%A\n";
    printf(format, format, date, date, date, date, date, date, date, date);
    format = "%s\t%#W, %#M/%#D/%#0.2Y - %#I:%#02N:%#02S%#A\n";
    printf(format, format, date, date, date, date, date, date, date, date);

    date = datelib.adjustDays(date, -365);
    printf("\ndate = adjustDays(date, -365)\n");
    format = "%s\t%W, %.3F %D, %Y - %I:%02N:%02S%A\n";
    printf(format, format, date, date, date, date, date, date, date, date);
    format = "%s\t%#W, %#M/%#D/%#0.2Y - %#I:%#02N:%#02S%#A\n";
    printf(format, format, date, date, date, date, date, date, date, date);

    date = parseDate(date.getTime());
    printf("\ndate = parseDate(date.getTime())\n");
    format = "%s\t%W, %.3F %D, %Y - %I:%02N:%02S%A\n";
    printf(format, format, date, date, date, date, date, date, date, date);
    format = "%s\t%#W, %#M/%#D/%#0.2Y - %#I:%#02N:%#02S%#A\n";
    printf(format, format, date, date, date, date, date, date, date, date);

    date = parseDate();
    printf("\ndate = parseDate()\n");
    format = "%s\t%W, %.3F %D, %Y - %I:%02N:%02S%A\n";
    printf(format, format, date, date, date, date, date, date, date, date);
    format = "%s\t%#W, %#M/%#D/%#0.2Y - %#I:%#02N:%#02S%#A\n";
    printf(format, format, date, date, date, date, date, date, date, date);

    date = parseDate(2018, 7, 10);
    printf("\nparseDate(2018, 7, 10)\n");
    format = "%s\t%W, %.3F %D, %Y - %I:%02N:%02S%A\n";
    printf(format, format, date, date, date, date, date, date, date, date);
    format = "%s\t%#W, %#M/%#D/%#0.2Y - %#I:%#02N:%#02S%#A\n";
    printf(format, format, date, date, date, date, date, date, date, date);

    date = parseDate(2018, 7, 10, 18, 5, 30);
    printf("\nparseDate(2018, 7, 10, 18, 5, 30)\n");
    format = "%s\t%W, %.3F %D, %Y - %I:%02N:%02S%A\n";
    printf(format, format, date, date, date, date, date, date, date, date);
    format = "%s\t%#W, %#M/%#D/%#0.2Y - %#I:%#02N:%#02S%#A\n";
    printf(format, format, date, date, date, date, date, date, date, date);

    date = parseDate("1809-02");
    printf("\nparseDate(\"1809-02\")\n");
    format = "%s\t%#C\n";
    printf(format, format, date);

    let terms = ['1790-02', '1953-06', '1980-12-12'];
    terms.forEach((term) => {
        printf("getTermName(%s): %s\n", term, getTermName(term))
    });

    let d = -1;
    printf("d == 0x%02x\n", d);

    let filePaths = glob.sync("./results/*.json");
    filePaths.forEach((filePath) => {
        let text = readFile(filePath);
        if (text) {
            printf("checking %s (%d characters)...\n", filePath, text.length);
            let textNew = fixASCII(text);
            if (textNew != text) {
                writeFile(filePath, textNew);
            }
        }
    });

    done();
}

/**
 * createDownloadTask(name, url, dir, file)
 *
 * @param {string} name
 * @param {string} url
 * @param {string} dir
 * @param {string} file
 */
function createDownloadTask(name, url, dir, file)
{
    if (downloadTasks.indexOf(name) >= 0) {
        return;
    }
    let dirPath = path.join(rootDir, dir);
    let filePath = path.join(dirPath, file);
    if (fs.existsSync(filePath)) {
        return;
    }
    // printf("createDownloadTask(%s,%s,%s,%s)\n", name, url, dir, file);
    downloadTasks.push(name);
    gulp.task(name, function(done) {
        if (!fs.existsSync(dirPath)) {
            mkdirp.sync(dirPath);
        }
        return request(url)
            .on("response", function(response) {
                if (response.statusCode < 400) {
                    printf("%s (%d) saved as %s\n", url, response.statusCode, filePath);
                } else {
                    printf("%s returned unexpected status code (%d)\n", url, response.statusCode, filePath);
                    fs.unlinkSync(filePath);
                }
                done();
            })
            .on("error", function(err) {
                printf("error: %s\n", err.message);
                fs.unlinkSync(filePath);
                done(err);
            })
            .pipe(fs.createWriteStream(filePath));
    });
}

/**
 * generateDownloadTasks(done)
 *
 * @param {function()} done
 */
function generateDownloadTasks(done)
{
    let sourceNames = Object.keys(sources);
    sourceNames.forEach((source) => {
        let downloads = sources[source].download;
        if (!downloads) return;
        let downloadGroups = Object.keys(downloads);
        downloadGroups.forEach((group) => {
            let downloadGroup = downloads[group];
            if (downloadGroup.start && downloadGroup.stop) {
                for (let index = downloadGroup.start; index <= downloadGroup.stop; index++) {
                    let url = sprintf(downloadGroup.url, index);
                    let dir = sprintf(downloadGroup.dir, index);
                    let file = sprintf(downloadGroup.file, index);
                    createDownloadTask('download.' + source + '.' + group + '.' + index, url, dir, file);
                }
            }
        });
    });
    let rowsLOC = readCSV(results.csv.citationsLOC);
    rowsLOC.forEach((cite) => {
        getLOCPDF(cite.volume, cite.page, cite.pageURL);
    });
    done();
}

/**
 * runDownloadTasks(done)
 *
 * @param {function()} done
 */
function runDownloadTasks(done)
{
    return gulp.series(...downloadTasks, function endGroupTasks(seriesDone) {
        seriesDone();
        done();
    })();
}

gulp.task("citations", gulp.series(buildCitations, runDownloadTasks));
gulp.task("courts", buildCourts);
gulp.task("decisions", buildDecisions);
gulp.task("justices", buildJustices);
gulp.task("download", gulp.series(generateDownloadTasks, runDownloadTasks));
gulp.task("fixDecisions", fixDecisions);
gulp.task("allDecisions", findAllDecisions);
gulp.task("allJustices", findAllJustices);
gulp.task("all", gulp.series(findAllDecisions, findAllJustices));
gulp.task("lonerDecisions", findLonerDecisions);
gulp.task("lonerJustices", findLonerJustices);
gulp.task("lonerParties", findLonerParties);
gulp.task("loners", gulp.series(findLonerDecisions, findLonerJustices, findLonerParties));
gulp.task("updateLOC", updateLOC);
gulp.task("backup", backupLonerDecisions);
gulp.task("tests", gulp.series(testDates));
gulp.task("default", findDecisions);
