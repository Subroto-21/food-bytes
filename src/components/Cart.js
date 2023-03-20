import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

const baseURL = "http://localhost/food-bytes/";

export default function Cart({food}) {

const {user} = useContext(UserContext);
const [cart,setCart] = useState([]);

let total=0;



useEffect(()=>{

  const interval = setInterval(()=>{
    axios.get(`${baseURL}/cart.php/${user.user_id}`).then((response) => {
      setCart(response.data);
  })
  },500)

  return () => {
    clearInterval(interval);
  }
 // eslint-disable-next-line react-hooks/exhaustive-deps
},[food]);

const ondelete = (fid)=>{
  axios.delete(`${baseURL}/cart.php/${user.user_id}/${fid}`).then(function(response){
    console.log(response.data);

});
}

  return (
    <>
    <div>
   
       <div className="card text-center" style={{width: "330px" ,right: "15px" ,top: "150px" ,position:"fixed" ,zIndex:"1"}} >
        <div className="card-header bg-warning">
          Your Cart
        </div>
        <div className='card-body' style= {{height:"450px", overflowY:"scroll"}}>
        {(cart===undefined && <h5>Cart is empty</h5>) ||( cart?.length === 0 && <h5>Cart is empty</h5>) }
        {cart?.map(cart=>(
          <div key={cart.f_id} className="card" style={{width:"18rem"}}>
             <ul className="list-group list-group-flush">
             <li className="list-group-item float-start"><button type="button" onClick={()=>ondelete(cart.f_id)} className="btn-close float-start" aria-label="Close"></button>
             {cart.food_item}
             <span className='float-end'>₹{cart.price}</span>
             <div style={{display:"none"}}>{total=total+cart.price}</div>
              </li>
             </ul>
          </div>
        ))} 

          <p className="card-text"></p>
          <Link to="/order" className="btn btn-warning position-fixed bottom-0 translate-middle-x" style={{marginBottom:"15px"}}>Checkout</Link>
        </div>
      </div>
      <h5 className='total'>Total:{total}</h5>
     
    </div>

    </>
  )
}
