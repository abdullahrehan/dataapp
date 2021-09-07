import React,{useState} from 'react'
import {AiOutlineArrowLeft} from 'react-icons/ai'; 
import {FaRegFolderOpen} from 'react-icons/fa';
import  '../../css/SendToFoldersMain.css'
import { BsShieldLock } from 'react-icons/bs'; 
import Folder from '../../images/folder.png'


function SendToFoldersMain({showSendToFolderMain,setshowSendToFolderMain,mappingData,sendMultipleFiles,}) {

        const [selectedFolder,setselectedFolder]=useState("select a Folder")


    const selectFolder=(folder_datass,index)=>{
    
        setselectedFolder(folder_datass.name)
        mappingData.map((data,indexs)=>{
            document.getElementsByClassName(`folder_image_figure${indexs}`)[0].style.backgroundColor="#0000"
            document.getElementsByClassName(`folder_image_figure${indexs}`)[0].style.color="white"

        })
        document.getElementsByClassName(`folder_image_figure${index}`)[0].style.backgroundColor="#212529"


    }

    return (
        <div id="SendToFoldersMain" style={{width:showSendToFolderMain?"100%":"0%"}}>
            <div  style={{display:showSendToFolderMain?'block':'none'}}>

            
            <div 
            onClick={()=>setshowSendToFolderMain(!showSendToFolderMain)}
            id="SendToFoldersMain_backArrow">
            
                <AiOutlineArrowLeft size={34} color="white"/>
                </div>
                <div id="SendToFoldersMain_Header">
                    Select the Folder To Send Files
                </div>

                               
                <div id="selectedFolder_Name">{selectedFolder}</div>
                <div id="SendToFoldersMain_mappingFolders">
                {mappingData!==undefined ?mappingData.map((folder_datass,index)=>
                     <figure key={index} id='folder_image_figure' className={`folder_image_figure${index}`}  style={{height:"27%"}} onClick={()=>selectFolder(folder_datass,index)}>

                     {/* --------------------- Folders Images Section ----------------   */}
         
                                     <div>
                                   
                                         <div id="folder_image_div"  >
                                             <FaRegFolderOpen key={index+1} id='folders_icon_images' size={70}/>
                                             <BsShieldLock id="folders_secure_icon" size={30} style={{display:folder_datass.secure===true ? 'block' : 'none',marginTop:'-16%',left:"68%"}}/>  
                                         </div>
         
                                         
                                     </div>
         
                     {/* --------------------------- Folders Images Caption -------------------------   */}
         
                                     <figcaption key={index+2} id="folders_icon_images_name" style={{display:'flex',justifyContent:'center'}}>
                                         {folder_datass.name}
                                     </figcaption>
                                 
                                 </figure>  
                ):null}
               
            </div>
            <div id="sendFiles_buttonDiv">
                <button className="btn btn-dark" style={{width:'100%',height:"100%"}} onClick={()=>sendMultipleFiles(selectedFolder)}> Send </button>
         </div>
            </div>
          
        </div>
    )
}

export default SendToFoldersMain
