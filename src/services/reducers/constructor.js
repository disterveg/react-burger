import {
  DELETE_INGREDIENT_CONSTRUCTOR,
  ADD_INGREDIENT_CONSTRUCTOR,
} from '../actions/constructor';

const initialState = {
  ingredients: [],
  bun: {},
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_INGREDIENT_CONSTRUCTOR: {
      return { 
        ...state, ingredients: [...state.ingredients].filter((item, index) => index !== action.payload) 
      };
    }
    case ADD_INGREDIENT_CONSTRUCTOR: {
      if (action.payload.type === 'bun') {
        return { 
          ingredients: [...state.ingredients],
          bun: action.payload  
        };
      }
      return { 
        ingredients: [...state.ingredients, action.payload],
        bun: {...state.bun} 
      };
    }
    default: {
      return state;
    }
  }
};
