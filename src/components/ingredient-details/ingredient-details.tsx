import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../loader/loader';
import { useParams } from 'react-router-dom';
import { getIngredients } from '../../services/actions/ingredients';
import { IIngredient, RootState } from '../../services/types/data';
import styles from './ingredient-details.module.css';

const IngredientDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{id: string}>();
  const { request, ingredients }: { request: boolean, ingredients: Array<IIngredient> } = useSelector((state: RootState) => state.ingredients);
  const ingredientsValues: Array<IIngredient> = Object.values(ingredients);
  const index = ingredientsValues.findIndex((item) => item._id === id);

  useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch],
  );

  const element = ingredientsValues[index];

  const content = request ? (
    <Loader />
  ) : element ? (
    <div className={styles.IngredientDetails}>
      <img className={styles.image} src={element.image_large} alt={element.name} />
      <h3 className={`${styles.name} text text_type_main-medium mt-4 mb-4`}>{element.name}</h3>
      <div className={`${styles.description} text_type_main-default mt-4 mb-10`}>
        Превосходные котлеты из марсианской Магнолии для фирменных космических бургеров, набирающих популярность по всей вселенной.
      </div>
      <div className={`${styles.numbers} mt-6 mb-10 pb-8`}>
        <div className={styles.item}>
          <p className={`${styles.label} text text_type_main-default text_color_inactive`}>Калории,ккал</p>
          <span className={`${styles.number} text_type_digits-default mt-2 text_color_inactive`}>{element.calories}</span>
        </div>
        <div className={styles.item}>
          <p className={`${styles.label} text text_type_main-default text_color_inactive`}>Белки, г</p>
          <span className={`${styles.number} text_type_digits-default mt-2 text_color_inactive`}>{element.carbohydrates}</span>
        </div>
        <div className={styles.item}>
          <p className={`${styles.label} text text_type_main-default text_color_inactive`}>Жиры, г</p>
          <span className={`${styles.number} text_type_digits-default mt-2 text_color_inactive`}>{element.fat}</span>
        </div>
        <div className={styles.item}>
          <p className={`${styles.label} text text_type_main-default text_color_inactive`}>Углеводы, г</p>
          <span className={`${styles.number} text_type_digits-default mt-2 text_color_inactive`}>{element.proteins}</span>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
    {content}
    </>
  );
};

export default IngredientDetails;
