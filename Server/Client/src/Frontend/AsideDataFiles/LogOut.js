import React from 'react'
import { Link  } from 'react-router-dom';
import back from '../../images/g.jpg'
import '../../css/logout.css'
function LogOut() {
    return (
        <div style={{width:"100%",height:'100%',backgroundColor:"currentcolor"}}>
            
            <div id='logoutText'>
            <h2 style={{paddingTop:'1%',color:"green"}}>You Have Successfully logot</h2>
            <h6 style={{fontFamily:"cursive",paddingTop:'1%'}}>Go back to signup page</h6>

            <button className="btn btn-dark" style={{paddingTop:'1%'}}><a href='/'>Go Back</a></button>
            </div>
           
        </div>
    )
}

export default LogOut
