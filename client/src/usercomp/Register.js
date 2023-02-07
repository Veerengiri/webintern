import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../App';

let chakar = Math.round(1000000 * Math.random()).toString();
// let chakar = "1111";
function Register() {
    const [name, setName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cp, setCp] = useState("");
    const [address, setAddress] = useState("");
    const [ec, setEc] = useState("");
    const nav = useNavigate();
    const {backend}=useContext(MyContext);
    const submit = async (e) => {
        e.preventDefault();
        alert("code is send to your email")
        await window.Email.send({
            Host: "smtp.elasticemail.com",
            Username: "virengirigoswami3@gmail.com",
            Password: "28FB4AE2E314E380D52BBE1F1266C80D6AB3",
            To: email,
            From: "virengirigoswami3@gmail.com",
            Subject: "verify email",
            Body: "your verification code : " + chakar
        }).then(
            () => { alert("code is send") }
        );

    }
    const cheque = (e) => {
        e.preventDefault();
        if (ec == chakar) {
            document.getElementById('register').style.display = "flex"
            document.getElementById('verify').style.display = "none"
            document.getElementById('registeruser').classList.add('rleft');
        }
        else {
            alert("code not mached")
        }
    }
    const register = async (e) => {
        e.preventDefault();
        if (password != cp) {
            alert("password not mached!");
            return;
        }
        try {
            const response = await fetch(`${backend}/api/registeruser`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    mobileNo,
                    password,
                    address
                })
            })
            const data = await response.json();
            if(data.status=="register successfully"){
                nav("/login");
            }
            else{
                alert(data.status);
            }
        } catch (error) {
            alert("some error...");
        }
    }
    useEffect(() => {
        document.getElementById('register').style.display = "none"
        document.getElementById('verify').style.display = "flex"
    }, [])
    return (
        <div className='mainlogin'>
            <div className='loginform'>
                <div id='registeruser' className='lleft'></div>
                <div className='login'>
                    <h1 style={{margin:"0"}}>Register</h1>
                    <div id='verify'>
                        <input placeholder='Enter your Email here' type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} /> 
                        <button className='btns' onClick={submit}>submit</button> <br />
                        <input placeholder='Enter OTP here' type="text" value={ec} onChange={(e) => { setEc(e.target.value) }} /> 
                        <button className='btns' onClick={cheque}>Verify</button>
                    </div>

                    <div id='register' className='registerform'>
                        
                        <form onSubmit={register} >
                            <div >

                            <input placeholder='Enter Your Name ' type="text" value={name} onChange={(e) => { setName(e.target.value) }} /><br />
                            <input placeholder='Enter Your MobileNo' type="text" value={mobileNo} onChange={(e) => { setMobileNo(e.target.value) }} /><br />
                            <input placeholder='Enter Your Password' type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} /><br />
                            <input placeholder='Confirm Password' type="password" value={cp} onChange={(e) => { setCp(e.target.value) }} /> <br />
                            <input placeholder='Enter full Address' type="text" value={address} onChange={(e) => { setAddress(e.target.value) }} /><br />
                            <button style={{marginTop:"20px"}} className='btns' type="submit">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
