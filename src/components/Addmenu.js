import React from 'react'
import Anavbar from './Anavbar'
import { useState } from 'react';
import axios from 'axios';



const baseURL = "http://localhost/food-bytes/";

export default function Addmenu() {
    const [inputs, setInputs] = useState([]);
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${baseURL}/menu.php`,inputs).then((response) => {
            console.log(response.data);
        });
        console.log(inputs);
    }
  return (
    <>
    <Anavbar/>
    <section className="NRsect">
    <div className="NRmain">
      <header>Add Menu Items</header>
      <form className="NRform" onSubmit={handleSubmit}>
        <div className="inputbox">
        <label htmlfor="food_item">Food Item: </label> <input name="food_item" className="NoBorder" type="text" placeholder="Enter Food Item" onChange={handleChange}/>
        </div>
        <div className="inputbox">
        <label htmlfor="price">Price: </label><input name="price" className="NoBorder" type="text" placeholder="Enter Price" onChange={handleChange}/>
        </div>
        <div className="inputbox">
        <label htmlfor="menu_id">Menu ID: </label><input name="menu" className="NoBorder" type="text" placeholder="Enter Menu ID" onChange={handleChange}/>
        </div>
        <button className="button" onClick={()=>alert("Item added successfully") }>Add</button>
      </form>
      </div>  
    </section>
    </>
  )
}
