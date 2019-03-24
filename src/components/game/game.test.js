import React from 'react'
import Enzyme, {mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Game from "./game";
import Player from "../player/player";
import {MISSILE_SPEED} from "../../constants/sizes";

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

});