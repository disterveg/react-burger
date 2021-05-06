import React from 'react';
import PropTypes from 'prop-types';
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

const itemPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
});

ConstructorList.propTypes = {
  elements: PropTypes.arrayOf(itemPropTypes.isRequired).isRequired
};

export default ConstructorList;


