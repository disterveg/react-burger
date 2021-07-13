import {
  OPEN_DETAIL,
  CLOSE_DETAIL,
} from '../actions/ingredient';
import { IIngredient } from '../types/data';

type TIngredientState = {
  ingredient: IIngredient | {},
  showPopup: boolean
} 

const initialState: TIngredientState = {
  ingredient: {},
  showPopup: false
};

export const ingredientReducer = (state = initialState, action: {type: string, ingredient: IIngredient}) => {
  switch (action.type) {
    case OPEN_DETAIL: {
      return { ...state, ingredient: action.ingredient, showPopup: true }
    }
    case CLOSE_DETAIL: {
      return {
        ...state,
        ingredient: {},
        showPopup: false
      };
    }
    default: {
      return state;
    }
  }
};
