import React from 'react'
import Enzyme, {mount, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Game from "./game";

import Player from "../player/player";
import {MISSILE_SPEED} from "../../constants/sizes";

require("uuid");
require('axios');
jest.mock('uuid', () =>
  jest.fn(() => "mocked uuid")
);
jest.mock('axios', () => {
  return {
    get: () => Promise.resolve({
      data: {
        roomId: 1
      }
    })
  }
});

Enzyme.configure({adapter: new Adapter()});

describe('Game', () => {

  const getGame = () => <Game/>;

  it('should create 2 players in game', () => {
    const gameComponent = mount(getGame());
    expect(gameComponent.find(Player)).toHaveLength(2);
  });

  it('should damage player 2 if player 1 shoot successfully', () => {
    const gameMount = mount(getGame());
    const gameComponent = gameMount.instance();
    gameComponent.shoot(1);
    setTimeout(
      function () {
        const playerTwoHealth = gameMount.find(Player).last().instance().state.health;
        expect(playerTwoHealth).toBeLessThan(100);
      }, MISSILE_SPEED + 100);
  });

  it('should damage player 1 if player 2 shoot successfully', () => {
    const gameMount = mount(getGame());
    const gameComponent = gameMount.instance();
    gameComponent.shoot(2);
    setTimeout(
      function () {
        const playerTwoHealth = gameMount.find(Player).first().instance().state.health;
        expect(playerTwoHealth).toBeLessThan(100);
      }, MISSILE_SPEED + 100);
  });

  it('should not damage player 2 if player 1 shoot unsuccessfully', () => {
    const gameMount = mount(getGame());
    const gameComponent = gameMount.instance();
    gameMount.find(Player).first().instance().current = 0;
    gameComponent.shoot(1);
    setTimeout(
      function () {
        const playerTwoHealth = gameMount.find(Player).last().instance().state.health;
        expect(playerTwoHealth).toBe(100);
      }, MISSILE_SPEED + 100);
  });

  it('should not damage player 1 if player 2 shoot unsuccessfully', () => {
    const gameMount = mount(getGame());
    const gameComponent = gameMount.instance();
    gameMount.find(Player).first().instance().current = 0;
    gameComponent.shoot(2);
    setTimeout(
      function () {
        const playerTwoHealth = gameMount.find(Player).first().instance().state.health;
        expect(playerTwoHealth).toBe(100);
      }, MISSILE_SPEED + 100);
  });

  it('should generate sessionId for socket connection', () => {
    const gameComponent = shallow(getGame()).instance();
    const sessionId = gameComponent.generateSessionId();
    expect(sessionId).toBe("mocked uuid");
  });

  it.skip('should save roomId in state on generation sessionId', () => {
    const gameComponent = shallow(getGame()).instance();
    gameComponent.generateSessionId();
    expect(gameComponent.state.roomId).toBe(1);
  });

  it('should return ip localhost when REACT_APP_PUBLIC_IP not set', () => {
    const gameComponent = shallow(getGame()).instance();
    const ip = gameComponent.getIp();
    expect(ip).toBe("localhost");
  });

  it('should return ip localhost when REACT_APP_PUBLIC_IP is empty', () => {
    process.env.REACT_APP_PUBLIC_IP = "";
    const gameComponent = shallow(getGame()).instance();
    const ip = gameComponent.getIp();
    expect(ip).toBe("localhost");
  });

  it('should return ip of ec2 machine when REACT_APP_PUBLIC_IP is set', () => {
    process.env.REACT_APP_PUBLIC_IP = "123.123.123.123";
    const gameComponent = shallow(getGame()).instance();
    const ip = gameComponent.getIp();
    expect(ip).toBe("123.123.123.123");
  });

});