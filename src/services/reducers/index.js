import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { ingredientReducer } from './ingredient';
import { orderReducer } from './order';
import { registrationReducer } from './registration';
import { authReducer } from './auth';
import { wsFeedReducer } from './ws-feed';
import { wsOrderReducer } from './ws-order';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientsConstructor: constructorReducer,
  currentIngredient: ingredientReducer,
  order: orderReducer,
  registration: registrationReducer,
  auth: authReducer,
  feed: wsFeedReducer,
  orders: wsOrderReducer
});