import React, {Component} from 'react';
import UserApi from './UserApi.js';
import firebase from 'firebase';
import WhoseOnline from './WhoseOnline.js';
import randomWords from 'random-words';
import './Draw.css';

export default class Draw extends Component {


    constructor(props) {
        super(props);
        this.state = 
        {
            prevX: 0,
            currX: 0,
            prevY: 0,
            currY: 0,
            randomWord: "",
            inputvalue: "",
            repeat: "",
            drawer: "",
            peopleNames: [],
            color: "#000",
            canvasimg: "",
        };
    }
 
    componentWillMount() {
        var id = this.props.match.params.id;
        var sessionDatabaseRef = firebase.database().ref("/session-metadata/" + id);
        var usersId = sessionDatabaseRef.child("users");
        usersId.on("value", (snapshot) => {
            var container = snapshot.val();
            const arrayOfAllUsersName = container.map(x => {
                return {
                    name: UserApi.getName(x),
                    img: UserApi.getPhotoUrl(x)
                };
            });
            this.setState({
                peopleNames: arrayOfAllUsersName
            });
        });
        sessionDatabaseRef.child("words").on("value", (snapshot) => {
            var storage = snapshot.val(); 
            this.setState({
                randomWord: storage
            });       
        });
    }  
 
    componentDidMount(){
        var id = this.props.match.params.id;
        var sessionDatabaseRef = firebase.database().ref("/session-metadata/" + id);
        var sessionStorageRef = firebase.storage().ref("/session-metadata/" + id);
        console.log(sessionStorageRef);
        sessionDatabaseRef.child("img").on("value", (snapshot) => {
            const canvas = this.refs.canvas;
            console.log(canvas);
            var ctx = canvas.getContext('2d');
            console.log(ctx);
            var img = new Image();
            img.crossOrigin = "Anonymous";
            sessionStorageRef.getDownloadURL().then(onResolve, onReject);
            
            function onResolve(foundURL) {
                console.log(foundURL);
                img.src = (foundURL);
            }
                
            function onReject(error) {
                    console.log(error.code);
            }
            
            img.onload = function() {
                ctx.drawImage(img, 0, 0);
            };
        });
    }
 
 
    componentDidUpdate() {
        // console.log(this.state.mouseDown);
        if(this.state.mouseDown) {
            console.log(this.state.mouseDown);
            this.draw();
        }
    }
 

 
    canvasSave() {
        const canvas = this.refs.canvas;
        var imgData = canvas.toDataURL();
        console.log(imgData);
        var id = this.props.match.params.id;
        var sessionDatabaseRef = firebase.database().ref("/session-metadata/" + id);
        var sessionStorageRef = firebase.storage().ref("/session-metadata/" + id);
        sessionStorageRef.putString(imgData, 'data_url').then(function(snapshot) {
            console.log('Uploaded a data_url string!');
            sessionDatabaseRef.child("img").set(true);
            sessionDatabaseRef.child("img").set(false); 
        });
    }

    firstDrawer() {
        this.setState({
            drawer: this.state.peopleNames[0]
        });
    }

    genWord(){
        var words = randomWords();
        var id = this.props.match.params.id;
        var sessionDatabaseRef = firebase.database().ref("/session-metadata/" + id);
        sessionDatabaseRef.update({words: words});
    }
 
    resetCanvas(){
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0,0,400,400);
    }

    resetAndSave(){
        this.resetCanvas();
        this.canvasSave();
    }

    getInputValue(){
        var x = document.getElementById("guess").value;
        this.setState({
            inputvalue: x
        });
    }
 
    wins(){
        if (this.state.inputvalue === this.state.randomWord) {
            this.genWord();
            this.resetAndSave();
        } else {
            this.setState({
                repeat: "False"
            }); 
        }
    }

    draw() {
        const canvas = this.refs.canvas;
        console.log(canvas);
        const ctx = canvas.getContext("2d"); 
        console.log(ctx);
        ctx.beginPath();
        ctx.arc(
            this.state.currX - canvas.offsetLeft - 1,
            this.state.currY - (canvas.offsetTop + 60),
            5, 0,
            Math.PI * 2, 
            true
        );
        ctx.lineWidth = 2;
        ctx.strokeStyle= this.state.color;
        ctx.fillStyle = this.state.color; 
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }


    onMouseMoved(e){
        e.stopPropagation();
        this.setState({
            currX: e.screenX,
            currY: e.screenY,
        });
        console.log("moving");
    }

    onMouseDown(e){
        e.stopPropagation();
        this.setState({
            mouseDown: true
        });
        console.log(this.state.mouseDown);
    }

    onMouseUp(e){
        e.stopPropagation();
        this.setState({
            mouseDown:false
        });
        console.log(this.state.mouseDown);
    }

    getRandomColor(){
        var letters= "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        this.setState({
            color: color
        });
    }
 
    render() {
        return (
            <div className="site">
                <div id="online">
                    <button onClick={this.genWord.bind(this)}>
                        New Word
                    </button>
                    <p>
                        {this.state.randomWord}
                    </p>
                    <input type="text" id="guess" onChange={this.getInputValue.bind(this)}/>
                    <p>
                        {this.state.inputvalue}
                    </p>
                    <button onClick={this.wins.bind(this)}>
                        Compare Answers
                    </button>
                    <p>
                        {this.state.repeat}
                    </p>
                    <WhoseOnline id="names" peopleNames={this.state.peopleNames} session={this.props.match.params.id}/>
                </div>
                <div id="canvas">
                    <canvas ref="canvas" onMouseDown={this.onMouseDown.bind(this)} onMouseUp={this.onMouseUp.bind(this)} onMouseMove={this.onMouseMoved.bind(this)} id="can" width="400" height="400">
                    </canvas>
                    <div className="button">
                        <button onClick={this.getRandomColor.bind(this)}> 
                            Change Color 
                        </button>
                        <button onClick={this.canvasSave.bind(this)}> 
                            Copy & Send 
                        </button>
                        <button onClick={this.resetAndSave.bind(this)}>
                            Reset Canvas 
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
