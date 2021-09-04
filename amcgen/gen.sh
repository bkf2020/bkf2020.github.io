#!/bin/sh

DATE=$(date "+%Y/%m/%d")
AIMEDIR="aime/"$DATE
AMC8DIR="amc8/"$DATE
AMC10DIR="amc10/"$DATE
AMC12DIR="amc12/"$DATE

mkdir -p $AIMEDIR
mkdir -p $AMC8DIR
mkdir -p $AMC10DIR
mkdir -p $AMC12DIR

cat templates/index_template_upper.html > index.html

for TEST in aime amc8 amc10 amc12
do
	for LEVEL in easy medium hard veryhard
	do
		CHOICES_PATH=choices/$TEST/$LEVEL
		PROBLEMS_PATH=choices/$TEST/$LEVEL"_names"
		TEMPLATE_PATH=templates/$TEST/$LEVEL".html"

		LINE_NUMBERS=$(wc -l < $CHOICES_PATH)
		shuf -i 1-$LINE_NUMBERS -n 5 > out
		URL1=$(sed -n $(sed -n '1p' out)p $CHOICES_PATH)
		URL2=$(sed -n $(sed -n '2p' out)p $CHOICES_PATH)
		URL3=$(sed -n $(sed -n '3p' out)p $CHOICES_PATH)
		URL4=$(sed -n $(sed -n '4p' out)p $CHOICES_PATH)
		URL5=$(sed -n $(sed -n '5p' out)p $CHOICES_PATH)
		PRO1=$(sed -n $(sed -n '1p' out)p $PROBLEMS_PATH)
		PRO2=$(sed -n $(sed -n '2p' out)p $PROBLEMS_PATH)
		PRO3=$(sed -n $(sed -n '3p' out)p $PROBLEMS_PATH)
		PRO4=$(sed -n $(sed -n '4p' out)p $PROBLEMS_PATH)
		PRO5=$(sed -n $(sed -n '5p' out)p $PROBLEMS_PATH)
		export URL1; export URL2; export URL3; export URL4; export URL5; \
		export PRO1; export PRO2; export PRO3; export PRO4; export PRO5; \
		envsubst < $TEMPLATE_PATH >> index.html; \
		mkdir --parents $DATE
		touch $DATE/index.html
		cp index.html $DATE/index.html
	done
done

cat templates/index_template_lower.html >> index.html

# delete out file
rm out
