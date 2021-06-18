import React from "react";
import { UnAuthorizedRoute } from '../hocs/un-authorized-route/un-authorized-route';
import { AuthorizedRoute } from '../hocs/authorized-route/authorized-route';
import Modal from '../hocs/modal/modal'
import OrderInfo from "../order-info/order-info";
import IngredientDetails from "../ingredient-details/ingredient-details";
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
  IngredientDetailsPage
} from '../../pages';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <ModalSwitch />
    </Router>
  );
}

function ModalSwitch() {
  const location = useLocation();
  const history = useHistory();
  const background = (history.action === 'PUSH' || history.action === 'REPLACE') 
    && location.state && location.state.background;

  return (
    <div>
      <Switch location={background || location}>
        <Route path="/" exact>
          <ConstructorPage />
        </Route>
        <Route path="/ingredients/:id" exact>
          <IngredientDetailsPage />
        </Route>
        <UnAuthorizedRoute  path="/login">
          <LoginPage />
        </UnAuthorizedRoute>
        <UnAuthorizedRoute path="/register">
          <RegisterPage />
        </UnAuthorizedRoute>
        <UnAuthorizedRoute path="/forgot-password">
          <ForgotPasswordPage />
        </UnAuthorizedRoute>
        <UnAuthorizedRoute path="/reset-password">
          <ResetPasswordPage />
        </UnAuthorizedRoute>
        <Route path="/feed" exact={true}>
          <FeedPage />
        </Route>
        <Route path="/feed/:id" exact={true}>
          <OrderDetailsPage />
        </Route>
        <AuthorizedRoute path="/profile" exact={true}>
          <ProfilePage />
        </AuthorizedRoute>
        <AuthorizedRoute path="/profile/orders" exact={true}>
          <ProfileOrdersPage />
        </AuthorizedRoute>
        <AuthorizedRoute path="/profile/orders/:id" exact={true}>
          <OrderDetailsPage />
        </AuthorizedRoute>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>

      {background && <Route path="/ingredients/:id"><Modal><IngredientDetails /></Modal></Route>}
      {background && <Route path="/feed/:id"><Modal><OrderInfo /></Modal></Route>}
      {background && <Route path="/profile/orders/:id"><Modal><OrderInfo /></Modal></Route>}
    </div>
  )
}
