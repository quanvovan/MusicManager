import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import Home from './components/Main/Home/home';
import Profile from './components/Main/Profile/profile';
import Login from './components/Authentication/Login/login';
import Register from './components/Authentication/Register/register';
import NotFound from './components/Common/not-found';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path={['/', '/home']} component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
