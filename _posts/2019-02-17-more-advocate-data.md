---
title: "More Advocate Data"
permalink: /blog/2019/02/17/
---

One of the cornerstones of good data is being able to cross-reference it with lots of other data, so to that end,
this repository now contains text extracted from all the [U.S. Reports](https://github.com/jeffpar/lonedissent/tree/master/sources/loc/volumes) downloaded from the Library of Congress, along with text extracted from all the [Transcripts](https://github.com/jeffpar/lonedissent/tree/master/sources/scotus/transcripts) downloaded from the U.S. Supreme Court website,
and all [Case Data](https://github.com/jeffpar/lonedissent/tree/master/sources/oyez/cases) (from the 1955 term onward) extracted from the Oyez website.

Our initial focus is to match up all those SCOTUS transcript files with their corresponding SCDB records.  A list of all such transcripts files is stored in a [CSV](/results/transcripts.csv), and a summary of how that matching is progressing is available [here](/cases/transcripts/scotus).

One could wish that the resolution and quality of the PDFs stored at the Library of Congress was higher, so the raw text
was less error-prone, but our goal isn't to recreate the original text.  Instead, the plan is to simply use the raw text as another set of signals, helping us fill in gaps and find errors in SCDB.
