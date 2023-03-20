import React from 'react'
import { useState,useContext,useEffect  } from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserContext'
import Navbars from './Navbars'

const baseURL = "http://localhost/food-bytes/";

export default function Order() {
  const {user} = useContext(UserContext);
  const [order,setOrder] = useState([]);
  const [pmode,setPmode] = useState("COD")
  let total =0;
  useEffect(()=>{
      axios.get(`${baseURL}/cart.php/${user.user_id}`).then((response) => {
        setOrder(response.data);
    })
   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const placeorder =(total)=>{
    console.log(total);
    axios.post(`${baseURL}/order.php/${user.user_id}/${total}/${pmode}`).then((response) => {
       console.log(response.data);
   });

   axios.delete(`${baseURL}/order.php/${user.user_id}`).then((response) => {
    console.log(response.data);
  });
   
  }
 
  return (
    <>
    <div className="orderbox order">
        <div className="TopMargin" style={{backgroundColor: "#FF7A66", borderRadius:"25px 25px 0px 0px", height:"40px"}}>

        <h2 style={{color:"white",textalign:"center"}}>Order items</h2>
        <div style={{color:"black",position:'relative',left:"100px",top:"10px"}}><h4><i className="fa-solid fa-cart-shopping"></i> order</h4>
        </div>
      </div> 
        
        <div style={{position:"relative" ,top:"10px",left:"460px", color:"black"}}>
            <h4>&nbsp; &nbsp; &nbsp; &nbsp; Price</h4>
        </div>
        <hr/>

        <div>
        {order?.map(order =>(
        <div key ={order.f_id}id="order" className="container position-relative rounded-4 m-1">
        <h1 className='me-auto p-2 fs-4'><b>{order.food_item}</b>
        <span className='float-end fs-5 mx-3'>₹{order.price}</span>
        <div style={{display:"none"}}>{total=total+order.price}</div>
        </h1>
        
        </div>
        
    ))}
        </div>
        <select className="form-select dropdown" aria-label="Default select exam">
          <option selected>Payment Mode</option>
          <option value="Net Banking"><button onClick={()=>setPmode("Net Banking")} class="dropdown-item">Net Banking</button></option>
          <option value="UPI"><button onClick={()=>setPmode("UPI")} class="dropdown-item">UPI</button></option>
          <option value="Cash On Delivery"><button onClick={()=>setPmode("COD")} class="dropdown-item">Cash On Delivery</button></option>
        </select>
        
    
            <h4 className='ftotal'>Total:{total}</h4>
            <button type="button" onClick={()=>{alert("Order Placed!!"); placeorder(total);} } className="obutton"><strong>Place Order</strong></button>

    </div>
    <Navbars/>
    </>
  )
}
