import React from 'react'
import { useState,useContext,useEffect  } from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserContext'
import Navbars from './Navbars'

const baseURL = "http://localhost/food-bytes/";

export default function OrderHistory() {
    const {user} = useContext(UserContext);
    const [order,setOrder] = useState([]);

    useEffect(()=>{
        axios.get(`${baseURL}/order.php/${user.user_id}`).then((response) => {
          setOrder(response.data);
      })
     // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
  


  return (
    <>
    <div className="orderbox order">
        <div className="TopMargin" style={{backgroundColor: "#FF7A66", borderRadius:"25px 25px 0px 0px", height:"40px"}}>
            <h2 style={{color:"white",textalign:"center"}}>Order History</h2>
        </div> 
        
        <div>
        {order?.map(order =>(
        <div key ={order.order_id} id="order" className="orderinfo">
        <h1 className='me-auto p-2 fs-4'><b>Order_ID:{order.order_id}</b>
        <br/>
        <span className='fs-5'>Date:{order.order_placed_on}</span>
        <span className='float-end fs-5 mx-3'>₹{order.total_amount}</span>
        <span className='float-end fs-5 mx-3'>Payment Mode: {order.payment_mode}</span>
        
        </h1>
        </div>
        ))}
        </div>
    </div>
    <Navbars/>
    </>
  )
}
