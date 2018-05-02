import './WhoseOnline.css';
import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import UserApi from './UserApi';
import firebase from 'firebase';

export default class WhoseOnline extends Component {
  
  // componentWillMount() {
  //   var id = this.props.match.params.id; //game id
  //   var sessionDatabaseRef = firebase.database().ref("/session-metadata/" + id);
  //   var currentUser = firebase.auth().currentUser.uid;
  // }
  constructor(props) {
    super(props);
    this.state = {peopleName: []};
  }
  
  componentWillMount() {
    var id = this.props.session;
    var sessionDatabaseRef = firebase.database().ref("/session-metadata/" + id);
    var usersId = sessionDatabaseRef.child("users");
    console.log(usersId);
    const arrayOfAllUsersName = usersId.map(x => {
      return {
        name: UserApi.getName(x),
        img: UserApi.getPhotoUrl(x)
      }
    })
    
    this.setState({
      peopleName: arrayOfAllUsersName
    });
    
    
  }
  
  render() {
    var people= this.state.peopleName
    
    const peopleList = people.map(function(person){
      return (
        <ListItem
          primaryText={person.name}
          leftAvatar={<Avatar src={person.img} />}
        />
      )
    });
    
    return (
      <div>
        <List class="container">
        <Subheader>People Online</Subheader>
        {peopleList}
        </List>
      </div>
    );
    
  }
  
}


