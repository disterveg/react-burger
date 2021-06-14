
import React, { useEffect } from 'react';
import Main from '../main/main';
import Loader from '../../components/loader/loader';
import ShowError from '../../components/show-error/show-error';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor.jsx';
import BurgerIngredients from '../../components/burger-ingredients';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

export function ConstructorPage() {
  const dispatch = useDispatch();
  const { request, failed, ingredients } = useSelector((state) => state.ingredients);

  useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch],
  );

  return (
    <>
      {
        request
          ? ( <Loader /> )
          : failed
            ? ( <ShowError textError="Что-то пошло не так..." /> )
            : ingredients.length > 0 && (
            <Main>
              <div className="container">
                <h1 className="page-title text_type_main-large">Соберите бургер</h1>
                <div className="row">
                  <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                  </DndProvider>
                </div>
              </div>
            </Main>
            )
      }
    </>
  );
}
