import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import logo from '../../../assets/images/logo.png'
import Search from './Search'
import {  FaFacebookMessenger, FaGgCircle, FaUserCircle,  } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
export default class Header extends Component {

    state = {
        isOpen: false
    };
    
    toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

    render() {
        const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
        return (
            <div className="menu-stage">
                <div className="logo-stage">
                    <Link to= "/"><img src={logo} alt=""/></Link>
                </div>
                {/*<Search/>*/}
                <ul className="user-menu-ul">
                    <li>
                        <Button variant="link">
                            <FaFacebookMessenger color="#ffc107" fontSize="35px" style={{marginTop:'-5px'}}/> 
                        </Button>
                    </li>
                    <li>
                    <div className="dropdown" onClick={this.toggleOpen}>
                        <button className="btn shadow-none" type="button" id="user-dropdown-button" data-toggle="dropdown" aria-haspopup="true">
                                <div id="user-dropdown-info">{localStorage.getItem("username")}</div>
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
}
