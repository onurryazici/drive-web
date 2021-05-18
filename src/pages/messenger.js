import React, { useEffect, useState } from 'react'
import Header from  '../page-components/main/Header/Header'
import NavbarLeft from  '../page-components/main/NavbarLeft/NavbarLeft'
import '../assets/Style.css'
import ReactMessenger  from 'messaging-app-ui'
import 'messaging-app-ui/dist/index.css'

function Messenger(){
    const session = JSON.parse(sessionStorage.getItem('sessionObject'))
   
    return(
        <div>
            <Header/>
            <NavbarLeft/>
            <div id="main-container">
                <ReactMessenger username={session.data.username} tokenName="user-token"/>
            </div>
        </div>
    );
}

export default Messenger;