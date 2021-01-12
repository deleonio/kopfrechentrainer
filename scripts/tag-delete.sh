#!/bin/bash

git tag -l
for i in {0..14}
do
    git tag --delete $1.$i
    git push --delete origin $1.$i
done