#!/bin/sh

git push
git push --prune https://gitlab.com/bkf2020/bkf2020.gitlab.io.git
git push --prune https://codeberg.org/bkf2020/pages.git

math=$(grep -F '<th class="so">Solved</th>' mathlog.html | wc -l)
cs=$(grep -F '<th class="so">Solved</th>' cslog.html | wc -l)
total=$(echo "${math} + ${cs}" | bc)

grep -F 'var problemsSolved' visual.html > curr
echo "var problemsSolved = ${total};" > new
diff -w curr new || echo -e "\033[0;31mYou need to update visual.html with ${total} problems solved! \033[0m"

rm curr new
