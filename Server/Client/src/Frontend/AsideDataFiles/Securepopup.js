import React, { useState, useContext,useEffect,memo, useCallback } from 'react'
import { BsShieldLock } from 'react-icons/bs'; 
import {IoMdUnlock} from 'react-icons/io'; 
import Context from '../HooksFiles/Context'
import PasswordSecurity from './PasswordSecurity'
import SmallPopups from './SmallPopups'
import axios from 'axios' 
import '../../css/popups.css'


function Securepopup({
    enterFolderPasswords,
    setenterFolderPasswordsValue,
    foldernamepopup,
    setfoldernamepopup,
    currentFolder,
    showNewImageNameDiv,
    editedImageName,
    crossFunction,
    iconDisplay,
    deleteSecureFolderPassword,
    crossFunctiondeleteFolder,
    dragedFoldertoDelete,
    setEffectOn,
    EffectOn,
    shrinkDiv,
    DeleteFilesConfirmation,
    setDeleteFilesConfirmation,
    DeleteMultipleFiles
    })
    
    {
     
//---------------------------------------------------------Variables and States Section--------------------------------------------------



    const {state,dispatch}=useContext(Context)
    const [folderPassword,setfolderPassword]=useState('')
    const [folderNameInputRef,setfolderNameInputRef]=useState()
    const [secureFolder,setsecureFolder]=useState(false)
    const [confirmMessageForSecure,setconfirmMessageForSecure]=useState(false)
    const [confirmfoldertounlock,setconfirmfoldertounlock]=useState(false)
    const [folderStatus,setfolderStatus]=useState(false)
 
//---------------------------------------------------------------Api Section-------------------------------------------------------------

    
// --------------- Create Password for the Folder ---------------//


    const createFolderPassword=()=>{

        axios.post('/folderPassword',{
        email:state.accDataVerify.email,
        folderPassword:folderPassword}) 
        setconfirmMessageForSecure(false) 
        setsecureFolder(false)  
        setfolderPassword('')
    }


// --------------- Folder Password Confirmation ---------------//

    const confirmFolderPassword=()=>{
 
        if(state.accDataVerify.folderPassword===folderPassword){
          
            setfolderPassword(''); 
            dispatch({type:"setcurrentFolder",currentFolderValue:currentFolder});
            setenterFolderPasswordsValue(false);
            shrinkDiv();

            axios.post("/recentFolders",
            {email:state.accDataVerify.email,
            folderName:currentFolder,
            currentTab:state.currentTab,
            secure:state.accDataVerify[state.currentTab].main.find(datas=>datas.name===currentFolder).secure
            })
             setEffectOn(EffectOn+1)
            // dispatch({type:"setonEffect",setonEffect:state.onEffect+1})
            
        }
        else{
            console.log('password is incorrect');
            setfolderPassword(''); 
        }
    }

// --------------- Unlocking Folder Password Confirmation ---------------//

    
    const unlockFolderConfirm=()=>{

        if(state.accDataVerify.folderPassword===folderPassword){
        axios.post('/setFoldertoSecure',{
        email:state.accDataVerify.email,
        folderPassword:folderPassword,
        currentFolder:state.currentFolder,
        secure:false,
        tab:state.currentTab
        })
        
        dispatch({type:"setonEffect",setonEffect:state.onEffect+1})
        setconfirmfoldertounlock(false);setfolderPassword('')}
        else{console.log('password is incorrect');}
    
    }
    

// --------------- Securing Folder With Password Protection ---------------//

    
    const secureFolderConfirm=()=>{
        
        axios.post('/setFoldertoSecure',{
            email:state.accDataVerify.email,
            folderPassword:folderPassword,
            currentFolder:state.currentFolder,
            secure:true,
            tab:state.currentTab
        })
        dispatch({type:"setonEffect",setonEffect:state.onEffect+1})

        setconfirmMessageForSecure(false)
        
    }
        

// ---------- Checking Wheather Folders Password is set or not then show secure conformation div ----------//

    const securingFolder=()=>{
         
        if(state.accDataVerify.folderPassword===''){setsecureFolder(true);} 
        else{setconfirmMessageForSecure(true)}
           
    }

// --------------- Showing Unsecure Confirmation div  -------------------------------//

    
    const unsecuringFolder=()=>{setconfirmfoldertounlock(true)}


// --------------- Requesting to Create a new Folder -------------------------------//

    const createNewFolder=useCallback(()=>{

    if(folderNameInputRef.current.value!==''){
            
        axios.post("/createfolder",
        {email:state.accDataVerify.email,
        newfolderName:folderNameInputRef.current.value,
        MainfolderName:state.currentTab,
        folder:state.currentFolder})
     
        }

        dispatch({type:"setonEffect",setonEffect:state.onEffect+1})
        setfoldernamepopup(false)

    },[folderNameInputRef])
    

    const deleteSecureFolder=useCallback(()=>{

        // const deleteFromRecentFolder=tabs.findIndex(data=>data.name===dragedFoldertoDelete.name)
        // const index=tabs.findIndex(data=>data.name===dragedFoldertoDelete.name)
        // const folder=tabs[index+1] 

        if(state.accDataVerify.folderPassword===folderPassword){
         
        axios.post("/deleteFolder",
        {email:state.accDataVerify.email,
        folderName:dragedFoldertoDelete.name,
        currentFolder:state.currentFolder,
        currentTab:state.currentTab})
 
        dispatch({type:"setonEffect",setonEffect:state.onEffect+1})
        crossFunctiondeleteFolder(false);setfolderPassword('')
        // setdecreaseFolderDiv()
    }
        else{alert('password is incorrect');}
    
    },[folderPassword])

    const folderStatusApi=()=>{

        axios.post("/folderStatus",
        {email:state.accDataVerify.email,
        currentFolder:state.currentFolder,
        currentTab:state.currentTab
        })
        .then(res=>{setfolderStatus(res.data)})
    
    }
    
    useEffect(() => {
         folderStatusApi()
    },[state.currentTab,state.currentFolder,state.onEffect])
   
//---------------------------------------------------------------Html Section-------------------------------------------------------------
    // console.log(state.currentTab)
 
    return (
        <div>

            {/* // --------------- Showing the Secure / UnSecure Icon and Text -------------------------------// */}

            {folderStatus ?
               
               <div id="secure_folder_div"
            
               > <IoMdUnlock size={35} id='unsecure_folder_icon' onClick={unsecuringFolder}/>
                 <a id='secure_folder_text'>
                 
                    UnSecure This folder
                
                </a>
                </div>
                :
                <div id="secure_folder_div"  style={{
                    top:state.currentTab==='wordfolder'||state.currentTab==='pdffolder' ? '29%' : state.currentTab==='messages'  ? '28%' : state.currentTab==='textDoc'  ? '20%':"20%"}}>
                <BsShieldLock size={45} id='secure_folder_icon' onClick={securingFolder}/> 
                <a id='secure_folder_text'> 
                Secure This folder
                </a>
                </div> 
             }
               
                
     
        
             
            {/* // --------------- Creating Password For Secure Folders -------------------------------// */}

            {secureFolder ?

            <PasswordSecurity 
            headingOne={"Create Password !"}
            headingTwo={"Enter a password for Secure folder"}
            buttonHeading={"Create Password"}
            showEnterPassword={secureFolder} 
            crossFunction={value=>setsecureFolder(value)}
            // setconfirmfoldertounlock
            confirmFolderPassword={createFolderPassword}
            folderPassword={folderPassword}
            enterFolderPassword={value=>setfolderPassword(value)}  
            />

            :null}
           
            {/* // --------------- Enter Password For Secure Folders -------------------------------// */}
            
            {enterFolderPasswords ?

           <PasswordSecurity 
           
            headingOne={"Enter Password !"}
            headingTwo={"This folder require password to access it"}
            buttonHeading={"Enter Password"}
            showEnterPassword={enterFolderPasswords}
            crossFunction={value=>setenterFolderPasswordsValue(value)}
            confirmFolderPassword={confirmFolderPassword}
            folderPassword={folderPassword}
            enterFolderPassword={value=>setfolderPassword(value)}
            />
            
            :null}

            {/* // --------------- Remove Password For Secure Folders -------------------------------// */}

           {confirmfoldertounlock ? 

            <PasswordSecurity 
            headingOne={"Enter Password !"}
            headingTwo={"Are you sure to remove security from this folder"}
            buttonHeading={"Confirm unlock Folder"}
            showEnterPassword={confirmfoldertounlock}
            crossFunction={value=>setconfirmfoldertounlock(value)}
            confirmFolderPassword={unlockFolderConfirm}
            folderPassword={folderPassword}
            enterFolderPassword={value=>setfolderPassword(value)}
            />
            
            :null}

            {/* // --------------- Removing Password To delete Folder -------------------------------// */}
            {deleteSecureFolderPassword ?
            
            <PasswordSecurity 
            
            headingOne={"Delete Secure folder !"}
            headingTwo={"Enter Folder password to Delete it"}
            buttonHeading={"Delete Password"}
            showEnterPassword={deleteSecureFolderPassword}
            crossFunction={value=>crossFunctiondeleteFolder(value)}
            confirmFolderPassword={deleteSecureFolder}
            folderPassword={folderPassword}
            enterFolderPassword={value=>setfolderPassword(value)}
            />
            
            :null}

            {/* // --------------- Secure Folders Confirmation Div -------------------------------// */}

            {confirmMessageForSecure ?
            
            <SmallPopups 
            headingOne={"Securing Folder !"}
            headingTwo={"Are you sure to secure the folder"}
            buttonHeading={"Secure Folder"}
            mainDivDisplay={confirmMessageForSecure} 
            crossFunction={value=>setconfirmMessageForSecure(value)}
            buttonFunction={secureFolderConfirm}
            setFolderNameRef={value=>setfolderNameInputRef(value)}
            showInput={false}
            PaddingTop="14%"
            />
            
            :null}
            
            {DeleteFilesConfirmation ?
            
            <SmallPopups 
            headingOne={"Deleting Files !"}
            headingTwo={"Are you sure to Delete these files"}
            buttonHeading={"Delete Files"}
            mainDivDisplay={DeleteFilesConfirmation} 
            crossFunction={value=>setDeleteFilesConfirmation(value)}
            buttonFunction={DeleteMultipleFiles}
            setFolderNameRef={value=>setfolderNameInputRef(value)}
            showInput={false}
            PaddingTop="14%"
            />
            
            :null}
            {/* // --------------- New Folders Enter Name Div -------------------------------// */}
            {foldernamepopup ?
            
            <SmallPopups 
            headingOne={"Create a New  Folder !"}
            headingTwo={"Please enter a name for  folder"}
            buttonHeading={"Create Folder"}
            mainDivDisplay={foldernamepopup} 
            crossFunction={value=>setfoldernamepopup(value)}
            buttonFunction={createNewFolder}
            setFolderNameRef={value=>setfolderNameInputRef(value)}
            showInput={true}
            PaddingTop="8%"
            />

            :null}

 

            {showNewImageNameDiv ? 
            
            <SmallPopups 
            headingOne={"Change Image Name !"}
            headingTwo={"Please enter new name for Image"}
            buttonHeading={"Change Name"}
            mainDivDisplay={showNewImageNameDiv} 
            crossFunction={value=>crossFunction(value)}
            buttonFunction={()=>editedImageName( folderNameInputRef.current.value )}
            setFolderNameRef={value=>setfolderNameInputRef(value)}
            showInput={true}
            PaddingTop="8%"
            />
            
            :null}
 
        </div>
    )
}

export default memo(Securepopup)
