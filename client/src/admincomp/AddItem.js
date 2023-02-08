import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { Form, json, useNavigate } from 'react-router-dom';
import { MyContext } from '../App';

function AddItem(props) {
  const {isadmin}=props;
  const {backend}=useContext(MyContext);
  const [name, setName] = useState("");
  const [pi, setPi] = useState(null);
  const [pname,setPname]=useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [addItem,setAddItem]=useState("Add Item");
  const [input,setInput]=useState("");
  const nav = useNavigate();

  const uploadfile = async ()=>{
    console.log("start uploading")
    let fn  = pname.split('.');
    let filetyep = fn[fn.length-1];
    console.log(filetyep);
    const res = await fetch(`${backend}/api/geturl/${filetyep}`);
    const data = await res.json();
    const url=data.url;
    await fetch(url,{
      method:"PUT",
      headers:{
        "content-type":"multipart/form-data"
      },
      body: pi[0]
    })
    const imgurl = url.split('?')[0];
    console.log("uploaded "+imgurl);
    
    return imgurl;
  }
  const submit = async (e) => {
    e.preventDefault();
    if(addItem=="Adding..."){return}
    setAddItem("Adding...");
    console.log("submiting");
    if(price<0){
      alert("enter valid price");
      return;
    }
    if(!isadmin){
      alert("login first!");
      nav("/alogin");
      return;
    }
    const url =await uploadfile();
    const res = await fetch(`${backend}/api/additems`,{
      method:"POST",
      headers:{
        "content-type":"application/json",
      },
      body:JSON.stringify({
        name,
        price,
        desc,
        itemImage:url
      })
    })
    const data = await res.json();
    console.log("complete")
    if(data.status=='ok'){
      alert("succesfylly added event");
      setName("");
      setDesc("");
      setPi(null);
      setInput("");
      setPrice(0);
    }else{
      alert(data.status)
    }
    setAddItem("Add Item");
  };
  useEffect(()=>{
    if(!isadmin){
      nav('/');
    }
  })
  return (
    <div className='mainlogin additem'>
      <div className='loginform ' style={{paddingTop:"50px"}}>
        <form onSubmit={submit} className="login">
          <div>
          <span>
            Name: <input id='focuson'  type="text" value={name} onChange={(e) => setName(e.target.value)} /><br />
          </span>
          <span>
            Price: <input id='focuson' type="number" value={price} onChange={(e) => setPrice(e.target.value)} /><br />
          </span>
          <span>
            Desc: <textarea   rows={5} style={{color:'white',fontSize:'1rem',backgroundColor:'transparent',flex:1,width:"51vw",borderRadius:'10px'}}  type="text" value={desc} onChange={(e) => setDesc(e.target.value)} /><br />
          </span>
          <span>
            ItemImage: <input style={{fontSize:"1rem",borderRadius:"10px"}} value={input}  type="file" onChange={(e) => {
              e.preventDefault();
              setPi(e.target.files);
              setInput(e.target.value);
              setPname(e.target.value);
            }} /><br />
          </span>
          <button className='btns' type="submit">{addItem}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddItem
