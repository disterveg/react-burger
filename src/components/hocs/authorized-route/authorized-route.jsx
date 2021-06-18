import { Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../loader/loader';
import { loadUserData } from '../../../services/actions/auth';
import { useEffect, } from 'react';
import { getCookie } from '../../../utils/cookie';

export function AuthorizedRoute({ children, onlyAuth = false, ...rest }) {
  const dispatch = useDispatch();
  const request = useSelector((state) => state.auth.getUserRequest);
  const failed = useSelector((state) => state.auth.getUserFailed);
  const success = useSelector((state) => state.auth.getUserLoaded);
  const hasToken = !!localStorage.getItem('refreshToken') && getCookie('accessToken');

  useEffect(
    () => {
      if (hasToken) {
        dispatch(loadUserData());
      }
    },
    [dispatch]
  );

  return (
    <Route
      {...rest}
      render={({ location }) =>
      request
      ? ( <Loader /> )
      : failed || !hasToken
        ? ( <Redirect
          to={{
            pathname: '/login',
            state: { from: location }
          }}
        /> )
        : success && (
          children
        )
      }
    />
  );
}