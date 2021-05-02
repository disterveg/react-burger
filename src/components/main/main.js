import React from 'react';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

//import './main.css';


const Main = () => {
  return (
    <main className="main pt-1">
      <div className="container">
        <h1 className="page-title text_type_main-large">Соберите бургер</h1>
        <div className="row">
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
        </div>
    </main>
  );
}

export default Main;
