import React,{ useState,useContext, useRef,memo} from 'react'
import { ImCross } from 'react-icons/im';  
import Context1 from '../HooksFiles/Context'
import Editor from './Editor.js'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {HiDotsVertical} from 'react-icons/hi'; 
import {RiFolderSharedFill} from 'react-icons/ri'; 
import { AiFillDelete } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md'; 
import {BsArrowLeftShort} from 'react-icons/bs'; 
import {HiOutlineDownload} from 'react-icons/hi'; 
import axios from 'axios' 
import '../../css/ImageUpload.css'   
import '../../css/notesUploads.css'   
import { EditorState,getCurrentContent,convertToRaw} from 'draft-js';


const initialstate= EditorState.createEmpty()

function NotesUploads({seteditIconColor,deleteFile,NotesDataApi}) {

    const {state,dispatch}=useContext(Context1)
    const [NotesData,setNotesData]=useState(initialstate);
    const [notesName,setnotesName]=useState('')
    const readOnlyState=state.notes!==null ? state.editNotes :false
    const [emptyEditor,setemptyEditor]=useState(0)
      
    const FileSaver = require('file-saver');
    // const url=""
    
    const editorState = JSON.stringify(convertToRaw(NotesData.getCurrentContent()))
    const notesData=useRef()

    const previewNotes=state.notes!==null?true:false
    const NotesIndex=NotesDataApi!==undefined?NotesDataApi.findIndex(data=>data===state.notes):null

    const uploadNotes=()=>{
            
        if(notesName===''){alert('field Required')}
    
        else {
        axios.post(`/upload/notes`,
        {email:state.accDataVerify.email,
        header:notesName,
        data:editorState,
        folder:state.currentFolder
        })
        .then(res=>dispatch({type:"setonEffect",setonEffect:state.onEffect+1}))
        }
        setemptyEditor(emptyEditor+1);
        setnotesName("")
    }

    const saveNotes=(index)=>{
        
        const notes=state.notes
        
        // if(detectChange==notes.heading){
    
        axios.post("/notes/update",
        {email:state.accDataVerify.email,
        heading:notesName!==null && notesName!==undefined && notesName!=='' ? notesName : notes.heading ,
        body:editorState,
        currentFolder:state.currentFolder,
        oldheading:notes.heading,
        oldBody:notes.body})

        .then(res=>dispatch({type:"setonEffect",setonEffect:state.onEffect+1}))
        dispatch({type:"seteditNotes",editNotes:true})  
        // document.getElementsByClassName(`txt-message_index${index}`)[0].readOnly=false
        // alert(notesName,'sd')
    // }
        
    }
    
//  console.log(editorState,'NotesData')
    const cross_btn_Notes_upload=()=>{
        setemptyEditor(emptyEditor+1);
        setnotesName('');
        dispatch({type:"setnotes",notes:null})
        dispatch({type:"seteditNotes",editNotes:true})
        seteditIconColor()  
        // document.getElementsByClassName(`textDoc_editIcon`)[0].style.backgroundColor="dimgrey"
    
    
    // alert(state.editNotes)
}

const DownloadNotes=async(files,index)=>{
    
    var blob = new Blob([document.getElementById("notes_body").textContent], {type: "application/msword"});
    FileSaver.saveAs(blob, `${files.heading}.Docx`);
    
}

const editNotes=(index)=>{
    dispatch({type:"seteditNotes",editNotes:false})
    document.getElementById(`textDoc_editIcon${index}`).style.backgroundColor="cadetblue"
    // alert(state.editNotes)
   }
console.log(state.editNotes)
    return (
        <div style={{
            // width:"100%",height:"100%"
            display:"flex",flex:1}}>
            <div id='notesUpload_main_div' style={{backgroundColor:"#212529"}}  >
                <div id='Showing_upload_image_div_heading_text' style={{borderBottom:"none",height:"100%",transition:'1s'}}>
                    
                    {/* <div id='Showing_upload_image_div'> */}
                                
                        {/* <div id='Showing_upload_image_div_heading' > */}
                            {/* <label id="Showing_upload_image_div_heading_text">  */}
                                {previewNotes ? '' :'Messages'}
                            {/* </label> */}
                        {/* </div> */}
                                
                        
                    {/* </div> */}

                </div>

                <div id="notes_mainDiv" style={{width :previewNotes ? "74.5%" :null }}>
                  {console.log(previewNotes)}
                    <ImCross id='notes_preview_frame_cross_icon' color="white" size={30} 
                    onClick={cross_btn_Notes_upload}/>
               
                    <div id="editor_div" style={{height :previewNotes ? "73%" :null,width :previewNotes ? "12%" :null }}>
                    {console.log(NotesData)}
                        <Editor emptyEditor={emptyEditor} NotesData={NotesData} setNotesData={(value)=>setNotesData(value)}/>
                    
                    </div>
                    {state.notes!==null ?console.log(state.notes):null}
                    
                    <div id="icons_div" style={{display:previewNotes?"block":'none'}}>
                    
                    <AiFillDelete id='textDoc_delete' size={29} onClick={()=>deleteFile(state.notes.heading,state.notes.body)}  style={{right:"0%",}}/>  
          
                    <MdEdit className='textDoc_editIcon' id={`textDoc_editIcon${NotesIndex}`} size={29}   onClick={()=>{editNotes(NotesIndex)}} style={{right:"0%",top:"16%"}}/>
           
                    <HiOutlineDownload id='textDoc_saveIcon' size={29}  onClick={()=>DownloadNotes(state.notes,NotesIndex)} style={{right:"0%",top:"31%"}}/>
        
                    </div>  
                
                </div> 
               
             
                <div id='Notes_upload_Name_area' style={{top : previewNotes? "17%" :null,position:previewNotes? "absolute" :null,left:previewNotes? "20%" :null }} >
                        <input 
                        type="text"
                        placeholder="Notes Name"
                        id="upload_input"
                        value={ notesName }
                        placeholder={state.notes!==null  ?  state.notes.heading:notesName }
                        readOnly={readOnlyState}
                        onChange={(e)=>setnotesName(e.target.value)}
                        style={{textAlign : previewNotes? "center" :null }}    
                       />
                        
                  {
                        !previewNotes ? 
                        <button style={{float:'right'}} onClick={()=>uploadNotes()} type="button" className="btn btn-dark">
                        Upload
                    </button>
                        :null}
                    </div>
                    {!state.editNotes && state.notes!==null ?

                  
                      
<button id="saveButton_notesUpload"  onClick={()=>saveNotes()} type="button" className="btn btn-dark">
    Save
</button>
:null}
            </div>
        </div>
    )
}

export default memo(NotesUploads)

 