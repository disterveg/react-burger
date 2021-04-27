import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import './constructor-list.css';

const ConstructorList = ({elements}) => {
  const index = elements.findIndex(word => word.type === 'bun');
  const bun = elements.splice(index, 1);
  return (
    <div className="wrapper-section pl-5">
      <div className="item-wrapper" >
        <DragIcon />
        <ConstructorElement 
          type='top' 
          thumbnail={bun[0].image_mobile} 
          text={bun[0].name} 
          price={bun[0].price} 
          isLocked={true}
        /> 
      </div>
      <div className="constructor-list custom-scrollbar">
        {elements.map((item) => (
          <div className="item-wrapper mb-2 mt-2" key={item._id}>
            <DragIcon />
            <ConstructorElement thumbnail={item.image_mobile} text={item.name} price={item.price} /> 
          </div>
        ))}
      </div>
      <div className="item-wrapper" >
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


