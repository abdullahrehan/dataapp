import React, { useState,useEffect,useContext,memo,useCallback } from 'react'
import {TiFolderOpen} from 'react-icons/ti'
import {AiTwotoneDelete} from 'react-icons/ai'
import {MdSelectAll} from 'react-icons/md'; 
import {BiSend} from 'react-icons/bi'; 
import Context from '../HooksFiles/Context'
import axios from 'axios' 
import { useImmer } from "use-immer";
import FilesCard from './FilesCard'
import FolderSystem from './folderSystem'
import Securepopup from './Securepopup'
import TabsHeading from './TabsHeading'
import ViewAllFiles from './ViewAllFiles'
import ImagesUploads from '../UploadingFiles/ImagesUploads'
import SendToFoldersMain from '../AsideDataFiles/SendToFoldersMain'
import LoadingDiv from '../AsideDataFiles/LoadingDiv'
import AsideData  from '../AsideDataFiles/AsideData'
import { Line } from 'rc-progress';
import Tabs from './Tabs'
import loder from '../../images/1494.gif'
import {IoMdSettings} from 'react-icons/io'; 
import '../../css/DefaultTab.css'
import '../../css/Images.css'

function Images() {

    const {state,dispatch}=useContext(Context)
    const ViewAllImages=state.viewAllImages
    const [viewAllDB,setviewAllDB]=useImmer()

    const [folderName,setfolderName]=useImmer()
    const [ImagesDataApi,setImagesDataApi]=useImmer([])
    const [EditedNamedImage,setEditedNamedImage]=useImmer()
    const [showNewImageNameDiv,setshowNewImageNameDiv]=useImmer(false)
  
    const [EffectOn,setEffectOn]=useImmer(0)
    const [progress,setprogress]=useState(0)
    const [showprogress,setshowprogress]=useState(false)
    const [onLoad_message,setonLoad_message]=useState('')
    const [tabs,settabs]=useImmer([]) 
    const [DeleteFilesConfirmation,setDeleteFilesConfirmation]=useState(false)
    const [SendToButton,setSendToButton]=useImmer(false)
    const [mutipleFilesUploadLoading,setmutipleFilesUploadLoading]=useImmer(false)
    const [showSendToFolderMain,setshowSendToFolderMain]=useImmer(false)
    const LoadingImages=state.loading

    const previewImage=state.url!==null?true:false
    const foldersDiv=state.showFoldersDiv
    const array=[]

    const options={
        onUploadProgress:(progressEvent) =>{
            const {loaded,total}=progressEvent;
            let percent=Math.floor((loaded * 100) /total)
            setprogress(percent)
            
            if(percent===100){ 
                setTimeout(() => {
                    setshowprogress(false)  
                    
                }, 1000);}

        }
    }

    const showAdvanceFeatures=()=>{ 
  
        if(ImagesDataApi!==undefined ){ 
            ImagesDataApi.map((data,index)=>{
                let element=document.getElementsByClassName(`checkbox${index}`)[0]

            if(index!==0){
                if(document.element!==undefined && document.element.checked){
                    array.push(data)
                }
            }})}
    }
        
    // -------------------------------------------------------------------- Api Section --------------------------------------------------------------------//


    const ViewAllMode=()=>{ 
        
        axios.post(`/ViewAllMode`,{email:state.accDataVerify.email}, { withCredentials: true })
        .then(res=>{dispatch({type:"setviewAllImages",setviewAllImages:res.data})})   
        
    }

    const ViewAllMode2=()=>{ 
        
        axios.post(`/ViewAllMode`,{email:state.accDataVerify.email}, { withCredentials: true })
        .then(res=>{setviewAllDB(res.data)})   
     
    }

    const setViewAllMode=(value)=>{ 
        
        axios.post(`/setViewAllMode`,{email:state.accDataVerify.email,data:value})   

    }


    // -----------------Fetching Image Files -----------------//
   
    const FilesData=()=>{

     axios.post(`/ImageData`,
        {email:state.accDataVerify.email,
        currentFolder:state.currentFolder,
        currentTab:state.currentTab,
        })
        .then(res=>res.data)
        .then(res2=>setImagesDataApi(res2))
        .then(res3=>dispatch({type:"setloading",setloading:false}))
    }

    // -----------------Requesting to Delete Files -----------------//

    const deleteFile=(filename)=>{
     
        setonLoad_message('File Deleted')
        setshowprogress(true)
     
        axios.post(`/delete`,
        {email:state.accDataVerify.email,
        file:filename,
        currentFolder:state.currentFolder,
        currentTab:state.currentTab,
        sendtofile:false},options)

        .then(res=> dispatch({type:"setonEffect",setonEffect:state.onEffect+1}))
      }
  
    // -----------------Sending File to another Folder -----------------//

    const sendFileFunction=(folderName,fileName)=>{
        
        setshowprogress(true)
        setonLoad_message('File Sended')
        ExpandMultipleFiles()

        axios.post("/sendtofolders",
        {email:state.accDataVerify.email,
        folder:folderName.name,
        file:fileName,
        currentFolder:state.currentFolder,
        currentTab:state.currentTab,
        sendtofile:true},options)

        .then(res=>
        
        axios.post(`/delete`,
        {email:state.accDataVerify.email,
        file:fileName.defaultName,
        currentFolder:state.currentFolder,
        currentTab:state.currentTab})
        )
        .then(res=>dispatch({type:"setonEffect",setonEffect:state.onEffect+1}))
    }

 

    // --------------- Change Image Name ---------------//

    const editedImageName=useCallback((value)=>{
     
        axios.post('/editedImageName',
        {email:state.accDataVerify.email,
        newName:value,imagename:EditedNamedImage,
        tab:state.currentTab,
        folder:state.currentFolder})

        .then(res=>dispatch({type:"setonEffect",setonEffect:state.onEffect+1}))

    },[EditedNamedImage])

    const foldersData=()=>{
     
        axios.post('/folders',
        {email:state.accDataVerify.email,
        tab:state.currentTab,
        })

        .then(res=>setfolderName(res.data))

    }

    const recentFoldersData=async()=>{
       await axios.post("/recentFoldersData",
        {email:state.accDataVerify.email,
        currentTab:state.currentTab})
       .then(res=>{settabs(res.data)}) 
       

    }
 

    const sendMultipleFiles=async(selectedFolder)=>{
         
        const array2=[]
        setshowprogress(true)

        ImagesDataApi.map((data,index)=>
            index!==0?
                document.getElementsByClassName(`checkbox${index}`)[0]!==undefined && document.getElementsByClassName(`checkbox${index}`)[0].checked?
                array2.push(data) :null
            :null
        )
   
         axios.post("/sendMultipleFiles",
        {email:state.accDataVerify.email,
        folder:selectedFolder,
        file:array2,
        currentFolder:state.currentFolder,
        currentTab:state.currentTab,
        sendtofile:true},options)
        .then(res=>{
            dispatch({type:"setonEffect",setonEffect:state.onEffect+1})
            setEffectOn(EffectOn+1)
            setshowSendToFolderMain(false)
                console.log('sended')})
         
            
        
        setonLoad_message('Files Sended')
        dispatch({type:"setselectMultipleimages",setselectMultipleimages:false})
    
    }
    
    const DeleteMultipleFiles=()=>{
        
        const array3=[]

        setonLoad_message('File Deleted')
        setshowprogress(true)

        ImagesDataApi.map((data,index)=>
            index!==0?
                  document.getElementsByClassName(`checkbox${index}`)[0]!==undefined && document.getElementsByClassName(`checkbox${index}`)[0].checked?
                      array3.push(data)
                      :null
            :null
        ) 
      

        axios.post("/deleteMultipleFiles",
        {email:state.accDataVerify.email,
        file:array3,
        currentFolder:state.currentFolder,
        currentTab:state.currentTab,
        sendtofile:true},options)
        .then(res=>dispatch({type:"setonEffect",setonEffect:state.onEffect+1}))
        
   
        setshowSendToFolderMain(false)
        dispatch({type:"setselectMultipleimages",setselectMultipleimages:false})
    
    }

// -------------------------------------------------------------------- Api Section Ended --------------------------------------------------------------------//

    const displaySendToDiv=(index)=>{
      
        document.getElementsByClassName(`sendToDiv${index}`)[0].style.display='block'
    
    }
    
    const editButton=(imageName)=>{ 

        setshowNewImageNameDiv(true);
        setEditedNamedImage(imageName)
      
    }
    
    const openFolder=()=>{
   
        dispatch({type:"setshowFoldersDiv",setshowFoldersDiv:!state.showFoldersDiv})
   
    }
    
    const selectMultipleimages=()=>{
        
        dispatch({type:"setselectMultipleimages",setselectMultipleimages:!state.selectMultipleimages})
        ImagesDataApi.map((data,index)=> index!==0 ? document.getElementsByClassName(`checkbox${index}`)[0].checked=false :null)

    }

   

    const ExpandMultipleFiles=(value)=>{

       
            const filtered=ImagesDataApi.filter((data,index)=>
               index!==0? document.getElementsByClassName(`checkbox${index}`)[0].checked===true :null
            )
 
        
            if(filtered.length!==0){
                setshowSendToFolderMain(true)
                setSendToButton(value)
            }
            else{
                alert('you have not selected any Item')
            }
 
     
    }

    const displayDeleteFileDiv=()=>{

        const filtered=ImagesDataApi.filter((data,index)=>
        index!==0? document.getElementsByClassName(`checkbox${index}`)[0].checked===true :null)
 
 
        if(filtered.length!==0){
            setDeleteFilesConfirmation(true)
        }
        else{
            alert('you have not selected any Item')
        }

    }

  

    const setViewAllModeEffect=()=>{

        if(state.url!==null){

            dispatch({type:"setviewAllImages",setviewAllImages:true})

        }

        else if(state.url===null ){

            dispatch({type:"setviewAllImages",setviewAllImages:false})

            if(viewAllDB===true){

                dispatch({type:"setviewAllImages",setviewAllImages:true})

        }

    }

}

    const selectAllFunc=()=>{

        for(let i=1; i<ImagesDataApi.length; i++){
        const element=document.getElementsByClassName(`checkbox${i}`)[0]
        const selectAllButton=document.getElementById('checkbox_Icon_Main').checked
        element.checked=selectAllButton
        document.getElementsByClassName(`select_div_text${i}`)[0].innerText=selectAllButton ?"Selected" :'Select Image'
    }

    }

    // const preloaderFunction=()=>{
    //     if(!LoadingImages){
    //   setTimeout(() => {
    //     document.getElementById('loader').style.display='none'
    //   }, 500);
    //     }
    //   }
      
    //   useEffect(() => {
    //     preloaderFunction()
    //   }, [LoadingImages])

    useEffect(() => {

        ViewAllMode()
        
    }, [])

    useEffect(() => {

        FilesData()
        foldersData()
        recentFoldersData()

    },[EffectOn,state.onEffect])

    useEffect(() => {
    
        setViewAllModeEffect() 
        ViewAllMode2()     
    
    }, [state.url])



 
return (
   
<>
        <div id='ImageUpload' style={{flex:state.url!==null?3:1}}>
        
        <ImagesUploads
        ImagesDataApi={ImagesDataApi}
        progress={progress}
        setprogress={setprogress}
        setshowprogress={setshowprogress}
        mutipleFilesUploadLoading={mutipleFilesUploadLoading}
        setmutipleFilesUploadLoading={(value)=>setmutipleFilesUploadLoading(value)}
        />        

        </div> 
    
        <div id="blur_div" style={{display:foldersDiv?'block':"none"}} onClick={()=>openFolder()}></div>

        {/*----------------------------- multiple files uploading loading ----------------------------- */}

        <div id="blur_div" style={{display:mutipleFilesUploadLoading?'block':"none",zIndex:2,width:'49.7%',height:"83.2%"}}>
            <div style={{position:'absolute',top:"41%",left:"32%"}}>
            <span style={{color:"white",fontSize:"2.1vw",fontFamily:'cursive'}}>
                Files Uploading 
            </span>
            <span style={{position:'absolute',top:"20%",right:"-1%"}}> 
                <IoMdSettings id="loading_loader1" size={35} color={'white'}/>
                <IoMdSettings id="loading_loader1" size={35} color={'white'}/>
            </span>
            </div>
        </div>

{/* ---------------------------------Folder Name heading--------------------------------- */}
      
       
        <div id="imagesData">
 
        <div id="navigate_tabs"> <AsideData/> </div>      
 
        <Tabs  
        tabs={tabs}
        folderName={folderName}
        setImagesDataApi={(value)=>setImagesDataApi(value)}
        EffectOn={EffectOn}
        setEffectOn={(value)=>setEffectOn(value)}
        // setLoadingImages={(value)=>setLoadingImages(value)}
        LoadingImages={LoadingImages}
        />

        {showprogress?
        
        <>
        <Line percent={progress} strokeWidth="1" strokeColor="cadetblue" style={{backgroundColor:"black",border:'none'}} />
        <div id="onLoad_message">{onLoad_message}</div>
        </>
        
        :null}


        <TabsHeading ImagesDataApi={ImagesDataApi}/> 

        {previewImage?null:
            
        <>
        {!state.pix?
            <>

            <TiFolderOpen size={45} id='open_folder_icon' onClick={openFolder}/>
        
            <div id="sideIcons_MainDiv">
              
                <div id="selectAll_button_mainDiv" style={{borderLeft:state.selectMultipleimages?null:'none',borderBottom:state.selectMultipleimages?null:'none'}}>
              
                <MdSelectAll size={35} id="mutiSelect_selectAll_button"  onClick={selectMultipleimages}/>
              
                </div>
                    
                <div id="sideIcons_IconsDiv" style={{opacity:state.selectMultipleimages?100:0}}>
                
                <button id="mutiSelect_send_button" onClick={()=>ExpandMultipleFiles('send')}><BiSend size={35}/></button>
                
                    <AiTwotoneDelete id="mutiSelect_delete_button" size={35} onClick={displayDeleteFileDiv}/>
                    <input type="checkbox"  size={37} id='checkbox_Icon_Main' onClick={()=>{selectAllFunc();}}/>
                
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
            width={showSendToFolderMain?"100%":"0%"}
            showSendToFolderMain={showSendToFolderMain}
            setshowSendToFolderMain={setshowSendToFolderMain}
            mappingData={folderName}
            sendMultipleFiles={(value)=>sendMultipleFiles(value)}
            SendToButton={SendToButton}
            />

            <Securepopup/>
            
            {DeleteFilesConfirmation?
            
            <Securepopup 
            DeleteFilesConfirmation={DeleteFilesConfirmation} 
            setDeleteFilesConfirmation={(value)=>setDeleteFilesConfirmation(value)} 
            DeleteMultipleFiles={DeleteMultipleFiles} />  
            
            :null}
        </>
        :null}
        </>
        }

        <div id="images-data"  >
        {previewImage?<div style={{flex:1}}/>:
        <ViewAllFiles setViewAllMode={(value)=>setViewAllMode(value)}/>
        }
     
        
        <FilesCard
        showAdvanceFeatures={showAdvanceFeatures}
        ViewAllImages={ViewAllImages}
        ImagesDataApi={ImagesDataApi}
        displaySendToDiv={value=>displaySendToDiv(value)}
        editButton={(value)=>editButton(value)}
        showNewImageNameDiv={showNewImageNameDiv}
        folderName={folderName}
        setshowNewImageNameDiv={value=>setshowNewImageNameDiv(value)}
        deleteFile={value=>deleteFile(value)}
        editedImageName={value=>editedImageName(value)}
        sendFileFunction={(value,value2)=>sendFileFunction(value,value2)}
        EffectOn={EffectOn}
        setEffectOn={(value)=>setEffectOn(value)}
        />
        {console.log(showNewImageNameDiv,setEditedNamedImage)}
        
        <div id='loader' style={{display:LoadingImages?'block':'none'}}>
 
            <LoadingDiv/>
    
        </div>
    
        </div>
          
        </div>
        </>  

)}

export default memo(Images)
