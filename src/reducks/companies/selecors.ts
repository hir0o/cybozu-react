import { createSelector } from 'reselect';

const companySelector = (state: any) => state.companies;

export const getCompanies = createSelector([companySelector], (state) => state);

export const func = () => {};
