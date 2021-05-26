import React, {useEffect} from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import Loader from '../loader/loader';
import ShowError from '../show-error/show-error';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';

const App = () => {
  const dispatch = useDispatch();
  const { request, failed } = useSelector(state => state.ingredients);

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
            <Main />
      }
    </div>
  );
}

export default App;
