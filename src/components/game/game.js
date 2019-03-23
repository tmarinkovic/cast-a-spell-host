import React, {Component} from 'react';
import Player from "../player/player";
import {PLAYER_WIDTH, MISSILE_SPEED} from "../../constants/sizes"

class Game extends Component {

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

  move = (playerNumber, direction) => {
    this.refs[`player${playerNumber}`].move(direction)
  };

  shoot = (playerNumber) => {
    const that = this;
    const missile = this.refs[`player${playerNumber}`].shoot();
    const effectedPlayerNumber = playerNumber === 1 ? 2 : 1;
    setTimeout(
      function () {
        if (
          that.refs[`player${effectedPlayerNumber}`].getPosition() < missile &&
          that.refs[`player${effectedPlayerNumber}`].getPosition() + PLAYER_WIDTH > missile
        ) {
          that.refs[`player${effectedPlayerNumber}`].damage()
        }
      }, MISSILE_SPEED + 50);
  };

  render() {
    return (
      <div>
        <Player ref={'player1'} position="top"/>
        <Player ref={'player2'} position="bottom"/>
      </div>
    );
  }
}

export default Game;
