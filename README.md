### [LIVE APP](https://mongotomeeting.herokuapp.com/)

# MonGoToMeeting
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
#### MonGoToMeeting is a real-time chat and meeting collaboration tool.  Focus on your meeting, not taking notes!

## Tech Stack
- [Node.js](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) and [Mongoose](https://mongoosejs.com/)
- [React](https://facebook.github.io/react/) and React Hooks
- [Redux](https://redux.js.org/)
- [React-DnD](https://react-dnd.github.io/react-dnd/about)
- [Socket.io](http://socket.io/)
- [Webpack](https://webpack.js.org/)
- [Grommet (UI)](https://https://v2.grommet.io/)

## Local Setup

1. Run `git clone https://github.com/Maxwell-Han/MonGoToMeeting.git` and navigate to the project folder with cd MonGoToMeeting
2. Run npm install
3. If MongoDB is not installed locally you will need to install it with `brew install mongodb-community@4.2`
4. Run MongoDB locally with the command`brew services start mongodb-community` To stop the database server run `brew services stop mongodb-community`
5. Run `npm run start-dev` to start the app on http://localhost:8080/

## How to Use
1. Sign up as a new user or sign in (as an existing user or guest)
2. Join a previously existing room or create a new room and select contacts to add
3. Add new meeting items or work through old ones
4. Mark off completed items and continue on with your meeting

## Features
- Room based live chat
- Shared meeting spaces providing real-time interactivity via voting, brainstorming, and rating
- Add drag-and-droppable meeting items to your room
- Select one or multiple items as the current discussion item
- Desktop like UI with resizable components
- Local and Google auth options

