import React, { useState,useContext,useRef,useCallback,memo } from 'react'
import {IoIosArrowBack} from 'react-icons/io'; 
import {IoIosArrowForward} from 'react-icons/io'; 
import {HiFolderAdd} from 'react-icons/hi'
import {MdDeleteSweep} from 'react-icons/md'; 
import { BsShieldLock } from 'react-icons/bs'; 
import Folder from '../../images/folder.png'
import Securepopups from './Securepopup'
import Context from '../HooksFiles/Context'
import axios from 'axios' 
import '../../css/folderSystem.css'

function FolderSystem({EffectOn,setEffectOn,setImagesDataApi,mappingData,tabs}) {

//----------------------------------------------------------------Assigning States-------------------------------------------------------------

    const {state,dispatch}=useContext(Context) 
    const [writefoldername,setwritefoldername]=useState(false)
    const [deleteSecureFolderPassword,setdeleteSecureFolderPassword]=useState(false)
    const [currentFolder,setcurrentFolder]=useState('MainFolder')
    const [increaseFolderDiv,setincreaseFolderDiv]=useState(0)
    const [decreaseFolderDiv,setdecreaseFolderDiv]=useState(0)
    const [dragedFoldertoDelete,setdragedFoldertoDelete]=useState()
    const [enterFolderPassword,setenterFolderPassword]=useState(false)
    const foldersDiv=state.showFoldersDiv

//------------------------------------------------------------Assigning Refs()--------------------------------------------------------------

    const folderDiv=useRef()
    const folders_main_div=useRef()
    const arrow_to_increase_folder_div_area=useRef()
    const arrow_to_decrease_folder_div_area=useRef()
    const create_new_folder=useRef()
    const folder_text=useRef()
    const folder_delete_icon=useRef()
    const deleteFolderText=useRef()
    const folderImg=useRef()

 
//------------------------------------------------------Communicating through Api Calls-------------------------------------------------------


// -----------------Requesting to Delete Folder----------------//

    const Drop_FolderDelete_icon=useCallback(()=>{
        
        const deleteFromRecentFolder=tabs.findIndex(data=>data.name===dragedFoldertoDelete.name)
        const index=tabs.findIndex(data=>data.name===dragedFoldertoDelete.name)
        const folder=tabs[index+1] 

        if(dragedFoldertoDelete.secure){
        
            setdeleteSecureFolderPassword(true)

        }
        
        else{
        
            axios.post("/deleteFolder",
            {email:state.accDataVerify.email,
            folderName:dragedFoldertoDelete.name,
            currentFolder:state.currentFolder,
            currentTab:state.currentTab})

            dispatch({type:"setonEffect",setonEffect:state.onEffect+1})

            if(deleteFromRecentFolder!==-1){

                axios.post("/deletRecentFolders",
                {email:state.accDataVerify.email,
                folderName:dragedFoldertoDelete.name,
                currentTab:state.currentTab
                })

            
                if(index+1!==tabs.length){dispatch({type:"setcurrentFolder",currentFolderValue:folder.name})}
                else if (index+1===tabs.length){dispatch({type:"setcurrentFolder",currentFolderValue:"MainFolder"})} 
        
            }
        
        }
        folder_delete_icon.current.style.color="red";

    },[dragedFoldertoDelete])


  
//------------------------------------------------------Frontend Fuctions of Page--------------------------------------------------------------

    
// ---------------------------Fuction call when User want to Expand the Folder Div---------------------------
    
    const expandDiv=useCallback(()=>{
    
    folderDiv.current.style.width="49.7%";
    folders_main_div.current.style.display="flex";
    folders_main_div.current.style.flexFlow="wrap";
    arrow_to_increase_folder_div_area.current.style.display='none';
    arrow_to_decrease_folder_div_area.current.style.display='block';
    create_new_folder.current.style.top="-3.8%";
    create_new_folder.current.style.paddingRight="83%";
    folder_text.current.style.display="block";
    folder_text.current.style.position="absolute";
    folder_text.current.style.top="25%";
    folder_text.current.style.right="38%";
    folder_text.current.style.fontSize="2.5vw";
    folderDiv.current.style.zIndex=2;
    folder_delete_icon.current.style.display="block";
    deleteFolderText.current.style.display="block";
    
    },[state.showHalfFoldersDiv])

    const increaseButton=()=>{
        dispatch({type:"setshowHalfFoldersDiv",setshowHalfFoldersDiv:!state.showFoldersDiv})
        setincreaseFolderDiv(increaseFolderDiv+1)
        expandDiv()
    
    }


// ---------------------------Fuction call when User want to Close the Folder Div---------------------------
    
    const shrinkDiv=useCallback(()=>{
    
    folderDiv.current.style.width="9.2%";
    folder_text.current.style.display="none";
    deleteFolderText.current.style.display="none";
    folder_delete_icon.current.style.display="none";
    arrow_to_decrease_folder_div_area.current.style.display='none';

    setTimeout(() => {
    
    arrow_to_increase_folder_div_area.current.style.display='block';
    
    }, 450);
 
    setTimeout(() => {
    
    folders_main_div.current.style.display="block";      
    create_new_folder.current.style.top="-1.9%";
    create_new_folder.current.style.paddingRight="0%";
    folder_text.current.style.right="0%";

    }, 600);
    
    },[decreaseFolderDiv])
    
    
    const decreaseButton=()=>{ 

        setdecreaseFolderDiv(decreaseFolderDiv+1)
        shrinkDiv()
    
    }

 
// ------------------------------------ Open Folder Function ---------------------------------
const enterToNewFolder=(folder_datass)=>{setcurrentFolder(folder_datass.name);dispatch({type:"setcurrentFolder",currentFolderValue:folder_datass.name});dispatch({type:"setonEffect",setonEffect:state.onEffect+1})}

    const folderOpen=(folder_datass)=>{ 

        enterToNewFolder(folder_datass);
     
        dispatch({type:"setshowFoldersDiv",setshowFoldersDiv:false})

    }
    
    const enterFolderPasword=(folder_datass)=>{ setenterFolderPassword(true);setcurrentFolder(folder_datass.name);}

    const enterFolder=(folder_datass)=>{
    
        axios.post("/recentFolders",
        {email:state.accDataVerify.email,
        folderName:folder_datass.name,
        currentTab:state.currentTab,
        secure:folder_datass.secure
        })
        .then(res=>{setEffectOn(EffectOn+1)}) 

        setImagesDataApi([])
        dispatch({type:"setcurrentFolder",currentFolderValue:folder_datass.name})
        dispatch({type:"setonEffect",setonEffect:state.onEffect+1})
    }

    const openfolder=(folder_datass)=>{
   
        if(folder_datass.secure===false){
           
            enterFolder(folder_datass)
            shrinkDiv()
            dispatch({type:"setloading",setloading:true})
         
        }
    
        else if(state.currentFolder!==folder_datass.name){
        
        folder_datass.secure===true?
        enterFolderPasword(folder_datass):
        folderOpen(folder_datass)
        
        }
    }
        
   
 

// ------------------------------------ Others Function ------------------------------------

    const setenterFolderPasswordsValue=(value)=>{setenterFolderPassword(value)}    
    const DragOver_FolderDelete_icon=()=>{folder_delete_icon.current.style.color="white";}
    const writeFolderName=()=>{setwritefoldername(true)} 
    const setfoldernamepopup=(value)=>{setwritefoldername(value)}
  


//---------------------------------------------------------------UseEffects Section-------------------------------------------------------------


//----------------------------------------------------------Html Section of Page-------------------------------------------------------------------
     
    return (
        <>
       
        <div id="folder_System_Main_Div" style={{zIndex:foldersDiv ? 2:0}} >
           
       
            {/* ---------------arrow to increase folder div Icon---------------  */}
           
            <div id='arrow_to_increase_folder_div' style={{display:foldersDiv?'block':'none'}} ref={arrow_to_increase_folder_div_area} onClick={increaseButton}>
                <IoIosArrowBack size={40}/>
            </div>
            
            {/* --------------------- Folders Main Div -------------------------  */}

            <div id='Folders_Name_Main_Div' style={{width:foldersDiv ? "9.2%" : "0%",height:"78.5%"}} ref={folderDiv}>


            {/* ---------------arrow to decrease folder div Icon---------------  */}

                <div id='arrow_to_decrease_folder_div_area' ref={arrow_to_decrease_folder_div_area} onClick={ decreaseButton }>
                    <IoIosArrowForward size={40}/>
                </div>
                
            {/* -------------------- Create New Folder Icon --------------------  */}

                <div id='create_new_folder' ref={create_new_folder}  >
                
                    <HiFolderAdd id="create_folder_icon" onClick={writeFolderName}/>
                    <span id="folder_names_heading_text" ref={folder_text}>Folders</span>
                    <span id="folders_Delete_Icon" onDragOver={(e)=>{e.preventDefault()}} onDrop={Drop_FolderDelete_icon} ref={folder_delete_icon}>
                    <MdDeleteSweep onDragOver={DragOver_FolderDelete_icon}  /></span>
                    
                </div>

            {/* ------------------ Folders Name Mapping Div -----------------  */}

                <div id='folders_main_div' ref={folders_main_div} >

                    {mappingData!==undefined ? mappingData.map((folder_datass,index)=> 

            //  --------------------- Folders Name Images ---------------------  

                        <figure key={index} id='folder_image_figure' style={{backgroundColor:state.currentFolder===folder_datass.name?'#212529':null,marginLeft:"2.5%"}}  onClick={()=>openfolder(folder_datass)}  >

            {/* --------------------- Folders Images Section ----------------   */}

                            <div>
                          
                                <div id="folder_image_div"  ref={folderImg} onDragStart={()=>{setdragedFoldertoDelete(folder_datass)}}>
                                    <img key={index+1} src={Folder} id='folders_icon_images' alt={'error'}/>
                                    <BsShieldLock id="folders_secure_icon" size={30} style={{display:folder_datass.secure===true ? 'block' : 'none'}}/>  
                                </div>

                                
                            </div>

            {/* --------------------------- Folders Images Caption -------------------------   */}

                            <figcaption key={index+2} id="folders_icon_images_name">
                                {folder_datass.name}
                            </figcaption>
                        
                        </figure>  
                    ):null}  

                
            {/* -------------------------- Delete Folder Instructions -----------------------   */}  
                
                    <span id="delete_Folder_Instructions" ref={deleteFolderText}>
                        To delete a Folder Drag and Drop it To the Bin.
                    </span>
                
                </div>
               

            </div> 
         
        </div>


        {/* --------------------- Popup for New Folder and Passing Values ------------------   */}  

        {enterFolderPassword || writefoldername?
        
            <Securepopups 
            enterFolderPasswords={enterFolderPassword}
            setenterFolderPasswordsValue={setenterFolderPasswordsValue} 
            foldernamepopup={writefoldername}
            setfoldernamepopup={setfoldernamepopup}
            currentFolder={currentFolder}
            iconDisplay={true}
            EffectOn={EffectOn} 
            setEffectOn={(value)=>setEffectOn(value)}
            shrinkDiv={shrinkDiv}
            setdecreaseFolderDiv={()=>decreaseFolderDiv(decreaseFolderDiv+1)}
        />
        
        :null}

        {/* --------------------- Popup for New Folder and Passing Values ------------------   */}  
        
        {deleteSecureFolderPassword?
            
            <Securepopups 
            deleteSecureFolderPassword={deleteSecureFolderPassword}
            crossFunctiondeleteFolder={value=>setdeleteSecureFolderPassword(value)}
            dragedFoldertoDelete={dragedFoldertoDelete}
            EffectOn={EffectOn} 
            setEffectOn={(value)=>setEffectOn(value)}
            />

        :null}

</>
)}

export default memo(FolderSystem)


