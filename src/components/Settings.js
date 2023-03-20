import React from 'react'
import Navbars from './Navbars'

export default function Settings() {
  return (
    <>
    <div className="SettingName"><strong>Settings</strong></div>
    <div className="mainSet shadow">
    
    <form>
    <div><button className="Setcomponent c1"><h5>Account</h5><h6><span className="notbold">Account Info</span></h6></button></div>
    <button className="Setcomponent c1"><h5>Addresse</h5><h6><span className="notbold">Change Address</span></h6></button>
    <button className="Setcomponent c1"><h5>Help</h5><h6><span className="notbold">FAQs & links</span></h6></button>
    <button className="Setcomponent c1"><h5>About Us</h5></button>
    </form>
    </div>

    <Navbars/>
    </>
  )
}
