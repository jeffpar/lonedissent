#!/bin/bash
cat SCDB_Legacy_06_justiceCentered_Citation.csv > decisions.csv
tail -n +2 SCDB_2021_01_justiceCentered_Citation.csv >> decisions.csv
