# OMDB React App
Test client &amp; server-side application for querying the OMDb API

## Installation instructions
1. Clone the entire project
2. `cd server`
3. Follow the instructions in the server `README.md`
4. `cd client`
5. `npm install`
6. `npm start`

## Application overview
The application is delivered via two directories (in reality the server running in somewhere like Heroku) with the client
being deployed via a front-end platform as a service like Netlify.

### Server
The server is a GraphQL abstraction layer for the OMDB API and is built using `node` and `express` JS. It supports a single
query (currently) of searching by a given search parameter.

### Client
The client is a ReactJS application which will allow a user to search for movies and add them to their Top 9 movies.
When a user selects a movie it is stored in `localStorage` under the key `omdb-movies` for a permanent persistence model.
They are able to manage their Top 9 movies via the button in the top right, which will load a modal containing the rendered
localStorage items.

#### Functional points
* A maximum of 9 movies is allowed
* `alert()` functionality is in place for a variety of scenarios such as successful additions, duplicate entries and exceeding the maximum storage limit (i.e. 9)
* State of modal is handled via `App.js` with a parent/child relationship to the `Top.js` component

#### Future improvements

Technical Architecture
* Unify approach with components, currently in the app there `const () => {}` and `class Name extends React.Component` syntax.
* Add paging parameter to `server` and `client` to allow for pagination when searching movies.
* Database / API model to store a users top movies so they can persist across browsers / devices.

UI/UX
* Remove `alert()` functionality for nicely styled application modals
* Installation of `SCSS` to go hand in hand with existing BEM CSS methodology.
* Helper classes to remove repeat lines of CSS.
* Use of icon library to improve UI.
