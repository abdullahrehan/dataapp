import React from 'react'
import { Link } from 'react-router-dom';
import {  BiArrowBack } from 'react-icons/bi'; 
import '../../css/NotFound.css'

function NotFound() {

//----------------------------------------------------------Html Section of Page-------------------------------------------------------------------

    return (
        <div  id='NotFound_main_div'>
         
            <div id="error_content">

            {/*----------------- 404 not Found Line ----------------- */}

                <div id="notFound_firstLine">
                    Error <a style={{color:'red'}}>404 !</a>
                </div>
                
                <br/>
                
                <div id="notFound_secoundLine">
                    Page Not <a style={{color:'red'}}>Found</a>
                </div>
                
            {/*----------------- Error Message Line ----------------- */}
   
                <div id="error_message_line">
                
                    <br/>
                    
                    <div>Unfortunately  ! The Page You are Looking for Doesn't found</div>
                    
                    <br/>

            {/*----------------- Go Back Button  ----------------- */}
                
                    <Link to='/'>
                        <button className="btn btn-danger" id="GoBack_button" ><BiArrowBack/> Go Back</button>
                    </Link>
                
                </div>
            
            </div >
        
        </div>
    )
}

export default NotFound
