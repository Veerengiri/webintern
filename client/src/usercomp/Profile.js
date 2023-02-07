import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../App';
import Loading from '../generalcomp/Loading';

function Profile(props) {
  const userid = props.ci;
  const {backend}=useContext(MyContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [address, setAddress] = useState("");
  const [newpass, setNewpass] = useState("");
  const [cp, setCp] = useState("");
  const [isIntput,setIsInput]=useState(false);
  const nav = useNavigate()
  const showprofile = async (e) => {
    e.preventDefault();
    setIsInput(true);
    const response = await fetch(`${backend}/api/getuser/${userid}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
    const data = await response.json();
    const user = await data.user;
    setName(user.name);
    setEmail(user.email);
    setMobileNo(user.mobileNo);
    setAddress(user.address);
    setIsInput(false) 
  };
  const updateprofile = async (e) => {
    e.preventDefault();
    document.getElementById('updateuser').style.display = "unset";
    document.getElementById('profileinfo').style.display = "none";
  }
  const update = async (e) => {
    e.preventDefault();
    const response = await fetch(`${backend}/api/updateuser`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        userid,
        name,
        mobileNo,
        address,
      })
    })
    const data = await response.json();
    alert(data.status);
    document.getElementById('showprofile').click();
    document.getElementById('updateuser').style.display = "none";
    document.getElementById('profileinfo').style.display = "unset";
  }
  const changepass = async (e) => {
    e.preventDefault();
    if (newpass != cp) {
      alert("password not matched");
      return;
    }
    const response = await fetch(`${backend}/api/changepassword/${email}/${newpass}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
    const data = await response.json();
    alert(data.status);
    document.getElementById('closecp').click();
  }
  const openchangepass = async (e) => {
    e.preventDefault();
    document.getElementById('updateuser').style.display = "none";
    document.getElementById('profileinfo').style.display = "none";
    document.getElementById('changepass').style.display = "unset";
  }
  const closeupdate = (e) => {
    e.preventDefault();
    document.getElementById('updateuser').style.display = "none";
    document.getElementById('profileinfo').style.display = "unset";
    document.getElementById('changepass').style.display = "none";
  }
  useEffect(() => {
    if (!props.ic) {
      nav("/")
    }
    document.getElementById('showprofile').click();
    document.getElementById('updateuser').style.display = "none";
    document.getElementById('profileinfo').style.display = "unset";
    document.getElementById('changepass').style.display = "none";
  }, [])
  return (
    <>
      <div style={{position:"fixed",top:'0',left:'0',height:"100vh",width:'100vw',zIndex:'5',backgroundColor:"rgb(0,0,0,.5)",display:`${!isIntput?"none":"flex"}`,justifyContent:'center',alignItems:'center'}}><Loading/></div>
      <div className='mainlogin'><button id='showprofile' style={{ display: "none" }} onClick={showprofile}>showprofile</button>
        <form style={{ padding: "10px 30px" }} className='profileinfo login' id='updateuser' onSubmit={update}>
          <div style={{ marginTop: "30px" }}>

            <input style={{ backgroundColor: "rgb(0,0,0,0.5)" }} type="text" value={name} onChange={(e) => { setName(e.target.value) }} /><br />
            <input style={{ backgroundColor: "rgb(0,0,0,0.5)" }} type="text" value={mobileNo} onChange={(e) => { setMobileNo(e.target.value) }} /><br />
            <input style={{ backgroundColor: "rgb(0,0,0,0.5)" }} type="text" value={address} onChange={(e) => { setAddress(e.target.value) }} /><br />
            <span>
              <button className='btns' type="submit">update</button>
              <button className='btns' onClick={closeupdate}>close</button>

            </span>
          </div>
        </form>
        <form style={{ padding: "30px 5px" }}  id='changepass' className='profileinfo login' onSubmit={changepass}>
          <div style={{ marginTop: "30px" }}>
            {/* <h3>Enter new password</h3> */}
            <input style={{ backgroundColor: "rgb(0,0,0,0.5)" }} placeholder="Enter New Password"  type="password" value={newpass} onChange={(e) => { setNewpass(e.target.value) }} /><br />
            <input style={{ backgroundColor: "rgb(0,0,0,0.5)" }} placeholder="Confirm Password" type="password" value={cp} onChange={(e) => { setCp(e.target.value) }} /><br />
            <span>
              <button className='btns' type="submit">change</button>
              <button className='btns' id='closecp' onClick={closeupdate} >close</button>
            </span>

          </div>
        </form>
        <div className='profileinfo' id='profileinfo'>
          <p style={{ marginTop: "0" }}><span> Name :</span> {name}</p>
          <p><span> Email :</span> {email}</p>
          <p><span> MobileNo :</span> {mobileNo}</p>
          <p><span> Address :</span> {address}</p>
          <span>
            <button className='btns' onClick={updateprofile}>update profile</button>
            <button className='btns' onClick={openchangepass}>change password</button>
          </span>
        </div>
      </div>
    </>
    
  )
}

export default Profile
