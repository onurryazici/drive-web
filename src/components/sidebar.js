import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { FaCircle, FaFacebookMessenger, FaUserCircle } from 'react-icons/fa'
import { Button, Dropdown, DropdownButton } from 'react-bootstrap'
import { useLocation } from 'react-router'
import { MessengerSocket, MessengerStore } from 'messaging-app-ui'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import axios from 'axios'
import styles from '../assets/styles.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../assets/Style.css'
function Sidebar( ) {
    const session = JSON.parse(sessionStorage.getItem('sessionObject'))
    const currentPage = useLocation().pathname
    const driveActive        = currentPage === "/client/drive" ? "sidenav-active" : ""
    const mySharedActive     = currentPage==="/client/my-shared" ? "sidenav-active":""
    const sharedWithMeActive = currentPage==="/client/shared-with-me" ? "sidenav-active" : ""
    const trashActive        = currentPage === "/client/trash" ? "sidenav-active": ""
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
            axios.post("http://192.168.91.130:4001/api/protected/getConversationList", {
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
        <React.Fragment>
            <div className="sidenav">
                <div className="logo-stage">
                    <Link to= "/"><img src={logo} alt=""/></Link>
                </div>
                <div className="sidenavInner">
                <Button variant="flat" href="/client/messenger" style={{background:'#ffc107',height:'50px',borderRadius:'0',padding:'11px'}} block>
                    <FaFacebookMessenger style={{fontSize:'28px'}}/> 
                    <span style={{marginLeft:'8px',marginTop:'3px'}}>Mesajlar</span>
                    { haveUnreadMessage
                    ? <FaCircle className={styles.haveUnreadMessage}/>
                    : "" }
                </Button>
                <ul className="sidenav-ul">
                    <li className={driveActive}>
                        <a href="/client/drive">Drive'ım</a>
                    </li>
                    <li className={mySharedActive}>
                        <a href="/client/my-shared">Paylaştıklarım</a>
                    </li>
                    <li className={sharedWithMeActive}>
                        <a href="/client/shared-with-me">Benimle paylaşılanlar</a>
                    </li>
                    <li className={trashActive}>
                        <a href="/client/trash">Çöp Kutusu</a>
                    </li>
                </ul>
                {
                /*
                <div className="card" style={{background:'#343a40'}}>
                    <ul className="list-group list-group-flush">
                    <li className="list-group-item" style={{background:'#343a40', color:'#fff',fontSize:'14px',textAlign:'left'}}>Kullanılan depolama alanı</li>
                    <li className="list-group-item" style={{background:'#343a40',color:'#fff'}}>
                <ProgressBar variant="success" now={40} />
                <span style={{fontSize:'13px',color:'#dedede'}}>16 Gb üzerinden 3Gb kullanılıyor</span>
                    </li>
                    </ul>
                </div>
                */
                }
                    <div className={styles.userMenu}>
                        <DropdownButton variant="flat" drop="up" block style={{width:'100%',textAlign:'left', display:'flex', flexDirection:'column'}} title={[
                            <FaUserCircle className={styles.rightMenuIcons}/>,
                            <span style={{color:"#FFFFFF",marginLeft:'8px'}}>{session.data.username}</span>]}>
                            <Dropdown.Item href="/logout" onClick={()=>Logout()}>Çıkış yap</Dropdown.Item>
                        </DropdownButton> 
                    </div>
                </div>
            </div>
        </React.Fragment>      
    )
}
export default Sidebar