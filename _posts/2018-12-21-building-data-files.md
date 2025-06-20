---
title: "Building Data Files"
permalink: /blog/2018/12/21/
---

In preparation for building this website, a few important data files were created first:

- [courts.json](https://github.com/jeffpar/lonedissent/blob/master/sources/ld/courts.json)
- [decisions.json](https://github.com/jeffpar/lonedissent/blob/master/sources/ld/decisions.json)
- [justices.json](https://github.com/jeffpar/lonedissent/blob/master/sources/ld/justices.json)
- [citations.csv](https://github.com/jeffpar/lonedissent/blob/master/sources/ld/citations.csv)
- [dates.csv](https://github.com/jeffpar/lonedissent/blob/master/sources/ld/dates.csv)
- [transcripts.csv](https://github.com/jeffpar/lonedissent/blob/master/sources/ld/transcripts.csv)

Most of our [Court](https://github.com/jeffpar/lonedissent/blob/master/sources/ld/courts.json)
and [Justice](https://github.com/jeffpar/lonedissent/blob/master/sources/ld/justices.json)
data came from [Oyez](https://www.oyez.org/), while most of the
[Decision](https://github.com/jeffpar/lonedissent/blob/master/sources/ld/decisions.json)
data was imported from [CSV files](https://github.com/jeffpar/lonedissent/tree/master/sources/scdb)
provided by the [Supreme Court Database](http://scdb.wustl.edu/index.php), aka SCDB[*](#citing-to-the-scdb).

Additionally, our [Citations](https://github.com/jeffpar/lonedissent/blob/master/sources/ld/citations.csv)
come from the Supreme Court's [Case Citation Finder](https://www.supremecourt.gov/opinions/casefinder.aspx),
including numerous corrections from [Citations](https://github.com/jeffpar/lonedissent/blob/master/sources/ld/citationsLOC.csv)
extracted from the [Library of Congress](https://www.loc.gov/collections/united-states-reports/?st=list),
and [Argument and Decision Dates](https://github.com/jeffpar/lonedissent/blob/master/sources/ld/dates.csv)
of early cases have been extracted from the Supreme Court Library document
"[DATES OF SUPREME COURT DECISIONS AND ARGUMENTS: UNITED STATES REPORTS VOLUMES 2 – 107 (1791 – 1882)](/sources/scotus/dates/SCOTUS_Dates_of_Decisions-2008-02-21.pdf)".

To make good use of the raw SCDB data, you need tables that map all the numeric
codes to what they actually represent.  To that end, SCDB provides a
[Code Book](http://scdb.wustl.edu/_brickFiles/2018_02/SCDB_2018_02_codebook.pdf),
but PDFs are *not* particularly easy to parse.  The next best thing is their
[Online Code Book](http://scdb.wustl.edu/documentation.php),
but again, lots of work is required to turn all those HTML tables into something
your code can ingest.

So, we built a collection of [SCDB Variables](/sources/scdb/vars.json).
Then we wrote a script that reads every field of every record of
[SCDB CSV Data](https://github.com/jeffpar/lonedissent/blob/master/sources/scdb/decisions.csv)
and verifies that every field's value exists in the [SCDB Variables](/sources/scdb/vars.json) collection.

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

More worrisome are all the decision date discrepancies we've found.
SCDB [claims](http://scdb.wustl.edu/documentation.php?var=dateDecision) that:

> For volumes 2-107 of the U.S. Reports (1791-1882), we relied on [Dates of Supreme Court Decisions and Arguments](http://www.supremecourt.gov/opinions/datesofdecisions.pdf), prepared by Anne Ashmore of the Library of the Supreme Court,
because many early reporters do not list the date of decision.

but if they did, they made a surprising number of [mistakes](https://github.com/jeffpar/lonedissent/blob/master/logs/changedDates.csv).
While some of the [warnings](https://github.com/jeffpar/lonedissent/blob/master/logs/fixDecisions.log) we automatically generate are not
necessarily errors, they may merit some attention.

For example, decisions handed down on a Saturday or Sunday are [unusual](https://github.com/jeffpar/lonedissent/blob/master/logs/unusualDates.csv),
especially in modern times.  Take this pair of warnings:

    warning: THE UNITED STATES v. M'DOWEL (8 U.S. 316) has decision date 1807-03-07 instead of SCOTUS date 1808-03-07
    warning: THE UNITED STATES v. M'DOWEL (8 U.S. 316) has unusual decision day: Saturday, March 7, 1807

The fact that an SCDB decision date falls on a Saturday *and* differs from the SCOTUS decision date strongly suggests
that the SCDB date is wrong.  We will be relying on [our own import](https://github.com/jeffpar/lonedissent/blob/master/sources/ld/dates.csv)
of SCOTUS decision dates until this gets resolved.

Our list of warnings also includes cases appearing in the SCOTUS [Dates of Decisions](/sources/scotus/dates/SCOTUS_Dates_of_Decisions-2008-02-21.pdf) document
that do *not* appear in SCDB.  These may be cases that were simply overlooked, or intentionally omitted, or which *are* in SCDB
but didn't match an entry in the SCOTUS document, either because of a date or citation discrepancy, or because of some ambiguity
(eg, when multiple cases are recorded on the same page and therefore have the same citation).

We've also uncovered quite a few cases where SCDB's decision date puts a case squarely in one [Natural Court](http://scdb.wustl.edu/documentation.php?var=naturalCourt) and yet the case is assigned to a *different* Natural Court.

In some cases, this is because the dates assigned to the Natural Court are incorrect, so we've
started [making corrections](https://github.com/jeffpar/lonedissent/commit/b7c86a71ee57aa59899ccda54a20af592c577c9c#diff-9525524c4cf4c9714fb0ecccf927eb09)
to our copy of SCDB's Natural Court data.

For example, they indicate that the final Warren Court ended on June 22, 1969 and the first Burger Court began the next day,
on June 23, 1969.  However, several decisions were handed down on June 23, 1969, which could only have been Warren Court decisions.

These and other inconsistencies, such as [missing cases](https://github.com/jeffpar/lonedissent/blob/master/logs/missingCases.csv)
and [unknown citations](https://github.com/jeffpar/lonedissent/blob/master/logs/unknownCitations.csv), are being
[logged](https://github.com/jeffpar/lonedissent/blob/master/logs/allDecisions.log) in the
[Lone Dissent Project](https://github.com/jeffpar/lonedissent), and hopefully they will be reconciled over time.
We also hope that, someday, SCDB adopts more transparency in its update procedures, so that when a correction is made,
both the change itself *and* the source of the data is recorded and shared.  This will help future researchers avoid
unreliable third-party data sources.

It is neither sufficient nor convenient to expect researchers to "diff" each release of SCDB with its predecessors to identify
corrections, additions, deletions, etc.  For example, how seriously should one take SCDB's claim of reliance on
[Dates of Supreme Court Decisions and Arguments](http://www.supremecourt.gov/opinions/datesofdecisions.pdf), given the number of
differences?  What accounts for those differences?  Were other, more trusted sources consulted and relied upon as well, or does
every difference simply represent a typo -- and if so, why are there so many typos in what should have been a straightforward import?

This reminds me of email conversations I had with Andrew D. Martin almost 10 years ago, when the SCDB was still in its infancy.

For example, on November 3, 2009, I had written to him:

    I just performed a quick comparison of 2009 Release 03 to Release 02
    and found 173 discrete differences (after removing all the differences
    due to the LED citation format change from "L. Ed. 2d." to "L. Ed. 2d").
    Of those 173, many were to fix the incorrect LED references to Vol 1.
    of L. Ed., leaving a handful of changes/corrections to assorted cases
    (eg, the voting data in 04-607).

    I would urge you to provide more detailed release notes for your quarterly
    releases, particularly if one of the goals of these major updates is to
    support methodical scholarly research.  The only release notes I could find
    for 2009 Release 03 said "Minor corrections".  That level of detail seems
    inadequate to me.  Even changes that seem relatively minor (eg, "L. Ed. 2d")
    are worth pointing out, since any change can cause unexpected side-effects.

His response:

    We appreciate this repeated suggestions ... and it's under consideration.
    However, our time and resources are quite limited, and repeatedly making the
    same request is, frankly, not helpful.  All versions of our binary data
    files are posted (something Harold was not doing with ALLCOURT) and you can
    perform the differentials just as well as we can.

    Best,
    ADM

It's a bit sad to see that, almost ten years later, there is still no transparency, and that the release notes
for SCDB's latest release ("2018 Release 02") still say nothing more than:

    Minor corrections

### Citing to the SCDB

Since we use the SCDB, we shall cite it.  In fact, we shall go one step better, and *recite* their
[instructions](http://supremecourtdatabase.org/documentation.php?var=cite) on how one should cite it:

> To cite to the Supreme Court Database, please employ either of the following:

    Harold J. Spaeth, Lee Epstein, Andrew D. Martin, Jeffrey A. Segal,
    Theodore J. Ruger, and Sara C. Benesh. 2018 Supreme Court Database,
    Version 2018 Release 02. URL: http://Supremecourtdatabase.org 

    Harold J. Spaeth, Lee Epstein, et al. 2018 Supreme Court Database,
    Version 2018 Release 2. URL: http://Supremecourtdatabase.org 

> Please be sure to include the specific Version Number; e.g., 'Version 2018 Release 02' in your citation
as this will indicate the particular version of the database being employed at the time of your reference.
This matter is of great importance as the database will be updated with newly announced decisions,
corrections, and the addition of new data for existing cases.

Note that indicating which release you are using is a matter "*of great importance*".
    
Which is puzzling, since SCDB consistently refuses to describe, list, or otherwise explain exactly how
any release differs from any other release.  The differences are invariably described as nothing more than
"minor corrections" -- which can't be right if they are also "of great importance".
