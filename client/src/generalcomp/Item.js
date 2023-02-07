import React, { useEffect, useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Alert from '../Alert';
import Tilt from "react-parallax-tilt";
import Loading from './Loading'
import { AiOutlineDoubleRight } from 'react-icons/ai';

import { AiOutlineClose,AiFillMinusCircle,AiFillPlusCircle } from 'react-icons/ai';
// import {BsFillPlusCircleFill} from 'react-icons/bs'
import { MyContext } from '../App';

function Item(props) {
    const { isadmin, iscustomer, ci, customeremail } = props;
    const [allItems, setAllItems] = useState([]);
    const [price, setPrice] = useState(0);
    const [itemId, setItemId] = useState("");
    const [name, setName] = useState("");
    const [qtn, setQtn] = useState(1);
    const [desc, setDesc] = useState("");
    const [display, setDisplay] = useState("flex");
    const [isload,setIsload]=useState(false);
    const {setProgress,backend} = useContext(MyContext);

    let userid = ci;
    const nav = useNavigate()
    const showitems = async (e) => {
        e.preventDefault()
        const response = await fetch(`${backend}/api/showitems`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        setAllItems(data.item);
    }
    const changeprice = async (e) => {

        e.preventDefault();
        if (price < 0) {
            alert("enter valid price");
            return;
        }
        const items = await fetch(`${backend}/api/updateitemprice/${itemId}/${price}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await items.json();
        alert(data.status);
        document.getElementById('showitems').click();
        document.getElementById('changeprice').style.display = "none";
    }
    const deleteitem = async (id) => {
        // e.preventDefault();
        if (!window.confirm("delete?")) {
            return;
        }
        const items = await fetch(`${backend}/api/deleteitem/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await items.json();
        alert(data.status);
        
        document.getElementById('showitems').click();
    }
    const ordernow = async (d) => {
        d.preventDefault()
        if (qtn <= 0) {
            alert("please give valid order");
            return;
        }

        const orders = await fetch(`${backend}/api/getorder`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: userid,
                itemId,
                qtn,
            })
        })
        const data = await orders.json();
        
        // <Alert alert={data.status}/>
        if (data.status == "Order placed successfully") {
            await window.Email.send({
                Host: "smtp.elasticemail.com",
                Username: "virengirigoswami3@gmail.com",
                Password: "28FB4AE2E314E380D52BBE1F1266C80D6AB3",
                To: customeremail,
                From: "virengirigoswami3@gmail.com",
                Subject: "verify email",
                Body: "Your order placed successfully of " + qtn + " " + name + " and it is deliverd soon"
            }).then(
                () => { }
            );
            nav("/orders");
        }else{
            alert(data.status);
        }
        document.getElementById('ordernow').style.display = "none"
        setQtn(1);
    }
    const addtocart = async (d) => {

        d.preventDefault();
        if (qtn <= 0) {
            alert("plese enter valid qtn..");
            return;
        }
        const orders = await fetch(`${backend}/api/addtocart/${userid}/${itemId}/${qtn}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }

        })
        const data = await orders.json();
        
        if (data.status=="add to cart successully") {
            
        } else {
            alert(data.status);
        }
        document.getElementById('addtocart').style.display = "none"
    }
    const searchbutton = async (d) => {
        d.preventDefault();
        if (search == "") {
            document.getElementById('showitems').click();
            return;
        }
        const response = await fetch(`${backend}/api/searchitems/${search}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        setAllItems(data.item);
    }
    const [search, setSearch] = useState("");
    useEffect(() => {
        // cp(100)
        // setProgress(100) 
        document.getElementById('showitems').click();
        document.getElementById('ordernow').style.display = "none"
        document.getElementById('addtocart').style.display = "none"
        document.getElementById('changeprice').style.display = "none";
        if (isadmin) {
            setDisplay("flex");
        } else {
            setDisplay("none");
        }
    }, [])
    
    return (
        <>
            <div id='customepizza' onClick={()=>{nav('/custome')}}>
                <img id='cpbi' src="https://cdn-icons-png.flaticon.com/512/2094/2094661.png" alt="" />
                <div id='cpb'> <p>Make Custome Pizza</p> </div>
            </div>
            <div className='mainitems' id='items'>
                {/* <Alert alert="login first"/> */}
                <button id='showitems' onClick={showitems} style={{ display: "none" }}>items</button><br />
                <div>
                    <div className='itemsearch'>
                        <input id='itemsearch' type="search" placeholder='what are you lookin for' value={search} onChange={(e) => { setSearch(e.target.value) }} />
                        <button className='btns' onClick={searchbutton}><img className='smallicon' src="http://cdn-icons-png.flaticon.com/128/149/149852.png" alt="" /></button>
                    </div>
                </div>
                
                <div style={{textAlign:"center"}}> <h1>Popular pizzas</h1>
                    <div className='gocustome' onClick={()=>{nav("/custome")}} ><p>Make Your pizza</p>  <AiOutlineDoubleRight className='animatecustomeorder'/></div>
                </div>
                <div id="showallnotes"><br />
                    <form id='changeprice' onSubmit={changeprice}>
                        <div>
                            <AiOutlineClose style={{cursor:'pointer',fontWeight:'bold'}}  onClick={(d) => {
                                d.preventDefault();
                                document.getElementById('changeprice').style.display = "none"
                            }}/>
                            <h3 style={{textAlign:"center",marginTop:'0'}} >{name}</h3>
                            <input style={{ backgroundColor: "transparent", color: "white",fontSize:'1.5rem', marginBottom: "20px",padding:'5px' }} type="number" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                            <button className='btns' type='submit'>change Price</button>
                        </div>
                    </form>
                    <form id='ordernow' onSubmit={ordernow}>
                        <div>
                            <AiOutlineClose style={{cursor:'pointer',fontWeight:'bold'}}  onClick={(d) => {
                                d.preventDefault();
                                setPrice(0);
                                document.getElementById('ordernow').style.display = "none"
                            }}/>
                            <h2 style={{ textAlign: "center",marginTop:'0' }}>{name}</h2>
                            <p style={{ textAlign: "center",margin:'0' }}>{desc}</p> <br />
                            {/* <input className='qtn' type="number" placeholder='qtn' value={qtn} onChange={(d) => { setQtn(d.target.value) }} /> <br /> */}
                            <span className='inputqtn'>
                                <AiFillMinusCircle style={{cursor:'pointer'}} onClick={()=>{if(qtn!=1){setQtn(qtn-1)}}}/>
                                <p>{qtn}</p>
                                <AiFillPlusCircle style={{cursor:'pointer'}} onClick={()=>{if(qtn<50){setQtn(qtn+1)}}}/>
                            </span>
                            <span className='inputqtn'>Total: {qtn*price}</span>
                            <button className='btns' type="submit">Pay ₹{qtn*price}</button>
                        </div>
                    </form>
                    <form id='addtocart' onSubmit={addtocart}>
                        <div>
                            <AiOutlineClose style={{cursor:'pointer',fontWeight:'bold'}}  onClick={(d) => {
                                d.preventDefault();
                                document.getElementById('addtocart').style.display = "none"
                            }}/>
                            
                            <h2 style={{ textAlign: "center",marginTop:'0' }}>{name}</h2>
                            <p style={{ textAlign: "center",margin:'0' }}>{desc}</p> <br />
                            {/* qtn: <input style={{ backgroundColor: "transparent", color: "white", marginBottom: "20px" }} type="number" placeholder='qtn' value={qtn} onChange={(d) => { setQtn(d.target.value) }} /> <br /> */}
                            <span className='inputqtn'>
                                <AiFillMinusCircle style={{cursor:'pointer'}} onClick={()=>{if(qtn!=1){setQtn(qtn-1)}}}/>
                                <p>{qtn}</p>
                                <AiFillPlusCircle style={{cursor:'pointer'}} onClick={()=>{if(qtn<50){setQtn(qtn+1)}}}/>
                            </span>
                            <button className='btns' type="submit">Add to Cart</button>
                        </div>
                    </form>
                    <div className='allitems'>
                        {allItems.length > 0 ? (allItems.map((e, id) => {
                            return (
                                <Tilt key={id} className='specificitems' >

                                    <img src={`${e.itemImage}`} alt="loaded" />
                                
                                    <div className='itemdetails'>
                                        <h2>{e.name}</h2>
                                        <p>price: {e.price} ₹</p>
                                        <p className='itemdesc'>{e.desc}</p>
                                        <div style={{ display: `${display == "flex" ? "none" : "flex"}`, justifyContent: "space-between" }}>
                                            <button className='btns' onClick={(d) => {
                                                d.preventDefault();
                                                if (iscustomer) {
                                                    setItemId(e._id);
                                                    setName(e.name);
                                                    setDesc(e.desc);
                                                    setPrice(e.price);
                                                    document.getElementById('ordernow').style.display = "unset"
                                                } else {
                                                    // alert("login first!");
                                                    nav("/login");
                                                    
                                                }
                                            }}>Order Now</button>
                                            <button className='btns' style={{ marginLeft: "10px" }} onClick={(d) => {
                                                d.preventDefault();
                                                if (iscustomer) {
                                                    setItemId(e._id);
                                                    setName(e.name);
                                                    setDesc(e.desc);
                                                    document.getElementById('addtocart').style.display = "unset"

                                                } else {
                                                    // alert("login first!");
                                                    nav("/login");
                                                }
                                            }}>Add to Cart</button>

                                        </div>
                                        <div style={{ display: `${display}`, justifyContent: "space-between" }}>
                                            <button className='btns' style={{ marginTop: "10px" }} onClick={(d) => {
                                                d.preventDefault();
                                                setItemId(e._id);
                                                setPrice(e.price);
                                                setName(e.name);
                                                document.getElementById('changeprice').style.display = "unset"
                                            }}>Edite Price</button>
                                            <button style={{ marginTop: "10px" }} className='btns' onClick={(d) => {
                                                d.preventDefault();
                                                deleteitem(e._id);
                                            }}>Delete Item</button>
                                        </div>
                                    </div>
                                </Tilt>
                            )
                        })) : ( <Loading/> )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Item
