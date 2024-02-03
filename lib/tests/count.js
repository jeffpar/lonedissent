import fs from "fs";
import path from "path";
import stdio from "../stdio.js";

let rootDir = "../..";
let printf = stdio.printf;
let sprintf = stdio.sprintf;

let files = [
    "_pages/transcripts/pre-1955/brown1/_files/brown-v-board-of-education-1952-12-09.md",
    "_pages/transcripts/pre-1955/brown1/_files/briggs-v-elliott-1952-12-09.md",
    "_pages/transcripts/pre-1955/brown1/_files/briggs-v-elliott-1952-12-10.md",
    "_pages/transcripts/pre-1955/brown1/_files/davis-v-county-school-board-1952-12-10.md",
    "_pages/transcripts/pre-1955/brown1/_files/bolling-v-sharpe-1952-12-10.md",
    "_pages/transcripts/pre-1955/brown1/_files/bolling-v-sharpe-1952-12-11.md",
    "_pages/transcripts/pre-1955/brown1/_files/gebhart-v-belton-1952-12-11.md",
    "_pages/transcripts/pre-1955/brown1/_files/briggs-and-davis-1953-12-07.md",
    "_pages/transcripts/pre-1955/brown1/_files/briggs-and-davis-1953-12-08.md",
    "_pages/transcripts/pre-1955/brown1/_files/brown-v-board-of-education-1953-12-08.md",
    "_pages/transcripts/pre-1955/brown1/_files/bolling-v-sharpe-1953-12-08.md",
    "_pages/transcripts/pre-1955/brown1/_files/bolling-v-sharpe-1953-12-09.md",
    "_pages/transcripts/pre-1955/brown1/_files/gebhart-v-belton-1953-12-09.md"
];

let htmlReplacements = {
    "<[^>]*>\\s*\\[[^]]*\\]\\s*<[^>]*>": "",
    "<b>[\\S\\s]*?</b>": "",
    "<[^>]*>": "",
    "&nbsp;": " ",
    "&#39;": "'",
    "&quot;": "'",
    "\"": "'"
};

let speakerMappings = {
    "MR. CHIEF JUSTICE VINSON": "Chief Justice Fred Vinson",
    "MR. CHIEF JUSTICE WARREN": "Chief Justice Earl Warren",
    "MR. JUSTICE BLACK": "Justice Hugo Black",
    "MR. JUSTICE BURTON": "Justice Harold Burton",
    "MR. JUSTICE DOUGLAS": "Justice William O. Douglas",
    "MR. JUSTICE FRANKFURTER": "Justice Felix Frankfurter",
    "MR. JUSTICE JACKSON": "Justice Robert H. Jackson",
    "MR. JUSTICE MINTON": "Justice Sherman Minton",
    "MR. JUSTICE REED": "Justice Stanley Reed",
    "THE CLERK": "The Clerk",
    "MR. JUSTICE CLARK": "Justice Tom C. Clark",
    "MR. ALMOND": "J. Lindsay Almond, Jr.",
    "MR. CARTER": "Robert L. Carter",
    "MR. DAVIS": "John W. Davis",
    "MR. GREENBERG": "Jack Greenberg",
    "MR. HAYES": "George E.C. Hayes",
    "MR. KORMAN": "Milton D. Korman",
    "MR. MARSHALL": "Thurgood Marshall",
    "MR. MOORE": "T. Justin Moore",
    "MR. NABRIT": "James M. Nabrit, Jr.",
    "MR. REDDING": "Louis L. Redding",
    "MR. ROBINSON": "Spottswood W. Robinson, III",
    "MR. WILSON": "Paul E. Wilson",
    "MR. SCOTT": "Charles S. Scott",
    "MR. YOUNG": "H. Albert Young",
    "MR. RANKIN": "J. Lee Rankin",
};

/**
 * countWords(text)
 */
function countWords(text)
{
    let speakers = [];
    let lines = text.split("\n");
    for (let line of lines) {
        if (!line) continue;
        let match = line.match(/^([^:]*):\s*(.*)$/);
        if (!match) {
            printf("error: cannot parse \"%s\"\n", line);
            continue;
        }
        let name = match[1];
        let words = match[2].split(/\s+/);
        let count = words.length;
        let speaker = speakers.find(function(s) {
            return s.name == name;
        });
        if (speaker) {
            speaker.count += count;
        } else {
            speakers.push({ name, count });
        }
    }
    speakers.sort(function(a, b) {
        return b.count - a.count;
    });
    for (let speaker of speakers) {
        let name = speakerMappings[speaker.name];
        if (name) {
            delete speakerMappings[speaker.name];
        } else {
            name = speaker.name;
        }
        printf("%s: %d words\n", name, speaker.count);
    }
    let keys = Object.keys(speakerMappings);
    for (let key of keys) {
        printf("%s: did not speak\n", speakerMappings[key]);
    }
}

/**
 * parseSpeakers(name, text)
 */
function parseSpeakers(name, text)
{
    let chunks = text.split(/<[Bb]>\s*(MR\.[^<]*?|THE CLERK)\s*<\/[Bb]>:\s*/);
    if (chunks.length < 2) {
        chunks = text.split(/<[Pp]>\s*(MR\.[^<]*?|THE CLERK):\s*/);
    }
    for (let i = 1; i < chunks.length; i += 2) {
        let speaker = chunks[i];
        let chunk = chunks[i + 1];
        for (let entity in htmlReplacements) {
            chunk = chunk.replace(new RegExp(entity, "gi"), htmlReplacements[entity]);
        }
        chunk = chunk.replace(/\s+/g, " ").trim();
        printf("\n%s: \"%s\"\n", speaker, chunk);
    }
}

/**
 * main(argc, argv)
 *
 * @param {number} argc
 * @param {Array.<string>} argv
 */
function main(argc, argv)
{
    if (argv[0]) {
        let text = fs.readFileSync("Brown_I-Raw_Text.txt", "utf8");
        countWords(text);
        return;
    }
    for (let file of files) {
        let text = fs.readFileSync(path.join(rootDir, file), "utf8");
        parseSpeakers(path.basename(file), text);
    }
}

process.argv.shift();
main(process.argv.length, process.argv);
