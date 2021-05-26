import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from '../actions/ingredients';

const initialState = {
  ingredients: [],
  request: false,
  failed: false,
};

export const ingredientsReducer = (state = initialState, action) => {
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
    default: {
      return state;
    }
  }
};
