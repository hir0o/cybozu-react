import {
  createStore as reducxCreateStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import UsersReducer from '../users/reducers';

export default function createStore(history) {
  return reducxCreateStore(
    combineReducers({
      router: connectRouter(history), // historyの情報をrouterで管理できるようにする
      users: UsersReducer,
    }),
    applyMiddleware(routerMiddleware(history), thunk),
  );
}
