import {
  createStore as reducxCreateStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

export default function createStore(history) {
  return reducxCreateStore(
    combineReducers({
      router: connectRouter(history), // historyの情報をrouterで管理できるようにする
    }),
    applyMiddleware(routerMiddleware(history), thunk),
  );
}
