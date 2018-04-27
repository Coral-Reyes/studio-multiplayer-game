// import Avatar from 'material-ui/Avatar';
// import Divider from 'material-ui/Divider';
// import FlatButton from 'material-ui/FlatButton';
// import React, { Component } from 'react';
// import Subheader from 'material-ui/Subheader';
// import UserApi from './UserApi.js';
// import firebase from 'firebase';
// import gameData from './gameData.js';
// import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card';
// import { Link } from 'react-router-dom';
// import { List, ListItem } from 'material-ui/List';

// export default class GameCard extends Component {
//   getTitle() {
//     return gameData[this.props.session.type].title;
//   }

//   getSubtitle() {
//     var date = new Date(this.props.session.timestamp);
//     var options = {
//       day: "numeric",
//       hour: "numeric",
//       minute: "numeric",
//       month: "long",
//       second: "numeric",
//       timeZone: "America/New_York",
//       weekday: "long",
//       year: "numeric",
//     };
//     var dateString = new Intl.DateTimeFormat("en-US", options).format(date);
//     var creator = UserApi.getName(this.props.session.creator);
//     return "Created on " + dateString + " by " + creator;
//   }

//   getAuthors() {
//     var authors = gameData[this.props.session.type].authors;
//     return "This game was created by " + authors;
//   }

//   getDescription() {
//     return gameData[this.props.session.type].description;
//   }

//   getUserListHeader() {
//     var numUsers = this.props.session.users.length;
//     var maxUsers = gameData[this.props.session.type].maxUsers;
//     return numUsers + "/" + maxUsers + " users waiting to start";
//   }

//   getGamePath() {
//     var type = this.props.session.type;
//     var id = this.props.session.id;
//     return "/" + type + "/" + id;
//   }

//   joinSession() {
//     var uid = firebase.auth().currentUser.uid;
//     var path = "/session-metadata/" + this.props.session.id + "/users";
//     var sessionDatabaseRef = firebase.database().ref(path);
//     sessionDatabaseRef.transaction((users) => {
//       if (users.indexOf(uid) < 0) {
//         users.push(uid);
//       }
//       return users;
//     }).catch((error, committed, snapshot) => {
//       console.error("Error removing session metadata", error);
//     });
//   }

//   deleteSession() {
//     var path = "/session-metadata/" + this.props.session.id;
//     var sessionDatabaseRef = firebase.database().ref(path);
//     sessionDatabaseRef.remove().catch((error) => {
//       console.error("Error removing session metadata", error);
//     });
//   }

//   isGameCreator() {
//     var user = firebase.auth().currentUser;
//     return user.uid === this.props.session.creator;
//   }

//   isInSession() {
//     var uid = firebase.auth().currentUser.uid;
//     return this.props.session.users.indexOf(uid) >= 0;
//   }

//   shouldShowStartButton() {
//     var users = this.props.session.users;
//     var minUsers = gameData[this.props.session.type].minUsers;
//     return this.isInSession() && users.length >= minUsers;
//   }

//   isFull() {
//     var users = this.props.session.users;
//     var maxUsers = gameData[this.props.session.type].maxUsers;
//     return users.length >= maxUsers;
//   }

//   render() {
//     var userListItems = this.props.session.users.map((uid) => (
//       <ListItem
//           key={uid}
//           disabled={true}
//           primaryText={UserApi.getName(uid)}
//           leftAvatar={<Avatar src={UserApi.getPhotoUrl(uid)} />} />
//     ));

//     var joinOrStartButton;
//     if (this.shouldShowStartButton()) {
//       var target = {
//         pathname: this.getGamePath(),
//         state: {
//           id: this.props.session.id,
//           creator: this.props.session.creator,
//           users: this.props.session.users
//         }
//       }
//       joinOrStartButton = (
//         <Link to={target}>
//           <FlatButton label="Start game" primary={true} />
//         </Link>
//       );
//     } else {
//       joinOrStartButton = (
//         <FlatButton
//             label={this.isFull() ? "Game is full" : "Join"}
//             onClick={() => this.joinSession()}
//             disabled={this.isInSession() || this.isFull()} />
//       );
//     }

//     return (
//       <Card style={this.props.style}>
//         <CardTitle
//             title={this.getTitle()}
//             subtitle={this.getSubtitle()}
//             actAsExpander={true}
//             showExpandableButton={true} />
//         <CardText expandable={true}>
//           <p>{this.getDescription()}</p>
//           <Divider />
//           <List>
//             <Subheader>{this.getUserListHeader()}</Subheader>
//             {userListItems}
//           </List>
//           <Divider />
//           <p style={{fontSize: 10}}>{this.getAuthors()}</p>
//         </CardText>
//         <CardActions>
//           {joinOrStartButton}
//           <FlatButton
//               label="Delete"
//               onClick={() => this.deleteSession()}
//               disabled={!this.isGameCreator()} />
//         </CardActions>
//       </Card>
//     );
//   }
// }

// import ChatRoom from './ChatRoom.js';
// import TicTacToe from './TicTacToe.js';
// import RockPaperScissors from './RockPaperScissors.js';
// import Draw from './Draw.js';

// const gameData = {

//   chatroom: {
//     title: "Chat Room",
//     authors: "Joe Tessler",
//     description: "A place to chat with a group of friends",
//     minUsers: 1,
//     maxUsers: 10,
//     component: ChatRoom,
//   },

//   tictactoe: {
//     title: "Tic Tac Toe",
//     authors: "Joe Tessler",
//     description: "The classic two-player game with Xs and Os",
//     minUsers: 2,
//     maxUsers: 2,
//     component: TicTacToe,
//   },

//   rockpaperscissors: {
//     title: "Rock Paper Scissors",
//     authors: "Devraj Mehta",
//     description: "Class 2-player rock paper scissors",
//     minUsers: 2,
//     maxUsers: 2,
//     component: RockPaperScissors,
//   },
  
//   draw: {
//     title: "Draw",
//     authors: "Coral-Reyes, fsanchez2334, rocketkevin",
//     description:"It is a multiplayer game where one is the artist. They must draw a picture based on a random word given and the rest of the players must guess the word.",
//     minUsers: 1,
//     maxUsers: 10,
//     component: Draw,
//   },

// };

// export default gameData;
