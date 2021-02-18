import * as Actions from './actions';
import initialState from '../store/initialState';
import { ActionType } from './types';

const CompaniesReducer = (
  state = initialState.companies,
  action: ActionType,
) => {
  switch (action.type) {
    case Actions.FETCH_COMPANIES:
      return {
        ...state,
        list: [...action.payload],
      };
    default:
      return state;
  }
};

export default CompaniesReducer;
