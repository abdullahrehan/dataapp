import React, { useState,useEffect,useContext} from 'react'
// import {TiFolderOpen} from 'react-icons/ti'
import { NavLink} from 'react-router-dom';
import {FaRegFilePdf} from 'react-icons/fa';  
// import {ImShrink2} from 'react-icons/im'; 
// import {FaExpandAlt} from 'react-icons/fa'; 
import {RiFileWord2Fill} from 'react-icons/ri'; 
import {FaRegFolderOpen} from 'react-icons/fa';
import {ImCross} from 'react-icons/im'; 
import { BsShieldLock } from 'react-icons/bs'; 
import { useImmer } from "use-immer";
// import FolderSystem from './folderSystem'
import Context from '../HooksFiles/Context'
import Notes from './Notes'
import TextMessages from './TextMessages'
import Images from './Images'
import axios from 'axios'
import '../../css/DefaultTab.css'

function DefaultTab() {

//----------------------------------------------------------------Assigning States-------------------------------------------------------------
    
    const {state,dispatch}=useContext(Context)
    const [userdata,setuserdata]=useImmer([])
    const [folderName,setfolderName]=useImmer([])
    const [filenametosend,setfilenametosend]=useImmer()
    const [tabs,settabs]=useImmer([])

    const [showFoldersDiv,setshowFoldersDiv]=useImmer(false)
    const [ViewAllImages,setViewAllImages]=useImmer(false)
    const [effect,seteffect]=useState(0)
    const foldersDiv=state.showFoldersDiv

    const [foldervalue,setfoldervalue]=useImmer()
    const currentTab=state.currentTab    
 
    
//------------------------------------------------------Files Section Api Calls-------------------------------------------------------

// -----------------Setting the Page data to the  State----------------//
const api=()=>{ 
     
    const findfolder=state.accDataVerify[state.currentTab].main;
    const foundfolder=findfolder.find(folder=>folder.name===state.currentFolder)
 
    // currentTab!=="messages" ? setuserdata(foundfolder.value) :setuserdata(null) 
         setuserdata(foundfolder.value)  
        
    
}
const recentFolder=state.accDataVerify.recentFolders
const recentFolderValue=recentFolder.find(data=>data.name===state.currentTab).value
// -----------------Storing Folder Name into the State -----------------//

    const fetchfolderName=()=>{ 
        const folders=state.accDataVerify[state.currentTab].main
         setfolderName(folders)
    }
  
// -----------------Setting Current Folder -----------------//


    const currentfolder=(folder)=>{
        dispatch({type:"setcurrentFolder",currentFolderValue:'MainFolder'})
        dispatch({type:"setcurrentTab",setcurrentTab:folder})
    }

// -----------------displaying SendToDiv -----------------//
 
    const displaySendToDiv=(index)=>{
        document.getElementsByClassName(`sendToDiv${index}`)[0].style.display='block'
    }
    const Back_Icon_SendToDiv=(index)=>{
        document.getElementsByClassName(`sendToDiv${index}`)[0].style.display='none'
    }

// --------------- Open The Folders Div Function ---------------//

    const folders=()=>{setshowFoldersDiv(!showFoldersDiv)}

  
       
// // --------------- Setting Recent Tabs Data ---------------//

//     const recentFoldersData=()=>{
//         axios.post("http://localhost:2000/recentFoldersData",
//         {email:state.accDataVerify.email,
//         currentTab:state.currentTab})
//        .then(res=>{settabs(res.data)}) 

//     }

// // --------------- Deleting Recent Tabs  ---------------//

//     const deletRecentFolders=(folder_Name)=>{

//         axios.post("http://localhost:2000/deletRecentFolders",
//         {email:state.accDataVerify.email,
//         folderName:folder_Name,
//         currentTab:state.currentTab
//         })
//         // .then(res=>{dispatch({type:"setAccountData",accData:res.data})})
//     }

 
// //---------------------------------------------------------------UseEffects Section-------------------------------------------------------------
// const settab=async(data)=>{
//     dispatch({type:"setcurrentFolder",currentFolderValue:data})   
// }

//       useEffect(() => {
//         api() 
//         fetchfolderName() 
//    },[effect] ) 
     
//  useEffect(() => {
    
//    recentFoldersData()

// },[])
 
//----------------------------------------------------------Html Section of Page-------------------------------------------------------------------
 
 

console.log('ImagesDataApi');

return (
<>
    <div id='Default_Tab_Main_div' style={{overflow:foldersDiv?'hidden':"auto",height:state.currentTab==="messages" ?"81%":"92%"}}>
        
        {/*-------------------- div to blur the background ---------------*/}   


        {/* <div id="tabs_mainDiv">
        
    
    {tabs.length ? tabs.map(data=>
        <button id="tabs" 

        className="btn btn-dark" 
        onClick={()=>settab(data.name)}
        style={{
            backgroundColor:state.currentFolder===data.name?'#0000':null,
            border:state.currentFolder===data.name?'1px solid white':null,
            borderBottom:state.currentFolder===data.name?'none':"1px solid white",
            borderlefth:state.currentFolder===data.name?'none':null,
            borderBottomLeftRadius:state.currentFolder===data.name?'0px':null,
            borderBottomRightRadius:state.currentFolder===data.name?'0px':null,
            borderTopLeftRadius:state.currentFolder===data.name?'5px':null,
            borderTopRightRadius:state.currentFolder===data.name?'5px':null,
            
                }}
            
            >
      
     {tabs.secure ?
        <BsShieldLock size={20} id='secure_folder_tabs' color="red"/> :null}
   <FaRegFolderOpen color="white" size={22}/>  {data.name.split(' ')[0].length>8? data.name.split(' ')[0].slice(0,7) :data.name.split(' ')[0]}{data.name.split(' ')[0]!==null?'..':null}  <ImCross onClick={()=>deletRecentFolders(data.name)} style={{position:'absolute',top:"36%",right:"4.5%",zIndex:1}} color="white" size={11}/>
   </button>
        
        
        ):null}

        {recentFolderValue.length!==0?
        <button id="tabs" 
        className="btn btn-dark" 
        onClick={()=>settab("MainFolder")}
        style={{
            border:state.currentFolder==="MainFolder"?'1px solid white':null,
            borderlefth:state.currentFolder==="MainFolder"?'none':null,
            borderBottom:state.currentFolder==="MainFolder"?'none':"1px solid white",
            borderTopLeftRadius:state.currentFolder==="MainFolder"?'5px':null,
            borderTopRightRadius:state.currentFolder==="MainFolder"?'5px':null,
            backgroundColor:state.currentFolder==="MainFolder"? "#0000" :null,
            }}>

            <FaRegFolderOpen color="white" size={22}/> Main
        </button>   
 :null}
    </div> */}
{/* ------------------------------Calling The Folders Component-------------------------- */}
     
    {/* {foldersDiv?
        <FolderSystem 
        foldersDiv={foldersDiv}
        setfoldersDiv={value=>setshowFoldersDiv(value)}
        filetosend={filenametosend}
        />  
        :null} */}

{/* ------------------------------Word and Pdf tab icons Main div------------------------ */}
      
      {state.currentTab==='wordfolder'||state.currentTab==='pdffolder' ?
        <div style={{display:state.currentTab==='wordfolder' || state.currentTab==='pdffolder' ?'block':'none'}}>
           
            {/* ----------------- Word and Pdf tab icons div----------------- */}
           {console.log("Word and Pdf tab icons div")}
            <div id='Word_pdf_icons_div'>
                <NavLink id='Word_icon' to='/word'><RiFileWord2Fill size={44} onClick={()=>currentfolder('wordfolder')}/></NavLink>
                <NavLink id='Pdf_icon'  to='/pdf'><FaRegFilePdf size={44} onClick={()=>currentfolder('pdffolder')} id='pdf_icon'/></NavLink>
                <div id='word_pdf_line'></div>
            </div>

            {/* ---------------boder bottom and blur div of tabs--------------- */}
           
            <div id={currentTab=='wordfolder'?'word_icon_border_bottom':currentTab=='pdffolder'?'pdf_icon_border_bottom':null}  style={{display :showFoldersDiv ? 'none' : 'block'}}></div> 
            <div id='pdf_word_blur_cover' style={{display :foldersDiv ? 'block' : 'none',transition:'2s'}}></div>

           
        </div>
:null}


{/* -----------------------------------Folder Open Icon----------------------------------- */}


        {/* <div><TiFolderOpen size={45} id='open_folder_icon' onClick={folders}/></div> */}
        
    
        <>
        {/* <div id="no_of_files">{userdata.length-1} Files</div>  
        <div id="view_all_button">
        <button className="btn btn-dark" onClick={()=>{setViewAllImages(!ViewAllImages)}}>
            {ViewAllImages?
            <FaExpandAlt size={25} color={'white'}/>:
            <ImShrink2 size={25} color={'white'}/>
            }
        </button>
        </div> */}
        </>
        
{/* --------------------------------Mapping The User Files--------------------------------- */}


    { currentTab==="imagefolder" || currentTab==="wordfolder" || currentTab==="pdffolder" ? 

    <Images/>

    :null}

{/* --------------------------------------------------- TextFolder Started ------------------------------------------------------- */}


    {currentTab==="messages" ?

    <TextMessages 
    foldersDiv={foldersDiv}
    setshowFoldersDiv={(value)=>{setshowFoldersDiv(value)}}
    />
            
    :null}

    {currentTab==="textDoc" ?
    
    <Notes 
    notesData={userdata} 
    folderName={folderName}
    ViewAllDoc={ViewAllImages}
    displaySendToDiv={(value)=>displaySendToDiv(value)}
    Back_Icon_SendToDiv={(value)=>Back_Icon_SendToDiv(value)}
    showFoldersDiv={showFoldersDiv}
    />
    
    :null}
    
    </div>
</>
 )}


export default DefaultTab
 