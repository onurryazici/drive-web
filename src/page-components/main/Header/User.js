import React, { Component } from 'react'

export default class User extends Component {
    render() {
        return (
            <div id="user-dropdown-context">
            <img src="" width="50" height="50" alt="" />
            <br/>
            <br/>
            <h3>{sessionStorage.getItem("sessionObject").data.username}</h3>
            <br/>
            <button type="button" className="btn btn-warning " style={{marginRight:'5px'}}>Hesap Ayarları</button>
            <button type="button" className="btn btn-warning ">Oturumu Kapat</button>
        </div>
        )
    }
}
