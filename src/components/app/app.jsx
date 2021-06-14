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
  ProfileOrdersPage,
} from '../../pages';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
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
        <Route path="/feed" exact>
          <FeedPage />
        </Route>
        <Route path="/feed/:id" exact>
          <OrderDetailsPage />
        </Route>
        <Route path="/profile" exact>
          <ProfilePage />
        </Route>
        <Route path="/profile/orders" exact>
          <ProfileOrdersPage />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
    </Router>
  );
}
