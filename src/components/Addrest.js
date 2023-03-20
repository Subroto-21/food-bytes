import React from 'react'
import Anavbar from './Anavbar'
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const baseURL = "http://localhost/food-bytes/";

export default function Addrest() {
    const [inputs, setInputs] = useState([]);
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${baseURL}/restaurant.php`,inputs).then((response) => {
            console.log(response.data);
        });
        console.log(inputs);
    }
  return (
    <>
    <Anavbar/>
    <section className="NRsect">
    <div className="NRmain">
      <header>Registration</header>
      <form className="NRform" onSubmit={handleSubmit}>
        <div className="inputbox">
        <label htmlfor="name">Name: </label> <input name="name" className="NoBorder" type="text" placeholder="Restaurant Name" onChange={handleChange}/>
        </div>
        <div className="inputbox">
        <label htmlfor="address">Address: </label><input name="address" className="NoBorder" type="text" placeholder="Enter Address" onChange={handleChange}/>
        </div>
        <div className="inputbox">
        <label htmlfor="menu_id">Menu ID: </label><input name="menu" className="NoBorder" type="text" placeholder="Enter Menu ID" onChange={handleChange}/>
        </div>
        <div className="inputbox">
        <label htmlfor="image">Image URL: </label><input name="image" className="NoBorder" type="text" placeholder="Enter Image URL" onChange={handleChange}/>
        </div>
        
        <button className="button" onClick={()=>alert("Restaurant registered") }>Register</button>
      </form>
      <Link to="/addmenu"><button className='am my-4'>Add Menu</button></Link>
      </div>  
    </section>
    
    </>
  )
}
