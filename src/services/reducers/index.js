import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { ingredientReducer } from './ingredient';
import { orderReducer } from './order';
import { registrationReducer } from './registration';
import { authReducer } from './auth';
import { forgotReducer } from './forgot';
import { resetReducer } from './reset';
import { ordersReducer } from './orders';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientsConstructor: constructorReducer,
  currentIngredient: ingredientReducer,
  orderCreated: orderReducer,
  registration: registrationReducer,
  auth: authReducer,
  forgot: forgotReducer,
  reset: resetReducer,
  orders: ordersReducer
});