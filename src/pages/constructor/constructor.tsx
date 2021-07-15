
import React, { useEffect } from 'react';
import Main from '../main/main';
import Loader from '../../components/loader/loader';
import ShowError from '../../components/show-error/show-error';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useAppSelector } from '../../services/hooks/hooks';

export function ConstructorPage() {
  const dispatch = useDispatch();
  const { request, failed, ingredients } = useAppSelector((state) => state.ingredients);

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
          ? (<Loader />)
          : failed
            ? (<ShowError textError="Что-то пошло не так..." />)
            : ingredients.length > 0 && (
            <Main>
              <div className="container">
                <h1 className="text text_type_main-large mt-6 mb-5">Соберите бургер</h1>
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
