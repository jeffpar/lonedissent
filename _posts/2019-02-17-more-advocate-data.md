---
title: "More Advocate Data"
permalink: /blog/2019/02/17/
---

One of our long-term goals is to produce a more accurate and comprehensive list of
[Top Supreme Court Advocates](/advocates/top100).  But to do that, we need lots of data -- lots of *good* data.

And one of the cornerstones of good data is being able to cross-reference it with lots of other data,
so to that end, this repository now contains text extracted from all the
[U.S. Reports](https://github.com/jeffpar/lonedissent/tree/master/sources/loc/volumes) downloaded from the
Library of Congress, along with text extracted from all the [Transcripts](https://github.com/jeffpar/lonedissent/tree/master/sources/scotus/transcripts)
downloaded from the U.S. Supreme Court website, and all [Case Data](https://github.com/jeffpar/lonedissent/tree/master/sources/oyez/cases)
(from the 1955 term onward) extracted from the Oyez website.

Our initial focus is to match all [SCOTUS Transcripts](/transcripts/scotus) with their corresponding SCDB records.
A list of those transcripts is being stored in a [CSV](/results/transcripts.csv), which includes a `notes` field documenting any corrections.
Next, we'll cross-reference that list with Oyez's case data.

One could also wish that the resolution and quality of the PDFs stored at the Library of Congress was higher, so that the raw
text was less error-prone, but our goal isn't to recreate the original text.  Instead, the plan is to simply use the raw text
as another set of signals, helping us fill in gaps and find/fix errors in the [Supreme Court Database](/blog/2019/02/18/).
