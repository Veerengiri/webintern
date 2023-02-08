import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css';
import Register from './usercomp/Register';
import Login from './usercomp/Login';
import AddItem from './admincomp/AddItem';
import ARegister from './admincomp/Register'
import ALogin from './admincomp/Login'
import Item from './generalcomp/Item';
import Orders from './usercomp/Orders';
import Cart from './usercomp/Cart';
import Profile from './usercomp/Profile';
import AOrders from './admincomp/Orders';
import Customers from './admincomp/Customers';
import AProfile from './admincomp/Profile';
import Admins from './admincomp/Admins';
import Nas from './generalcomp/Nas';
import Navbar from "./generalcomp/Navbar";
import Footer from "./generalcomp/Footer";
import Home from "./generalcomp/Home";
import { createContext, useEffect, useState } from "react";
import Custom from "./usercomp/Custom";
import LoadingBar from 'react-top-loading-bar'
import logo from './logo.svg';
import Corder from "./admincomp/Corder";
import Coinfo from "./admincomp/Coinfo";
import UCorder from "./usercomp/Corder";
import UCoinfo from "./usercomp/Coinfo";



const MyContext = createContext();
function App() {
  const backend = process.env.REACT_APP_BACKEND;
  const [customerid,setCustomerid]=useState("");
  const [customeremail,setCustomeremail]=useState("");
  const [adminid,setAdminid]=useState("");
  const [iscustomer,setIscustomer]=useState(false);
  const [isadmin,setIsadmin]=useState(false);
  const mae = "virengirigoswami3@gmail.com";
  const [ismainadmin,setIsmainadmin]=useState(false);
  const [progress,setProgress]=useState(0);
  const [cus,setCus]=useState("-");
  
  const logout=()=>{
    setCustomerid("");
    setAdminid("");
    setCustomeremail("");
    setIsadmin(false);
    setIscustomer(false);
    setIsmainadmin(false);
    window.localStorage.clear();
  }
  const logouta=()=>{
    setCustomerid("");
    setAdminid("");
    setCustomeremail("");
    setIsadmin(false);
    setIscustomer(false);
    setIsmainadmin(false);
    window.localStorage.clear();
  }
  const check = async ()=>{
    const token = window.localStorage.getItem('token');
    if(token){
      const res = await fetch(`${backend}/api/check/${token}`,{
        method:'GET',
      })
      const data= await res.json();
      if(data.status=="ok"){
        if(data.isadmin==true){
          if(data.email==mae){
            setIsmainadmin(true);
          }
          setAdminid(data.id);
          setIsadmin(true);
        }else{
          setCustomeremail(data.email);
          setCustomerid(data.id);
          setIscustomer(true);
        }
      }
    }else{
      logout();
    }
  }
  useEffect( ()=>{
    check();
    setProgress(100)
  },[])
  return (
    <MyContext.Provider value={{setProgress,iscustomer,customerid,isadmin, backend}}>
      <BrowserRouter>
        <LoadingBar
          color='gold'
          onLoaderFinished={()=>setProgress(0)}
          progress={progress}
          height={3}
          // setTime="400"
        />
        <Navbar  iscustomer={iscustomer} isadmin={isadmin} ismainadmin={ismainadmin} logout={logout} logouta={logouta}/>
        <Routes>
          <Route path="/" element={
            <>
              <Home />
              <Item isadmin={isadmin} iscustomer={iscustomer} ci={customerid} customeremail={customeremail}/>
              <Nas isadmin={isadmin}  iscustomer={iscustomer} />
            </>
          } />
          <Route path="/profile" element={<Profile ci={customerid} ic={iscustomer}/>} />
          <Route path="/orders" element={<Orders ci={customerid} ic={iscustomer}/>} />
          <Route path="/cart" element={<Cart ci={customerid} ic={iscustomer}/>} />
          <Route path="/news" element={<Nas isadmin={isadmin}/>} />
          <Route path="/aorders" element={<AOrders isadmin={isadmin}/>} />
          <Route path="/customers" element={<Customers isadmin={isadmin}/>} />
          <Route path="/additem" element={<AddItem isadmin={isadmin}/>} />
          <Route path="/aprofile" element={<AProfile ai={adminid} isadmin={isadmin}/>} />
          <Route path="/items" element={<Item  isadmin={isadmin} iscustomer={iscustomer}/>} />
          <Route path="/login" element={<Login setCustomerid={setCustomerid} setIscustomer={setIscustomer} setCustomeremail={setCustomeremail}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/alogin" element={<ALogin sai={setAdminid} isadmin={setIsadmin} mae={mae} ismainadmin={setIsmainadmin}/>} />
          <Route path="/aregister" element={<ARegister isadmin={ismainadmin}/>} />
          <Route path="/admins" element={<Admins isadmin={ismainadmin}/>} />
          <Route path="/custome" element={<Custom/>} />
          <Route path="/corder" element={<Corder isadmin={isadmin} setCus={setCus}/>}/>
          <Route path="/coinfo" element={<Coinfo isadmin={isadmin} cus={cus}/>}/>
          <Route path="/custome" element={<Custom/>} />
          <Route path="/usercorder" element={<UCorder iscustomer={iscustomer} uid={customerid} setCus={setCus}/>}/>
          <Route path="/usercoinfo" element={<UCoinfo iscustomer={iscustomer}  cus={cus}/>}/>

        </Routes>
        <Footer />
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;
export {MyContext};