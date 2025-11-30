#!/usr/bin/env python3
from dictdiffer import diff
from deepdiff import DeepDiff
import json
import subprocess 
with open("dictionary.fr.json") as fh:
    existing = json.load(fh)

out = subprocess.run("./new_translations.sh ../../app/assets/javascripts/",shell=True, capture_output=True)
new = json.loads(out.stdout)

for key in new['fr']:
    if key not in existing["fr"]:
        print('  ,"{}": ""'.format(key))
