import React from 'react';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { DELETE_INGREDIENT_CONSTRUCTOR } from '../../services/actions/constructor'
import styles from './constructor-ingredient.module.css';

const ConstructorIngredient = (props) => {
  const {
    id, item, dispatch, index, moveCard, findCard,
  } = props;

  const originalIndex = findCard(id).index;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'element',
    item: { id, originalIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [id, originalIndex]);

  const [, drop] = useDrop(() => ({
    accept: 'element',
    canDrop: () => false,
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        const { index: overIndex } = findCard(id);
        moveCard(draggedId, overIndex);
      }
    },
  }), [findCard, moveCard]);

  return (
    <div className={`${styles.wrapper} mb-4`} ref={(node) => drag(drop(node))}>
      <DragIcon />
      <ConstructorElement
        thumbnail={item.image_mobile}
        text={item.name}
        price={item.price}
        handleClose={dispatch.bind(null, { type: DELETE_INGREDIENT_CONSTRUCTOR, payload: index })}
      />
    </div>
  );
};

export default ConstructorIngredient;
