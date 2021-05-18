import React, { useEffect, useState } from 'react'
import {Link, useLocation} from 'react-router-dom';
import logo from '../../../assets/images/logo.png'
import Search from './Search'
import {  FaCircle, FaDotCircle, FaFacebookMessenger, FaUserCircle  } from 'react-icons/fa';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import styles from '../../../assets/styles.module.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import '../../../assets/Style.css'
import { MessengerSocket, MessengerStore } from 'messaging-app-ui';
export default function Header() {
    const [conversationList, setConversationList] = useState([])
    const [haveUnreadMessage, setHaveUnreadMessage] = useState(false)
    const currentPage = useLocation().pathname
    var session = JSON.parse(sessionStorage.getItem('sessionObject'))



    useEffect(() => {
        axios.post("http://192.168.91.128:4001/api/protected/getConversationList", {
            loggedUser:session.data.username
        }).then((response)=>{
            console.log(response.data.conversations)
            setConversationList(response.data.conversations)
        }).catch((error)=>{
            toast.error('Hata :' + error)
        })

        if(currentPage==="/messenger"){
            setConversationList(MessengerStore.getState().conversationList)
        }
        else{
            MessengerSocket.on("INCOMING_MESSAGE",()=>{
                setHaveUnreadMessage(true)
            })
        }
        
    }, [])

    useEffect(() => {
        console.log("www")
        console.log(conversationList)
        const unreadExist = conversationList.some((element)=>element.read===false)
        setHaveUnreadMessage(unreadExist)
    }, [conversationList])

    function Logout(){
        axios.post("http://192.168.91.128:3030/api/secured/logout",{
            token:localStorage.getItem("user-token")
        }).then((response)=>{
            sessionStorage.removeItem('sessionObject')
            sessionStorage.clear()
        })
        
    }
    return (
        <div className="menu-stage">
            <div className="logo-stage">
                <Link to= "/"><img src={logo} alt=""/></Link>
            </div>
            {/*<Search/>*/}
            <div className={styles.userMenu}>
                <Button variant="link" href="/messenger">
                    <FaFacebookMessenger className={styles.rightMenuIcons}/> 
                    { haveUnreadMessage
                      ? <FaCircle className={styles.haveUnreadMessage}/>
                      : ""
                    }
                    
                </Button>
                <DropdownButton variant="flat" title={[
                        <FaUserCircle className={styles.rightMenuIcons}/>,
                        <span style={{color:"#FFFFFF",marginLeft:'8px'}}>{session.data.username}</span>]}>
                    <Dropdown.Item href="/logout" onClick={()=>Logout()}>Çıkış yap</Dropdown.Item>
                </DropdownButton> 
            </div>
        </div>
    )
}
/*
export default class Header extends Component {
    state = {
        isOpen: false,
        session : JSON.parse(sessionStorage.getItem('sessionObject'))
    };
    toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });
    render() {
        const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
        return (
            <div className="menu-stage">
                <div className="logo-stage">
                    <Link to= "/"><img src={logo} alt=""/></Link>
                </div>
                {//<Search/>}
                <ul className="user-menu-ul">
                    <li>
                        <Button variant="link">
                            <FaFacebookMessenger color="#ffc107" fontSize="35px" style={{marginTop:'-5px'}}/> 
                        </Button>
                    </li>
                    <li>
                    <div className="dropdown" onClick={this.toggleOpen}>
                        <button className="btn shadow-none" type="button" id="user-dropdown-button" data-toggle="dropdown" aria-haspopup="true">
                                <div id="user-dropdown-info">{sessionStorage.getItem("sessionObject").data.username}</div>
                                <div id="user-dropdown-image">
                                    <FaUserCircle style={{fontSize:'28px',marginTop:'-3px'}}/>
                                </div>
                        </button>
                        <div className={menuClass} id="user-dropdown-context" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item btn-warning" href="#nogo">
                            Çıkış yap
                        </a>
                        </div>
                    </div>
                    </li>
                    
                    
                </ul>
            </div>
        )
    }
}*/
