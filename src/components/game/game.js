import React, {Component} from 'react';
import Player from "../player/player";
import axios from 'axios'
import WebSocket from "../websocket/websocket";
import {MISSILE_SPEED, PLAYER_WIDTH} from "../../constants/sizes"

const uuid = require("uuid");

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      roomId: null,
      connected: false
    };
  }

  componentDidMount() {
    // commands until phone controller component is done
    document.addEventListener("keydown",
      (event) => {
        if (event.keyCode === 37) {
          this.move(1, 'left')
        } else if (event.keyCode === 39) {
          this.move(1, 'right')
        } else if (event.keyCode === 38) {
          this.shoot(1)
        } else if (event.keyCode === 40) {
          this.move(1, 'hold')
        }
        if (event.keyCode === 65) {
          this.move(2, 'left')
        } else if (event.keyCode === 68) {
          this.move(2, 'right')
        } else if (event.keyCode === 87) {
          this.shoot(2)
        } else if (event.keyCode === 83) {
          this.move(2, 'hold')
        }
      },
      false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyEvent, false);
  }

  move = (playerNumber, direction) => this.refs[`player${playerNumber}`].move(direction);

  shoot = (playerNumber) => {
    playerNumber = parseInt(playerNumber);
    const that = this;
    const missilePosition = this.refs[`player${playerNumber}`].shoot(Date.now());
    const effectedPlayerNumber = playerNumber === 1 ? 2 : 1;
    setTimeout(
      function () {
        if (
          that.refs[`player${effectedPlayerNumber}`].getPosition() < missilePosition &&
          that.refs[`player${effectedPlayerNumber}`].getPosition() + PLAYER_WIDTH > missilePosition
        ) {
          that.refs[`player${effectedPlayerNumber}`].damage()
        }
      }, MISSILE_SPEED + 50);
  };

  generateSessionId = () => {
    const sessionId = uuid();
    axios
      .get(`http://${this.getIp()}:8080/host/room/${sessionId}`)
      .then(response => {
        this.setState({roomId: response.data.roomId});
      });
    return sessionId;
  };

  getIp = () => {
    if (process.env.REACT_APP_PUBLIC_IP === undefined || process.env.REACT_APP_PUBLIC_IP === '') {
      return 'localhost';
    } else {
      return process.env.REACT_APP_PUBLIC_IP.trim();
    }
  };

  setConnection = (connection) => {
    this.setState({connected: connection});
  };

  render() {
    return (
      <div>
        <div className="game-stats">
          {this.state.roomId !== null && this.state.connected === true ? `Room ID: ${this.state.roomId}` : ''} &nbsp;
          Connection: &nbsp; {this.state.connected === true ?
          <div className="status-circle green"/> :
          <div className="status-circle red"/>}
        </div>
        <div className='game'>
          <WebSocket
            generateSessionId={this.generateSessionId}
            onMove={this.move}
            onShoot={this.shoot}
            setConnection={this.setConnection}
            ip={this.getIp()}
            roomId={this.state.roomId}
          />
          <Player ref={'player1'} position="top"/>
          <Player ref={'player2'} position="bottom"/>
        </div>
      </div>
    );
  }
}

export default Game;
