---
title: "SCDB: How Do I Love Thee?"
permalink: /blog/2019/02/18/
---

The [Supreme Court Database](http://scdb.wustl.edu/index.php), aka SCDB[*](#citing-to-the-scdb),
is a enormously valuable resource.  Other [sites](https://www.courtlistener.com/coverage/)
have even referred to it as "the gold standard for high-quality legal information."
It owes much of its reputation to Harold Spaeth, a political science professor who created
"[The Original U.S. Supreme Court Judicial Database (nickname: ALLCOURT)](http://artsandsciences.sc.edu/poli/juri/sct.htm)"
decades ago, and worked with the SCDB folks to help produce the modern version.
Sadly, Harold passed away in 2017.

So, regarding the SCDB: does it really meet the gold standard?  I would certainly concede bronze or silver status perhaps, but not gold.  And this is not because I think there's another, better, or more deserving database out there.  I simply feel that the **Gold Standard** should be reserved for a database that is not only without peer, but is also well-designed,
well-maintained, rigorously audited, and open-source, embracing transparency and community participation, and continuing
to evolve to solve old problems and new challenges.  At the moment, SCDB has lots of room for improvement.

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

And these kinds of mistakes aren't just limited to those older cases.  Look at [Perry v. Leeke (488 U.S. 272)](https://cdn.loc.gov/service/ll/usrep/usrep488/usrep488272/usrep488272.pdf).  It was decided January 10, 1989, but SCDB lists the decision date as "1/1/1989".  Even worse, SCDB lists the argument date for [Brown v. Board of Education (347 U.S. 483)](https://cdn.loc.gov/service/ll/usrep/usrep347/usrep347483/usrep347483.pdf) as "12/8/1952", but in fact, arguments began on December 9, 1952 and lasted three days.

There is also another, subtler problem with cases listed in the "Dates of Supreme Court Decisions and Arguments" document:
the decision date of a number of cases could not be precisely identified, even by the Supreme Court's librarian, so only
the date of the term was listed.  This occurred, for example, in [Welsh v. Mandeville (9 U.S. 321)](https://cdn.loc.gov/service/ll/usrep/usrep009/usrep009321/usrep009321.pdf), where the decision date was listed as "Feb. term 1809".

Unfortunately, SCDB appears to have morphed such dates into the first day of the first month of the term, resulting in a date (e.g., February 1, 1809) that appears to be precise but is almost certainly incorrect.

NOTE: As a public service, I have extracted all the decision dates *and* argument dates from the Supreme Court's
[Dates of Supreme Court Decisions and Arguments](/sources/scotus/dates/decisionDates.pdf) and produced an easy-to-use
[spreadsheet](https://github.com/jeffpar/lonedissent/blob/master/sources/ld/dates.csv).  I recommend using this file instead of the one on the
[Free Law](https://free.law/2011/05/25/updated-supreme-court-case-dates-and-the-first-release-of-early-scotus-data-in-machine-readable-form/) website,
because the last time I checked, the dates in their file were badly scrambled, and it didn't include any argument dates.
The dates on the first few lines of their file:

    2 U.S. 401|West v. Barnes|2|401|1791-08-17
    2 U.S. 401|Vanstophorst v. Maryland|2|401|1791-08-17
    2 U.S. 401|Oswald v. New York|2|401|1792-02-14
    ...

clearly do not match those provided in the Court's [PDF](/sources/scotus/dates/decisionDates.pdf).

Here's a list of all the corrections we've made to *dateDecision* in SCDB thus far, with links to the source material
used, so that they can all be verified.  This is a degree of transparency that you will not find on the SCDB website.

- Dewhurst v. Coulthard (3 U.S. 409): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1798-006-01) changed from Friday, February 1, 1799 to 1799-02 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- Blair v. Miller (4 U.S. 21): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1800-006-01) changed from Friday, August 1, 1800 to 1800-02 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- Talbot v. Ship Amelia (4 U.S. 34): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1801-002-01) changed from Saturday, August 15, 1801 to Friday, August 15, 1800 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- United States v. McDowell (8 U.S. 316): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1807-025-01) changed from Saturday, March 7, 1807 to Monday, March 7, 1808 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- Dawson's Lessee v. Godfrey (8 U.S. 321): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1807-039-01) changed from Sunday, March 15, 1807 to Tuesday, March 15, 1808 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- Welsh v. Mandeville (9 U.S. 321): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1808-009-01) changed from Wednesday, February 1, 1809 to 1809-02 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- Riddle &amp; Co. v. Mandeville (10 U.S. 86): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1809-046-01) changed from Thursday, February 1, 1810 to 1810-02 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- Ex parte Wilson (10 U.S. 52): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1809-045-01) changed from Thursday, February 1, 1810 to 1810-02 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- Hawthorne v. United States (11 U.S. 107): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1812-007-01) changed from Thursday, February 20, 1812 to 1812-02 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- Gracie v. Maryland Ins. Co. (12 U.S. 84): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1814-013-01) changed from Friday, February 25, 1814 to Saturday, February 19, 1814 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- The George (14 U.S. 408): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1815-041-01) changed from Saturday, March 23, 1816 to 1816-02 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- The Experiment (17 U.S. 84): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1819-001-01) changed from Monday, February 1, 1819 to 1819-02 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- Miller v. Kerr (20 U.S. 1): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1822-019-01) changed from Friday, March 15, 1822 to Thursday, March 15, 1821 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- The Antelope (23 U.S. 66): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1825-017-01) changed from Friday, March 25, 1825 to Tuesday, March 15, 1825 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- Dufau v. Couprey's Heirs (31 U.S. 170): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1832-023-01) changed from Friday, February 3, 1832 to Thursday, February 3, 1831 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- Boyle v. Zacharie (31 U.S. 348): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1832-022-01) changed from Wednesday, February 1, 1832 to 1832-01 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- United States v. Huertas (34 U.S. 171): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1835-033-01) changed from Saturday, March 14, 1835 to Friday, March 14, 1834 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- United States v. Clarke (34 U.S. 168): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1835-032-01) changed from Saturday, March 14, 1835 to Friday, March 14, 1834 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- Life &amp; Fire Ins. Co. of N. Y. v. Adams (34 U.S. 571): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1834-065-01) changed from Thursday, January 1, 1835 to 1835-01 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- Hagan v. Foison (35 U.S. 160): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1836-041-01) changed from Friday, February 26, 1836 to 1836-01 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- Ex parte Barry (43 U.S. 65): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1844-001-01) changed from Monday, January 1, 1844 to 1844-01 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- Commercial Bank of Cincinnati v. Buckingham's Executors (46 U.S. 317): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1847-036-01) changed from Monday, March 15, 1847 to Friday, March 5, 1847 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- Roberts v. Cooper (60 U.S. 373): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1856-057-01) changed from Thursday, March 5, 1857 to 1856-12 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- Hemmenway v. Fisher (61 U.S. 255): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1858-002-01) changed from Friday, December 24, 1858 to Thursday, December 24, 1857 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- United States v. Fossatt (62 U.S. 445): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1858-069-01) changed from Friday, March 11, 1859 to Friday, March 11, 1859 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- United States v. Fossatt (62 U.S. 445): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1858-054-01) changed from Monday, February 28, 1859 to Friday, March 11, 1859 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- Hogg v. Ruffner (66 U.S. 115): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1862-006-01) changed from Tuesday, December 23, 1862 to Monday, December 23, 1861 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- Bronson v. Railroad Co. (67 U.S. 524): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1862-045-01) changed from Monday, March 2, 1863 to Monday, February 16, 1863 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- The Cornelius (70 U.S. 214): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1865-016-01) changed from Friday, January 26, 1866 to Monday, January 29, 1866 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- Litchfield v. Railroad Co. (74 U.S. 270): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1868-040-01) changed from Thursday, February 25, 1869 to Monday, February 15, 1869 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- Reeside v. United States (75 U.S. 38): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1868-090-01) changed from Sunday, April 25, 1869 to Thursday, April 15, 1869 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- The Johnson (76 U.S. 146): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1869-057-01) changed from Monday, February 21, 1870 to Monday, February 21, 1870 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- Boylan v. United States (77 U.S. 58): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1869-169-01) changed from Friday, March 18, 1870 to Monday, March 28, 1870 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- HARTFORD FIRE INSURANCE COMPANY v. ISSAC VAN DUZER (76 U.S. 784n): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1869-205-01) changed from Saturday, April 30, 1870 to Monday, April 25, 1870 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- Ex parte Perry (102 U.S. 183): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1880-028-01) changed from Wednesday, November 24, 1880 to Monday, November 24, 1879 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- Bennecke v. Insurance Co. (105 U.S. 355): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1881-155-01) changed from Friday, March 31, 1882 to Monday, March 13, 1882 (see [Dates of Decisions](https://www.supremecourt.gov/opinions/datesofdecisions.pdf))
- Medsker v. Bonebrake (108 U.S. 66): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1881-227-01) changed from Sunday, October 1, 1882 to Monday, March 5, 1883 (see [108 U.S. 66](https://cdn.loc.gov/service/ll/usrep/usrep108/usrep108066/usrep108066.pdf))
- Stebbins v. Duncan (108 U.S. 32): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1881-225-01) changed from Sunday, October 1, 1882 to Monday, March 5, 1883 (see [108 U.S. 32](https://cdn.loc.gov/service/ll/usrep/usrep108/usrep108032/usrep108032.pdf))
- Connecticut Mut. Life Ins. Co. v. Cushman (108 U.S. 51): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1881-226-01) changed from Sunday, October 1, 1882 to Monday, March 5, 1883 (see [108 U.S. 51](https://cdn.loc.gov/service/ll/usrep/usrep108/usrep108051/usrep108051.pdf))
- The Nuestra Se&ntilde;ora de Regla (108 U.S. 92): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1881-228-01) changed from Sunday, October 1, 1882 to Monday, March 12, 1883 (see [108 U.S. 92](https://cdn.loc.gov/service/ll/usrep/usrep108/usrep108092/usrep108092.pdf))
- Western Pacific R. Co. v. United States (108 U.S. 510): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1881-229-01) changed from Sunday, October 1, 1882 to Monday, May 7, 1883 (see [108 U.S. 510](https://cdn.loc.gov/service/ll/usrep/usrep108/usrep108510/usrep108510.pdf))
- Slidell v. Grandjean (111 U.S. 412): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1883-002-01) changed from Monday, October 1, 1883 to Monday, March 3, 1884 (see [111 U.S. 412](https://cdn.loc.gov/service/ll/usrep/usrep111/usrep111412/usrep111412.pdf))
- UNITED STATES v. ALABAMA (123 U.S. 39): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1886-309-01) changed from Saturday, October 1, 1887 to Monday, October 24, 1887 (see [123 U.S. 39](https://cdn.loc.gov/service/ll/usrep/usrep123/usrep123032/usrep123032.pdf))
- ANDREWS v. CONE (124 U.S. 720): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1886-311-01) changed from Saturday, October 1, 1887 to Monday, February 20, 1888 (see [124 U.S. 720](https://cdn.loc.gov/service/ll/usrep/usrep124/usrep124694/usrep124694.pdf))
- McCormick v. Graham's Administrator (129 U.S. 1): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1888-078-01) changed from Monday, January 10, 1887 to Monday, January 7, 1889 (see [129 U.S. 1](https://cdn.loc.gov/service/ll/usrep/usrep129/usrep129001/usrep129001.pdf))
- St. Paul, M. &amp; M. R. Co. v. Wenzel (139 U.S. 23): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1890-066-01) changed from Wednesday, October 1, 1890 to Monday, March 2, 1891 (see [139 U.S. 23](https://cdn.loc.gov/service/ll/usrep/usrep139/usrep139023/usrep139023.pdf))
- Baltimore &amp; Ohio R. Co. v. Baugh (149 U.S. 368): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1892-229-01) changed from Tuesday, May 1, 1894 to Monday, May 1, 1893 (see [149 U.S. 368](https://cdn.loc.gov/service/ll/usrep/usrep149/usrep149368/usrep149368.pdf))
- Morgan Envelope Co. v. Albany Perforated Wrapping Paper Co. (152 U.S. 425): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1893-182-01) changed from Thursday, March 8, 1894 to Monday, March 19, 1894 (see [152 U.S. 425](https://cdn.loc.gov/service/ll/usrep/usrep152/usrep152425/usrep152425.pdf))
- The Elfrida (172 U.S. 186): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1898-026-01) changed from Saturday, October 1, 1898 to Monday, December 12, 1898 (see [172 U.S. 186](https://cdn.loc.gov/service/ll/usrep/usrep172/usrep172186/usrep172186.pdf))
- Independent Wireless Telegraph Co. v. Radio Corp. of America (270 U.S. 84): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1925-064-01) changed from Monday, January 11, 1926 to Monday, March 1, 1926 (see [270 U.S. 84](https://cdn.loc.gov/service/ll/usrep/usrep270/usrep270084/usrep270084.pdf))
- Indian Motocycle Co. v. United States (283 U.S. 570): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1930-075-01) changed from Monday, January 5, 1931 to Monday, May 25, 1931 (see [283 U.S. 570](https://cdn.loc.gov/service/ll/usrep/usrep283/usrep283570/usrep283570.pdf))
- Bernhardt v. Polygraphic Co. of America (350 U.S. 198): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1955-020-01) changed from Friday, January 6, 1956 to Monday, January 16, 1956 (see [350 U.S. 198](https://cdn.loc.gov/service/ll/usrep/usrep350/usrep350198/usrep350198.pdf))
- Swann v. Adams (383 U.S. 210): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1965-056-01) changed from Monday, February 28, 1966 to Friday, February 25, 1966 (see [383 U.S. 210](https://cdn.loc.gov/service/ll/usrep/usrep383/usrep383210/usrep383210.pdf))
- Whitehill v. Elkins (389 U.S. 54): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1967-014-01) changed from Thursday, November 16, 1967 to Monday, November 6, 1967 (see [389 U.S. 54](https://cdn.loc.gov/service/ll/usrep/usrep389/usrep389054/usrep389054.pdf))
- Lines v. Frederick (400 U.S. 18): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1970-006-01) changed from Thursday, November 12, 1970 to Monday, November 9, 1970 (see [400 U.S. 18](https://cdn.loc.gov/service/ll/usrep/usrep400/usrep400018/usrep400018.pdf))
- NLRB v. Nash-Finch Co. (404 U.S. 138): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1971-018-01) changed from Monday, December 6, 1971 to Wednesday, December 8, 1971 (see [404 U.S. 138](https://cdn.loc.gov/service/ll/usrep/usrep404/usrep404138/usrep404138.pdf))
- Givhan v. Western Line Consol. School Dist. (439 U.S. 410): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1978-025-01) changed from Thursday, January 4, 1979 to Tuesday, January 9, 1979 (see [439 U.S. 410](https://cdn.loc.gov/service/ll/usrep/usrep439/usrep439410/usrep439410.pdf))
- Harris v. Rivera (454 U.S. 339): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1981-017-01) changed from Friday, December 4, 1981 to Monday, December 14, 1981 (see [454 U.S. 339](https://cdn.loc.gov/service/ll/usrep/usrep454/usrep454339/usrep454339.pdf))
- Charles D. Bonanno Linen Service, Inc. v. NLRB (454 U.S. 404): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1981-024-01) changed from Monday, January 11, 1982 to Tuesday, January 12, 1982 (see [454 U.S. 404](https://cdn.loc.gov/service/ll/usrep/usrep454/usrep454404/usrep454404.pdf))
- United States v. Clark (454 U.S. 555): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1981-028-01) changed from Wednesday, January 13, 1982 to Tuesday, January 12, 1982 (see [454 U.S. 555](https://cdn.loc.gov/service/ll/usrep/usrep454/usrep454555/usrep454555.pdf))
- Dickman v. Commissioner (465 U.S. 330): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1983-037-01) changed from Tuesday, February 21, 1984 to Wednesday, February 22, 1984 (see [465 U.S. 330](https://cdn.loc.gov/service/ll/usrep/usrep465/usrep465330/usrep465330.pdf))
- Consolidated Rail Corporation v. Darrone (465 U.S. 624): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1983-046-01) changed from Friday, February 24, 1984 to Tuesday, February 28, 1984 (see [465 U.S. 624](https://cdn.loc.gov/service/ll/usrep/usrep465/usrep465624/usrep465624.pdf))
- Ake v. Oklahoma (470 U.S. 68): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1984-033-01) changed from Wednesday, February 20, 1985 to Tuesday, February 26, 1985 (see [470 U.S. 68](https://cdn.loc.gov/service/ll/usrep/usrep470/usrep470068/usrep470068.pdf))
- Old Chief v. United States (519 U.S. 172): [dateDecision](http://scdb.wustl.edu/analysisCaseListing.php?cid=1996-013-01) changed from Tuesday, January 14, 1997 to Tuesday, January 7, 1997 (see [519 U.S. 172](https://cdn.loc.gov/service/ll/usrep/usrep519/usrep519172/usrep519172.pdf))

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

Then there's the problem of multiple rearguments.  Once again, the Spaeth "ALLCOURT" database dealt with this,
but in the same limited fashion, by providing a single `REORAL` field, and SCDB followed suit with its
[dateRearg](http://scdb.wustl.edu/documentation.php?var=dateRearg) variable:

> On those infrequent occasions when the Court orders that a case be reargued, this variable specifies the date of such argument following the same day, month, and year sequence used in the preceding variable (dateArgue).

The limitation here is even worse than before, because not only can a reargument span multiple days, but there can
also be *multiple* rearguments.  Take a look at [Boyle v. Landry (401 U.S. 77)](https://cdn.loc.gov/service/ll/usrep/usrep401/usrep401077/usrep401077.pdf).  The second reargument on November 16, 1970 is nowhere to be found in SCDB.

SCDB also doesn't comprehensively list cases that were granted, argued, and then dismissed without an opinion.
This can happen when the Court "DIGs" (dismisses as improvidently granted) a case, or when it dismisses a case that
has later become moot.  To be clear, I'm referring to cases that were fully briefed and argued and *then*
dismissed, which makes them significantly different from the many petitions that are routinely denied, as well as
the occasional petition that is granted and then dismissed before argument.

This is not to say that SCDB doesn't track *any* DIG'ed cases, but merely that its recording of them is haphazard.
For example, [Stiles v. United States (393 U.S. 219)](http://cdn.loc.gov/service/ll/usrep/usrep393/usrep393219/usrep393219.pdf), argued November 20, 1968, is not listed in SCDB, while [Ford Motor Co. v. McCauley (537 U.S. 1)](https://cdn.loc.gov/service/ll/usrep/usrep537/usrep537001/usrep537001.pdf), argued October 7, 2000, is listed.
The failure to record all such cases frustrates a variety of research, such as the accurate tracking of oral argument activity, the frequency of DIGs, etc.

As an aside, it's also not a simple matter to identify *just* DIG'ed cases.  SCDB has a [caseDisposition](http://scdb.wustl.edu/documentation.php?var=caseDisposition) variable that is generally set to 9 ("petition denied or appeal dismissed") in such cases, but that value is also used in other cases, such as [Schwarz v. National Security Agency (526 U.S. 122)](https://cdn.loc.gov/service/ll/usrep/usrep526/usrep526122/usrep526122.pdf), where the case was granted
and a *per curiam* opinion was issued denying petitioner's motion.

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

Harold Spaeth's `TERM` variable didn't suffer from this ambiguity, because his "ALLCOURT" database didn't deal
with cases before the Warren Court.

### 7. Undocumented Values

As I've [previously documented](/blog/2018/12/21/), there are some variables, such as [caseOrigin](http://scdb.wustl.edu/documentation.php?var=caseOrigin) containing undocumented values (e.g., 157, 158, 161, etc).

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

### 9. Undocumented Changes

This is a broad category, encompassing every field of every record, and it's best illustrated with a simple example.

The case "Ableman v. Booth (59 U.S. 479)" is recorded in SCDB with an argument date of "1856-01-04".  This is at odds
with the argument data reported in the Supreme Court's "Dates of Supreme Court Decisions and Arguments" document, which
reports *no* argument date for that case.  Remember, that's the document that SCDB *explicitly* says it relies on for
dates in early cases such as this.

One interpretation is that this is simply an SCDB error, in which case the argument date should be deleted from the next
release.  However, typos typically manifest themselves as a mistake in one or two digits, not as an entirely new value
appearing out of nowhere.

Another interpretation is that SCDB, relying on some other (unspecified) primary source, discovered that the case had
*indeed* been argued on January 4, 1856.

And we have *no idea* which is the correct answer.  It's also quite likely that, at this moment, no one working on SCDB
knows the correct answer, either.

This is the fundamental problem with Andrew Martin's assertion that detailed differentials, change logs, etc, don't matter,
and that end-users "can perform the differentials just as well as we can."  That is absolutely true, and also absolutely
meaningless.  Without any explanation to accompany the growing number of corrections that are being made over time, the
database becomes increasingly impossible to validate, because the sources of the underlying data, as well as any changes
made to that data and the reasons for those changes, are kept private -- if they are kept at all.

## Epilogue

I long ago advocated for greater transparency in what SCDB chooses to add or correct in its database, including
change logs with every release.  These days, an even better step forward for SCDB would be to do what I've done here,
which is to create an open-source repository containing copies of all the data sources being used, along with the
scripts used to process them.

Issues like those with [Terms](#6-terms) arose simply because SCDB didn't fully consider the impact of
older cases on a design that it inherited from Harold Spaeth's "ALLCOURT" database.  Other issues, like
those with [Argument and Reargument Dates](#4-argument-and-reargument-dates), could be considered a failure
of imagination -- *except* that we discussed dating issues with SCDB principals (Andrew Martin and Troy DeArmitt)
at least ten years ago, and the only headway we were able to make was a vague commitment to consider
"database extensions" that would allow groups like Oyez to add more comprehensive oral argument information
(e.g., dates, names of advocates, etc).  As far as I can tell, that never happened.

In any event, it's never too late to fix problems.  Instead of making excuses, justifications,
or brushing off good suggestions as "too much work", SCDB should start acknowledging problems and create a
roadmap for improving and evolving the database, defining new variables to address old issues and new features,
deprecating problematic variables, and above all, adding rigorous data validation rules and cross-checks to
eliminate mistakes and prevent future errors.

I think if SCDB really wants to be a Gold Standard, it also needs to stop being a siloed operation, performing all its
updates behind a veil of secrecy, and making the world wait with bated breath for each new release.  As an academic
endeavour, more knowledge -- not less -- should be one of the goals, as well as encouraging cooperation and participation
among all interested parties.

Or, SCDB can quietly extract whatever it wants here, without telling me or anyone else, and then roll
out its next release with the usual (and completely useless) notation: `minor corrections`.  And neither
I nor anyone else will have any incentive to help again.

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
