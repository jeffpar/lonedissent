/**
 * @fileoverview Defines stdio class functions
 * @author <a href="mailto:Jeff@pcjs.org">Jeff Parsons</a>
 * @copyright © 2018 Jeff Parsons and the PCjs Project
 *
 * This file is part of PCjs, a computer emulation software project at <https://www.pcjs.org>.
 *
 * PCjs is free software: you can redistribute it and/or modify it under the terms of the
 * GNU General Public License as published by the Free Software Foundation, either version 3
 * of the License, or (at your option) any later version.
 *
 * PCjs is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with PCjs.  If not,
 * see <http://www.gnu.org/licenses/gpl.html>.
 *
 * You are required to include the above copyright notice in every modified copy of this work
 * and to display that copyright notice when the software starts running; see COPYRIGHT in
 * <https://www.pcjs.org/modules/shared/lib/defines.js>.
 *
 * Some PCjs files also attempt to load external resource files, such as character-image files,
 * ROM files, and disk image files. Those external resource files are not considered part of PCjs
 * for purposes of the GNU General Public License, and the author does not claim any copyright
 * as to their contents.
 */

 "use strict";

let fs = require("fs");

/**
 * @class FILE
 * @property {string} path
 * @property {string} mode
 * @property {string|null} buffer
 * @property {number} pos
 * @property {boolean} eof
 * @property {number|null} fd (file descriptor)
 * @property {Stats|null} stat
 * @property {Error|null} err
 */
class FILE {
    /**
     * FILE(path, mode)
     *
     * @this {FILE}
     */
    constructor()
    {
        this.fd = this.stat = this.err = null;
    }

    /**
     * close(fForce)
     *
     * @this {FILE}
     * @param {boolean} [fForce]
     * @return {Error|null}
     */
    close(fForce)
    {
        if (NODE) {
            try {
                fs.closeSync(this.fd);
                this.err = null;
            } catch (err) {
                this.setError(err);
            }
        }
        else {

        }
        if (!this.err || fForce) {
            this.fd = null;
            this.buf = null;
            this.pos = 0;
            this.eof = false;
        }
        return this.err;
    }

    /**
     * eof()
     *
     * @this {FILE}
     * @return {boolean}
     */
    eof()
    {
        return this.eof;
    }

    /**
     * getPath()
     *
     * @this {FILE}
     * @return {string}
     */
    getPath()
    {
        return this.path;
    }

    /**
     * gets(count)
     *
     * @this {FILE}
     * @param {number} count (max characters, less one, to read from file, up to next newline; -1 for no limit)
     * @return {string|null}
     */
    gets(count)
    {
        if (!this.buf) {
            this.read();
        }
        if (this.buf) {
            let i = this.pos;
            let end = this.buf.indexOf('\n', i);
            if (end >= 0) {
                end++;
            } else {
                end = this.buf.length;
            }
            let len = end - i;
            if (len > 0) {
                if (count >= 0 && len >= count) {
                    len = count - 1;
                }
                this.pos += len;
                return this.buf.substr(i, len);
            }
            this.eof = true;
        }
        return null;
    }

    /**
     * open(path, mode)
     *
     * @this {FILE}
     * @param {string} path
     * @param {string} [mode]
     * @return {Error|null}
     */
    open(path, mode = FILE.MODE.READ)
    {
        this.close(true);

        this.path = path;
        this.mode = mode;

        if (NODE) {
            try {
                this.fd = fs.openSync(this.path, this.mode);
                this.stat = fs.fstatSync(this.fd);
                this.err = null;
            } catch (err) {
                this.setError(err);
            }
        }
        else {
            if (mode.indexOf(FILE.MODE.READ) >= 0) {
                this.read();
            }
        }
        return this.err;
    }

    /**
     * puts(str)
     *
     * @this {FILE}
     * @param {string} str
     * @return {Error|null}
     */
    puts(str)
    {
        if (NODE) {
            try {
                fs.writeSync(this.fd, str);
                this.err = null;
            } catch (err) {
                this.setError(err);
            }
        }
        else {
            this.unimplemented('puts("' + str + '")');
        }
        return this.err;
    }

    /**
     * read()
     *
     * @this {FILE}
     * @return {Error|null}
     */
    read()
    {
        if (NODE) {
            try {
                let result = fs.readSync(this.fd, this.stat.size, this.pos, "utf8");
                this.buf = result[0];           // number of bytes read returned in result[1]
                // this.buf = /** @type {string} */ (fs.readFileSync(this.path, {encoding: "utf8"}));
            } catch (err) {
                return this.setError(err);
            }
        } else {
            let verb = "GET";
            let xhr = new XMLHttpRequest();
            xhr.open(verb, this.path, false);
            xhr.send();
            if (!xhr.status || xhr.status >= 400 || !xhr.response) {
                return this.setError(new Error("unable to " + verb + " " + this.path + " (" + xhr.status + ")"), xhr.status || -1);
            }
            this.buf = /** @type {string} */ (xhr.response);
        }
        return null;
    }

    /**
     * setError(err, code)
     *
     * @this {FILE}
     * @param {Error} err
     * @param {number} [code]
     * @return {Error}
     */
    setError(err, code)
    {
        this.err = err;
        stdio.errno = code || this.err.code;
        return err;
    }

    /**
     * unimplemented(s)
     *
     * @this {FILE}
     * @param {string} s
     * @return {Error}
     */
    unimplemented(s)
    {
        return this.setError(new Error("unimplemented: " + s));
    }
}

FILE.MODE = {
    READ:       "r",
    WRITE:      "w",
    APPEND:     "a",
    READ_EX:    "r+",
    WRITE_EX:   "w+",
    APPEND_EX:  "a+",
    BINARY:     "b"
};

/**
 * @class stdio
 */
class stdio
{
    /**
     * fclose(file)
     *
     * @param {FILE} file
     * @return {number} (0 if success, EOF if failure)
     */
    static fclose(file)
    {
        return !file || file.close()? stdio.EOF : 0;
    }

    /**
     * feof(file)
     *
     * @param {FILE} file
     * @return {number}
     */
    static feof(file)
    {
        return !file || file.eof()? stdio.EOF : 0;
    }

    /**
     * fgets(count, file)
     *
     * @param {number} count (max characters, less one, to read from file, up to next newline; -1 for no limit)
     * @param {FILE} file
     * @return {string|null}
     */
    static fgets(count, file)
    {
        return file.gets(count);
    }

    /**
     * fopen(path, mode)
     *
     * @param {string} path
     * @param {string} [mode]
     * @return {FILE|null}
     */
    static fopen(path, mode = FILE.MODE.READ)
    {
        let file = new FILE();
        return file.open(path, mode)? null : file;
    }

    /**
     * fputs(str, file)
     *
     * @param {string} str
     * @param {FILE} file
     * @return {number} (non-negative value on success, negative value on failure)
     */
    static fputs(str, file)
    {
        return file.puts(str)? stdio.EOF : str.length;
    }

    /**
     * printf(format, ...args)
     *
     * @param {string} format
     * @param {...} args
     * @return {number}
     */
    static printf(format, ...args)
    {
        let text = stdio.sprintf(format, ...args);
        stdio.write(text);
        return text.length;
    }

    /**
     * sprintf(format, ...args)
     *
     * Copied from the CCjs project (https://github.com/jeffpar/ccjs/blob/master/lib/stdio.js) and extended.
     *
     * Far from complete, let alone sprintf-compatible, but it's adequate for the handful of sprintf-style format
     * specifiers that I use.
     *
     * TODO: The %c and %s specifiers support a negative width (for left-justified output), but the numeric specifiers
     * (eg, %d and %x) do not; they support only positive widths and right-justified output.  That's one of the more
     * glaring omissions at the moment.
     *
     * @param {string} format
     * @param {...} args
     * @return {string}
     */
    static sprintf(format, ...args)
    {
        let text = "";
        let aParts = format.split(/%([-+ 0#]*)([0-9]*|\*)(\.[0-9]+|)([hlL]?)([A-Za-z%])/);

        let iArg = 0, iPart;
        for (iPart = 0; iPart < aParts.length - 6; iPart += 6) {

            text += aParts[iPart];
            let type = aParts[iPart+5];

            /*
             * Check for unrecognized types immediately, so we don't inadvertently pop any arguments;
             * the first 10 ("ADFHIMNSWY") are for our non-standard Date extensions (see below).
             *
             * For reference purposes, the standard ANSI C set of format types is: "dioxXucsfeEgGpn%".
             */
            if ("ADFHIMNSWYdfjcsoXx%".indexOf(type) < 0) {
                text += '%' + aParts[iPart+1] + aParts[iPart+2] + aParts[iPart+3] + aParts[iPart+4] + type;
                continue;
            }

            let arg = args[iArg];
            if (type != '%') iArg++;
            let flags = aParts[iPart+1];
            let width = aParts[iPart+2];
            if (width == '*') {
                width = arg;
                arg = args[iArg++];
            } else {
                width = +width || 0;
            }
            let precision = aParts[iPart+3];
            precision = precision? +precision.substr(1) : -1;
            // let length = aParts[iPart+4];       // eg, 'h', 'l' or 'L' (all currently ignored)
            let hash = flags.indexOf('#') >= 0;
            let ach = null, s, radix = 0, p, prefix = "";

            /*
             * The following non-standard sprintf() format codes provide handy alternatives to the
             * PHP date() format codes that we used to use with the old datelib.formatDate() function:
             *
             *      a:  lowercase ante meridiem and post meridiem (am or pm)                %A
             *      d:  day of the month, 2 digits with leading zeros (01, 02, ..., 31)     %02D
             *      D:  3-letter day of the week ("Sun", "Mon", ..., "Sat")                 %.3W
             *      F:  month ("January", "February", ..., "December")                      %F
             *      g:  hour in 12-hour format, without leading zeros (1, 2, ..., 12)       %I
             *      h:  hour in 24-hour format, without leading zeros (0, 1, ..., 23)       %H
             *      H:  hour in 24-hour format, with leading zeros (00, 01, ..., 23)        %02H
             *      i:  minutes, with leading zeros (00, 01, ..., 59)                       %02N
             *      j:  day of the month, without leading zeros (1, 2, ..., 31)             %D
             *      l:  day of the week ("Sunday", "Monday", ..., "Saturday")               %W
             *      m:  month, with leading zeros (01, 02, ..., 12)                         %02M
             *      M:  3-letter month ("Jan", "Feb", ..., "Dec")                           %.3F
             *      n:  month, without leading zeros (1, 2, ..., 12)                        %M
             *      s:  seconds, with leading zeros (00, 01, ..., 59)                       %02S
             *      y:  2-digit year (eg, 14)                                               %0.2Y
             *      Y:  4-digit year (eg, 2014)                                             %Y
             *
             * Use the optional '#' flag with any of the above '%' format codes to produce UTC results;
             * eg, '%#I' instead of '%I'.
             *
             * The %A, %F, and %W types act as strings (which support the '-' left justification flag, as well as
             * the width and precision options), and the rest act as integers (which support the '0' padding flag
             * and the width option).  Also, while %Y does act as an integer, it also supports truncation using the
             * precision option (normally, integers do not); this enables a variable number of digits for the year.
             *
             * So old code like this:
             *
             *      printf("%s\n", formatDate("l, F j, Y", date));
             *
             * can now be written like this:
             *
             *      printf("%W, %F %D, %Y\n", date, date, date, date);
             */
            let date = /** @type {Date} */ (typeof arg != "object"? new Date(arg) : arg);

            switch(type) {
            case 'D':
                arg = hash? date.getUTCDate() : date.getDate();
                type = 'd';
                break;

            case 'A':
            case 'H':
            case 'I':
                arg = hash? date.getUTCHours() : date.getHours();
                if (type == 'A') {
                    arg = (arg < 12 ? "am" : "pm");
                    type = 's';
                }
                else {
                    if (type == 'I') {
                        arg = (!arg? 12 : (arg > 12 ? arg - 12 : arg));
                    }
                    type = 'd';
                }
                break;

            case 'F':
            case 'M':
                arg = hash? date.getUTCMonth() : date.getMonth();
                if (type == 'F') {
                    arg = stdio.NamesOfMonths[arg];
                    type = 's';
                } else {
                    arg++;
                    type = 'd';
                }
                break;

            case 'N':
                arg = hash? date.getUTCMinutes() : date.getMinutes();
                type = 'd';
                break;

            case 'S':
                arg = hash? date.getUTCSeconds() : date.getSeconds();
                type = 'd'
                break;

            case 'W':
                arg = stdio.NamesOfDays[hash? date.getUTCDay() : date.getDay()];
                type = 's';
                break;

            case 'Y':
                arg = hash? date.getUTCFullYear() : date.getFullYear();
                if (precision > 0) {
                    arg = arg % (Math.pow(10, precision));
                    precision = -1;
                }
                type = 'd';
                break;
            }

            switch(type) {
            case 'd':
                /*
                 * We could use "arg |= 0", but there may be some value to supporting integers > 32 bits.
                 *
                 * Also, unlike the 'X' and 'x' hexadecimal cases, there's no need to explicitly check for a string
                 * arguments, because Math.trunc() automatically coerces any string value to a (decimal) number.
                 */
                arg = Math.trunc(arg);
                /* falls through */

            case 'f':
                s = arg + "";
                if (precision > 0) {
                    width -= (precision + 1);
                }
                if (s.length < width) {
                    if (flags.indexOf('0') >= 0) {
                        if (arg < 0) width--;
                        s = ("0000000000" + Math.abs(arg)).slice(-width);
                        if (arg < 0) s = '-' + s;
                    } else {
                        s = ("          " + s).slice(-width);
                    }
                }
                if (precision > 0) {
                    arg = Math.round((arg - Math.trunc(arg)) * Math.pow(10, precision));
                    s += '.' + ("0000000000" + Math.abs(arg)).slice(-precision);
                }
                text += s;
                break;

            case 'j':
                /*
                 * 'j' is one of our non-standard extensions to the sprintf() interface; it signals that
                 * the caller is providing an Object that should be rendered as JSON.  If a width is included
                 * (eg, "%2j"), it's used as an indentation value; otherwise, no whitespace is added.
                 */
                text += JSON.stringify(arg, null, width || null);
                break;

            case 'c':
                arg = String.fromCharCode(arg);
                /* falls through */

            case 's':
                /*
                 * 's' includes some non-standard behavior: if the argument is not actually a string, we coerce
                 * it to a string first.
                 */
                if (arg !== undefined) {
                    if (typeof arg != "string") {
                        arg = arg.toString();
                    }
                    if (precision >= 0) {
                        arg = arg.substr(0, precision);
                    }
                    while (arg.length < width) {
                        if (flags.indexOf('-') >= 0) {
                            arg += ' ';
                        } else {
                            arg = ' ' + arg;
                        }
                    }
                }
                text += arg;
                break;

            case 'o':
                radix = 8;
                if (hash) prefix = "0";
                /* falls through */

            case 'X':
                ach = stdio.HexUpperCase;
                if (hash) prefix = "0X";
                /* falls through */

            case 'x':
                s = "";
                if (!radix) radix = 16;
                if (!prefix && hash) prefix = "0x";
                if (!ach) ach = stdio.HexLowerCase;
                if (typeof arg == "string") {
                    /*
                     * Since we're advised to ALWAYS pass a radix to parseInt(), we must detect explicitly
                     * hex values ourselves, because using a radix of 10 with any "0x..." value always returns 0.
                     *
                     * And if the value CAN be interpreted as decimal, then we MUST interpret it as decimal, because
                     * we have sprintf() calls in /modules/pcx86/lib/testmon.js that depend on this code to perform
                     * decimal to hex conversion.  We're going to make our own rules here, since passing numbers in
                     * string form isn't part of the sprintf "spec".
                     */
                    arg = Number.parseInt(arg, arg.match(/(^0x|[a-f])/i)? 16 : 10);
                }
                p = width? "" : prefix;
                do {
                    let d = arg & (radix - 1);
                    arg >>>= (radix == 16? 4 : 3);
                    if (flags.indexOf('0') >= 0 || s == "" || d || arg) {
                        s = ach[d] + s;
                    } else if (width) {
                        if (!prefix) {
                            s = ' ' + s;
                        } else {
                            s = prefix.slice(-1) + s;
                            prefix = prefix.slice(0, -1);
                        }
                    }
                } while (--width > 0 || arg);
                text += p + s;
                break;

            case '%':
                text += '%';
                break;

            default:
                text += "(unimplemented printf type %" + type + ")";
                break;
            }
        }

        text += aParts[iPart];
        return text;
    }

    /**
     * write(text)
     *
     * @param {string} text
     */
    static write(text)
    {
        process.stdout.write(text);
    }

    /**
     * errno
     *
     * @return {number}
     */
    static get errno()
    {
        return stdio.errCode;
    }

    /**
     * errno
     *
     * @param {number} code
     */
    static set errno(code)
    {
        stdio.errCode = code;
    }
}

/**
 * @type {number}
 */
stdio.EOF       = -1;

/**
 * @type {number}
 */
stdio.errCode   = 0;

/*
 * Handy global constants
 */
stdio.HexLowerCase = "0123456789abcdef";
stdio.HexUpperCase = "0123456789ABCDEF";
stdio.NamesOfDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
stdio.NamesOfMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

module.exports = stdio;
