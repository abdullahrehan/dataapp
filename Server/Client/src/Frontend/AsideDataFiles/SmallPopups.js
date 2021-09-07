import React,{useRef} from 'react'
import {ImCross} from 'react-icons/im';
import '../../css/SmallPopups.css'


function SmallPopups({headingOne,headingTwo,buttonHeading,mainDivDisplay,buttonFunction,crossFunction,showInput,setFolderNameRef,PaddingTop}) {
 
    const folder_actual_name=useRef()
    setFolderNameRef(folder_actual_name)
    console.log('small popups',headingOne)

//---------------------------------------------------------------Html Section-------------------------------------------------------------

    return (
      
             <div id="fade_background_for_set_folder_name_div" style={{display:mainDivDisplay?"block":"none"}}>

                 {/* ----------------- Confirmation Dialoge Box --------------------------*/}

                <div id='secureFolder_dialogue_box' style={{paddingTop:PaddingTop}}>
                    <ImCross id="confirmation_div_cross_icon" size={25} onClick={()=>{crossFunction(false)}}/>
                        <h4>{headingOne}</h4> 
                        <h6>{headingTwo}</h6> 

                 {/* ----------------- Input Field For Enter Folder Name --------------------------*/}

                        {showInput ?
                        <input id="folder_name_input" placeholder="Folder Name " ref={folder_actual_name}/>
                        :null}

                        <button className="btn btn-dark" id="password_div_button" onClick={(e)=>{buttonFunction();e.preventDefault();crossFunction(false)}}>{buttonHeading}</button>
                </div> 
            </div>
      
    )
}

export default SmallPopups
