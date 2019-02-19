---
title: "SCDB: How Do I Love Thee?"
permalink: /blog/2019/02/18/
---

The [Supreme Court Database](http://scdb.wustl.edu/index.php), aka SCDB, is a enormously valuable resource.  Other
[sites](https://www.courtlistener.com/coverage/) have even referred to it as "the gold standard for high-quality legal information."  It owes much of its reputation to Harold Spaeth, a political science professor who created
"[The Original U.S. Supreme Court Judicial Database (nickname: ALLCOURT)](http://artsandsciences.sc.edu/poli/juri/sct.htm)"
decades ago, and worked with the SCDB folks to help produce the modern version.  Sadly, Harold passed away in 2017.

So, regarding the SCDB: does it really meet the gold standard?  I would certainly concede bronze or silver status perhaps, but not gold.  And this is not because I think there's another, better, or more deserving database out there.  I simply feel that the **Gold Standard** should be reserved for a database that is not only without peer, but also flawless.  And at the moment, the SCDB is far from flawless.

## Let Me Count The Ways

### 1. Docket Numbers

Here are some examples of SCDB docket numbers for [Original Jurisdiction](https://en.wikipedia.org/wiki/Original_jurisdiction_of_the_Supreme_Court_of_the_United_States) cases:

    "5, Orig."
    "126, ORIG."
    "10 Original"
    "8 (Original)"
    "15 orig."
    "6 ORIG"
    "8 original"
    "ORIG" and "   ORIG"
    "15 ORIG ORIG" (just to be sure?)
    "No. 12, Original"
    "No. 137, Orig."
    "22O142"

Yes, the human eye can easily discern that these are all original jurisdiction docket numbers, but databases
are designed to be consumed by computers, not humans, and one of the presumptions for *any* database is well-defined
and strictly-adhered-to data formats.  Even after consulting SCDB's online codebook regarding the [docket](http://scdb.wustl.edu/documentation.php?var=docket) field, this is all we're told about such docket numbers:

> Cases invoking the Court's original jurisdiction have a number followed by the abbreviation, "Orig."

Well, apparently, there's more to it than that.

There's also a small problem with "Miscellaneous" cases; SCDB usually appends a single letter ("M") to the docket number,
but sometimes there's a space (eg, "61 M") and sometimes not (eg, "133M").

### 2. Consolidated Cases

The U.S. Supreme Court often "consolidates" multiple cases from lower courts into a single case.  For
example, the docket number of the "lead" case in [McConnell v. Federal Election Commission (540 U.S. 93)](https://cdn.loc.gov/service/ll/usrep/usrep540/usrep540093/usrep540093.pdf) is 02-1674.  However, the complete list of consolidated cases, by docket number, looks like this:

    02-1674,02-1675,02-1676,02-1702,02-1727,02-1733,02-1734,02-1740,02-1747,02-1753,02-1755,02-1756

and if you download SCDB's "[Cases Organized by Docket](http://scdb.wustl.edu/_brickFiles/2018_02/SCDB_2018_02_caseCentered_Docket.csv.zip)" and search for **540 U.S. 93**, you will indeed see all 12 cases listed.

So what's the problem?  Consolidated cases are not *consistently* included.

For example, look at [East Texas Motor Freight System, Inc. v. Rodriguez (431 U.S. 395)](https://cdn.loc.gov/service/ll/usrep/usrep431/usrep431395/usrep431395.pdf).  Three cases were consolidated:

    75-718,75-651,75-715

but even when using SCDB's "Cases Organized by Docket" files, all you'll find is 75-718.

There may be some rationale at work here.  For example, it's possible that the disposition of the "non-lead" cases did not differ in any material way from the "lead" case, so the other cases were deemed superfluous.  But there are numerous examples where the exact opposite is true (i.e., all consolidated cases recorded even when they all had the same disposition), so that would be a rationale of convenience rather than of principle.

The SCDB website simply says:

> Multiple docket numbers under a single case citation almost always contain the same issue as the lead case and differ only in the parties to the case and its origin and source.

And this isn't a trivial problem.  When you look for the transcript in the [East Texas Motor Freight System](https://cdn.loc.gov/service/ll/usrep/usrep431/usrep431395/usrep431395.pdf) on the [Supreme Court's](https://www.supremecourt.gov/oral_arguments/archived_transcripts/1976) website, it's *only* listed as [Teamsters v. Rodriguez, No. 75-651](https://www.supremecourt.gov/pdfs/transcripts/1976/75-651_75-715_75-718_01-10-1977.pdf).  Not as 75-715 or 75-718, but as 75-651 -- a docket number which you will *not* find in the SCDB.

### 3. Decision Dates

For a case's [Date of Decision](http://scdb.wustl.edu/documentation.php?var=dateDecision), the SCDB online codebook says:

> This variable contains the year, month, and day that the Court announced its decision in the case. For volumes 2-107 of the U.S. Reports (1791-1882), we relied on [Dates of Supreme Court Decisions and Arguments](http://www.supremecourt.gov/opinions/datesofdecisions.pdf), prepared by Anne Ashmore of the Library of the Supreme Court, because many early reporters do not list the date of decision.

Importing dates from a Supreme Court document should have been an error-free process, yet it wasn't.
Take the case of [United States v. McDowell (8 U.S. 316)](https://cdn.loc.gov/service/ll/usrep/usrep008/usrep008316/usrep008316.pdf).  SCDB claims it was decided on March 7, 1807, but the Supreme Court's "Dates of Supreme Court Decisions and Arguments" document -- which SCDB says it relied upon -- indicates March 7, 1808.  I have found dozens of
similar mistakes.

And these kinds of mistakes aren't just limited to those older cases.  Look at [Perry v. Leeke (488 U.S. 272)](https://cdn.loc.gov/service/ll/usrep/usrep488/usrep488272/usrep488272.pdf).  It was decided January 10, 1989, but SCDB lists the decision date as "1/1/1989".

There is also another, subtler problem with cases listed in the "Dates of Supreme Court Decisions and Arguments" document:
the decision date of a number of cases could not be precisely identified, even by the Supreme Court's librarian, so only
the date of the term was listed.  This occurred, for example, in [Welsh v. Mandeville (9 U.S. 321)](https://cdn.loc.gov/service/ll/usrep/usrep009/usrep009321/usrep009321.pdf), where the decision date was listed as "Feb. term 1809".

Unfortunately, SCDB appears to have morphed such dates into the first day of the first month of the term, resulting in a date (e.g., February 1, 1809) that appears to be precise but is almost certainly incorrect.

NOTE: As a public service, I have extracted all the decision dates *and* argument dates from the Supreme Court's
[Dates of Supreme Court Decisions and Arguments](/sources/scotus/dates/decisionDates.pdf) and produced
an easy-to-use [CSV file](/results/dates.csv).  I recommend using this file instead of the one on the
[Free Law](https://free.law/2011/05/25/updated-supreme-court-case-dates-and-the-first-release-of-early-scotus-data-in-machine-readable-form/) website,
because the last time I checked, the dates in their file were badly scrambled, and it didn't include any argument dates.
The dates on the first few lines of their file:

    2 U.S. 401|West v. Barnes|2|401|1791-08-17
    2 U.S. 401|Vanstophorst v. Maryland|2|401|1791-08-17
    2 U.S. 401|Oswald v. New York|2|401|1792-02-14
    ...

clearly do not match those provided in the Court's [PDF](/sources/scotus/dates/decisionDates.pdf).

### 4. Argument and Reargument Dates

Some cases are argued over a period of multiple days (and not necessarily consecutive days).  An early example of
this is [Talbot v. Janson (3 U.S. 133)](https://cdn.loc.gov/service/ll/usrep/usrep003/usrep003133/usrep003133.pdf),
which was argued over the course of ten days:

    Thursday, August 6, 1795
    Friday, August 7, 1795
    Saturday, August 8, 1795
    Monday, August 10, 1795
    Tuesday, August 11, 1795
    Wednesday, August 12, 1795
    Thursday, August 13, 1795
    Friday, August 14, 1795
    Tuesday, August 18, 1795
    Wednesday, August 19, 1795

This also occurs with some regularity in the "modern" era.
See [American Trucking Assns., Inc. v. Atchison, T. &amp; S. F. R. Co. (387 U.S. 397)](https://cdn.loc.gov/service/ll/usrep/usrep387/usrep387397/usrep387397.pdf), which was argued:

    Thursday, April 13, 1967
    Monday, April 17, 1967

However, recording all the dates of an oral argument (or even just the *number* of argument days) didn't seem to
interest Harold Spaeth much, because his "ALLCOURT" database (SCDB's predecessor) provided only an `ORAL` field
for the first date of argument.

Despite my best efforts ten years ago to convince SCDB to consider broader research interests and to at
least *enable* the coding of all argument dates for a case, all they did was rename Spaeth's variable to
[dateArgument](http://scdb.wustl.edu/documentation.php?var=dateArgument) and continue the old practice,
without justification:

> On some occasions, oral argument extended over more than a single day. In such cases, only the first date is specified.

NOTE: For the record, SCDB incorrectly reports that [387 U.S. 397](https://cdn.loc.gov/service/ll/usrep/usrep387/usrep387397/usrep387397.pdf) was argued on March 13, 1967, so we have more than a completeness problem -- we have
the usual accuracy problems as well.

Finally, there's the problem of multiple rearguments.  Once again, the Spaeth "ALLCOURT" database dealt with this,
but in the same limited fashion, by providing a single `REORAL` field, and SCDB followed suit with its
[dateRearg](http://scdb.wustl.edu/documentation.php?var=dateRearg) variable:

> On those infrequent occasions when the Court orders that a case be reargued, this variable specifies the date of such argument following the same day, month, and year sequence used in the preceding variable (dateArgue).

The limitation here is even worse than before, because not only can a reargument span multiple days, but there can
also be *multiple* rearguments.  Take a look at [Boyle v. Landry (401 U.S. 77)](https://cdn.loc.gov/service/ll/usrep/usrep401/usrep401077/usrep401077.pdf).  The second reargument on November 16, 1970 is nowhere to be found in SCDB.

### 5. Natural Courts

A [Natural Court](http://scdb.wustl.edu/documentation.php?var=naturalCourt), as the SCDB online codebook explains, is:

> [A] period during which no personnel change occurs.  Scholars have subdivided them into
"strong" and "weak" natural courts, but no convention exists as to the dates on which they
begin and end. Options include 1) date of confirmation, 2) date of seating, 3) cases decided
after seating, and 4) cases argued and decided after seating. A strong natural court is
delineated by the addition of a new justice or the departure of an incumbent. A weak natural
court, by comparison, is any group of sitting justices even if lengthy vacancies occurred. 

Although one could quibble with the SCDB's natural court definitions (which I'm sometimes tempted to do), the larger problem
is the accuracy of the dates for the courts that SCDB has chosen.

For example, it lists the transition between the Warren and Burger courts like so:

    1411	Warren 11	May 14, 1969 - June 22, 1969
    1501	Burger 1	June 23, 1969 - June 08, 1970

However, SCDB also lists a series of decisions handed down on June 23, 1969:

    1969-06-23: North Carolina v. Pearce [413,418] (395 U.S. 711)
    1969-06-23: Chimel v. California [770] (395 U.S. 752)
    1969-06-23: Benton v. Maryland [201] (395 U.S. 784)
    1969-06-23: Von Cleef v. New Jersey [837] (395 U.S. 814)
    1969-06-23: Shipley v. California [540 Misc.] (395 U.S. 818)
    1969-06-23: Moya v. DeBaca [996 Misc.] (395 U.S. 825)

And while it would be very impressive for the Court to hand down *six* decisions on the *first* day under a new
Chief Justice, the reality is that June 23, not June 22, was Chief Justice Earl Warren's last day.

And this mistake with the "Warren 11" court isn't an isolated "one-off".  There are similar problems with
the "Warren 4", "Warren 5", "Warren 6", and "Warren 7" courts, not to mention "Stone 2" or "Rehnquist 1",
among others.

And this isn't merely a problem with the natural court dates.  Numerous cases are filed under one natural court
even though they were decided under another.

Look at [Braverman v. United States (317 U.S. 49)](https://cdn.loc.gov/service/ll/usrep/usrep317/usrep317049/usrep317049.pdf).  It was argued on October 21, 1942 and decided on November 9, 1942, which would put it squarely
in SCDB's "Stone 1" natural court.  But it's coded in SCDB as being in the "Stone 2" (1202) natural court.

### 6. Terms

How SCDB defines the [Term](http://scdb.wustl.edu/documentation.php?var=term) in which a case was decided is
problematic: it uses a simple number (a year), which is insufficient to properly identify the *actual* term
in which a case was decided.

Specifically, until 1802, there were *two* terms per year.  This is why my project has adopted a string
format for Supreme Court terms ("YYYY-MM") rather than an ambiguous numeric format (YYYY).

The ambiguity didn't stop in 1802, either.  In 1844, there were two terms as well, because after the normal
January 1844 term began, the Act of June 1844 changed the start of subsequent terms to December.  Apparently out
of habit, the Court still called these terms "January Terms", but that didn't change the fact that, beginning
in December 1844, the Court started churning out new opinions.

SCDB, on the other hand, ignores the actual dates that the Court operated, and instead pretends that the Court's
work started every January -- up until 1850, when the Court finally decided to change what it called the terms.
As a result, SCDB implies there two terms in 1850, when in fact, there were not.

SCDB apologists will argue that, as long as the ambiguity of the **Term** variable is properly documented,
researchers can work around its limitations by also examining the **dateDecision** variable and checking for
all the above conditions.  Of course, the logical extension of that argument would be to eliminate the **Term**
variable entirely, because obviously the precise term of *any* case can be determined by applying a complicated
set of rules to **dateDecision**.

Harold Spaeth's `TERM` variable didn't suffer from this abiguity, because his "ALLCOURT" database didn't deal
with cases before the Warren Court.  SCDB didn't fully consider the impact of older cases on its new design,
but it's never too late to fix problems like this.  Instead of making excuses or after-the-fact justifications,
SCDB's design should simply acknowledge problems, improve and evolve the database, define new variables that
solve those problems, and deprecate old problematic variables.

### 7. Undocumented Values

As I've [previously documented](/blog/2018/12/21/), there are some variables, such as [caseOrigin](http://scdb.wustl.edu/documentation.php?var=caseOrigin) containing undocumented values (e.g., 157, 158, 161, etc.)

And then there's [lawMinor](http://scdb.wustl.edu/documentation.php?var=lawMinor), a free-form string that has
become very problematic.  Here's a small subset of the values, to give you a sense of the problems:

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

There are *lots* of duplicate values, varying only in form, not in substance, as well as *lots* of typos.

### 8. Missing Cases

When cross-referencing the cases in SCDB with other reputable sources (eg, data extracted from the Supreme Court's
Case Citation Finder), I've also come across a number of cases which, even though they were considered "cite-worthy",
do not appear in SCDB.

I've logged some of those instances on my website (e.g., [missing cases](/logs/missingCases.csv) and [unknown citations](/logs/unknownCitations.csv)).  I realize there are many "back of the book" cases that don't merit attention
(e.g. denials of cert), but that's not true in *all* such cases, so perhaps SCDB should consider creating a second
much simpler table of cases that cites all the cases it has deliberately omitted.

## Epilogue

I long ago advocated for greater transparency in what SCDB chooses to add or correct in its database, including
change logs with every release.  These days, an even better step forward for SCDB would be to do what I've done here,
which is to create an open-source repository containing copies of all the data sources being used, along with the
scripts used to process them.

I think if SCDB really wants to be a Gold Standard, then it should stop being a siloed operation, performing all its
updates behind a veil of secrecy, and making the world wait with bated breath for each new release.  As an academic
endeavour, more knowledge -- not less -- should be one of the goals, as well as encouraging cooperation and participation
among all interested parties.

Or, SCDB can quietly extract whatever it wants here, without telling me or anyone else, and then roll out its next release with the usual (and completely useless) notation: `minor corrections`.  And neither I nor anyone else will have any
incentive to help again.
