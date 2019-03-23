import React, {PureComponent} from 'react'
import {Animate} from 'react-move'
import {easeLinear} from 'd3-ease'
import {WINDOW_HEIGHT} from "../../constants/sizes"
import './missile.css'


class Missile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shoot: false
    };
    this.windowHeight = this.props.position === 'top' ? WINDOW_HEIGHT : -WINDOW_HEIGHT;
  }

  componentDidMount() {
    this.setState({shoot: true})
  }

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
            y: [this.state.shoot === true ? this.windowHeight : 0],
            timing: {duration: this.props.speed, ease: easeLinear},
          })}
        >{(position) => {
          const {x, y} = position;
          return (
            <div>
              <div className="missile"
                   style={{
                     display: (this.state.shoot && y !== this.windowHeight) ? 'block' : 'none',
                     [this.props.position]: 0,
                     WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
                     transform: `translate3d(${x}px, ${y}px, 0)`,
                   }}
              />
            </div>
          )
        }}
        </Animate>
      </div>
    )
  }
}

export default Missile
