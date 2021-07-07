export type TBunType = 'bun' | 'sauce' | 'main';
export type TStatuses = 'created' | 'pending' | 'done';
export type TProfileInputs = 'name' | 'email' | 'password';

export type TTabs = Array<{
  name: string;
  type: TBunType;
}>

export type TNutrients = Array<{
  id: string;
  name: string;
  value: number | 'n/a';
}>

export interface IIngredient {
  key?: string,
  type: TBunType;
  _id: string;
  name: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  description?: string;
  __v: number;
}
export interface IIngredientWithCount extends IIngredient {
  count: number;
}

export interface IOrder {
  number: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  price?: number;
  _id: string;
  status: TStatuses;
  ingredients: Array<string> | Array<IIngredient>;
  owner?: {
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  }
}

export interface IOrderDoneResponse {
  success: true;
  name: string;
  order: IOrder;
}

export type TOrderStatus = {
  text: string | null;
  color: string | null;
};

export type TLocation = {
  from: {
    pathname: string;
  };
  background: {
    pathname: string, 
    search: string, 
    hash: string, 
    state: null, 
    key: string
  }
}