import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../App';
import Loading from '../generalcomp/Loading';

function Corder({iscustomer,setCus,uid}) {
    const {backend} = useContext(MyContext);
    const [orders,setOrders]=useState([]);
    const [isload,setIsload]=useState(false);
    const nav = useNavigate();
    const getco = async ()=>{
        setIsload(true);
        // console.log("bye")
        // console.log(uid)
        const res= await fetch(`${backend}/api/getcou/${uid}`,{method:"GET"});
        const data = await res.json();
        setOrders(data.orders);
        setIsload(false);
        // console.log(data);
    }
    useEffect(()=>{
        getco()
        if(!iscustomer){
            nav("/login");
        }
    },[])
  return (
    <div style={{minHeight:"50vh"}}>
        <header style={{textAlign:'center',fontSize:'2rem',marginBottom:'30px'}}>Custome Orders</header>
        {/* <hr /> */}
        <table className="cotable">
            <thead className='cotableheading'>
                <tr>
                    <th style={{width:"10vw"}}>Qtn</th>
                    <th style={{width:"15vw"}}>Total</th>
                    <th style={{width:"25vw"}}>Date</th>
                    <th style={{width:"15vw"}}>Time</th>
                    <th style={{width:"25vw"}}>Status</th>
                </tr>
            </thead>
            <tbody className=''>
                { !isload ? <> { orders.length==0 ? <p>no data</p>: <div   style={{cursor:'pointer',border:'2px solid white'}}>
                    { orders.map((ord)=>{
                        return <tr className='cospecificorders' onClick={()=>{setCus(ord._id); setTimeout(() => {
                            nav("/usercoinfo")
                        }, 500); }}>
                            <td style={{width:'10vw',textAlign:'center'}}>{ord.qtn}</td>
                            <td style={{width:'15vw',textAlign:'center'}}>{ord.totalprice}</td>
                            <td style={{width:'25vw',textAlign:'center'}}>{ord.date}</td>
                            <td style={{width:'15vw',textAlign:'center'}}>{ord.time}</td>
                            <td style={{width:'25vw',textAlign:'center'}}>{ord.cancel?"Cancled" : (ord.isDeliverd?"Deliverd":"unDeliverd")}</td>
                        </tr>
                    }) } </div> }</> : <>
                    <Loading/>
                </>}
            </tbody>
        </table>
        

    </div>
  )
}

export default Corder