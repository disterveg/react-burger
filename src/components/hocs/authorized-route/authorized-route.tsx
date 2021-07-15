import { Redirect, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Loader from '../../loader/loader';
import { loadUserData } from '../../../services/actions/auth';
import { useEffect, } from 'react';
import { getCookie } from '../../../utils/cookie';
import { useAppSelector } from '../../../services/hooks/hooks';

type AuthorizedRouteProps = { 
  children: React.ReactNode; 
} & React.ComponentProps<typeof Route>;

const AuthorizedRoute: React.FC<AuthorizedRouteProps> = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const request: boolean = useAppSelector((state) => state.auth.getUserRequest);
  const failed: boolean = useAppSelector((state) => state.auth.getUserFailed);
  const success: boolean = useAppSelector((state) => state.auth.getUserLoaded);
  const hasToken = !!localStorage.getItem('refreshToken') && getCookie('accessToken');

  useEffect(
    () => {
      if (hasToken) {
        dispatch(loadUserData());
      }
    },
    [dispatch, hasToken]
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

export default AuthorizedRoute;