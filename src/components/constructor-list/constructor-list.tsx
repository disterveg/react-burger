import React, { useCallback } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import ConstructorIngredient from './constructor-ingredient';
import { IIngredient } from '../../services/types/data';
import styles from './constructor-list.module.css';

type TConstructorProps = {
  elements: Array<IIngredient>, 
  bun: IIngredient | null
}

const ConstructorList: React.FC<TConstructorProps> = ({ elements, bun }) => {
  const dispatch = useDispatch();

  const [{ isHover }, drop] = useDrop({
    accept: 'ingredient',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(ingredient) {
      dispatch({ type: 'ADD_INGREDIENT_CONSTRUCTOR', payload: ingredient });
    },
  });

  const findCard = useCallback((key: string) => {
    if (!elements.length) {
      return {index: 0}
    }
    const card = elements.filter((c) => `${c.key}` === key)[0];
    return {
      index: elements.indexOf(card),
    };
  }, [elements]);

  const moveCard = useCallback((key: string, atIndex: number) => {
    const { index } = findCard(key);
    dispatch({ type: 'MOVE_CLIENT_INGREDIENT', payload: { key, atIndex, index } });
  }, [findCard, dispatch]);

  return (
    <div className={`${styles.section} pl-9`} ref={drop}>
      {!elements.length && !bun
        && (
        <div className={styles.advice}>
          <span className="text_type_main-default text_color_inactive">
            Перетащите сюда ингредиент, чтобы собрать заказ
          </span>
        </div>
        )}
      {bun
        && (
        <div className={`${styles.wrapper} mb-4`}>
          <DragIcon type="primary" />
          <ConstructorElement
            type="top"
            thumbnail={bun.image_mobile}
            text={`${bun.name} (верх)`}
            price={bun.price}
            isLocked
          />
        </div>
        )}
        { elements.length > 0 && (
        <div className={`${styles.list} custom-scrollbar`}>
          {elements.map((item, index) => (
            <ConstructorIngredient
              id={`${item.key}`}
              moveCard={moveCard}
              findCard={findCard}
              key={item.key}
              item={item}
              index={index}
            />
          ))}
        </div>
      )}
      {bun
        && (
        <div className={styles.wrapper}>
          <DragIcon type='primary' />
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

export default ConstructorList;
