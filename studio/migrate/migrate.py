import shlex
import os

pricelistids = []

with(open('pricelistids.txt', 'r')) as f:
    pricelistids = f.readlines()
    pricelistids = [x.strip() for x in pricelistids]
    



for p in pricelistids:
    if p != '':
        cmd = 'sanity documents delete --dataset=master ' + p
        cmd = shlex.split(cmd)
        os.system(' '.join(cmd))

    