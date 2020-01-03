dir=$1
path=$2

function firstcommit() {
     git log --diff-filter=A --pretty=format:%H -- $1
}

function lastcommit() {
    git log -n 1 --pretty=format:%H -- $1
}

function overalldiff() {
    file=$1
    git diff -U1000 $(firstcommit $file) $(lastcommit $file) -- $file
}

cd $dir
overalldiff $path