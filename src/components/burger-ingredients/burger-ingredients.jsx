import React from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Tabs from '../tabs/tabs';
import data from '../../utils/data';
import types from '../../utils/types';
import './burger-ingredients.css';


const groupBy = (list, field) => {
  const map = {};
  list.forEach((item) => {
    const key = field(item);
    const collection = map[key];
    if (!collection) {
      map[key] = [item]
    } else {
      collection.push(item);
    }
  });
  return map;
}
  
const grouped = groupBy(data, item => item.type);

const handleButtonClick = (anchor) => {
  const groupElements = document.getElementById(anchor);
  groupElements.scrollIntoView({block: "start", behavior: "smooth"});
}

const BurgerIngredients = () => {
    return (
      <section className="col-50">
        <Tabs handleButtonClick={handleButtonClick} tabs={types} />
        <div className="ingredients custom-scrollbar pt-1 pr-2">
          {Object.values(grouped).map((elements, key) => {
              const index = Object.keys(grouped)[key];
              return (
                <div
                  className="group mt-4 mb-4"
                  id={index} 
                  key={index}
                >
                  <h2 className="text">{types[index]}</h2>
                  <div className="d-flex flex-wrap">
                {
                  elements.map((number) => (
                    <div className="ingredient col-50 mb-5 mt-5" key={number._id}>
                      <Counter count={1} size="default" />
                      <img src={number.image} className="img" />
                      <span className="price text_type_digits-default mb-1">{number.price} <CurrencyIcon /></span>
                      <p className="name text text_type_main-default">{number.name}</p>
                    </div>
                  )
                )
                }
                  </div>
                </div>
              )
          })
          }
        </div>  
      </section>
    );
  }
  
  export default BurgerIngredients;