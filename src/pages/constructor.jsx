
import AppHeader from '../components/app-header/app-header';
import React, {useEffect} from 'react';
import Main from '../components/main/main';
import Loader from '../components/loader/loader';
import ShowError from '../components/show-error/show-error';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../services/actions/ingredients';

export function ConstructorPage() {
  const dispatch = useDispatch();
  const { request, failed, ingredients } = useSelector(state => state.ingredients);

  useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch]
  );
    
    return (
    <div className="App">
      <AppHeader />
      {
        request ?
          <Loader /> :
          failed ?
            <ShowError textError='Что-то пошло не так...' /> :
            ingredients.length > 0 && <Main />
      }
    </div>
  ); 
}


