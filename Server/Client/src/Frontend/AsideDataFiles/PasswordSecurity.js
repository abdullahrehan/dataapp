import React, { useState, useContext,useRef } from 'react' 
import {ImCross} from 'react-icons/im';
import {BsFillBackspaceFill} from 'react-icons/bs'
import '../../css/PasswordSecurity.css'
 

function PasswordSecurity({showEnterPassword,headingOne,headingTwo,crossFunction,confirmFolderPassword,enterFolderPassword,folderPassword,buttonHeading}) {

    // --------------Arrays for maping Input fields and Buttons---------------------
    
    const inputPasswordArray=[0,1,2,3]
    const inputButtonsArray=[1,2,3,4,5,6,"#",'@']

//---------------------------------------------------------------Html Section-------------------------------------------------------------

    return (
    
      <div id="fade_background_for_set_folder_name_div" style={{display:showEnterPassword?"block":"none"}}>
                
                {/* // -------------- Password Creating and Entery Section--------------------- */}

                <div id='set_folder_name_folderSystem_setSecure_password'  >
                
                    <ImCross id="password_div_cross_icon" size={25} onClick={()=>{crossFunction(false)}}/>
                    
                {/* // --------------password Div Headings--------------------- */}

                    <h4>
                        {headingOne}
                    </h4>
                    
                    <a id="headingTwo" style={{fontSize:".9vw",color:'sandybrown'}} >
                        {headingTwo}
                    </a>     
                    
                {/* // --------------Mapping password Div Inputs--------------------- */}

                    <div>

                    {inputPasswordArray.map(inputFields=>
                    
                    <input type='text'
                    className='textfield_setSecure_password'
                    value={folderPassword.charAt(inputFields)}
                    onChange={()=>console.log()}
                    maxLength={8}/>
                    
                    )}

                   </div>

                {/* // --------------Mapping password Div Buttons--------------------- */}

                    <div id="inputButtonsPasswordSecurity">
                    
                    {inputButtonsArray.map(inputButtons=>
                    
                    <input 
                    type="button"
                    value={inputButtons}
                    className='textfield_setSecure_password'
                    onClick={()=>enterFolderPassword(folderPassword+`${inputButtons}`)}
                    />
                    
                    )}
                    
                    </div>
                    
                    {/* // --------------Password Div Submit and Clear Text Buttons--------------------- */}

                    <button className="btn btn-dark" id="clear_text_button" onClick={()=>enterFolderPassword('')}><BsFillBackspaceFill size={20}/></button>
                    <button className="btn btn-dark" id="password_enter_div" onClick={confirmFolderPassword}>{buttonHeading}</button>
                </div> 
            </div> 
    )
}

export default PasswordSecurity
