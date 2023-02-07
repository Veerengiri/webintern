import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { MyContext } from '../App';

const chakar = Math.round(1000000 * Math.random()).toString();
function Login(props) {
    const { setCustomerid, setIscustomer, setCustomeremail } = props;
    const {backend}=useContext(MyContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cp, setCp] = useState("");
    const [code, setCode] = useState("");
    const [submit,setSubmit]=useState("Submit");
    const nav = useNavigate();
    const login = async (e) => {
        e.preventDefault();
        setSubmit("Just a Sec...");
        const response = await fetch(`${backend}/api/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const data = await response.json();
        
        if (data.status == "ok,user is login successfully") {
            // window.localStorage.setItem('emailforuser',email);
            // window.localStorage.setItem('customerid',data.id);
            // console.log(data.token)
            window.localStorage.setItem('token',data.token);
            setCustomerid(data.id);
            setCustomeremail(email);
            setIscustomer(true);
            nav("/");
        }else{
            alert(data.status);
        }
        setSubmit("Submit");
    }
    
    const forgetpassword = async (e) => {
        e.preventDefault();
        document.getElementById('login').style.display = "none";
        document.getElementById('forget').style.display = "unset";
    }
    const sendmail = async (e) => {
        e.preventDefault();
        setPassword("");

        if (!email) {
            alert("please enter valid email");
            return;
        }
        await window.Email.send({
            Host: "smtp.elasticemail.com",
            Username: "virengirigoswami3@gmail.com",
            Password: "28FB4AE2E314E380D52BBE1F1266C80D6AB3",
            To: email,
            From: "virengirigoswami3@gmail.com",
            Subject: "verify email",
            Body: "your verification code : " + chakar
        }).then(
            () => { alert("code is send to your email") }
        );
        document.getElementById('forget').style.display = "none";
        document.getElementById('fcode').style.display = "unset";
    }
    const verifycode = async (e) => {
        e.preventDefault();
        if (code == chakar) {
            // alert("verify successfully");
            document.getElementById('reset').style.display = "unset";
            document.getElementById('fcode').style.display = "none";
        } else {
            alert("incorect code");
        }
    }
    const changepass = async (e) => {
        e.preventDefault();
        if (cp != password) {
            alert("password not mached");
            return;
        }

        const response = await fetch(`${backend}/api/changepassword/${email}/${password}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await response.json();
        alert(data.status);
        document.getElementById('forget').style.display = "none";
        document.getElementById('fcode').style.display = "none";
        document.getElementById('login').style.display = "unset";
        document.getElementById('reset').style.display = "none";
    }
    const close = () => {
        document.getElementById('forget').style.display = "none";
        document.getElementById('fcode').style.display = "none";
        document.getElementById('login').style.display = "unset";
        document.getElementById('reset').style.display = "none";
        setPassword("");
        setEmail("");
        setCode("");
    }
    useEffect(() => {
        document.getElementById('forget').style.display = "none";
        document.getElementById('fcode').style.display = "none";
        document.getElementById('login').style.display = "unset";
        document.getElementById('reset').style.display = "none";
        // setPassword("");
        setEmail("");
        setCode("");

    }, [])
    return (
        <div className='mainlogin'>
            <div className='loginform'>
                <div className='lleft'></div>
                <div>
                    <form id='login' className='login' onSubmit={login} >
                        <div>
                            <h1>Customer Login</h1>
                            <input placeholder='Enter your EmailId' type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} /> <br />
                            <input placeholder='Enter your Password' type="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} /><br />
                            <span>
                                <p><Link to={"/alogin"}>login as admin</Link></p>
                                <p onClick={forgetpassword} style={{ cursor: "pointer" }}>Forger password</p>
                            </span>
                            <button className='btns' type="submit">{submit}</button>
                        </div>

                    </form>

                    <form id='forget' className='login' onSubmit={sendmail}>
                        <div>
                            <input type="email" value={email} placeholder="Enter Your Email" onChange={(e) => { setEmail(e.target.value) }} /> <br />
                            <span>
                                <button className='btns' type='submit'>Send OTP</button>
                                <button className='btns' onClick={(d) => {
                                    d.preventDefault();
                                    close();
                                }}>back</button>
                            </span>
                        </div>
                    </form>

                    <form id='fcode' className='login' onSubmit={verifycode}>
                        <div>
                            <input placeholder='Enter your OTP here' type="text" value={code} onChange={(e) => { setCode(e.target.value) }} /><br />
                            <span>

                                <button className='btns' type='submit'>Verify</button>
                                <button className='btns' onClick={(d) => {
                                    d.preventDefault();
                                    close();
                                }}>back</button>
                            </span>
                        </div>
                    </form>
                    <form id='reset' className='login' onSubmit={changepass}>
                        <div>

                            <h2>Reset password</h2>
                            <input placeholder='Enter New Password' type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} /> <br />
                            <input placeholder='Confirm Password' type="password" value={cp} onChange={(e) => { setCp(e.target.value) }} /> <br />
                            <span>
                                <button className='btns' type="submit">submit</button> <br />
                                <button className='btns' onClick={(d) => {
                                    d.preventDefault();
                                    close();
                                }}>back</button>
                            </span>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Login
