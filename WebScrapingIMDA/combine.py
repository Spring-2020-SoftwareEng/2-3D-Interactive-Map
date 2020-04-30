"""flagFile = open("flagFile.txt", "r")
maFile = open("maFile.txt", "r")
gdpFile = open("gdpFile.txt", "r")
newDataFile = open("newDataFile.txt", "r")
#flagFile = open("flagFile.txt", "r")
newBgFile = open("newBgFile.txt", "r")
newMrFile = open("newMrFile.txt", "r")
newCapFile = open("newCapFile.txt", "r")
brFile = open("brFile.txt", "r")
drFile = open("drFile.txt", "r")
popGrFile = open("popGrFile.txt", "r")
lfFile = open("lfFile.txt", "r")"""
finalDataFile = open("finalDataFile.txt", "r")
finalestDataFile = open("finalestDataFile.txt", "w")
"""
dataFile.write("\"data\": [{\n")

flagList = list(flagFile)
maList = list(maFile)
gdpList = list(gdpFile)

for i in range(len(flagList)):
    flagSlice = flagList[i].split(": ")
    id = flagSlice[1].split(",")
    population = flagSlice[2].split(", ")
    flag = flagSlice[3].split(" }")
    maSlice = maList[i].split(": ")
    medianAge = maSlice[2].split(" }")
    gdpSlice = gdpList[i].split(": ")
    gdp = gdpSlice[2].split(" }")
    dataFile.write("\t\"id\": " + id[0] + ",\n\t\"population\": " + population[0] + ",\n\t\"medianAge\": " + medianAge[0] + ",\n\t\"GDP(PPP)\": " + gdp[0] + ",\n\t\"flag\": " + flag[0] + "\n")
    if i != len(flagList)-1:
      dataFile.write("}, {\n")

dataFile.write("}]")

flagFile.close()
maFile.close()
gdpFile.close()

newDataList = list(newDataFile)
newBgList = list(newBgFile)
newMrList = list(newMrFile)
newCapList = list(newCapFile)
brList = list(brFile)
drList = list(drFile)
popGrList = list(popGrFile)
lfList = list(lfFile)

i = 0
k = 0

for line in newDataList:
  if i < 3:
    finalDataFile.write(line)
  elif i == 3:
    finalDataFile.write("\t\"background\": " + newBgList[k][0:-1] + ',\n')
    finalDataFile.write("\t\"region\": " + newMrList[k].split('&&&b')[1][0:-1] + ',\n')
    finalDataFile.write("\t\"capital\": " + newCapList[k].split('&&&b')[1][0:-1] + ',\n')
    finalDataFile.write("\t\"birth rate\": " + brList[k].split('&&&')[1][0:-1] + ',\n')
    finalDataFile.write("\t\"death rate\": " + drList[k].split('&&&')[1][0:-1] + ',\n')
    finalDataFile.write("\t\"population growth\": " + popGrList[k].split('&&&')[1][0:-1] + ',\n')
    finalDataFile.write("\t\"labor force\": " + lfList[k].split('&&&')[1][0:-1] + ',\n')
    finalDataFile.write(line)
    k += 1
  elif (i-3)%7 == 0:
    finalDataFile.write("\t\"background\": " + newBgList[k][0:-1] + ',\n')
    finalDataFile.write("\t\"region\": " + newMrList[k].split('&&&b')[1][0:-1] + ',\n')
    finalDataFile.write("\t\"capital\": " + newCapList[k].split('&&&b')[1][0:-1] + ',\n')
    finalDataFile.write("\t\"birth rate\": " + brList[k].split('&&&')[1][0:-1] + ',\n')
    finalDataFile.write("\t\"death rate\": " + drList[k].split('&&&')[1][0:-1] + ',\n')
    finalDataFile.write("\t\"population growth\": " + popGrList[k].split('&&&')[1][0:-1] + ',\n')
    finalDataFile.write("\t\"labor force\": " + lfList[k].split('&&&')[1][0:-1] + ',\n')
    finalDataFile.write(line)
    k += 1
  else:
    finalDataFile.write(line)
  i += 1
  print(i)
    

newDataFile.close()
newBgFile.close()
newMrFile.close()
newCapFile.close()
brFile.close()
drFile.close()
popGrFile.close()
lfFile.close()
finalDataFile.close()"""

finalDataList = list(finalDataFile)

i = 0

for line in finalDataList:
  if i >= 13 and (i-13)%14 == 0:
    finalestDataFile.write("\t\"score\": 0,\n")
  finalestDataFile.write(line)
  i += 1

finalestDataFile.close()
finalDataFile.close()
