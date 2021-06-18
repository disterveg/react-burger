import React from 'react';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import Main from '../main/main';

export function IngredientDetailsPage() {
  return (
    <Main>
      <div className="container">
        <IngredientDetails />
      </div>
    </Main>
  );
}