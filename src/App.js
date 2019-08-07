import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Home } from './components/Home';
import { Car} from './components/Car';
import {Navigation} from './components/Navigation';

import {BrowserRouter, Route, Switch} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
      
          <h5 className="m-3 d-flex justify-content-center">
          Car Sales Portal</h5>

          <Navigation/>

          <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/car' component={Car}/>
          </Switch>

        </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
