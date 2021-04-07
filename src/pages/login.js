import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import logo from '../assets/images/logo.png'
import { HTTP_REQUEST } from '../helper/global';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router-dom';

function Login(){
    const [usernameData, setUsernameData] = useState("");
    const [passwordData, setPasswordData] = useState("");
    const [loginDisabled, setLoginDisabled] = useState(true);
    const [Loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        if(usernameData.length === 0 || passwordData.length === 0)
        {
            setLoginDisabled(true);
        }
        else{
            setLoginDisabled(false);
        }
    }, [usernameData,passwordData])

    function LoginAttemption(event){
        event.preventDefault();
        setLoading(true);
        setLoginDisabled(true)
        HTTP_REQUEST.post('open-service/userAuthentication',{
            username: usernameData,
            password: passwordData
          }).then((response) => {
            if (response.data.message === "LOGIN_SUCCESSFULL") {
                toast.success("Giriş başarılı. Yönlendiriliyorsunuz...");
                localStorage.setItem("username",usernameData);
                localStorage.setItem("user-token",response.data.token);
                setIsLoggedIn(true);
            }
            else{
                toast.error('Girilen bilgiler yanlış')
            }
            setLoading(false);
            setLoginDisabled(false);
        }).catch((err) => {
              alert(err)
        });
    }
    if(isLoggedIn){
        return <Redirect to="/"/>
    }
    return(
        <div id="login-container">
            <ToastContainer position="top-right" autoClose={2000}/>

            <div id="login-box">
            <div className="login-logo-stage">
                    <img src={logo} alt=""/>
                    <Form onSubmit={LoginAttemption}>
                        <div class="form-group">
                            <input type="text" class="form-control" id="username" placeholder="Kullanıcı Adı" onChange={(event)=> setUsernameData(event.target.value) }/>
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" id="password" placeholder="Parola" onChange={(event)=>setPasswordData(event.target.value)}/>
                        </div>
                        <Button as='input' type='submit' value={Loading ? "Giriş yapılıyor ..." : "Giriş"}  variant='warning' block disabled={loginDisabled}/>                       
                    </Form>
                </div>
            </div>
            <div id="login-footer-version">
                Datagram V 1.0.0
            </div>
        </div>
    );
}

export default Login;