import { IIngredient } from "../types/data";

export const OPEN_DETAIL: 'OPEN_DETAIL' = 'OPEN_DETAIL';
export const CLOSE_DETAIL: 'CLOSE_DETAIL' = 'CLOSE_DETAIL';

export interface IOpenDetailAction {
  readonly type: typeof OPEN_DETAIL;
  ingredient: IIngredient
}
  
export interface ICloseDetailAction {
  readonly type: typeof CLOSE_DETAIL;
}
  
export type TIngredientActions =
  | IOpenDetailAction
  | ICloseDetailAction;