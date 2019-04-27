import matplotlib.pyplot as plt; plt.rcdefaults()
import numpy as np
from matplotlib import pyplot as mp
import csv
import os
import pandas as pd
from PIL import Image
from wordcloud import WordCloud, STOPWORDS
import random

stopwords = set(STOPWORDS)
words = ' '

with open('softData.csv') as csvfile:
    read = csv.reader(csvfile, delimiter = ',')
    for row in read:
        if(int(row[1]) <= 0):
            continue
        else:
            for i in range(0, int(row[1])):
                w = row[0].replace(" ", "_")
                words += w + ' '

wordsA = words.split(' ')
random.shuffle(wordsA)

temp = ""
for i in wordsA:
    temp += i + " "
words = temp

wordcloud = WordCloud(width = 800, height = 800, 
                background_color ='white', 
                stopwords = stopwords, 
                min_font_size = 10).generate(words) 

# plot the WordCloud image                        
plt.figure(figsize = (8, 8), facecolor = None) 
plt.imshow(wordcloud) 
plt.axis("off") 
plt.tight_layout(pad = 0) 
mp.savefig('cloudSoftDev.png', dpi=720)


