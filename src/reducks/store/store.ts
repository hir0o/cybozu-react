import {
  createStore as reducxCreateStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import UsersReducer from '../users/reducers';
import CompaniesReducer from '../companies/reducers';

export default function createStore(history: any) {
  return reducxCreateStore(
    combineReducers({
      router: connectRouter(history), // historyの情報をrouterで管理できるようにする
      users: UsersReducer,
      companies: CompaniesReducer,
    }),
    applyMiddleware(routerMiddleware(history), thunk),
  );
}
