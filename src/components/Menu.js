import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Navbars from './Navbars';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const baseURL = "http://localhost/food-bytes/";



export default function Menu({menu_id,food,setFood,restaurant}) {

    const {user} = useContext(UserContext);
    const [item,setItem] = useState([]);
    useEffect(()=>{
        axios.get(`${baseURL}/menu.php/${menu_id}`).then((response) =>{
            setItem(response.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  useEffect(()=>{
     axios.post(`${baseURL}/cart.php/${user.user_id}`,food).then((response) => {
        console.log(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[food]);

  return (
    <>
<div className="card restinfo rounded-4 shadow" style={{width: "  18rem" }}>
  <img src={restaurant.image}className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{restaurant.name}</h5>
    <p className="card-text">{restaurant.location}</p>
  </div>
</div>
    
    <div id="menu" className="menu container">
    <h1>MENU</h1>
    
    <div className="d-flex flex-column mb-3">
    {item.map(item =>(
    <div key ={item.f_id}id="item" className="container position-relative rounded-4 m-1">
    <h1 className='me-auto p-2 fs-4'><b>{item.food_item}</b>
    <button type="button" onClick={()=>setFood(item)} className="btn btn-success btn-sm float-end">ADD</button>
    <span className='float-end fs-5 mx-3'>₹{item.price}</span>
    </h1>
    <hr/>
    </div>
    ))}
    </div>
    </div>
    <Navbars food={food}/>
    
    </>
  )
}
