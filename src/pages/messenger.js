import React, { useEffect, useState } from 'react'
import Sidebar from  '../components/sidebar'
import ReactMessenger, { MessengerSocket, MessengerStore }  from 'messaging-app-ui'
import 'messaging-app-ui/dist/index.css'
import '../assets/Style.css'
import { useMediaQuery } from 'react-responsive'
import NavbarMobile from '../components/navbar'
import axios from 'axios'
import { useLocation } from 'react-router'

function Messenger(){
    const session = JSON.parse(sessionStorage.getItem('sessionObject'))
    const currentPage = useLocation().pathname
    const [conversationList, setConversationList] = useState([])
    const [haveUnreadMessage, setHaveUnreadMessage] = useState(false)
    useEffect(() => {
        let usernameData = session.data.username
        MessengerSocket.auth = { usernameData }
        MessengerSocket.connect()
        MessengerSocket.emit("USER_CONNECTED", usernameData)    
        MessengerStore.selectedUser=""
        if(currentPage==="/client/messenger"){
            setInterval(() => {
                setConversationList(MessengerStore.getState().conversationList)
            }, 1000)
        }
        else{
            MessengerSocket.on("INCOMING_MESSAGE",()=>{
                setHaveUnreadMessage(true)
            })
            axios.post("http://"+window.location.hostname+":4001/api/protected/getConversationList", {
                loggedUser:session.data.username
            }).then((response)=>{
                console.log(response.data.conversations)
                setConversationList(response.data.conversations)
            }).catch((error)=>{
                toast.error('Hata :' + error)
            })
        }
    }, [])

    useEffect(() => {
        const unreadExist = conversationList.some((element)=>element.read===false)
        setHaveUnreadMessage(unreadExist) 
    }, [conversationList])
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-device-width: 1224px)' })
    const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' })
    const containerStyle= isDesktopOrLaptop || isBigScreen ? "main-container-desktop" : "main-container-mobile"
    return(
        <React.Fragment>
            {
                isDesktopOrLaptop || isBigScreen 
                ? <Sidebar/>
                : <NavbarMobile/>
            }
            <div id={containerStyle}>
                <ReactMessenger username={session.data.username} tokenName="user-token"/>
            </div>
        </React.Fragment>
    );
}

export default Messenger;