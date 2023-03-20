import React from 'react'
import Anavbar from './Anavbar'
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';


const baseURL = "http://localhost/food-bytes/";

export default function Updaterest({restaurant,setMenuid}) {
    const [inputs, setInputs] = useState([]);

    useEffect(()=> {
      getrest();
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function getrest() {
      axios.get(`${baseURL}/restaurant.php/${restaurant.restaurant_id}`).then((response) => {
        setInputs(response.data);
      });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`${baseURL}/restaurant.php/${restaurant.restaurant_id}`,inputs).then((response) => {
            console.log(response.data);
        });
    }

    const deleterest = (id) => {
      axios.delete(`${baseURL}/restaurant.php/${id}/${restaurant.m_id}`).then(function(response){
        console.log(response.data);
    });
    }


  return (
    <>
      <Anavbar/>
    <section className="NRsect">
    <div className="NRmain">
      <header>Update Restaurant Info</header>
      <form className="NRform" onSubmit={handleSubmit}>
   
        <div className="inputbox">
        <label htmlFor="name">Name:</label> <input defaultValue={inputs.name} type="text" name="name" onChange={handleChange} className="NoBorder"/>
        </div>
        <div className="inputbox">
        <label htmlFor="location">Address: </label><input defaultValue={inputs.location}  name="location" className="NoBorder" type="text" onChange={handleChange}/>
        </div>
        <div className="inputbox">
        <label htmlFor="image">Image URL: </label><input defaultValue={inputs.image} name="image" className="NoBorder" type="text"  onChange={handleChange}/>
        </div>
        <button className="button" onClick={()=>alert("Restaurant Updated") }>Update</button>
       
      </form>
     
      <Link to="/addmenu"><button className='am my-3'>Add item</button></Link>
        <br/>
      <Link to="/editmenu" onClick={()=>setMenuid(inputs.m_id)}><button className='am'>Edit Menu</button></Link>
      <br/>
      <button className='btn btn-danger my-3' onClick={()=>{alert("Restaurant Deleted"); deleterest(inputs.restaurant_id)} }>Delete</button>
      
      </div>  
    </section>
    
    </>
  )
}
