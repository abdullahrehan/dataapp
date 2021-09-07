import React,{useState,useContext} from 'react'
import { Link } from 'react-router-dom';
import {  BiArrowBack } from 'react-icons/bi'; 
import Mern from '../../images/mern.png'
import Context  from '../HooksFiles/Context'
import '../../css/AboutUs.css'

function AboutUs() {
    const {state,dispatch}=useContext(Context)
//----------------------------------------------------------Html Section of Page-------------------------------------------------------------------

    return (
        <div id='AboutUs'>
            
            {/* -------------Header Code------------- */}
            
            <header id='aboutus_heading'>
                About This Website
            </header>

            {/* -------------GoBack Arrow------------- */}

            <div id='aboutus_back_arow'>
                <Link to='/'><BiArrowBack onClick={()=>{ dispatch({type:"setloading",setloading:true})}}/></Link>
            </div>
            
            {/* -------------Mern Logo------------- */}

            <img id='aboutus_mern_image' src={Mern} alt={"error"}/>
            

{/* ----------------------------------------------------About Us Information--------------------------------------- */}

            <section id='aboutus_text'>
            
                <h5 className="aboutus_text_styling">
                    Details :
                </h5>
                <h6>This Website is Created By Using the Mern Stack <br/>
                    (Mongodb Express React Node) and is created by <br/>
                    Abdullah Rehan   
                </h6>
                
                <br/>
                
                <h5 className="aboutus_text_styling">
                     The libararies used in this project are :<br/>
                </h5>
                
                <a>
                    express,mongoose,multer,nodemon,cors,grid-fs,passport,<br/>
                    dotenv,cookie-parser,google-auth-library,jsonwebtoken,<br/>
                    react-textarea-autosize,react-google-login,react-textarea<br/>
                    -autosize
                </a>

            </section>

            {/* -------------CopyRight Line------------- */}
            
            <span id="aboutus_copyright">Copyright &copy;  2021 Abdullah Rehan .All Rights Reserved </span>

{/* ----------------------------------------------------Contact  Us Part--------------------------------------- */}

            <section id='contact_us_div'>
                <h4>Contact Us</h4>
                <input type='text' id='contact_us_input_your_name' placeholder="Name"/>
                <textarea id='contact_us_input_textarea' placeholder="Write your comments ....."></textarea>
                <button id='contact_us_send_button' className='btn btn-dark'>Send</button>
            </section>
     
        </div>
    )
}

export default AboutUs
