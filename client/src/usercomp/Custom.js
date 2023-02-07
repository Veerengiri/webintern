import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineClose,AiFillMinusCircle,AiFillPlusCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../App';

function Custom() {
    const {backend}=useContext(MyContext);
    const {iscustomer,customerid,isadmin}=useContext(MyContext);
    //mainarras
    const [types,setTypes]=useState([
        "Neapolitan Pizza",
        "Chicago Pizza",
        "New York-Style Pizza",
        "Sicilian Pizza",
        "Greek Pizza",
        "California Pizza",
        "Detroit Pizza",
        "St. Louis Pizza"
    ])
    const [souce,setSouce]=useState([
        "Pesto",
        "White Garlic Sauce",
        "Garlic Ranch Sauce",
        "Hummus",
        "Buffalo Sauce",
        "Marinara Sauce"
    ])
    const [chese,setCheese]=useState([
        "Mozzarella Cheese",
        "Provolone Cheese",
        "Cheddar Cheese",
        "Parmesan Cheese",
        "Gouda",
        "Goat Cheese",
        "Gruyere",
        "Ricotta"
    ])
    const [vag,setVag]=useState([
        "tomatoes",
        "peppers",
        "zucchini",
        "zucchini flowers",
        "eggplants",
        "mushrooms",
        "artichokes",
        "onion",
        "broccoli rabe",
        "potatoes",
        "radicchio",
        "arugula",
        "kale",
        "eggplants",
        "spinach"
    ])

    
    const [type,setType]=useState('-');
    const [sauce,setSauce]=useState('-');
    const [cheese,setChese]=useState('-');
    const [veg,setVeg]=useState([]);
    const [ti,setTi]=useState('');
    const [si,setSi]=useState('');
    const [ci,setCi]=useState('');
    const [vi,setVi]=useState('');
    const [qtn,setQtn]=useState(1);
    const nav = useNavigate();
    //now we have this four data
    const ordernow=async()=>{
        if(type=='-' || sauce=='-'|| cheese=='-' || veg.length==0){
            alert("something missing...")
            return;
        }
        const nd =new Date();
        const date= nd.getDate()+"/"+(nd.getMonth()+1)+"/"+nd.getFullYear();
        const time= nd.getHours()+":"+nd.getMinutes();
        const res= await fetch(`${backend}/api/corder`,{
            method:'POST',
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                userId:customerid,
                type,
                sauce,
                cheese,
                veg,
                date,
                time,
                price:100,
                qtn,
            })
        })
        const data = await res.json();
        alert(data.status);
    }

    const addtype = ()=>{
        let bes = [...types,ti];
        setTypes(bes);
        
        setTi("");
    }
    const addsauce = ()=>{
    }
    const addchese=()=>{
    }
    const addveg = ()=>{
    }

    const giveVeg=(index)=>{
        let i=0;
        let data=[];
        if(veg.length>=5 && (document.getElementById(`veg${index}`).checked)){
            alert("only fire are allowed")
            document.getElementById(`veg${index}`).checked=false;
            return
        }
        for(let item of vag){
            let cb = document.getElementById(`veg${i++}`)
            if(cb.checked){
                data.push(item);
            }
        }
        setVeg(data);
    }
    useEffect(()=>{
        window.scrollTo(0,0)
        if(!(iscustomer || isadmin)){
            nav("/login");
        }
        if(isadmin){
            document.getElementById('plesenone').style.display="none"
        }
    },[])
  return (
    <div className='makecustome'>
        <div className='mcleft'>
            <header style={{textAlign:'center',marginBottom:'20px'}}>
                <h1 style={{marginTop:"0"}}>Made Custome Pizza</h1> 
            </header>
            <div className='mcategory'>
                <h2 className='cphead'>Types <span className='cpadmin' style={{ display:` ${false?"flex":"none"}`}}><input type="text" value={ti} onChange={(e)=>{setTi(e.target.value)}} /><button onClick={addtype}>Add</button></span></h2>
                {types.map((el)=>{
                    return <div className='mcpt' key={el}>
                        <div style={{display:'flex',gap:'10px'}}>
                            <input style={{scale:'1.5'}} onClick={(e)=>{setType(e.target.value)}} type="radio" value={el} name="type"  />
                            <p>{el}</p>
                        </div>
                        <div className='cpadmin' style={{ display:` ${false?"flex":"none"}`,alignItems:'center'}}  >
                            <button>Remove</button>
                        </div>
                    </div> 
                })}
            </div>
            <div className='mcategory'>
                <h2 className='cphead'>Sauce <span className='cpadmin' style={{ display:` ${false?"flex":"none"}`}}><input type="text" value={si} onChange={(e)=>{setSi(e.target.value)}} /><button onClick={addsauce}>Add</button></span></h2>
                {souce.map((el)=>{
                    return <div className='mcpt' key={el}>
                    <div style={{display:'flex',gap:'10px'}}>
                        <input style={{scale:'1.5'}} onClick={(e)=>{setSauce(e.target.value)}} type="radio" value={el} name="sauce"  />
                        <p>{el}</p>
                    </div>
                    <div className='cpadmin' style={{ display:` ${false?"flex":"none"}`,alignItems:'center'}}  >
                        <button>Remove</button>
                    </div>
                </div> 
                })}
            </div>
            <div className='mcategory'>
            <h2 className='cphead'>Cheese <span className='cpadmin' style={{ display:` ${false?"flex":"none"}`}}><input type="text" value={ci} onChange={(e)=>{setCi(e.target.value)}} /><button onClick={addchese}>Add</button></span></h2>
                {chese.map((el)=>{
                    return <div className='mcpt' key={el}>
                    <div style={{display:'flex',gap:'10px'}}>
                        <input style={{scale:'1.5'}} onClick={(e)=>{setChese(e.target.value)}} type="radio" value={el} name="cheese"  />
                        <p>{el}</p>
                    </div>
                    <div className='cpadmin' style={{ display:` ${false?"flex":"none"}`,alignItems:'center'}} >
                        <button>Remove</button>
                    </div>
                </div> 
                })}
            </div>
            <div className='mcategory'>
                <h2 className='cphead'>Veg <span className='cpadmin' style={{ display:` ${false?"flex":"none"}`}}><input type="text" value={vi} onChange={(e)=>{setVi(e.target.value)}} /><button onClick={addveg}>Add</button></span></h2>
                {vag.map((el,index)=>{
                    return <div className='mcpt' key={el}>
                    <div style={{display:'flex',gap:'10px'}}>
                        <input style={{scale:'1.3'}} onClick={()=>{giveVeg(index)}}  type="checkbox" value={el} name="veg" id={`veg${index}`}  />
                        <p>{el}</p>
                    </div>
                    <div className='cpadmin' style={{ display:` ${false?"flex":"none"}`,alignItems:'center'}}  >
                        <button>Remove</button>
                    </div>
                </div> 
                })}
            </div>
            {/* <button onClick={gettype}>get Value</button> */}
        </div>
        <div id='plesenone' className='mcright'>
            <h1 style={{textAlign:'center'}}>Your Pizza</h1>
            <div className='cphead2'>Type</div>
            <p className='cheadp'>{type}</p>
            <div className='cphead2'>Sauce</div>
            <p className='cheadp'>{sauce}</p>
            <div className='cphead2'>Cheese</div>
            <p className='cheadp'>{cheese}</p>
            <div className='cphead2'>Vagitables</div> 
            {veg.map((v)=>{
                return <p className='cheadp'>{v}</p>
            })}
            <hr style={{marginBottom:'20px'}}/>
            <div className='inputqtn' >
                <AiFillMinusCircle style={{cursor:'pointer'}} onClick={()=>{if(qtn!=1){setQtn(qtn-1)}}}/>
                <p>{qtn}</p>
                <AiFillPlusCircle style={{cursor:'pointer'}} onClick={()=>{if(qtn<50){setQtn(qtn+1)}}}/>
            </div>
            <p style={{textAlign:"center"}}>Price: {qtn*100}₨</p>
            <div className='cpordernow' style={{cursor:'pointer' }} onClick={ordernow}>Order Now</div>
        </div>
    </div>
  )
}

export default Custom
