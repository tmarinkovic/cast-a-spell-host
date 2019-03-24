import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Player from "./player";
import {MISSILE_SPEED, PLAYER_SPEED, PLAYER_WIDTH, WINDOW_WIDTH} from "../../constants/sizes";

Enzyme.configure({adapter: new Adapter()});

describe('Player', () => {

  const getPlayer = (position) => <Player ref={'player1'} position={position}/>;

  it('should set local state', () => {
    const playerComponent = shallow(getPlayer("top")).instance();
    const expectedState = {
      move: 'none',
      speed: PLAYER_SPEED,
      missile: [],
      health: 100
    };
    expect(playerComponent.state).toEqual(expectedState);
    expect(playerComponent.lastShoot).toBe(null);
  });

  it('should return number from 1 to 3', () => {
    const playerComponent = shallow(getPlayer("top")).instance();
    for (let i = 0; i < 100; i++) {
      const damage = playerComponent.damagePerHit();
      expect(damage).toBeGreaterThanOrEqual(1);
      expect(damage).toBeLessThanOrEqual(3);
    }
  });

  it('should return current position of player', () => {
    const playerComponent = shallow(getPlayer("top")).instance();
    expect(playerComponent.getPosition()).toBe((WINDOW_WIDTH - PLAYER_WIDTH) / 2);
  });

  it('should set direction in local state', () => {
    const playerComponent = shallow(getPlayer("top")).instance();
    playerComponent.move('left');
    expect(playerComponent.state.move).toBe('left');
  });

  it('should create new missile in local state', () => {
    const playerComponent = shallow(getPlayer("top")).instance();
    playerComponent.shoot();
    expect(playerComponent.state.missile).toHaveLength(1);
  });

  it('should set lastShoot parameter to current timestamp when creating missile', () => {
    const playerComponent = shallow(getPlayer("top")).instance();
    playerComponent.shoot(123);
    expect(playerComponent.lastShoot).toBe(123);
  });

  it('should return position from where shot was made', () => {
    const playerComponent = shallow(getPlayer("top")).instance();
    const missilePosition = playerComponent.shoot(123);
    expect(missilePosition).toBe(((WINDOW_WIDTH - PLAYER_WIDTH) / 2) + PLAYER_WIDTH / 2);
  });

  it('should remove missile from state if no activity', () => {
    const playerComponent = shallow(getPlayer("top")).instance();
    playerComponent.shoot();
    expect(playerComponent.state.missile).toHaveLength(1);
    setTimeout(function () {
      expect(playerComponent.state.missile).toHaveLength(0);
    }, MISSILE_SPEED + 300);
  });

  it('should return speed 0 if no movement', () => {
    const playerComponent = shallow(getPlayer("top")).instance();
    playerComponent.setState({move: 'none'});
    const speed = playerComponent.getSpeed();
    expect(speed).toBe(0);
  });

  it('should maintain same speed no matter how far away from edge of screen moving left', () => {
    const closeToEdgeOfScreenFactor = 2;
    let playerComponent = shallow(getPlayer("top")).instance();

    playerComponent.setState({move: 'left'});
    const speed = playerComponent.getSpeed();
    playerComponent.current = ((WINDOW_WIDTH - PLAYER_WIDTH) / 2) / closeToEdgeOfScreenFactor;
    const speedTwo = playerComponent.getSpeed();

    expect(speedTwo).toBe(speed / closeToEdgeOfScreenFactor);
  });

  it('should maintain same speed no matter how far away from edge of screen moving right', () => {
    const closeToEdgeOfScreenFactor = 2;
    let playerComponent = shallow(getPlayer("top")).instance();

    playerComponent.setState({move: 'right'});
    const speed = playerComponent.getSpeed();
    playerComponent.current = ((WINDOW_WIDTH - PLAYER_WIDTH) / 2) + (((WINDOW_WIDTH - PLAYER_WIDTH) / 2) / closeToEdgeOfScreenFactor);
    const speedTwo = playerComponent.getSpeed();

    expect(speedTwo).toBe(speed / closeToEdgeOfScreenFactor);
  });

  it('should return no movement if move is none', () => {
    const playerComponent = shallow(getPlayer("top")).instance();
    playerComponent.setState({move: 'none'});
    expect(playerComponent.getDirection()).toBe(playerComponent.current);
  });

  it('should return how far away from left edge player should move if move is left', () => {
    const playerComponent = shallow(getPlayer("top")).instance();
    playerComponent.setState({move: 'left'});
    expect(playerComponent.getDirection()).toBe(0);
  });

  it('should return how far away from left edge player should move if move is right', () => {
    const playerComponent = shallow(getPlayer("top")).instance();
    playerComponent.setState({move: 'right'});
    expect(playerComponent.getDirection()).toBe(WINDOW_WIDTH - PLAYER_WIDTH);
  });

  it('should return no movement if direction is unknown', () => {
    const playerComponent = shallow(getPlayer("top")).instance();
    playerComponent.setState({move: 'not-existing-move'});
    expect(playerComponent.getDirection()).toBe(playerComponent.current);
  });

  it('should return player style if position is top', () => {
    const playerComponent = shallow(getPlayer("top")).instance();
    const style = playerComponent.getPlayerStyle(100);
    const expectedStyle = {
      top: 0,
      width: PLAYER_WIDTH,
      WebkitTransform: `translate3d(100px, 0, 0)`,
      transform: `translate3d(100px, 0, 0)`,
    };
    expect(style).toEqual(expectedStyle);
  });

  it('should return player style if position is bottom', () => {
    const playerComponent = shallow(getPlayer("bottom")).instance();
    const style = playerComponent.getPlayerStyle(100);
    const expectedStyle = {
      bottom: 0,
      width: PLAYER_WIDTH,
      WebkitTransform: `translate3d(100px, 0, 0)`,
      transform: `translate3d(100px, 0, 0)`,
    };
    expect(style).toEqual(expectedStyle);
  });

  it('should return player health style if health is 100%', () => {
    const playerComponent = shallow(getPlayer("top")).instance();
    const style = playerComponent.getPlayerHealthStyle();
    const expectedStyle = {
      width: '0%',
      borderRadius: '0 4px 4px 0'
    };
    expect(style).toEqual(expectedStyle);
  });

  it('should return player health style if health is 50%', () => {
    const playerComponent = shallow(getPlayer("top")).instance();
    playerComponent.setState({health: 50});
    const style = playerComponent.getPlayerHealthStyle();
    const expectedStyle = {
      width: '50%',
      borderRadius: '0 4px 4px 0'
    };
    expect(style).toEqual(expectedStyle);
  });

  it('should return player health style if health is 0%', () => {
    const playerComponent = shallow(getPlayer("top")).instance();
    playerComponent.setState({health: 0});
    const style = playerComponent.getPlayerHealthStyle();
    const expectedStyle = {
      width: '100%',
      borderRadius: '4px'
    };
    expect(style).toEqual(expectedStyle);
  });

  it('should apply damage to player', () => {
    const playerComponent = shallow(getPlayer("top")).instance();
    playerComponent.damage();
    expect(playerComponent.state.health).toBeGreaterThanOrEqual(97);
    expect(playerComponent.state.health).toBeLessThanOrEqual(99);
  });

  it('should set health to 0 if health is below 0', () => {
    const playerComponent = shallow(getPlayer("top")).instance();
    playerComponent.setState({health: 0.01});
    playerComponent.damage();
    expect(playerComponent.state.health).toBe(0);
  });
});