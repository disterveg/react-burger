import React, {useState, useEffect} from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import './App.css';

const App = () => {
  const [state, setState] = useState({ 
    ingredientData: null,
    loading: true,
    hasError: false
  });

  const URL_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients';

  useEffect(() => {
    const getIngredientData = async () => {
      setState({...state, loading: true});
      fetch(`${URL_INGREDIENTS}`)
        .then(res => res.json())
        .then(data => setState({ 
          ...state,
          ingredientData: data.data,
          loading: false
        }))
        .catch(e => setState({ 
          ...state,
          loading: false,
          hasError: true
        }));
    }

    getIngredientData();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App">
      <AppHeader />
      {
        !state.loading && !state.hasError 
          ? <Main {...state.ingredientData} /> 
          : null
      }
    </div>
  );
}

export default App;
