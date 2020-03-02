# Inklewriter / Freeinklewriter

This project is a free reverse-engineered version of the [inklewriter server](https://writer.inklestudios.com).

We would like to thank Inkle Studio for letting us open their great software! 

## Test 

You can test it on https://ifwriter.crommer.fr

## Crash course

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
