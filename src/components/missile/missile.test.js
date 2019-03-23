import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Missile from "./missile";
import {MISSILE_SPEED, PLAYER_WIDTH} from "../../constants/sizes";

Enzyme.configure({adapter: new Adapter()});

describe('Missile', () => {

  const getMissile = (position) => {
    return <Missile
      key={Date.now()}
      speed={MISSILE_SPEED}
      position={position}
      current={PLAYER_WIDTH / 2}
    />
  };

  it('should return style with position top if passed top position', () => {
    const missileComponent = shallow(getMissile("top")).instance();
    const expectedStyle = {
      display: 'block',
      top: 0,
      WebkitTransform: 'translate3d(1px, 2px, 0)',
      transform: 'translate3d(1px, 2px, 0)'
    };
    expect(missileComponent.getMissileStyle(1, 2)).toEqual(expectedStyle);
  });

  it('should return style with position bottom if passed top position', () => {
    const missileComponent = shallow(getMissile("bottom")).instance();
    const expectedStyle = {
      display: 'block',
      bottom: 0,
      WebkitTransform: 'translate3d(1px, 2px, 0)',
      transform: 'translate3d(1px, 2px, 0)'
    };
    expect(missileComponent.getMissileStyle(1, 2)).toEqual(expectedStyle);
  });

  it('should set positive window height if passed top position', () => {
    const missileComponent = shallow(getMissile("top")).instance();
    expect(missileComponent.windowHeight).toBeGreaterThan(0);
  });

  it('should set negative window height if passed bottom position', () => {
    const missileComponent = shallow(getMissile("bottom")).instance();
    expect(missileComponent.windowHeight).toBeLessThan(0);
  });

});