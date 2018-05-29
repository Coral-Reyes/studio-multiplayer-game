import './WhoseOnline.css';
import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
// import UserApi from './UserApi';
// import firebase from 'firebase';

export default class WhoseOnline extends Component {
  
  // componentWillMount() {
  //   var id = this.props.match.params.id; //game id
  //   var sessionDatabaseRef = firebase.database().ref("/session-metadata/" + id);
  //   var currentUser = firebase.auth().currentUser.uid;
  // }
  // constructor(props) {
  //   super(props);
  // }
  
  render() {
    var people= this.props.peopleNames;
    const peopleList = people.map(function(person,i){
      return (
        <ListItem key={i}
          primaryText={person.name}
          leftAvatar={<Avatar src={person.img} />}
        />
      );
    });
    
    return (
      <div>
        <List className="container">
        <Subheader>People Online</Subheader>
        {peopleList}
        </List>
      </div>
    );
    
  }
  
}


