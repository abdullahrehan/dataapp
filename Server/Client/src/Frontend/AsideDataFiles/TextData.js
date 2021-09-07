// import React, { useState,useEffect, useContext,useRef } from 'react'
// import { AiFillDelete } from 'react-icons/ai';
// import { FaRegCopy } from 'react-icons/fa'; 
// import { MdEdit } from 'react-icons/md'; 
// import { FaSave } from 'react-icons/fa'; 
// import {TiFolderOpen} from 'react-icons/ti'
// import Context from '../HooksFiles/Context'
// import TextareaAutosize from 'react-textarea-autosize';
// import FolderSystem from '../AsideDataFiles/folderSystem'
// import axios from 'axios' 
// import '../../css/TextData.css'
 
 
// function TextData() {

//     const {state,dispatch}=useContext(Context)
//     const [textmsg,settextmsg]=useState()
//     const [showtextmsgheading,setshowtextmsgheading]=useState([])
//     const [showtextmsg,setshowtextmsg]=useState('Enter data')
//     const [textAreaUpdatedValue,settextAreaUpdatedValue]=useState()
//     const [detectChange,setdetectChange]=useState()
//     const [showFoldersDiv,setshowFoldersDiv]=useState(false)
  
//     const folderstatus=state.accDataVerify.messages.main.find(data=>data.name===state.currentFolder).secure

// //------------------------------------------------------------Assigning Refs()--------------------------------------------------------------

 
//     const textarea=useRef()
  
// //------------------------------------------------------Frontend Fuctions of Page--------------------------------------------------------------

//     const textmessage=state.accDataVerify.messages.main.find(folder=>folder.name===state.currentFolder).value 

//     const apitxt=()=>{
//             const textmessage=state.accDataVerify.messages.main.find(folder=>folder.name===state.currentFolder).value
//             setshowtextmsg(textmessage)
//     }

       
//     //  This Function Send New Messages to the Server
//     const postingtext=()=>{
//         axios.post('http://localhost:2000/upload/txt',{email:state.accDataVerify.email,heading:showtextmsgheading,body:textmsg,folder:state.currentFolder})
//         settextmsg('')
//         setshowtextmsgheading('')
//     }

//     //This Function Send Delete Messages Request to the Server 
//     const deletetxtapi=async(text)=>{
//         const postingapi=await axios.post("http://localhost:2000/delete/txt",{email:state.accDataVerify.email,heading:text.heading,body:textmsg,currentFolder:state.currentFolder,deletemsg:text})
//     }

//     const saveText=(text)=>{
//         if(detectChange==text.heading){
//         const updateText= axios.post("http://localhost:2000/txt/update",
//         {email:state.accDataVerify.email,heading:text.heading,body:textAreaUpdatedValue,currentFolder:state.currentFolder})
//     console.log(text,'text');
//     }
//     }
 
//     const updatetextarea=(event,txtHeading)=>{
//         settextAreaUpdatedValue(event.target.value)
//         setdetectChange(txtHeading)
//     }

    
//     const folders=()=>{setshowFoldersDiv(!showFoldersDiv)}
    
//     const CopyText=(textBody,index)=>{
        
//         navigator.clipboard.writeText(textBody);
//         console.log(textBody);
//         document.getElementsByClassName(`messageCopiedDiv${index}`)[0].style.display='block';
        
//         setTimeout(()=>{
//             document.getElementsByClassName(`messageCopiedDiv${index}`)[0].style.display='none';
//         },1000)
   
//     }

//     const EditTextMessage=(index)=>{
//         document.getElementsByClassName(`txt-message_index${index}`)[0].readOnly=false
//     }


//     useEffect(()=>{apitxt()}) 
//     useEffect(()=>{dispatch({type:"setcurrentTab",setcurrentTab:'messages'})},[]) 

 
   

 
//    return (
             
//     <div id='TextData' onLoad={()=>{return dispatch({type:"setcurrentTab",setcurrentTab:'messages'})}}>
        
//         <div id="folder_icon_div">
//             <TiFolderOpen size={45} id='open_folder_icon' onClick={folders}/>
//         </div>
       
        
//         <FolderSystem foldersDiv={showFoldersDiv} filetosend={'filenametosend'}/>  
                         
//         <div id="blur_div" style={{display:showFoldersDiv?'block':"none"}}></div>
 

//         <div id='text-container' style={{zIndex:showFoldersDiv?0:1}}>   
            
//         <h2 style={{textAlign:'center',marginTop:'-1%'}}>{state.currentFolder}</h2>
        
//         {showtextmsg[0]!==undefined ? textmessage.map((txtdata,index)=>{
                         
//         return (  
//             <div id='text_message_main_div'>

//                 <div id='text_message_icons_and_heading'>
                
//                     <FaRegCopy id='copy-icon' size={29} onClick={()=>{CopyText(txtdata.body,index)}}/>
//                     <div id='txt-message-heading'>{txtdata.heading}</div>
//                     <AiFillDelete id='delete-icon' size={29} onClick={()=>deletetxtapi(txtdata)} />                      
//                     <MdEdit id='edit-icon' size={29}  onClick={()=>{EditTextMessage(index)}}/>
//                     <FaSave id='save-icon' size={29}  onClick={()=>saveText(txtdata)}/>
                
//                 </div>
            
//                 <div id='txt-message-box'>
              
//                     <TextareaAutosize className={`txt-message_index${index}`} id="txt-message" onChange={(e)=>{updatetextarea(e,txtdata.heading) }} maxRows={5} defaultValue={txtdata.body} ref={textarea} readOnly={true} /> 
//                     <span className={`messageCopiedDiv${index}`} style={{display:'none',transitionDelay:'1s'}} id='msg-copied'>Message Copied</span>
                
//                 </div>

//         </div>
//         )}) 
//         :null}             
        
//         </div>


//         <div id="search" class="input-group">
//             <input id='search_textarea_header' maxLength={18} type='text' value={showtextmsgheading} onChange={(e)=>setshowtextmsgheading(e.target.value)} placeholder='heading'/>
//             <textarea id="search_textarea" className="form-control" aria-label="With textarea" onChange={(e)=>settextmsg(e.target.value)} value={textmsg}></textarea>
//             <a  id='addtxt-btn' className="btn btn-primary" onClick={postingtext}>Add</a>    
//         </div>
      
        
//     </div>
//     )
// }

// export default TextData
