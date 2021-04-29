import React, { useState } from 'react';
import Login from './pages/login'
import Drive from './pages/drive'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import './App.css';
import MyShared from './pages/myShared';
import SharedWithMe from './pages/sharedWithMe';
import Trash from './pages/trash';
function App() {

  const ProtectedRoute = ({component:Component, path, ...rest}) => {
    var storageExist = sessionStorage.getItem('sessionObject') !== null ? true : false
    var currentDate = new Date();
    var sessionObject = storageExist && JSON.parse(sessionStorage.getItem('sessionObject'))
    var expirationDate = storageExist && sessionObject.expiresAt
    if(storageExist && (Date.parse(currentDate) < Date.parse(expirationDate))){
      return (
        <Route
            path={path}
            {...rest}
            render={(props)=>{
                return <Component {...props}/>
            }}
        />
      ) 
    }
    else{
      return (
        <Redirect to="/login"/>
      )
    }
}

  return (
    <div style={{fontFamily:'Century Gothic'}} className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/logout"><Redirect to="/login"/></Route>
          <ProtectedRoute exact path="/" component={Drive}/>
          <ProtectedRoute exact path="/my-shared" component={MyShared}/>
          <ProtectedRoute exact path="/shared-with-me" component={SharedWithMe}/>
          <ProtectedRoute exact path="/trash" component={Trash}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
