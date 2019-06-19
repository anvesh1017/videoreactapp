import './App.css';
import React, { Component } from 'react';

class App extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      vidSource: "http://127.0.0.1:8080/video1.mp4",
      imgSrc: "http://localhost:8080/black_unmute.png",
      likeCnt: localStorage.likeCount,
      unlikeCnt: localStorage.unlikeCount
    };
  }

  play_vid = ()=>{
    this.refs.player.play();
    this.refs.stop_button.disabled = false;
    this.refs.pause_button.disabled = false;
  }

  pause_vid = ()=>{
    this.refs.player.pause();
  }

  stop_vid = ()=>{
    this.refs.player.pause();
    this.refs.player.currentTime = 0;
    this.refs.stop_button.disabled = true;
    this.refs.pause_button.disabled = true;
  }

  volumeUp = ()=>{
    try{
      if(this.refs.player.volume < 1){
        this.refs.player.volume = this.refs.player.volume + 0.1;
      }
    }		
    catch(err){
      this.refs.player.volume = 1;
      this.refs.player.muted = false;
    }
  }

  volumeDown = ()=>{
    try{
      if(this.refs.player.volume > 0){
        this.refs.player.volume = this.refs.player.volume - 0.1;
      }
    }		
    catch(err){
      this.refs.player.volume = 0;
      this.refs.player.muted = true;
    }
  }

  toggleMute = ()=>{
    if(this.refs.player.muted){
      this.refs.player.muted = false;
      this.setState({
        imgSrc: 'http://localhost:8080/black_unmute.png'
      });
    }else{
      this.refs.player.muted = true;	
      this.setState({
        imgSrc: 'http://localhost:8080/black_mute.png'
      });
    }
  }

  hitLike = ()=>{
    if (typeof(Storage) !== "undefined") {
      if (localStorage.likeCount > 0) {
        localStorage.likeCount = Number(localStorage.likeCount)+1;
      } else {
        localStorage.likeCount = 1;
      }
      this.setState({
        likeCnt: localStorage.likeCount
      });
    } else {
      alert('localstorage not supported')
      this.setState({
        likeCnt: 0
      });
    }
  }

  hitUnlike = ()=>{
    if (typeof(Storage) !== "undefined") {
      if (localStorage.unlikeCount > 0) {
        localStorage.unlikeCount = Number(localStorage.unlikeCount)+1;
      } else {
        localStorage.unlikeCount = 1;
      }
      this.setState({
        unlikeCnt: localStorage.unlikeCount
      });
    } else {
      alert('localstorage not supported')
      this.setState({
        unlikeCnt: 0
      });
    }
  }

  listClicked = (file)=>{
    this.setState({
      vidSource: "http://127.0.0.1:8080/"+file
    });
    this.refs.stop_button.disabled = false;
    this.refs.pause_button.disabled = false;
  }

  render() {
    return (
      <div className="App">
        <div id="wrapper">
          <div id="player_wrapper">
            <div>
              <video ref="player" id="video_player" src={this.state.vidSource}></video>
            </div>
          </div>
          <div id="player_controls" autostart="true">
          <table width="100%" border="0">
            <tbody>
                  <tr>
                    <td>
                      <button type="button" onClick={this.play_vid} id="play_button" className="btn btn-success btn-sm">
                          Play
                      </button>
                    </td>
                    <td>
                      <button type="button" ref="pause_button" onClick={this.pause_vid} className="btn btn-success btn-sm">
                          Pause
                      </button>
                    </td>
                    <td>
                      <button type="button" ref="stop_button" onClick={this.stop_vid} className="btn btn-success btn-sm">
                          Stop
                      </button>
                    </td>
                    <td>
                      <button type="button" onClick={this.volumeUp} className="btn btn-success btn-sm">
                          +
                      </button>
                    </td>
                    <td>
                      <button type="button" onClick={this.volumeDown} className="btn btn-success btn-sm">
                          -
                      </button>
                    </td>
                    <td>
                      <div onClick={this.toggleMute}>
                        <img alt="" src={this.state.imgSrc} width="25px" height="25px"></img>
                      </div>                      
                    </td>
                    <td>
                      <button type="button" onClick={this.hitLike} className="btn btn-success btn-sm">
                        Like
                      </button>
                      <div id="likeDiv">{this.state.likeCnt}</div>
                    </td>
                    <td>
                      <button type="button" onClick={this.hitUnlike} className="btn btn-success btn-sm">
                        Unlike
                      </button>
                      <div id="unlikeDiv">{this.state.unlikeCnt}</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <ul id="playlist" style={{color:'red', fontSize:'15px'}}>
                        <li onClick={()=>this.listClicked('video1.mp4')} value="video1.mp4">Video 1</li>
                        <li onClick={()=>this.listClicked('video2.mp4')} value="video2.mp4">Video 2</li>
                        <li onClick={()=>this.listClicked('video3.mp4')} value="video3.mp4">Video 3</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
