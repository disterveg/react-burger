import React from 'react';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import BurgerIngredients from '../burger-ingredients/';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

const Main = () => {
  return (
    <main className="main pt-2">
      <div className="container">
        <h1 className="page-title text_type_main-large">Соберите бургер</h1>
        <div className="row">
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </div>
        </div>
    </main>
  );
}

export default Main;
