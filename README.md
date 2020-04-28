## 2/3D Interactive Map Overview 

For our CS4398 project we have created an interactive map using a combination of Typescript, AngularJS, CSS, HTML, Python and amCharts.
  The Interactive map comes with various types of information about each country such as GDP, Population, Median Age, etc, with all information being sourced and scraped from CIA.gov since they have reliable updated information about every country.  
 
## WebScraper
Our project utilizes a webscraper created in Python to collect relevant information and filter out unneccesary information.  Once the Webscraper locates relevant information it formats the CIA's data into data that we can use as numerical data such as replacing the word million with six zeros and other optimizations that allows for quick processing of data. While the data is being processed it is also being stored into a corresponding text file that is formated into a usable Json format that is used by our map library amCharts.  
<image of scraped files>
  
## Features
* Map Outline
  * The map has an outline feature that allows a user to toggle an outline across all the heatmaps in both map modes to provide users an easier method of differentiating between nations on certain heatmaps 
  * With Outline ![Outline](https://github.com/Spring-2020-SoftwareEng/2-3D-Interactive-Map/blob/test/MapImages/Outline.png)
  * Without Outline ![W/Outline](https://github.com/Spring-2020-SoftwareEng/2-3D-Interactive-Map/blob/test/MapImages/nooutline.png)
  
* Heatmaps
  * Our map has an array of multiple colored Heatmaps that the user can select from which are usable in both a flat Miller style map or a rotatable Orthographic globe. The map allows for a user to select between Population, Median Age, GDP, Birth rate, Death Rate, Population Growth, and Labor Force all of which the user can select to color either red, blue, green, and yellow. 
  * Examples of Map Modes ![Median2D](https://github.com/Spring-2020-SoftwareEng/2-3D-Interactive-Map/blob/test/MapImages/Median%20age%20miller.png) ![Pop2D](https://github.com/Spring-2020-SoftwareEng/2-3D-Interactive-Map/blob/test/MapImages/Population%20pic.png)
  
* Data Quiz
  * Our most impressive feature is our Data Quiz which starts a test that will quiz the user over all the different heatmaps, such as asking which country has the highest GDP, which country has the lowest population, etc, which provides the user an educational way to learn about geographic regions and their statistics. The quiz will also keep track of how many question you have answered correctly by displaying your current score.  <maps of test examples>
  * Test Examples  ![Test2D](https://github.com/Spring-2020-SoftwareEng/2-3D-Interactive-Map/blob/test/MapImages/millertest1.png) ![Test2D](https://github.com/Spring-2020-SoftwareEng/2-3D-Interactive-Map/blob/test/MapImages/millertest2.png)![Testgif](https://github.com/Spring-2020-SoftwareEng/2-3D-Interactive-Map/blob/test/MapImages/TestFunc.gif) 

* Settings
  * We have added a settings menu which comes with some options to accomadate various types of user. In settings we allow the user to determine how detailed the map is with the options Low, High, and Ultra. The settings menu also comes with the ability to toggle if the map should display every countries flag. 
  * ![Settings](https://github.com/Spring-2020-SoftwareEng/2-3D-Interactive-Map/blob/test/MapImages/millerSettings.png) ![SettingsAlt](https://github.com/Spring-2020-SoftwareEng/2-3D-Interactive-Map/blob/test/MapImages/millerSettingsalt.png)
  
# UML Diagram
 <picture of UML>

# State Chart Diagram
 ![StateChart](https://github.com/Spring-2020-SoftwareEng/2-3D-Interactive-Map/blob/test/MapImages/Statechart.png)
