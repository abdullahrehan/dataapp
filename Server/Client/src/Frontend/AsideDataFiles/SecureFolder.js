// import React, { useState, useContext,useEffect,memo } from 'react'
// import { BsShieldLock } from 'react-icons/bs'; 
// import {IoMdUnlock} from 'react-icons/io'; 
// import Context from '../HooksFiles/Context'
// import Securepopup from './Securepopup'
// import axios from 'axios' 

// function SecureFolder() {
//     const {state,dispatch}=useContext(Context)
//     const [secureFolder,setsecureFolder]=useState(false)
//     const [confirmMessageForSecure,setconfirmMessageForSecure]=useState(false)
//     const [confirmfoldertounlock,setconfirmfoldertounlock]=useState(false)
//     const [folderStatus,setfolderStatus]=useState(false)
//     // ---------- Checking Wheather Folders Password is set or not then show secure conformation div ----------//


//     const folderStatusApi=()=>{

//         axios.post("http://localhost:2000/folderStatus",
//         {email:state.accDataVerify.email,
//         currentFolder:state.currentFolder,
//         currentTab:state.currentTab
//         })
//         .then(res=>{setfolderStatus(res.data)})
    
//     }

//     const securingFolder=()=>{
         
//         if(state.accDataVerify.folderPassword===''){
//             setsecureFolder(true);} 
//         else{setconfirmMessageForSecure(true)}
           
//     }
    
//     const unsecuringFolder=()=>{setconfirmfoldertounlock(true)}


//     const secureFolderConfirm=({folderPassword})=>{
        
//         axios.post('http://localhost:2000/setFoldertoSecure',{
//             email:state.accDataVerify.email,
//             folderPassword:folderPassword,
//             currentFolder:state.currentFolder,
//             secure:true,
//             tab:state.currentTab
//         })
//         .then(res=>{dispatch({type:"setAccountData",accData:res.data})})

//     setconfirmMessageForSecure(false)
        
//     }

//     useEffect(() => {
//         folderStatusApi()
//     },[state.currentTab,state.currentFolder])
// // --------------- Showing Unsecure Confirmation div  -------------------------------//

    
//     return (
//         <div>
//             {folderStatus ?
//                <div id="secure_folder_div"
            
//             > <IoMdUnlock size={35} id='unsecure_folder_icon' onClick={unsecuringFolder}/>
//               <a id='secure_folder_text'>
              
//                  UnSecure This folder
             
//              </a>
//              </div>
//              :
//              <div id="secure_folder_div"  style={{
//                  top:state.currentTab==='wordfolder'||state.currentTab==='pdffolder' ? '29%' :  '20%'}}>
//              <BsShieldLock size={45} id='secure_folder_icon' onClick={securingFolder}/> 
//              <a id='secure_folder_text'> 
//              Secure This folder
//              </a>
//              </div> 
// }
//     <Securepopup
//     secureFolder={secureFolder}
//     confirmMessageForSecure={confirmMessageForSecure}
//     confirmfoldertounlock={confirmfoldertounlock}
//     secureFolderConfirm={secureFolderConfirm}
//     />
//         </div>
//     )
// }

// export default SecureFolder
