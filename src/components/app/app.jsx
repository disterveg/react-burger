import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { 
  ConstructorPage, 
  LoginPage, 
  NotFound404, 
  RegisterPage, 
  ForgotPasswordPage, 
  ResetPasswordPage, 
  FeedPage, 
  OrderDetailsPage, 
  ProfilePage, 
  ProfileOrdersPage
} from '../../pages';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true}>
          <ConstructorPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/forgot-password">
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password">
          <ResetPasswordPage />
        </Route>
        <Route path="/feed" exact={true}>
          <FeedPage />
        </Route>
        <Route path={`/feed/:id`} exact={true}>
          <OrderDetailsPage />
        </Route>
        <Route path={`/profile`} exact={true}>
          <ProfilePage />
        </Route>
        <Route path={`/profile/orders`} exact={true}>
          <ProfileOrdersPage />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
    </Router>
  );
}

