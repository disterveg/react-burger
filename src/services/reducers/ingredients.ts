import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SCROLL_INGREDIENTS,
  TIngredientsActions
} from '../actions/ingredients';
import { IIngredient, TBunType } from '../../services/types/data';

type TIngredientsState = {
  ingredients: Array<IIngredient>,
  request: boolean,
  failed: boolean,
  currentTab: TBunType
} 

const initialState: TIngredientsState = {
  ingredients: [],
  request: false,
  failed: false,
  currentTab: 'bun'
};

export const ingredientsReducer = (
  state: TIngredientsState = initialState,
  action: TIngredientsActions
) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        request: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return { ...state, failed: false, ingredients: action.ingredients, request: false };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, failed: true, request: false };
    }
    case SCROLL_INGREDIENTS: {
      return { ...state, currentTab: action.payload };
    }
    default: {
      return state;
    }
  }
};
