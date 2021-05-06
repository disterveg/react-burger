import React, {useState, useEffect} from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import Loader from '../loader/loader';
import ShowError from '../show-error/show-error';
import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import './App.css';

const App = () => {
  const URL_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients';

  const [state, setState] = useState({ 
    ingredientData: [],
    loading: true,
    hasError: false
  });

  useEffect(() => {
    const getIngredientData = async () => {
      setState({...state, loading: true});
      try {
        const response = await fetch(`${URL_INGREDIENTS}`);
        if (!response.ok) {
          throw new Error('Ответ сети был не ok.');
        }
        const json = await response.json();
        setState({ 
          ...state,
          ingredientData: json.data,
          loading: false
        });
      } catch (error) {
        setState({ 
          ...state,
          loading: false,
          hasError: true
        })
      }
    }

    getIngredientData();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App">
      <AppHeader />
      {
        state.loading || !state.ingredientData ?
          <Loader /> :
            state.hasError ?
              <ShowError textError='Что-то пошло не так...' /> :
              <Main ingredientData={state.ingredientData} />
          }
    </div>
  );
}

export default App;
