import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Anavbar from './Anavbar';

const baseURL = "http://localhost/food-bytes/";
export default function Manage({setMenuid,setRestaurant}) {
    const [item,setItem] = useState([]);
    useEffect(()=> {
        axios.get(`${baseURL}/restaurant.php`).then((response) => {
          setItem(response.data);
        });
         // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

      const getmenu =(id) =>{
        setMenuid(id);
      }
    
      const getrestaurant =(restaurant) =>{
        setRestaurant(restaurant);
      }
  return (
    <>
        <Anavbar/>
      <div className='container scrl'>
        <h3 id='picks'>Restaurants</h3>
      
        <div className="row row-cols-3">
        {item.map(item =>(

        <Link to="/update" key={item.restaurant_id} className="card m-2 rcard col" onClick={()=>{getmenu(item.m_id);getrestaurant(item);}} style={{width: "30%",textDecoration:"none",color:"black"}}>
          <img src={item.image} className="card-img-top rimg" alt="..."/>
          <div  className="card-body shadow">
            <h5 className="card-title">{item.name}</h5>
            <p className="card-text"></p>
          </div>
        </Link>
        ))}
        </div>
    </div>
    </>
  )
}
