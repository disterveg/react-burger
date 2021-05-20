import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DataContext } from '../../services/productsContext';
import styles from './constructor-list.module.css';

const ConstructorList = ({elements, bun}) => {
  const { dispatcher } = useContext(DataContext);
  const isEmptyBun = Object.keys(bun).length === 0;
  return (
    <div className={`${styles.section} pl-10`}>
      {!isEmptyBun && 
        <div className={`${styles.wrapper} mb-4`}>
          <DragIcon />
          <ConstructorElement 
            type='top' 
            thumbnail={bun.image_mobile} 
            text={`${bun.name} (верх)`}
            price={bun.price} 
            isLocked={true}
          /> 
        </div>
      }
      <div className={`${styles.list} custom-scrollbar`}>
        {elements.map((item, index) => (
          <div className={`${styles.wrapper} mb-4`} key={`${item._id}${index}`}>
            <DragIcon />
            <ConstructorElement 
              thumbnail={item.image_mobile} 
              text={item.name} 
              price={item.price} 
              handleClose={dispatcher.bind(this, {type: 'remove', payload: index})} 
            /> 
          </div>
        ))}
      </div>
      {!isEmptyBun && 
        <div className={styles.wrapper} >
          <DragIcon />
          <ConstructorElement 
            type='bottom' 
            thumbnail={bun.image_mobile} 
            text={`${bun.name} (низ)`} 
            price={bun.price} 
            isLocked={true}
          /> 
        </div>
      }
    </div> 
  );
}

const itemPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  image_mobile: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
});

ConstructorList.propTypes = {
  elements: PropTypes.arrayOf(itemPropTypes),
  bun: itemPropTypes
};

export default ConstructorList;


