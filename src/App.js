import './App.css';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import GraphingPage from "./containers/graphingPage.js";

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Switch>
          <Route exact={true} component={GraphingPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
