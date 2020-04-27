## 2/3D Interactive Map Overview 

For our CS4398 project we have created an interactive map using a combination of Typescript, AngularJS, CSS, HTML, Python and amCharts.
  The Interactive map comes with various types of information about each country such as GDP, Population, Median Age, etc, with all information being sourced and scrapped from CIA.gov since they have reliable updated information about every country.  
 
## WebScraper
Our project utilizes a webscraper created in Python to collect relevant information and filter out unneccesary information.  Once the Webscraper locates relevant information it formats the CIA's data into data that we can use as numerical data such as replacing the word million with six zeros and other optimizations that allows for quick processing of data. While the data is being processed it is also being stored into a corresponding text file that is formated in a style that is used by our map library amCharts.  
<image of scraped files>
  
## Features
* Map Outline
  * The map has an outline feature that allows a user to toggle an outline across all the heatmaps in both map modes to provide users an easier method of differentiating between nations on certain map modes ![Outline](https://github.com/Spring-2020-SoftwareEng/2-3D-Interactive-Map/blob/test/MapImages/Outline.png)
  
* Heatmaps
  * Our map has an array of multiple colored Heatmaps that the user can select from which are usable in both a flat Miller style map or a rotatable Orthographic globe. The map allows for a user to select between population, GDP, and Median Age all of which are displayed in a different color.  <Map type Images and examples>
  
* Test Function
  * Our most impressive feature is our Test function which starts a test that will quiz you over all the different heatmaps, such as asking which country has the highest GDP, which country has the lowest population, etc, provides the user an educational way to learn about geographic regions of the world and their statistics.  <maps of test examples>
  
# UML Diagram
 <picture of UML>

# State Chart Diagram
<picture of State>
  
 
  







