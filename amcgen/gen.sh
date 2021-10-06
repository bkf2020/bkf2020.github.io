#!/bin/sh

DATE=$(date "+%Y/%m/%d")

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

YEAR=$(date "+%Y")
MONTH2=$(date "+%m")

if [ $(date "+%m/%d") = "01/01" ]; then
	LOCATION="${YEAR}/archive"
	ENTRY="${YEAR}"
	cat templates/archive/general_archive_header.html > archive.html
	export YEAR; export LOCATION; export ENTRY; \
	envsubst < templates/archive/general_archive_entry.html >> general_archive_entries; \
	cat general_archive_entries >> archive.html
	cat templates/archive/general_archive_footer.html >> archive.html
fi

if [ $(date "+%d") = "01" ]; then
	LOCATION="${MONTH2}/archive"
	MONTH=$(date "+%B")
	ENTRY="${MONTH} ${YEAR}"
	export LOCATION; export ENTRY; export MONTH; export YEAR; \
	envsubst < templates/archive/yearly_archive_header.html > ${YEAR}/archive.html; \
	envsubst < templates/archive/yearly_archive_entry.html >> ${YEAR}/archive_entries.html; \
	cat ${YEAR}/archive_entries.html >> ${YEAR}/archive.html
	cat templates/archive/yearly_archive_footer.html >> ${YEAR}/archive.html
fi

DATE2=$(date "+%B %d, %Y")
LOCATION=$(date "+%d")
ENTRY="${DATE2} (${DATE})"
MONTH=$(date "+%B")
export LOCATION; export ENTRY; export MONTH; export YEAR; \
envsubst < templates/archive/monthly_archive_header.html > ${YEAR}/${MONTH2}/archive.html; \
envsubst < templates/archive/monthly_archive_entry.html >> ${YEAR}/${MONTH2}/archive_entries.html; \
cat ${YEAR}/${MONTH2}/archive_entries.html >> ${YEAR}/${MONTH2}/archive.html
cat templates/archive/monthly_archive_footer.html >> ${YEAR}/${MONTH2}/archive.html


# delete out file
rm out
