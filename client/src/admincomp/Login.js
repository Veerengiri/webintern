import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { MyContext } from '../App';
// import Loading from '../generalcomp/Loading';

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
  const login = async (e) => {
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
                <button className='btns' type='submit'>Send OTP</button> <br />
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
              <input placeholder='Enter New Password' type="text" value={password} onChange={(e) => { setPassword(e.target.value) }} /> <br />
              <input placeholder='Confirm Password' type="text" value={cp} onChange={(e) => { setCp(e.target.value) }} /> <br />
              <span style={{ marginBottom: "-20px", marginTop: "10px" }}>
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
