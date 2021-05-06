import React from 'react';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

const Main = (ingredientData) => {
  return (
    <main className="main pt-2">
      <div className="container">
        <h1 className="page-title text_type_main-large">Соберите бургер</h1>
        <div className="row">
          <BurgerIngredients {...ingredientData} />
          <BurgerConstructor {...ingredientData} />
        </div>
        </div>
    </main>
  );
}

export default Main;
