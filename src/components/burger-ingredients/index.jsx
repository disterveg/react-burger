import React from 'react';
import Tabs from '../tabs/tabs';
import Modal from '../hocs/modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details'; 
import types from '../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import Ingredient from './ingredinet';
import styles from './burger-ingredients.module.css';

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

const handleButtonClick = (anchor) => {
  //const groupElements = document.getElementById(anchor);
  //groupElements.scrollIntoView({block: "start", behavior: "smooth"});
}

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const allIngredients = useSelector(state => state.ingredients.ingredients);
  const { ingredients, bun } = useSelector(state => state.ingredientsConstructor);
  const { ingredient, showPopup } = useSelector(state => state.currentIngredient);
  const ingredientsValues = Object.values(allIngredients);

  const grouped = groupBy(ingredientsValues, item => item.type);

  const openModal = (id) => {
    const index = ingredientsValues.findIndex(item => item._id === id);
    dispatch({type: 'ADD_INGREDIENT_CONSTRUCTOR', payload: ingredientsValues[index]});
    dispatch({type: 'OPEN_DETAIL', ingredient: ingredientsValues[index]});
  }

  const closeModal = () => {
    dispatch({type: 'CLOSE_DETAIL'});
  }

  const counter = (id, group) => {
    let res = Object.values(ingredients).filter(item => item._id === id).length
    if (group === 'bun') {
      res = bun._id === id ? 1 : 0; 
    }
    return res;
  };

  return (
    <section className="col-50">
      <Tabs handleButtonClick={handleButtonClick} tabs={types} />
      <div className={`${styles.ingredients} custom-scrollbar pt-2 pr-4`}>
        {Object.values(grouped).map((elements, key) => {
          const index = Object.keys(grouped)[key];
          return (
            <div
              className="mt-8 mb-8"
              id={index} 
              key={index}
            >
              <h2 className="text">{types[index]}</h2>
              <div className="d-flex flex-wrap">
                {
                  elements.map((ingredient) => (
                    <Ingredient key={ingredient._id} ingredient={ingredient} openModal={openModal} counter={counter} index={index} />
                  ))
                }
              </div>
            </div>
          )
        })
        }
      </div> 
      { showPopup && 
        (
          <Modal header='Детали ингредиента' onClose={closeModal}>
            <IngredientDetails element={ingredient} />
          </Modal>
        )
      } 
    </section>
  );
}
  
export default BurgerIngredients;