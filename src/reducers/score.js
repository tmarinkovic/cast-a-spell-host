import {PLAYER_ONE_SCORE} from '.././constants/actionTypes';

const INITIAL_STATE = {
  playerOneScore: 0,
  playerTwoScore: 0,
};

function scoreReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PLAYER_ONE_SCORE:
      return {
        ...state,
        playerOneScore: state.playerOneScore + 1
      };
    default :
      return state;
  }
}

export default scoreReducer;