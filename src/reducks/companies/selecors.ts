import { createSelector } from 'reselect';
import { initialStateType } from '../store/initialState';

const companySelector = (state: initialStateType) => state.companies;

const getCompanies = createSelector([companySelector], (state) => state);

export default getCompanies;
