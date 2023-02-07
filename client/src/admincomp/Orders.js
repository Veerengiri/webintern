import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../generalcomp/Loading';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { MyContext } from '../App';

function Orders(props) {
    const {backend}=useContext(MyContext);
    const { isadmin } = props;
    const nav = useNavigate()
    const [orders, setOrders] = useState([]);
    const [ordersd, setOrdersd] = useState([]);
    const [ordersud, setOrdersud] = useState([]);
    const [search, setSearch] = useState("");
    const [date, setDate] = useState("");
    const [isdata,setIsdata]=useState(true);
    const [isdata2,setIsdata2]=useState(true);
    const [callfun,setCallfun]=useState(true);
    const [isdata3,setIsdata3]=useState(true);
    const [curbtn,setCurbtn]=useState("und");
    const getorders = async (e) => {
        e.preventDefault()
        const response = await fetch(`${backend}/api/showalloreders`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await response.json();
        if (data.showorders.length == 0) {
            setIsdata3(false);
        } else {
            setIsdata3(true);
            setOrders(data.showorders);

        }
        setSearch("");

        setTimeout(() => {
            document.getElementById('ordersd').click();
            document.getElementById('ordersud').click();
        }, 1000);
    }
    const searchorders = async (e) => {
        e.preventDefault();
        if (search == "") {
            document.getElementById('orders').click();
            document.getElementById('ordersd').click();
            document.getElementById('ordersud').click();
            return;
        }
        const response = await fetch(`${backend}/api/searchorders/${search}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await response.json();
        if (data.showorders.length == 0) {
            setIsdata(false);
            setIsdata2(false);
            setIsdata3(false);
        } else {
            setOrders(data.showorders);
            setTimeout(() => {
            document.getElementById('ordersd').click();
            document.getElementById('ordersud').click();
            }, 1000);
        }
        
    }
    const searchbydate = async () => {

        // 2022-10-07  27/10/2022
        let a = [];
        let dt = (date.charAt(8) == '0' ? '' : date.charAt(8)) + date.charAt(9) + '/' + (date.charAt(5) == '0' ? '' : date.charAt(5)) + date.charAt(6) + '/' + date.charAt(0) + date.charAt(1) + date.charAt(2) + date.charAt(3);
        // console.log(dt)
        for (let i = 0; i < orders.length; i++) {
            if (dt == orders[i].date) {
                a.push(orders[i]);
            }
        }
        if (a.length == 0) {
            setIsdata(false);
            setIsdata2(false);
            setIsdata3(false);
        } else {
            setOrders(a);

        }
        setTimeout(() => {
            document.getElementById('ordersd').click();
            document.getElementById('ordersud').click();
        }, 500);
    }
    
    const sortbypriceInc = () => {
        let a = orders;
        for (let i = 0; i < a.length; i++) {
            for (let j = i + 1; j < a.length; j++) {
                if (a[i].totalprice > a[j].totalprice) {
                    let temp = a[i];
                    a[i] = a[j];
                    a[j] = temp;
                }
            }
        }
        if (a.length == 0) {
            setOrders([{
                itemName: "-"
            }])
        } else {
            setOrders(a);

        }
        document.getElementById('sortby').style.display = "none";
        setTimeout(() => {
            document.getElementById('ordersd').click();
            document.getElementById('ordersud').click();
        }, 1000);
        // console.log(a);
    }
    const sortbypriceDesc = () => {
        let a = orders;
        for (let i = 0; i < a.length; i++) {
            for (let j = i + 1; j < a.length; j++) {
                if (a[i].totalprice < a[j].totalprice) {
                    let temp = a[i];
                    a[i] = a[j];
                    a[j] = temp;
                }
            }
        }
        if (a.length == 0) {
            setOrders([{
                itemName: "-"
            }])
        } else {
            setOrders(a);

        }
        document.getElementById('sortby').style.display = "none";
        setTimeout(() => {
            document.getElementById('ordersd').click();
            document.getElementById('ordersud').click();
        }, 1000);
    }
    const sortbyName = () => {
        let a = orders;
        for (let i = 0; i < a.length; i++) {
            for (let j = i + 1; j < a.length; j++) {
                if (a[i].itemName > a[j].itemName) {
                    let temp = a[i];
                    a[i] = a[j];
                    a[j] = temp;
                }
            }
        }
        if (a.length == 0) {
            setOrders([{
                itemName: "-"
            }])
        } else {
            setOrders(a);

        }
        document.getElementById('sortby').style.display = "none";
        setTimeout(() => {
            document.getElementById('ordersd').click();
            document.getElementById('ordersud').click();
        }, 1000);
    }
    const sortbyTime = () => {
        let a = orders;
        for (let i = 0; i < a.length; i++) {
            for (let j = i + 1; j < a.length; j++) {
                if (a[i].sorttime < a[j].sorttime) {
                    let temp = a[i];
                    a[i] = a[j];
                    a[j] = temp;
                }
            }
        }
        if (a.length == 0) {
            setOrders([{
                itemName: "-"
            }])
        } else {
            setOrders(a);

        }
        document.getElementById('sortby').style.display = "none";
        setTimeout(() => {
            document.getElementById('ordersd').click();
            document.getElementById('ordersud').click();
        }, 1000);
    }
    const sortbyTimeR = () => {
        let a = orders;
        for (let i = 0; i < a.length; i++) {
            for (let j = i + 1; j < a.length; j++) {
                if (a[i].sorttime > a[j].sorttime) {
                    let temp = a[i];
                    a[i] = a[j];
                    a[j] = temp;
                }
            }
        }
        if (a.length == 0) {
            setOrders([{
                itemName: "-"
            }])
        } else {
            setOrders(a);

        }
        document.getElementById('sortby').style.display = "none";
        setTimeout(() => {
            document.getElementById('ordersd').click();
            document.getElementById('ordersud').click();
        }, 1000);
    }
    const getordersdeliverd = async (e) => {
        
        let a = [];
        for (let i = 0; i < orders.length; i++) {
            if (orders[i].deliverd) {
                a.push(orders[i]);
            }
        }
        // console.log(a)
        if (a.length == 0) {
            setIsdata(false);
        } else {
            setIsdata(true);
            setOrdersd(a);
        }

    }
    const getordersundeliverd = async (e) => {
       
        let a = [];
        for (let i = 0; i < orders.length; i++) {
            if (!orders[i].deliverd) {
                a.push(orders[i]);
            }
        }
        // console.log(a)
        if (a.length == 0) {
            setIsdata2(false);
        } else {
            setIsdata2(true);
            setOrdersud(a);

        }
    }
    const deliverdtrue = async (id) => {
        if(callfun){
            setCallfun(false);
            const response = await fetch(`${backend}/api/deliverdtrue/${id}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            const data = await response.json();
            document.getElementById('orders').click();
            document.getElementById('ordersd').click();
            document.getElementById('ordersud').click();
            setTimeout(() => {
                setCallfun(true);
            }, 3000);
        }
    }


    useEffect(() => {
        document.getElementById('allo').style.display = "none";
        document.getElementById('do').style.display = "none";
        document.getElementById('udo').style.display = "unset";
        document.getElementById('sortby').style.display = "none";
        document.getElementById('orders').click();
        if (!isadmin) {
            nav('/');
        }
    },[])
    return (
        <div style={{width:'100vw',overflow:'hidden'}}>
        <div className='gocustome' onClick={()=>{nav("/corder")}} ><p>Custome Orders</p>  <AiOutlineDoubleRight className='animatecustomeorder'/></div>
        <div >
            <button id='orders' style={{ display: "none" }} onClick={getorders}>Get All Orders</button>
            <button id='ordersd' style={{ display: "none" }} onClick={getordersdeliverd}>deliverd</button>
            <button id='ordersud' style={{ display: "none" }} onClick={getordersundeliverd}>undeliverd</button>
            
            <div className='manageadminorder' >
            <div>
                <div>
                    <input style={{width:"170px",padding:'10px'}} placeholder='Search here' type="search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                    <button className='btns' onClick={searchorders}><img className='smallicon' src="http://cdn-icons-png.flaticon.com/128/149/149852.png" alt="" /></button>
                </div>
                <div>
                    <input style={{width:"150px",padding:'10px'}} placeholder='search' id='date' type="date" onChange={(e) => { setDate(e.target.value) }} />
                    <button className='btns' onClick={searchbydate} ><img className='smallicon' src="http://cdn-icons-png.flaticon.com/128/149/149852.png" alt="" /></button>
                </div>
                
            </div>
            <div><button id='sortbybtn' className='btns' onClick={() => { document.getElementById('sortby').style.display = "flex"; }}>Sort ⬇</button></div>
            </div>
            <div className='sortby' id='sortby'>
                <button onClick={sortbyTime}>Newest</button>
                <button onClick={sortbyTimeR}>Oldest</button>
                <button onClick={sortbypriceInc}>Price-Inc</button>
                <button onClick={sortbypriceDesc}>Price-Desc</button>
                <button onClick={sortbyName}>name</button>
            </div>
            
            <div className='userorder' style={{marginTop:'20px'}}>
                <div className='tableadjust'>
                <div className='ordercatagory'>
                    <button style={{backgroundColor:`${curbtn=="und"?"rgb(255,225,0,.7)":"gold"}`}} onClick={() => {
                        document.getElementById('allo').style.display = "none";
                        document.getElementById('do').style.display = "none";
                        document.getElementById('udo').style.display = "unset";
                        setCurbtn("und");
                    }}>Undeliverd</button>
                    <button style={{backgroundColor:`${curbtn=="dli"?"rgb(255,225,0,.7)":"gold"}`}} onClick={() => {
                        document.getElementById('allo').style.display = "none";
                        document.getElementById('do').style.display = "unset";
                        document.getElementById('udo').style.display = "none";
                        setCurbtn("dli");
                    }}>Deliverd</button>
                    <button style={{backgroundColor:`${curbtn=="all"?"rgb(255,225,0,.7)":"gold"}`}} onClick={() => {
                        document.getElementById('allo').style.display = "unset";
                        document.getElementById('do').style.display = "none";
                        document.getElementById('udo').style.display = "none";
                        setCurbtn("all");
                    }}>All orders</button>
                </div>
                <div className='adminorderheading'>
                    <div className='tableheading' style={{ marginTop: "2px" }}>
                        <p>Item</p>
                        <p style={{width:"50px"}}>Qtn</p>
                        <p style={{width:"50px"}}>Price</p>
                        <p style={{width:"50px"}}>Total</p>
                        <p style={{width:"50px"}}>Time</p>
                        <p >Date</p>
                        <p  style={{width:"200px"}}>Cutomer</p>
                        <p>MobileNo</p>
                        <p style={{ width: "250px",margin:'0 10px' }}>Address</p>
                        <p>Status</p>
                        <p>Update</p>
                    </div>
                </div>
                <div className='tablebody'>
                    {isdata? <div id='allo'  >
                        {orders.length > 0 ? (orders.map((e, id) => {
                            return (
                                <div key={id} className='specificorders'  >
                                    <p> {e.itemName} </p>
                                    <p style={{width:"50px"}}> {e.qtn} </p>
                                    <p style={{width:"50px"}}> {e.price} </p>
                                    <p style={{width:"50px"}}> {e.totalprice} </p>
                                    <p style={{width:"50px"}}> {e.time} </p>
                                    <p > {e.date}</p>
                                    <p  style={{width:"200px"}}> {e.customerName} </p>
                                    <p> {e.mobileNo} </p>
                                    <p style={{ width: "250px",margin:'0 10px' }}> {e.address} </p>
                                    <p> {e.deliverd ? "deliverd" : "undeliverd"} </p>
                                    <button className={`${!e.deliverd?"ordermanage deliverdtrue":"ordermanage2"}`}  style={{ width: "100px", }} onClick={(d) => {
                                        d.preventDefault();
                                        deliverdtrue(e.id);
                                    }}>{!e.deliverd ? "Deliverd" : "unDeliverd"}</button>
                                </div>
                            )
                        })) : (<Loading />)}
                    </div> : <div>no data found</div>
                    }
                    {isdata2? <div id='do' >
                        {ordersd.length > 0 ? (ordersd.map((e, id) => {
                            return (
                                <div key={id} className='specificorders' >

                                    {/* <p> id: {e.id} </p> */}
                                    <p> {e.itemName} </p>
                                    <p style={{width:"50px"}}> {e.qtn} </p>
                                    <p style={{width:"50px"}}>  {e.price} </p>
                                    <p style={{width:"50px"}}>  {e.totalprice} </p>
                                    <p style={{width:"50px"}}>  {e.time} </p>
                                    <p >  {e.date}</p>
                                    <p  style={{width:"200px"}}> {e.customerName} </p>
                                    <p> {e.mobileNo} </p>
                                    <p style={{ width: "250px" }}> {e.address} </p>
                                    <p>  {e.deliverd ? "deliverd" : "undeliverd"} </p>
                                    <button className='ordermanage2 ' style={{ width: "100px" }} onClick={(d) => {
                                        d.preventDefault();
                                        deliverdtrue(e.id);
                                    }}>{"unDeliverd"}</button>
                                </div>
                            )
                        })) : (<Loading />)}
                    </div> : <div>no data found</div>
                    }
                    {isdata3? <div id='udo' >
                        {ordersud.length > 0 ? (ordersud.map((e, id) => {

                            return (
                                <div key={id} className='specificorders' >

                                    {/* <p> id: {e.id} </p> */}
                                    <p>  {e.itemName} </p>
                                    <p style={{width:"50px"}}>  {e.qtn} </p>
                                    <p style={{width:"50px"}}>  {e.price} </p>
                                    <p style={{width:"50px"}}>  {e.totalprice} </p>
                                    <p style={{width:"50px"}}>  {e.time} </p>
                                    <p >  {e.date}</p>
                                    <p  style={{width:"200px"}}>  {e.customerName} </p>
                                    <p>  {e.mobileNo} </p>
                                    <p style={{ width: "250px" }}>  {e.address} </p>
                                    <p>  {e.deliverd ? "deliverd" : "undeliverd"} </p>
                                    <button className='ordermanage deliverdtrue' style={{ width: "100px" }} onClick={(d) => {
                                        d.preventDefault();
                                        deliverdtrue(e.id);
                                    }}>{"Deliverd"}</button>
                                </div>
                            )
                        })) : (<Loading />)}
                    </div> : <div>no data found</div>
                    }
                </div>
                </div>
            </div>
        </div>
        <div style={{display:`${callfun?"none":"unset"}`,  position:'fixed',zIndex:"50",paddingTop:'30vh',height:"100vh",width:'99vw',top:'0',left:'0',backgroundColor:"rgb(0,0,0,.4)"}}><Loading/></div>
        </div>
    )
}

export default Orders
