import React, { useState, useEffect, useContext,useRef } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { MyContext } from '../App';
// import Loading from '../generalcomp/Loading';
import emailjs from '@emailjs/browser';

const chakar = Math.round(1000000 * Math.random()).toString();
function Login(props) {
  const { sai, isadmin, mae, ismainadmin } = props
  const {backend}=useContext(MyContext);
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cp, setCp] = useState("");
  const [code, setCode] = useState("");
  const [submit,setSubmit]=useState("Login");
  const [sendotp,setSendotp]=useState("Send OTP");
  const [cps,setCps]=useState("Submit");
  const form = useRef();

  const login = async (e) => {
    if(submit=="Just a Sec..."){
      return;
    }
    setSubmit("Just a Sec...");
    e.preventDefault();
    const response = await fetch(`${backend}/api/loginmalik`, {
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
    if (data.status == "ok") {
      // window.localStorage.setItem('emailforadmin',email);
      // window.localStorage.setItem('adminid',data.admin._id);
      window.localStorage.setItem('token',data.token);
      isadmin(true);
      sai(data.admin._id);
      if (mae == data.admin.email) {
        ismainadmin(true);
      }
      nav("/aorders");
    }else{
      alert(data.status);

    }
    setSubmit("Login")
  }
  const forgetpassword = async (e) => {
    e.preventDefault();
    document.getElementById('login').style.display = "none";
    document.getElementById('forget').style.display = "unset";
  }
  const sendmail = async (e) => {
    e.preventDefault();
    setSendotp("Sending...");
    setPassword("");
    
    if (!email) {
      alert("please enter valid email");
      return;
    }
    await emailjs.sendForm('service_z80kdsc', 'template_pkan5j9', form.current, 'tAnIMRTGjOth0eHFS')
    .then((result) => {
        alert("code is send to your email")
    }, (error) => {
    });

    document.getElementById('forget').style.display = "none";
    document.getElementById('fcode').style.display = "unset";
    setSendotp("Send OTP");
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
    if(cps=="Just a Sec..."){return}
    setCps("Just a Sec...");
    if (cp != password) {
      alert("password not mached");
      return;
    }

    const response = await fetch(`${backend}/api/addmincp/${email}/${password}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
    const data = await response.json();
    alert(data.status);
    setPassword("");
    setCp("");
    setCode("");
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

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_z80kdsc', 'template_pkan5j9', form.current, 'tAnIMRTGjOth0eHFS')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
  };
  

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
        <div className='lleft'></div>
        <div>
          <form id='login' className='login' onSubmit={login} >
            <div>
              <h1>Admin Login</h1>
              <input placeholder='Enter your EmailId' type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} /> <br />
              <input placeholder='Enter your Password' type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} /> <br />
              <span>
                <p><Link to={"/login"}>login as customer</Link></p>
                <p onClick={forgetpassword} style={{ cursor: "pointer" }}>Forger password</p>
              </span>
              <button className='btns' style={{ marginBottom: "-20px", marginTop: "10px" }} type="submit">{submit}</button>
            </div>
          </form>
          <form id='forget' className='login' onSubmit={sendmail}>
            <div>
              <input placeholder='Enter Your Email' type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} /> <br />

              <span style={{ marginBottom: "-40px", marginTop: "10px" }}>
                <button className='btns' type='submit'>{sendotp}</button> <br />
                <button className='btns' onClick={(d) => {
                  d.preventDefault();
                  close();
                }}>back</button>
              </span>
            </div>
          </form>
          <form id='fcode' className='login' onSubmit={verifycode}>
            <div>
              <input placeholder='Enter OTP here' type="text" value={code} onChange={(e) => { setCode(e.target.value) }} /><br />

              <span style={{ marginBottom: "-40px", marginTop: "10px" }}>
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
              <span style={{ marginBottom: "-20px", marginTop: "10px" }}>
                <button className='btns' type="submit">{cps}</button> <br />
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
