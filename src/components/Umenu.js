import React from 'react'
import Anavbar from './Anavbar'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';


const baseURL = "http://localhost/food-bytes/";

export default function Umenu({food}) {
    const [inputs, setInputs] = useState([]);
    useEffect(()=> {
      axios.get(`${baseURL}/menu.php/a/${food.f_id}`).then((response) => {
        setInputs(response.data);
      });
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`${baseURL}/menu.php/${food.f_id}`,inputs).then((response) => {
            console.log(response.data);
        });
    }
  return (
    <>
      <Anavbar/>
    <section className="NRsect">
    <div className="NRmain">
      <header>Add Menu Items</header>
      <form className="NRform" onSubmit={handleSubmit}>
        <div className="inputbox">
        <label htmlFor="food_item">Food Item: </label> <input defaultValue={inputs.food_item} name="food_item" className="NoBorder" type="text"  onChange={handleChange}/>
        </div>
        <div className="inputbox">
        <label htmlFor="price">Price: </label><input defaultValue={inputs.price} name="price" className="NoBorder" type="text"  onChange={handleChange}/>
        </div>
        <button className="button" onClick={()=>alert("Item added successfully") }>Update</button>
      </form>
      </div>  
    </section>
    </>
  )
}
