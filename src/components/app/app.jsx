import React, {useState, useEffect, useReducer} from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import Loader from '../loader/loader';
import ShowError from '../show-error/show-error';
import { DataContext } from '../../services/productsContext';

const discountInitialState = { selectedIngredients: [], selectedBun: {} }; 

function reducer(state, action) {
  switch (action.type) {
    case "add":
      if (action.payload.type === 'bun') {
        return { 
          selectedIngredients: [...state.selectedIngredients],
          selectedBun: action.payload  
        };
      }
      return { 
        selectedIngredients: [...state.selectedIngredients, action.payload],
        selectedBun: {...state.selectedBun} 
      };
    case "remove":
      return {
        selectedIngredients: state.selectedIngredients.filter((item, index) => index !== action.payload),
        selectedBun: {...state.selectedBun} 
      };
    default:
      return { 
        selectedIngredients: [...state.selectedIngredients],
        selectedBun: {...state.selectedBun}   
      };
  }
} 

const App = () => {
  const URL_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients';

  const [state, setState] = useState({ 
    ingredientData: [],
    loading: true,
    hasError: false
  });
  const [ingredients, dispatcher] = useReducer(reducer, discountInitialState, undefined)

  useEffect(() => {
    const getIngredientData = async () => {
      setState({...state, loading: true});
      try {
        const response = await fetch(URL_INGREDIENTS);
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
              <DataContext.Provider value={{ ingredients, dispatcher }}>
                <Main ingredientData={state.ingredientData} />
              </DataContext.Provider>
      }
    </div>
  );
}

export default App;
