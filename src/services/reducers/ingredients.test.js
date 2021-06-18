import { ingredientsReducer } from './ingredients';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SCROLL_INGREDIENTS,
} from '../actions/ingredients';

const initState = {
  ingredients: [],
  request: false,
  failed: false,
  currentTab: 'bun',
};

describe('ingredientsReducer', () => {
  it('should return the initial state', () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initState);
  });

  it('should handle GET_INGREDIENTS_REQUEST', () => {
    expect(ingredientsReducer(initState, {
      type: GET_INGREDIENTS_REQUEST,
    })).toEqual({
      ...initState,
      request: true,
    });
  });

  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    expect(ingredientsReducer({
      ...initState,
      request: true,
    }, {
      type: GET_INGREDIENTS_SUCCESS,
      ingredients: [
        {
          _id: '60cb37bc6c007b002732282b',
          name: 'Соус традиционный галактический',
          type: 'sauce',
          proteins: 42,
          fat: 24,
          carbohydrates: 42,
          calories: 99,
          price: 15,
          image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
          __v: 0,
        },
        {
          _id: '60cb37bc6c007b002732282d',
          name: 'Хрустящие минеральные кольца',
          type: 'main',
          proteins: 808,
          fat: 689,
          carbohydrates: 609,
          calories: 986,
          price: 300,
          image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
          __v: 0,
        },
      ],
    })).toEqual({
      ...initState,
      ingredients: [
        {
          _id: '60cb37bc6c007b002732282b',
          name: 'Соус традиционный галактический',
          type: 'sauce',
          proteins: 42,
          fat: 24,
          carbohydrates: 42,
          calories: 99,
          price: 15,
          image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
          __v: 0,
        },
        {
          _id: '60cb37bc6c007b002732282d',
          name: 'Хрустящие минеральные кольца',
          type: 'main',
          proteins: 808,
          fat: 689,
          carbohydrates: 609,
          calories: 986,
          price: 300,
          image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
          __v: 0,
        },
      ],
      request: false,
    });
  });

  it('should handle GET_INGREDIENTS_FAILED', () => {
    expect(ingredientsReducer({
      ...initState,
      request: true,
    }, {
      type: GET_INGREDIENTS_FAILED,
    })).toEqual({
      ...initState,
      request: false,
      failed: true,
    });
  });

  it('should handle SCROLL_INGREDIENTS', () => {
    expect(ingredientsReducer(initState, {
      type: SCROLL_INGREDIENTS,
      payload: 'bun',
    })).toEqual({ ...initState, currentTab: 'bun' });
  });
});
