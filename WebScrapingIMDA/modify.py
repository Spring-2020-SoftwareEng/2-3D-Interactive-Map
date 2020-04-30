from bs4 import BeautifulSoup
import re
"""
capFile = open("capFile.txt", "r")
newCapFile = open("newCapFile.txt", "w")

cap = list(capFile)

for line in cap:
    newcap = line.split(';')[0]
    newcap = newcap.split('(')[0]
    newcap = newcap.split(':')[1]
    if newcap != line.split(':')[1]:
      newcap += "'\n"
    newCapFile.write(newcap)

capFile.close()
newCapFile.close()
"""
"""
bgFile = open("bgFile.txt", "r")
newBgFile = open("newBgFile.txt", "w")

bgList = list(bgFile)

for line in bgList:
  bg = line.split('&&&b')[1]
  bg = bg[1:-2]
  bg = bg.replace('\\\'','\'')
  bg = bg.replace('\'','\\\'')
  bg = bg.replace('\"','\\\"')
  newBgFile.write('\'' + bg + '\'\n')

bgFile.close()
newBgFile.close()
"""
"""
mrFile = open("mrFile.txt", "r")
newMrFile = open("newMrFile.txt", "w")

mrList = list(mrFile)

for line in mrList:
  mr = line.replace('Americaandthe',' America & The ')
  mr = mr.replace('Southeast','')
  mr = mr.replace('SouthA','South A')
  mr = mr.replace('NorthA','North A')
  mr = mr.replace('MiddleE', 'Middle E')

  newMrFile.write(mr)

mrFile.close()
newMrFile.close()
"""

df = open("dataFile.txt", "r")
ndf = open("newDataFile.txt", "w")

dflist = list(df)
i = 0
for line in dflist:
  if len(line) != 1:
    ndf.write(line)

df.close()
ndf.close()
