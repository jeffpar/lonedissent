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
var readLineSync = require('readline-sync');

let rootDir = ".";
let datelib = require(rootDir + "/lib/datelib");
let parseDate = datelib.parseDate;
let isValidDate = datelib.isValidDate;
let adjustDays = datelib.adjustDays;
let proclib = require(rootDir + "/lib/proclib");
let stdio = require(rootDir + "/lib/stdio");
let printf = stdio.printf;
let sprintf = stdio.sprintf;
let strlib = require(rootDir + "/lib/strlib");

let _data = require(rootDir + "/_data/_data.json");
let logs = require(rootDir + "/logs/_logs.json");
let results = require(rootDir + "/results/_results.json");
let sources = require(rootDir + "/sources/_sources.json");
let argv = proclib.args.argv;
let downloadTasks = [];
let warnings = 0;

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
 * assertMatch(s1, s2, comment)
 *
 * @param {*} s1
 * @param {*} s2
 * @param {string} [comment]
 */
function assertMatch(s1, s2, comment="")
{
    if (s1 !== s2) {
        warning("assertMatch(%s != %s): %s\n", s1, s2, comment);
    }
}

/**
 * warning(format, ...args)
 *
 * @param {string} format
 * @param {...} args
 */
function warning(format, ...args)
{
    printf("warning: " + format, ...args);
    warnings++;
}

/**
 * checkASCII(text, fileName, fExtended)
 *
 * @param {string} text
 * @param {string} [fileName]
 * @param {boolean} [fExtended] (true to check for extended ASCII characters)
 * @return {boolean} (true if valid, false otherwise)
 */
function checkASCII(text, fileName, fExtended)
{
    let valid = true;
    let lines = text.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        for (let j = 0; j < line.length; j++) {
            let ch = line.charCodeAt(j);
            if (ch < 0x20 && ch != 0x09 && ch != 0x0c || fExtended && ch > 0x7f) {
                warning("unexpected character %02x%s at row %d col %d: '%s'\n", ch, fileName? (" in file " + fileName) : "", i+1, j+1, line);
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
                warning("text '%s' contains unrecognized character '%c' (0x%02x) at pos %d\n", text, c, c, i + 1);
                break;
            }
            textNew += String.fromCharCode(c);
            break;
        }
    }
    return textNew;
}

/**
 * decodeString(text, decodeAs)
 *
 * @param {string} text
 * @param {string} [decodeAs] (eg, "html")
 */
function decodeString(text, decodeAs)
{
    if (decodeAs == "html") {
        /*
         * Replace any old-fashioned "&c" references that could be misinterpreted as HTML entities.
         */
        text = text.replace(/&C\./g, "ETC.").replace(/&c\./g, "etc.").replace(/&AMP;/g, "&").replace(/&NBSP;/g, "");
        text = he.decode(text);
    }
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
        text = decodeString(text, encodeAs);
        text = he.encode(text, {
            'encodeEverything': false,
            "useNamedReferences": true
        });
        if (fAllowQuotes) text = text.replace(/&apos;/g, "'").replace(/&quot;/g, '"');
        /*
         * Some input (eg, "latin1") may contain extended ASCII characters that should be encoded as entities, too.
         */
        text = fixASCII(text);
    }
    return text;
}

/**
 * mapValues(o, vars, strict)
 *
 * @param {object} o
 * @param {object} vars
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
                        warning("code '%s' for key '%s' has no value\n", o[key], key);
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
            warning("variable '%s' missing\n", key);
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
 * binaryInsert(a, v, compare, fUnique)
 *
 * If element v already exists in array a AND fUnique is true, the array is unchanged (no duplicates);
 * otherwise, the element is inserted into the array at the appropriate index.
 *
 * @param {Array} a
 * @param {*} v (value to insert)
 * @param {function(*,*} [compare]
 * @param {boolean} [fUnique]
 * @return {number}
 */
function binaryInsert(a, v, compare, fUnique=false)
{
    let i = binarySearch(a, v, compare);
    if (i < 0) {
        i = -(i + 1);
    } else if (fUnique) {
        i = -1;
    }
    if (i >= 0) {
        a.splice(i, 0, v);
    }
    return i;
}

/**
 * binarySearch(a, v, compare)
 *
 * @param {Array} a
 * @param {*} v
 * @param {function(*,*} [compare]
 * @return {number} the (positive) index of matching entry, or the (negative) index + 1 of the insertion point
 */
function binarySearch(a, v, compare)
{
    let found = 0;
    let left = 0, right = a.length;
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
 * cloneObject(obj)
 *
 * @param {object} obj
 * @param {object}
 */
function cloneObject(obj)
{
    let newObj = {};
    let keys = Object.keys(obj);
    keys.forEach((key) => {
        newObj[key] = obj[key];
    });
    return newObj;
}

/**
 * compareObjects(index, key, keyValue, oldObj, newObj, indent)
 *
 * @param {number} index
 * @param {string} key
 * @param {*} keyValue
 * @param {object} oldObj
 * @param {object} newObj
 * @param {number} [indent]
 * @return {boolean}
 */
function compareObjects(index, key, keyValue, oldObj, newObj, indent=0)
{
    let success = true;
    let iOld = 0, iNew = 0;
    let oldKeys = Object.keys(oldObj);
    let newKeys = Object.keys(newObj);
    while (iOld < oldKeys.length && iNew < newKeys.length) {
        if (oldKeys[iOld] != newKeys[iNew]) {
            iOld++;
            continue;
        }
        let keyProp = oldKeys[iOld];
        let oldProp = oldObj[keyProp];
        let newProp = newObj[keyProp];
        if (typeof oldProp == typeof newProp) {
            if (typeof oldProp == "object") {
                compareObjects(iOld, key, keyValue, oldProp, newProp, indent+2);
            } else if (oldProp != newProp) {
                if (!oldObj.caseNotes || oldObj.caseNotes.indexOf(keyProp) < 0) {
                    warning("%*sindex %d %s '%s' property '%s': \"%s\" != \"%s\"\n", indent, ' ', index, key, keyValue, keyProp, oldProp, newProp);
                    success = false;
                }
            } else {
                if (argv['detail']) {
                    printf("%*sindex %d %s '%s' property '%s': \"%s\" MATCHES \"%s\"\n", indent, ' ', index, key, keyValue, keyProp, oldProp, newProp);
                }
            }
        }
        iOld++;
        iNew++;
    }
    return success;
}

/**
 * compareObjectArrays(oldObjs, newObjs, key)
 *
 * @param {Array} oldObjs
 * @param {Array} newObjs
 * @param {string} [key]
 * @return {boolean}
 */
function compareObjectArrays(oldObjs, newObjs, key)
{
    let success = true;
    let iOld = 0, iNew = 0;
    while (iOld < oldObjs.length && iNew < newObjs.length) {
        let keyValue;
        if (key) {
            if (oldObjs[iOld][key] < newObjs[iNew][key]) {
                iOld++;
                continue;
            }
            if (newObjs[iNew][key] < oldObjs[iOld][key]) {
                iNew++;
                continue
            }
            keyValue = oldObjs[iOld][key];
        }
        if (!compareObjects(iOld, key, keyValue, oldObjs[iOld], newObjs[iNew])) {
            success = false;
        }
        iOld++;
        iNew++;
    }
    return success;
}

/**
 * insertSortedArray(a, v)
 *
 * @param {Array} a
 * @param {*} v
 * @return {number}
 */
function insertSortedArray(a, v)
{
    return binaryInsert(a, v);
}

/**
 * insertSortedObject(rows, row, keys, fUnique)
 *
 * @param {Array.<object>} rows
 * @param {object} row
 * @param {Array.<string>} keys
 * @param {boolean} [fUnique]
 * @return {number}
 */
function insertSortedObject(rows, row, keys, fUnique)
{
    let compare = function(row1, row2) {
        for (let k = 0; k < keys.length; k++) {
            let key = keys[k];
            if (row1[key] > row2[key]) return 1;
            if (row1[key] < row2[key]) return -1;
            if (k == keys.length - 1) return 0;
        }
    };
    return binaryInsert(rows, row, compare, fUnique);
}

/**
 * isSortedArray(a, fQuiet)
 *
 * @param {Array} a
 * @param {boolean} [fQuiet]
 * @return {boolean}
 */
function isSortedArray(a, fQuiet)
{
    let isSorted = true;
    for (let i = 1; i < a.length; i++) {
        let v1 = a[i-1], v2 = a[i];
        if (v1 < v2) break;
        if (v1 == v2) continue;
        isSorted = false;
        if (fQuiet) {
            i = a.length;
            break;
        }
        warning("element %d (%s) > element %d (%s)\n", i-1, v1, i, v2);
    }
    return isSorted;
}

/**
 * isSortedObjects(rows, keys, fQuiet)
 *
 * @param {Array.<object>} rows
 * @param {Array.<string>} keys
 * @param {boolean} [fQuiet]
 * @return {boolean}
 */
function isSortedObjects(rows, keys, fQuiet)
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
            warning("row %d '%s' (%s) > row %d '%s' (%s)\n", i-1, key, row1[key], i, key, row2[key]);
        }
    }
    return isSorted;
}

/**
 * searchObjects(rows, row, next, fSub)
 *
 * @param {Array.<object>} rows
 * @param {object} row
 * @param {number} [next]
 * @param {boolean} [fSub] (true to perform substring comparisons; default is equality checks)
 * @return {number} (index of position, or -1 if not found)
 */
function searchObjects(rows, row, next=0, fSub=false)
{
    let i, keys = Object.keys(row);
    for (i = next; i < rows.length; i++) {
        let k;
        for (k = 0; k < keys.length; k++) {
            let key = keys[k];
            if (fSub && rows[i][key].indexOf(row[key]) < 0 || !fSub && rows[i][key] != row[key]) {
                break;
            }
        }
        if (k == keys.length) {
            break;
        }
    }
    return (i < rows.length)? i : -1;
}

/**
 * searchSortedObjects(rows, row, rowScore, fDisplay)
 *
 * If rowScore is set, then if there are multiple matches, the row that scores best against
 * rowScore will be returned.  If you just want the first match, regardless whether there are
 * multiple matches or not, specify null (the default).  And if you only want unique matches,
 * pass {}.
 *
 * @param {Array.<object>} rows
 * @param {object} row
 * @param {object} [rowScore]
 * @param {boolean} [fDisplay]
 * @return {number}
 */
function searchSortedObjects(rows, row, rowScore=null, fDisplay=false)
{
    let keys = Object.keys(row);
    let compare = function(row1, row2) {
        for (let k = 0; k < keys.length; k++) {
            let key = keys[k];
            let v1 = row1[key], v2 = row2[key];
            // if (typeof v1 == "string" && v1.slice(-1) == '.') v1 = v1.slice(0, -1);
            // if (typeof v2 == "string" && v2.slice(-1) == '.') v2 = v2.slice(0, -1);
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
    if (fDisplay) printf("\n\tsearching for row with %s == %s\n", keys[0], row[keys[0]]);
    let i = binarySearch(rows, row, compare);
    while (i > 0) {
        if (compare(rows[i], rows[i-1])) break;
        i--;
    }
    if (rowScore && i >= 0) {
        let iBest = i, scoreBest = 0;
        let keys = Object.keys(rowScore);
        if (!keys.length) {
            if (i < rows.length - 1 && !compare(rows[i], rows[i+1])) {
                iBest = -1;
            }
            return iBest;
        }
        let keyScore = keys[0];
        if (fDisplay && keyScore) printf("\tmatched row %d: %s == %s (looking for %s)\n", iBest, keyScore, rows[iBest][keyScore], rowScore[keyScore]);
        while (i < rows.length) {
            if (compare(rows[i], rows[iBest])) break;
            let score = scoreStrings(rows[i][keyScore], rowScore[keyScore]);
            if (fDisplay) printf("\tcomparing row %d: %s = %s (%d)\n", i, keyScore, rows[i][keyScore], score);
            if (scoreBest < score) {
                scoreBest = score;
                iBest = i;
            }
            i++;
        }
        i = scoreBest? iBest : -1;
        if (fDisplay && keyScore) printf("\treturned row %d: %s == %s (%d)\n", i, keyScore, rows[iBest][keyScore], scoreBest);
    }
    return i;
}

/**
 * sortObjects(rows, keys, order)
 *
 * @param {Array.<object>} rows
 * @param {Array.<string>} keys
 * @param {number} [order] (default is 1, for ascending order; use -1 for descending order)
 */
function sortObjects(rows, keys, order=1)
{
    rows.sort(function(row1, row2) {
        for (let k = 0; k < keys.length; k++) {
            let key = keys[k];
            if (row1[key] > row2[key]) return order;
            if (row1[key] < row2[key]) return -order;
            if (k == keys.length - 1) return 0;
        }
    });
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
                    warning("CSV field heading %d (%s) is invalid or duplicate\n", h, heading);
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
                        warning("%s field is an undefined type, defaulting to string\n", heading);
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
                                            warning("record %s field %s has unexpected value '%s'\n", fieldUnique, heading, field);
                                        } else {
                                            warning("CSV row %d field %s has unexpected value '%s'\n", i+1, heading, field);
                                        }
                                    }
                                }
                            }
                        }
                        if (t.type == "number") {
                            field = +field;
                        } else if (t.type == "date") {
                            if (field) {
                                field = sprintf("%#Y-%#02M-%#02D", field);
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
                warning("CSV row %d has %d fields, expected %d\n", i+1, fields.length, headings.length);
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
 * readCSV(filePath, encoding, encodeAs)
 *
 * @param {string} filePath
 * @param {string} [encoding] (default is UTF-8; you may need to specify "latin1" for 3rd-party CSVs)
 * @param {string} [encodeAs] (default is none; use "html" if you want all string fields to contain HTML entities as appropriate)
 * @return {Array}
 */
function readCSV(filePath, encoding="", encodeAs="")
{
    return parseCSV(readFile(filePath, encoding) || "", encodeAs);
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
    if (rows.length) {
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
    }
    writeFile(filePath, text, fOverwrite);
}

/**
 * readFile(filePath, encoding, fOptional)
 *
 * @param {string} filePath
 * @param {string} [encoding] (default is UF-8)
 * @param {boolean} [fOptional]
 * @return {string|undefined}
 */
function readFile(filePath, encoding="", fOptional=false)
{
    let text;
    try {
        if (filePath[0] == '/') filePath = path.join(rootDir, filePath);
        text = fs.readFileSync(filePath, encoding || "utf-8");
        if (!encoding) checkASCII(text, filePath);
    }
    catch(err) {
        if (!fOptional) printf("%s\n", err.message);
    }
    return text;
}

/**
 * writeFile(filePath, text, fOverwrite)
 *
 * @param {string} filePath
 * @param {string|object} text (if you pass an object, we automatically "stringify" it into JSON)
 * @param {boolean} [fOverwrite] (default is false)
 * @return {boolean}
 */
function writeFile(filePath, text, fOverwrite=argv['overwrite'])
{
    if (typeof text == "object") {
        text = sprintf("%2j\n", text);
        checkASCII(text, filePath);
    }
    if (filePath[0] == '/') filePath = path.join(rootDir, filePath);
    if (fOverwrite || !fs.existsSync(filePath)) {
        try {
            let dirPath = path.dirname(filePath);
            if (!fs.existsSync(dirPath)) mkdirp.sync(dirPath);
            fs.writeFileSync(filePath, text);
            return true;
        }
        catch(err) {
            printf("%s\n", err.message);
        }
    } else {
        printf("file %s already exists, use --overwrite to recreate\n", filePath);
    }
    return false;
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
                let iStart, iNext = 0;
                while ((iStart = text.indexOf(filters[i], iNext)) >= 0) {
                    iNext = iStart + filters[i].length;
                    let iStop = text.indexOf('\n', iStart);
                    if (iStop >= 0) {
                        textNew += text.substring(iStart, iStop + 1);
                        iNext = iStop + 1;
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
 * getLOCURL(usCite)
 *
 * @param {string} usCite
 * @return {string}
 */
function getLOCURL(usCite)
{
    let cite = {}, url = "";
    if (parseCite(usCite, cite) && cite.volume <= 542) {
        url = sprintf("https://cdn.loc.gov/service/ll/usrep/usrep%03d/usrep%03d%03d/usrep%03d%03d.pdf", cite.volume, cite.volume, cite.page, cite.volume, cite.page);
    }
    return url;
}

/**
 * function getNewCite(volume, page)
 *
 * @param {number} volume
 * @param {number} page
 * @return {string}
 */
function getNewCite(volume, page)
{
    return (volume || "___") + " U.S. " + (page || "___");
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
    let oldCite = "";
    if (volume) {
        let reporter = "", volBegin = 0
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
    }
    return oldCite;
}

/**
 * parseCite(usCite, cite)
 *
 * @param {string} usCite
 * @param {Decision} [cite]
 * @return {boolean}
 */
function parseCite(usCite, cite)
{
    if (usCite) {
        let match = usCite.match(/([0-9]+)\s*U\.?\s*S\.?\s*([0-9]+)/i);
        if (match) {
            if (cite) {
                cite.volume = +match[1];
                cite.page = +match[2];
            }
            return true;
        }
    }
    if (cite) cite.volume = cite.page = 0;
    return false;
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
            warning("unable to find HTML court '%s' in XML courts\n", name);
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
            let filePath = path.join("sources/oyez/courts", court.id, "image-small.jpg");
            if (fs.existsSync(filePath)) {
                court.photoSmall = filePath;
                fixes++;
            }
        }
        if (!court.photoLarge) {
            let filePath = path.join("sources/oyez/courts", court.id, "image-large.jpg");
            if (fs.existsSync(filePath)) {
                court.photoLarge = filePath;
                fixes++;
            }
        }
    }
    printf("courts read: %d\n", courts.length);
    if (fixes) {
        printf("writing %d corrections to %s\n", fixes, results.json.courts);
        writeFile(results.json.courts, courts);
    }
    return courts;
}

/**
 * getOyezDates(timeline, event)
 *
 * @param {Array} timeline
 * @param {string} event
 * @return {string}
 */
function getOyezDates(timeline, event)
{
    let dates = [];
    if (timeline) {
        for (let i = 0; i < timeline.length; i++) {
            let item = timeline[i];
            if (item.event == event) {
                for (let j = 0; j < item.dates.length; j++) {
                    let date = new Date(item.dates[j] * 1000);
                    insertSortedArray(dates, sprintf("%#Y-%#02M-%#02D", date));
                }
            }
        }
    }
    return dates.join(',');
}

/**
 * readOyezCaseData(filePath, caseTitle, docket, dateArgued, advocateName)
 *
 * @param {string} filePath
 * @param {string} [caseTitle]
 * @param {string} [docket]
 * @param {string} [dateArgued]
 * @param {string} [advocateName]
 * @return {object|undefined}
 */
function readOyezCaseData(filePath, caseTitle, docket, dateArgued, advocateName)
{
    let row;
    let caseDetail = JSON.parse(readFile(filePath) || "{}");
    if (caseDetail.ID) {
        row = {};
        let docket_number = docket || caseDetail.docket_number;
        row.oyezId = caseDetail.ID.toString();
        row.volume = caseDetail.citation && +caseDetail.citation.volume || 0;
        row.page = caseDetail.citation && +caseDetail.citation.page || 0;
        row.year = caseDetail.citation && +caseDetail.citation.year || 0;
        row.caseTitle = encodeString(caseTitle || caseDetail.name, "html");
        row.oldCite = getOldCite(row.volume, row.page);
        row.usCite = getNewCite(row.volume, row.page);
        row.dateDecision = getOyezDates(caseDetail.timeline, "Decided");
        row.docket = fixOyezDocketNumber(docket_number);
        if (!docket && caseDetail.additional_docket_numbers) {
            caseDetail.additional_docket_numbers.forEach((docket) => {
                if (docket) {
                    docket = fixOyezDocketNumber(docket);
                    if (row.docket) row.docket += ',';
                    row.docket += docket;
                }
            });
        }
        row.term = caseDetail.term || 0;
        row.termId = getTermDate(row.term).substr(0,7);
        row.issue = "";
        let urlOyez = caseDetail.href.replace("api.", "www.");
        /*
         * For purposes of our advocate tables, making the distinction between argument
         * and reargument dates is neither necessary nor helpful.  In fact, it's the opposite
         * of helpful.  Our advocate reports are focussed on number of appearances.
         *
         * Hence, the additional variable: datesArgued.
         */
        let correction = false;
        row.dateArgument = getOyezDates(caseDetail.timeline, "Argued");
        row.dateRearg = getOyezDates(caseDetail.timeline, "Reargued");
        if (row.usCite == "400 U.S. 48") {
            if (row.dateArgument == "1970-10-22") {
                row.dateArgument = "1970-01-21,1970-10-22";
                correction = true;
            }
        }
        else if (row.usCite == "422 U.S. 617") {
            if (row.dateArgument == "1975-04-15,1975-04-16") {
                row.dateArgument = "1975-04-14,1975-04-15";
                correction = true;
            }
        }
        else if (row.usCite == "396 U.S. 212") {
            if (row.dateArgument == "1969-03-25,1969-10-20") {
                row.dateArgument = "1969-03-25";
                correction = true;
            }
        }
        // if (correction) {
        //     warning("%s (%s) has corrected argument dates (%s)\n%s\n\n", row.caseTitle, row.usCite, row.dateArgument, urlOyez);
        // }
        row.datesArgued = row.dateArgument;
        if (row.dateRearg) {
            if (!row.datesArgued) {
                warning("%s (%s) has reargument (%s) without argument\n", row.caseTitle, row.usCite, row.dateRearg);
            } else {
                row.datesArgued += ',' + row.dateRearg;
            }
        }
        /*
         * If there are any inconsistencies in OYEZ's data with regard to argument dates and audio dates,
         * let's catch those.
         */
        let dateAudio = "";
        if (caseDetail.oral_argument_audio) {
            caseDetail.oral_argument_audio.forEach((audio) => {
                let date;
                if (!audio.title ||
                    audio.title.indexOf("unavailable") >= 0 ||
                    audio.title.indexOf("No oral argument") >= 0 ||
                    audio.title == "Oral argument") {
                    return;
                }
                let match = audio.title.match(/([A-Z]+)\s+([0-9]+),\s+([0-9][0-9][0-9][0-9])/i);
                if (match) {
                    date = parseDate(match[0]);
                    if (!isValidDate(date)) match = null;
                }
                if (match) {
                    let sDate = sprintf("%#Y-%#02M-%#02D", date);
                    if (row.datesArgued.indexOf(sDate) < 0) {
                        warning("%s (%s) has an EXTRA audio date (%s)\n%s\n\n", row.caseTitle, row.usCite, sDate, urlOyez);
                    }
                    if (dateAudio) dateAudio += ',';
                    dateAudio += sDate;
                } else {
                    warning("%s (%s) has an invalid audio date (%s)\n%s\n\n", row.caseTitle, row.usCite, audio.title, urlOyez);
                }
            });
        }
        if (dateArgued) {
            /*
             * If a specific argument date has been requested, let's validate it, and if it passes, use it.
             */
            if (row.datesArgued.indexOf(dateArgued) < 0) {
                warning("dateArgued (%s) not present in datesArgued (%s)\n", dateArgued, row.datesArgued);
            } else {
                row.datesArgued = dateArgued;
            }
        }
        let days = row.datesArgued.split(',');
        row.daysArgument = days.length;
        for (let i = 0; i < days.length; i++) {
            if (dateAudio.indexOf(days[i]) < 0 && argv['detail']) {
                printf("%s (%s) missing argument audio for %s\n%s\n\n", row.caseTitle, row.usCite, days[i], urlOyez);
            }
            // if (!i) continue;
            // let date1 = adjustDays(parseDate(days[i-1]), 1);
            // let date2 = parseDate(days[i]);
            // if (date1.toString() != date2.toString()) {
            //     printf("%s (%s) argued for %d days non-consecutively (%s)\n%s\n\n", row.caseTitle, row.usCite, row.daysArgument, row.datesArgued, urlOyez);
            //     break;
            // }
        }
        row.votesPetitioner = 0;
        row.votesRespondent = 0;
        if (advocateName) {
            row.advocateName = advocateName;
            row.advocateRole = "";
        }
        if (row.term) {
            if (row.term < 2004) {
                row.pdfSource = "loc";          // ie, Library of Congress
            } else if (row.term < 2012) {
                row.pdfSource = "scotusBound";  // ie, supremecourt.gov, in the "Bound Volumes" folder
            } else {
                row.pdfSource = "slipopinion/" + (row.term % 100);
            }
        }
        row.urlOyez = urlOyez;
    }
    return row;
}

/**
 * readOyezTranscriptData(filePath)
 *
 * @param {string} filePath
 * @return {object}
 */
function readOyezTranscriptData(filePath)
{
    let data = {text: []};
    let transcriptDetail = JSON.parse(readFile(filePath) || "{}");
    if (transcriptDetail && transcriptDetail.transcript) {
        transcriptDetail.transcript.sections.forEach((section) => {
            section.turns.forEach((turn) => {
                if (turn.speaker) {
                    data.text.push(turn.speaker.name);
                }
                turn.text_blocks.forEach((block) => {
                    data.text.push('\t' + block.text);
                });
            });
        });
    }
    return data;
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
    sortObjects(courts, ["start"]);
    printf("Oyez courts read: %d\n", courts.length);
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
            justice.start = sprintf("%#Y-%#02M-%#02D", date);
            justice.startFormatted = sprintf("%#C", justice.start);
            if (xmlAppt.justiceEndDate) {
                date = datelib.adjustDays(parseDate(xmlAppt.justiceEndDate[0]._), 1);
                justice.stop = sprintf("%#Y-%#02M-%#02D", date);
                justice.stopFormatted = sprintf("%#C", justice.stop);
                if (xmlAppt.justiceReasonForLeaving) {
                    justice.stopReason = xmlAppt.justiceReasonForLeaving[0];
                } else {
                    warning("justice '%s' stopped for no reason\n", justice.name);
                }
            }
            justices.push(justice);
        }
    }
    sortObjects(justices, ["start"]);
    printf("Oyez justices read: %d\n", justices.length);
    return justices;
}

/**
 * readOyezLabsDecisions()
 *
 * @return {Array.<Decision>}
 */
function readOyezLabsDecisions()
{
    let getXMLValue = function(element, number=false, index=0) {
        let value = "";
        if (element) {
            if (typeof element[index] == "string") {
                value = element[index];
            } else {
                value = element[index]._ || "";
            }
            value = value.replace(/\s+/g, ' ').trim();
            if (number) value = +value || 0;
        }
        return value;
    };
    let decisions = readCSV(sources.oyezlabs.casesCSV);
    if (!decisions.length) {
        printf("reading OyezLabs decisions...\n");
        let fileSpec = sources.oyezlabs.casesXML.replace('$1', argv['group'] || "**");
        let filePaths = glob.sync(rootDir + fileSpec);
        printf("total OyezLabs XML files: %d\n", filePaths.length);
        for (let i = 0; i < filePaths.length; i++) {
            let xml = readXMLFile(filePaths[i], [
                "<case ",
                "<caseTerm",
                "<caseTitle",
                "<caseDocket",
                "<caseDecisionDate",
                "<caseOpinionVol",
                "<caseOpinionPage",
                "<caseOpinionYear",
                "<caseOpinionCitation",
                "<caseArgumentDate",
                "<caseAdvocateName",
                "</case>"
            ]);
            if (xml) {
                let decision = {};
                decision.volume = getXMLValue(xml.case.caseOpinionVol, true);
                decision.page = getXMLValue(xml.case.caseOpinionPage, true);
                decision.year = getXMLValue(xml.case.caseOpinionYear, true);
                decision.caseTitle = getXMLValue(xml.case.caseTitle);
                decision.usCite = getXMLValue(xml.case.caseOpinionCitation);
                let i = decision.usCite.indexOf(" (");
                if (i > 0) decision.usCite = decision.usCite.substr(0, i);
                decision.dateDecision = getXMLValue(xml.case.caseDecisionDate);
                decision.docket = getXMLValue(xml.case.caseDocket);
                decision.term = getXMLValue(xml.case.caseTerm);
                decision.dateArgument = "";
                if (xml.case.caseArgumentDate) {
                    for (let i = 0; i < xml.case.caseArgumentDate.length; i++) {
                        let value = getXMLValue(xml.case.caseArgumentDate, false, i);
                        if (decision.dateArgument.indexOf(value) < 0) {
                            if (decision.dateArgument) decision.dateArgument += ',';
                            decision.dateArgument += value;
                        }
                    }
                }
                decision.advocateName = "";
                if (xml.case.caseAdvocateName) {
                    for (let i = 0; i < xml.case.caseAdvocateName.length; i++) {
                        let value = getXMLValue(xml.case.caseAdvocateName, false, i);
                        if (decision.advocateName.indexOf(value) < 0) {
                            if (decision.advocateName) decision.advocateName += ';';
                            decision.advocateName += value;
                        }
                    }
                }
                decisions.push(decision);
                if (decisions.length % 1000 == 0) printf(".");
            }
        }
        printf("\ntotal OyezLabs decisions read: %d\n", decisions.length);
        writeCSV(sources.oyezlabs.casesCSV, decisions);
    }
    return decisions;
}

/**
 * readSCDBCourts(fDisplay)
 *
 * @param {boolean} [fDisplay]
 * @return {Array.<Court>}
 */
function readSCDBCourts(fDisplay)
{
    let startNext = null;
    let courts = readCSV(sources.scdb.courtsCSV, "", "html");
    let justices = readSCDBJustices();
    for (let i = 0; i < courts.length; i++) {
        let court = courts[i];
        let start = parseDate(court.dateStart);
        /*
         * WARNING: The final court will not have a stop date, so parseDate() will return
         * an invalid Date object.  This means that when we call:
         *
         *      court.stop = sprintf("%#Y-%#02M-%#02D", stop)
         *
         * the resulting string will look like "NaN-NaN-NaN".  But that's OK, because that string
         * will always compare as GREATER than other dates.
         */
        let stop = parseDate(court.dateStop);
        if (startNext && start.getTime() != startNext.getTime()) {
            warning("%s: current start date (%#C) does not match previous stop date (%#C)\n", court.name, start, startNext);
        }
        let match = court.name.match(/^(\S+)\s+([0-9]+)/);
        let chiefJustice = match? match[1] : "";
        court.start = sprintf("%#Y-%#02M-%#02D", start);
        court.startFormatted = sprintf("%#C", start);
        court.stop = sprintf("%#Y-%#02M-%#02D", stop);
        court.stopFormatted = isValidDate(stop)? "" : sprintf("%#C", stop);
        court.justices = [];
        let sJustices = "";
        justices.forEach((justice) => {
            if (justice.stop <= court.start || justice.start >= court.stop) return;
            if (chiefJustice && justice.id.indexOf(chiefJustice) >= 0) {
                court.justices.unshift(justice.id);
                if (sJustices) sJustices = ',' + sJustices;
                sJustices = justice.id + sJustices;
            } else {
                court.justices.push(justice.id);
                if (sJustices) sJustices += ',';
                sJustices += getJusticeId(justice.id);
            }
        });
        if (fDisplay) {
            printf("%s (%s to %s): %d justices (%s)\n", court.name, court.startFormatted, court.stopFormatted, court.justices.length, sJustices);
        }
        startNext = datelib.adjustDays(stop, 1);
    }
    if (fDisplay) printf("SCDB courts read: %d\n", courts.length);
    return courts;
}

/**
 * readSCDBJustices(fDisplay)
 *
 * @param {boolean} [fDisplay]
 * @return {Array.<Justice>}
 */
function readSCDBJustices(fDisplay)
{
    let justices = readCSV(sources.scdb.justicesCSV, "", "html");
    for (let i = 0; i < justices.length; i++) {
        let first, last;
        let justice = justices[i];
        let match = justice.name.match(/(.*),\s*(.*)/);
        if (match) {
            first = match[2];
            last = match[1];
            justice.name =  first + ' ' + last;
        }
        /*
         * WARNING: Active justices will not have a stop date, so parseDate() will return
         * an invalid Date object.  This means that when we call:
         *
         *      court.stop = sprintf("%#Y-%#02M-%#02D", stop)
         *
         * the resulting string will look like "NaN-NaN-NaN".  But that's OK, because that string
         * will always compare as GREATER than other dates.
         */
        let start = parseDate(justice.dateStart);
        let stop = parseDate(justice.dateStop);
        delete justice.dateStart;
        delete justice.dateStop;
        justice.start = sprintf("%#Y-%#02M-%#02D", start);
        assertMatch(justice.start, sprintf("%#04Y-%#02M-%#02D", start), "justice.start");
        justice.startFormatted = sprintf("%#C", start);
        justice.stop = sprintf("%#Y-%#02M-%#02D", stop);
        justice.stopFormatted = isValidDate(stop)? "" : sprintf("%#C", stop);
    }
    if (fDisplay) printf("SCDB justices read: %d\n", justices.length);
    return justices;
}

/**
 * readSCOTUSDecisions()
 *
 * @return {Array}
 */
function readSCOTUSDecisions()
{
    let startNext = null;
    let decisions = readCSV(results.csv.dates, "", "html");
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
    //             warning("FreeLaw row %d (%s) does not match SCOTUS row (%s)\n", i + 1, rowsFreeLaw[i][1], decisions[i].caseTitle);
    //         }
    //         if (rowsFreeLaw[i][4] != decisions[i].dateDecision) {
    //             warning("FreeLaw row %d (%s) does not match SCOTUS row (%s)\n", i + 1, rowsFreeLaw[i][4], decisions[i].dateDecision);
    //         }
    //     }
    // }
    //
    let decisionsScotus = {};
    for (let i = 0; i < decisions.length; i++) {
        let decision = decisions[i];
        if (!decision.dateDecision) {
            warning("%s (%s) has no decision date\n", decision.caseTitle, decision.usCite);
            continue;
        }
        if (!parseCite(decision.usCite, decision)) {
            warning("%s (%s) has unrecognized citation\n", decision.caseTitle, decision.usCite);
            continue;
        }
        if (decision.dateDecision.length > 10) {
            let date = parseDate(decision.dateDecision);
            decision.dateDecision = sprintf("%#Y-%#02M-%#02D", date);
        }
        if (!decisionsScotus[decision.usCite]) decisionsScotus[decision.usCite] = [];
        decisionsScotus[decision.usCite].push(decision);
    }
    return decisionsScotus;
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
 * findByDateAndDocket(decisions, date, docket)
 *
 * @param {Array.<Decision>} decisions
 * @param {string} date
 * @param {string} docket
 * @return {number}
 */
function findByDateAndDocket(decisions, date, docket)
{
    let dockets = docket.split(',');
    let searchByDate = function(obj) {
        let i, next = 0;
        while ((i = searchObjects(decisions, obj, next, true)) >= 0) {
            let j;
            let docketList = decisions[i].docket.split(',');
            for (j = 0; j < dockets.length; j++) {
                if (docketList.indexOf(dockets[j]) >= 0) break;
            }
            if (j < dockets.length) break;
            next = i + 1;
        }
        return i;
    };
    let i = searchByDate({dateArgument: date});
    if (i < 0) i = searchByDate({dateRearg: date});
    return i;
}

/**
 * buildAdvocates()
 *
 * @param {function()} done
 */
function buildAdvocates(done)
{
    let vars = JSON.parse(readFile(sources.scdb.vars) || "{}");
    let courtsSCDB = readSCDBCourts();
    // let courts = JSON.parse(readFile(results.json.courts) || "[]");
    let justices = JSON.parse(readFile(results.json.justices) || "[]");
    let dataFile = _data.allDecisions;
    let decisions = JSON.parse(readFile(dataFile) || "[]");
    sortObjects(decisions, ["volume", "page"]);
    let advocates = JSON.parse(readFile(sources.oyez.advocates) || "{}");

    if (advocates) {
        let ids = Object.keys(advocates.ids);
        let top100 = [];
        let pathAdvocates = "/advocates/top100";
        ids.forEach((id) => {
            let aliases = advocates.ids[id];
            let verified = undefined;
            if (aliases[aliases.length - 1] == "verified" || aliases[aliases.length - 1] == "unverified") {
                verified = (aliases[aliases.length - 1] == "verified");
                aliases.splice(aliases.length - 1, 1);
            }
            let dir = path.join(path.dirname(sources.oyez.advocates), id);
            let filePath = path.join(dir, id + ".csv");
            if (!fs.existsSync(rootDir + filePath) || argv['overwrite'] && !verified) {
                let rows = [];
                for (let i = 1; i < aliases.length; i++) {
                    let alias = aliases[i];
                    let filePath = path.join(dir, alias + ".json");
                    let cases = JSON.parse(readFile(filePath) || "[]");
                    if (i == 1) {
                        let missingCases = advocates.missingCases && advocates.missingCases[id];
                        if (missingCases) {
                            missingCases.forEach((obj) => {
                                let i = searchObjects(cases, {"ID": obj.ID});
                                if (i >= 0) cases.splice(i, 1);
                            });
                            cases.push(...missingCases);
                        }
                    }
                    cases.forEach((obj) => {
                        let dir = path.join(path.dirname(sources.oyez.cases), obj.term);
                        let fileID = obj.fileID || (obj.docket_number + '_' + obj.ID);
                        let file = fileID + ".json";
                        let filePath = path.join(dir, file);
                        let row = readOyezCaseData(filePath, obj.title, obj.consolidated_docket_number, obj.date_argued, aliases[0]);
                        if (row) {
                            if (row.datesArgued) {
                                delete row.dateArgument;
                                delete row.dateRearg;
                                rows.push(row);
                            } else {
                                warning("%s (%s) has no Oyez argument date for %s\n", row.caseTitle, row.usCite, row.advocateName);
                            }
                        }
                    });
                }
                sortObjects(rows, ["datesArgued","docket"]);
                writeCSV(filePath, rows);
            }
            let rowsAdvocate = readCSV(filePath);
            if (rowsAdvocate && rowsAdvocate.length) {
                let results = [], changes = 0;
                let pathAdvocate = pathAdvocates + "/" + id;
                let nameAdvocate = rowsAdvocate[0].advocateName;
                let fileText = '---\ntitle: "Cases Argued by ' + nameAdvocate + '"\npermalink: ' + pathAdvocate + '\nlayout: cases\n';
                rowsAdvocate.forEach((row) => {
                    let i = -1, obj;
                    let dateArgument = row.datesArgued.split(',')[0];
                    if (row.volume && row.page) {
                        obj = {volume: row.volume, page: row.page};
                        i = searchSortedObjects(decisions, obj, {});
                    }
                    if (i < 0 && dateArgument) {
                        /*
                         * We must perform a much slower search, based solely on argument date and docket number.
                         */
                        i = findByDateAndDocket(decisions, dateArgument, row.docket)
                    }
                    if (i >= 0) {
                        let argument = cloneObject(decisions[i]);
                        if (!row.usCite) {
                            if (argument.usCite) {
                                row.usCite = argument.usCite;
                                changes++;
                            }
                        } else {
                            if (!argument.usCite) {
                                argument.usCite = row.usCite;
                            }
                        }
                        argument.dateArgument = dateArgument;
                        if (!row.votesPetitioner && !row.votesRespondent && (argument.majVotes || argument.minVotes)) {
                            if (argument.partyWinning == "petitioning party received a favorable disposition") {
                                row.votesPetitioner = argument.majVotes;
                                row.votesRespondent = argument.minVotes;
                                changes++;
                            } else if (argument.partyWinning == "no favorable disposition for petitioning party apparent") {
                                row.votesPetitioner = argument.minVotes;
                                row.votesRespondent = argument.majVotes;
                                changes++
                            }
                        }
                        if (!row.issue && argument.issue) {
                            row.issue = argument.issue;
                            changes++;
                        }

                        /*
                         * The advocate CSV generally has more precise data regarding actual arguments, so let's use that instead.
                         */
                        argument.caseTitle = row.caseTitle;
                        argument.docket = row.docket;

                        argument.urlOyez = row.urlOyez;
                        results.push(argument);
                    } else {
                        row.dateArgument = dateArgument;
                        results.push(row);
                        if (row.dateArgument < sources.scdb.dateEnd) {
                            warning("unable to find exact match for %s: %s [%s] (%s) Argued=%s Decided=%s\n", nameAdvocate, row.caseTitle, row.docket, row.usCite, row.datesArgued, row.dateDecision);
                        }
                    }
                });
                if (changes) writeCSV(filePath, rowsAdvocate);
                sortObjects(results, ["dateArgument","docket"]);
                if (verified !== false) {
                    top100.push({id, nameAdvocate, total: results.length, verified});
                }
                fileText += generateCaseYML(results, vars, courtsSCDB, justices, ["caseNumber","dateArgument","urlOyez"]);
                fileText += '---\n\n';
                fileText += nameAdvocate + " argued " + rowsAdvocate.length + " times in the U.S. Supreme Court";
                filePath = "/_pages" + pathAdvocate + ".md", fileText;
                let oldText = readFile(filePath);
                if (oldText) {
                    let match = oldText.match(/^---\n[\s\S]*?\n---\n\n.*? argued [0-9]+ times in the U.S. Supreme Court([\s\S]*)$/);
                    oldText = match? match[1] : "";
                }
                if (oldText) {
                    fileText += oldText;
                } else {
                    fileText += ", according to [Oyez](https://www.oyez.org/advocates/" + aliases[1] + ").\n";
                }
                writeFile(filePath, fileText);
            }
        });
        sortObjects(top100, ["total"], -1);
        let filePath = "/_pages" + pathAdvocates + "/all.md";
        let text = readFile(filePath);
        if (text) {
            let match = text.match(/^([\s\S]*)\n## Top Advocates\n\n/);
            if (match) {
                text = match[0];
                top100.forEach((advocate) => {
                    text += "- [" + advocate.nameAdvocate + "](/advocates/top100/" + advocate.id + ") (" + (advocate.verified? "" : "at least ") + advocate.total + " arguments)\n";
                });
            }
            writeFile(filePath, text);
        }
    }
    done();
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
                        warning("unrecognized reporter '%s' for '%s' (see %s: '%s')\n", reporter, caseTitle, filePaths[i], html.substr(match.index, 100).trim());
                        continue;
                    }
                    let page = match[5];
                    let year = +match[6];
                    let oldCite = "";
                    if (volBegin < 91) {
                        if (!+page) {
                            warning("unrecognized page '%s' for '%s' (see %s: '%s')\n", page, caseTitle, filePaths[i], html.substr(match.index, 100).trim());
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
        if (!csvJustia) csvJustia = "volume,page,year,caseTitle,oldCite,usCite,dateDecision\n";
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
                        warning("citation (%s) does not match link (%s U.S. %s)\n", usCite, match[2], match[3]);
                    }
                    let oldCite = getOldCite(volume, page);
                    let matchDate = match[7].match(/<span[^>]*>\s*<strong>Date:<\/strong>\s*([^<]*)([0-9][0-9][0-9][0-9])\s*<\/span>/);
                    if (matchDate) {
                        let date = parseDate(matchDate[1] + matchDate[2]);
                        dateDecision = sprintf("%#Y-%#02M-%#02D", date);
                        year = +matchDate[2];
                    }
                    let cite = {volume, page, year, dateDecision, caseTitle, oldCite, usCite};
                    if (!citesJustia[usCite]) citesJustia[usCite] = [];
                    citesJustia[usCite].push(cite);
                    if (!volumesJustia[volume]) volumesJustia[volume] = [];
                    volumesJustia[volume].push(cite);
                    csvJustia += sprintf('%d,%d,%d,"%s","%s","%s","%s"\n', volume, page, year, caseTitle.replace(/"/g, '""'), oldCite, usCite, dateDecision);
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
                            warning("SCOTUS citation (%s) doesn't match LOC citation (%s)\n", citeScotus.oldCite, citeLoc.oldCite);
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
                    warning("unable to find SCOTUS citation '%s' (%s) in LOC citations\n", citeScotus.caseTitle, citeScotus.usCite);
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
                // warning("unable to find SCOTUS volume %d in LOC citations\n", volume);
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
                            warning("LOC citation (%s) doesn't match SCOTUS citation (%s)\n", citeLoc.oldCite, citeScotus.oldCite);
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
                    warning("unable to find LOC citation '%s' (%s) in SCOTUS citations\n", citeLoc.caseTitle, citeLoc.usCite);
                    let row = {
                        volume: citeLoc.volume,
                        page: citeLoc.page,
                        year: citeLoc.year,
                        caseTitle: citeLoc.caseTitle,
                        oldCite: citeLoc.oldCite,
                        usCite: citeLoc.usCite
                    };
                    insertSortedObject(rowsScotus, row, ["volume", "page", "caseTitle"]);
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
        //     warning("unable to find LOC volume %d in SCOTUS citations\n", volume);
        // }
    });

    /*
     * Phase 6: Verify that all cases in dates.csv are recorded in citations.csv
     */
    let rowsDates = readCSV(results.csv.dates);
    rowsDates.forEach((cite) => {
        if (parseCite(cite.usCite, cite) && !citesScotus[cite.usCite]) {
            warning("unable to find date citation '%s' (%s) %s in SCOTUS citations\n", cite.caseTitle, cite.usCite, cite.dateDecision);
            let row = {
                volume: cite.volume,
                page: cite.page,
                year: +cite.dateDecision.substr(0, 4),
                caseTitle: cite.caseTitle,
                oldCite: getOldCite(cite.volume, cite.page),
                usCite: cite.usCite
            };
            insertSortedObject(rowsScotus, row, ["volume", "page", "caseTitle"]);
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
            warning("justice %s started in %d courts\n", justice.name, nCourts);
        }
    }

    /*
     * Now walk the courts data, interleaving the courtsSCDB data, to produce a reconciliation spreadsheet.
     */
    let courtsSCDB = readSCDBCourts(true);
    let j = 0;
    let csv = sprintf('"reconcileDB","reconcileName","reconcileStart","reconcileStop"\n');
    for (let i = 0; i <= courts.length; i++) {
        let court = courts[i];
        if (court) csv += sprintf('"OYEZ","%s","%s","%s"\n', court.name, court.startFormatted, court.stopFormatted);
        while (j < courtsSCDB.length) {
            if (court && courtsSCDB[j].start > court.stop) break;
            let courtSCDB = courtsSCDB[j];
            csv += sprintf('"SCDB","%s","%s","%s"\n', courtSCDB.name, courtSCDB.startFormatted, courtSCDB.stopFormatted);
            j++;
        }
    }

    writeFile(results.csv.courts, csv);
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
    if (!isSortedObjects(decisions, ["caseId"])) {
        printf("sorting SCDB decisions by [caseId]...\n");
        sortObjects(decisions, ["caseId"]);
    }
    if (!fs.existsSync(rootDir + results.json.decisions)) {
        sortObjects(decisions, ["caseId"]);
        writeFile(results.json.decisions, decisions);
    } else {
        let decisionsOrig = decisions;
        writeFile(results.json.decisionsOrig, decisionsOrig);
        decisions = JSON.parse(readFile(results.json.decisions));
        if (!isSortedObjects(decisions, ["caseId"])) {
            sortObjects(decisions, ["caseId"]);
            writeFile(results.json.decisions, decisions);
        }
        if (!compareObjectArrays(decisions, decisionsOrig, "caseId")) {
            printf("compare found mismatches\n");
        }
    }
    done();
}

/**
 * buildJustices()
 *
 * @param {function()} done
 */
function buildJustices(done)
{
    let justices = readSCDBJustices();
    let justicesOyez = readOyezJustices();
    justices.forEach((justice) => {
        let first, last;
        let match = justice.name.match(/(.*),\s*(.*)/);
        if (match) {
            first = match[2];
            last = match[1];
            justice.name =  first + ' ' + last;
        }
        let start = parseDate(justice.dateStart);
        let stop = parseDate(justice.dateStop);
        delete justice.dateStart;
        delete justice.dateStop;
        justice.start = sprintf("%#Y-%#02M-%#02D", start);
        justice.startFormatted = sprintf("%#C", start);
        justice.stop = sprintf("%#Y-%#02M-%#02D", stop);
        justice.stopFormatted = sprintf("%#C", stop);
        /*
         * Let's see if we can find a match in the Oyez list...
         */
        let missing = true;
        for (let j = 0; j < justicesOyez.length; j++) {
            let oyez = justicesOyez[j];
            /*
             * OYEZ uses "Brockholst Livingston" and "Frank Murphy",
             * whereas SCDB uses "Henry Livingston" and "Francis Murphy", so we need some variances.
             */
            if (oyez.name.indexOf(last) >= 0 && (oyez.name.indexOf(first) >= 0 || first == "Francis" || first == "Henry")) {
                missing = false;
                if (oyez.start == justice.start) {
                    oyez.scdbJustice = +justice.nid;
                    break;
                } else {
                    warning("SCDB justice '%s' date (%s) doesn't match OYEZ justice '%s' date (%s)\n", justice.name, justice.start, oyez.name, oyez.start);
                }
            }
        }
        if (missing) {
            // warning("unable to find SCDB justice '%s' (%d) in OYEZ\n", justice.name, justice.nid)
            justice.scdbJustice = +justice.nid;
            delete justice.nid;
            justicesOyez.push(justice);
        }
    });
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
            left = left.replace("ENVIRONMENTAL PROTECTION AGENCY", "EPA");
            left = left.replace("FEDERAL AVIATION ADMINISTRATION", "FAA");
            left = left.replace("FEDERAL COMMUNICATIONS COMMISSION", "FCC");
            left = left.replace("FEDERAL ENERGY REGULATORY COMMISSION", "FERC");
            left = left.replace("FEDERAL TRADE COMMISSION", "FTC");
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
 * generateCommonCaseYML(decision, caseNumber, extras)
 *
 * @param {Decision} decision
 * @param {number} [caseNumber]
 * @param {Array.<string>} [extras]
 */
function generateCommonCaseYML(decision, caseNumber=0, extras=[])
{
    let cite = {};
    parseCite(decision.usCite, cite);
    let ymlText = '  - id: "' + (decision.caseId || decision.oyezId) + '"\n';
    if (extras.indexOf("caseNumber") >= 0) {
        ymlText += '    number: ' + caseNumber + '\n';
    }
    ymlText += '    termId: "' + decision.termId + '"\n';
    let title = encodeString(decision.caseTitle || decision.caseName, "html", false);
    ymlText += '    title: "' + title + '"\n';
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
    if (cite.volume) {
        ymlText += sprintf('    volume: "%03d"\n', cite.volume);
    }
    if (cite.page) {
        ymlText += sprintf('    page: "%03d"\n' , cite.page);
    }
    if (decision.docket) {
        ymlText += '    docket: "' + decision.docket + '"\n';
    }
    if (decision.usCite) {
        ymlText += '    citation: "' + decision.usCite + '"\n';
    }
    if (decision.pdfSource) ymlText += '    pdfSource: "' + decision.pdfSource + '"\n';
    if (decision.pdfPage) ymlText += '    pdfPage: ' + decision.pdfPage + '\n';
    if (decision.pdfPageDissent) ymlText += '    pdfPageDissent: ' + decision.pdfPageDissent + '\n';
    if (extras.indexOf("dateArgument") >= 0 && decision.dateArgument) {
        /*
         * TODO: Handle multiple dates more comprehensively.
         */
        ymlText += '    dateArgument: "' + sprintf("%#C", decision.dateArgument.split(',')[0]) + '"\n';
    }
    if (decision.dateDecision) {
        ymlText += '    dateDecision: "' + (decision.dateDecision.length < 10? getTermName(decision.dateDecision) : sprintf("%#C", decision.dateDecision)) + '"\n';
    }
    if (extras.indexOf("urlOyez") >= 0 && decision.urlOyez) {
        ymlText += '    urlOyez: "' + decision.urlOyez + '"\n';
    }
    ymlText += '    voteMajority: ' + (decision.majVotes || 0) + '\n';
    ymlText += '    voteMinority: ' + (decision.minVotes || 0)+ '\n';
    return ymlText;
}

/**
 * generateCaseYML(decisions, vars, courts, justices, extras)
 *
 * @param {Array.<Decision>} decisions
 * @param {object} vars
 * @param {Array.<Court>} courts
 * @param {Array.<Justice>} justices
 * @param {Array.<string>} [extras]
 */
function generateCaseYML(decisions, vars, courts, justices, extras=[])
{
    let ymlText = '';
    let caseNumber = 0;
    decisions.forEach((decision) => {
        caseNumber++;
        if (!ymlText) ymlText = 'cases:\n';
        ymlText += generateCommonCaseYML(decision, caseNumber, extras);
        if (decision.dissenterId) {
            ymlText += '    dissenterId: ' + getJusticeId(decision.dissenterId) + '\n';
            ymlText += '    dissenterName: "' + decision.dissenterName + '"\n';
        } else if (decision.majOpinWriter && decision.majOpinWriter != "none") {
            ymlText += '    authorId: ' + getJusticeId(decision.majOpinWriter) + '\n';
            ymlText += '    authorName: "' + vars.justiceName.values[decision.majOpinWriter] + '"\n';
        }
        if (decision.justices) {
            ymlText += '    votes:\n';
            let votes = sortVotesBySeniority(decision, vars, courts, justices, true);
            votes.forEach((vote) => {
                ymlText += '      - id: ' + getJusticeId(vote.justice) + '\n';
                ymlText += '        name: "' + vars.justiceName.values[vote.justice] + '"\n';
                ymlText += '        majority: ' + (vote.majority == "majority"? "true" : "false") + '\n';
            });
        }
    });
    return ymlText;
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
 * getTerm(date)
 *
 * @param {string} date (eg, dateDecision)
 * @return {string} (yyyy-mm)
 */
function getTerm(date)
{
    let termId = "";
    let parts = date.split('-');
    let year = +parts[0];
    let month = +parts[1];
    // let day = +parts[2] || 0;
    if (year > 1873) {
        if (month < 10) {
            year--;
            month = 10;
        } else {
            month = 10;
        }
    } else {
        year = 0;       // TODO
    }
    if (year) termId = sprintf("%04d-%02d", year, month);
    return termId;
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
            sDate = sprintf("%#Y-%#02M-%#02D", date);
            if (fPrint) printf("term %s: %s\n", dateDelta? "stopped" : term, sprintf("%#C", date));
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
    let termName = "";
    if (termId) {
        termName = sprintf("%#F Term %#Y", termId);
        if (termId >= "1844-12" && termId <= "1849-12") {
            termName = "January Term " + (+termId.substr(0, 4) + 1);
        } else if (termId == "1942-07" || termId == "1953-06" || termId == "1958-08" || termId == "1972-07") {
            termName = sprintf("%#F Special Term %#Y", termId);
        }
    }
    return termName;
}

/**
 * sortVotesBySeniority(decision, vars, courts, justices, fUseNamedCourt)
 *
 * @param {Decision} decision
 * @param {object} vars
 * @param {Array.<Court>} courts (ie, courts from courts.json OR courtsSCDB from readSCDBCourts)
 * @param {Array.<Justice>} justices (all justices across all courts)
 * @param {boolean} [fUseNamedCourt]
 * @return {Array.<Vote>} (actually, each entry is a new object containing a subset of the Vote properties)
 */
function sortVotesBySeniority(decision, vars, courts, justices, fUseNamedCourt)
{
    let votesNew = [];
    let votesOld = decision.justices.slice();
    let court = null, date = decision.dateDecision;
    let caseId = decision.usCite || decision.caseId;

    let i = decision.naturalCourt && decision.naturalCourt.indexOf(':') || -1;
    let namedCourt = i > 0? decision.naturalCourt.substr(0, i) : "";
    for (let i = 0; i < courts.length; i++) {
        if (courts[i].name == namedCourt || date >= courts[i].start && (!courts[i].stop || date <= courts[i].stop)) {
            court = courts[i];
            if (court.naturalCourt && namedCourt && namedCourt != court.name) {
                warning("%s (%s - %s) for dateDecision %s (%s) does not match naturalCourt (%s)\n", court.name, court.startFormatted, court.stopFormatted, date, decision.usCite, decision.naturalCourt);
            }
            if (fUseNamedCourt == (court.name == namedCourt)) break;
        }
    }
    if (court) {
        for (let iCourtJustice = 0; iCourtJustice < court.justices.length; iCourtJustice++) {
            let iJustice = 0, nextJustice = 0;
            let idJustice = court.justices[iCourtJustice];
            /*
             * If the court object contains a 'naturalCourt' value, then it's from readSCDBCourts(),
             * therefore idJustice comes from the 'id' field in justices.csv and should already be a
             * match for one of the 'justice' values in the SCDB votes array.
             */
            if (court.naturalCourt) {
                let k = searchObjects(votesOld, {justice: idJustice});
                if (k >= 0) {
                    votesNew.push({
                        justice: idJustice,
                        majority: votesOld[k].majority
                    });
                    votesOld.splice(k, 1);
                }
                continue;
            }
            /*
             * If the court object does NOT contain a 'naturalCourt' value, then it's from courts.json,
             * which uses justice IDs from justices.json, so we must find the matching justice element and
             * extract its corresponding SCDB ID before attempting to find the justice's vote.
             */
            let obj = {id: idJustice};
            while ((iJustice = searchObjects(justices, obj, nextJustice)) >= 0) {
                nextJustice = iJustice + 1;
                let iSCDBJustice = justices[iJustice].scdbJustice;
                if (iSCDBJustice) {
                    let idSCDBJustice = vars.justice.values[iSCDBJustice];
                    let k = searchObjects(votesOld, {justice: idSCDBJustice});
                    if (k >= 0) {
                        votesNew.push({
                            justice: idSCDBJustice,
                            majority: votesOld[k].majority
                        });
                        votesOld.splice(k, 1);
                        break;
                    }
                }
                else {
                    warning("unable to find SCDB ID for justice ID %s (%s)\n", idJustice, caseId);
                }
            }
            if (iJustice < 0) {
                if (!nextJustice) {
                    warning("unable to find justice ID %s (%s)\n", idJustice, caseId);
                } else {
                    warning("unable to find vote by %s for %s (%s) in %s\n", idJustice, date, caseId, court.name);
                }
            }
        }
        votesOld.forEach((vote) => {
            warning("unable to find %s in justices for %s (%s) in %s\n", vote.justice, date, caseId, court.name);
        });
    } else {
        warning("unable to find suitable court for %s (%s)\n", date, caseId);
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
    let changes = 0;
    let caseId = argv['case'] || "";
    let term = argv['term'] || sTerm, termId;
    let end = argv['end'] || argv['term'] || sEnd, endTerm;
    if (end) endTerm = getTermDate(end);
    let decided = argv['decided'], argued = argv['argued'], reargued = argv['reargued'];
    let start = argv['start'] || "", stop = argv['stop'] || "";
    let month = argv['month'] && sprintf("-%02d-", +argv['month']) || "";
    let selectedCourt = argv['naturalCourt'] || 0;
    let volume = argv['volume'] || argv['v'] || "", page = argv['page'] || argv['p'] || "";
    let cite = {};
    if (parseCite(argv['cite'], cite)) {
        volume = cite.volume; page = cite.page;
    }
    let usCite = sprintf("%s U.S. %s", volume, page);
    let caseTitle = argv['caseTitle'];
    let docket = argv['docket'] || argv['d'];
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

    let additions = 0;
    let dataFile = minVotes == 1? _data.lonerDecisions : _data.allDecisions;
    let data = JSON.parse(!argv['overwrite'] && readFile(dataFile) || "[]");
    let vars = JSON.parse(readFile(sources.scdb.vars) || "{}");
    let courtsSCDB = readSCDBCourts();
    // let courts = JSON.parse(readFile(results.json.courts) || "[]");
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

        let searchResults = [];
        decisions.forEach((decision) => {
            let dateDecision = decision.dateDecision;
            if (dateDecision.length == 7) dateDecision += '-28';
            if (!caseId || decision.caseId == caseId) {
                if (!docket || decision.docket.split(',').indexOf(docket) >= 0) {
                    if (caseTitle === undefined || !caseTitle && !decision.caseTitle || caseTitle == decision.caseTitle) {
                        if (!minVotes || decision.minVotes == minVotes) {
                            if (!decided || dateDecision.indexOf(decided) == 0) {
                                if (!selectedCourt || decision.naturalCourt == selectedCourt) {
                                    if ((!start || dateDecision >= start) && (!stop || dateDecision <= stop)) {
                                        if (!month || decision.dateDecision.indexOf(month) > 0) {
                                            if (!volume || !page && decision.usCite.indexOf(usCite) == 0 || volume && page && decision.usCite == usCite) {
                                                if (!text || findText(decision.caseName)) {
                                                    let datePrint = decision.dateDecision;
                                                    if (!argued || (datePrint = decision.dateArgument).indexOf(argued) == 0 || !reargued && (datePrint = decision.dateRearg).indexOf(argued) == 0 || reargued && (datePrint = decision.dateRearg).indexOf(reargued) == 0) {
                                                        printf("%s: %s [%s] (%s) {%s}: %d-%d\n", datePrint, decision.caseTitle || decision.caseName, decision.docket, decision.usCite, decision.dateArgument + (decision.dateRearg? '|' + decision.dateRearg : ""), decision.majVotes, decision.minVotes);
                                                        if (argv['detail']) {
                                                            printf("\tcaseId: %s\n", decision.caseId);
                                                            let dates = decision.dateArgument.split(',');
                                                            dates.forEach((date) => { if (date) printf("\tdateArgument: \"%#C\"\n", date); });
                                                            dates = decision.dateRearg.split(',');
                                                            dates.forEach((date) => { if (date) printf("\tdateRearg: \"%#C\"\n", date); });
                                                            if (decision.dateDecision) printf("\tdateDecision: \"%#C\"\n", decision.dateDecision);
                                                            if (decision.usCite) printf("\tLibrary of Congress URL for %s: %s\n", decision.usCite, getLOCURL(decision.usCite));
                                                            if (decision.caseNotes) printf("\tcaseNotes: %s\n", decision.caseNotes);
                                                        }
                                                        if (argv['transcript']) {
                                                            let dates = decision.dateArgument.split(',');
                                                            let dockets = decision.docket.split(',');
                                                            dates.forEach((date) => {
                                                                let term = getTerm(date);
                                                                let files = glob.sync(rootDir + "/sources/other/transcripts/" + term.substr(0,4) + "/" + dockets[0] + "_" + date + "*.pdf");
                                                                files.forEach((file) => {
                                                                    printf("  - id: \"%s\"\n", decision.caseId);
                                                                    printf("    termId: \"%s\"\n", term);
                                                                    printf("    title: \"%s\"\n", decision.caseTitle || decision.caseName);
                                                                    if (decision.docket) printf("    docket: \"%s\"\n", decision.docket);
                                                                    if (decision.usCite) printf("    citation: \"%s\"\n", decision.usCite);
                                                                    printf("    dateArgument: \"%#C\"\n", date);
                                                                    if (decision.dateDecision) printf("    dateDecision: \"%#C\"\n", decision.dateDecision);
                                                                    printf("    pdfURL: \"%s\"\n", file.substr(rootDir.length));
                                                                    file = file.replace(".pdf", ".jpg");
                                                                    if (!fs.existsSync(file)) file = rootDir + "/images/thumbnails/transcript.jpg";
                                                                    printf("    pdfThumb: \"%s\"\n", file.substr(rootDir.length));
                                                                });
                                                            });
                                                        }
                                                        searchResults.push(decision);
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
            }
        });

        let range = (start || stop)? sprintf(" in range %s--%s", start, stop) : "";
        let condition = minVotes? sprintf(" with minVotes of %d", minVotes) : "";
        printf("results%s%s: %d\n", range, condition, searchResults.length);

        if (argv['addDocket'] || argv['addArgued'] || argv['addReargued'] || argv['addDecided']) {
            let corrections = 0;
            let reason = argv['reason'] || "";
            if (!reason) {
                warning("please give a reason (--reason) for the correction\n");
            } else if (searchResults.length != 1) {
                warning("too many results (batch operations not yet allowed)\n");
            } else {
                let addDockets = argv['addDocket'] || [];
                if (typeof addDockets == "string") addDockets = [addDockets];
                let addArgDates = argv['addArgued'] || [];
                if (typeof addArgDates == "string") addArgDates = [addArgDates];
                let addReargDates = argv['addReargued'] || [];
                if (typeof addReargDates == "string") addReargDates = [addReargDates];
                let addDecDate = argv['addDecided'] || "";
                reason = " (" + reason.replace(/;/g, ',') + ")";

                let decision = searchResults[0];
                let dockets = [], datesArgument = [], datesRearg = [];
                if (!argv['replace']) {
                    if (decision.docket) dockets = decision.docket.split(',');
                    if (decision.dateArgument) datesArgument = decision.dateArgument.split(',');
                    if (decision.dateRearg) datesRearg = decision.dateRearg.split(',');
                }

                let docketNumbers = "";
                addDockets.forEach((docket) => {
                    docket = fixDocketNumber(docket);
                    if (docket) {
                        if (dockets.indexOf(docket) < 0) {
                            insertSortedArray(dockets, docket);
                            decision.docket = dockets.join(',');
                            corrections++;
                            if (docketNumbers) docketNumbers += ',';
                            docketNumbers += docket;
                        } else {
                            warning("docket number already exists: %s\n", docket);
                        }
                    }
                });
                let argumentDates = "";
                addArgDates.forEach((arg) => {
                    let argDate = fixDate(arg);
                    if (argDate) {
                        if (datesArgument.indexOf(argDate) < 0) {
                            insertSortedArray(datesArgument, argDate);
                            decision.dateArgument = datesArgument.join(',');
                            corrections++;
                            if (argumentDates) argumentDates += ',';
                            argumentDates += argDate;
                        } else {
                            warning("dateArgument already exists: %s\n", argDate);
                        }
                    } else {
                        warning("unexpected dateArgument format: %s\n", arg);
                    }
                });
                let reargumentDates = "";
                addReargDates.forEach((arg) => {
                    let argDate = fixDate(arg);
                    if (argDate) {
                        if (datesRearg.indexOf(argDate) < 0) {
                            insertSortedArray(datesRearg, argDate);
                            decision.dateRearg = datesRearg.join(',');
                            corrections++;
                            if (reargumentDates) reargumentDates += ',';
                            reargumentDates += argDate;
                        } else {
                            warning("dateRearg already exists: %s\n", argDate);
                        }
                    } else {
                        warning("unexpected dateRearg format: %s\n", arg);
                    }
                });
                let decisionDate = "";
                if (addDecDate) {
                    let decDate = fixDate(addDecDate);
                    if (decDate) {
                        if (argv['replace'] || !decision.dateDecision) {
                            decision.dateDecision = decDate;
                            corrections++;
                            decisionDate = decDate;
                        } else {
                            warning("dateDecision already exists: %s\n", decision.dateDecision);
                        }
                    } else {
                        warning("unexpected dateDecision format: %s\n", addDecDate);
                    }
                }
                if (corrections && !warnings) {
                    decision.caseNotes = decision.caseNotes? (decision.caseNotes + '; ') : "";
                    let additions = "";
                    if (docketNumbers) {
                        additions += "docket " + docketNumbers;
                    }
                    if (argumentDates) {
                        if (additions) additions += " and ";
                        additions += "dateArgument " + argumentDates;
                    }
                    if (reargumentDates) {
                        if (additions) additions += " and ";
                        additions += "dateRearg " + reargumentDates;
                    }
                    if (decisionDate) {
                        if (additions) additions += " and ";
                        additions += "dateDecision " + decisionDate;
                    }
                    decision.caseNotes += (argv['replace']? "replaced " : "added ") + additions + reason;
                    printf("updated caseNotes: %s\n", decision.caseNotes);
                    /*
                     * One of the few times we eliminate the need for --overwrite, since you already have to specify --reason...
                     */
                    writeFile(results.json.decisions, decisions, true);
                }
            }
            done();
            return;
        }

        if (searchResults.length) {
            vars['caseNotes'] = {"type": "string"};
            vars['pdfSource'] = {"type": "string"};
            vars['pdfPage'] = {"type": "number"};
            vars['pdfPageDissent'] = {"type": "number"};
            vars['volume'] = {"type": "number"};
            vars['page'] = {"type": "number"};
            for (let r = 0; r < searchResults.length; r++) {
                let decision = searchResults[r];
                parseCite(decision.usCite, decision);
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
                mapValues(decision, vars, true);
                let iSearch = searchSortedObjects(data, {"caseId": decision.caseId});
                if (iSearch < 0 || argv['check']) {
                    if (termId) decision['termId'] = termId;
                    if (minVotes == 1) {
                        /*
                         * Determine who the lone dissenter is now.
                         */
                        let dissenterId = "", dissenterName = "";
                        for (let i = 0; i < decision.justices.length; i++) {
                            let justice = decision.justices[i];
                            if (justice.vote == "dissent") {
                                if (!dissenterId) {
                                    dissenterId = justice.justice;
                                    dissenterName = justice.justiceName;
                                } else {
                                    warning("case %s (%s) has multiple dissents (eg, %s, %s)\n", decision.caseId, decision.usCite, dissenterName, justice.justiceName);
                                }
                            }
                        }
                        if (dissenterId) {
                            decision['dissenterId'] = dissenterId;
                            decision['dissenterName'] = dissenterName;
                        } else {
                            warning("unable to identify dissenter for case %s (%s)\n", decision.caseId, decision.usCite);
                        }
                    }
                    let b = searchObjects(lonerBackup, {caseId: decision.caseId});
                    if (b >= 0) {
                        let backup = lonerBackup[b];
                        if (backup['caseNotes']) decision['caseNotes'] = backup['caseNotes'];
                        if (backup['pdfSource']) decision['pdfSource'] = backup['pdfSource'];
                        if (backup['pdfPage']) decision['pdfPage'] = backup['pdfPage'];
                        if (backup['pdfPageDissent']) decision['pdfPageDissent'] = backup['pdfPageDissent'];
                    }
                    if (!decision['pdfSource']) {
                        if (year < 2004) {
                            decision['pdfSource'] = "loc";          // ie, Library of Congress
                        } else if (year < 2012) {
                            decision['pdfSource'] = "scotusBound";  // ie, supremecourt.gov, in the "Bound Volumes" folder
                        } else {
                            decision['pdfSource'] = "slipopinion/" + (year % 100);
                        }
                    }
                    if (iSearch < 0) {
                        data.push(decision);
                        additions++;
                    }
                } else {
                    let citation = (decision.usCite || ('No. ' + decision.docket));
                    if (argv['debug']) {
                        warning("%s (%s) already exists in %s\n", decision.caseId, citation, dataFile);
                    }
                    if (mapValues(data[iSearch], vars) > 0) {
                        warning("%s (%s) being updated in %s\n", decision.caseId, citation, dataFile);
                        additions++;
                    }
                    searchResults[r] = data[iSearch];
                }
            }
            if (term) {
                sortObjects(searchResults, ["volume", "page", "caseTitle"]);
                /*
                 * Create a page for each term of decisions that doesn't already have one (eg, _pages/cases/loners/yyyy-mm.md)
                 */
                let category = minVotes == 1? "loners" : "all";
                let description = minVotes == 1? "Lone Dissents" : "All Opinions";
                let termName = getTermName(termId);
                let pathName = "/cases/" + category + "/" + termId;
                let fileName = "/_pages" + pathName + ".md";
                let fileText = '---\ntitle: "' + description + " from " + termName + ' of the U.S. Supreme Court"\npermalink: ' + pathName + '\nlayout: cases\n';
                fileText += generateCaseYML(searchResults, vars, courtsSCDB, justices);
                fileText += '---\n';
                let oldText = readFile(fileName);
                if (oldText && oldText != fileText) {
                    writeFile(fileName, fileText);
                    changes++;
                }
                /*
                 * Let's make sure there's an index entry as well....
                 */
                fileName = "/_pages/cases/" + category + ".md";
                let index = readFile(fileName);
                if (index) {
                    let re = /^- \[(.*?Term.*?|)\]\(\/cases\/[a-z]+\/([0-9-]+)\).*$/gm, match, matchLast;
                    while ((match = re.exec(index))) {
                        matchLast = match;
                        if (match[2] >= termId) break;
                    }
                    if (matchLast) {
                        let asterisks = "";
                        if (termId >= "1844-12" && termId <= "1849-12") {
                            asterisks = "*";
                        }
                        let entry = sprintf("- [%s](/cases/%s/%s)%s (%d %s%s)\n", termName, category, termId, asterisks, searchResults.length, category == "loners"? "lone dissent" : "opinion", searchResults.length == 1? '' : 's');
                        if (matchLast[2] != termId) {
                            index = index.substr(0, matchLast.index) + entry + index.substr(matchLast.index);
                        } else {
                            index = index.substr(0, matchLast.index) + entry + index.substr(matchLast.index + matchLast[0].length + 1);
                        }
                        let oldIndex = readFile(fileName);
                        if (oldIndex && oldIndex != index) {
                            writeFile(fileName, index);
                            changes++;
                        }
                    }
                }
            }
        }
    } while (term && endTerm && start < endTerm);

    if (additions) {
        sortObjects(data, ["caseId"]);
        writeFile(dataFile, data);
    }

    printf("totals: matched %d decisions out of %d\n", decisionsAudited.length, decisions.length);

    if (decisionsDuplicated.length) {
        warning("checked %d decisions more than once (%j)\n", decisionsDuplicated.length, decisionsDuplicated);
    }

    if (changes) printf("changes: %d\n", changes);

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
                        warning("SCDB justice ID %s listed multiple times\n", id);
                    }
                } else {
                    warning("SCDB justice index %d has no SCDB justice ID\n", justice.scdbJustice);
                }
            } else {
                warning("justice %s has no SCDB justice index\n", justice.id);
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
                    warning("unable to find justice ID %s\n", justiceId);
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
        sortObjects(data, minVotes == 1? ["loneTotal"] : ["majorityTotal"], -1);
        writeFile(dataFile, data);
    }
    let index = "";
    let category = minVotes == 1? "loners" : "all";
    let type = minVotes == 1? "lone dissent" : "opinion";
    let description = minVotes == 1? "Lone Dissents" : "Majority Opinions";
    data.forEach((justice) => {
        let total = (minVotes == 1? justice.loneTotal : justice.majorityTotal);
        //
        // printf("%s: %d %s%s\n", justice.name, total, type, total == 1? '' : 's');
        //
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
            let b = searchObjects(lonerBackup, {caseId: opinion.caseId});
            if (b >= 0) {
                let backup = lonerBackup[b];
                if (backup['caseNotes']) opinion['caseNotes'] = backup['caseNotes'];
                if (backup['pdfSource']) opinion['pdfSource'] = backup['pdfSource'];
                if (backup['pdfPage']) opinion['pdfPage'] = backup['pdfPage'];
                if (backup['pdfPageDissent']) opinion['pdfPageDissent'] = backup['pdfPageDissent'];
            }
            text += generateCommonCaseYML(opinion);
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
            //
            // printf("date %s had %d lone dissents\n", date, bucket.length);
            //
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
 * getDateMarkers(text)
 *
 * @param {string} text
 * @return {Array}
 */
function getDateMarkers(text)
{
    let pattern = "(MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY)\\s*,?\\s*(JANUARY|FEBRUARY|MARCH|APRIL|MAY|JUNE|JULY|AUGUST|SEPTEMBER|OCTOBER|NOVEMBER|DECEMBER)\\s*([0-9]+),?\\s*([0-9]+)";
    let re = new RegExp(pattern, "g");
    let markers = [], match;
    while ((match = re.exec(text))) {
        match.weekday = match[1];
        match.month = match[2];
        match.day = +match[3];
        match.year = +match[4];
        markers.push(match);
    }
    return markers;
}

/**
 * listBriefs(done)
 *
 * @param {function()} done
 */
function listBriefs(done)
{
    let decisions = JSON.parse(readFile(_data.allDecisions));
    printf("sorting SCDB decisions by [usCite]...\n");
    sortObjects(decisions, ["usCite"]);
    let indexPath = "/_pages/briefs/featured/index.md";
    let index = readFile(indexPath);
    if (!index) {
        index = "---\n";
        index += "title: \"U.S. Supreme Court Featured Briefs\"\n";
        index += "permalink: /briefs/featured\n";
        index += "layout: page\n";
        index += "---\n\n";
    }
    let buckets = [1945, 1964, 1972, 2019];
    let match, re = /- \[(.*?), ([0-9]+) U\.?S\.? ([0-9]+) \(([0-9]+)\)\]\(\/briefs\/featured\/(.*?)\)/g;
    while ((match = re.exec(index))) {
        let caseTitle = match[1];
        let volume = +match[2];
        let page = +match[3];
        let year = +match[4];
        let folderName = match[5];
        let usCite = sprintf("%d U.S. %d", volume, page);
        let caseTitleSearch = (caseTitle == "Bailey v. Drexel Furniture Co."? "Child Labor Tax Case" : caseTitle);
        let iDecision = searchSortedObjects(decisions, {usCite}, {caseTitle: caseTitleSearch});
        if (iDecision > 0) {
            let decision = decisions[iDecision];
            let link = sprintf("- [%s](%s), [%s](%s) (%d)", caseTitle, "/briefs/featured/" + folderName, usCite, "/cases/all/" + decision.termId + "#" + decision.caseId, year);
            index = index.substr(0, match.index) + link + index.substr(match.index + match[0].length);
        }
        let briefFile = "/_pages/briefs/featured/" + folderName + ".md";
        let briefList = readFile(briefFile);
        if (briefList) continue;
        briefList = "---\n";
        briefList += "title: \"" + caseTitle + " " + usCite + " (" + year + ")\"\n";
        briefList += "permalink: /briefs/featured/" + folderName + "\n";
        briefList += "layout: page\n";
        briefList += "---\n\n";
        for (let term = year - 2; term <= year; term++) {
            let y;
            for (y = 0; y < buckets.length; y++) {
                if (term <= buckets[y]) break;
            }
            y++;
            let briefPaths = glob.sync(rootDir + "/sources/sites/briefs" + y + "/" + term + "/" + folderName + "/*.pdf");
            if (!briefPaths || !briefPaths.length) continue;
            briefPaths.forEach((briefPath) => {
                let briefName = path.basename(briefPath, ".pdf");
                let briefLink = encodeURI("https://briefs" + y + ".lonedissent.org/" + term + "/" + folderName + "/" + briefName + ".pdf");
                briefList += "- [" + briefName + "](" + briefLink + ")\n";
            });
            break;
        }
        writeFile(briefFile, briefList);
    }
    writeFile(indexPath, index);
    done();
}

/**
 * matchJournals(done)
 *
 * @param {function()} done
 */
function matchJournals(done)
{
    printf("reading SCOTUS journals...\n");
    let filePaths = glob.sync(rootDir + sources.scotus.journals.replace('*', argv['group'] || '*'));
    filePaths.forEach((filePath) => {
        let text = readFile(filePath);
        if (!text) return;
        /*
         * Let's see if we can reliably get date markers for the entire file...
         */
        let dateMarkers = getDateMarkers(text);
        dateMarkers.forEach((marker) => {
            printf("offset %d: %s, %s %d, %d\n\t%s\n\n", marker.index, marker.weekday, marker.month, marker.day, marker.year, marker[0].replace(/\s+/g, ' '));
        });
    });
    done();
}

/**
 * matchTXTDates(done)
 *
 * @param {function()} done
 */
function matchTXTDates(done)
{
    let monthBucket = [];
    printf("reading SCDB decisions...\n");
    let decisions = JSON.parse(readFile(results.json.decisions));
    printf("sorting SCDB decisions by [usCite]...\n");
    sortObjects(decisions, ["usCite"]);
    printf("reading U.S. Reports texts...\n");
    let filePaths = glob.sync(rootDir + sources.loc.filesTXT);
    filePaths.forEach((filePath) => {
        /*
         * We skip the first 100 volumes, because they're old, they didn't scan well, and for the most part,
         * they didn't include any dates anyway.  Besides, volumes 1-107 are already covered by the Supreme Court's
         * "DATES OF DECISIONS" document.  It's probably no coincidence that that document stopped at volume 107,
         * because starting with volume 108, we begin to see dates properly recorded.
         */
        if (filePath.indexOf("001-100") >= 0) return;
        let text = readFile(filePath);
        if (text) {
            let fileName = path.basename(filePath);
            let matchFile = fileName.match(/^([0-9]+)us([0-9]+)\.txt$/);
            if (!matchFile) {
                warning("unrecognized file: %s\n", filePath);
                return;
            }
            let usCite = sprintf("%d U.S. %d", matchFile[1], matchFile[2]);
            // if (usCite == "109 U.S. 194") {
            //     console.log(usCite);
            // }
            /*
             * We make the last digit of the 4-digit year optional, because sometimes the text
             * didn't pick up all four digits (eg, ./sources/loc/volumes/101-200/109/109us110.txt).
             * We also allow letters in place of digits, because sometimes an 'S' will show up
             * instead of '5', or an 'M', etc.
             */
            let reArgued = /Argued\s+(.*?)\s+([0-9A-Z][0-9A-Z][0-9A-Z][0-9A-Z]?)[^0-9]/g;
            let reDecided = /De[ce][il][ld][cet]d?\s+(.*?)\s+([0-9A-Z][0-9A-Z][0-9A-Z][0-9A-Z]?)[^0-9]/g;
            while (true) {
                let matchArgued = reArgued.exec(text);
                let matchDecided = reDecided.exec(text);
                let textArgued = "";
                if (matchArgued) {
                    textArgued = matchArgued[1] + ' ' + matchArgued[2];
                }
                if (!matchDecided) {
                    if (matchArgued && argv['detail']) {
                        warning("%s (%s): argument date %s, no decision\n", filePath, usCite, textArgued);
                    }
                    return;
                }
                /*
                 * If the current matchArgued appears AFTER the current matchDecided, then the presumption is
                 * those dates don't go together, so we "sync" reArgued.lastIndex to reDecided.lastIndex.  Ditto
                 * for when reArgued didn't find anything at all; otherwise the next reArgued.exec() call will
                 * start over at the top again (which seems like a strange feature of exec(): it sets lastIndex
                 * back to zero when it doesn't find any further matches).
                 */
                if (!matchArgued || matchArgued && matchArgued.index > matchDecided.index) {
                    reArgued.lastIndex = reDecided.lastIndex;
                    textArgued = "";
                }
                let textDecided = matchDecided[1] + ' ' + matchDecided[2];
                if (argv['detail']) {
                    printf("%s (%s): Argued '%s', Decided '%s'\n", filePath, usCite, textArgued, textDecided);
                }
                /*
                 * Let's do some preliminary parsing of decision dates.  For starters, there should be three
                 * groups separated by whitespace; if not, look for the first digit in the first group and separate
                 * on that.
                 */
                textDecided = textDecided.replace(/\s+/g, ' ');
                let partsDecided = textDecided.split(' ');
                if (partsDecided.length == 2) {
                    let matchDigit = partsDecided[0].match(/[0-9]/);
                    if (matchDigit && matchDigit.index > 0) {
                        partsDecided.splice(1, 0, partsDecided[0].substr(matchDigit.index));
                        partsDecided[0] = partsDecided[0].substr(0, matchDigit.index);
                    }
                }
                if (partsDecided.length == 3) {
                    let month = partsDecided[0];
                    if (monthBucket.indexOf(month) < 0) monthBucket.push(month);
                } else {
                    warning("%s (%s): unable to parse decision date '%s'\n", filePath, usCite, textDecided);
                }
            }
        }
    });
    monthBucket.sort();
    console.log(monthBucket);
    done();
}

/**
 * matchXMLDates(done)
 *
 * @param {function()} done
 */
function matchXMLDates(done)
{
    let changes = 0;
    let databaseUpdates = "";
    printf("reading SCDB decisions...\n");
    let decisions = JSON.parse(readFile(results.json.decisions));
    printf("sorting SCDB decisions by [usCite,dateDecision]...\n");
    sortObjects(decisions, ["usCite","dateDecision"]);
    printf("reading decisionsXML records...\n");
    let decisionsXML = readOyezLabsDecisions();
    decisionsXML.forEach((decision) => {
        if (decision.usCite.indexOf('_') >= 0) decision.usCite = "";
    });
    printf("sorting decisionsXML by usCite and dateDecision...\n");
    sortObjects(decisionsXML, ["usCite","dateDecision"]);

    for (let i = 0; i < decisions.length; i++) {
        let decision = decisions[i];
        /*
         * We skip the first 107 volumes, because they're old, they didn't scan well, and for the most part,
         * they didn't include any dates anyway.  Besides, volumes 1-107 are already covered by the Supreme Court's
         * "DATES OF DECISIONS" document.  It's probably no coincidence that that document stopped at volume 107,
         * because starting with volume 108, we begin to see dates properly recorded.
         */
        if (decision.volume > 0 && decision.volume <= 107) return;
        if (!decision.usCite) continue;
        let usCite = decision.usCite;
        let caseTitle = decision.caseTitle || decision.caseName;
        if (usCite.slice(-1) == 'n') usCite = usCite.slice(0, -1);
        let iXML = searchSortedObjects(decisionsXML, {usCite}, {caseTitle});
        if (iXML >= 0) {
            let decisionXML = decisionsXML[iXML];
            if (decisionXML.dateDecision) {
                if (decision.dateDecision != decisionXML.dateDecision) {
                    let urlLOC = getLOCURL(decision.usCite);
                    let tag = "dateDecision from " + urlLOC;
                    if (decision.caseNotes && decision.caseNotes.indexOf(tag)) continue;
                    printf("\n%s (%s) has date %#C\nsee %s\n", caseTitle, decision.usCite, decision.dateDecision, urlLOC);
                    let selections = [sprintf("%s (%s) XML date %#C", decisionXML.caseTitle, decisionXML.usCite, decisionXML.dateDecision), "Original date verified", "No change"];
                    let select = readLineSync.keyInSelect(selections, "Selection?", {cancel: true});
                    if (select < 0) break;
                    let reason = "";
                    if (select == 0) {
                        decision.dateDecision = decisionXML.dateDecision;
                        reason = "replaced " + tag;
                        databaseUpdates += "gulp --cite=\"" + usCite + "\" --replace --addDecided=" + decisionXML.dateDecision + " --reason=\"" + reason + "\"\n";
                        changes++;
                    } else if (select == 1) {
                        reason = "verified " + tag;
                        databaseUpdates += "gulp --cite=\"" + usCite + "\" --reason=\"" + reason + "\"\n";
                        changes++;
                    }
                    if (reason) {
                        if (!decision.caseNotes) {
                            decision.caseNotes = "";
                        } else {
                            decision.caseNotes += ";";
                        }
                        decision.caseNotes += reason;
                    }
                }
            }
        } else {
            warning("%s (%s) dateDecision [%s]: no XML match\n", caseTitle, decision.usCite, decision.dateDecision);
        }
    }
    if (changes) {
        sortObjects(decisions, ["caseId"]);
        writeFile(results.json.decisions, decisions);
        printf("%s", databaseUpdates);      // also print out all the requested updates in case writeFile() was not allowed
    }
    done();
}

/**
 * matchTranscripts(done)
 *
 * @param {function()} done
 */
function matchTranscripts(done)
{
    let changes = 0, exceptions = 0;
    printf("reading SCDB decisions...\n");
    let decisions = JSON.parse(readFile(results.json.decisions));
    if (!isSortedObjects(decisions, ["caseId"])) {
        warning("decisions not sorted properly\n");
        done();
        return;
    }
    let transcriptPath = "/_pages/cases/transcripts/scotus.md";
    let transcriptMatches = "", transcriptCorrections = "", transcriptPending = "", transcriptNoOyez = "", transcriptExceptions = "";
    let databaseUpdates = "";

    let transcriptPage = '---\ntitle: "Transcripts from the U.S. Supreme Court"\npermalink: /cases/transcripts/scotus\nlayout: page\n---\n\n';
    transcriptPage += "These transcripts were downloaded from the U.S. Supreme Court website and logged in our [spreadsheet](/results/transcripts.csv).\n\n";
    transcriptPage += "Any corrections have been noted under [Corrected Transcripts](#corrected-transcripts), and match failures have been logged under [Unmatched Transcripts](#unmatched-transcripts).\n";
    transcriptPage += "In addition, transcripts that don't have exact matches in OYEZ have been noted under [Missing OYEZ Transcripts](#missing-oyez-transcripts).\n\n";

    printf("reading transcripts...\n");
    let transcripts = readCSV(results.csv.transcripts, "", "html");
    sortObjects(transcripts, ["dateArgument", "docket"]);

    let filePaths = glob.sync(rootDir + sources.scotus.transcripts);
    if (filePaths.length != transcripts.length) {
        warning("number of transcript files (%d) does not match number of transcript entries (%d)\n", filePaths.length, transcripts.length);
    }

    let updates = 0;
    let newTranscripts = [];
    let newFields = ["usCite","caseId","dateDecision","urlOyez"];

    let rowsOyez = [], rowsOyezByYear = [];
    printf("reading OYEZ case files...\n");
    filePaths = glob.sync(rootDir + path.join(path.dirname(sources.oyez.cases), "**/*.json"));
    filePaths.forEach((filePath) => {
        let row = readOyezCaseData(filePath);
        if (row) {
            row.dockets = row.docket;
            let dockets = row.docket.split(',');
            dockets.forEach((docket) => {
                if (!row.datesArgued) return;
                let dates = row.datesArgued.split(',');
                dates.forEach((date) => {
                    let rowNew = cloneObject(row);
                    rowNew.docket = docket;
                    rowNew.dateArgued = date;
                    insertSortedObject(rowsOyez, rowNew, ["dateArgued","docket"]);
                    rowNew.year = date.substr(0, 4);
                    insertSortedObject(rowsOyezByYear, rowNew, ["year","dateArgument"]);
                });
            });
        }
    });

    /*
     * I'd like to record all Oyez records that don't currently exist in the transcripts CSV...
     */
    rowsOyez.forEach((row) => {
        let i = searchSortedObjects(transcripts, {dateArgument: row.dateArgued});
        if (i < 0) {
            let transcriptNew = {
                "term": row.term,
                "usCite": row.usCite,
                "caseTitle": row.caseTitle,
                "caseId": "",
                "docket": row.dockets,
                "dateArgument": row.dateArgued,
                "dateDecision": row.dateDecision,
                "url": "",
                "file": "",
                "urlOyez": row.urlOyez,
                "notes": ""
            };
            if (insertSortedObject(transcripts, transcriptNew, ["dateArgument", "docket"], true) >= 0) {
                printf("adding Oyez argument: %s (%s) [%s] for term %s, argued %#C\n", transcriptNew.caseTitle, transcriptNew.usCite, transcriptNew.docket, transcriptNew.term, transcriptNew.dateArgument);
                updates++;
            }
        }
    });

    let uniqueTranscripts = {};
    printf("processing transcripts...\n");
    for (let i = 0; i < transcripts.length; i++) {
        let transcript = transcripts[i];
        let transcriptNew = {
            "term": transcript.term,
            "usCite": transcript.usCite || "",
            "caseTitle": transcript.caseTitle,
            "caseId": transcript.caseId || "",
            "docket": transcript.file? fixDocketNumber(transcript.docket) : transcript.docket,
            "dateArgument": transcript.dateArgument,
            "dateDecision": transcript.dateDecision || "",
            "url": transcript.url,
            "file": transcript.file,
            "urlOyez": transcript.urlOyez || "",
            "notes": transcript.notes
        };
        if (transcriptNew.docket != transcript.docket) updates++;
        newTranscripts.push(transcriptNew);
        let filePath = transcript.file;
        if (!filePath) continue;        // skip transcript records that came from Oyez, for the moment...
        let fileName = path.basename(filePath);
        let match = fileName.match(/^(.*?)_([0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9])([A-Z]?)\.pdf$/);
        if (!match) {
            warning("unexpected transcript file name: %s\n", fileName);
            continue;
        }
        if (!fs.existsSync(rootDir + filePath.replace(".pdf", ".txt"))) {
            warning("missing transcript file: %s\n", filePath);
        }
        if (!fs.existsSync(rootDir + filePath)) {
            warning("missing transcript file: %s\n", filePath);
        }
        if (uniqueTranscripts[fileName]) {
            warning("transcript listed multiple times (%s),(%s)\n", transcript.caseTitle, uniqueTranscripts[fileName]);
        } else {
            uniqueTranscripts[fileName] = transcript.caseTitle;
        }
        /*
         * NOTE: While docket and dateArgument could normally be taken from EITHER the transcript's
         * filename components OR from the spreadsheet, we need to use the spreadsheet values, because
         * that's where any corrections get recorded, along with any notes explaining WHY we made the
         * correction.
         */
        let docket = transcript.docket;             // formerly match[1]
        let dateArgument = transcript.dateArgument; // formerly match[2]
        let transcriptDescription = "- [" + transcript.caseTitle.trim() + "](" + encodeURI(transcript.url) + ") - No. " + transcript.docket + ", argued " + sprintf("%#C", transcript.dateArgument);
        if (dateArgument < sources.scdb.dateEnd) {
            let iDecision, decision = null
            if (!transcript.caseId) {
                iDecision = findByDateAndDocket(decisions, dateArgument, docket);
            } else {
                iDecision = searchSortedObjects(decisions, {caseId: transcript.caseId});
            }
            if (iDecision < 0) {
                let datePrevious = sprintf("%#Y-%#02M-%#02D", adjustDays(parseDate(dateArgument), -1));
                iDecision = findByDateAndDocket(decisions, datePrevious, docket);
                if (iDecision >= 0) {
                    warning("%s (%s) matched by using date %s instead of %s\n", transcript.caseTitle, transcript.usCite, datePrevious, dateArgument);
                }
            }
            let dockets = [transcript.docket];
            if (iDecision >= 0) {
                dockets = dockets.concat(decisions[iDecision].docket.split(','));
            }
            let iOyez = -1;
            for (let i = 0; i < dockets.length; i++) {
                iOyez = searchSortedObjects(rowsOyez, {dateArgued: transcript.dateArgument, docket: dockets[i]});
                if (iOyez >= 0) break;
            }
            if (iDecision < 0) {
                /*
                 * If the transcript has a "hand-coded" citation, the presumption it was matched manually
                 * (ie, by someone editing the CSV file), so we supply the transcript record as a fake decision
                 * record.
                 */
                if (transcript.usCite) {
                    // if (!transcript.caseId) {
                    //     warning("%s (%s) has no caseId\n", transcript.caseTitle, transcript.usCite);
                    // }
                    decision = transcript;
                } else {
                    /*
                     * Check OYEZ records.
                     */
                    if (iOyez >= 0) {
                        /*
                         * We found an exact OYEZ date+docket match, so we're going to go with that automatically.
                         */
                        decision = rowsOyez[iOyez];
                    } else {
                        let i = searchSortedObjects(rowsOyez, {dateArgued: transcript.dateArgument}, {caseTitle: transcript.caseTitle});
                        if (i >= 0) {
                            /*
                             * We found an exact OYEZ date/close title match, so ask the user if they want to add OYEZ's docket
                             * number to the case.
                             */
                            let row = rowsOyez[i];
                            printf("%s [%s] {%s}: %s\n%s [%s] (%s) {%s}: %s  %s\n%s\n\n", transcript.caseTitle, transcript.docket, transcript.dateArgument, transcript.url, row.caseTitle, row.docket, row.usCite, row.dateArgument, row.dateDecision, row.urlOyez, getLOCURL(row.usCite));
                            // if (readLineSync.keyInYN(sprintf("add docket number %s from SCOTUS to %s?", transcript.docket, row.usCite))) {
                            //     if (parseCite(row.usCite)) {
                            //         databaseUpdates += sprintf('gulp --cite="%s" --addDocket="%s" --reason="correction from %s"\n', row.usCite, transcript.docket, transcript.url);
                            //     } else {
                            //         databaseUpdates += sprintf('gulp --argued="%s" --docket="%s" --addDocket="%s" --reason="correction from %s"\n', row.dateArgument, row.docket, transcript.docket, transcript.url);
                            //     }
                            // }
                        } else {
                            let year = transcript.dateArgument.substr(0, 4);
                            i = searchSortedObjects(rowsOyezByYear, {year}, {caseTitle: transcript.caseTitle});
                            if (i >= 0) {
                                /*
                                 * We found a close date/close title match, so ask the user if they want to add OYEZ's argument
                                 * date AND docket number to the case.
                                 */
                                let row = rowsOyezByYear[i];
                                printf("%s [%s] {%s}: %s\n%s [%s] (%s) {%s}: %s  %s\n%s\n\n", transcript.caseTitle, transcript.docket, transcript.dateArgument, transcript.url, row.caseTitle, row.docket, row.usCite, row.dateArgument, row.dateDecision, row.urlOyez, getLOCURL(row.usCite));
                                // if (readLineSync.keyInYN(sprintf("add docket number %s AND argument date %s from OYEZ to %s", row.docket, row.dateArgument, row.usCite))) {
                                //     if (parseCite(row.usCite)) {
                                //         databaseUpdates += sprintf('gulp --cite="%s" --addDocket="%s" --addArgued="%s" --reason="correction from %s"\n', row.usCite, transcript.docket, transcript.dateArgument, transcript.url);
                                //     } else {
                                //         databaseUpdates += sprintf('gulp --argued="%s" --docket="%s" --addDocket="%s" --addArgued="%s" --reason="correction from %s"\n', row.dateArgument, row.docket, transcript.docket, transcript.dateArgument, transcript.url);
                                //     }
                                // }
                            }
                        }
                    }
                }
            } else {
                decision = decisions[iDecision];
            }
            if (decision) {
                let transcriptCitation = (getLOCURL(decision.usCite)? "[" + decision.usCite + "](" + getLOCURL(decision.usCite) + ")" : decision.usCite);
                transcriptDescription += (transcriptCitation? ": see " + transcriptCitation : "");
                if (!transcript.notes) {
                    transcriptMatches += transcriptDescription + "\n";
                } else {
                    transcriptCorrections += transcriptDescription + (transcript.notes? " (" + transcript.notes + ")" : "") + "\n";
                }
                newFields.forEach((field) => {
                    if (decision[field] && transcriptNew[field] != decision[field]) {
                        transcriptNew[field] = decision[field];
                        updates++;
                    }
                });
                /*
                 * Time to check for any Oyez argument dates that aren't in our decision database.
                 */
                if (decision.caseId && iOyez >= 0) {
                    let skip = false;
                    let newArgs = 0, newReargs = 0;
                    let oyez = rowsOyez[iOyez];
                    if (oyez.usCite == "399 U.S. 383" && oyez.dateArgument == "1969-04-01" || decision.usCite == "399 U.S. 383") {
                        skip = true;
                    }
                    if (oyez.dateArgument && !skip) {
                        let dates = decision.dateArgument? decision.dateArgument.split(',') : [];
                        let datesOyez = oyez.dateArgument? oyez.dateArgument.split(',') : [];
                        for (let i = 0; i < datesOyez.length; i++) {
                            if (dates.indexOf(datesOyez[i]) < 0) {
                                if (decision.dateArgument == oyez.dateRearg) {
                                    decision.dateArgument = ""; dates = [];
                                }
                                if (decision.dateArgument.length != 10 || datelib.subtractDays(datesOyez[i], decision.dateArgument) != 1) {
                                    printf("check %s (%s): adding %s to dateArgument %s\n%s\n\n", decision.caseTitle, decision.usCite, datesOyez[i], decision.dateArgument, oyez.urlOyez);
                                }
                                insertSortedArray(dates, datesOyez[i]);
                                decision.dateArgument = dates.join(',');
                                newArgs++;
                            }
                        }
                    }
                    if (oyez.dateRearg && !skip) {
                        if (oyez.usCite == "401 U.S. 77" && decision.dateRearg == "1969-04-29") {
                            decision.dateRearg = "";
                        }
                        if (oyez.usCite == "401 U.S. 66" && decision.dateRearg == "1969-04-29") {
                            decision.dateRearg = "";
                        }
                        let dates = decision.dateRearg? decision.dateRearg.split(',') : [];
                        let datesOyez = oyez.dateRearg? oyez.dateRearg.split(',') : [];
                        for (let i = 0; i < datesOyez.length; i++) {
                            if (dates.indexOf(datesOyez[i]) < 0) {
                                if (decision.dateRearg.length != 10 || datelib.subtractDays(datesOyez[i], decision.dateRearg) != 1) {
                                    printf("check %s (%s): adding %s to dateRearg %s\n%s\n\n", decision.caseTitle, decision.usCite, datesOyez[i], decision.dateRearg, oyez.urlOyez);
                                }
                                insertSortedArray(dates, datesOyez[i]);
                                decision.dateRearg = dates.join(',');
                                newReargs++;
                            }
                        }
                    }
                    if (newArgs + newReargs > 0) {
                        if (!decision.caseNotes) {
                            decision.caseNotes = "";
                        } else {
                            decision.caseNotes += ";";
                        }
                        decision.caseNotes += "dateArgument" + (newReargs? "/dateRearg" : "") + " correction(s) from " + oyez.urlOyez;
                        changes++;
                    }
                }
            } else {
                transcriptExceptions += transcriptDescription + " (" + (transcript.notes || "no SCDB or OYEZ match") + ")\n";
                exceptions++;
            }
            if (iOyez < 0) {
                transcriptNoOyez += transcriptDescription + " (no OYEZ match)\n";
                iOyez = searchSortedObjects(rowsOyez, {dateArgued: transcript.dateArgument});
                while (iOyez >= 0 && iOyez < rowsOyez.length) {
                    let row = rowsOyez[iOyez];
                    if (row.dateArgued != transcript.dateArgument) break;
                    transcriptNoOyez += sprintf("  - Check %s [No. %s], also argued on [%#C](%s)\n", row.caseTitle, row.docket, row.dateArgued, row.urlOyez);
                    iOyez++;
                }
                exceptions++;
            }
        } else {
            transcriptPending += transcriptDescription + " (pending next SCDB update)\n";
        }
    }

    transcriptPage += "## Matched Transcripts\n\nThese transcripts have been successfully matched to an SCDB entry.\n\n" + transcriptMatches + "\n";
    transcriptPage += "## Corrected Transcripts\n\nThese transcripts have been successfully matched to an SCDB entry after making one or more corrections.\n\n" + transcriptCorrections + "\n";
    if (transcriptPending) transcriptPage += "## Pending Transcripts\n\nThe status of these transcripts cannot be determined until the next SCDB update.\n\n" + transcriptPending + "\n";
    if (transcriptNoOyez) transcriptPage += "## Missing OYEZ Transcripts\n\nThese transcripts were not found in a corresponding OYEZ case record.\n\n" + transcriptNoOyez + "\n";
    transcriptPage += "## Unmatched Transcripts\n\nThese transcripts have NOT yet been matched to an SCDB entry.\n\n" + transcriptExceptions;

    if (updates) {
        printf("%d transcript updates\n", updates);
        writeCSV(results.csv.transcripts, newTranscripts);
    }

    if (exceptions) {
        printf("%d exceptions (see %s for details)\n", exceptions, transcriptPath);
    }

    if (changes) {
        printf("%d decision changes\n", updates);
        writeFile(results.json.decisions, decisions);
    }

    if (databaseUpdates) {
        printf("%s", databaseUpdates);
    }

    writeFile(transcriptPath, transcriptPage);
    done();
}

/**
 * searchTranscripts(done)
 *
 * @param {function} done
 */
function searchTranscripts(done)
{
    printf("reading transcripts...\n");
    let transcripts = readCSV(sources.oyez.transcripts, "", "html");
    if (!isSortedObjects(transcripts, ["dateArgument", "docket"])) {
        done();
        return;
    }

    let filePaths = glob.sync(rootDir + path.join(path.dirname(sources.oyez.transcripts), "_files/*/*.json"));
    if (filePaths.length != transcripts.length) {
        warning("number of transcript files (%d) does not match number of transcript entries (%d)\n", filePaths.length, transcripts.length);
    }

    let search = argv['search'];
    transcripts.forEach((transcript) => {
        if (transcript.file.indexOf("_argument") < 0) return;
        let data = readOyezTranscriptData(transcript.file);
        if (data.text && search) {
            let found = false;
            for (let i = 0; i < data.text.length; i++) {
                let line = data.text[i];
                if (line.indexOf(search) >= 0) {
                    if (!found) {
                        printf("./%s/%s_%s.txt\n", transcript.term, transcript.docket.replace(" Orig.", "-orig").replace(" Misc.", "-misc"), transcript.dateArgument);
                        found = true;
                    }
                    if (argv['detail']) {
                        printf("%s\n", line);
                    } else {
                        break;
                    }
                }
            }
        }
    });
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
        citations = readCSV(results.csv.citations, "", "html");
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
                warning("missing year in case '%s'\n", citation.caseTitle);
            }
        }
        /*
         * NOTE: By merging LOC and Justia data with SCOTUS data, the only fields we can rely on are:
         *
         *      volume, page, caseTitle, usCite
         */
        citationsLOC = readCSV(results.csv.citationsLOC, "", "html");
        for (let i = 0; i < citationsLOC.length; i++) {
            let citation = citationsLOC[i];
            if (citation.volume) {
                if (!citesLOC[citation.usCite]) citesLOC[citation.usCite] = [];
                citesLOC[citation.usCite].push(citation);
                if (!citesScotus[citation.usCite]) citesScotus[citation.usCite] = [];
                citesScotus[citation.usCite].push(citation);
            }
        }

        // let citationsJustia = readCSV(results.csv.citationsJustia, "", "html");
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
    let changedCourts = readFile(logs.csv.changedCourts) || "caseId,usCite,caseName,dateDecision,naturalCourt,naturalCourtNew\n";
    let changedDates = readFile(logs.csv.changedDates) || "caseId,usCite,caseName,dateDecision,dateDecisionNew\n";
    let missingCases = readFile(logs.csv.missingCases) || "usCite,caseTitle,dateDecision\n";
    let unknownCitations = readFile(logs.csv.unknownCitations) || "usCite,caseName,dateDecision\n";
    let unusualDates = readFile(logs.csv.unusualDates) || "caseId,usCite,caseName,dateDecision,dayOfWeek\n";
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
                            warning("%s: '%s' == '%s' (%d)\n", decision.usCite, decision.caseTitle, decision.caseName, score);
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
                    let cite = {};
                    if (parseCite(decision.usCite, cite)) {
                        let i = searchSortedObjects(citationsLOC, cite);
                        if (i > 0) {
                            citePrev = citationsLOC[i];
                        } else if (i < 0) {
                            citePrev = citationsLOC[-i - 2];
                        }
                        if (citePrev && citePrev.volume == cite.volume && citePrev.page + citePrev.pageTotal - 1 >= cite.page) {
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
                        warning("%s (%s) may be duplicated (compare %s to %s)\n", decision.caseName, decision.usCite, scdbCite.caseId, decision.caseId);
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
                    warning("%s (%s) has decision date %s instead of SCOTUS date %s\n", decision.caseName, decision.usCite, decision.dateDecision, citeDate.dateDecision);
                    changedDates = addCSV(changedDates, decision, ["caseId", "usCite", "caseName", "dateDecision"], "dateDecisionNew", citeDate.dateDecision);
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
                        warning("%s (%s) decision date %s does not match OyezLabs '%s' decision date %s\n", decision.caseName, decision.usCite, decision.dateDecision, cite.caseTitle, cite.dateDecision);
                    }
                } else {
                    warning("unable to find OyezLabs XML for %s (%s)\n", decision.caseName, decision.usCite);
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
                                warning("%s: '%s' == '%s' (%d)\n", decision.dateDecision, decision.caseTitle, decision.caseName, score);
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
                    warning("invalid dateDecision (%s)\n", decision.dateDecision);
                }
            }
        }

        if (decision.caseTitle) {
            let s = encodeString(decision.caseTitle, "html");
            if (decision.caseTitle != s) {
                warning("old caseTitle encoding '%s'\n         new caseTitle encoding '%s'\n", decision.caseTitle, s);
                decision.caseTitle = s;
                changes++;
            }
        }

        if (fixDates && (!citeDate || !citeDate.matched) && decision.dateDecision && decision.dateDecision.length == 10) {
            let dateDecision = parseDate(decision.dateDecision);
            let dayOfWeek = dateDecision.getUTCDay();
            if (dayOfWeek == 0 || dayOfWeek == 6) {
                warning("%s (%s) has unusual decision day: %#C\n", decision.caseName, decision.usCite, dateDecision);
                unusualDates = addCSV(unusualDates, decision, ["caseId", "usCite", "caseName", "dateDecision"], "dayOfWeek", sprintf("%#W", dateDecision) /*, "matchesSCOTUS", citeDate && citeDate.dateDecision == decision.dateDecision? true : false */);
            }
        }

        if (courtsSCDB.length) {
            for (i = 0; i < courtsSCDB.length; i++) {
                let court = courtsSCDB[i];
                if (decision.dateDecision >= court.start && decision.dateDecision <= court.stop) {
                    let naturalCourt = +court.naturalCourt;
                    if (decision.naturalCourt != naturalCourt) {
                        warning("%s (%s): decision date %s lies within court %s (%d) but naturalCourt is different (%d)\n", decision.caseName, decision.usCite, decision.dateDecision, court.name, naturalCourt, decision.naturalCourt);
                        changedCourts = addCSV(changedCourts, decision, ["caseId", "usCite", "caseName", "dateDecision", "naturalCourt"], "naturalCourtNew", naturalCourt);
                        decision.naturalCourt = naturalCourt;
                        changes++;
                    }
                    break;
                }
            }
            if (i == courtsSCDB.length) {
                warning("%s (%s): decision date %s lies outside of any court; naturalCourt is %d\n", decision.caseName, decision.usCite, decision.dateDecision, decision.naturalCourt);
            }
        }
    });

    let scotusCites = Object.keys(decisionsScotus);
    scotusCites.forEach((usCite) => {
        let datesScotus = decisionsScotus[usCite];
        datesScotus.forEach((decisionScotus) => {
            if (!decisionScotus.matched) {
                warning("%s (%s) with SCOTUS decision date %s has no matching SCDB entry\n", decisionScotus.caseTitle, decisionScotus.usCite, decisionScotus.dateDecision);
                missingCases = addCSV(missingCases, decisionScotus, ["usCite", "caseTitle", "dateDecision"]);
            }
        });
    });

    if (argv['citations']) {
        decisions.forEach((decision) => {
            if (decision.usCite && !decision.caseTitle && decision.minVotes == 1) {
                warning("%s (%s) has no matching citation entry\n", decision.caseName, decision.usCite, decision.dateDecision);
                unknownCitations = addCSV(unknownCitations, decision, ["usCite", "caseName", "dateDecision"]);
            }
        });
    }

    if (changedCourts != changedCourtsOrig) {
        writeFile(logs.csv.changedCourts, changedCourts);
    }

    if (changedDates != changedDatesOrig) {
        writeFile(logs.csv.changedDates, changedDates);
    }

    if (missingCases != missingCasesOrig) {
        writeFile(logs.csv.missingCases, missingCases);
    }

    if (unknownCitations != unknownCitationsOrig) {
        writeFile(logs.csv.unknownCitations, unknownCitations);
    }

    if (unusualDates != unusualDatesOrig) {
        writeFile(logs.csv.unusualDates, unusualDates);
    }

    if (changes) {
        printf("changes: %d\n", changes);
        writeFile(results.json.decisions, decisions);
    }

    if (warnings) printf("warnings: %d\n", warnings);

    done();
}

/**
 * fixDockets()
 *
 * SCDB uses inconsistent coding of docket numbers for "Original Jurisdiction" cases; eg:
 *
 *      "5, Orig."
 *      "126, ORIG."
 *      "10 Original"
 *      "8 (Original)"
 *      "15 orig."
 *      "6 ORIG"
 *      "8 original"
 *      "ORIG" and "   ORIG"
 *      "15 ORIG ORIG" (just to be sure?)
 *      "No. 12, Original"
 *      "No. 137, Orig."
 *      "22O142"
 *
 * There's also a small problem with "Miscellaneous" cases; SCDB appends a single letter ("M") to the docket number,
 * but sometimes there's a space (eg, "61 M") and sometimes not (eg, "133M").
 *
 * We have adopted the following formats:
 *
 *      "108 Orig."
 *      "61 Misc."
 *
 * and we let the context of the docket number's appearance determine whether or not it should be preceded by "No. ".
 *
 * @param {function()} done
 */
function fixDockets(done)
{
    let files = ["/results/decisions.json", "/_data/allDecisions.json", "/_data/allJustices.json", "/_data/lonerDecisions.json", "/_data/lonerJustices.json"];
    files.forEach((file) => {
        let json = readFile(file);
        if (json) {
            let changes = 0;
            let match, re = /^(\s*"docket":\s*)"(.*)"/gm;
            printf("processing %s...\n", file);
            while ((match = re.exec(json))) {
                let dockets = match[2].split(',');
                for (let i = 0; i < dockets.length; i++) {
                    dockets[i] = fixDocketNumber(dockets[i]);
                }
                let docket = dockets.join(',');
                if (docket != match[2]) {
                    printf("changing %s to %s\n", match[2], docket);
                    json = json.substr(0, match.index) + match[1] + '"' + docket + '"' + json.substr(match.index + match[0].length);
                    changes++;
                }
            }
            if (changes) {
                printf("%d docket changes to %s\n", changes, file);
                writeFile(file, json);
            }
        }
    });
    done();
}

/**
 * fixDate(sDate)
 *
 * NOTE: While this may evolve over time to fix some common date typos, all it does for now
 * is make sure the date is in the correct format.
 *
 * @param {string} sDate
 * @return {string}
 */
function fixDate(sDate)
{
    let newDate = "";
    if (sDate) {
        if (sDate.match(/^[0-9][0-9][0-9][0-9]-[0-9][0-9](-[0-9][0-9]|)$/)) {
            newDate = sDate;
        }
    }
    return newDate;
}

/**
 * fixDocketNumber(docket)
 *
 * @param {string|number} docket
 * @return {string}
 */
function fixDocketNumber(docket)
{
    let docketNew = "";
    if (docket) {
        let n = "", suffix = "";
        docketNew = docket.toString();
        docket = docket.toLowerCase();
        if (docket.indexOf('m') >= 0) {
            suffix = "Misc.";
        }
        else if (docket.indexOf('o') >= 0) {
            suffix = "Orig.";
        }
        if (suffix) {
            let i = docket.indexOf("22o");
            if (i == 0) {
                n = docketNew.substr(i + 3) + ' ';
            } else {
                let m = docketNew.match(/([0-9]+)/);
                if (m) n = m[1] + ' ';
            }
            docketNew = n + suffix;
        }
        if (docketNew == "na") docketNew = "";  // an odd docket number I've seen in SCDB's docket CSVs ("not available?")
        docketNew = docketNew.replace("&ndash;", "-");
    }
    return docketNew;
}

/**
 * fixOyezDocketNumber(docket)
 *
 * @param {string} docket
 * @return {string}
 */
function fixOyezDocketNumber(docket)
{
    return docket.replace(" ORIG", " Orig.").replace("-orig", " Orig.").replace("orig", " Orig.").replace(".-1", ".").replace(".-2", ".").replace(" MISC", " Misc.").trim();
}

/**
 * fixLOC()
 *
 * Add some new columns to citationsLOC.csv (eg, pageTotal, subject, keywords).
 *
 * @param {function()} done
 */
function fixLOC(done)
{
    let success = true;
    let rowsLOC = readCSV(results.csv.citationsLOC);
    let rowsMisc = readCSV(results.csv.miscLOC);
    let rowsAll = [rowsLOC, rowsMisc];
    rowsAll.forEach((rows) => {
        if (!isSortedObjects(rows, ["volume", "page", "caseTitle"], true)) {
            sortObjects(rows, ["volume", "page", "caseTitle"])
            if (!isSortedObjects(rows, ["volume", "page", "caseTitle"])) {
                warning("unable to sort CSV\n");
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
                    warning("unexpected PDF page number (%s)\n", match[2]);
                }
                // printf('"%s","%d U.S. %d",%d\n', caseTitle, volume, page, pageTotal);
                let row = {volume, page, caseTitle};
                let i = searchSortedObjects(rowsLOC, row);
                if (i < 0) {
                    i = searchSortedObjects(rowsMisc, row);
                    if (i < 0) {
                        warning('unable to find "%s","%d U.S. %d" (see %03dus%03d.pdf)\n', caseTitle, volume, page, volumePDF, pagePDF);
                    }
                }
                if (i >= 0) {
                    row = rowsLOC[i];
                    if (!row.pageTotal) {
                        printf('updating: "%s","%d U.S. %d" with %d pages\n', caseTitle, volume, page, pageTotal);
                        row.pageTotal = pageTotal;
                        row.subject = subject;
                        row.keywords = keywords;
                        updates++;
                    }
                    /*
                     * Look for neighboring entries with matching volume and page that should be updated as well, first backwards then forwards.
                     */
                    for (let direction = -1; direction <= 1; direction += 2) {
                        for (let j = i + direction; j > 0 && j < rowsLOC.length; j += direction) {
                            row = rowsLOC[j];
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

    date = parseDate();
    printf("       parseDate()\n");
    format = "LOCAL: %W, %.3F %D, %Y - %I:%02N:%02S%A\n";
    printf(format, date);
    format = "  UTC: %#W, %#M/%#D/%#0.2Y - %#I:%#02N:%#02S%#A\n\n";
    printf(format, date);

    date = parseDate("2018-08-10");
    printf("       parseDate(\"2018-08-10\")\n");
    format = "LOCAL: %W, %.3F %D, %Y - %I:%02N:%02S%A\n";
    printf(format, date);
    format = "  UTC: %#W, %#M/%#D/%#0.2Y - %#I:%#02N:%#02S%#A\n";
    printf(format, date);
    format = "  UTC: %#C\n\t%#T\n\n";
    printf(format, date);

    date = datelib.adjustDays(date, -365);
    printf("       adjustDays(date, -365)\n");
    format = "LOCAL: %W, %.3F %D, %Y - %I:%02N:%02S%A\n";
    printf(format, date);
    format = "  UTC: %#W, %#M/%#D/%#0.2Y - %#I:%#02N:%#02S%#A\n\n";
    printf(format, date);

    date = parseDate(date.getTime());
    printf("       parseDate(date.getTime())\n");
    format = "LOCAL: %W, %.3F %D, %Y - %I:%02N:%02S%A\n";
    printf(format, date);
    format = "  UTC: %#W, %#M/%#D/%#0.2Y - %#I:%#02N:%#02S%#A\n\n";
    printf(format, date);

    date = parseDate(2018, 7, 10);
    printf("       parseDate(2018, 7, 10)\n");
    format = "LOCAL: %W, %.3F %D, %Y - %I:%02N:%02S%A\n";
    printf(format, date);
    format = "  UTC: %#W, %#M/%#D/%#0.2Y - %#I:%#02N:%#02S%#A\n\n";
    printf(format, date);

    date = parseDate(2018, 7, 10, 18, 5, 30);
    printf("       parseDate(2018, 7, 10, 18, 5, 30)\n");
    format = "LOCAL: %W, %.3F %D, %Y - %I:%02N:%02S%A\n";
    printf(format, date);
    format = "  UTC: %#W, %#M/%#D/%#0.2Y - %#I:%#02N:%#02S%#A\n\n";
    printf(format, date);

    date = parseDate("1809-02");
    printf("       parseDate(\"1809-02\")\n");
    format = "  UTC: %#C\n\n";
    printf(format, date);

    let d = -1;
    printf("d == 0x%02x, %04d\n", d, d);

    let terms = ['1790-02', '1953-06', '1980-12-12'];
    terms.forEach((term) => {
        printf("getTermName(%s): %s\n", term, getTermName(term))
    });

    let filePaths = ["./sources/scdb/vars.json"];
    filePaths.forEach((filePath) => {
        let text = readFile(filePath);
        if (text) {
            printf("checking %s (%d characters)...\n", filePath, text.length);
            let textNew = encodeString(text, "html");
            if (textNew != text) {
                writeFile(filePath, textNew);
            }
        }
    });

    let dataFiles = [_data.lonerDecisions, _data.allDecisions];
    dataFiles.forEach((dataFile) => {
        let data = JSON.parse(readFile(dataFile) || "[]");
        if (data.length) {
            if (!isSortedObjects(data, ["caseId"])) {
                sortObjects(data, ["caseId"]);
                writeFile(dataFile, data);
            }
        }
    });

    let dates = ["1989-09-27", "1962-08-10", "1963-08-04"];
    if (isSortedArray(dates, true)) warning("array is NOT sorted: %2j\n", dates);
    dates.sort();
    if (!isSortedArray(dates, true)) warning("array IS sorted: %2j\n", dates);
    insertSortedArray(dates, "1971-07-04");
    if (!isSortedArray(dates, true)) warning("array has failed to REMAIN sorted: %2j\n", dates);
    console.log(dates);

    done();
}

/**
 * createDownloadTask(name, url, dir, file, fDisplayOnly)
 *
 * @param {string} name
 * @param {string} url
 * @param {string} dir
 * @param {string} file
 * @param {boolean} [fDisplayOnly]
 * @return {boolean} (true if task added, false if duplicate or redundant)
 */
function createDownloadTask(name, url, dir, file, fDisplayOnly)
{
    if (downloadTasks.indexOf(name) >= 0) {
        return false;
    }
    let dirPath = path.join(rootDir, dir);
    let filePath = path.join(dirPath, file);
    if (fs.existsSync(filePath)) {
        return false;
    }
    if (fDisplayOnly) {
        printf("createDownloadTask(%s,%s,%s,%s)\n", name, url, dir, file);
        return;
    }
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
    return true;
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
            let mappings = downloadGroup.mappingFile && readFile(downloadGroup.mappingFile) || downloadGroup.mappingCols || "";
            let mappingsOld = mappings;
            if (downloadGroup.start !== undefined && downloadGroup.stop !== undefined) {
                for (let index = downloadGroup.start; index <= downloadGroup.stop; index++) {
                    let url = sprintf(downloadGroup.url, index);
                    let dir = sprintf(downloadGroup.dir, index);
                    let file = sprintf(downloadGroup.file, index);
                    createDownloadTask('download.' + source + '.' + group + '.' + index, url, dir, file);
                }
            }
            else if (downloadGroup.files) {
                let limit = +argv['limit'] || -1;
                let fileSpec = downloadGroup.files.replace("$1", argv['group'] || "**");
                let rePattern = new RegExp(downloadGroup.files.replace(".", "\\.").replace("*", "(.*?)").replace("$1", "(.*?)"));
                let filePaths = glob.sync(rootDir + fileSpec);
                filePaths.forEach((filePath) => {
                    let match = filePath.match(rePattern);
                    let term = match? match[1] : "";
                    let html = readFile(filePath);
                    if (html) {
                        let index = 1;
                        let dir = path.dirname(filePath);
                        let folder = path.basename(dir);
                        let re = new RegExp(downloadGroup.pattern, "g");
                        while ((match = re.exec(html))) {
                            let mappingData = downloadGroup.mappingData || "";
                            let nTokens = match.length - 1;
                            let url = downloadGroup.url, file = downloadGroup.file;
                            for (let iToken = 1; iToken <= nTokens; iToken++) {
                                let sToken = '$' + iToken;
                                let transform = downloadGroup.transform[sToken];
                                if (transform) {
                                    if (typeof transform == "string") {
                                        match[iToken] = sprintf(transform, match[iToken]);
                                    } else {
                                        for (let i = 0; i < transform.length; i += 2) {
                                            match[iToken] = match[iToken].replace(new RegExp(transform[i], "i"), transform[i+1]);
                                        }
                                    }
                                }
                                while (url.indexOf(sToken) >= 0) {
                                    if (match[iToken][0] == '/') {
                                        url = downloadGroup.host.replace(sToken, match[iToken]);
                                    } else {
                                        url = url.replace(sToken, match[iToken]);
                                    }
                                }
                                while (file.indexOf(sToken) >= 0) {
                                    file = file.replace(sToken, match[iToken]);
                                }
                                while (mappingData.indexOf(sToken) >= 0) {
                                    mappingData = mappingData.replace(sToken, match[iToken]);
                                }
                            }
                            if (limit) {
                                if (!downloadGroup.urlExclusions || downloadGroup.urlExclusions.indexOf(url) < 0) {
                                    if (downloadGroup.urlCollisions) {
                                        downloadGroup.urlCollisions.forEach((collisionGroup) => {
                                            let c = collisionGroup.indexOf(url);
                                            if (c >= 0) {
                                                file = file.replace('.', String.fromCharCode(65 + c) + '.');
                                            }
                                        });
                                    }
                                    if (createDownloadTask('download.' + source + '.' + group + '.' + folder + '.' + index++, url, dir, file)) {
                                        mappings += mappingData.replace('$file', path.join(path.sep, dir, file)).replace('$url', url).replace('$term', term);
                                        limit--;
                                    }
                                }
                            }
                        }
                    }
                });
            }
            if (downloadGroup.mappingFile && mappings != mappingsOld) {
                writeFile(downloadGroup.mappingFile, mappings);
            }
        });
    });
    let rowsLOC = readCSV(results.csv.citationsLOC);
    rowsLOC.forEach((cite) => {
        getLOCPDF(cite.volume, cite.page, cite.pageURL);
    });
    let cases = JSON.parse(readFile(sources.oyez.cases) || "{}");
    if (cases) {
        let transcripts = [];   // readCSV(sources.oeyz.transcripts);
        cases.ids.forEach((id) => {
            let dir = path.join(path.dirname(sources.oyez.cases), id);
            let file = id + ".json";
            let filePath = path.join(dir, file);
            if (fs.existsSync(rootDir + filePath)) {
                let json = readFile(filePath);
                if (json) {
                    let lines = json.split('\n');
                    if (lines.length == 1) {
                        json = sprintf("%2j", JSON.parse(json));
                        writeFile(filePath, json, true);
                    }
                    let cases = JSON.parse(json);
                    cases.forEach((caseSummary) => {
                        let fileID = caseSummary.docket_number + '_' + caseSummary.ID;
                        let file = fileID + ".json";
                        let filePath = path.join(dir, file);
                        if (fs.existsSync(rootDir + filePath)) {
                            let json = readFile(filePath);
                            if (json) {
                                let lines = json.split('\n');
                                if (lines.length == 1) {
                                    json = sprintf("%2j", JSON.parse(json));
                                    writeFile(filePath, json, true);
                                }
                                let caseDetail = JSON.parse(json);
                                let audioSummaries = [];
                                if (caseDetail.oral_argument_audio) {
                                    caseDetail.oral_argument_audio.forEach((audio) => {
                                        audio.type = "argument";
                                        audioSummaries.push(audio);
                                    });
                                }
                                if (caseDetail.opinion_announcement) {
                                    caseDetail.opinion_announcement.forEach((audio) => {
                                        audio.type = "decision";
                                        audioSummaries.push(audio);
                                    });
                                }
                                audioSummaries.forEach((audio) => {
                                    let date;
                                    let term = caseDetail.term;
                                    let usCite = (caseDetail.citation? getNewCite(+caseDetail.citation.volume, +caseDetail.citation.page) : "");
                                    let caseTitle = caseDetail.name;
                                    let audioTitle = audio.title;
                                    if (!audioTitle ||
                                        audioTitle.indexOf("unavailable") >= 0 ||
                                        audioTitle.indexOf("No oral argument") >= 0) {
                                        return;
                                    }
                                    let docket = fixOyezDocketNumber(caseSummary.docket_number);
                                    let dateDecision = getOyezDates(caseDetail.timeline, "Decided");
                                    let dateArgument = getOyezDates(caseDetail.timeline, "Argued");
                                    let dateRearg = getOyezDates(caseDetail.timeline, "Reargued");
                                    if (dateRearg) {
                                        if (dateArgument) dateArgument += ',';
                                        dateArgument += dateRearg;
                                    }
                                    let match = audioTitle.match(/([A-Z]+)\s+([0-9]+),\s+([0-9][0-9][0-9][0-9])/i);
                                    if (match) {
                                        date = parseDate(match[0]);
                                        if (isValidDate(date)) {
                                            dateArgument = sprintf("%#Y-%#02M-%#02D", date);
                                        } else {
                                            match = null;
                                        }
                                    }
                                    if (!match) {
                                        warning("%s (%s) has an invalid audio date (%s)\n", caseTitle, usCite, audioTitle);
                                    }
                                    let url = audio.href;
                                    let fileID = caseSummary.docket_number + '_' + audio.id + '_' + audio.type;
                                    let dir = path.join(path.dirname(sources.oyez.transcripts), "_files", term);
                                    let fileName = fileID + ".json";
                                    let filePath = path.join(dir, fileName);
                                    let urlOyez = caseDetail.href;
                                    let notes = "";
                                    let transcript = {term, usCite, caseTitle, audioTitle, docket, dateArgument, dateDecision, url, file: filePath, urlOyez, notes};
                                    // let i = searchSortedObjects(transcripts, {dateArgument, docket});
                                    // if (i < 0) {
                                    //     warning("unable to find %s (%s) [%s] {%s} '%s' in transcript list\n", caseTitle, usCite, docket, dateArgument, audioTitle);
                                    // }
                                    transcripts.push(transcript);
                                    if (fs.existsSync(rootDir + filePath)) {
                                        let json = readFile(filePath);
                                        if (json) {
                                            let lines = json.split('\n');
                                            if (lines.length == 1) {
                                                try {
                                                    json = sprintf("%2j", JSON.parse(json));
                                                    writeFile(filePath, json, true);
                                                } catch(err) {
                                                    warning("unable to process %s (%s)\n", filePath, err.message);
                                                }
                                            }
                                        }
                                    } else {
                                        createDownloadTask('download.transcript.' + fileID, url, dir, fileName);
                                    }
                                });
                            }
                        } else {
                            let url = caseSummary.href;
                            createDownloadTask('download.case.' + fileID, url, dir, file);
                        }
                    });
                }
            } else {
                let url = sprintf(cases.api, id);
                createDownloadTask('download.case.' + id, url, dir, file);
            }
        });
        sortObjects(transcripts, ["dateArgument", "docket"]);
        writeCSV(sources.oyez.transcripts, transcripts);
    }
    let advocates = JSON.parse(readFile(sources.oyez.advocates) || "{}");
    if (advocates) {
        let ids = Object.keys(advocates.ids);
        ids.forEach((id) => {
            let aliases = advocates.ids[id];
            let dir = path.join(path.dirname(sources.oyez.advocates), id);
            for (let i = 1; i < aliases.length; i++) {
                let alias = aliases[i];
                if (alias == "verified" || alias == "unverified") continue;
                let file = alias + ".json";
                let filePath = path.join(dir, file);
                if (fs.existsSync(rootDir + filePath)) {
                    let json = readFile(filePath);
                    if (json) {
                        let lines = json.split('\n');
                        if (lines.length == 1) {
                            json = sprintf("%2j", JSON.parse(json));
                            writeFile(filePath, json, true);
                        }
                        let cases = JSON.parse(json);
                        /*
                         * Before we start requesting all the case files for this advocate, let's
                         * append any missing cases to the list of objects.
                         */
                        let missingCases = advocates.missingCases && advocates.missingCases[id];
                        if (missingCases) cases.push(...missingCases);
                        cases.forEach((obj) => {
                            if (!obj.docket_number) return;
                            let dir = path.join(path.dirname(sources.oyez.cases), obj.term);
                            let fileID = obj.docket_number + '_' + obj.ID;
                            let file = fileID + ".json";
                            let filePath = path.join(dir, file);
                            if (fs.existsSync(rootDir + filePath)) {
                                let json = readFile(filePath);
                                if (json) {
                                    let lines = json.split('\n');
                                    if (lines.length == 1) {
                                        json = sprintf("%2j", JSON.parse(json));
                                        writeFile(filePath, json, true);
                                    }
                                }
                            } else {
                                let url = obj.href;
                                createDownloadTask('download.case.' + fileID, url, dir, file);
                            }
                        });
                    }
                } else {
                    let url = sprintf(advocates.api, alias);
                    createDownloadTask('download.advocate.' + alias, url, dir, file);
                }
            }
        });
    }
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

/**
 * mergeSCDBDockets(done)
 *
 * @param {function()} done
 */
function mergeSCDBDockets(done)
{
    let changes = 0;
    printf("reading SCDB decisions...\n");
    let decisions = JSON.parse(readFile(results.json.decisions));
    if (!isSortedObjects(decisions, ["caseId"])) {
        warning("decisions not sorted by [caseId]\n");
        done();
        return;
    }
    printf("reading SCDB docket records...\n");
    let decisionDockets = readCSV(sources.scdb.docketsCSV, "latin1", "html");
    if (!isSortedObjects(decisionDockets, ["caseId", "docketId"])) {
        warning("docket records not sorted by [caseId,docketId]\n");
        done();
        return;
    }
    printf("merging...\n");
    for (let i = 0; i < decisionDockets.length; i++) {
        let consolidated = 0;
        let docketRow = decisionDockets[i];
        docketRow.docket = fixDocketNumber(docketRow.docket);
        let caseId = docketRow.caseId;
        for (let j = i + 1; j < decisionDockets.length; j++) {
            let docketNext = decisionDockets[j];
            if (docketNext.caseId != docketRow.caseId) break;
            if (docketNext.usCite != docketRow.usCite) {
                warning("case %s has cite %s whereas case %s has cite %s\n", caseId, docketRow.usCite, docketNext.caseId, docketNext.usCite);
                break;
            }
            docketNext.docket = fixDocketNumber(docketNext.docket);
            consolidated++;
        }
        if (consolidated) {
            let d = searchSortedObjects(decisions, {caseId}, {});
            if (d < 0) {
                warning("unable to find unique case %s in decisions\n", caseId)
            } else if (decisions[d].docket.indexOf(',') < 0) {
                let decision = decisions[d];
                if (decision.docket != docketRow.docket) {
                    warning("lead docket (%s) for decision %s does not match first docket (%s) in docket records\n", decision.docket, caseId, docketRow.docket);
                } else {
                    let dockets = decision.docket;
                    for (let j = 1; j <= consolidated; j++) {
                        if (!decisionDockets[i + j].docket) continue;
                        if (dockets) dockets += ',';
                        dockets += decisionDockets[i + j].docket;
                    }
                    if (decision.docket != dockets) {
                        dockets = dockets.replace(/&ndash;/g, '-');
                        printf("%s (%s): change docket '%s' to '%s'\n", caseId, decision.usCite, decision.docket, dockets);
                        decision.docket = dockets;
                        changes++;
                    }
                }
            }
            i += consolidated - 1;
        }
    }
    if (changes) {
        printf("changes: %d\n", changes);
        writeFile(results.json.decisions, decisions);
    }
    done();
}

/**
 * reportChanges(done)
 *
 * @param {function()} done
 */
function reportChanges(done)
{
    printf("reading SCDB decisions...\n");
    let decisions = JSON.parse(readFile(results.json.decisions));
    printf("sorting SCDB decisions by [usCite,caseTitle]...\n");
    sortObjects(decisions, ["usCite","caseTitle"]);
    printf("comparing date records in %s to SCDB...\n", results.csv.dates);
    let rows = readCSV(results.csv.dates);
    rows.forEach((row) => {
        let usCite = row.usCite;
        let caseTitle = row.caseTitle;
        let dateDecision = row.dateDecision;
        if (dateDecision.length > 10) {
            /*
             * NOTE: Longer date strings (eg, dates including the day of the week) have been
             * deliberately stored in dates.csv to indicate cases in which the decision really
             * was issued on an "unusual" day of the week (eg, Saturday or Sunday).
             */
            dateDecision = sprintf("%#Y-%#02M-%#02D", dateDecision);
        }
        let i = searchSortedObjects(decisions, {usCite}, {caseTitle}, argv['detail']);
        if (i < 0) {
            warning("unable to find %s (%s): %s\n", caseTitle, usCite, dateDecision);
            return;
        }
        let decision = decisions[i];
        if (decision.dateDecision != dateDecision) {
            warning("%s (%s) has dateDecision %s, whereas %s (%s) has %s\n", caseTitle, usCite, dateDecision, (decision.caseTitle || decision.caseName), decision.usCite, decision.dateDecision);
        }
    });
    sortObjects(decisions, ["dateDecision"]);
    let decisionsOrig = JSON.parse(readFile(results.json.decisionsOrig));
    printf("\nlist of date corrections made to SCDB\n");
    decisions.forEach((decision) => {
        if (decision.caseNotes) {
            let cite = {};
            let urlSCDB = "";
            let caseTitle = decision.caseTitle || decision.caseName;
            let usCite = decision.usCite;
            let linkSCDB = "dateDecision";
            let linkSource = "";
            if (parseCite(usCite, cite)) {
                linkSCDB = sprintf("[%s](http://scdb.wustl.edu/analysisCaseListing.php?cid=%s-01)", linkSCDB, decision.caseId);
            }
            let match = decision.caseNotes.match(/replaced dateDecision from (https:\/\/[^;]*)/);
            if (match) {
                linkSource = sprintf("[%d U.S. %d](%s)", cite.volume, cite.page, match[1]);
            } else {
                match = decision.caseNotes.match(/replaced dateDecision \S+ \(correction from decisionDates\.pdf\)/);
                if (match) {
                    linkSource = "[Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf)";
                }
            }
            if (linkSource) {
                let i = searchSortedObjects(decisionsOrig, {caseId: decision.caseId});
                let decisionOrig = i >= 0? decisionsOrig[i] : {};
                let newDate = decision.dateDecision.length < 10? decision.dateDecision : sprintf("%#C", decision.dateDecision);
                printf("- %s (%s): %s changed from %#C to %s (see %s)\n", caseTitle, usCite, linkSCDB, decisionOrig.dateDecision, newDate, linkSource);
            }
        }
    });
    done();
}

/**
 * scrapeWallaceCases()
 */
function scrapeWallaceCases()
{
    let path = "/sources/oyez/advocates/w/wallace/lawrence_wallace";
    let text = readFile(path + "/_files/cases.html");
    if (text) {
        let keys = [], rows = [];
        let keysMatch = text.match(/<thead>([\s\S]*?)<\/thead>/);
        let rowsMatch = text.match(/<tbody>([\s\S]*?)<\/tbody>/);
        let reKey = /<th[^>]*>\s*(\S*)\s*<\/th>/g;
        let reRow = /<tr[^>]*>([\s\S]*?)<\/tr>/g;
        let reCol = /<td[^>]*>(?:<i>|)([\s\S]*?)(?:<\/i>|)<\/td>/g;
        if (keysMatch && rowsMatch) {
            let match, colMatch;
            while ((match = reKey.exec(keysMatch[1]))) {
                keys.push(match[1]);
            }
            while ((match = reRow.exec(rowsMatch[1]))) {
                let k = 0, row = {}, cols = 0;
                while ((colMatch = reCol.exec(match[1]))) {
                    row[keys[k++]] = (colMatch[1] == "NULL"? "" : decodeString(colMatch[1], "html").replace(/\s+/g, ' ').trim());
                    cols++;
                }
                if (cols) {
                    let volume = +row['c_volume'], page = +row['c_page'];
                    let newRow = {
                        volume: volume,
                        page: page,
                        year: 0,
                        caseTitle: row['c_title'],
                        oldCite: getOldCite(volume, page),
                        usCite: getNewCite(volume, page),
                        dateDecision: "",
                        docket: row['c_docket'],
                        term: +row['c_term'],
                        issue: row['c_issue'],
                        dateArgument: row['c_arguedate'],
                        daysArgument: +row['c_argdays'],
                        votesPetitioner: +row['c_votes_p1'],
                        votesRespondent: +row['c_votes_p2'],
                        advocateName: "Lawrence G. Wallace",
                        advocateRole: row['a_role']
                    };
                    let urlOyez = "cases/" + newRow.term + "/" + newRow.docket;
                    newRow.urlOyez = "https://www.oyez.org/" + urlOyez;
                    rows.push(newRow);
                }
            }
        }
        writeCSV(path + "/cases.csv", rows);
    }
}

/**
 * scrapeFiles(done)
 *
 * @param {function()} done
 */
function scrapeFiles(done)
{
    // scrapeWallaceCases();
    done();
}

/**
 * setRebuild(done)
 *
 * @param {function()} done
 */
function setRebuild(done)
{
    argv['overwrite'] = true;
    done();
}

/**
 * usage(done)
 *
 * @param {function()} done
 */
function usage(done)
{
    /*
     * Check for a few options commonly used with the 'find' task, and automatically invoke that task if present.
     */
    if (argv['d'] || argv['v'] || argv['p'] || argv['case'] || argv['cite'] || argv['docket'] || argv['reason']) {
        findDecisions(done);
        return;
    }
    printf("\ngulp [task] [options]\n");
    printf("gulp --tasks lists all available tasks\n\n");
    printf("find task options:\n");
    printf("\t--docket=#\tfind all decisions with docket # (also: --d)\n");
    printf("\t--page=#\tfind all decisions with page # (also: --p)\n");
    printf("\t--volume=#\tfind all decisions with volume # (also: --v)\n");
    printf("\n");
    done();
}

gulp.task("advocates", buildAdvocates);
gulp.task("briefs", listBriefs);
gulp.task("citations", gulp.series(buildCitations, runDownloadTasks));
gulp.task("courts", buildCourts);
gulp.task("dates", matchXMLDates);      // NOTE: matchTXTDates() was too sketchy, so we no longer use it
gulp.task("decisions", buildDecisions);
gulp.task("journals", matchJournals);
gulp.task("justices", buildJustices);
gulp.task("transcripts", matchTranscripts);
gulp.task("search", searchTranscripts);
gulp.task("all", gulp.series(findAllDecisions, findAllJustices));
gulp.task("allDecisions", findAllDecisions);
gulp.task("allJustices", findAllJustices);
gulp.task("loners", gulp.series(findLonerDecisions, findLonerJustices, findLonerParties));
gulp.task("lonerDecisions", findLonerDecisions);
gulp.task("lonerJustices", findLonerJustices);
gulp.task("lonerParties", findLonerParties);
gulp.task("backup", backupLonerDecisions);
gulp.task("download", gulp.series(generateDownloadTasks, runDownloadTasks));
gulp.task("find", findDecisions);
gulp.task("fixDecisions", fixDecisions);
gulp.task("fixDockets", fixDockets);
gulp.task("fixLOC", fixLOC);
gulp.task("merge", gulp.series(mergeSCDBDockets));
gulp.task("rebuild", gulp.series(setRebuild, findAllDecisions, findAllJustices, findLonerDecisions, findLonerJustices, findLonerParties, buildAdvocates));
gulp.task("report", gulp.series(reportChanges));
gulp.task("scrape", scrapeFiles);
gulp.task("tests", gulp.series(testDates));
gulp.task("default", usage);
