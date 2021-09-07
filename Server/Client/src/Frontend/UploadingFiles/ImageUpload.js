// import React,{ useState,useContext, useRef,useEffect} from 'react'
// import { ImCross } from 'react-icons/im'; 
// import { FcNext } from 'react-icons/fc'; 
// import { FcPrevious } from 'react-icons/fc'; 
// import { FiUpload } from 'react-icons/fi'; 
// import Imagepdf from '../../images/pdf.png'
// import Imageword from '../../images/word.png'
// import dot from '../../images/doted.png'
// import dotFrame2 from '../../images/doted2.png'
// import textfileImg from '../../images/textfile.png'
// import Arrows from '../../images/arrow.png'
// import textImg from '../../images/textImg22.png'
// import Context1 from '../HooksFiles/Context'
// import axios from 'axios' 
// import '../../css/ImageUpload.css'   
 

// function ImageUpload() {

//     const [file,setfile]=useState([])
//     const {state,dispatch}=useContext(Context1)
//     // const [notesName,setnotesName]=useState('')
//     const [preview_frame,setpreview_frame]=useState(false)
//     const [messageHeading,setmessageHeading]=useState('')
//     const [messageBody,setmessageBody]=useState("")
//     const [disableprevbutton]=useState(false)
//     const [disablenextbutton]=useState(false)
    
//     // const url=""
//     // const notesData=useRef()
 
// //------------------------------------------------------Api Sections--------------------------------------------------------------

//     //--------------- Function for showing image of upload file -----------------//

//     const loadFile = (e) => {
    
//         const image = new FileReader();
//         const upimgfile=e.target.files[0]   
//         const upimgfilename=e.target.files[0].name  
    
//         setfile(upimgfile)

//         image.onload=()=>{

//             if(upimgfilename.split('.').pop()==='pdf'){dispatch({type:"ChangeUrl",recdata:Imagepdf})}
//             else if(upimgfilename.split('.').pop()==='doc'){dispatch({type:"ChangeUrl",recdata:Imageword})}
//             else{dispatch({type:"ChangeUrl",recdata:image.result})}
//         }
//             image.readAsDataURL(e.target.files[0])
//     }
 
//     //--------------- Function for Sending Image data to the Server -----------------//
    
 
//     const imageUpload=(e)=>{
     
//        e.preventDefault()
//         const form=new FormData();
//         form.append("uploadedFile",file)
//         form.append("email",state.accDataVerify.email)
//         form.append("folder",state.currentFolder)
//         form.append("tab",state.currentTab)

//         axios.post("/uploadValue",{tab:state.currentTab,folder:state.currentFolder})         
//         axios.post("/upload",form)         
      
//    console.log('ok')
//         dispatch({type:"setonEffect",setonEffect:state.onEffect+1})
//     }
 
 
   
//       //------------------------------ Next Image btn function --------------------------------//
    
//     const NextImage=(image)=>{
//         const demo=state.accDataVerify.imagefolder.main
//         const findfolders=demo.find(ff=>ff.name===state.currentFolder)
//         const splitstring=image.split('/')
        
//         const findIndex=findfolders.value.find(value=>value.defaultName===splitstring[5])
//         const index=findfolders.value.indexOf(findIndex) 
//         const findNextImage=findfolders.value[index+1]
//          if(findNextImage!==undefined){dispatch({type:"ChangeUrl",recdata:`./Database/${state.accDataVerify.username}/${state.currentTab}/${state.currentFolder}/${findNextImage.defaultName}`})}
//        else{dispatch({type:"ChangeUrl",recdata:`./uploads/${findfolders.value[0]}`})}
//     }


//     //------------------------------ Previous Image btn function --------------------------------//
    
//     const PrevImage=(image)=>{
//         const demo=state.accDataVerify.imagefolder.main
//         const findfolders=demo.find(ff=>ff.name===state.currentFolder)
//         const splitstring=image.split('/')
        
//         const findIndex=findfolders.value.find(value=>value.defaultName===splitstring[5])
//         const index=findfolders.value.indexOf(findIndex) 
//         const findNextImage=findfolders.value[index-1]
//          if(findNextImage!==undefined){dispatch({type:"ChangeUrl",recdata:`./Database/${state.accDataVerify.username}/${state.currentTab}/${state.currentFolder}/${findNextImage.defaultName}`})}
//        else{dispatch({type:"ChangeUrl",recdata:`./uploads/${findfolders.value[0]}`})}
    
//     }

//     // const uploadNotes=()=>{
        
//     //     if(notesName===''){alert('field Required')}
       
//     //     else {
//     //     axios.post(`${url}/upload/notes`,
//     //     {email:state.accDataVerify.email,
//     //     header:notesName,
//     //     data:notesData.current.innerText,
//     //     folder:state.currentFolder
//     //     })
//     //     .then(res=>dispatch({type:"setAccountData",accData:res.data}))
//     //     }
        
//     //     notesData.current.innerText=''
//     //     setnotesName("")
//     // }
    

// //    const uploadMessage =()=>{
    
// //     axios.post('/uploadTxt',
// //     {
// //         email:state.accDataVerify.email,
// //         heading:messageHeading,
// //         body:messageBody,
// //         folder:state.currentFolder
// //     })

// //     .then(res=>dispatch({type:"setonEffect",setonEffect:state.onEffect+1}))

// //     setmessageHeading('')
// //     setmessageBody('') 
// // }

 
// //------------------------------------------------------ Html Section --------------------------------------------------------------

 
//     return (
//          <>
//             <form encType="multipart/form-data" method="POST" id='ImageUpload_main_div' onSubmit={(e)=>imageUpload(e)} style={{backgroundColor:state.currentTab==='textDoc'?"#212529":"#121212"}}  >
               
//             {/* ------------------------------  Image Shwoing Frame Section ------------------------------- */}
//                 <div id='drag_and_drop_area' style={{borderBottom:state.currentTab==='textDoc'?"none":"1px solid powderblue",height:state.currentTab==='messages'?"100%":"87%",transition:'1s'}}>
//                     <img src={state.currentTab==='messages'?dotFrame2:dot} id="frame" style={{display:state.currentTab==='textDoc'?"none":"block",height:state.currentTab==='messages'?"88%":null}}/>
//                     <img src={textfileImg} id="text-file-img" style={{display:state.currentTab==='messages'?"block":"none"}} width="20%" height="20%"/>
//                     <img src={Arrows} id="arrows" style={{display:state.currentTab==='messages'?"block":"none"}} width="20%" height="20%"/>
//                     <img src={textImg} id="textImg" style={{display:state.currentTab==='messages'?"block":"none"}}/>
                  
                    
//                     <div id='Showing_upload_image_div'>
                        
//                         <div id='Showing_upload_image_div_heading' >
//                             <label id="Showing_upload_image_div_heading_text"  > 
//                             {/* {state.currentTab==='textDoc'?"Notes":"Image"} */}
//                             {/* {state.currentTab} */}
//                             Messages</label>
//                         </div>
                        
//                    {state.currentTab==="messages" || state.currentTab==="textDoc" ?null:
//                         <div id='Showing_upload_image_div_image_area' style={{display:state.currentTab==='textDoc'?"none":"block"}}>
//                              <img id="output" width="200" src={state.url}  />
//                         </div>
//                         }
//                     <div  style={{display:state.currentTab==="messages" ? 'block':"none"}}>
//                     <div id="currentFolder_heading">{state.currentFolder}</div>

//                     <div id="text-Messages-preview-container">
                    
//                         <div id="upload_btn" style={{position:"absolute"}}>
//                             <ImCross color="white"  size={24}  onClick={()=>dispatch({type:"setmessages",setmessages:null})}/>

//                         </div>
                        
//                         <textarea placeholder="Heading" value= {state.messages!==null ?state.messages.heading:messageHeading} id="text_heading" contentEditable={true} onChange={(e)=>setmessageHeading(e.target.value)}/>
                           
                 
                        
//                         <textarea placeholder={"Body"} value={state.messages!==null ?state.messages.body :messageBody} id="text_body" onChange={(e)=>setmessageBody(e.target.value)}/>
                              
//                         <div>
//                             <button className="btn btn-dark" id="message_submit_btn"  onClick={uploadMessage}>Submit</button>
//                         </div>
//                     </div>
//                     </div>
//                     </div>
//                 </div>
//             {/* ------------------------------  Image Upload Section ------------------------------- */}

//   {/* <div id="notes_mainDiv"  style={{display:state.currentTab==='textDoc'?"block":"none"}}>
//  <ImCross id='preview_frame_cross_icon' color="white" style={{position:'absolute',top:'1%',right:"1%"}} size={30} onClick={()=>{notesData.current.innerText='';setnotesName('');dispatch({type:"setnotes",notes:null})}}/>
// <div contentEditable={state.notes !==null ? state.editNotes :true} suppressContentEditableWarning={true} id="notes_textarea" ref={notesData}  >
// {state.notes !==null ? notesData.current.innerText=state.notes.body : null }
 

// </div >
 
//   </div>  */}


//             {/* ------------------------------  Image Upload Section ------------------------------- */}

//                 <div id="uploading-area" style={{position:"relative",display:state.currentTab==='textDoc'?"none":"block",height:state.currentTab==="messages"?"0%":"13%",transition:"1s"}}>
//                     <h3>Upload {state.currentTab==='textDoc'?"Notes":"Files"} :</h3>
//                     <div id='upload'>
//                         <input 
//                         type="file"
//                         name="files" 
//                         placeholder="Notes Name"
//                         id="upload_input2"
//                         value={''}
//                         onChange={loadFile}
//                         style={{left:"0%"}}   
//                         accept={state.currentTab=='imagefolder' ? 'image/*' :state.currentTab=='pdffolder' ? '.pdf' :state.currentTab=='wordfolder' ? '.doc,.docx':null }
//                         multiple/>
//                         <button style={{float:'right'}}   type="submit"  className="btn btn-dark">Upload</button>
//                     </div>
//                 </div>

//                 <div id='upload2' style={{display:state.currentTab==='textDoc'?"block":"none"}} >
//                         <input 
//                         type="text"
//                         placeholder="Notes Name"
//                         id="upload_input"
//                         value={state.notes!==null  ?  state.notes.heading:notesName }
//                         contentEditable={state.editNotes}
//                         onChange={(e)=>setnotesName(e.target.value)}   
//                        />
//                         <button style={{float:'right'}} onClick={uploadNotes} type="button" className="btn btn-dark">{state.editNotes ?"Save" :"Upload"}</button>
//                     </div>
          
//             </form>
            
//             <button className="btn btn-dark" id="preview_image_button" style={{display:state.currentTab==='textDoc' || state.currentTab==='messages'?"none":"block"}} onClick={()=>{return setpreview_frame(true)}}>Preview Image</button>
                            
//             {/* ------------------------------  Images Preview Frame Section ------------------------------- */}

//             <div id='Images_preview_frame' style={{display:preview_frame ? 'block':'none'}}>
               
//                 <span id='preview_frame_cross_icon'><ImCross size={30} onClick={()=>{return setpreview_frame(false)}}/></span>
//                 <div id='preview_frame_image_div'>
//                     <img id="images_of_preview_frame" width="200" src={state.url} style={{zIndex: 2}}/>
//                     <button onClick={()=>PrevImage(state.url)} disabled={disableprevbutton ? true:false} id='preview_frame_prev_button' type="button" className="btn btn-dark"><FcPrevious size={30}/></button>
//                     <button onClick={()=>NextImage(state.url)} disabled={disablenextbutton ? true:false} id='preview_frame_next_button' type="button" className="btn btn-dark"><FcNext size={30}/></button>
//                 </div>   
          
//             </div>           
//         </>
//     )
// }

// export default ImageUpload
