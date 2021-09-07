import React, { useState,useEffect,useContext,useCallback,memo } from 'react'
import { EditorState,convertFromRaw,convertToRaw} from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {HiDotsVertical} from 'react-icons/hi'; 
import {RiFolderSharedFill} from 'react-icons/ri'; 
import { AiFillDelete } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md'; 
import {BsArrowLeftShort} from 'react-icons/bs'; 
import {HiOutlineDownload} from 'react-icons/hi'; 
import Context from '../HooksFiles/Context'
import draftToHtml from 'draftjs-to-html';
import axios from 'axios' 
import '../../css/Notes.css'

function Notes({
    showAdvanceFeatures,
    ViewAllDoc,
    notesData,
    displaySendToDiv,    
    folderName,
    deleteFile,
    sendFileFunction,
    editIconColor,
    // NotesDataApi
}) 
{
    const {state,dispatch}=useContext(Context)
    const currentFolder=state.currentFolder    
    const FileSaver = require('file-saver');
    
    const previewNotes=state.notes!==null?true:false
    

    const Notes_ViewAllDoc_styles={
        width:ViewAllDoc && previewNotes ?"49%":ViewAllDoc?"28%":"53%",
        height:ViewAllDoc && previewNotes ?"30%":ViewAllDoc?"35%":'56%',
        // height:ViewAllDoc?"35%":'56%',
        left:ViewAllDoc?"0%":"22%",
        marginLeft:ViewAllDoc?"0%":null,
        marginTop:ViewAllDoc?"3.5%":"5%",
        // top:"-2%",
        top:ViewAllDoc && previewNotes?"0%":null}

    const notes_heading_ViewAllDoc_styles={
        height:ViewAllDoc?"17%":"13%",
        fontSize:ViewAllDoc?"100%":"1.3rem",
        paddingTop:ViewAllDoc?"0%":"1%",
    }

    const preview_text_div_ViewAllDoc_Styles={
        width:ViewAllDoc?'100%':"22vw",
        height:ViewAllDoc?'100%':"33vh",
        fontSize:ViewAllDoc?'2.2vw':"3.2vw",
        top:'14%',
        left: ViewAllDoc?'-4%':null
        ,right: !ViewAllDoc?'0%':null
    }
 
    const Back_Icon_SendToDiv=(index)=> {
        console.log(document.getElementsByClassName(`sendToDiv${index}`)[0])    
        console.log(document.getElementsByClassName(`sendToDiv${index}`))
        document.getElementsByClassName(`sendToDiv${index}`)[0].style.display='none'
    } 


 
    const DownloadNotes=async(files,index)=>{
    
        var blob = new Blob([document.getElementById("notes_body").textContent], {type: "application/msword"});
        FileSaver.saveAs(blob, `${files.heading}.Docx`);
        
    }

    const editNotes=(index)=>{
        dispatch({type:"seteditNotes",editNotes:false})
        document.getElementById(`textDoc_editIcon${index}`).style.backgroundColor="cadetblue"
       }

    const editNotes2=(index)=>{
        dispatch({type:"seteditNotes",editNotes:true})
        document.getElementById(`textDoc_editIcon${index}`).style.backgroundColor="dimgrey"
    }
const Preview=(ImageName)=>{
    dispatch({type:"setnotes",notes:ImageName})
    dispatch({type:"seteditNotes",editNotes:true})
    // document.getElementsByClassName(`textDoc_editIcon`)[0].style.backgroundColor="dimgrey"
}


const checkbox_styless={
    width:ViewAllDoc?"11%":null,
    height:ViewAllDoc?"12%":null,
    left:ViewAllDoc?"3%":null,
    top:ViewAllDoc?"4%":null,
}
console.log(ViewAllDoc)
 
const checkedImage=(index)=>{
    const element=document.getElementsByClassName(`checkbox${index}`)[0]        
    document.getElementsByClassName(`select_div_text${index}`)[0].innerText=element.checked?'Selected':'Select Image'
    // console.log(element.checked)
    showAdvanceFeatures()
}
    return (
        <div id="textDoc_main_div" style={{width:ViewAllDoc?"88%":"100%"}}>
 
    {notesData!==undefined && notesData.length ? notesData.map((ImageName,index) =>{  
         
    return(
    
    <>
        
        {ImageName.heading===currentFolder && ImageName.body===currentFolder ? null :

        <form key={index} id="textDoc_form" style={Notes_ViewAllDoc_styles} > 
           <div id={ViewAllDoc?"select_div_box_notes2" : "select_div_box_notes"} className={`select_div_box${index}`}  style={{display:state.selectMultipleimages?'block':'none',borderRadius:"8px",borderBottomRightRadius:"51px"}}>
            <input 
            style={checkbox_styless}
            type="checkbox"
            className={`checkbox checkbox${index}`}
            // id="checkbox"
            onClick={()=>checkedImage(index)}  style={{left:ViewAllDoc?"4%":"1%",top:ViewAllDoc?"4%":"3%",height:ViewAllDoc?"13%":null}} />
        <div id='selectMultiple_heading'>{ImageName.heading}</div>
            <p className={`select_div_text${index}`} style={{color:"white",fontSize:ViewAllDoc?"1.4vw":"2.2vw",paddingTop:"5%"}}>
            Select Image
            </p>
            </div>
        {!ViewAllDoc?
        
        <div id='textDoc_message_icons_and_heading'>

            <AiFillDelete id='textDoc_delete' size={29} onClick={()=>deleteFile(ImageName.heading,ImageName.body)} />  
            {/* style={{backgroundColor:!state.editNotes ? "cadetblue" :null }} */}
            <MdEdit className='textDoc_editIcon' id={`textDoc_editIcon${index}`} size={29} onDoubleClick={()=>editNotes2(index)}  onClick={()=>{Preview(ImageName);editNotes(index)}}/>
           
            <HiOutlineDownload id='textDoc_saveIcon' size={29}  onClick={()=>DownloadNotes(ImageName,index)}/>
        
        </div>  
        
        :null}
        
        {/* --------------------------------- Default Image Card ----------------------------------- */}
            
        <div id="textDoc_Image_Card" style={{width:ViewAllDoc?'93%':'89%',height:ViewAllDoc?'89%':'100%',left:ViewAllDoc?'3.5%':'0%',backgroundColor:ViewAllDoc?'black':null}}>
            
            <div id='three_dots_div' onClick={()=>{displaySendToDiv(index)}} style={{zIndex:state.showFoldersDiv?0:1,top:"0%"}} >
            
                <HiDotsVertical size={ViewAllDoc?24:30}/>   
            
            </div>
            
            <div id="notes_heading" style={notes_heading_ViewAllDoc_styles}>

                {!state.selectMultipleimages?ImageName.heading:null}

            </div>    
             
            <div  id="notes_body" className={`notes_body${index}`} 
           
                dangerouslySetInnerHTML={{
                    __html: draftToHtml(convertToRaw(EditorState.createWithContent(convertFromRaw(JSON.parse(ImageName.body))).getCurrentContent()))}}
                >
                
            
            </div>
                
              
            <div id="effect_div" style={{height:ViewAllDoc?'100%':'60%'}}></div> 
        
        {/* ---------------------------------- Card Preview hover ------------------------------------ */}
        
            <div id="card_image_preview_hover" style={{height:ViewAllDoc?'100%':'100%'}}>
            
                <div 
                id="preview_text_div"
                style={preview_text_div_ViewAllDoc_Styles}
                onClick={()=>{Preview(ImageName)}}
                // onDoubleClick={ViewAllDoc?()=>ScrollToPic(index):null }
                > 
                    Preview
                
                </div > 

            </div>
                    
                        


        {/* ------------------------------------- SendToDiv Area --------------------------------------- */}


                <div id="sendToDiv" className={`sendToDiv${index}`} style={{display:'none',height:ViewAllDoc?"100%":"100%"}} >

                    {/*-------------------- SendToDiv Back Icon -----------------*/}
                    
                    <div id="Back_Icon_SendToDiv"  
                     onClick={()=>{Back_Icon_SendToDiv(index)}}
                    >
                        <BsArrowLeftShort size={ViewAllDoc?28:38}/>
                    </div>
                    
                    <div id='sendToDiv_heading' style={{fontSize:ViewAllDoc?"1.1vw":"1.5vw",left:ViewAllDoc?"20%":"30%"}}>Send To Folder</div>

                    {/*-------------- SendToDiv Mapping Folder Names -------------*/}

                    <div id='sendToDiv_maindata_div'>

                        {folderName!==undefined ?folderName.map((folder_datass,indexFolders)=> 
                        
                        folder_datass.name===currentFolder ? null :

                            <div 
                            key={indexFolders}
                            id='sendToDiv_mapping_div' 
                            onClick={()=>{sendFileFunction(folder_datass,ImageName.heading,ImageName.body,index);Back_Icon_SendToDiv(index)}} 
                            style={{fontSize:ViewAllDoc?"1vw":"1.5vw",width:"100%"}}>
                            
                                <a style={{display:ViewAllDoc?"none":"block"}}>
                                    <RiFolderSharedFill/>{folder_datass.name}
                                </a>
                            
                                <span style={{display:ViewAllDoc?"block":"none"}}>
                                    {folder_datass.name}
                                </span>
                            
                            </div>
                        
                        
                        ):null}

                    </div> 
                </div>
 
            </div> 
            
        </form> }

        </>
)}).reverse():null}

</div>
)}

export default memo(Notes)
