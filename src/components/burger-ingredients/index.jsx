import React, { useRef } from 'react';
import Tabs from '../tabs/tabs';
import Modal from '../hocs/modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import types from '../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import styles from './burger-ingredients.module.css';
import { OPEN_DETAIL, CLOSE_DETAIL} from '../../services/actions/ingredient';
import GroupIngredients from './group-ingredients';

const groupBy = (list, field) => {
  const map = {};
  list.forEach((item) => {
    const key = field(item);
    const collection = map[key];
    if (!collection) {
      map[key] = [item];
    } else {
      collection.push(item);
    }
  });
  return map;
};

const BurgerIngredients = () => {
  const [currentTab, setCurrent] = React.useState('');
  const containertRef = useRef();
  const dispatch = useDispatch();
  const allIngredients = useSelector((state) => state.ingredients.ingredients);
  const { ingredients, bun } = useSelector((state) => state.ingredientsConstructor);
  const { ingredient, showPopup } = useSelector((state) => state.currentIngredient);
  const ingredientsValues = Object.values(allIngredients);

  const grouped = groupBy(ingredientsValues, (item) => item.type);

  const openModal = (id) => {
    const index = ingredientsValues.findIndex((item) => item._id === id);
    dispatch({ type: OPEN_DETAIL, ingredient: ingredientsValues[index] });
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_DETAIL });
  };

  const counter = (id, group) => {
    let res = Object.values(ingredients).filter((item) => item._id === id).length;
    if (group === 'bun') {
      res = bun._id === id ? 1 : 0;
    }
    return res;
  };

  const handleTabClick = (tab) => {
    setCurrent(tab);
    const groupElements = document.getElementById(tab);
    groupElements.scrollIntoView({block: "start", behavior: "smooth"});
  }

  return (
    <section className="col-50">
      <Tabs handleTabClick={handleTabClick} tabs={types} current={currentTab} />
      <div className={`${styles.ingredients} custom-scrollbar pt-2 mr-5`} ref={containertRef}>
        {Object.values(grouped).map((elements, key) => {
          const index = Object.keys(grouped)[key];
          return (
            <GroupIngredients 
              elements={elements} 
              openModal={openModal} 
              counter={counter} 
              key={index} 
              index={index} 
              setCurrent={setCurrent} 
              containertRef={containertRef} 
            />
          );
        })}
      </div>
      { showPopup
        && (
          <Modal header="Детали ингредиента" onClose={closeModal}>
            <IngredientDetails element={ingredient} />
          </Modal>
        )}
    </section>
  );
};

export default BurgerIngredients;
