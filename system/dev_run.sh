#!/bin/bash
msg(){ 
    echo -e "  \e[0;31m$@\e[0m"; 
}
docker(){
    local D="$1"
    msg "! $D Start reloading"
    > /tmp/ci.work
    sudo docker-compose down
    sudo docker-compose build 
    sudo docker-compose up -d 
    sleep 3
    rm -f /tmp/ci.work
    msg "! $D Finished reloading"
}

reload(){ 
    if [[ -f /tmp/ci.work ]] ; then 
    #    msg "- $D Reload currently in progress. Skip." 
        return
    fi
    local D=$(date +%s-%N)
    msg "= $D Change detected"
    echo -n "$D">/tmp/ci
    sleep 3
    if [[ "$( cat /tmp/ci )" != "$D" ]] ; then
        msg "x $D is now old. Exiting." 
        return
    fi
    docker "$D"
}

rm -f /tmp/ci*
docker &
while inotifywait -e close_write,close_nowrite,create,delete .; do 
  reload& 
done
