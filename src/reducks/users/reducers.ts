import * as Actions from './actions';
import initialState from '../store/initialState';
import { ActionType } from './types';

const UsersReducer = (state = initialState.users, action: ActionType) => {
  switch (action.type) {
    case Actions.SIGN_IN:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default UsersReducer;
