import React, {useState, useEffect} from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Tabs from '../tabs/tabs';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details'; 
import types from '../../utils/types';
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
  const groupElements = document.getElementById(anchor);
  groupElements.scrollIntoView({block: "start", behavior: "smooth"});
}

const BurgerIngredients = (ingredientData) => {
  const [state, setState] = useState({
    elementClicked: {},
    visible: false
  });

  const grouped = groupBy(Object.values(ingredientData), item => item.type);

  const openModal = (id) => {
    const index = Object.values(ingredientData).findIndex(item => item._id === id);
    setState({ 
      ...state,
      elementClicked: Object.values(ingredientData)[index],
      visible: true
    })
  }

  const closeModal = () => {
    setState({ 
      ...state,
      visible: false
    })
  }

  const modal = (
    <Modal header='Детали ингредиента' onClose={closeModal}>
      <IngredientDetails element={state.elementClicked} />
    </Modal>
  );

  useEffect(() => {
    const close = (e) => {
      if(e.keyCode === 27){
        closeModal()
      }
    }

    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, []);

  return (
    <section className="col-50">
      {state.visible && modal}
      <Tabs handleButtonClick={handleButtonClick} tabs={types} />
      <div className={`${styles.ingredients} custom-scrollbar pt-1 pr-2`}>
        {Object.values(grouped).map((elements, key) => {
          const index = Object.keys(grouped)[key];
          return (
            <div
              className="mt-4 mb-4"
              id={index} 
              key={index}
            >
              <h2 className="text">{types[index]}</h2>
              <div className="d-flex flex-wrap">
                {
                  elements.map((ingredient) => (
                    <div className={`${styles.ingredient} col-50 mb-5 mt-5`} key={ingredient._id} onClick={openModal.bind(null, ingredient._id)}>
                      <Counter count={1} size="default" />
                      <img src={ingredient.image} className={styles.img} alt={ingredient.name}/>
                      <span className={`${styles.price} text_type_digits-default mb-1`}>{ingredient.price} <CurrencyIcon /></span>
                      <p className={`${styles.name} text text_type_main-default`}>{ingredient.name}</p>
                    </div>
                  ))
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