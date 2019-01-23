---
title: Building Data Files
permalink: /blog/2018/12/21/
---

A few data files have been created so far:

- [courts.json](/sources/results/courts.json)
- [decisions.json](/sources/results/decisions.json)
- [justices.json](/sources/results/justices.json)

in preparation for making this a more interesting website.  Most of our
[Court](/sources/results/courts.json) and [Justice](/sources/results/justices.json) data came
from [Oyez](https://www.oyez.org/), while all the [Decision](/sources/results/decisions.json)
data was imported from [CSV files](/sources/scdb/decisions.csv) provided by the
[Supreme Court Database](http://scdb.wustl.edu/index.php), aka SCDB.

To make good use of the raw SCDB data, you need tables that map all the numeric
codes to what they actually represent.  To that end, SCDB provides a
[Code Book](http://scdb.wustl.edu/_brickFiles/2018_02/SCDB_2018_02_codebook.pdf),
but PDFs are *not* particularly easy to parse.  The next best thing is their
[Online Code Book](http://scdb.wustl.edu/documentation.php),
but again, lots of work is required to turn all those HTML tables into something
your code can ingest.

So, we built a collection of [SCDB Variables](/sources/scdb/vars.json).  Then we wrote a
script that reads every field of every record of [SCDB CSV files](/sources/scdb/decisions.csv)
and verifies that every field's value exists in the [SCDB Variables](/sources/scdb/vars.json)
collection.

The script revealed the following discrepancies:

    warning: CSV row 172190 field splitVote has unexpected value '-99'
    warning: CSV row 172190 field justice has unexpected value '-99'
    warning: CSV row 172190 field justiceName has unexpected value '-99'
    warning: CSV row 172191 field splitVote has unexpected value '-99'
    warning: CSV row 172191 field justice has unexpected value '-99'
    warning: CSV row 172191 field justiceName has unexpected value '-99'
    warning: CSV row 172192 field splitVote has unexpected value '-99'
    warning: CSV row 172192 field justice has unexpected value '-99'
    warning: CSV row 172192 field justiceName has unexpected value '-99'
    warning: CSV row 172193 field splitVote has unexpected value '-99'
    warning: CSV row 172193 field justice has unexpected value '-99'
    warning: CSV row 172193 field justiceName has unexpected value '-99'
    warning: CSV row 172194 field splitVote has unexpected value '-99'
    warning: CSV row 172194 field justice has unexpected value '-99'
    warning: CSV row 172194 field justiceName has unexpected value '-99'
    warning: CSV row 172195 field splitVote has unexpected value '-99'
    warning: CSV row 172195 field justice has unexpected value '-99'
    warning: CSV row 172195 field justiceName has unexpected value '-99'
    warning: CSV row 172196 field splitVote has unexpected value '-99'
    warning: CSV row 172196 field justice has unexpected value '-99'
    warning: CSV row 172196 field justiceName has unexpected value '-99'
    warning: CSV row 172197 field splitVote has unexpected value '-99'
    warning: CSV row 172197 field justice has unexpected value '-99'
    warning: CSV row 172197 field justiceName has unexpected value '-99'
    warning: CSV row 172198 field splitVote has unexpected value '-99'
    warning: CSV row 172198 field justice has unexpected value '-99'
    warning: CSV row 172198 field justiceName has unexpected value '-99'
    warning: CSV row 172199 field splitVote has unexpected value '-99'
    warning: CSV row 172199 field justice has unexpected value '-99'
    warning: CSV row 172199 field justiceName has unexpected value '-99'
    warning: CSV row 172200 field splitVote has unexpected value '-99'
    warning: CSV row 172200 field justice has unexpected value '-99'
    warning: CSV row 172200 field justiceName has unexpected value '-99'
    warning: CSV row 172201 field splitVote has unexpected value '-99'
    warning: CSV row 172201 field justice has unexpected value '-99'
    warning: CSV row 172201 field justiceName has unexpected value '-99'
    warning: CSV row 172202 field splitVote has unexpected value '-99'
    warning: CSV row 172202 field justice has unexpected value '-99'
    warning: CSV row 172202 field justiceName has unexpected value '-99'
    warning: CSV row 172203 field splitVote has unexpected value '-99'
    warning: CSV row 172203 field justice has unexpected value '-99'
    warning: CSV row 172203 field justiceName has unexpected value '-99'
    warning: CSV row 172204 field splitVote has unexpected value '-99'
    warning: CSV row 172204 field justice has unexpected value '-99'
    warning: CSV row 172204 field justiceName has unexpected value '-99'
    warning: CSV row 172205 field splitVote has unexpected value '-99'
    warning: CSV row 172205 field justice has unexpected value '-99'
    warning: CSV row 172205 field justiceName has unexpected value '-99'
    warning: CSV row 172206 field splitVote has unexpected value '-99'
    warning: CSV row 172206 field justice has unexpected value '-99'
    warning: CSV row 172206 field justiceName has unexpected value '-99'
    warning: CSV row 172207 field splitVote has unexpected value '-99'
    warning: CSV row 172207 field justice has unexpected value '-99'
    warning: CSV row 172207 field justiceName has unexpected value '-99'
    warning: CSV row 172208 field splitVote has unexpected value '-99'
    warning: CSV row 172208 field justice has unexpected value '-99'
    warning: CSV row 172208 field justiceName has unexpected value '-99'
    warning: CSV row 172209 field splitVote has unexpected value '-99'
    warning: CSV row 172209 field justice has unexpected value '-99'
    warning: CSV row 172209 field justiceName has unexpected value '-99'
    warning: CSV row 172210 field splitVote has unexpected value '-99'
    warning: CSV row 172210 field justice has unexpected value '-99'
    warning: CSV row 172210 field justiceName has unexpected value '-99'
    warning: CSV row 172211 field splitVote has unexpected value '-99'
    warning: CSV row 172211 field justice has unexpected value '-99'
    warning: CSV row 172211 field justiceName has unexpected value '-99'
    warning: CSV row 172212 field splitVote has unexpected value '-99'
    warning: CSV row 172212 field justice has unexpected value '-99'
    warning: CSV row 172212 field justiceName has unexpected value '-99'
    warning: CSV row 172213 field splitVote has unexpected value '-99'
    warning: CSV row 172213 field justice has unexpected value '-99'
    warning: CSV row 172213 field justiceName has unexpected value '-99'
    warning: CSV row 172214 field splitVote has unexpected value '-99'
    warning: CSV row 172214 field justice has unexpected value '-99'
    warning: CSV row 172214 field justiceName has unexpected value '-99'
    warning: record 1982-092-01-01-01-01 field caseOrigin has unexpected value '154'
    warning: record 1982-092-01-01-01-02 field caseOrigin has unexpected value '154'
    warning: record 1982-092-01-01-01-03 field caseOrigin has unexpected value '154'
    warning: record 1982-092-01-01-01-04 field caseOrigin has unexpected value '154'
    warning: record 1982-092-01-01-01-05 field caseOrigin has unexpected value '154'
    warning: record 1982-092-01-01-01-06 field caseOrigin has unexpected value '154'
    warning: record 1982-092-01-01-01-07 field caseOrigin has unexpected value '154'
    warning: record 1982-092-01-01-01-08 field caseOrigin has unexpected value '154'
    warning: record 1982-092-01-01-01-09 field caseOrigin has unexpected value '154'
    warning: record 1988-038-01-01-01-01 field caseOrigin has unexpected value '156'
    warning: record 1988-038-01-01-01-02 field caseOrigin has unexpected value '156'
    warning: record 1988-038-01-01-01-03 field caseOrigin has unexpected value '156'
    warning: record 1988-038-01-01-01-04 field caseOrigin has unexpected value '156'
    warning: record 1988-038-01-01-01-05 field caseOrigin has unexpected value '156'
    warning: record 1988-038-01-01-01-06 field caseOrigin has unexpected value '156'
    warning: record 1988-038-01-01-01-07 field caseOrigin has unexpected value '156'
    warning: record 1988-038-01-01-01-08 field caseOrigin has unexpected value '156'
    warning: record 1988-038-01-01-01-09 field caseOrigin has unexpected value '156'
    warning: record 1994-049-01-01-01-01 field caseOrigin has unexpected value '156'
    warning: record 1994-049-01-01-01-02 field caseOrigin has unexpected value '156'
    warning: record 1994-049-01-01-01-03 field caseOrigin has unexpected value '156'
    warning: record 1994-049-01-01-01-04 field caseOrigin has unexpected value '156'
    warning: record 1994-049-01-01-01-05 field caseOrigin has unexpected value '156'
    warning: record 1994-049-01-01-01-06 field caseOrigin has unexpected value '156'
    warning: record 1994-049-01-01-01-07 field caseOrigin has unexpected value '156'
    warning: record 1994-049-01-01-01-08 field caseOrigin has unexpected value '156'
    warning: record 1994-049-01-01-01-09 field caseOrigin has unexpected value '156'
    warning: record 2001-002-01-01-01-01 field caseOrigin has unexpected value '156'
    warning: record 2001-002-01-01-01-02 field caseOrigin has unexpected value '156'
    warning: record 2001-002-01-01-01-03 field caseOrigin has unexpected value '156'
    warning: record 2001-002-01-01-01-04 field caseOrigin has unexpected value '156'
    warning: record 2001-002-01-01-01-05 field caseOrigin has unexpected value '156'
    warning: record 2001-002-01-01-01-06 field caseOrigin has unexpected value '156'
    warning: record 2001-002-01-01-01-07 field caseOrigin has unexpected value '156'
    warning: record 2001-002-01-01-01-08 field caseOrigin has unexpected value '156'
    warning: record 2001-002-01-01-01-09 field caseOrigin has unexpected value '156'
    warning: record 2001-008-01-01-01-01 field caseOrigin has unexpected value '157'
    warning: record 2001-008-01-01-01-02 field caseOrigin has unexpected value '157'
    warning: record 2001-008-01-01-01-03 field caseOrigin has unexpected value '157'
    warning: record 2001-008-01-01-01-04 field caseOrigin has unexpected value '157'
    warning: record 2001-008-01-01-01-05 field caseOrigin has unexpected value '157'
    warning: record 2001-008-01-01-01-06 field caseOrigin has unexpected value '157'
    warning: record 2001-008-01-01-01-07 field caseOrigin has unexpected value '157'
    warning: record 2001-008-01-01-01-08 field caseOrigin has unexpected value '157'
    warning: record 2001-008-01-01-01-09 field caseOrigin has unexpected value '157'
    warning: record 2001-022-01-01-01-01 field caseOrigin has unexpected value '161'
    warning: record 2001-022-01-01-01-02 field caseOrigin has unexpected value '161'
    warning: record 2001-022-01-01-01-03 field caseOrigin has unexpected value '161'
    warning: record 2001-022-01-01-01-04 field caseOrigin has unexpected value '161'
    warning: record 2001-022-01-01-01-05 field caseOrigin has unexpected value '161'
    warning: record 2001-022-01-01-01-06 field caseOrigin has unexpected value '161'
    warning: record 2001-022-01-01-01-07 field caseOrigin has unexpected value '161'
    warning: record 2001-022-01-01-01-08 field caseOrigin has unexpected value '161'
    warning: record 2001-022-01-01-01-09 field caseOrigin has unexpected value '161'
    warning: record 2005-004-01-01-01-01 field caseOrigin has unexpected value '158'
    warning: record 2005-004-01-01-01-02 field caseOrigin has unexpected value '158'
    warning: record 2005-004-01-01-01-03 field caseOrigin has unexpected value '158'
    warning: record 2005-004-01-01-01-04 field caseOrigin has unexpected value '158'
    warning: record 2005-004-01-01-01-05 field caseOrigin has unexpected value '158'
    warning: record 2005-004-01-01-01-06 field caseOrigin has unexpected value '158'
    warning: record 2005-004-01-01-01-07 field caseOrigin has unexpected value '158'
    warning: record 2005-004-01-01-01-08 field caseOrigin has unexpected value '158'
    warning: record 2005-004-01-01-01-09 field caseOrigin has unexpected value '158'

In addition, there is one SCDB variable, [lawMinor](http://scdb.wustl.edu/documentation.php?var=lawMinor)
that's a free-form string, so we modified the script to generate a complete list of all current
*lawMinor* values and then stored them back into the list of [SCDB Variables](/sources/scdb/vars.json).

This revealed that the *lawMinor* field is quite a mess.  Here's a small subset of the values,
to give you a sense of the problems:

    "unidentifed act of congress",
    "unidentifed act of congress, 1828",
    "unidentifiable",
    "unidentified",
    "unidentified 1807 act of congress",
    "unidentified act of congeress",
    "unidentified act of congress",
    "unidentified act of Congress of 1824",
    "unidentified act of congress, 1824, sec. 32",
    "unidentified acts of congress",
    "unidentified federal statute",
    "unidentified law",
    "unidentified patent law, sec. 15",
    "unidentified RS",
    "unidentified sdtatute",
    "unidentified statute",
    "unidentified US laws",
    "unidentified US statute",
    "Uniformed Services Former Spouses' Protection Act 10 U.S.C. 1408",
    "unknown",
    "unpaid opium tax",
    "unrestricted sale of allotments",
    "unspecified",
    "UNSPECIFIED",
    "unspecified act of congress",

There are *lots* of duplicate values, varying only in form, not in substance, not to mention *lots* of typos.

More worrisome are all the discrepancies we found in SCBD's decision dates.  SCDB
[claims](http://scdb.wustl.edu/documentation.php?var=dateDecision) that:

> For volumes 2-107 of the U.S. Reports (1791-1882), we relied on [Dates of Supreme Court Decisions and Arguments](http://www.supremecourt.gov/opinions/datesofdecisions.pdf), prepared by Anne Ashmore of the Library of the Supreme Court,
because many early reporters do not list the date of decision.

but if they did, they appear to have made a lot of [mistakes](/tests/validation.txt).  We will be relying on
[our own import](https://github.com/jeffpar/lonedissent/blob/master/sources/scotus/decisionDates.csv) of SCOTUS
decision dates until this gets resolved.

We've also uncovered quite a few cases where SCDB's decision date puts a case squarely in one [Natural Court](http://scdb.wustl.edu/documentation.php?var=naturalCourt) and yet the case is assigned to a *different* Natural Court.

In some cases, this is because the dates assigned to the Natural Court are incorrect, so we've
started [making corrections](https://github.com/jeffpar/lonedissent/commit/b7c86a71ee57aa59899ccda54a20af592c577c9c#diff-9525524c4cf4c9714fb0ecccf927eb09)
to our copy of SCDB's Natural Court data.

For example, they indicate that the final Warren Court ended on June 22, 1969 and the first Burger Court began the next day,
on June 23, 1969.  However, several decisions were handed down on June 23, 1969, which could only have been Warren Court decisions.

These and many other inconsistencies are being [logged](/tests/validation.txt) in the Lone Dissent project, which will hopefully get
resolved over time.
