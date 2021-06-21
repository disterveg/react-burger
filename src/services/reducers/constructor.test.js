import { constructorReducer } from './constructor';
import {
  DELETE_INGREDIENT_CONSTRUCTOR,
  ADD_INGREDIENT_CONSTRUCTOR,
  MOVE_CLIENT_INGREDIENT,
} from '../actions/constructor';
jest.mock('uuid', () => ({ v4: () => '00000000-0000-0000-0000-000000000000' }));

const initState = {
  ingredients: [],
  bun: {},
};

describe('constructorReducer', () => {
  it('should return the initial state', () => {
    expect(constructorReducer(undefined, {})).toEqual(initState);
  });

  it('should handle ADD_INGREDIENT_CONSTRUCTOR', () => {
    expect(
      constructorReducer(initState, {
        type: ADD_INGREDIENT_CONSTRUCTOR,
        payload: {
          _id: '60cb37bc6c007b0027322824',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          __v: 0,
        },
      }),
    ).toEqual(
      {
        ...initState,
        bun: {
          _id: '60cb37bc6c007b0027322824',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          __v: 0,
        },
      },
    );

    expect(
      constructorReducer(initState, {
        type: ADD_INGREDIENT_CONSTRUCTOR,
        payload: {
          _id: '60cb37bc6c007b0027322825',
          name: 'Филе Люминесцентного тетраодонтимформа',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
          __v: 0,
        },
      }),
    ).toEqual(
      {
        ...initState,
        ingredients: [...initState.ingredients, {
          key: '00000000-0000-0000-0000-000000000000',
          _id: '60cb37bc6c007b0027322825',
          name: 'Филе Люминесцентного тетраодонтимформа',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
          __v: 0,
        }],
      },
    );
  });

  it('should handle DELETE_INGREDIENT_CONSTRUCTOR', () => {
    expect(constructorReducer({
      ...initState,
      ingredients: [...initState.ingredients, {
        key: '00000000-0000-0000-0000-000000000000',
        _id: '60cb37bc6c007b0027322825',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0,
      }],
    }, {
      type: DELETE_INGREDIENT_CONSTRUCTOR,
      payload: 0,
    })).toEqual({
      ...initState,
      ingredients: [],
    });
  });

  it('should handle MOVE_CLIENT_INGREDIENT', () => {
    expect(constructorReducer({
      ...initState,
      bun: {
        _id: '60cb37bc6c007b0027322824',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0,
      },
      ingredients: [{
        key: '00000000-0000-0000-0000-000000000000',
        _id: '60cb37bc6c007b0027322825',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0,
      },
      {
        key: '00000000-0000-0000-0000-000000000000',
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
      ],
    }, {
      type: MOVE_CLIENT_INGREDIENT,
      payload: { index: 0, atIndex: 1 },
    })).toEqual({
      ...initState,
      bun: {
        _id: '60cb37bc6c007b0027322824',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0,
      },
      ingredients: [
        {
          key: '00000000-0000-0000-0000-000000000000',
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
          key: '00000000-0000-0000-0000-000000000000',
          _id: '60cb37bc6c007b0027322825',
          name: 'Филе Люминесцентного тетраодонтимформа',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
          __v: 0,
        },
      ],
    });
  });
});
