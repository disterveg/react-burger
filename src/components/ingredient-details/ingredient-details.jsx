import React from 'react';
import styles from './ingredient-details.module.css';

const IngredientDetails = (props) => {
  const { element } = props;
  return (
    <div className={styles.IngredientDetails}>
      <img className={styles.image} src={element.image_large} />
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
  );
}

export default IngredientDetails;