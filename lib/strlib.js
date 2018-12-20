/**
 * @fileoverview Defines string-related helper functions
 * @author <a href="mailto:Jeff@pcjs.org">Jeff Parsons</a> (@jeffpar)
 * @copyright © 2012-2018 Jeff Parsons
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

var iconv = require('iconv');

class strlib {
    /**
     * convert(text, encoding, conversion)
     *
     * The list of encodings that Node supports includes:
     *
     *      ascii
     *      base64
     *      binary
     *      hex
     *      ucs2/ucs-2/utf16le/utf-16le
     *      utf8/utf-8
     *      latin1 (ISO8859-1, only in node 6.4.0+)
     *
     * @param {string} text
     * @param {string} encoding (default is "utf-8")
     * @param {string} conversion (default is "utf-8)
     * @return {string}
     */
    static convert(text, encoding="utf-8", conversion="utf-8")
    {
        if (encoding != conversion) {
            let ic = new iconv.Iconv(encoding, conversion);
            let buf = ic.convert(text);
            return buf.toString(conversion);
        }
        return text;
    }
}

strlib.args = strlib;

module.exports = strlib;
