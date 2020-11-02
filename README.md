<img src=https://user-images.githubusercontent.com/21346239/91862876-7bf3f580-ec3c-11ea-94d6-5236f3867a9c.png width="168" height="168">
M. Chandonnet // GA - SEI // Project #4 (Final Project) // Yahtzee Game

# Yahtzee!

A Yahtzee ( [Click HERE for API](https://github.com/mchandonnet/yahtzee_api) )
1. If Required, register a new user
2. Login to the Game
3. Click the the link to start a new game
4. Play the game of Yahtzee! ( [Click HERE for game rules](https://www.ultraboardgames.com/yahtzee/game-rules.php) )

![Game-Screenshot](https://user-images.githubusercontent.com/21346239/97820443-2f4c8b00-1c7c-11eb-9ed6-b29060ec36a1.png)


# Setup and Installation
1. Fork and clone this repository.
2. Change into the new directory.
3. Install dependencies using npm install.
4. Create and checkout a new branch

## Technologies Used

This project was buillt using: HTML5, CSS, SCSS, Bootstrap, Javascript, jQuery, Ajax, Express


## Planning

Initial planning involved a Review of the the scoping and requirets documentation.  This information was used to build user stories and wireframes to create a visual representation of that application.

Devlopment started with creating a basic HTML shell laying out the basic views of the app, including a calendar.  Once the layout was complete, the focus moved to the user side of the application - User creation, user Login, and Password Changes.  Then it was on to calendar views and working to configure different event listeners and event handlers to enable the daily calendar view and the all events calendar view.  Then on to forms for creation, deletion, and modification of events...  a little more cleanup of HTML and SaSS to make things look a little better, and lots and lots of testing to find and fix minor bugs, validate that all requirements were being met.


##### The following files were created and used in this project

+ ./index.html: HTML page - presents the UI to the user

+ ./assets/styles/index.scss: CSS / SaSS - formats the HTML

+ ./assets/scripts/api.js: JavaScript file that makes calls to the API for collecting and updating data

+ ./assets/scripts/app.js: JavaScript file that creates onClick events for the HTML page

+ ./assets/scripts/config.js: JavaScript file that is used for defining URL strings for the API calls

+ ./assets/scripts/events.js: JavaScript file that contains Event handlers - called from app.js

+ ./assets/scripts/gameplay.js: Javascript file that controls the flow on logic for the game

+ ./assets/scripts/scoring.js: Javascript file that handles the logic for scoring

+ ./assets/scripts/store.js: JavaScript file that stores variables that are needed globally

+ ./assets/scripts/ui.js: JavaScript file that handles promise functions for API calls



## Unsolved Problems

There are a few additional features that I'd like to add, but as far as the technical requirements, I think that i got them all...


## Additional Features in the works...

+ There are a few UI enhancements that I think can be made
+ I'd love to be able to add the ability for online mulit-player


#### Wireframes

![Yahtzee-Wireframe](https://user-images.githubusercontent.com/21346239/97820297-7ede8700-1c7b-11eb-8f2d-b0d2a7aa69e4.png)


#### User Stories

+ Users can create a new account / sign-up
+ Existing users can change their password
+ Existing users can log in
+ Logged in users can log out
+ Logged in users can view high scores
+ Logged in users can create and play a game