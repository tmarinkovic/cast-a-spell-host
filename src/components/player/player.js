import React, {PureComponent} from 'react'
import {Animate} from 'react-move'
import {easeLinear} from 'd3-ease'
import Missile from "../missile/missile";
import {PLAYER_SPEED, PLAYER_WIDTH, MISSILE_SPEED, WINDOW_WIDTH} from "../../constants/sizes"
import './player.css'


class Player extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      move: 'none',
      speed: PLAYER_SPEED,
      missile: [],
      health: 100
    };
    this.current = (WINDOW_WIDTH - PLAYER_WIDTH) / 2;
    this.lastShoot = null;
    this.cleanMissiles();
  }

  damagePerHit = () => Math.random() * 3 + 1;

  move = direction => this.setState({move: direction});

  shoot = () => {
    const missile = this.spawnMissile();
    this.setState({missile: this.state.missile.concat(missile)});
    this.lastShoot = Date.now();
    return this.current + PLAYER_WIDTH / 2;
  };

  cleanMissiles = () => {
    const that = this;
    setInterval(function () {
      if (Date.now() - that.lastShoot > MISSILE_SPEED + 100) {
        that.setState({missile: []});
      }
    }, MISSILE_SPEED + 200);
  };

  getSpeed() {
    let difference = this.current;
    if (this.state.move === 'none') {
      return 0;
    }
    if (this.state.move === 'right') {
      difference = WINDOW_WIDTH - PLAYER_WIDTH - this.current
    }
    return ((difference) * PLAYER_SPEED) / (WINDOW_WIDTH - PLAYER_WIDTH)
  }

  getDirection() {
    switch (this.state.move) {
      case 'left':
        return 0;
      case 'right':
        return WINDOW_WIDTH - PLAYER_WIDTH;
      case 'none':
        return this.current;
      default:
        return this.current;
    }
  }

  spawnMissile() {
    return <Missile key={Date.now()} speed={MISSILE_SPEED} position={this.props.position}
                    current={this.current + (PLAYER_WIDTH / 2)}/>
  }

  getPosition() {
    return this.current;
  }

  getPlayerStyle(x) {
    return {
      [this.props.position]: 0,
      width: PLAYER_WIDTH,
      WebkitTransform: `translate3d(${x}px, 0, 0)`,
      transform: `translate3d(${x}px, 0, 0)`,
    }
  }

  getPlayerHealthStyle() {
    let borderRadius = '0 4px 4px 0';
    if (this.state.health === 0) {
      borderRadius = '4px';
    }
    return {
      width: `${100 - this.state.health}%`,
      borderRadius: borderRadius
    }
  }

  damage() {
    if (this.state.health <= 0) {
      this.setState({health: 0})
    } else {
      this.setState({health: this.state.health - this.damagePerHit()})
    }
  }

  render() {
    return (
      <div>
        {this.state.missile}
        <Animate
          start={() => ({
            x: (WINDOW_WIDTH - PLAYER_WIDTH) / 2,
          })}
          update={() => ({
            x: [this.getDirection()],
            timing: {duration: this.getSpeed(), ease: easeLinear},
          })}
        >{(position) => {
          const {x} = position;
          this.current = x;
          return (<div className="player" style={this.getPlayerStyle(x)}>
            <div className='health-status'>{parseFloat(this.state.health).toFixed(2)}%</div>
            <div className='player-health' style={this.getPlayerHealthStyle()}/>
          </div>)
        }}
        </Animate>
      </div>
    )
  }
}

export default Player
