## GOODGAME
http://project-goodgame.herokuapp.com/

Goodgame is an app that lets you catalog video games into user curated gamelists like "currently playing", "wishlist", and "played". A little like Goodreads or Spotify, but for video games. 

Goodgame is a full-stack, sessions based, three model CRUD application built with MVC file organization and deployed on Heroku. 

Originally, this app only consumed its own API and users had to manually enter a game's information manually when they wanted to add to their lists. Since that is not an ideal user experience, I am currently working to add a new feature where users can search for a game by name and be presented with a list of matching games from IGDB.com using the IGDB api. Once the game has been selected, users can add it to any of the gamelists they have created. 


**Technologies Used:** 
* HTML
* CSS 
* JavaScript
* jQuery
* MongoDB
* Node.js
* Express.js

**Packages Used:** 
* Mongoose
* Bcrypt
* Express Session
* Request
* EJS

**API Used:** 
* IGDB.com API

**Design**
* Bootstrap
* Font Awesome
* Slick
* Parallax

### User Stories: 
The user profile of this application is twofold:

First, general users of this application are people who wish to view other users' gamelists.

* Users land on the home page and read about how Goodgame works, see 6 sample gamelists, and contact info
* Users can navigate different views in the top navigation bar: Googdame title and logo; links to Users, Gamelists, Games,  Login, and Register. Login becomes logout once a user is logged in to the site
* Users can view other users' about page with her profile photo, bio, and gamelists
* Users can view gamelist page with details and a grid of games in a selected User's gamelist

Another user of this application is the registered user who logs in to maintain their own profile and gamelists.

* Registered users can log in to manage their content
* Registered users can edit their about page, including changing their profile photo and editing their bio
* Registered users can create a new gamelist and add games
* Registered users can add games to an existing gamelist
* Registered users can modify the contents of existing gamelists
* Registered users can delete games and gamelists


### Features In Progress:
 - [ ]  I would like to give registered users the ability to rate another user's gamelists
 - [ ]  When users view a gamelists, the average rating from site users is displayed
 - [ ]  I would then use this rating to display the top 6 rated games on the homepage
 - [ ]  Locking down the responsiveness for all display sizes and medium
