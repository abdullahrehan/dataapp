import React, { useState,useEffect,useContext,memo,useCallback } from 'react'
import {TiFolderOpen} from 'react-icons/ti'
import Context from '../HooksFiles/Context'
import axios from 'axios' 
import {MdSelectAll} from 'react-icons/md'; 
import {BiSend} from 'react-icons/bi'; 
import {AiTwotoneDelete} from 'react-icons/ai'
import { useImmer } from "use-immer";
import NotesData from './NotesData'
import FolderSystem from './folderSystem'
import Securepopup from './Securepopup'
import TabsHeading from './TabsHeading'
import ViewAllFiles from './ViewAllFiles'
import NotesUploads from '../UploadingFiles/NotesUploads'
import AsideData  from '../AsideDataFiles/AsideData'
import LoadingDiv from '../AsideDataFiles/LoadingDiv'
import SendToFoldersMain from '../AsideDataFiles/SendToFoldersMain'
import Tabs from './Tabs'
import '../../css/DefaultTab.css'
import '../../css/Images.css'
import '../../css/Notes.css'

function Notes() {

    const {state,dispatch}=useContext(Context)
    const ViewAllImages=state.viewAllImages
    const [viewAllDB,setviewAllDB]=useImmer()
    const [folderName,setfolderName]=useImmer()
    const [ImagesDataApi,setImagesDataApi]=useImmer()
    const [EffectOn,setEffectOn]=useImmer(0)
    const [tabs,settabs]=useImmer([]) 
    const [editIconColor,seteditIconColor]=useImmer(0) 
    const array=[]
    const [DeleteFilesConfirmation,setDeleteFilesConfirmation]=useState(false)
    const [SendToButton,setSendToButton]=useImmer(false)
    const [showSendToFolderMain,setshowSendToFolderMain]=useImmer(false)
    const previewNotes=state.notes!==null?true:false
    const [progress,setprogress]=useState(0)
    const [showprogress,setshowprogress]=useState(false)
    const [onLoad_message,setonLoad_message]=useState('')

    
    const foldersDiv=state.showFoldersDiv
    const LoadingNotes=state.loading
    // -----------------Fetching Image Files -----------------//
   
    const FilesData=()=>{
        
        axios.post('/notes',
        {email:state.accDataVerify.email,
        folder:state.currentFolder})
        .then(res=>setImagesDataApi(res.data.value))
        .then(res3=>dispatch({type:"setloading",setloading:false}))
        
    }
console.log(ImagesDataApi)

    const ViewAllMode=(value)=>{ 
    
        axios.post(`/ViewAllMode`,{email:state.accDataVerify.email,data:value}, { withCredentials: true })
        .then(res=>{dispatch({type:"setviewAllImages",setviewAllImages:res.data})})   
        
      
    
    }
    
    const ViewAllMode2=(value)=>{ 
        
        axios.post(`/ViewAllMode`,{email:state.accDataVerify.email,data:value}, { withCredentials: true })
        .then(res=>{setviewAllDB(res.data)})   
        
      
    
    }
    const setViewAllMode=(value)=>{ 
        
        axios.post(`/setViewAllMode`,{email:state.accDataVerify.email,data:value}, { withCredentials: true })   
    
      
    
    }
    useEffect(() => {
        ViewAllMode()
        
    }, [])
    
    useEffect(() => {
        ViewAllMode2()
        
    }, [state.url])
    // -----------------Requesting to Delete Files -----------------//

    
      const deleteNotes=(header,body)=>{
    
        axios.post(`/delete/notes`,
        {email:state.accDataVerify.email,
        header:header,
        data:body,
        folder:state.currentFolder})
        .then(res=>dispatch({type:"setonEffect",setonEffect:state.onEffect+1}))
    }
  
    // -----------------Sending File to another Folder -----------------//

   
    const sendFileFunction=(folderName,header,body,index)=>{
     

        axios.post("/sendtofoldersNotes",
        {email:state.accDataVerify.email,
        folder:folderName.name,
        header:header,
        body:body,
        currentFolder:state.currentFolder,
        currentTab:state.currentTab,
        sendtofile:true})
 

        .then(res=>
        
            axios.post(`/delete/notes`,
            {email:state.accDataVerify.email,
            header:header,
            data:body,
            folder:state.currentFolder})
        
        .then(res=>dispatch({type:"setonEffect",setonEffect:state.onEffect+1})))

    }

    // --------------- Save the updated Notes ---------------//


    const showAdvanceFeatures=()=>{
        // const elementDiv=document.getElementsByClassName(`checkbox${index}`)[0]
        if(ImagesDataApi!==undefined ){ 
            ImagesDataApi.map((data,index)=>{
                if(index!==0){
                    if(document.getElementsByClassName(`checkbox${index}`)[0]!==undefined && document.getElementsByClassName(`checkbox${index}`)[0].checked){
                        array.push(data)
                    }
                }
            }
        )
        }
    }
  
    const foldersData=()=>{
     
        axios.post('/folders',
        {email:state.accDataVerify.email,
        tab:state.currentTab,
        })

        .then(res=>setfolderName(res.data))

    }

    const recentFoldersData=()=>{
        axios.post("/recentFoldersData",
        {email:state.accDataVerify.email,
        currentTab:state.currentTab})
       .then(res=>{settabs(res.data)}) 
       

    }
 
    const displaySendToDiv=(index)=>{
        document.getElementsByClassName(`sendToDiv${index}`)[0].style.display='block'
    }
    
  
    
    const openFolder=()=>{
        dispatch({type:"setshowFoldersDiv",setshowFoldersDiv:!state.showFoldersDiv})
    }
    

    
    useEffect(() => {

       
        foldersData()
        recentFoldersData()
        FilesData()
   
    },[EffectOn,state.onEffect])
   
    const a=()=>{
        if(state.notes!==null){
            dispatch({type:"setviewAllImages",setviewAllImages:true})
    
        }
        else if(state.notes===null ){
            // alert('enter')
            if(viewAllDB===true){
                dispatch({type:"setviewAllImages",setviewAllImages:true})
    
            }
            else{
            dispatch({type:"setviewAllImages",setviewAllImages:false})
           }
        }
    
    
    }
    const ExpandMultipleFiles=(value)=>{

        // for(let i=1; i<ImagesDataApi.length; i++){
            const filtered=ImagesDataApi.filter((data,index)=>
               index!==0? document.getElementsByClassName(`checkbox${index}`)[0].checked===true :null
                // element===/
            )

            console.log(filtered.length)
        
            if(filtered.length!==0){
                setshowSendToFolderMain(true)
                setSendToButton(value)
            }
            else{
                alert('you have not selected any Item')
            }

        // }
     
    }

    const displayDeleteFileDiv=()=>{

        const filtered=ImagesDataApi.filter((data,index)=>
        index!==0? document.getElementsByClassName(`checkbox${index}`)[0].checked===true :null
         // element===/
     )

     console.log(filtered.length)
 
     if(filtered.length!==0){
        setDeleteFilesConfirmation(true)
     }
     else{
         alert('you have not selected any Item')
     }

    }


    const selectMultipleimages=()=>{
        dispatch({type:"setselectMultipleimages",setselectMultipleimages:!state.selectMultipleimages})
        // ImagesDataApi.map((data,index)=>{
        //     if(index!==0){
        //     document.getElementsByClassName(`checkbox${index}`)[0].checked=false
        //     }
        // })

    }

    const selectAllFunc=()=>{

        console.log('hell')

        // ImagesDataApi.map((data,index)=>{
            for(let i=1; i<ImagesDataApi.length; i++){
        const element=document.getElementsByClassName(`checkbox${i}`)[0]
        console.log(element.checked)
        const selectAllButton=document.getElementById('checkbox_Icon_Main').checked
        element.checked=selectAllButton
        document.getElementsByClassName(`select_div_text${i}`)[0].innerText=selectAllButton ?"Selected" :'Select Image'
    }
// })
    }

    const sendMultipleFiles=(selectedFolder)=>{
         
        const array2=[]
        setonLoad_message('Files Sended')

        setshowprogress(true)
        ImagesDataApi.map((data,index)=>{
              if(index!==0){
                  if(document.getElementsByClassName(`checkbox${index}`)[0]!==undefined && document.getElementsByClassName(`checkbox${index}`)[0].checked){
                      array2.push(data)
                  }
              }
        })
        const options={
            onUploadProgress:(progressEvent) =>{
                const {loaded,total}=progressEvent;
                let percent=Math.floor((loaded * 100) /total)
                setprogress(percent)
                console.log(`${loaded}kb of ${total}kb ${percent}%`)
                if(percent===100){ 
                    setTimeout(() => {
                        setshowprogress(false)  
                        
                    }, 1000);}

            }
        }

     console.log(state.currentTab,state.currentFolder,array2,selectedFolder,'/sendMultipleFiles')
        axios.post("/sendMultipleFiles/notes",
        {email:state.accDataVerify.email,
        folder:selectedFolder,
        file:array2,
        currentFolder:state.currentFolder,
        currentTab:state.currentTab,
        sendtofile:true},options)
        .then(res=>dispatch({type:"setonEffect",setonEffect:state.onEffect+1}))
        
    //    console.log(array)
    setshowSendToFolderMain(false)
    dispatch({type:"setselectMultipleimages",setselectMultipleimages:false})
    
    }
    

    useEffect(() => {
        a()    
        }, [state.notes])
      console.log(ImagesDataApi)
 
return (
    <div id='Default_Tab_Main_div' style={{overflow:'hidden',height:"100%"}}>

    <div id="NotesUploads" style={{flex:previewNotes? 3 :1}}>
        <NotesUploads 
        seteditIconColor={()=>seteditIconColor(editIconColor+1)}
        deleteFile={(header,body)=>deleteNotes(header,body)}
        NotesDataApi={ImagesDataApi}

/>
    </div>
    
    <div id="blur_div" style={{display:foldersDiv?'block':"none"}} onClick={openFolder}></div>
{/* ---------------------------------Folder Name heading--------------------------------- */}
        
        <div id="NotesData" style={{position:"relative"}}>

    
        <div id="navigate_tabs">
        <AsideData/>
        </div>



        <Tabs  
        tabs={tabs}
        folderName={folderName}
        setImagesDataApi={(value)=>setImagesDataApi(value)}
        EffectOn={EffectOn}
        setEffectOn={(value)=>setEffectOn(value)}
        />
        
        <TabsHeading ImagesDataApi={ImagesDataApi!==undefined ? ImagesDataApi:undefined }/>

{previewNotes?null:
     <>   <TiFolderOpen size={45} id='open_folder_icon' style={{top:"14%"}} onClick={openFolder}/>


    <div id="sideIcons_MainDiv" >
        <div id="selectAll_button_mainDiv" style={{borderLeft:state.selectMultipleimages?null:'none',borderBottom:state.selectMultipleimages?null:'none'}}>
        <MdSelectAll size={35} id="mutiSelect_selectAll_button" 
         onClick={selectMultipleimages}
         />
        </div>
            
        <div id="sideIcons_IconsDiv" style={{opacity:state.selectMultipleimages?100:0}}>
        <button id="mutiSelect_send_button" 
        onClick={()=>ExpandMultipleFiles('send')}
        ><BiSend size={35}/></button>
        <AiTwotoneDelete id="mutiSelect_delete_button" size={35} 
        onClick={displayDeleteFileDiv}
        />
        <input type="checkbox"  size={37} id='checkbox_Icon_Main' 
        onClick={()=>{selectAllFunc();}} style={{left:"5%",top:"0%"}}
        />
        </div>
    </div>


        <FolderSystem 
        EffectOn={EffectOn}
        setEffectOn={(value)=>setEffectOn(value)}
        setImagesDataApi={(value)=>setImagesDataApi(value)}
        foldersDiv={foldersDiv}
        mappingData={folderName}
        tabs={tabs}
        />  
        
        <SendToFoldersMain 
        // width={showSendToFolderMain?"100%":"0%"}
        showSendToFolderMain={showSendToFolderMain}
        setshowSendToFolderMain={setshowSendToFolderMain}
        mappingData={folderName}
        sendMultipleFiles={(value)=>sendMultipleFiles(value)}
        SendToButton={SendToButton}
        />
        <Securepopup/>
   </> }
   <div id="messages-data"  >
 
         {previewNotes?<div style={{flex:1}}/>:
     <ViewAllFiles setViewAllMode={(value)=>setViewAllMode(value)}/>
        }
        <NotesData
         showAdvanceFeatures={showAdvanceFeatures}
        ViewAllDoc={ViewAllImages}
        notesData={ImagesDataApi} 
        displaySendToDiv={value=>displaySendToDiv(value)}
        folderName={folderName}
        deleteFile={(header,body)=>deleteNotes(header,body)}
        editIconColor={editIconColor}
        sendFileFunction={(folderName,header,body,index)=>sendFileFunction(folderName,header,body,index)}
        />

        <div id='loader' style={{display:LoadingNotes?'block':'none'}}>

            <LoadingDiv/>

        </div>

    </div>
 
 </div>
        
        </div>  

)}

export default memo(Notes)
