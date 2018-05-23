// import React, {Component} from 'react';
// // import RaisedButton from 'material-ui/RaisedButton';
// import UserApi from './UserApi.js';
// // import Avatar from 'material-ui/Avatar';
// // import { List, ListItem } from 'material-ui/List';
// import firebase from 'firebase';
// import WhoseOnline from './WhoseOnline.js';
// // import './Data.css';
// import randomWords from 'random-words';
// import './Draw.css';

// export default class Draw extends Component {


//  constructor(props) {
//     super(props);
//     this.state = 
//     {
//       prevX: 0,
//       currX: 0,
//       prevY: 0,
//       currY: 0,
//       randomWord: "",
//       inputvalue: "",
//       repeat: "",
//       drawer: "",
//       peopleNames: [],
//       color: "#000",
//       canvasimg: "",
//     };
//     // console.log(randomWords());
    
//  }
 
//   componentWillMount() {
//     var id = this.props.match.params.id;
//     var sessionDatabaseRef = firebase.database().ref("/session-metadata/" + id);
//     // var sessionStorageRef = firebase.storage().ref("/session-metadata/" + id);
//     var usersId = sessionDatabaseRef.child("users");
//     usersId.on("value", (snapshot) => {
//       var container = snapshot.val();
//       const arrayOfAllUsersName = container.map(x => {
//         return {
//           name: UserApi.getName(x),
//           img: UserApi.getPhotoUrl(x)
//         };
//       });
//       this.setState({
//         peopleNames: arrayOfAllUsersName
//       });
//     });
//     sessionDatabaseRef.child("words").on("value", (snapshot) => {
//       var storage = snapshot.val(); 
//       this.setState({
//       randomWord: storage
//       });       
//     });

//     // sessionDatabaseRef.child("img").on("value", (snapshot) => {
//     //     var container = "";
//     //   sessionStorageRef.getDownloadURL().then(function(url) {
//     //     container = url;
//     //       console.log(url);
//     //   });
//     //     this.setState({
//     //         canvasimg: container
//     //     });
      
//     // });
    
    
    
//   }  
 
//  componentDidMount(){
//         var id = this.props.match.params.id;
//         var sessionDatabaseRef = firebase.database().ref("/session-metadata/" + id);
//         var sessionStorageRef = firebase.storage().ref("/session-metadata/" + id);
//         sessionDatabaseRef.child("img").on("value", (snapshot) => {
//             const canvas = this.refs.canvas; 
//             var ctx = canvas.getContext('2d');
//             var img = new Image();
//             img.crossOrigin = "Anonymous";
//             sessionStorageRef.getDownloadURL().then(function(url) {
//                 // const canvas = this.refs.canvas;
//                 img.src = (url);
//             });
//             img.onload = function() {
//                 ctx.drawImage(img, 0, 0);
//             };
//         });
//  }
 
 
//  componentDidUpdate() {
//   console.log(this.state.mouseDown);
//     if(this.state.mouseDown) {
//         this.draw();
//     }
//  }
 

 
// canvasSave() {
//         const canvas = this.refs.canvas;
//         // const ctx = canvas.getContext('2d');
//         var imgData = canvas.toDataURL();
//         console.log(imgData);
//         var id = this.props.match.params.id;
//         var sessionDatabaseRef = firebase.database().ref("/session-metadata/" + id);
//         var sessionStorageRef = firebase.storage().ref("/session-metadata/" + id);
//         sessionStorageRef.putString(imgData, 'data_url').then(function(snapshot) {
//             console.log('Uploaded a data_url string!');
//             sessionDatabaseRef.child("img").set(true);
//             sessionDatabaseRef.child("img").set(false); 
//         });
// }
 
// //   pasteCanvas() {
// //   const canvas = this.refs.canvas;
// //   const ctx = canvas.getContext('2d');
// //   var img = this.state.canvasimg;
// //   console.log(img);
// //   ctx.putImageData(img,0,0);
// //   }
 
//  firstDrawer() {
//   this.setState({
//     drawer: this.state.peopleNames[0]
//   });
//  }

//  genWord(){
//   var words = randomWords();
//   var id = this.props.match.params.id;
//   var sessionDatabaseRef = firebase.database().ref("/session-metadata/" + id);
//   sessionDatabaseRef.update({words: words});
//  }
 
//  resetCanvas(){
//     const canvas = this.refs.canvas;
//     const ctx = canvas.getContext('2d');
//     ctx.clearRect(0,0,400,400);
//  }

// resetAndSave(){
//     this.resetCanvas();
//     this.canvasSave();
// }

//  getInputValue(){
//   var x = document.getElementById("guess").value;
//   this.setState({
//   inputvalue: x
//   });
//  }
 
//  wins(){
//   if (this.state.inputvalue === this.state.randomWord) {
//     this.genWord();
//     this.resetAndSave();
    
//      // this.canvasSave();
//   } else {
//      this.setState({
//       repeat: "False"
//      }); 
//   }
//  }

//  draw() {
//       const canvas = this.refs.canvas;
//       const ctx = canvas.getContext('2d');
//       ctx.beginPath();
//       ctx.arc(
//         this.state.currX - canvas.offsetLeft - 1,
//         this.state.currY - (canvas.offsetTop + 60),
//         5, 0,
//         Math.PI * 2, 
//         true
//       );
//       ctx.lineWidth = 2;
//       ctx.strokeStyle= this.state.color;
//       ctx.fillStyle = this.state.color; 
//       ctx.fill();
//       ctx.stroke();
//       ctx.closePath();
//  }


// onMouseMoved(e){
//   e.stopPropagation();
//   this.setState({
//       currX: e.screenX,
//       currY: e.screenY,
//   });
// }

// onMouseDown(e){
//   e.stopPropagation();
//   this.setState({
//       mouseDown: true
//     });
//   console.log(this.state.mouseDown);
// }

// onMouseUp(e){
//   e.stopPropagation();
//   this.setState({
//       mouseDown:false
//     });
//   console.log(this.state.mouseDown);
// }

// getRandomColor(){
//   var letters= "0123456789ABCDEF";
//   var color = "#";
//   for (var i = 0; i < 6; i++ ) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     this.setState({
//      color: color
//     });
//  }
 
//  render() {
//     return (
//     <div className="container">
//     <div className="title">
//         <h1>Draw</h1>
//     </div>
//      <div className="site">
//         <div id="online">
//         <button onClick={this.genWord.bind(this)}>New Word</button>
//         <p>{this.state.randomWord}</p>
//         <input type="text" id="guess" onChange={this.getInputValue.bind(this)}/>
//          <p>{this.state.inputvalue}</p>
//         <button onClick={this.wins.bind(this)}>Compare Answers</button>
//          <p>{this.state.repeat}</p>
//          <WhoseOnline id="names" peopleNames={this.state.peopleNames} session={this.props.match.params.id}/>
//         </div>
//         <div id="canvas">
//          <canvas ref="canvas" onMouseDown={this.onMouseDown.bind(this)} onMouseUp={this.onMouseUp.bind(this)} onMouseMove={this.onMouseMoved.bind(this)} id="can" width="400" height="400"></canvas>
//          <button onClick={this.getRandomColor.bind(this)}> Change Color </button>
//          <button onClick={this.canvasSave.bind(this)}> Copy & Send </button>
//          <button onClick={this.resetAndSave.bind(this)}> Reset Canvas </button>
//          {/*<button onClick={this.pasteCanvas.bind(this)}> Change Img </button>*/}
//         </div>
//      </div>
//      </div>
    
//     );
//   }
// }

// /*
 
//  // var canvas, ctx, flag = false,
//  //        prevX = 0,
//  //        currX = 0,
//  //        prevY = 0,
//  //        currY = 0,
//  //        dot_flag = false;

//  //    var x = "black",
//  //        y = 2;
    
//  //    function init() {
//  //        canvas = document.getElementById('can');
//  //        ctx = canvas.getContext("2d");
//  //        w = canvas.width;
//  //        h = canvas.height;
    
//  //        canvas.addEventListener("mousemove", function (e) {
//  //            findxy('move', e)
//  //        }, false);
//  //        canvas.addEventListener("mousedown", function (e) {
//  //            findxy('down', e)
//  //        }, false);
//  //        canvas.addEventListener("mouseup", function (e) {
//  //            findxy('up', e)
//  //        }, false);
//  //        canvas.addEventListener("mouseout", function (e) {
//  //            findxy('out', e)
//  //        }, false);
//  //    }
    
//  //    function color(obj) {
//  //        switch (obj.id) {
//  //            case "green":
//  //                x = "green";
//  //                break;
//  //            case "blue":
//  //                x = "blue";
//  //                break;
//  //            case "red":
//  //                x = "red";
//  //                break;
//  //            case "yellow":
//  //                x = "yellow";
//  //                break;
//  //            case "orange":
//  //                x = "orange";
//  //                break;
//  //            case "black":
//  //                x = "black";
//  //                break;
//  //            case "white":
//  //                x = "white";
//  //                break;
//  //        }
//  //        if (x == "white") y = 14;
//  //        else y = 2;
    
//  //    }
    
//  //    function draw() {
//  //        ctx.beginPath();
//  //        ctx.moveTo(prevX, prevY);
//  //        ctx.lineTo(currX, currY);
//  //        ctx.strokeStyle = x;
//  //        ctx.lineWidth = y;
//  //        ctx.stroke();
//  //        ctx.closePath();
//  //    }
    
//  //    function erase() {
//  //        var m = confirm("Want to clear");
//  //        if (m) {
//  //            ctx.clearRect(0, 0, w, h);
//  //            document.getElementById("canvasimg").style.display = "none";
//  //        }
//  //    }
    
//  //    function save() {
//  //        document.getElementById("canvasimg").style.border = "2px solid";
//  //        var dataURL = canvas.toDataURL();
//  //        document.getElementById("canvasimg").src = dataURL;
//  //        document.getElementById("canvasimg").style.display = "inline";
//  //    }
    
//  //    function findxy(res, e) {
//  //        if (res == 'down') {
//  //            prevX = currX;
//  //            prevY = currY;
//  //            currX = e.clientX - canvas.offsetLeft;
//  //            currY = e.clientY - canvas.offsetTop;
    
//  //            flag = true;
//  //            dot_flag = true;
//  //            if (dot_flag) {
//  //                ctx.beginPath();
//  //                ctx.fillStyle = x;
//  //                ctx.fillRect(currX, currY, 2, 2);
//  //                ctx.closePath();
//  //                dot_flag = false;
//  //            }
//  //        }
//  //        if (res == 'up' || res == "out") {
//  //            flag = false;
//  //        }
//  //        if (res == 'move') {
//  //            if (flag) {
//  //                prevX = currX;
//  //                prevY = currY;
//  //                currX = e.clientX - canvas.offsetLeft;
//  //                currY = e.clientY - canvas.offsetTop;
//  //                draw();
//  //            }
//  //        }
//  //    }*/

// // import ChatRoom from './ChatRoom.js';
// // import TicTacToe from './TicTacToe.js';
// // import RockPaperScissors from './RockPaperScissors.js';
// // import Draw from './Draw.js';

// // const gameData = {

// //   chatroom: {
// //     title: "Chat Room",
// //     authors: "Joe Tessler",
// //     description: "A place to chat with a group of friends",
// //     minUsers: 1,
// //     maxUsers: 10,
// //     component: ChatRoom,
// //   },

// //   tictactoe: {
// //     title: "Tic Tac Toe",
// //     authors: "Joe Tessler",
// //     description: "The classic two-player game with Xs and Os",
// //     minUsers: 2,
// //     maxUsers: 2,
// //     component: TicTacToe,
// //   },

// //   rockpaperscissors: {
// //     title: "Rock Paper Scissors",
// //     authors: "Devraj Mehta",
// //     description: "Class 2-player rock paper scissors",
// //     minUsers: 2,
// //     maxUsers: 2,
// //     component: RockPaperScissors,
// //   },
  
// //   draw: {
// //     title: "Draw",
// //     authors: "Coral-Reyes, fsanchez2334, rocketkevin",
// //     description:"It is a multiplayer game where one is the artist. They must draw a picture based on a random word given and the rest of the players must guess the word.",
// //     minUsers: 1,
// //     maxUsers: 10,
// //     component: Draw,
// //   },

// // };

// // export default gameData;
