import React, {PureComponent} from 'react'
import {Animate} from 'react-move'
import {easeLinear} from 'd3-ease'
import {WINDOW_HEIGHT} from "../../constants/sizes"
import './missile.css'


class Missile extends PureComponent {
  constructor(props) {
    super(props);
    this.windowHeight = this.props.position === 'top' ? WINDOW_HEIGHT : -WINDOW_HEIGHT;
  }

  componentDidMount() {
    this.forceUpdate();
  }

  getMissileStyle = (x, y) => {
    return {
      display: y !== this.windowHeight ? 'block' : 'none',
      [this.props.position]: 0,
      WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
      transform: `translate3d(${x}px, ${y}px, 0)`,
    }
  };

  render() {
    return (
      <div>
        <Animate
          start={() => ({
            x: this.props.current,
            y: 0,
          })}
          update={() => ({
            x: [this.props.current],
            y: [this.windowHeight],
            timing: {duration: this.props.speed, ease: easeLinear},
          })}
        >{(position) => {
          const {x, y} = position;
          return (
            <div>
              <div className="missile" style={this.getMissileStyle(x, y)}/>
            </div>
          )
        }}
        </Animate>
      </div>
    )
  }
}

export default Missile
