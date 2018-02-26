 # ParisLumiere 
 
 By @riff4, @dmignon1907 and @alexandrospopov.

 ## Introduction
 
 During the course of Data Visualisation we were given the opportunity to design an interactive data exploration tool. 
 
 For us, is was foremost a way to dig into data exploration and tool designing. We wanted to choose a subject that would provide rich data and would match our personal interests. 
 Quickly, we noticed that we shared an interest in Cinema and we really focused in this field. 
 
 One dataset that we liked instantly was the [Paris Movie Shooting Records](https://opendata.paris.fr/explore/dataset/tournagesdefilmsparis2011/table/?refine.type_de_tournage=LONG+METRAGE&location=11,48.84663,2.34995) fro m the Paris Open Data website.
  It provided us with the basic data of every shot made in Paris in 2016. Choosing a movie, we were able to see where it had been shot in Paris. 
 
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
 We decided to focus only on movies.
 
 Unfortunately this first database is not enough for us. We wished to be able to analyse information from the movies, for instance its Genre, ratings, popularity and so on.  
 To obtain this information, we used the imDB API : [tmDB](https://www.themoviedb.org/documentation/api). 
 imDB is one the largest movie database available on the Internet, so its API seemed appropriate for our project. It gives many informations for many movies. Asking information about Fight Club lead for instance to this [page](https://api.themoviedb.org/3/movie/550?api_key=ca4eaa0dc3f34672b121a95ed7a74541).
 Still, we have to havekeep in mind that this database is US-oriented, so it is very possible that french movies are not as well documented as Fight Club.
 
 ### Data fusion and corrections
 
 ## Graphic Design 
 
 ## Using the Tool 
 
 ## Interesting results
 
 ## Perspectives & Conclusion
