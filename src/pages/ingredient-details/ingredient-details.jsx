import React from 'react';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import Main from '../main/main';

export function IngredientDetailsPage() {
  return (
    <Main>
      <div className="container pt-10 mt-10">
        <h1 className="text text_type_main-large mt-10 pt-5 mb-3 center">Детали ингредиента</h1>
        <div className='ingredient-details'>
          <IngredientDetails />
        </div>
      </div>
    </Main>
  );
}