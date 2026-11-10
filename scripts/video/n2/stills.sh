#!/bin/bash
# stills.sh comp "t1,t2,..." → /tmp/st-comp/sheet.png
cd /home/claude/hofgeschichten && rm -rf /tmp/st-$1 && timeout 600 env NODE_TOOLS=/opt/npm-tools/node_modules node scripts/video/render-reel.mjs /tmp/st-$1 --comp $1 --stills $2 2>&1 | grep -iv "^fertig" | tail -5
cd /tmp/st-$1 && files=$(ls t*.png | sed 's/^t//; s/.png$//' | sort -g | sed 's/^/t/; s/$/.png/') && convert $files -resize 270x480 +append sheet.png
