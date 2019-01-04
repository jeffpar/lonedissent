# Lone Dissent

This project highlights "lone dissents" from [U.S. Supreme Court](https://www.supremecourt.gov) opinions.

For more information, see the [home page](index.md) from the project's website, [lonedissent.org](https://lonedissent.org).

## Building Data Files

See our blog post "[Building Data Files](_posts/2018-12-21-building-data-files.md)" for details.  All the built data files,
including the source data files that were used to build them, have been checked into the project.

## Adding More Lone Dissents (aka "Loners") By Term

Our [gulpfile](gulpfile.js) has a Gulp task named `loners` that automatically adds more lone dissents from a given
court term to our internal data file, [loners.json](_data/loners.json), and then builds new term pages.  For example,
to build the page for the [2017](_pages/cases/loners/2017-10.md) court term:

    gulp loners --term=2017

The data comes from [decisions.json](sources/results/decisions.json), which was previously created by another
another Gulp task named `decisions`.  That task processed all the decision records in [decisions.csv](sources/scdb/decisions.csv) and generated the JSON file that the other tasks rely on for decision data.

The [loners.json](_data/loners.json) data can then be hand-edited as needed, to indicate where the PDF containing the
dissent is located, along with a page number inside the PDF.  For example, the dissent in "543 U.S. 50" is buried in Volume
543 of the [U.S. Supreme Court's](https://www.supremecourt.gov/)
[Bound Volumes](https://www.supremecourt.gov/opinions/boundvolumes.aspx).  Moreover, the opinion doesn't actually start on
the 50th page of the PDF, thanks to a lengthy table of contents.  And even if the opinion *did* start on the cited page,
the dissent is always buried at the end of the opinion, so a page number for the dissent is almost always required.

So, the source of the PDF, the page number of the opinion, and the page number of the dissent, should be indicated by three
additional properties (`pdfSource`, `pdfPage`, and `pdfPageDissent`) in [loners.json](_data/loners.json).  For example:

    ...
    "usCite": "543 U.S. 50",
    "sctCite": "125 S. Ct. 460",
    "ledCite": "160 L. Ed. 2d 389",
    "lexisCite": "2004 U.S. LEXIS 7979",
    "pdfSource": "scotusBound",
    "pdfPage": 252,
    "pdfPageDissent": 272,
    ...

In cases where the opinion (and possibly the dissent) begin on the first page of the PDF, the `pdfPage` (and `pdfPageDissent`)
properties may be omitted.
