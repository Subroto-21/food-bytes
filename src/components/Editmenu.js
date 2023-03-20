import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Anavbar from './Anavbar';
import { Link } from 'react-router-dom';

const baseURL = "http://localhost/food-bytes/";

export default function Editmenu({setFood,restaurant,menu_id}) {
    const [item,setItem] = useState([]);
    useEffect(()=>{
      const interval = setInterval(()=>{
        axios.get(`${baseURL}/menu.php/${menu_id}`).then((response) =>{
            setItem(response.data);
        })
      },500)

      return () => {
        clearInterval(interval);
      }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

const deleteitem = (id) => {
  axios.delete(`${baseURL}/menu.php/${id}`).then((response) =>
        console.log(response.data)
  )
}

  return (
    <>
    <Anavbar/>
    
    <div id="menu" className="menu container">
    <h1>MENU</h1>
    <div className="d-flex flex-column mb-3">
    
    {item.map(item =>(
    <div key ={item.f_id}id="item" className="container position-relative rounded-4 m-1">
    <h1 className='me-auto p-2 fs-4'>
    <Link to="/umenu" onClick={()=>setFood(item)}><b>{item.food_item}</b></Link>
    <button type="button" onClick={()=>{alert("Item deleted"); deleteitem(item.f_id)}} className="btn btn-danger btn-sm float-end">Delete</button>
    <span className='float-end fs-5 mx-3'>₹{item.price}</span>
    </h1>
    <hr/>
    </div>
    
    ))}
    </div>
    </div>
    </>
  )
}
