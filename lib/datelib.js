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
     * parseDate(date)
     * parseDate(date, time)
     * parseDate(year, month, day, hour, minute, second)
     *
     * Produces a UTC date when ONLY a date (no time) is provided; otherwise, it combines the date and
     * and time, producing a date that is either UTC or local, depending on the presence (or lack) of time
     * zone information.  Finally, if numeric inputs are provided, then Date.UTC() is called to generate
     * a UTC time.
     *
     * In general, you should use this instead of new Date(s), because the Date constructor implicitly calls
     * Date.parse(s), which behaves inconsistently.  For example, ISO date-only strings (e.g. "1970-01-01")
     * generate a UTC time, but non-ISO date-only strings (eg, "10/1/1945" or "October 1, 1945") generate a
     * local time.
     *
     * @param {Array.<string|number>} args
     * @return {Date} (UTC unless a time string with a non-GMT timezone is explicitly provided)
     */
    static parseDate(...args)
    {
        let date;
        if (args[0] === undefined) {
            date = new Date(Date.now());
        }
        else if (typeof args[0] === "string") {
            date = new Date(args[0] + ' ' + (args[1] || "00:00:00 GMT"));
        }
        else if (args[1] === undefined) {
            date = new Date(args[0]);
        } else {
            date = new Date(Date.UTC(...args));
        }
        // if (isNaN(date.getTime())) {
        //     console.log("warning: parseDate(" + args + ") failed");
        // }
        return date;
    }

    /**
     * adjustDays(date, days)
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
     * appears to work just fine, without any unexpected side-effects:
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
    static adjustDays(date, days)
    {
        return new Date(date.getTime() + days * 86400000);
    }

    /**
     * subtractDays(date1, date2)
     *
     * @param {Date|string} date1
     * @param {Date|string} date2
     * @return {number} (date1 - date2, returned as a signed integer number of days)
     */
    static subtractDays(date1, date2)
    {
        if (typeof date1 == "string") date1 = new Date(date1);
        if (typeof date2 == "string") date2 = new Date(date2);
        return Math.round((date1.getTime() - date2.getTime()) / 86400000);
    }
}

module.exports = datelib;
