import Navbars from './Navbars'
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import location from '../loaction.png'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';


const baseURL = "http://localhost/food-bytes/";

export default function Nearbyreat({setMenuid,setRestaurant}) {
    const [item,setItem] = useState([]);
    const [loc,setLoc] = useState('');
    const {user} = useContext(UserContext);
    console.log(user.location);
    const handleChange = (event) => {
        let value = event.target.value;
        setLoc(value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`${baseURL}/locationupdate.php/${loc}/${user.user_id}`).then((response) => {
          console.log(response.data);
        });
      }
      
    useEffect(()=> {
      const interval = setInterval(()=>{
        axios.get(`${baseURL}/locationupdate.php/${user.location}`).then((response) => {
            console.log(response.data);
          setItem(response.data);
        })
      },500)

      return () => {
        clearInterval(interval);
      }
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
      <Navbars/>
    <div className='ourpick container-fluid py-2'>
        <h3 id='picks'>Nearby</h3>
      
        <div className="d-flex flex-row flex-nowrap">
        {item.map(item =>(

        <Link to="/menu" key={item.restaurant_id} onClick={()=>{getmenu(item.m_id);getrestaurant(item);}} className="card mx-2 rcard" style={{width: "15%",textDecoration:"none",color:"black"}}>
          <img src={item.image} className="card-img-top rimg" alt="..."/>
          <div  className="card-body shadow">
            <h5 className="card-title">{item.name}</h5>
            <p className="card-text">{item.location}</p>
          </div>
        </Link>
        
        ))}
        </div>
    </div>

    <div className='location'>
      <img src={location} className='loc_icon' alt="..."/>
      <h4>Your Location</h4>
      <input type="text" defaultValue={user.location} className='inputlocation' onChange={handleChange}/>
      <button type="button" onClick={handleSubmit} className="sbutton bg-warning">Submit</button>
    </div>
    </>
  )
}
