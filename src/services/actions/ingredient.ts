export const OPEN_DETAIL: 'OPEN_DETAIL' = 'OPEN_DETAIL';
export const CLOSE_DETAIL: 'CLOSE_DETAIL' = 'CLOSE_DETAIL';

export interface IOpenDetailAction {
  readonly type: typeof OPEN_DETAIL;
}
  
export interface ICloseDetailAction {
  readonly type: typeof CLOSE_DETAIL;
}
  
export type TIngredientsActions =
  | IOpenDetailAction
  | ICloseDetailAction;