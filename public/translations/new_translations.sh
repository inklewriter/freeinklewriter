#!/bin/bash
panic(){ echo $@ >&2; exit 1;}
[[ -z "$1" ]] && panic "Exit. Missing parameter"
file="${1}"
[[ ! -f "$file" ]] && panic "Exit. Invalid path"

echo '{"fr":{"a":"a"'; 
grep --color  '\btr("' $file | \
    while read line ; do 
        echo $line  | awk '{split($0,t,/tr\("[^"]*/,m); print (m[1],"\n",m[2],"\n",m[3],"\n",m[4])}'
        done \
     | sed -r 's/^ ?tr\("//' \
     | sed '/^[[:space:]]*$/d' \
     | sort -u\
     | while read line ; do 
             echo '  ,"'$line'": ""'
     done  
echo '}}'
