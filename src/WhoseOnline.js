import './WhoseOnline.css';
import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
// import firebase from 'firebase';

export default class WhoseOnline extends Component {
  
  // componentWillMount() {
  //   var id = this.props.match.params.id;
  //   var sessionDatabaseRef = firebase.database().ref("/session/" + id);
  //   var currentUser = firebase.auth().currentUser.uid;
  // }
  
  componentWillMount() {
   

    
  }
  
  render() {
    const people = [
      {
        name: "Brendan",
        img: "sssfdf"
      },
      {
        name: "Brendan",
        img: "sssfdf"
      }
    ]
    
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


