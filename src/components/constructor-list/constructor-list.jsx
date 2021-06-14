import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import ConstructorIngredient from './constructor-ingredient';
import styles from './constructor-list.module.css';

const ConstructorList = ({ elements, bun }) => {
  const dispatch = useDispatch();
  const isEmptyIngredients = Object.keys(elements).length === 0;
  const isEmptyBun = Object.keys(bun).length === 0;

  const [{ isHover }, drop] = useDrop({
    accept: 'ingredient',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(ingredient) {
      dispatch({ type: 'ADD_INGREDIENT_CONSTRUCTOR', payload: ingredient });
    },
  });

  const findCard = useCallback((key) => {
    const card = elements.filter((c) => `${c.key}` === key)[0];
    return {
      index: elements.indexOf(card),
    };
  }, [elements]);

  const moveCard = useCallback((key, atIndex) => {
    const { index } = findCard(key);
    dispatch({ type: 'MOVE_CLIENT_INGREDIENT', payload: { key, atIndex, index } });
  }, [findCard, elements, dispatch]);

  return (
    <div className={`${styles.section} pl-10`} ref={drop}>
      {isEmptyIngredients && isEmptyBun
        && (
        <div className={styles.advice}>
          <span className="text_type_main-default text_color_inactive">
            Перетащите сюда ингредиент, чтобы собрать заказ
          </span>
        </div>
        )}
      {!isEmptyBun
        && (
        <div className={`${styles.wrapper} mb-4`}>
          <DragIcon />
          <ConstructorElement
            type="top"
            thumbnail={bun.image_mobile}
            text={`${bun.name} (верх)`}
            price={bun.price}
            isLocked
          />
        </div>
        )}
      <div className={`${styles.list} custom-scrollbar`}>
        {elements.map((item, index) => (
          <ConstructorIngredient
            id={`${item.key}`}
            moveCard={moveCard}
            findCard={findCard}
            key={item.key}
            item={item}
            dispatch={dispatch}
            index={index}
          />
        ))}
      </div>
      {!isEmptyBun
        && (
        <div className={styles.wrapper}>
          <DragIcon />
          <ConstructorElement
            type="bottom"
            thumbnail={bun.image_mobile}
            text={`${bun.name} (низ)`}
            price={bun.price}
            isLocked
          />
        </div>
        )}
    </div>
  );
};

const itemPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  image_mobile: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
});

ConstructorList.propTypes = {
  elements: PropTypes.arrayOf(itemPropTypes),
  bun: itemPropTypes,
};

export default ConstructorList;
