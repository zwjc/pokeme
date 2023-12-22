# PokéMe
Welcome to PokéMe!


Try it here:
https://pokeme-dh2642.web.app/

## How to Setup

1. install packages and dependencies

```
npm install
```

2. start development server

```
npm run dev
```

3. Point your browser to HTML address: 

http://localhost:8080/react.html

## About PokéMe

An interactive web application designed for Pokémon enthusiasts. The app provides a fun and engaging personality test for finding users the matching Pokemons. Also, the website offers detailed information about each Pokémon. Users can take the test, get their Pokémon match, and explore a database of Pokémon details.

## What We Have Done

- User interface, navigation between different views (Home, Test, History, etc.).
- Interactions between user and the interface.
- Responsive CSS designs for UX across different devices.
- Fetch and display a list of Pokémon item through PokeAPI.
- Sharing feature(share to Facebook).
- Login&Register logic.
- User authentication to enable saving test results and viewing history.
- Collected user feedbacks with current application.
- Improve UI design, add effect and animation. 
- Set up the OpenAI API to analyze test results and suggest a matching Pokémon.

## Project Structure

```
.
├── public      // Serve static files
│   └── favicon.ico         // Website icon
├── src         // The main source directory for the application's code
│   ├── assets
│   │   └── images                    // Images used in the application
│   ├── model
│   │   ├── PokemeModel.js            // The model for the application
│   │   ├── firebaseModel.js          // Handles interactions with Firebase for authentication and database services
│   │   ├── openai
│   │   │   └── GetPersonalityMatch.js          // Handles personality matching using OpenAI
│   │   ├── pokemonService.js         // Service for making API requests to the PokeAPI
│   │   ├── questions.js              // Personality test 20 question
│   │   └── resolvePromise.js         // Utility for resolving promises, potentially used to handle asynchronous operations
│   ├── presenter
│   │   ├── ReactRoot.jsx             // Root component for React
│   │   ├── historyPresenter.jsx      // Manage the presentation logic for the user's history of interactions or test results
│   │   ├── homePresenter.jsx         // Manage the presentation logic for the home view, including API interactions for displaying Pokémon
│   │   ├── index.jsx                 // The entry point for React components
│   │   ├── loginPresenter.jsx        // Manage the presentation logic for user login
│   │   ├── startPresenter.jsx        // Manage the presentation logic for start view
│   │   ├── registerPresenter.jsx     // Manage the presentation logic for user registration
│   │   ├── testPresenter.jsx         // Manage the presentation logic for conducting tests
│   │   └── testResultPresenter.jsx   // Manage the presentation logic for displaying results
│   ├── style.css           // The main stylesheet for the application, containing global styles and CSS variables
│   ├── effect.css           // Contains animations and effects
│   ├── utilities.js        // General utility functions used across the application
│   └── views               // Contains the main view components that represent entire pages or large parts of pages
│       ├── components                // Custom components used across different views
│       │   ├── banner.jsx                      // Component for the banner
│       │   ├── historyItem.jsx                 // Component for displaying history items
│       │   ├── inputform.jsx                   // Component for input forms
│       │   ├── pokeItem.jsx                    // Component for displaying Pokemon items
│       │   ├── testItem.jsx                    // Component for displaying test items
│       │   └── topbar.jsx                      // Component for the top bar
│       ├── historyView.jsx           // The history page view displays user's test history
│       ├── homeView.jsx              // The home page view displays pokeItems and contains entrance to the test
│       ├── loginView.jsx             // View components for user login
│       ├── startView.jsx             // View first shows up when the application starts
│       ├── promiseNoData.jsx         // View display according to status
│       ├── registerView.jsx          // View components for user registration
│       ├── testResultsView.jsx       // Displays the results of the personality test
│       └── testView.jsx              // The view for conducting the personality test
│── vite.config.js  // Configuration file for Vite
├── package.json    // File containing project metadata and dependencies
```
