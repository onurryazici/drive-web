import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'

export default function Logout() {
    const token = localStorage.getItem("user-token")
    const history = useHistory();
    useEffect(() => {
        axios.get(`http://localhost:3030/api/secured/logout?token=${token}`)
        .then((response)=>{
            history.push("/login")
        }).catch(()=>{
            history.push("/login")
        })
    }, [])
    return ""
}
