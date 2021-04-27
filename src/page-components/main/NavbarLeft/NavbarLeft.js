import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from 'react-bootstrap/ProgressBar'
import UploadButton from './UploadButton'
import '../../../assets/Style.css'

export default class NavbarLeft extends Component {
    render() {
        const driveActive= window.location.pathname==="/" ? "sidenav-active" : "";
        const mySharedActive = window.location.pathname==="/my-shared" ? "sidenav-active":"";
        const sharedWithMeActive = window.location.pathname==="/shared-with-me" ? "sidenav-active" : ""
        const trashActive = window.location.pathname === "/trash" ? "sidenav-active": "";
        const settingsActive=window.location.pathname === "/settings" ? "sidenav-active":"";
        return (         
            <div className="sidenav">
                <div className="sidenavInner">
                <UploadButton></UploadButton>
                <ul className="sidenav-ul">
                    <li className={driveActive}>
                        <a href="\">Drive'ım</a>
                    </li>
                    <li className={mySharedActive}>
                        <a href="\my-shared">Paylaştıklarım</a>
                    </li>
                    <li className={sharedWithMeActive}>
                        <a href="\shared-with-me">Benimle paylaşılanlar</a>
                    </li>
                    <li className={trashActive}>
                        <a href="\trash">Çöp Kutusu</a>
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
                </div>
            </div>
            
        )
    }
}
