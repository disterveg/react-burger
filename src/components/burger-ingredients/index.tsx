import React, { useRef } from 'react';
import Tabs from '../tabs/tabs';
import Modal from '../hocs/modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { types } from '../../utils/mapping';
import { useDispatch, useSelector } from 'react-redux';
import styles from './burger-ingredients.module.css';
import { OPEN_DETAIL, CLOSE_DETAIL} from '../../services/actions/ingredient';
import { IIngredient, RootState } from '../../services/types/data';
import GroupIngredients from './group-ingredients';

interface IGroups<T> {
  [key: string]: T[]
}

const groupBy = function<T extends {[key: string]: any}>(array: T[], key: string): IGroups<T> {
  return array.reduce(function(map: IGroups<T>, item: T) {
    (map[item[key]] = map[item[key]] || []).push(item);
    return map;
  }, {});
};

const BurgerIngredients = () => {
  const [currentTab, setCurrent] = React.useState('');
  const containertRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const allIngredients: IIngredient[] = useSelector((state: RootState) => state.ingredients.ingredients);
  const { ingredients, bun }: {ingredients: Array<IIngredient>, bun: IIngredient} = useSelector((state: any) => state.ingredientsConstructor);
  const { showPopup }: { showPopup: boolean } = useSelector((state: RootState) => state.currentIngredient);
  const ingredientsValues: Array<IIngredient> = Object.values(allIngredients);

  const grouped = groupBy(ingredientsValues, 'type');

  const closeModal = () => {
    dispatch({ type: CLOSE_DETAIL });
  };

  const counter = (id: string, group: string) => {
    const arrItems: Array<IIngredient> = Object.values(ingredients);
    let res = arrItems.filter((item) => item._id === id).length;
    if (group === 'bun') {
      res = bun._id === id ? 1 : 0;
    }
    return res;
  };

  const handleTabClick = (tab: string) => {
    setCurrent(tab);
    const groupElements = document.getElementById(tab);
    if (groupElements) {
      groupElements.scrollIntoView({block: "start", behavior: "smooth"});
    }
  }

  return (
    <section className="col-50">
      <Tabs handleTabClick={handleTabClick} tabs={types} current={currentTab} />
      <div className={`${styles.ingredients} custom-scrollbar pt-2 mr-5`} ref={containertRef}>
        {Object.values(grouped).map((elements: IIngredient[], key: number) => {
          const index: any = Object.keys(grouped)[key];
          return (
            <GroupIngredients 
              elements={elements} 
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
            <IngredientDetails />
          </Modal>
        )}
    </section>
  );
};

export default BurgerIngredients;