import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Anavbar from './Anavbar';

const baseURL = "http://localhost/food-bytes/";


export default function Manageuser() {
    const [item,setItem] = useState([]);
    useEffect(()=>{
        axios.get(`${baseURL}/user.php`).then((response) =>{
            setItem(response.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const deleteuser = (id) =>{
        axios.delete(`${baseURL}/user.php/${id}`).then((response) =>{
            console.log(response.data);
        })
    }
   
    
  return (
    <>
        <Anavbar/>
        <div className='container'>
        <h3>User list</h3>
      {item.map(item =>(
        <div className='container my-1'>
            <h5>{item.name}</h5>
            <br/>
            <h6>User ID:{item.user_id}</h6>
            <br/>
            <h6>Email:{item.email}</h6>
            <br/>
            <button className='btn btn-danger btn-sm float-end' onClick={()=>{alert("User deleted"); deleteuser(item.user_id)}}>Delete</button>
            <h6>Location:{item.location}</h6>
            
        </div>
        ))}
        
        </div>
    </>
  )
}
