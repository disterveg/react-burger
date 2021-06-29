import React from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import styles from './ingredient.module.css';

const Ingredient = (props) => {
  const location = useLocation();
  const { ingredient, counter, index } = props;

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <div
      className={`${styles.ingredient} col-50 mb-10 mt-6`}
      ref={dragRef}
    >
      <Link
        to={{
          pathname: `/ingredients/${ingredient._id}`,
          state: { background: location },
        }}
      >
        {counter(ingredient._id, index) > 0 && <Counter count={counter(ingredient._id, index)} size="default" />}
        <img src={ingredient.image} className={styles.img} alt={ingredient.name} />
        <span className={`${styles.price} text_type_digits-default mb-2 mt-2`}>
          {ingredient.price}
          {' '}
          <CurrencyIcon />
        </span>
        <p className={`${styles.name} text text_type_main-default`}>{ingredient.name}</p>
      </Link>
    </div>
  );
};

export default Ingredient;
