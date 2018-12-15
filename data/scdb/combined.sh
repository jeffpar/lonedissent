#!/bin/bash
cat SCDB_Legacy_justiceCentered_Citation.csv > combined.csv
tail -n +2 SCDB_justiceCentered_Citation.csv >> combined.csv
