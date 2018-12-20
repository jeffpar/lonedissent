Welcome to Lone Dissent
=======================

This is a lonely work-in-progress.  A few data files have been created so far:

- [courts.json](data/courts.json)
- [decisions.json](data/decisions.json)
- [justices.json](data/justices.json)

in preparation for making this a more interesting website.  Most of the
[court](data/courts.json) and [justice](data/justices.json) data came from
[Oyez](https://www.oyez.org/), while all the [decision](data/decisions.json)
data was imported from the [Supreme Court Database](http://scdb.wustl.edu/index.php),
aka SCDB.

To make good use of raw SCDB data, you need tables that map all the numeric
codes to what they actually represent.  To that end, SCDB provides a
[Code Book](http://scdb.wustl.edu/_brickFiles/2018_02/SCDB_2018_02_codebook.pdf),
but PDFs are *not* particularly easy to parse.  The next best thing is their
[Online Code Book](http://scdb.wustl.edu/documentation.php),
but again, lots of work is required to turn all those HTML tables into something
your code can ingest.

So, we made [codes.json](data/scdb/codes.json).  Then we wrote a script that reads
every field of every record of [decisions.csv](data/scdb/decisions.csv) and verifies
that every value exists in [codes.json](data/scdb/codes.json).

The script revealed quite a few discrepancies:

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

In addition, there is one SCDB field, [lawMinor](http://scdb.wustl.edu/documentation.php?var=lawMinor)
that's a free-form string field, so we modified the script to generate a complete list of all current
*lawMinor* values and then stored them back into [codes.json](data/scdb/codes.json).

This revealed that the *lawMinor* field is a gigantic mess.  Here's a tiny subset of the values,
just to to give you some sense of the problems:

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
