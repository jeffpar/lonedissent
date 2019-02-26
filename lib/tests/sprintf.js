"use strict";

let rootDir = "../..";
// #include <stdio.h>
let stdio = require(rootDir + "/lib/stdio");
let printf = stdio.printf;
let sprintf = stdio.sprintf;

/**
 * main(argc, argv)
 *
 * @param {number} argc
 * @param {Array.<string>} argv
 */
function main(argc, argv)
{
    for (let i = 0; i <= 10; i++) {
        printf("%*chello %s\n", i, ' ', argc > 1? argv[1] : "world");
    }
}

process.argv.shift();
main(process.argv.length, process.argv);
