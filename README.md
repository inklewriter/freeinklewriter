### Status
[![Build Status](https://travis-ci.com/inklewriter/freeinklewriter.svg?branch=master)](https://travis-ci.com/inklewriter/freeinklewriter)
[![Translation status](https://hosted.weblate.org/widgets/inklewriter/-/inklewriter-frontend/svg-badge.svg)](https://hosted.weblate.org/engage/inklewriter/)

# Inklewriter / Freeinklewriter

This project is a free reverse-engineered version of the [inklewriter server](https://writer.inklestudios.com).

We would like to thank Inkle Studio for letting us open their great software! 

## Test 

You can test it on https://www.inklewriter.com

## Run your own

We strongly advise you to check the [dedicated repository](https://github.com/inklewriter/freeinklewriter-system) for running this application on a system in a "production-ready" approach.

It runs on x86 and arm, using docker-compose or as a system service.


## Development Crash course

Help translate Inklewriter at [Hosted Weblate](https://hosted.weblate.org/projects/inklewriter/inklewriter-frontend/)

<a href="https://hosted.weblate.org/engage/inklewriter/">
<img src="https://hosted.weblate.org/widgets/inklewriter/-/inklewriter-frontend/multi-auto.svg" alt="Oversettelsesstatus" />
</a>

### docker-compose 

```
git clone https://github.com/inklewriter/freeinklewriter
cd freeinklewriter
cp .env.template .env
docker-compose run
```
Open your browser on http://localhost:3000

## Support 

Please open tickets in this issue tracker. 
