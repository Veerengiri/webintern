import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs';
import { MyContext } from '../App';

function Coinfo({iscustomer,cus}) {
    const nav = useNavigate();
    const {backend}=useContext(MyContext);
    const [ud,setUd]=useState({
        name: "-",
        type: "-",
        sauce: "-",
        cheese: "-",
        veg: ["tomato"],
        qtn: 0,
        price: 0,
        totalprice: 0,
        date: "-",
        time: "-",
        status: "-",
        email: "-",
        mobile: "-",
        address: "-"
    })
    
    const getdt = async ()=>{
        const res= await fetch(`${backend}/api/getpco/${cus}`,{method:"GET"});
        const data = await res.json();
        setUd(data.data);
    }
    const makedt = async ()=>{
        if(!window.confirm("do you want to cancel this order?")){
            return ;
        }
        const res = await fetch(`${backend}/api/codc/${cus}`,{method:'GET'});
        const data = await res.json();
        if(data.status=="ok"){
            setUd({...ud,status:'Cancled'});
        }else{
            alert(data.status);
        }
    }
    useEffect(()=>{
        if(!iscustomer){
            nav("/login")
        }
        getdt();
    },[])
  return (
    <div>
        <div style={{cursor:'pointer',margin:'10px 0',display:'flex',alignItems:'center',gap:'10px'}} onClick={()=>{nav("/usercorder")}}><BsArrowLeft style={{cursor:'pointer',scale:'1.5',marginLeft:'5vw'}} /> All Orders</div>
        <div>
            <header style={{textAlign:'center',fontSize:'2rem',margin:'0'}}>Order Details</header>
            <div className='cospec'>
                <div className='codt'>
                    <span>Customer Name</span>
                    <p>{ud.name}</p>
                </div>
                <div className='codt'>
                    <span>Pizza Type</span>
                    <p>{ud.type}</p>
                </div>
                <div className='codt'>
                    <span>Sauce</span>
                    <p>{ud.sauce}</p>
                </div>
                <div className='codt'>
                    <span>Cheese</span>
                    <p>{ud.cheese}</p>
                </div>
                <div className='codt'>
                    <span>Vegitables</span>
                    <p>{ud.veg.map((v,index)=>{
                        return <p>- {v}</p>
                    })
                    }</p>
                </div>
                <div className='codt'>
                    <span>Qtn</span>
                    <p>{ud.qtn}</p>
                </div>
                <div className='codt'>
                    <span>Price</span>
                    <p>{ud.price}</p>
                </div>
                <div className='codt'>
                    <span>Total Price</span>
                    <p>{ud.totalprice}</p>
                </div>
                <div className='codt'>
                    <span>Order Date</span>
                    <p>{ud.date}</p>
                </div>
                <div className='codt'>
                    <span>Order Time</span>
                    <p>{ud.time}</p>
                </div>
                <div className='codt'>
                    <span>Email</span>
                    <p>{ud.email}</p>
                </div>
                <div className='codt'>
                    <span>Mobile No</span>
                    <p>{ud.mobile}</p>
                </div>
                <div className='codt'>
                    <span>Address</span>
                    <p>{ud.address}</p>
                </div>
                <div className='codt'>
                    <span>Order Status</span>
                    <p>{ud.status}</p>
                </div>
                <div className='pcodb' style={{ display:`${ud.status=="Undeliverd"?"flex":"none"}` }}>
                    <div className='codbd' onClick={makedt}>Cancel Order</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Coinfo