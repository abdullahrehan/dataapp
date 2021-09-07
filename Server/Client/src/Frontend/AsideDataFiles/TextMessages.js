import React, { useContext,useRef,memo } from 'react'
import { AiFillDelete } from 'react-icons/ai';
import { FaRegCopy } from 'react-icons/fa'; 
import { MdEdit } from 'react-icons/md'; 
import { FaSave } from 'react-icons/fa'; 
import TextareaAutosize from 'react-textarea-autosize';
import Context from '../HooksFiles/Context'
import axios from 'axios' 
import { Line, Circle } from 'rc-progress';
import background from '../../images/bac.jpg'

import { useImmer } from "use-immer";
import '../../css/TextMessages.css'


function TextMessages({textMessagesData,showFoldersDiv,setoldHeading}) {
 
    const {state,dispatch}=useContext(Context)
    const [showprogress,setshowprogress]=useImmer(false)
    const [progress,setprogress]=useImmer(0)
    const [onLoad_message,setonLoad_message]=useImmer('')
    const [textmsg,settextmsg]=useImmer()    
    const [textAreaUpdatedValue,settextAreaUpdatedValue]=useImmer()
    const [detectChange,setdetectChange]=useImmer()
    const [showIcons,setshowIcons]=useImmer(false)
    const [editIcon,seteditIcon]=useImmer(false)

    const ViewAllImages=state.viewAllImages
    const textarea=useRef()
    const currentFolder=state.currentFolder

 
// --------------- Save the updated text ---------------//

const saveText=(text,index)=>{
    if(detectChange==text.heading){
   
    axios.post("/txt/update",
    {email:state.accDataVerify.email,
    heading:text.heading,
    body:textAreaUpdatedValue,
    currentFolder:state.currentFolder,
    oldBody:text.body})

    .then(res=>dispatch({type:"setonEffect",setonEffect:state.onEffect+1}))

    document.getElementsByClassName(`txt-message_index${index}`)[0].readOnly=false
}
    
}

// --------------- Uploading Text Message ---------------//

const updatetextarea=(event,txtHeading)=>{
    settextAreaUpdatedValue(event.target.value)
    setdetectChange(txtHeading)
}


// --------------- Copy Text Message ---------------//

const CopyText=(textBody,index)=>{
    
    navigator.clipboard.writeText(textBody);
    document.getElementsByClassName(`messageCopiedDiv${index}`)[0].style.display='block';
    
    setTimeout(()=>{
        document.getElementsByClassName(`messageCopiedDiv${index}`)[0].style.display='none';
    },1000)

}


// --------------- Edit button Text Message ---------------//

const EditTextMessage=(index)=>{
     document.getElementsByClassName(`edit-icon${index}`)[0].style.backgroundColor=editIcon? null:'coral'
    dispatch({type:"setreadOnlyText",readOnlyText:!state.readOnlyText})    
}

 
// --------------- Delete Text Message ---------------//

const deleteTextMessage=(text)=>{
    setonLoad_message('File Deleted')
    setshowprogress(true)
    const options={
        onUploadProgress:(progressEvent) =>{
            const {loaded,total}=progressEvent;
            let percent=Math.floor((loaded * 100) /total)
            setprogress(percent)
            console.log(`Delete ${loaded}kb of ${total}kb ${percent}%`)
            if(percent===100){ 
                setTimeout(() => {
                    setshowprogress(false)  
                    
                }, 1000);}

        }
    
    }

    axios.post("/delete/txt",{email:state.accDataVerify.email,heading:text.heading,body:textmsg,folder:state.currentFolder,deletemsg:text},options)
    dispatch({type:"setonEffect",setonEffect:state.onEffect+1})
}

setTimeout(() => {
    setshowIcons(showFoldersDiv)
}, 350);


const messageIndex=textMessagesData.findIndex(data=>data===state.messages)

// console.log(messageIndex)

    return (
        <div id="messages_snippet_main">

        {/*-------------------- Mapping the text data ---------------*/}   
        <div
        style={{
        display:ViewAllImages?"flex":"block",
        flexWrap:ViewAllImages?"wrap":null,
      
        
        }}>
        
        {textMessagesData!==undefined && textMessagesData.length  ?textMessagesData.map((txtdata,index)=>{
                                
            return (  
                <>
                {txtdata.heading===currentFolder?null:
                <div id='text_message_main_div' 
                style={{
                    width:ViewAllImages?"27%":"85%",
 
                
                }}
                key={index}
                 >  

                    {/*-------------------- Icons and header Section ---------------*/}   

            <div id='text_message_icons_and_heading' 
            style={{
                height:ViewAllImages?"18%":"5vh",
                position:ViewAllImages?"relative":"absolute",
                width:ViewAllImages?"100%":"85%"}} >
                    
                        <FaRegCopy id='copy-icon' style={{cursor:'pointer'}} size={29} onClick={()=>{CopyText(txtdata.body,index)}}/>
                        <div id='txt-message-heading' style={{left:ViewAllImages?"20%":"9.2%"}}>
                            {!state.viewAllImages ? txtdata.heading :
                            txtdata.heading.split(' ')[0].length>8 ? txtdata.heading.split(' ')[0].slice(0,7)+ '..' :txtdata.heading.split(' ')[0]}
                            {state.viewAllImages ?txtdata.heading.split(' ')[0].length!==txtdata.heading.length ? '..':null:null }
                            
                            </div>
                    {showIcons && !state.viewAllImages ?   null:                  
                        <>
                        <AiFillDelete id='delete-icon' size={29} onClick={()=>deleteTextMessage(txtdata)} />  

                        <MdEdit id='edit-icon' className={`edit-icon${index}`} size={29} style={{display:ViewAllImages?"none":null}}  onClick={()=>{seteditIcon(!editIcon);EditTextMessage(index)}}/>
                
                    </>}
                    {/* <FaSave id='save-icon' size={29}  style={{display:ViewAllImages?"none":null}} onClick={()=>saveText(txtdata,index)}/> */}
                    </div>  
                
                    {/*-------------------- Message display Section ---------------*/}   

                    <div id='txt-message-box' 
                    style={{
                    backgroundColor:ViewAllImages?"#000":"#0000",
                    border:ViewAllImages?"2px solid cadetblue":"none",
                    width:ViewAllImages?"90%":"96%",
                    height:ViewAllImages?"133px":"auto",
                    paddingLeft:ViewAllImages?"1%":"8%",
                    overflow:ViewAllImages?"hidden":null,
                    cursor:"pointer",
                   
                    
                    }}
                    onClick={()=>{
                        {console.log(txtdata.color,'txtdata.color')}
                        // console.log(state)
                    //    if(state.messages!==null){
                    //     document.getElementsByClassName(`edit-icon${messageIndex}`)[0].style.backgroundColor='cadetblue';seteditIcon(!editIcon)}  
                        dispatch({type:"setreadOnlyText",readOnlyText:true})  
                        dispatch({type:"setmessages",setmessages:txtdata})
                        console.log(txtdata)
                        setoldHeading(txtdata.heading)
                        
                    }}
                    >
                        
                        <div  
                        
                        className={`txt-message_index${index}`}
                        id="txt-message" 
                        style={{
                            width:ViewAllImages?"93%":"85%",
                            height:ViewAllImages?"100%":"auto",
                            overflow:ViewAllImages?"hidden":"auto",
                            fontSize:ViewAllImages?"1.1vw":null,
                            paddingLeft:ViewAllImages?"2%":"2%",
                            backgroundColor:ViewAllImages?"#0000":"#000%",
                            border:ViewAllImages?"none":"2px solid cadetblue",
                            cursor:"pointer",
                            color:txtdata.color!==undefined || txtdata.color!==null ? txtdata.color:"white",
                            position:"relative"}}
                        
                        onChange={(e)=>{updatetextarea(e,txtdata.heading) }} 
                        maxRows={9} 
                        defaultValue={txtdata.body} 
                        ref={textarea} 
                        readOnly={true}
                        dangerouslySetInnerHTML={{
                            __html: txtdata.body}}
                       
                        
                        
                        >
                            </div> 
                        {/* <div id="text_message_preview_div">hover</div> */}
                        <span className={`messageCopiedDiv${index}`} style={{display:'none',transitionDelay:'1s'}} id={ViewAllImages?"msg-copied-view-all" :'msg-copied'}>Copied</span>
                    
                    </div>

                </div>
            
                    } </>

            )}):null} 

        </div>   

        </div>
    )
}

export default memo(TextMessages)
