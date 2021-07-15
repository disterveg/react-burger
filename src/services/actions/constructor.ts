import { IIngredient } from "../types/data";

export const DELETE_INGREDIENT_CONSTRUCTOR: 'DELETE_INGREDIENT_CONSTRUCTOR' = 'DELETE_INGREDIENT_CONSTRUCTOR';
export const ADD_INGREDIENT_CONSTRUCTOR: 'ADD_INGREDIENT_CONSTRUCTOR' = 'ADD_INGREDIENT_CONSTRUCTOR';
export const MOVE_CLIENT_INGREDIENT: 'MOVE_CLIENT_INGREDIENT' = 'MOVE_CLIENT_INGREDIENT';

export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT_CONSTRUCTOR;
  key: number
}

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT_CONSTRUCTOR;
  payload: IIngredient
}

export interface IMoveIngredientAction {
  readonly type: typeof MOVE_CLIENT_INGREDIENT;
  payload: {index: number, atIndex: number}
}

export type TConstructorActions =
  | IDeleteIngredientAction
  | IAddIngredientAction
  | IMoveIngredientAction;
