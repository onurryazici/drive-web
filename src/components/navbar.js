import axios from 'axios'
import { MessengerSocket, MessengerStore } from 'messaging-app-ui'
import React, { useEffect, useState } from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { FaCircle, FaFacebookMessenger, FaUserCircle } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import logo from '../assets/images/logo.png'
export default function NavbarMobile() {
    const session = JSON.parse(sessionStorage.getItem('sessionObject'))
    const currentPage        = useLocation().pathname
    const driveActive        = currentPage === "/client/drive" ? "#ffc107" : "#fff"
    const mySharedActive     = currentPage === "/client/my-shared" ? "#ffc107":"#fff"
    const sharedWithMeActive = currentPage === "/client/shared-with-me" ? "#ffc107" : "#fff"
    const trashActive        = currentPage === "/client/trash" ? "#ffc107": "#fff"
    const messengerActive    = currentPage === "/client/messenger" ? "#ffc107": "#fff"
    const [conversationList, setConversationList] = useState([])
    const [haveUnreadMessage, setHaveUnreadMessage] = useState(false)

    useEffect(() => {
        if(currentPage==="/client/messenger"){
            setInterval(() => {
                setConversationList(MessengerStore.getState().conversationList)
            }, 1000)
        }
        else{
            MessengerSocket.on("INCOMING_MESSAGE",()=>{
                setHaveUnreadMessage(true)
            })
            axios.post("http://localhost:4001/api/protected/getConversationList", {
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

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" color="#000">
            <Navbar.Brand href="/">
                <img src={logo} alt="" height="45"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" ></Navbar.Toggle>
            <Navbar.Collapse id="responsive-navbar-nav" >
                <Nav className="mr-auto">
                    <Nav.Link href="/" style={{color:driveActive}}>Drive'ım</Nav.Link>
                    <Nav.Link href="/client/my-shared" style={{color:mySharedActive}}>Paylaştıklarım</Nav.Link>
                    <Nav.Link href="/client/shared-with-me" style={{color:sharedWithMeActive}}>Benimle Paylaşılanlar</Nav.Link>
                    <Nav.Link href="/client/trash" style={{color:trashActive}}>Çöp Kutusu</Nav.Link>
                    <Nav.Link href="/client/messenger" style={{color:messengerActive}}>
                        <FaFacebookMessenger color="#ffc107" fontSize="25px" style={{marginRight:'5px'}}/> Mesajlar { haveUnreadMessage 
                        ? <FaCircle color="#ff0000" fontSize="14px" style={{marginLeft:"5px"}}/>
                        : "" }
                    </Nav.Link>
                    <NavDropdown title={[<FaUserCircle color="#ffc107" fontSize="25px" style={{marginRight:'5px'}}/>,session.data.username]} id="basic-nav-dropdown">
                        
                        <NavDropdown.Item href="/logout">Çıkış yap</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            { haveUnreadMessage
              ? <span className="navbar-notification"><FaCircle/></span>
              : "" }
        </Navbar>
    )
}
