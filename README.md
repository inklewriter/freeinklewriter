### Status
[![Build Status](https://travis-ci.com/inklewriter/freeinklewriter.svg?branch=master)](https://travis-ci.com/inklewriter/freeinklewriter)

# Inklewriter / Freeinklewriter

This project is a free reverse-engineered version of the [inklewriter server](https://writer.inklestudios.com).

We would like to thank Inkle Studio for letting us open their great software! 

## Test 

You can test it on https://www.inklewriter.com

## Run your own

We strongly advise you to check the [dedicated repository](https://github.com/inklewriter/freeinklewriter-system) for running this application on a system in a "production-ready" approach.

It runs on x86 and arm, using docker-compose or as a system service.


## Development Crash course

### docker-compose 

```
git clone https://github.com/inklewriter/freeinklewriter
cd freeinklewriter
cp .env.template .env
docker-compose run
```
Open your browser on http://localhost:3000

### bash script (Debian-based systems)
```
cd /tmp # or any directory of your choice 
wget https://raw.githubusercontent.com/inklewriter/freeinklewriter/master/system/install.sh
bash ./install.sh
```

## Support 

Please open tickets in this issue tracker. 
