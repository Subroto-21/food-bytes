import React from 'react'
import {useContext} from 'react'
import {UserContext} from '../context/UserContext'
import Food from '../Food.png'
import { Link } from 'react-router-dom'

export default function Anavbar() {
    const {logout} = useContext(UserContext);
  return (
    <>
     <div className="asidebar">
     <img src={Food} alt="FOOD BYTES" id='l'/>
        <Link to="/"><button className="b bg-warning">Home</button></Link>
        <Link to="/addrestaurant"><button className="b bg-warning">New Restaurant</button></Link>
        <Link to="/manage"><button className="b bg-warning">Manage Restaurant</button></Link>
        <Link to="/manageuser"><button className="b bg-warning">Users</button></Link>
        <button id="logout" onClick={logout} className="b bg-warning">Logout</button>
    
    </div>
    </>
  )
}
