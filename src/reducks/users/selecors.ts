import { createSelector } from 'reselect';
import { initialStateType } from '../store/initialState';
import { UserType } from './types';

const userSelector = (state: initialStateType) => state.users;

export const getUser = createSelector(
  [userSelector],
  (state: UserType) => state,
);
export const getIsSignedIn = createSelector(
  [userSelector],
  (state: UserType) => state.isSignedIn,
);
export const getUserName = createSelector(
  [userSelector],
  (state: UserType) => state.username,
);
