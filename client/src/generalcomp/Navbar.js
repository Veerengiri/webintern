import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Link as Link1 } from 'react-scroll'
function Navbar(props) {
  const { isadmin, iscustomer, ismainadmin, logout, logouta } = props;
  const [dd, setDd] = useState("flex");
  const [ud, setUd] = useState("none");
  const [ad, setAd] = useState("none");
  const [mad, setMad] = useState("none");
  const nav = useNavigate();
  const togglenav = ()=>{
    document.getElementById('navbartoggle').style.display="unset"
    document.getElementById('navbartoggle').style.animationName="opennav"
    document.getElementById('navclose').style.display="unset"
    document.getElementById('navclose').style.animationName="navopen"
  }
  const navclose=()=>{
    
    document.getElementById('navbartoggle').style.animationName="closenav"
    document.getElementById('navbartoggle').style.display="none"
    // setTimeout(() => {
    // }, 1000);
    document.getElementById('navclose').style.display="none"
  }
  useEffect(() => {
    if (iscustomer) {
      setUd("flex");
      setDd("none");
      setAd("none");
      setMad("none");
      return;
    }
    if (isadmin && ismainadmin) {
      setUd("none");
      setDd("none");
      setAd("none");
      setMad("flex");
      return;
    }
    if (isadmin) {
      setUd("none");
      setDd("none");
      setAd("flex");
      setMad("none");
    }
  }, [isadmin, iscustomer, ismainadmin])
  return (
    <div className='navbarmain'>
      <div className='logo'>
        <i style={{ marginBottom: "-12px", fontSize: "1.1rem", marginLeft: "15px" }}>the</i>
        <p><i style={{ fontWeight: 'bold' }}>Inf</i><i style={{ fontWeight: "bold" }}>inity</i></p>
      </div>
        
      <div id='navbartoggle'>
        <div className='navbar' id='default' style={{ display: `${dd}` }}>
          <div>
            <Link to={"/"}><p>Home </p></Link>
            <Link1 style={{ cursor: "pointer" }} to='items' smooth={true} >Food Items</Link1>
            <Link1 style={{ cursor: "pointer" }} to='offers' smooth={true} >Offers</Link1>
            <Link1 style={{ cursor: "pointer" }} to='about' smooth={true} >About</Link1>
            <Link1 style={{ cursor: "pointer" }} to='contactus' smooth={true} >Contact us</Link1>
            <div>
              <Link to={"/login"}> <button className="btns" id='marginright' >Login</button> </Link>
              <Link to={"/register"}> <button className="btns">Register</button> </Link>
            </div>
          </div>
        </div>

        <div className='navbar' id='userlogin' style={{ display: `${ud}` }}>
          <div>
            <Link to={"/"}><p>Home </p></Link>
            <Link1 style={{ cursor: "pointer" }} to='items' smooth={true} >Food Items</Link1>
            <Link1 style={{ cursor: "pointer" }} to='offers' smooth={true} >Offers</Link1>
            <Link1 style={{ cursor: "pointer" }} to='about' smooth={true} >About</Link1>
            <Link1 style={{ cursor: "pointer" }} to='contactus' smooth={true} >Contact us</Link1>
            <Link to={"/orders"}><p>Orders</p></Link>
            <Link to={"/cart"}><img className='navimg' src="https://cdn-icons-png.flaticon.com/128/5490/5490741.png" alt="Cart" /></Link>
            <Link to={"/profile"}><img className='navimg' src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="Profile" /></Link>
            <button className="btns" onClick={(d) => {
              d.preventDefault();
              logout();
              setUd("none");
              setDd("flex");
              setAd("none");
              setMad("none");
              nav("/");
            }}>LogOut</button>
          </div>

        </div>

        <div className='navbar' id='adminlogin' style={{ display: `${ad}` }}>
          <div>
            <Link to={"/aorders"}><p>Orders</p></Link>
            <Link to={"/customers"}><p>Customers</p></Link>
            <Link to={"/additem"}><p>Add Item</p></Link>
            <Link to={"/items"}><p>Items </p></Link>
            <Link to={"/news"}><p>Offers</p></Link>
            <Link to={"/aprofile"}><img className='navimg' src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="profile" /></Link>
            <button className="btns" onClick={(d) => {
              d.preventDefault();
              logouta();
              setUd("none");
              setDd("flex");
              setAd("none");
              setMad("none");
              nav("/");
            }}>LogOut</button>
          </div>
        </div>


        <div className='navbar' id='mainadminlogin' style={{ display: `${mad}` }}>
          <div>
            <Link to={"/aorders"}><p>Orders</p></Link>
            <Link to={"/customers"}><p>Customers</p></Link>
            <Link to={"/additem"}><p>Add Item</p></Link>
            <Link to={"/items"}><p>Items </p></Link>
            <Link to={"/news"}><p>Offers</p></Link>
            <Link to={"/admins"}><p>Admins</p></Link>
            <Link to={"/aregister"}><p>Register</p></Link>

            <Link to={"/aprofile"}><img className='navimg' src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="" /></Link>
            <button className="btns" onClick={(d) => {
              d.preventDefault();
              logouta();
              setUd("none");
              setDd("flex");
              setAd("none");
              setMad("none");
              nav("/");
            }}>LogOut</button>
          </div>
        </div>

      </div>
      <div className='displaynone'><img onClick={togglenav} className='navimg' src="https://cdn-icons-png.flaticon.com/128/545/545806.png" alt="" /></div>
      <button onClick={navclose} id='navclose'  className='btns displaynone'>X</button>
    </div>
  )
}

export default Navbar
