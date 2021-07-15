import {
  OPEN_DETAIL,
  CLOSE_DETAIL,
  TIngredientActions,
} from '../actions/ingredient';
import { IIngredient } from '../types/data';

type TIngredientState = {
  ingredient: IIngredient | Object,
  showPopup: boolean
} 

const initialState: TIngredientState = {
  ingredient: {},
  showPopup: false
};

export const ingredientReducer = (
  state: TIngredientState = initialState,
  action: TIngredientActions
) => {
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
