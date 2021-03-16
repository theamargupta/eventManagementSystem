import React from 'react';
import { Route, Switch } from 'react-router-dom';
const Login = React.lazy(() => import('components/Login'));
const Signup = React.lazy(() => import('components/Signup'));
const Sidebar = React.lazy(() => import('container/Sidebar'));

const AppRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route path='/' component={Sidebar} />
      </Switch>
    </div>
  );
};
export default AppRouter;
