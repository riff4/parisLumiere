 # ParisLumiere 
 
 By @riff4, @dmignon1907 and @alexandrospopov.
 <br />

![general screenshot](https://github.com/alexandrospopov/parisLumiere/blob/master/img/general.png)

[Here you can find a Youtube presentation](https://www.youtube.com/watch?v=BnF7W-Ewgys&feature=youtu.be)

 ## Introduction
 
 During the course of Data Visualisation we were given the opportunity to design an interactive data exploration tool. 
 
 For us, is was foremost a way to dig into data exploration and tool designing. We wanted to choose a subject that would provide rich data and would match our personal interests. 
 Quickly, we noticed that we shared an interest in Cinema and we really focused in this field. 
 
 One dataset that we liked instantly was the [Paris Movie Shooting Records](https://opendata.paris.fr/explore/dataset/tournagesdefilmsparis2011/table/?refine.type_de_tournage=LONG+METRAGE&location=11,48.84663,2.34995) from the Paris Open Data website.
  It provided us with the basic data of every shot made in Paris in 2016. Choosing a movie, we were able to see where it had been shot in Paris. 
  
 ![opendata screenshot](https://github.com/alexandrospopov/parisLumiere/blob/master/img/opendata.png)
 
 There were so many questions we could finally answer ! What movies have been shot close to my work or my home ? Where are the movies shot in winter and in spring ? Are movies only in touristic areas ? Where are shot the best movies in Paris ? Does any director know about my most romantic spot in Paris ..? 
 
 The decision had been made : we would design a tool to discover how directors see our City of Lights.
 
 ## Data Acquisition
 
 ### Sources of information 
 
 Our initial source of information ist the [Paris Movie Shooting Records](https://opendata.paris.fr/explore/dataset/tournagesdefilmsparis2011/table/?refine.type_de_tournage=LONG+METRAGE&location=11,48.84663,2.34995) that we have exported as a `JSON` file. 
 This first input provided us with the following information for every shot :
  - **title**
  - **director**
  - shot adress
  - company
  - **type of the movie shot**
  - **district**
  - **date of beginning** 
  - **date of ending** 
  - **latitude/longitude**
  
 It is worth noticing that this adress the shot for different types of motion pictures : movie, but also series and TV shows. 
 We decided to focus only on movies. In terms of figures, our dataset is made of : 
 - 118 movies
 - 1851 shots
 
 Unfortunately this first database is not enough for us. We wished to be able to analyse information from the movies, for instance its Genre, ratings, popularity and so on.  
 To obtain this information, we used the imDB API : [tmDB](https://www.themoviedb.org/documentation/api). 
 imDB is one the largest movie database available on the Internet, so its API seemed appropriate for our project. It gives many informations for many movies. Asking information about Fight Club lead for instance to this [page](https://api.themoviedb.org/3/movie/550?api_key=ca4eaa0dc3f34672b121a95ed7a74541).
 
 ![tmdb logo]( https://s2.qwant.com/thumbr/0x0/5/7/0ff55ead5ffa0c28e85a2b593b18d3/b_1_q_0_p_0.jpg?u=http%3A%2F%2Fwww.team-mediaportal.com%2Fimages%2Fstories%2FhomepageV3%2Farticles%2Fsponsors%2Ftmdb-logo-2.png&q=0&b=1&p=0&a=1)


 
 Still, we have to havekeep in mind that this database is US-oriented, so it is very possible that french movies are not as well documented as Fight Club.
 
 ### Data fusion and corrections
 
 At this point we have the Paris Open Data `JSON` file and the tmDB API. 
 In order to add to every movie in the Paris Open Data its tmDB information; we will proceed in several steps.
 
 At first, we will query the API though the Python Package : [tmDB Simple](https://pypi.python.org/pypi/tmdbsimple) using the movie title. 
 
 This first step provides a great amount of new data. But it needs processing. Indeed we face two kinds of issues : 
 - **several movies for one title** : the API provides several references for one title. We have to choose manualy which one is the right one. 
 - **missing information** : as we have feared, tmDB is unable to provide us with all the information we have dreamed of. In some cases because the database is uncomplete, in other cases because the information does not exist yet: the movie is not out or has been canceled. 
  
 The second issue leads us to carefully choose what information we wish to add to every movie. We decided to add only the genre and the ratings. 
 To deal with the latter issue, we chose to inspect manually every movie with missing information ( about 40 out of 115) and add manually if it exists using the site [SensCritique](https://www.senscritique.com/).
 
  ![tmdb logo](  https://s1.qwant.com/thumbr/0x0/0/5/0114a7edba26ac26ff9a8ef3e6916d/b_1_q_0_p_0.jpg?u=https%3A%2F%2Fwww.digischool.fr%2Fimages%2Farticle%2F4948_1.jpg&q=0&b=1&p=0&a=1)

 
 This entire pipeline was handled using Python.
 
 ### Data presentation
 
 Finally, we reach the following dataset :
 
| Movies | Shots | Movies with missing information |
| ------------- | ------------- | ------------- |
| 118  | 1851 | 39 (33%) |

 
 ## Graphic Design 
 
 First, we obviously chose to show a map with the distribution of all shootings locations in Paris.
 Then, based on the different informations we have been able to get, we chose to let the user be able to filter the data on 4 criterias : the dates of shootings, the ratings of the movies, the borough of the shooting and the genre of the movies.
 
 ### Map
 
 The map used comes from a javascript API for Google Maps. We added the filming locations as circles colored in function of the filming time with the same color scale as the time histogram.
 
 We also added a tooltip when the mouse is on a point to display the following informations : the title of the movie, the film director, starting and the ending dates of the shooting, the genre and the rating of the movie.
 
![alt tag](https://github.com/alexandrospopov/parisLumiere/blob/master/img/map.png)
 
 ### Tickboxes
 
 To filter the shooting based on the genre criteria, we chose tickboxes which seemed to be the easiest and the most userfriendly way to go. It directly sorts out the points on the map.
 
 ### Histograms
 
 To display the distribution of the ratings and shooting times, we used simple bar charts with the d3.histogram function. We added two brushes to let the possibility to the user to filter them as he wishes. Again, the points on the map are affected by those filters.
 At this point, the filter applied by using the checkboxes do not have effect on the histograms' information.

![alt tag](https://github.com/alexandrospopov/parisLumiere/blob/master/img/histograms.png)
 
 ### Scatterplot
 
 To complete the map visualisation, we made a scatter plot with the timeline and borough as coordinates. We linked this plot with the two brushes for more interactivity.
 
![alt tag](https://github.com/alexandrospopov/parisLumiere/blob/master/img/scatterplot.png)
 
 ## Using the Tool 
 Our tool is quite simple to use. You can use it directly on <a href="https://riff4.github.io/parisLumiere/main_layout.html">this link</a>.<br>
 The first time you arrive on the page, you have first to move a slider to show the points on the map.
 Then you can use our three filters which enable you to display movies according its type, its score and the time it was shot. 
 The filters are dynamicaly applied on the maps.
 
  ![alt tag](https://github.com/alexandrospopov/parisLumiere/blob/master/img/3_filters.JPG)
 
 By combining those three filters, our tool helps you to answer to complex questions such as : 
 <ul>
 <li>What movies have been shot close to my work or my home ? </li>
 <li>Where are the movies shot in winter and in spring ?</li>
 <li>What kind of movies are shot in winter in the center of the city? </li>
 <li>Where and when are shot the best movies in Paris ?</li>
 </ul>
 
 Then, when you have spotted an interesting shooting, just moove your mouse on and you will see what are the other shootings linked to this movie, and the details information. 
 
 In the following example, I decided to spot the best drama shot during the summer : 
 
  ![alt tag](https://github.com/alexandrospopov/parisLumiere/blob/master/img/example1.JPG)
 
 ## Interesting results
 
By using the Paris Lumière project, some interesting results came to us. 

We noticed that there were by far, much more Comedy shootings than Action or Thriller.

If you visualize the evolution of the shooting places, months after months throughout the year, you will see that during winter the shooting places are globaly spread whereas during summer the shooting places are gathered around the center of paris.

Finally, we noticed that shootings were widespread through the city. The directors do not sum up Paris to the Eiffel Tower !

 
 ## Perspectives & Conclusion

Sure our visualisation is not perfect. They are several points we would have like to improve.

First of all, the Google Maps API showed some issues and doen't work always properly and we didn't find any solutions for it.

Our second problem is somehow linked with the first. To make the visualisation clearer, we wanted to link the histograms with tickboxes. For example, when only the drama box is ticked, the histograms should have taken in count only the shootings of dramatic movies. We achieved to do so, but it made our problem with the Google Maps API way worse than it actually is, therefore we're not pushing this version now.

We had also two issues with the data. First of all, we don't have that much data to characterize the movies. We have only been able to get a note and a genre for the movies, furthermore we haven't been able to get this data for each movies, only for a minority for each. What could be interessant is to get some more informations like the budget or the profit, and to do so for every movies.

Finally, each points represent one shooting. It's what we need for the map, and we add interaction to show only the movie selected shootings on the map when the cursor is on one of the points. But it is obviously biaising our histograms since it takes it counts the number shootings and not the number of movies. It could have been intesting to group the shooting points of the same movie in this visualisation.
