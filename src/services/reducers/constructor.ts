import {
  DELETE_INGREDIENT_CONSTRUCTOR,
  ADD_INGREDIENT_CONSTRUCTOR,
  MOVE_CLIENT_INGREDIENT,
  TConstructorActions
} from '../actions/constructor';
import { v4 as uuidv4 } from 'uuid';
import { IIngredient } from '../types/data';

type TConstructorState = {
  ingredients: Array<IIngredient>,
  bun: IIngredient | {}
} 

const initialState: TConstructorState = {
  ingredients: [],
  bun: {},
};

export const constructorReducer = (
  state: TConstructorState = initialState,
  action: TConstructorActions
) => {
  switch (action.type) {
    case MOVE_CLIENT_INGREDIENT: {
      const {index, atIndex} = action.payload;
      const ingredients = [...state.ingredients];
      ingredients.splice(index, 0, ingredients.splice(atIndex , 1)[0]);
      return {
        ...state,
        ingredients: ingredients
      };
    }
    case DELETE_INGREDIENT_CONSTRUCTOR: {
      return { 
        ...state, ingredients: [...state.ingredients].filter((item, index) => index !== action.key) 
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
        ingredients: [...state.ingredients, {
          key: uuidv4(),
          ...action.payload
        }],
        bun: {...state.bun} 
      };
    }
    default: {
      return state;
    }
  }
};
