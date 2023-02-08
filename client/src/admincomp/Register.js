import React, { useState, useEffect, useContext,useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../App';
import emailjs from '@emailjs/browser';
const chakar = Math.round(1000000 * Math.random()).toString();


function Register(props) {
    const { isadmin } = props
    const {backend}=useContext(MyContext);
    const nav = useNavigate();
    const [name, setName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cp, setCp] = useState("");
    const adminid = "virengirigoswami3@gmail.com"
    const [ec, setEc] = useState("");
    const [submitbtn,setSubmitbtn]=useState("Register");
    const [send,setSend]=useState("Send Code");

    const form = useRef();

    const submit = async (e) => {
        e.preventDefault();
        if(send=="Sending..."){
            return;
        }
        setSend("Sending...");
        await emailjs.sendForm('service_z80kdsc', 'template_pkan5j9', form.current, 'tAnIMRTGjOth0eHFS')
        .then((result) => {
            // console.log(result.text);
            alert("code is send to your email")
        }, (error) => {
            // console.log(error.text);
        });
        setSend("Send Code")
    }
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_z80kdsc', 'template_pkan5j9', form.current, 'tAnIMRTGjOth0eHFS')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };
    const cheque = (e) => {
        e.preventDefault();
        if (ec == chakar) {
            document.getElementById('register').style.display = "flex"
            document.getElementById('verify').style.display = "none"
            document.getElementById('registeruser').classList.add('rleft');
        }
        else {
            alert("code not mached");
        }
    }
    const register = async (e) => {
        e.preventDefault();
        setSubmitbtn("Just a Sec...");
        if (password != cp) {
            alert("password not mached!");
            return;
        }
        try {
            const response = await fetch(`${backend}/api/addmalik`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    mobileNo,
                    password,
                })
            })
            const data = await response.json();
            alert(data.status);
            nav('/admins');
        } catch (error) {
            alert("some error...");
        }
        setSubmitbtn("Register");
    }
    useEffect(() => {
        if (!isadmin) {
            nav('/alogin');
        }
        document.getElementById('register').style.display = "none"
        document.getElementById('verify').style.display = "flex"
        
    }, [])
    return (
        <div className='mainlogin'>
            <form style={{display:"none"}} ref={form} onSubmit={sendEmail}>
                <label>Name</label>
                <input type="text" value={email} onChange={()=>{}} name="user_name" /><br />
                <label>Email</label>
                <input type="email" value={email} onChange={()=>{}} name="user_email" /><br />
                <label>Message</label>
                <textarea value={chakar} onChange={()=>{}} name="message" /><br />
                <input type="submit" value="Send" />
            </form>
            <div className='loginform'>
                <div id='registeruser' className='lleft'></div>
                <div className='login'>
                    <h1 style={{ margin: "0" }}>Register</h1>
                    <div id='verify'>
                        <input placeholder='Enter Email here' type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        <button className='btns' onClick={submit}>{send}</button><br />
                        <input placeholder='Enter OTP here' type="text" value={ec} onChange={(e) => { setEc(e.target.value) }} />
                        <button className='btns' onClick={cheque}>Verify</button>
                    </div>

                    <div id='register' className='registerform'>

                        <form onSubmit={register}>
                            <div>
                                <input placeholder='Enter Your Name' type="text" value={name} onChange={(e) => { setName(e.target.value) }} /><br />
                                <input placeholder='Enter Your MobileNo' type="text" value={mobileNo} onChange={(e) => { setMobileNo(e.target.value) }} /><br />
                                <input placeholder='Enter Password' type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} /><br />
                                <input placeholder='Confirm Password' type="password" value={cp} onChange={(e) => { setCp(e.target.value) }} /> <br />

                                <button className='btns' type="submit">{submitbtn}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
