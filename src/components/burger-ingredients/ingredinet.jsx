import React from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import styles from './ingredient.module.css';

const Ingredient = (props) => {
  const { ingredient, openModal, counter, index } = props;
  const [{isDrag}, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: monitor => ({
        isDrag: monitor.isDragging()
    })
});
  return (
    <div className={`${styles.ingredient} col-50 mb-8 mt-10`} onClick={openModal.bind(null, ingredient._id)} ref={dragRef}>
      {counter(ingredient._id, index) > 0 && <Counter count={counter(ingredient._id, index)} size="default" />}
      <img src={ingredient.image} className={styles.img} alt={ingredient.name}/>
      <span className={`${styles.price} text_type_digits-default mb-2`}>{ingredient.price} <CurrencyIcon /></span>
      <p className={`${styles.name} text text_type_main-default`}>{ingredient.name}</p>
    </div>
  );
}

export default Ingredient;  