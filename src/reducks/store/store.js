import {
  createStore as reducxCreateStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import ProductsReducer from '../companies/reducers';

export default function createStore(history) {
  return reducxCreateStore(
    combineReducers({
      products: ProductsReducer,
      router: connectRouter(history), // historyの情報をrouterで管理できるようにする
    }),
    applyMiddleware(routerMiddleware(history), thunk),
  );
}

// combineReducers: 分割したreducerを、統一して管理するためにつかう
