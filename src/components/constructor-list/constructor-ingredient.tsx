import React from 'react';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { DELETE_INGREDIENT_CONSTRUCTOR } from '../../services/actions/constructor';
import { IIngredient } from '../../services/types/data';
import styles from './constructor-ingredient.module.css';

const ConstructorIngredient = (props: {id: string, item: IIngredient, index: number, moveCard: (key: string, atIndex: number) => void, findCard: (key: string) => {index: number;}}) => {
  const {
    id, item, index, moveCard, findCard,
  } = props;
  const dispatch = useDispatch();

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
    hover({ id: draggedId }: {id: string}) {
      if (draggedId !== id) {
        const { index: overIndex } = findCard(id);
        moveCard(draggedId, overIndex);
      }
    },
  }), [findCard, moveCard]);

  return (
    <div className={`${styles.wrapper} mb-4`} ref={(node) => drag(drop(node))}>
      <DragIcon type='error' />
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
