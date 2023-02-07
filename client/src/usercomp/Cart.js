import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../App';
import Loading from '../generalcomp/Loading';
function Cart(props) {
    const nav = useNavigate();
    const {backend}=useContext(MyContext);
    const [cart, setCart] = useState([]);
    const [name, setName] = useState("");
    const [qtn, setQtn] = useState(1);
    const [desc, setDesc] = useState("");
    const [updateid, setUpdateid] = useState("");
    const [totalprice, setTotalprice] = useState(0);
    const [isdata,setIsdata]=useState(true);
    const userid = props.ci;
    const getcart = async (d) => {
        d.preventDefault();
        setTotalprice(0);
        let price = 0;
        const cartitems = await fetch(`${backend}/api/getcart/${userid}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await cartitems.json();
        const cartdetail = await data.cartu;
        if (cartdetail.length == 0) {
            setIsdata(false)
        } else {

            setCart(cartdetail);
        }
        for (let i = 0; i < cartdetail.length; i++) {
            price += (cartdetail[i].price) * (cartdetail[i].qtn)
        }
        setTotalprice(price);
    }
    const updatecart = async (d) => {
        d.preventDefault();
        const cartitems = await fetch(`${backend}/api/updatecart/${userid}/${updateid}/${qtn}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await cartitems.json();
        if(data.status=="update successfully"){
        }
        else{
            alert(data.status); 
        }
        document.getElementById('updatecart').style.display = "none"
        document.getElementById('getcart').click();
    }
    const emptycart = async (d) => {
        // d.preventDefault();
        if (!window.confirm("empty Cart!")) {
            return;
        }
        const cartitems = await fetch(`${backend}/api/emptycart/${userid}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await cartitems.json();
        if(data.status=="ok"){
        }
        else{
            alert(data.status); 
        }
        document.getElementById('getcart').click();
    }
    const deletecart = async (id) => {
        const cartitems = await fetch(`${backend}/api/deletecart/${userid}/${id}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await cartitems.json();
        alert(data.status);
        document.getElementById('getcart').click();
    }
    const orderall = async (d) => {
        d.preventDefault();

        for (let i = 0; i < cart.length; i++) {
            let itemId = cart[i].id;
            let qnt = cart[i].qtn;
            let orders = await fetch('${backend}/api/getorder', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: userid,
                    itemId,
                    qtn: qnt,
                })
            })
            let d = await orders.json();
        }
        const cartitems = await fetch(`${backend}/api/emptycart/${userid}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await cartitems.json();
        alert(data.status);
        document.getElementById('getcart').click();
    }
    useEffect(() => {
        document.getElementById('updatecart').style.display = "none"
        setTimeout(() => {
            if (!props.ic) {
                nav("/");
            }
        }, 1000);
        setTimeout(() => {

            document.getElementById('getcart').click();
        }, 100);
    }, []);
    return (
        <>
            <h1 style={{textAlign:"center",marginBottom:"0"}}>Your Cart</h1>
            <div id='allcarts' className='userorder'>
                <div className='tableadjust'>
                <div  className='cartorder'>
                    <h3 style={{margin:"0"}}>Totalprice: {totalprice} </h3>
                    <button className='btns' onClick={orderall} disabled={totalprice == 0 ? true : false}>orderall</button>
                    <button className='btns' onClick={emptycart} disabled={totalprice == 0 ? true : false}>emptycart</button>
                </div>


                <form id='updatecart' className='ordernow' onSubmit={updatecart}>
                    <div>
                        <button style={{ width: "60px" }} className='btns' onClick={(d) => {
                            d.preventDefault();
                            document.getElementById('updatecart').style.display = "none"
                        }}> X</button>
                        <h1 style={{textAlign:"center"}}>{name}</h1>
                        <p style={{textAlign:"center"}}>{desc}</p> <br />
                        qtn: <input style={{ backgroundColor: "transparent", color: "white", marginBottom: "20px" }} type="number" placeholder='qtn' value={qtn} onChange={(d) => { setQtn(d.target.value) }} /> <br />
                        <button className='btns' type="submit">update</button>
                    </div>
                </form>
                    
                

                <button style={{ display: "none" }} id='getcart' onClick={getcart}>cart</button>

                <div className='tableheading cartitem'>
                    <p>ItemName</p>
                    <p>Price</p>
                    <p>Qtn</p>
                    <p>Total</p>
                    <p style={{width:'350px'}} >Description</p>
                    <p >update</p>
                    <p>Delete</p>
                </div>
                <div className='tablebody' id='tablemargin3'>
                    {isdata ? <>
                        { cart.length > 0 ? (cart.map((e, id) => {
                        return (
                            <div key={id} id='specificcart' className='specificorders cartbody'>
                                <h3> {e.name} </h3>
                                <h3> {e.price} </h3>
                                <h3> {e.qtn} </h3>
                                <h3>{(e.qtn) * (e.price)}</h3>
                                <h3 style={{width:"350px"}} > {e.desc} </h3>
                                <button className='ordermanage' style={{width:"105px"}} onClick={(d) => {
                                    d.preventDefault();
                                    setName(e.name);
                                    setDesc(e.desc);
                                    setQtn(e.qtn);
                                    setUpdateid(e.id)
                                    document.getElementById('updatecart').style.display = "unset"
                                }}>update</button>
                                <button className='ordermanage' style={{width:"105px"}}  onClick={(d) => {
                                    d.preventDefault();
                                    deletecart(e.id);
                                }}>delete</button>
                            </div>
                        )
                        })) : (<Loading />)} </> : <div style={{textAlign:'center',padding:'5px'}}>no data found</div>}
                </div>

                </div>
            </div>
        </>
    )
}

export default Cart
