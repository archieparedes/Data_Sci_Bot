import matplotlib.pyplot as plt; plt.rcdefaults()
import numpy as np
from matplotlib import pyplot as mp
import csv
import os
plt.style.use('ggplot')

dictTV = dict()

with open('softData.csv') as csvfile:
    read = csv.reader(csvfile, delimiter = ',')
    for row in read:
        if(int(row[1]) <= 0):
            continue
        dictTV[row[0]] = int(row[1])

vals = dictTV.values()
tech = dictTV.keys()

index = np.arange(len(dictTV))
plt.bar(index, dictTV.values(), align = 'center', alpha = 1, color = '#33B9FF')
plt.xlabel('Technology', fontsize=12)
plt.ylabel('Tech Demand', fontsize=12)
plt.xticks(index, dictTV.keys(), fontsize=4, rotation=90)
plt.title('Tech Used in Software Development')
mp.savefig('foo2.png', dpi=720)

