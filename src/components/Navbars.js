import React from 'react'
import {useContext} from 'react'
import { Link } from 'react-router-dom'
import {UserContext} from '../context/UserContext'
import Food from '../Food.png'
import Cart from './Cart'

export default function Navbars({food}) {
  const {user,logout} = useContext(UserContext);
  return (
    <>
    <div>
    {/*Logo*/}
    <div className='logo'>
      <img src={Food} alt="FOOD BYTES"/>
    </div>

    {/*Left navbar*/}
    <div className="left_side">
            <a id="h" href="/"><i className="fa-solid fa-house"></i></a>
            <Link to="/Nearbyrestaurant"><i className="fa-regular fa-compass"></i></Link>
            <Link to="/orderhistory"><i className="fa-sharp fa-solid fa-clock-rotate-left"></i></Link>
            <Link to="/settings"><i className="fa-solid fa-gear"></i></Link>
            <a id="logout" onClick={logout} href="/"><i className="fa-solid fa-right-from-bracket"></i></a>
      </div>

    {/*Right navbar*/}
      <div className='user'></div>
      <span className="badge p-3 " style={{height:"50px", width:"300px",right:"30px",top:"15px",position:"fixed",zIndex:"1",backgroundColor:"#7E1470"}}>
        <h6 className='float-start text-capitalize'><i className="fa-solid fa-user "></i> &nbsp; {user.name}</h6></span>
   <Cart food={food}/>
     
    </div>
    </>
  )
}
