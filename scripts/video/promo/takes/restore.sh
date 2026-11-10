#!/bin/bash
# Stellt die Einzelbilder der App-Aufnahmen wieder her: takes/<name>/0000.jpg …
cd "$(dirname "$0")"; OUT=${1:-./frames}
for f in *.mp4; do n=${f%.mp4}; mkdir -p $OUT/$n; ffmpeg -v error -y -i $f -start_number 0 -q:v 3 $OUT/$n/%04d.jpg; done
echo fertig
