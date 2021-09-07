import React, { useEffect,useContext,memo } from 'react'
import {TiFolderOpen} from 'react-icons/ti'
import Context from '../HooksFiles/Context'
import axios from 'axios' 
import { useImmer } from "use-immer";
import FolderSystem from './folderSystem'
import Securepopup from './Securepopup'
import TabsHeading from './TabsHeading'
import ViewAllFiles from './ViewAllFiles'
import TextMessages from './TextMessages'
import AsideData  from '../AsideDataFiles/AsideData'
import MessagesUpload from '../UploadingFiles/messagesUpload' 
import LoadingDiv from '../AsideDataFiles/LoadingDiv'
import background from '../../images/bac.jpg'
import Tabs from './Tabs'
import '../../css/TextData.css'
import '../../css/Images.css'

function Messages() {

    const {state,dispatch}=useContext(Context)
    const ViewAllImages=state.viewAllImages
    const [textMessagesData,settextMessagesData]=useImmer([])
    const [folderName,setfolderName]=useImmer()
    const [oldHeading,setoldHeading]=useImmer()
    const [EffectOn,setEffectOn]=useImmer(0)
    const [tabs,settabs]=useImmer([])
    const [viewAllDB,setviewAllDB]=useImmer()
    const foldersDiv=state.showFoldersDiv
    const LoadingMessages=state.loading
    // -----------------Fetching Image Files -----------------//
    
    const FilesData=()=>{
        // settextMessagesData([])
        axios.post('/txt',
        {email:state.accDataVerify.email,
        folder:state.currentFolder})
        .then(res=>settextMessagesData(res.data.value))
        .then(res3=>dispatch({type:"setloading",setloading:false}))
        
    }
  
        
     

   
    const foldersData=()=>{
        
        axios.post('/folders',
        {email:state.accDataVerify.email,
        tab:state.currentTab,
        })

        .then(res=>{setfolderName(res.data)})

    }

    const recentFoldersData=()=>{
        axios.post("/recentFoldersData",
        {email:state.accDataVerify.email,
        currentTab:state.currentTab})
        .then(res=>{settabs(res.data);console.log(tabs)}) 
        

    }
    // console.log(viewAllDB)

    const openFolder=()=>{
        dispatch({type:"setshowFoldersDiv",setshowFoldersDiv:!state.showFoldersDiv})
    }
    
    const setTab=()=>{
        dispatch({type:"setcurrentTab",setcurrentTab:"messages"})
        dispatch({type:"setcurrentFolder",currentFolderValue:'MainFolder'})
        
    }

    const ViewAllMode=(value)=>{ 
    
        if(state.accDataVerify.email!==undefined){
           axios.post(`/ViewAllMode`,{email:state.accDataVerify.email}, { withCredentials: true })
        .then(res=>{dispatch({type:"setviewAllImages",setviewAllImages:res.data})})   
        }
      
      
      }
      
      const ViewAllMode2=(value)=>{ 
          
        axios.post(`/ViewAllMode`,{email:state.accDataVerify.email}, { withCredentials: true })
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
    
    useEffect(() => {
        // if(state.currentTab!==null){
        FilesData()
        foldersData()
        recentFoldersData()
    // }

    },[EffectOn,state.onEffect])

  

// console.log(oldHeading)


 
 
    
return (
    <div id='Default_Tab_Main_div' style={{overflow:foldersDiv?'hidden':"auto",height:"100%",overflow:'none'}}>

<div id='MessagesUpload'>
        
        <MessagesUpload
        textMessagesData={textMessagesData}
        EffectOn={EffectOn}
        setEffectOn={(value)=>setEffectOn(value)}
        oldHeading={oldHeading}
        />        

        </div> 
    <div id="blur_div" style={{display:foldersDiv?'block':"none"}} onClick={openFolder}></div>
{/* ---------------------------------Folder Name heading--------------------------------- */}
    
    <div id="messagesData">
    {/* <div style={{position:"absolute",width:'100%',height:"100%"}}>
                   <img src={background} width="100%" height="100%"/>
                </div> */}
    <div id="navigate_tabs">
        <AsideData/>
    </div>
        
      <Tabs  
        tabs={tabs}
        folderName={folderName}
        setImagesDataApi={(value)=>settextMessagesData(value)}
        EffectOn={EffectOn}
        setEffectOn={(value)=>setEffectOn(value)}
        />  
        <TabsHeading ImagesDataApi={textMessagesData}/>


        <TiFolderOpen size={45} style={{top:"24%"}} id='open_folder_icon' onClick={openFolder}/>

        <FolderSystem 
        EffectOn={EffectOn}
        setEffectOn={(value)=>setEffectOn(value)}
        setImagesDataApi={(value)=>settextMessagesData(value)}
        foldersDiv={foldersDiv}
        mappingData={folderName}
        tabs={tabs}
        />  
        
        <div id="messages-data"  >
        
        <Securepopup/>

        <ViewAllFiles setViewAllMode={(value)=>setViewAllMode(value)}/>

        <TextMessages 
        textMessagesData={textMessagesData}
        showFoldersDiv={foldersDiv}
        setoldHeading={(value)=>setoldHeading(value)}
        />
        
        <div id='loader' style={{display:LoadingMessages?'block':'none'}}>
 
            <LoadingDiv/>
    
        </div>

        </div>
        
        </div>
        </div>  

)}

export default memo(Messages)

