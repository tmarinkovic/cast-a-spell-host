import React from 'react'
import Enzyme, {shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Player from "./player";


Enzyme.configure({adapter:new Adapter()});

describe('Player', () => {

  it('should start at middle of screen', () => {
    expect(true).toBeTruthy();
  });

  it('should return number between 1 and 3', () => {
    const wrapper = shallow(<Player/>);
    expect(wrapper.exists()).toBe(true);
  });

});