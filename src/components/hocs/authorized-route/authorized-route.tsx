import { Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../loader/loader';
import { loadUserData } from '../../../services/actions/auth';
import { useEffect, } from 'react';
import { getCookie } from '../../../utils/cookie';

type AuthorizedRouteProps = { 
  children: React.ReactNode; 
} & React.ComponentProps<typeof Route>;

const AuthorizedRoute: React.FC<AuthorizedRouteProps> = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const request: boolean = useSelector((state: any) => state.auth.getUserRequest);
  const failed: boolean = useSelector((state: any) => state.auth.getUserFailed);
  const success: boolean = useSelector((state: any) => state.auth.getUserLoaded);
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

export default AuthorizedRoute;