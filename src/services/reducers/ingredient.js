import {
  OPEN_DETAIL,
  CLOSE_DETAIL,
} from '../actions/ingredient';

const initialState = {
  ingredient: {},
  showPopup: false
};

export const ingredientReducer = (state = initialState, action) => {
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
