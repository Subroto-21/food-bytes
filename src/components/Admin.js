import React from 'react'
import Food from '../Food.png'
import { Link } from 'react-router-dom'
export default function Admin() {
  
  return (
    <>
     <h2 className='top'><img src={Food} alt="FOOD BYTES" id='lo'/> Admin Panel</h2>
    
     <div class="cardAd">
        <Link to ="/addrestaurant">
        <button class="cardB">
            <h3>Add Restaurant</h3>
        </button>
        </Link>

        <Link to="/manage">
        <button class="cardB">
            <h3>Manage Reataurant</h3>
        </button>
        </Link>

        <Link to="/manageuser">
        <button class="cardB">
            <h3>Manage Users</h3>
        </button>
        </Link>
    </div>
    </>
  )
}
