import { orderReducer } from './order';
import {
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAILED,
  CLOSE_POPUP,
} from '../actions/order';

const initState = {
  order: {},
  request: false,
  failed: false,
  showPopup: false,
};

const mockOrder = {
  _id: '114543',
  number: '034531',
  name: 'Death Star Starship Main бургер',
  dateCreate: '10.06.2021 20:32:22',
  status: 'ready',
  price: 640,
  ingredients: [
    {
      _id: '60666c42cc7b410027a1a9b1',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0,
    },
    {
      _id: '60666c42cc7b410027a1a9b5',
      name: 'Говяжий метеорит (отбивная)',
      type: 'main',
      proteins: 800,
      fat: 800,
      carbohydrates: 300,
      calories: 2674,
      price: 3000,
      image: 'https://code.s3.yandex.net/react/code/meat-04.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
      __v: 0,
    },
    {
      _id: '60666c42cc7b410027a1a9b6',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      __v: 0,
    },
    {
      _id: '60666c42cc7b410027a1a9b7',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
      __v: 0,
    },
    {
      _id: '60666c42cc7b410027a1a9b4',
      name: 'Мясо бессмертных моллюсков Protostomia',
      type: 'main',
      proteins: 433,
      fat: 244,
      carbohydrates: 33,
      calories: 420,
      price: 1337,
      image: 'https://code.s3.yandex.net/react/code/meat-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
      __v: 0,
    },
    {
      _id: '60666c42cc7b410027a1a9b9',
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
      _id: '60666c42cc7b410027a1a9b8',
      name: 'Соус фирменный Space Sauce',
      type: 'sauce',
      proteins: 50,
      fat: 22,
      carbohydrates: 11,
      calories: 14,
      price: 80,
      image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
      __v: 0,
    },
  ],
};

describe('orderReducer', () => {
  it('should return the initial state', () => {
    expect(orderReducer(undefined, {})).toEqual(initState);
  });

  it('should handle GET_INGREDIENTS_REQUEST', () => {
    expect(orderReducer(initState, {
      type: ADD_ORDER_REQUEST,
    })).toEqual({
      ...initState,
      request: true,
    });
  });

  it('should handle ADD_ORDER_SUCCESS', () => {
    expect(orderReducer({
      ...initState,
      request: true,
    }, {
      type: ADD_ORDER_SUCCESS,
      order: mockOrder,
    })).toEqual({
      ...initState,
      request: false,
      order: mockOrder,
      showPopup: true,
    });
  });

  it('should handle ADD_ORDER_FAILED', () => {
    expect(orderReducer({
      ...initState,
      request: true,
    }, {
      type: ADD_ORDER_FAILED,
    })).toEqual({
      ...initState,
      request: false,
      failed: true,
      showPopup: true,
    });
  });

  it('should handle CLOSE_POPUP', () => {
    expect(orderReducer({
      ...initState,
      request: false,
      order: mockOrder,
      showPopup: true,
    }, {
      type: CLOSE_POPUP,
    })).toEqual({
      ...initState,
      request: false,
      order: mockOrder,
      showPopup: false,
    });
  });
});
