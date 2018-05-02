import React, {Component} from 'react';
// import RaisedButton from 'material-ui/RaisedButton';
// import UserApi from './UserApi.js';
// import Avatar from 'material-ui/Avatar';
// import { List, ListItem } from 'material-ui/List';
// import firebase from 'firebase';
import WhoseOnline from './WhoseOnline.js';
// import './Data.css';
import randomWords from 'random-words';

export default class Draw extends Component {

 constructor(props) {
    super(props);
    this.state = 
    {
      prevX: 0,
      currX: 0,
      prevY: 0,
      currY: 0,
      randomWord: ""
    };
    console.log(randomWords());
    
 }
 componentDidUpdate() {
       this.draw();
 }

 genWord(){
  this.setState({
   randomWord: randomWords()
  }); 
 }

 draw() {
       // console.log(this.state.prevX, this.state.prevY)
       // console.log(this.state.currX, this.state.currY)
       const canvas = this.refs.canvas
       const ctx = canvas.getContext('2d');
       console.log(canvas.getBoundingClientRect());
       ctx.beginPath();
       ctx.arc(
        this.state.currX - canvas.getBoundingClientRect().left,
        this.state.currY - canvas.getBoundingClientRect().top*2.5,
        5, 0,
        Math.PI * 2, 
        true
       );
       ctx.lineWidth = 2;
       ctx.stroke();
       ctx.closePath();
 }

 onMouseMoved(e){
   e.stopPropagation();
   this.setState({
      prevX: this.state.currX,
      currX: e.screenX,
      prevY: this.state.currX,
      currY: e.screenY,
    });
 }
 
 render() {
    return (
     <div>
        <h1>Draw</h1>
        <button onClick={this.genWord.bind(this)}>New Word</button>
        <p>{this.state.randomWord}</p>
        <div id="canvas">
         <canvas ref="canvas" onMouseMove={this.onMouseMoved.bind(this)} id="can" width="400" height="400" style={{position: "absolute", top: "10%", left: "50%", border:"2px solid"}}></canvas>
        </div>
        <div id="online">
         <WhoseOnline session={this.props.match.params.id}/>
         </div>
     </div>
    
    );
  }
}

/*
 
 // var canvas, ctx, flag = false,
 //        prevX = 0,
 //        currX = 0,
 //        prevY = 0,
 //        currY = 0,
 //        dot_flag = false;

 //    var x = "black",
 //        y = 2;
    
 //    function init() {
 //        canvas = document.getElementById('can');
 //        ctx = canvas.getContext("2d");
 //        w = canvas.width;
 //        h = canvas.height;
    
 //        canvas.addEventListener("mousemove", function (e) {
 //            findxy('move', e)
 //        }, false);
 //        canvas.addEventListener("mousedown", function (e) {
 //            findxy('down', e)
 //        }, false);
 //        canvas.addEventListener("mouseup", function (e) {
 //            findxy('up', e)
 //        }, false);
 //        canvas.addEventListener("mouseout", function (e) {
 //            findxy('out', e)
 //        }, false);
 //    }
    
 //    function color(obj) {
 //        switch (obj.id) {
 //            case "green":
 //                x = "green";
 //                break;
 //            case "blue":
 //                x = "blue";
 //                break;
 //            case "red":
 //                x = "red";
 //                break;
 //            case "yellow":
 //                x = "yellow";
 //                break;
 //            case "orange":
 //                x = "orange";
 //                break;
 //            case "black":
 //                x = "black";
 //                break;
 //            case "white":
 //                x = "white";
 //                break;
 //        }
 //        if (x == "white") y = 14;
 //        else y = 2;
    
 //    }
    
 //    function draw() {
 //        ctx.beginPath();
 //        ctx.moveTo(prevX, prevY);
 //        ctx.lineTo(currX, currY);
 //        ctx.strokeStyle = x;
 //        ctx.lineWidth = y;
 //        ctx.stroke();
 //        ctx.closePath();
 //    }
    
 //    function erase() {
 //        var m = confirm("Want to clear");
 //        if (m) {
 //            ctx.clearRect(0, 0, w, h);
 //            document.getElementById("canvasimg").style.display = "none";
 //        }
 //    }
    
 //    function save() {
 //        document.getElementById("canvasimg").style.border = "2px solid";
 //        var dataURL = canvas.toDataURL();
 //        document.getElementById("canvasimg").src = dataURL;
 //        document.getElementById("canvasimg").style.display = "inline";
 //    }
    
 //    function findxy(res, e) {
 //        if (res == 'down') {
 //            prevX = currX;
 //            prevY = currY;
 //            currX = e.clientX - canvas.offsetLeft;
 //            currY = e.clientY - canvas.offsetTop;
    
 //            flag = true;
 //            dot_flag = true;
 //            if (dot_flag) {
 //                ctx.beginPath();
 //                ctx.fillStyle = x;
 //                ctx.fillRect(currX, currY, 2, 2);
 //                ctx.closePath();
 //                dot_flag = false;
 //            }
 //        }
 //        if (res == 'up' || res == "out") {
 //            flag = false;
 //        }
 //        if (res == 'move') {
 //            if (flag) {
 //                prevX = currX;
 //                prevY = currY;
 //                currX = e.clientX - canvas.offsetLeft;
 //                currY = e.clientY - canvas.offsetTop;
 //                draw();
 //            }
 //        }
 //    }*/