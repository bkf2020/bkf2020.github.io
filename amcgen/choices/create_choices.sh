#!/bin/sh

BASE=https://artofproblemsolving.com/wiki/index.php

# CLEAN Files

for TEST in aime amc8 amc10 amc12
do
	rm $TEST/easy
	touch $TEST/easy
	rm $TEST/medium
	touch $TEST/medium
	rm $TEST/hard
	touch $TEST/hard
	rm $TEST/veryhard
	touch $TEST/veryhard
	rm $TEST/easy_names
	touch $TEST/easy_names
	rm $TEST/medium_names
	touch $TEST/medium_names
	rm $TEST/hard_names
	touch $TEST/hard_names
	rm $TEST/veryhard_names
	touch $TEST/veryhard_names
done

# AIME
for YEAR in 2015 2016 2017 2018 2019 2020 2021
do
	for TEST_TYPE in I II
	do
		for PROBLEM in 1 2 3 4 5
		do
			echo $BASE/$YEAR"_AIME_"$TEST_TYPE"_Problems#Problem_"$PROBLEM >> aime/easy
			echo $YEAR" AIME "$TEST_TYPE" Problem #"$PROBLEM >> aime/easy_names
		done

		for PROBLEM in 6 7 8 9 10
		do
			echo $BASE/$YEAR"_AIME_"$TEST_TYPE"_Problems#Problem_"$PROBLEM >> aime/medium
			echo $YEAR" AIME "$TEST_TYPE" Problem #"$PROBLEM >> aime/medium_names
		done

		for PROBLEM in 11 12 13
		do
			echo $BASE/$YEAR"_AIME_"$TEST_TYPE"_Problems#Problem_"$PROBLEM >> aime/hard
			echo $YEAR" AIME "$TEST_TYPE" Problem #"$PROBLEM >> aime/hard_names
		done

		for PROBLEM in 14 15
		do
			echo $BASE/$YEAR"_AIME_"$TEST_TYPE"_Problems#Problem_"$PROBLEM >> aime/veryhard
			echo $YEAR" AIME "$TEST_TYPE" Problem #"$PROBLEM >> aime/veryhard_names
		done
	done
done

for YEAR in 2014 2015 2016 2017 2018 2019 2020
do
	for PROBLEM in $(seq 15)
	do
		echo $BASE/$YEAR"_AMC_8_Problems#Problem_"$PROBLEM >> amc8/easy
		echo $YEAR" AMC 8 Problem #"$PROBLEM >> amc8/easy_names
	done

	for PROBLEM in 16 17 18
	do
		echo $BASE/$YEAR"_AMC_8_Problems#Problem_"$PROBLEM >> amc8/medium
		echo $YEAR" AMC 8 Problem #"$PROBLEM >> amc8/medium_names
	done

	for PROBLEM in 19 20 21 22
	do
		echo $BASE/$YEAR"_AMC_8_Problems#Problem_"$PROBLEM >> amc8/hard
		echo $YEAR" AMC 8 Problem #"$PROBLEM >> amc8/hard_names
	done

	for PROBLEM in 23 24 25
	do
		echo $BASE/$YEAR"_AMC_8_Problems#Problem_"$PROBLEM >> amc8/veryhard
		echo $YEAR" AMC 8 Problem #"$PROBLEM >> amc8/veryhard_names
	done
done

# AMC 10
for YEAR in 2015 2016 2017 2018 2019 2020 2021
do
	for TEST_TYPE in A B
	do
		for PROBLEM in $(seq 15)
		do
			echo $BASE/$YEAR"_AMC_10"$TEST_TYPE"_Problems#Problem_"$PROBLEM >> amc10/easy
			echo $YEAR" AMC 10"$TEST_TYPE" Problem #"$PROBLEM >> amc10/easy_names
		done

		for PROBLEM in 16 17 18
		do
			echo $BASE/$YEAR"_AMC_10"$TEST_TYPE"_Problems#Problem_"$PROBLEM >> amc10/medium
			echo $YEAR" AMC 10"$TEST_TYPE" Problem #"$PROBLEM >> amc10/medium_names
		done

		for PROBLEM in 19 20 21 22
		do
			echo $BASE/$YEAR"_AMC_10"$TEST_TYPE"_Problems#Problem_"$PROBLEM >> amc10/hard
			echo $YEAR" AMC 10"$TEST_TYPE" Problem #"$PROBLEM >> amc10/hard_names
		done

		for PROBLEM in 23 24 25
		do
			echo $BASE/$YEAR"_AMC_10_"$TEST_TYPE"_Problems#Problem_"$PROBLEM >> amc10/veryhard
			echo $YEAR" AMC 10"$TEST_TYPE" Problem #"$PROBLEM >> amc10/veryhard_names
		done
	done
done

#AMC 12
for YEAR in 2015 2016 2017 2018 2019 2020 2021
do
	for TEST_TYPE in A B
	do
		for PROBLEM in $(seq 15)
		do
			echo $BASE/$YEAR"_AMC_12"$TEST_TYPE"_Problems#Problem_"$PROBLEM >> amc12/easy
			echo $YEAR" AMC 12"$TEST_TYPE" Problem #"$PROBLEM >> amc12/easy_names
		done

		for PROBLEM in 16 17 18
		do
			echo $BASE/$YEAR"_AMC_12"$TEST_TYPE"_Problems#Problem_"$PROBLEM >> amc12/medium
			echo $YEAR" AMC 12"$TEST_TYPE" Problem #"$PROBLEM >> amc12/medium_names
		done

		for PROBLEM in 19 20 21 22
		do
			echo $BASE/$YEAR"_AMC_12"$TEST_TYPE"_Problems#Problem_"$PROBLEM >> amc12/hard
			echo $YEAR" AMC 12"$TEST_TYPE" Problem #"$PROBLEM >> amc12/hard_names
		done

		for PROBLEM in 23 24 25
		do
			echo $BASE/$YEAR"_AMC_12_"$TEST_TYPE"_Problems#Problem_"$PROBLEM >> amc12/veryhard
			echo $YEAR" AMC 12"$TEST_TYPE" Problem #"$PROBLEM >> amc12/veryhard_names
		done
	done
done
