import { ingredientReducer } from './ingredient';
import {
  OPEN_DETAIL,
  CLOSE_DETAIL,
} from '../actions/ingredient';

const initState = {
  ingredient: {},
  showPopup: false,
};

describe('ingredientReducer', () => {
  it('should return the initial state', () => {
    expect(ingredientReducer(undefined, {})).toEqual(initState);
  });

  it('should handle OPEN_DETAIL', () => {
    expect(ingredientReducer(initState, {
      type: OPEN_DETAIL,
      ingredient: {
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
    })).toEqual({
      ...initState,
      ingredient: {
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
      showPopup: true,
    });
  });

  it('should handle CLOSE_DETAIL', () => {
    expect(ingredientReducer(initState, {
      type: CLOSE_DETAIL,
    })).toEqual({
      ...initState,
      ingredient: {},
      showPopup: false,
    });
  });
});
