import { createSelector } from 'reselect';

const userSelector = (state: any) => state.users;

export const getUser = createSelector([userSelector], (state) => state);
export const getIsSignedIn = createSelector([userSelector], (state) => state.isSignedIn);
export const getUserName = createSelector([userSelector], (state) => state.username);
