import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../App';
import Loading from '../generalcomp/Loading';

function Customers(props) {
    const { isadmin } = props;
    const {backend}=useContext(MyContext);
    const nav = useNavigate()
    const [search, setSearch] = useState("");
    const [costomers, setCustomers] = useState([]);
    const getuser = async (e) => {
        e.preventDefault();
        const response = await fetch(`${backend}/api/getalluser`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await response.json();
        setCustomers(data.getalluser);
        // console.log(data);
    }
    const searchuser = async (e) => {
        e.preventDefault();
        const response = await fetch(`${backend}/api/searchuser/${search}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await response.json();
        setCustomers(data.getalluser);
    }
    useEffect(() => {
        if (!isadmin) {
            nav('/');
        }
        document.getElementById('getuser').click();
    }, [])
    return (
        <>
        
        <div id='customers' className='userorder'>
            <div  className='csearch'>

                <input placeholder='Seacrch here' type="search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <button className='btns' onClick={searchuser}><img className='smallicon' src="http://cdn-icons-png.flaticon.com/128/149/149852.png" alt="" /></button>
            </div>
            <div className='tableadjust' >

            <div className='tableheading'>
                <p style={{width:'300px'}}>CustomerName</p>
                <p style={{width:'300px'}}>Email</p>
                <p >MobileNo</p>
                <p style={{width:'300px'}}>Address</p>
            </div>

            <button style={{ display: "none" }} id='getuser' onClick={getuser}>getuser</button>
            <div className='tablebody' style={{marginTop:"2px"}}>
                {costomers.length > 0 ? (costomers.map((e, id) => {
                    return (
                        <div id='specificcustomer' className='specificorders' key={id}>
                            <p style={{width:'300px'}}>{e.name} </p>
                            <p style={{width:'300px'}}>{e.email} </p>
                            <p >{e.mobileNo} </p>
                            <p style={{width:'300px'}}>{e.address} </p>

                        </div>
                    )
                })) : (<Loading />
                )}
            </div>
            </div>
        </div>
        </>
    )
}

export default Customers
