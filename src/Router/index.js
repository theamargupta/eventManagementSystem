import React from 'react';
import { Route, Switch } from 'react-router-dom';
const LoginSignupTab = React.lazy(() =>
  import('container/CombineLoginSignupTab')
);
const Sidebar = React.lazy(() => import('container/Sidebar'));

const AppRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={LoginSignupTab} />
        <Route path='/home' component={Sidebar} />
      </Switch>
    </div>
  );
};
export default AppRouter;
