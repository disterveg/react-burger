import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-list.module.css';

const ConstructorList = ({elements}) => {
  const index = elements.findIndex(word => word.type === 'bun');
  const bun = elements.splice(index, 1);
  return (
    <div className={`${styles.section} pl-10`}>
      <div className={styles.wrapper} >
        <DragIcon />
        <ConstructorElement 
          type='top' 
          thumbnail={bun[0].image_mobile} 
          text={bun[0].name} 
          price={bun[0].price} 
          isLocked={true}
        /> 
      </div>
      <div className={`${styles.list} custom-scrollbar`}>
        {elements.map((item) => (
          <div className={`${styles.wrapper} mb-4 mt-4`} key={item._id}>
            <DragIcon />
            <ConstructorElement thumbnail={item.image_mobile} text={item.name} price={item.price} /> 
          </div>
        ))}
      </div>
      <div className={styles.wrapper} >
        <DragIcon />
        <ConstructorElement 
          type='bottom' 
          thumbnail={bun[0].image_mobile} 
          text={bun[0].name} 
          price={bun[0].price} 
          isLocked={true}
        /> 
      </div>
    </div> 
  );
}

export default ConstructorList;


