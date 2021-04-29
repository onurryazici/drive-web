import React, { Component, useState } from 'react'
import {Link} from 'react-router-dom';
import logo from '../../../assets/images/logo.png'
import Search from './Search'
import {  FaFacebookMessenger, FaGgCircle, FaUserCircle,  } from 'react-icons/fa';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import styles from '../../../assets/styles.module.css'
import axios from 'axios';

export default function Header() {
    var session = JSON.parse(sessionStorage.getItem('sessionObject'))
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
                <Button variant="link">
                    <FaFacebookMessenger className={styles.rightMenuIcons}/> 
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
