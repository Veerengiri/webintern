import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../App';
import Loading from '../generalcomp/Loading'
function Profile(props) {
    const { isadmin, ai } = props;
    const {backend}=useContext(MyContext);
    const nav = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [isload,setIsload]=useState(false);
    let adminid = ai;
    const [newpass, setNewpass] = useState("");
    const [updatebtn,setUpdatebtn]=useState("Update");
    const [cbtn,setCbtn]=useState("");
    const [cp, setCp] = useState("");
    const getadmin = async (e) => {
        e.preventDefault();
        setIsload(true);
        const response = await fetch(`${backend}/api/getmalik/${adminid}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await response.json();

        setName(data.admin.name);
        setEmail(data.admin.email);
        setMobileNo(data.admin.mobileNo);
        setIsload(false);
    }
    const update = async (e) => {
        e.preventDefault();
        if(updatebtn=="Updating..."){
            return;
        }
        setUpdatebtn("Updating...");
        const response = await fetch(`${backend}/api/updateadmin`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                adminid,
                name,
                mobileNo,
            })
        })
        const data = await response.json();
        alert(data.status);
        document.getElementById('showprofile').click();
        document.getElementById('updateuser').style.display = "none";
        document.getElementById('profileinfo').style.display = "unset";
        setUpdatebtn("Update");
    }
    const changepass = async (e) => {
        e.preventDefault();
        if(cbtn=="Changing..."){
            return;
        }
        setCbtn("Changing...");
        if (newpass != cp) {
            alert("password not matched");
            return;
        }
        const response = await fetch(`${backend}/api/addmincp/${email}/${newpass}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await response.json();
        alert(data.status);
        document.getElementById('closecp').click();
        setCbtn("Change");
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
    const updateprofile = async (e) => {
        e.preventDefault();
        document.getElementById('updateuser').style.display = "unset";
        document.getElementById('profileinfo').style.display = "none";
    }
    useEffect(() => {
        if (!isadmin) {
            nav('/');
        }
        document.getElementById('showprofile').click();
        document.getElementById('updateuser').style.display = "none";
        document.getElementById('profileinfo').style.display = "unset";
        document.getElementById('changepass').style.display = "none";
    }, [])
    return (
        <>
            <div style={{position:"fixed",top:'0',left:'0',height:"100vh",width:'100vw',zIndex:'5',backgroundColor:"rgb(0,0,0,.5)",display:`${!isload?"none":"flex"}`,justifyContent:'center',alignItems:'center'}}><Loading/></div>
            <div className='mainlogin'>
                <button id='showprofile' style={{ display: "none" }} onClick={getadmin}>getadmin</button>
                <form id='updateuser' className='profileinfo login' style={{ padding: "10px 0px" }}  onSubmit={update}>
                    <div style={{ marginTop: "30px" }}>
                        <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} /><br />
                        <input type="text" value={mobileNo} onChange={(e) => { setMobileNo(e.target.value) }} /><br />
                        <span>
                            <button className='btns' type="submit">{updatebtn}</button>
                            <button className='btns' onClick={closeupdate}>close</button>
                        </span>
                    </div>
                </form>
                <form style={{ padding: "30px 20px" }}  id='changepass' className='profileinfo login' onSubmit={changepass}>
                    {/* <h3>Enter new password</h3> */}
                    <div style={{ marginTop: "30px" }}>

                    <input placeholder='Enter New Password' type="text" value={newpass} onChange={(e) => { setNewpass(e.target.value) }} /><br />
                    <input placeholder='Confirm password' type="text" value={cp} onChange={(e) => { setCp(e.target.value) }} /><br />
                    <span>

                    <button className='btns' type="submit">{cbtn}</button>
                    <button className='btns' id='closecp' onClick={closeupdate} >close</button>
                    </span>
                    </div>
                </form>
                <div id='profileinfo' style={{ padding: "60px 20px" }} className='profileinfo'>
                    <p style={{ marginTop: "0" }}><span> Name :</span>  {name} </p>
                    <p><span> Email :</span>  {email} </p>
                    <p><span> MobileNo :</span>  {mobileNo}</p>
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
