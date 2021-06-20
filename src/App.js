import React, { useEffect, useState } from 'react';
import Login from './pages/login'
import Drive from './pages/drive'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import './App.css';
import MyShared from './pages/myShared';
import SharedWithMe from './pages/sharedWithMe';
import Trash from './pages/trash';
import Messenger from './pages/messenger'
import { socket } from 'messaging-app-ui';
import Logout from './pages/logout';
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
          <Route exact path="/logout" component={Logout}/>
          <ProtectedRoute exact path="/"><Redirect to="/client/drive"/></ProtectedRoute>
          <ProtectedRoute exact path="/client/drive" component={Drive}/>
          <ProtectedRoute exact path="/client/my-shared" component={MyShared}/>
          <ProtectedRoute exact path="/client/shared-with-me" component={SharedWithMe}/>
          <ProtectedRoute exact path="/client/trash" component={Trash}/>
          <ProtectedRoute exact path="/client/messenger" component={Messenger}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
