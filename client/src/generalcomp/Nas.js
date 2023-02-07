import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../App';
import Loading from './Loading'

function Nas(props) {
    const { isadmin} = props;
    const {backend}=useContext(MyContext);
    const [nas, setNas] = useState([]);
    const [heading, setHeading] = useState("");
    const [desc, setDesc] = useState("");
    const [display, setDisplay] = useState("none");
    const [isload,setIsLoad]=useState(false);
    const getnas = async () => {
        setIsLoad(true);
        const response = await fetch(`${backend}/api/shownas`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await response.json();
        setNas(data.news);
        setIsLoad(false);
    }
    const addnas = async (e) => {
        e.preventDefault();
        const response = await fetch(`${backend}/api/addnas`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                headline: heading,
                desc,
            })
        })
        const data = await response.json();
        alert(data.status);
        document.getElementById('getnas').click();
        setHeading("");
        setDesc("");
    }
    const removenews = async (id) => {
        const response = await fetch(`${backend}/api/deletnas/${id}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await response.json();
        alert(data.status);
        document.getElementById('getnas').click();
    }
    useEffect((d) => {
        if (isadmin == true) {
            document.getElementById('addnas').style.display = "unset"
            setDisplay("unset");
        } else {
            document.getElementById('addnas').style.display = "none"
            setDisplay("none");
        }
        document.getElementById('getnas').click();
        setTimeout(() => {
        }, 10);
    }, [])
    return (
        <div id='offers'>
            <h1 style={{ textAlign: "center" }}>Offers</h1>
            <form className='login' onSubmit={addnas} id="addnas" >
                <div >
                    <input style={{ width:"50vw" }} type="text" value={heading} placeholder="heading" onChange={(e) => { setHeading(e.target.value) }} /> <br />
                    <input style={{ width:"50vw" }} type="text" value={desc} placeholder="desc" onChange={(e) => { setDesc(e.target.value) }} /> <br />
                    <button className='btns' type="submit">Add news</button>
                </div>
            </form>
            <button id='getnas' style={{ display: "none" }} onClick={getnas}>show news and sceams</button>
            {nas.length != 0 ? (nas.map((e, id) => {
                return (
                    <div key={id} id="specificnas" >
                        <div  style={{backgroundColor:"rgba(0, 0, 0, 0.4)",padding:"20px"}}>
                            <h1 style={{ textAlign: "end", fontWeight: "bold" }}>{e.headline}</h1>
                            <p style={{ textAlign: "end" }}>{e.desc}</p>
                            <button className='btns' style={{ display: `${display}` }} onClick={(d) => {
                                d.preventDefault();
                                removenews(e._id);
                            }}>remove</button>
                        </div>
                    </div>
                )
            })) : ( isload?  <Loading/>: <p>No data</p> )}
        </div>
    )
}

export default Nas
