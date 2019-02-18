---
title: "How Do I Love Thee?"
permalink: /blog/2019/02/18/
---

The [Supreme Court Database](http://scdb.wustl.edu/index.php), aka SCDB, is a enormously valuable resource.  Other
[sites](https://www.courtlistener.com/coverage/) have even referred to it as "the gold standard for high-quality legal information."  It owes much of its reputation to Harold Spaeth, a political science professor who created
"[The Original U.S. Supreme Court Judicial Database (nickname: ALLCOURT)](http://artsandsciences.sc.edu/poli/juri/sct.htm)"
decades ago, and worked with the SCDB folks to help produce the modern version.  Sadly, Harold passed away in 2017.

So, regarding the SCDB: does it really meet the gold standard?  I would certainly concede bronze or silver status perhaps, but not gold.  And this is not because I think there's another, better, or more deserving database out there.  I simply feel that the **Gold Standard** should be reserved for a database that is not only without peer, but also flawless.  And at the moment, the SCDB is far from flawless.

## Let Me Count The Ways

### 1. The Coding of Docket Numbers

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

The U.S. Supreme Court often "consolidates" multiple cases from lower cases into a single case.  For
example, the docket number of the "lead" case in [McConnell v. Federal Election Commission (540 U.S. 93)](https://cdn.loc.gov/service/ll/usrep/usrep540/usrep540093/usrep540093.pdf) is 02-1674.  However, the complete list of consolidated cases, by docket number, looks like this:

    02-1674,02-1675,02-1676,02-1702,02-1727,02-1733,02-1734,02-1740,02-1747,02-1753,02-1755,02-1756

and if you download SCDB's "[Cases Organized by Docket](http://scdb.wustl.edu/_brickFiles/2018_02/SCDB_2018_02_caseCentered_Docket.csv.zip)" and search for **540 U.S. 93**, you will indeed see all 12 cases listed.

So what's the problem?  Consolidated cases are not *consistently* included.

For example, look at [East Texas Motor Freight System, Inc. v. Rodriguez (431 U.S. 395)](https://cdn.loc.gov/service/ll/usrep/usrep431/usrep431395/usrep431395.pdf).  Three cases were consolidated:

    75-718,75-651,75-715

but even when using SCDB's "Cases Organized by Docket" files, all you'll find is 75-718.

There may be some rationale at work here.  For example, it's possible that the disposition of the "non-lead" cases did not differ in any material way from the "lead" case, so the other cases were deemed superfluous.  But there are almost certainly numerous examples where the exact opposite is true (i.e., all consolidated cases recorded even when they all had the same disposition), so that would be a rationale of convenience rather than of principle.

The SCDB website simply says:

> Multiple docket numbers under a single case citation almost always contain the same issue as the lead case and differ only in the parties to the case and its origin and source.

And this isn't a trivial problem.  When you look for the transcript in the [East Texas Motor Freight System](https://cdn.loc.gov/service/ll/usrep/usrep431/usrep431395/usrep431395.pdf) on the [Supreme Court's](https://www.supremecourt.gov/oral_arguments/archived_transcripts/1976) website, it's *only* listed as [Teamsters v. Rodriguez, No. 75-651](https://www.supremecourt.gov/pdfs/transcripts/1976/75-651_75-715_75-718_01-10-1977.pdf).  Not as 75-715 or 75-718, but as 75-651 -- a docket number which you will *not* find in the SCDB.

### 3. Dates of Decisions

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

### 4. Natural Courts

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

However, SCDB also lists four decisions being handed down on June 23, 1969:

    1969-06-23: North Carolina v. Pearce [413,418] (395 U.S. 711)
    1969-06-23: Chimel v. California [770] (395 U.S. 752)
    1969-06-23: Benton v. Maryland [201] (395 U.S. 784)
    1969-06-23: Von Cleef v. New Jersey [837] (395 U.S. 814)
    1969-06-23: Shipley v. California [540 Misc.] (395 U.S. 818)
    1969-06-23: Moya v. DeBaca [996 Misc.] (395 U.S. 825)

And while it would be very impressive for the Court to hand down *four* decisions on the *first* day under a new
Chief Justice, the reality is that June 23, not June 22, was Chief Justice Earl Warren's last day.

And while it would be easy to write off this mistake with the "Warren 11" court as an isolated "one-off",
that would be ignoring similar problems with the "Warren 4", "Warren 5", "Warren 6", and "Warren 7" courts,
not to mention "Stone 2" or "Rehnquist 1", among others.

And is this simply a problem with the natural court dates?  No.  Numerous cases are filed under one natural court
even though they were decided under another.

Look at [Braverman v. United States (317 U.S. 49)](https://cdn.loc.gov/service/ll/usrep/usrep317/usrep317049/usrep317049.pdf).  It was argued on October 21, 1942 and decided on November 9, 1942, which would put it squarely
in SCDB's "Stone 1" natural court.  But it's coded in SCDB as being in the "Stone 2" (1202) natural court.

## 5. Terms

How SCDB defines the [Term](http://scdb.wustl.edu/documentation.php?var=term) in which a case was decided is
problematic.  The biggest problem is that it uses a simple number (a year), which is insufficient to properly
identify which *actual* term a case was decided.

Specifically, until 1802, there were *two* terms per year.  This is why my project has adopted a string
format for Supreme Court terms ("YYYY-MM") rather than an ambiguous numeric format (YYYY).

The ambiguity didn't stop in 1802, either.  In 1844, there were two terms as well, because after the normal
January 1844 term began, the Act of June 1844 changed the start of subsequent terms to December.  Apparently out
of habit, the Court still called these terms "January Terms", but that didn't change the fact that, beginning
in December 1844, the Court started churning out new opinions.

SCDB, on the other hand, ignores the actual dates that the Court operated, and instead pretends that the Court's
work started every January -- up until 1850, when the Court finally decided to change what it called the terms.
As a result, SCDB implies there two terms in 1850, when in fact, there were not.  This is my understanding, at
any rate.

## 6. Undocumented Values

As I've [previously documented](/blog/2018/12/21/), there are some variables, such as [caseOrigin](http://scdb.wustl.edu/documentation.php?var=caseOrigin) containing undocumented values (e.g., 157, 158, 161, etc.)

And then there's [lawMinor](http://scdb.wustl.edu/documentation.php?var=lawMinor), which is a free-form string
that has accumulated lots of redundant and/or duplicated values, due to typos, inconsistent coding, or lack
of clear guidelines.  Here's a small subset of the values, to give you a sense of the problems:

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

## 7. Missing Cases

When cross-referencing the cases in SCDB with other reputable sources (eg, data extracted from the Supreme Court's
Case Citation Finder), I've also come across a number of cases which, even though they were considered "cite-worthy",
do not appear in SCDB.

I've logged some of those instances on my website (e.g., [missing cases](/logs/missingCases.csv) and [unknown citations](/logs/unknownCitations.csv)).

---

That's all for now!
