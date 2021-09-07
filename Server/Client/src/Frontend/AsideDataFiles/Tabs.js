import React,{useContext,memo, useState} from 'react';
import {FaRegFolderOpen} from 'react-icons/fa';
import {ImCross} from 'react-icons/im'; 
import { BsShieldLock } from 'react-icons/bs'; 
import Context from '../HooksFiles/Context'
import axios from 'axios'
import '../../css/tabs.css'

function Tabs({tabs,folderName,setImagesDataApi,EffectOn,setEffectOn,setLoadingImages,LoadingImages}) {

    
    const {state,dispatch}=useContext(Context)
    const recentFolder=state.accDataVerify.recentFolders
    const recentFolderValue=recentFolder.find(data=>data.name===state.currentTab).value
    const [draggingTab,setdraggingTab]=useState()
    const previewImage=state.url!==null?true:false

    const previewNotes=state.notes!==null?true:false
    const css={ 
        width:"15%",
        height:"100%",
        position:"absolute",
        right:"2%",
        top:"10%",
        zIndex:2}

    const tabs_styles={ 
        border:state.currentFolder==="MainFolder"?'1px solid white':null,
        borderlefth:state.currentFolder==="MainFolder"?'none':null,
        borderBottom:state.currentFolder==="MainFolder"?'none':"1px solid white",
        borderTopLeftRadius:state.currentFolder==="MainFolder"?'5px':null,
        borderTopRightRadius:state.currentFolder==="MainFolder"?'5px':null,
        backgroundColor:state.currentFolder==="MainFolder"? "#0000" :null,} 
        
    // const dynamicTabs_styles=

// --------------- Deleting Recent Tabs  ---------------//

    const deletRecentFolders=(folder_Name)=>{

        axios.post("/deletRecentFolders",
        {email:state.accDataVerify.email,
        folderName:folder_Name,
        currentTab:state.currentTab
        })
        

        const index=tabs.findIndex(data=>data.name===folder_Name)
        
        if(index+1!==tabs.length){
            const folder=tabs[index+1] 
            dispatch({type:"setcurrentFolder",currentFolderValue:folder.name})
        }
        
        else if (index+1===tabs.length){
            dispatch({type:"setcurrentFolder",currentFolderValue:"MainFolder"})
        } 
    
        setImagesDataApi([])
        setEffectOn(EffectOn+1)
    }



    
//---------------------------------------------------------------UseEffects Section-------------------------------------------------------------
    const settab=(data)=>{
        setImagesDataApi([])
        setEffectOn(EffectOn+1)
        dispatch({type:"setloading",setloading:true})
        dispatch({type:"setcurrentFolder",currentFolderValue:data})   
    }

    const tabs2=[...tabs]


    const setrecentFoldersData=(data)=>{
        axios.post("/setrecentFolders",
        {email:state.accDataVerify.email,
        currentTab:state.currentTab,
        newList:data})
       .then(res=>{console.log(res.data)}) 
       dispatch({type:"setonEffect",setonEffect:state.onEffect+1})

    }

    return (
        <div id="tabs_mainDiv" >
        
    
        {/* {recentFolderValue.length!==0? */}
            <div id="mainFolder_tab" style={{width:tabs.length<1?"15vw":"100%"}}> 

              <button id="tabs" className="btn btn-dark" onClick={()=>settab("MainFolder")} style={tabs_styles} disabled={LoadingImages?true:false}>
              {previewImage || previewNotes || state.pix ?null:<FaRegFolderOpen color="white" size={22}/>} Main
             </button>   
            
            </div>
        {/* // :null}   */}
       
        {tabs.length && tabs!==null? tabs.map((data,index)=>
        
          <div id="tabs_button_div" key={index}  className={`tabs_button_div${index}`} 
          draggable={true}
          onDragStart={(e)=>setdraggingTab(index)}
          onDragOver={(e)=>{e.preventDefault()}}
          onDrop={()=>{
              
            tabs2[draggingTab]=tabs2[index]
            tabs2[index]=tabs[draggingTab]
            console.log(tabs2)
            setrecentFoldersData(tabs2)
        //   alert(`${draggingTab} is drop on ${index}`)
          }}> 
                
            <button id="tabs" 
            disabled={LoadingImages?true:false}
            style={{
                backgroundColor:state.currentFolder===data.name? "#0000" :null,
                border:state.currentFolder===data.name?'1px solid white':null,
                borderBottom:state.currentFolder===data.name?'none':previewImage || previewNotes && folderName.find(datas=>datas.name===data.name).secure  ? '1px solid white':"1px solid white",
                borderBottomLeftRadius:state.currentFolder===data.name?'0px':null,
                borderBottomRightRadius:state.currentFolder===data.name?'0px':null,
                borderTopLeftRadius:state.currentFolder===data.name?'5px':null,
                borderTopRightRadius:state.currentFolder===data.name?'5px':null,
                color:(previewImage || previewNotes || state.pix) && folderName.find(datas=>datas.name===data.name).secure ? 'red' :null,
            }} 

            className={`btn btn-dark`} onClick={(e)=>settab(data.name)}>
            
                {/* {console.log(folderName)} */}
                {folderName!==undefined && folderName.length  ?

                folderName.find(datas=>datas.name===data.name).secure ? 
                        <>
                                       {previewImage || previewNotes || state.pix?null:
                        <BsShieldLock size={20} id='secure_folder_tabs' color="red" style={{left:previewImage || previewNotes?"-2%":null,top:previewImage || previewNotes?"27%":null}}/>} 
                        {/* {console.log(folderName.find(datas=>datas.name===data.name))} */}
</>

                    :null
                :null}

                {previewImage || previewNotes || state.pix ?null:
                <FaRegFolderOpen color="white" size={22}/>  
                }
                {/* {console.log(data.name)}
                {console.log(data.name.slice(0,7))} */}
                {data.name.split(' ')[0].length>8 ? data.name.split(' ')[0].slice(0,7)+ '..' :data.name.split(' ')[0]}
                {data.name.split(' ')[0].length!==data.name.length ? '..': null}    
            
            </button>

            <div style={css}>
            {previewImage || previewNotes || state.pix ?null:
                <ImCross id="tabs_cross_btn" onClick={()=>deletRecentFolders(data.name)} color="white" size={11}/>
}</div>
                    
            </div>            
            ):null}
    
           
     
       

        </div>
    )
}

export default memo(Tabs)
