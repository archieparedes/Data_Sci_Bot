import matplotlib.pyplot as plt; plt.rcdefaults()
import numpy as np
from matplotlib import pyplot as mp
import csv
import os
plt.style.use('ggplot')


tech = list()
val = list()
with open('softData.csv') as csvfile:
    read = csv.reader(csvfile, delimiter = ',')
    for row in read:
        if(int(row[1]) <= 0):
           pass
        tech.append(row[0])
        val.append(int(row[1]))

index = np.arange(len(tech))
plt.bar(index, val, align = 'center', alpha = 1)
plt.xlabel('Technology', fontsize=12)
plt.ylabel('Tech Demand', fontsize=12)
plt.xticks(index, tech, fontsize=4, rotation=90)
plt.title('Tech Used in Software Development')
mp.savefig('foo2.png', dpi=720)

