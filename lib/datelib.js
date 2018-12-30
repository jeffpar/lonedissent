/**
 * @fileoverview Defines date library functions
 * @author <a href="mailto:Jeff@pcjs.org">Jeff Parsons</a>
 * @copyright © 2018 Jeff Parsons
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

/**
 * @class datelib
 */
class datelib
{
    /**
     * formatDate(format, date, fUTC)
     *
     * Supported identifiers in format include:
     *
     *      a:  lowercase ante meridiem and post meridiem (am or pm)
     *      d:  day of the month, 2 digits with leading zeros (01, 02, ..., 31)
     *      D:  3-letter day of the week ("Sun", "Mon", ..., "Sat")
     *      F:  month ("January", "February", ..., "December")
     *      g:  hour in 12-hour format, without leading zeros (1, 2, ..., 12)
     *      h:  hour in 24-hour format, without leading zeros (0, 1, ..., 23)
     *      H:  hour in 24-hour format, with leading zeros (00, 01, ..., 23)
     *      i:  minutes, with leading zeros (00, 01, ..., 59)
     *      j:  day of the month, without leading zeros (1, 2, ..., 31)
     *      l:  day of the week ("Sunday", "Monday", ..., "Saturday")
     *      m:  month, with leading zeros (01, 02, ..., 12)
     *      M:  3-letter month ("Jan", "Feb", ..., "Dec")
     *      n:  month, without leading zeros (1, 2, ..., 12)
     *      s:  seconds, with leading zeros (00, 01, ..., 59)
     *      y:  2-digit year (eg, 14)
     *      Y:  4-digit year (eg, 2014)
     *
     * For more inspiration, see: http://php.net/manual/en/function.date.php (of which we support ONLY a subset).
     *
     * NOTE: MDN documentation for JavaScript's Date constructor says:
     *
     *      Support for ISO 8601 formats differs in that date-only strings (e.g. "1970-01-01") are treated as UTC, not local.
     *
     * Unfortunately, Date objects don't record whether they were created with UTC or local times, so if you pass in
     * a date-only value, be sure to set fUTC to true, so that only UTC functions are used below, for consistency.
     *
     * @param {string} format (eg, "F j, Y", "Y-m-d H:i:s")
     * @param {Date|string|number} [date] (default is the current time)
     * @param {boolean} [fUTC] (default is false, for local time)
     * @return {string}
     */
    static formatDate(format, date, fUTC)
    {
        if (!date) {
            if (!fUTC) {
                date = new Date();
            } else {
                date = new Date(Date.now());
            }
        } else if (typeof date != "object") {
            if (typeof date == "string" && date.length <= 10) {
                if (fUTC === undefined) fUTC = true;
            }
            date = new Date(date);
        }
        let sDate = "";
        if (!isNaN(date.getTime())) {
            let iHour = fUTC? date.getUTCHours() : date.getHours();
            let iMinutes = fUTC? date.getUTCMinutes() : date.getMinutes();
            let iSeconds = fUTC? date.getUTCSeconds() : date.getSeconds();
            let iDayOfWeek = fUTC? date.getUTCDay() : date.getDay();
            let iDay = fUTC? date.getUTCDate() : date.getDate();
            let iMonth = (fUTC? date.getUTCMonth() : date.getMonth())+ 1;
            let iYear = fUTC? date.getUTCFullYear() : date.getFullYear();
            for (let i = 0; i < format.length; i++) {
                let ch;
                switch ((ch = format.charAt(i))) {
                case 'a':
                    sDate += (iHour < 12 ? "am" : "pm");
                    break;
                case 'd':
                    sDate += ('0' + iDay).slice(-2);
                    break;
                case 'D':
                    sDate += datelib.NamesOfDays[iDayOfWeek].substr(0, 3);
                    break;
                case 'F':
                    sDate += datelib.NamesOfMonths[iMonth - 1];
                    break;
                case 'g':
                    sDate += (!iHour ? 12 : (iHour > 12 ? iHour - 12 : iHour));
                    break;
                case 'h':
                    sDate += iHour;
                    break;
                case 'H':
                    sDate += ('0' + iHour).slice(-2);
                    break;
                case 'i':
                    sDate += ('0' + iMinutes).slice(-2);
                    break;
                case 'j':
                    sDate += iDay;
                    break;
                case 'l':
                    sDate += datelib.NamesOfDays[iDayOfWeek];
                    break;
                case 'm':
                    sDate += ('0' + iMonth).slice(-2);
                    break;
                case 'M':
                    sDate += datelib.NamesOfMonths[iMonth - 1].substr(0, 3);
                    break;
                case 'n':
                    sDate += iMonth;
                    break;
                case 's':
                    sDate += ('0' + iSeconds).slice(-2);
                    break;
                case 'y':
                    sDate += ("" + iYear).slice(-2);
                    break;
                case 'Y':
                    sDate += iYear;
                    break;
                default:
                    sDate += ch;
                    break;
                }
            }
        } else {
            sDate = "unknown";
        }
        return sDate;
    }

    /**
     * adjustDate(date, days)
     *
     * Although the setDate() method compensates for day-of-month values outside the current month:
     *
     *      > let d = new Date('11/4/2012');d
     *      2012-11-04T07:00:00.000Z
     *      > new Date(d.setDate(d.getDate() + 365))
     *      2014-11-04T08:00:00.000Z
     *
     * notice the discrepancy in the time-of-day.  Even if there is some technical reason (eg, a DayLight
     * Savings Time side-effect) why that answer is correct, it doesn't satisfy my goal of adjusting ONLY the
     * day, not the time-of-day.
     *
     * By comparison, the method below (multiplying the number of milliseconds in a day by the number of days)
     * works just fine, without any unexpected side-effects:
     *
     *      > let d = new Date('11/4/2012');d
     *      2012-11-04T07:00:00.000Z
     *      > new Date(d.getTime() + 365 * 86400000)
     *      2013-11-04T07:00:00.000Z
     *
     * @param {Date} date
     * @param {number} days (+/-)
     * @return {Date}
     */
    static adjustDate(date, days)
    {
        return new Date(date.getTime() + days * 86400000);
    }

    /**
     * subtractDates(date1, date2)
     *
     * @param {Date|string} date1
     * @param {Date|string} date2
     * @return {number} (date1 - date2, returned as a signed integer number of days)
     */
    static subtractDates(date1, date2)
    {
        if (typeof date1 == "string") date1 = new Date(date1);
        if (typeof date2 == "string") date2 = new Date(date2);
        return Math.round((date1.getTime() - date2.getTime()) / 86400000);
    }
}

/*
 * Handy global constants
 */
datelib.NamesOfDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
datelib.NamesOfMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

module.exports = datelib;
