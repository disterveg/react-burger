import React from 'react';
import styles from './ingredient-details.module.css';

const IngredientDetails = (props) => {
  const { element } = props;
  return (
    <div className={styles.IngredientDetails}>
      <img className={styles.image} src={element.image_large} />
      <h3 className={`${styles.name} text text_type_main-medium mt-2 mb-2`}>{element.name}</h3>
      <div className={`${styles.description} text_type_main-default mt-2 mb-5`}>Превосходные котлеты из марсианской Магнолии для фирменных космических бургеров, набирающих популярность по всей вселенной.</div>
      <div className={`${styles.numbers} mt-4 mb-5 pb-3`}>
        <div className={styles.item}>
          <p className={`${styles.label} text text_type_main-default`}>Калории,ккал</p>
          <span className={`${styles.number} text_type_digits-default mt-1`}>{element.calories}</span>
        </div>
        <div className={styles.item}>
          <p className={`${styles.label} text text_type_main-default`}>Белки, г</p>
          <span className={`${styles.number} text_type_digits-default mt-1`}>{element.carbohydrates}</span>
        </div>
        <div className={styles.item}>
          <p className={`${styles.label} text text_type_main-default`}>Жиры, г</p>
          <span className={`${styles.number} text_type_digits-default mt-1`}>{element.fat}</span>
        </div>
        <div className={styles.item}>
          <p className={`${styles.label} text text_type_main-default`}>Углеводы, г</p>
          <span className={`${styles.number} text_type_digits-default mt-1`}>{element.proteins}</span>
        </div>
      </div>
    </div>
  );
}

export default IngredientDetails;