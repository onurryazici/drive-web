import React from 'react';
import Login from './pages/login'
import Drive from './pages/drive'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css';
import MyShared from './pages/myShared';
import SharedWithMe from './pages/sharedWithMe';
import Trash from './pages/trash';

function App() {
  return (
    <div style={{fontFamily:'Century Gothic'}} className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/" component={Drive}/>
          <Route exact path="/my-shared" component={MyShared}/>
          <Route exact path="/shared-with-me" component={SharedWithMe}/>
          <Route exact path="/trash" component={Trash}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
