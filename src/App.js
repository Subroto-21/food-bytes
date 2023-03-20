import './App.css';
import {useContext, useState} from 'react'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {UserContext} from './context/UserContext';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Menu from './components/Menu';
import Order from './components/Order';
import Settings from './components/Settings';
import OrderHistory from './components/OrderHistory';
import Nearbyreat from './components/Nearbyreat';
import Admin from './components/Admin';
import Addrest from './components/Addrest';
import Addmenu from './components/Addmenu';
import Manage from './components/Manage';
import Updaterest from './components/Updaterest';
import Umenu from './components/Umenu';
import Editmenu from './components/Editmenu';
import Manageuser from './components/Manageuser';


function App() {
  const {user} = useContext(UserContext);
  const [menu_id,setMenuid] = useState('');
  const [food,setFood] = useState([]); 
  const [restaurant,setRestaurant]= useState('');
  return (
  <>
  <BrowserRouter>
          <Routes>
            { user && ( 
              <>
              { user.user_id===11 && (
              <>
              <Route path="/" element={<Admin/>}/>
              <Route path="/addrestaurant" element={<Addrest/>}/>
              <Route path="/addmenu" element={<Addmenu/>}/>
              <Route path="/manage" element={<Manage setMenuid={setMenuid} setRestaurant={setRestaurant}/>}/>
              <Route path="/update" element={<Updaterest restaurant={restaurant} setMenuid={setMenuid} />}/>
              <Route path="/editmenu" element={<Editmenu setFood={setFood} menu_id={menu_id} />}/>
              <Route path="/umenu" element={<Umenu food={food}/>}/>
              <Route path="/manageuser" element={<Manageuser/>}/>
              </>
              )}
              <Route path="/" element={<Home setMenuid={setMenuid} setRestaurant={setRestaurant} />} />
              <Route path="/menu" element={<Menu menu_id={menu_id} food={food} setFood={setFood} restaurant={restaurant}/>} />
              <Route path="/order" element={<Order/>}/>
              <Route path="/settings" element={<Settings/>}/>
              <Route path="/orderhistory" element={<OrderHistory/>}/>
              <Route path="/Nearbyrestaurant" element={<Nearbyreat setMenuid={setMenuid} setRestaurant={setRestaurant}/>}/>
              </>
            )}

            {!user && (
              <>
              <Route path="/login" element={<Login/>} />
              <Route path="/signup" element={<Register/>} />
              </>
            )}
            <Route path="*" element={<Navigate to={user ? '/':'/login'} />} />
          </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;
