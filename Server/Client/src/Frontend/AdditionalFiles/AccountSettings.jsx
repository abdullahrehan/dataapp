import React,{useState,useContext,useRef,useEffect,memo} from 'react'
import {RiLockPasswordFill} from 'react-icons/ri'; 
import {ImCross} from 'react-icons/im';
import {MdAccountCircle} from 'react-icons/md'; 
import { AiFillDelete } from 'react-icons/ai';
import Context  from '../HooksFiles/Context'
import {BiError} from "react-icons/bi";
import userImageDefault from '../../images/userImageDefault.jpg'
// import userImageDefault from '../../images/userImageDefault.jpg'
import '../../css/AccountSettings.css'
 
import axios from 'axios'

function AccountSettings({settingsCard,setsettingsCard,acoountImageRender,setacoountImageRender,profilepic,setprofilepic}) {
    

//------------------------------------------------------------ Assigning States Variables-----------------------------------------------------

    const [changePassword,setchangePassword]=useState(false)
    const [showDeleteAccountDiv,setshowDeleteAccountDiv]=useState(false)
    const [showAccountData,setshowAccountData]=useState(true)
    const [redirectToMain,setredirectToMain]=useState(false)
    const [showDeleteAccountEmailError,setshowDeleteAccountEmailError]=useState(false)
    const [showDeleteAccountPasswordError,setshowDeleteAccountPasswordError]=useState(false)
  
    const {state,dispatch}=useContext(Context)   
    const [currentAccountPassword,setcurrentAccountPassword]=useState('')
    const [NewAccountPassword,setNewAccountPassword]=useState('')
    const [settingChangePasswordHeading,setsettingChangePasswordHeading]=useState('')
    const [currentFolderPassword,setcurrentFolderPassword]=useState('')
    const [NewFolderPassword,setNewFolderPassword]=useState('')
    const [acoountImage,setacoountImage]=useState(userImageDefault)
    // const [profilepic,setprofilepic]=useState()


//------------------------------------------------------------ Assigning Local Variables-----------------------------------------------------

    const accountPassword=state.accDataVerify.password
    const folderPassword=state.accDataVerify.folderPassword
    const username=state.accDataVerify.username
    const userEmail=state.accDataVerify.email
    const ProfileImage=state.accDataVerify.profile
    const map_stars=accountPassword.length-3
    const arrayobject=new Array(map_stars).fill(0)
   
  //------------------------------------------------------------ Assigning Ref Variables-----------------------------------------------------

    const AccountPassword=useRef()
    const AccountNewPassword=useRef()
    const FolderPassword=useRef()
    const FolderNewPassword=useRef()
    const DeleteAccountEmail=useRef()
    const DeleteAccountPassword=useRef()


//------------------------------------------------------------ Api Calls----------------------------------------------------------------------

// -----------------Upload Image to Server Api----------------//  

  const loadFileofaccountimg=(e)=>{
    e.preventDefault()
        const image = new FileReader();
        const form=new FormData();

        const imgfile=e.target.files[0]   
        image.onload=()=>{setacoountImage(image.result)}
        image.readAsDataURL(imgfile)
        console.log(imgfile)
        form.append("email",state.accDataVerify.email)
        form.append("uploadedFile",imgfile)
        form.append("prevImage",state.accDataVerify.profile.url)

        axios.post("/uploadProfile",form)
        .then(res=>{setprofilepic(res.data);console.log(res.data)})
        // .then(res2=>setacoountImageRender(acoountImageRender+1))
      }

      // const profile=()=>{
        
      //   axios.get("/ProfilePicture")
      //   .then(res=>setacoountImage(res.data))
      // }
      
      // useEffect(() => {
      //   profile()
        
      // }, [])
// -----------------Save Changes in Account Info Api----------------//  

  const SaveChanges=()=>{

        const userPassword=AccountPassword.current.value
        const userNewPassword=AccountNewPassword.current.value
        const userFolderPassword=FolderPassword.current.value
        const userFolderNewPassword=FolderNewPassword.current.value
 
        
        if(userPassword===accountPassword &&  userFolderPassword===folderPassword){
               axios.post('/user/resetpassword',{email:state.accDataVerify.email,accountPassword:userNewPassword,folderPassword:userFolderNewPassword})
        }
       
        else if(settingChangePasswordHeading==="Account"){
            if(userPassword===accountPassword){
              axios.post('/user/resetpassword',{email:state.accDataVerify.email,accountPassword:userNewPassword,folderPassword:null})
            }
        }
        
        else if(settingChangePasswordHeading==="Folder"){
          if(userFolderPassword===folderPassword){
            axios.post('/user/resetpassword',{email:state.accDataVerify.email,accountPassword:null,folderPassword:userFolderNewPassword})
          }
       }
        
       
    }
   
  
// -----------------Delete Account Api----------------//
    
  const DeleteAccountFinalFunction=()=>{
  
      const DeleteAccountEmailVar=DeleteAccountEmail.current.value 
      const DeleteAccountPasswordVar=DeleteAccountPassword.current.value 

        // -----------------Sending request to delete account----------------//         
        if(DeleteAccountEmailVar===userEmail && DeleteAccountPasswordVar===accountPassword ){
        
          axios.get("/logouts", { withCredentials: 'true' }).then(res=>console.log(res))
          axios.post('/user/deleteAccount',{email:state.accDataVerify.email,name:username})
        .then(res=>dispatch({type:"setAccountData",accData:res.data}))
            setredirectToMain(true)
        }
        // -----------------Conditions for displaying errors----------------//  
        else if(DeleteAccountEmailVar!==userEmail && DeleteAccountPasswordVar!==accountPassword ){setshowDeleteAccountEmailError(true);setshowDeleteAccountPasswordError(true)}
        else if(DeleteAccountEmailVar===userEmail && DeleteAccountPasswordVar!==accountPassword ){setshowDeleteAccountEmailError(false);setshowDeleteAccountPasswordError(true)}
        else if(DeleteAccountEmailVar!==userEmail && DeleteAccountPasswordVar===accountPassword ){setshowDeleteAccountEmailError(true);setshowDeleteAccountPasswordError(false)}
        

  }

//------------------------------------------------------------ Other Functions --------------------------------------------------------------------

  const DeleteFirstPress=()=>{
    setshowDeleteAccountDiv(true)
    setshowAccountData(false)
  }
  const crossDeleteAccount=()=>{
    setshowDeleteAccountDiv(false)
    setTimeout(() => {setshowAccountData(true)},370) 
  }
  
//------------------------------------------------------------ Html Section --------------------------------------------------------------------


    return (
        
        <div id='confirm_logout_background_fade_div' style={{display:settingsCard ?"block":"none"}}>
  

        <div id='header_setting_new_password'  >
          
          <ImCross size={28} id="accountSetting_cross_icon" className="crossIcon" onClick={()=>{setsettingsCard(false)}}/>
          <h2 id="account_settings_heading">Accounts Details</h2>
          
        {/* --------------------- Change Account Image Area  --------------------   */}

          <div id='header_account_details_user_image_div'>
            {/* {console.log(profilepic,'profilepic')} */}
            <img id='header_account_details_user_image' src={profilepic}/>
            <MdAccountCircle size={210}/>
           
            <div id='header_account_details_input_div'>
              <input type="file" id='header_account_details_input' name="profile" onChange={loadFileofaccountimg}/>
              <h6 id="change_pic">Change Picture</h6>
            </div>
           
          </div>

          {/* --------------------- User Account Information Area  --------------------   */}

          <div id='header_account_details_user_details' style={{display:showAccountData?'block':'none' }}>
          
            <div >Name :<span id="user_details_name">{username}</span></div>
            <div className="user_details_padding" >Email : <span className="user_details_styles">{userEmail}</span></div>
            <div className="user_details_padding" >Account Password :  <span className="user_details_styles">{accountPassword.split('',2)}{arrayobject.map(data=><a>*</a>)}{accountPassword.slice(accountPassword.length-2,accountPassword.length)}</span></div>
            <div className="user_details_padding" ><button className='btn btn-dark' onClick={()=>{setchangePassword(true);setsettingChangePasswordHeading('Account')}}><RiLockPasswordFill size={19}/> Change Password </button></div>
            <div className="user_details_padding" >Folder Password :  <span className="user_details_styles">{folderPassword.toString().split('',2)}**</span></div>
            <div className="user_details_padding" ><button className='btn btn-dark' onClick={()=>{setchangePassword(true);setsettingChangePasswordHeading('Folder')}}><RiLockPasswordFill size={19}/> Change Password </button></div>
            

            {/* --------------------- Change Account or Folder Password Area  --------------------   */}
            
            <div id='change_password_tools' style={{width: changePassword ? "63%" : "0%",opacity: changePassword ? "100%" : "0%"}}>
              
              <h5 id='change_password_heading'>Change {settingChangePasswordHeading} Password</h5>
              <ImCross id='change_password_crossIcon' size={20} className="crossIcon" onClick={()=>{setchangePassword(false);}}/>
              
                Current Password : 
                <input className='change_password_tools_input_field' ref={AccountPassword} style={{display:settingChangePasswordHeading==="Account"?'block':"none"}} onChange={(e)=>setcurrentAccountPassword(e.target.value)} value={currentAccountPassword} type="text" placeholder='Current Password'/>
                <input className='change_password_tools_input_field' ref={FolderPassword}  style={{display:settingChangePasswordHeading==="Account"?'none':"block"}} onChange={(e)=>setcurrentFolderPassword(e.target.value)}  value={currentFolderPassword}  type="text" placeholder='Current Password'/>
              
              <br/>
               
                New Password : 
                <input className='change_password_tools_input_field' ref={AccountNewPassword} style={{display:settingChangePasswordHeading==="Account"?'block':"none",top:"3%"}} onChange={(e)=>setNewAccountPassword(e.target.value)} value={NewAccountPassword} type="text" placeholder='New Password'/>
                <input className='change_password_tools_input_field' ref={FolderNewPassword}  style={{display:settingChangePasswordHeading==="Account"?'none':"block",top:"3%"}} onChange={(e)=>setNewFolderPassword(e.target.value)} value={NewFolderPassword}   type="text" placeholder='Folder New Password'/>
            
            </div>
          </div>

          {/* --------------------- Delete User Account Area  --------------------   */}

          <div id='change_password_tools2' style={{width: showDeleteAccountDiv ? "60%" : "0%",opacity: showDeleteAccountDiv ? "100%" : "0%"}}>
              
              <h4 id="delete_account_heading">Delete Account</h4>
              <div id="delete_account_confirmation_line">Are You Sure To want To Delete Your Account</div>
              <ImCross id="delete_account_crossIcon" className="crossIcon" size={20} onClick={crossDeleteAccount} />
              
           <br/>  
           
              <div className="delete_account_email_password_div" > 
                Email : <input  id="delete_account_email_input" className='change_password_tools_input_field' ref={DeleteAccountEmail} type="email"  onChange={(e)=>setcurrentAccountPassword(e.target.value)} value={currentAccountPassword} type="text" placeholder='email adress'/>
                <div id="delete_account_email_error" style={{display:showDeleteAccountEmailError?"block":'none'}}><BiError/>Incorrect Email</div>
              </div>
                
            <br/>
             
              <div className="delete_account_email_password_div" >
                  Password : 
                  <input id="delete_account_password_input" className='change_password_tools_input_field' ref={DeleteAccountPassword}  onChange={(e)=>setNewAccountPassword(e.target.value)} value={NewAccountPassword} type="text" placeholder='Password'/>
                  <div id="delete_account_password_error" style={{display:showDeleteAccountPasswordError?"block":'none'}}><BiError/> Incorrect Password</div>
              </div>
            
          </div>
        
          {/* --------------- Delete Account Button  ----------------   */}
          
          <div>
          
            <button className='btn btn-danger' 
            id="delete_account_button"
            style={{display:changePassword?'none':'block',zIndex:2 ,right:showDeleteAccountDiv?null:"6%",bottom:showDeleteAccountDiv?"13%":'41%',left:showDeleteAccountDiv?"45%":null}} 
            onClick={showDeleteAccountDiv?DeleteAccountFinalFunction:DeleteFirstPress}>  
        
            <AiFillDelete size={29}/>
            Delete Account
            </button>
          
          </div>
          {/* --------------- Save Changes Button  ----------------   */}

          <button className='btn btn-dark' id="save_changes_buttton" style={{display:showDeleteAccountDiv?"none":'block'}} onClick={SaveChanges}> Save Changes </button>

          {/* --------------- Copyright Area  ----------------   */}

          <span id="header_account_details_copyright">Copyright &copy;  2021 Abdullah Rehan .All Rights Reserved </span>
     </div>
    </div>
    )
}

export default memo(AccountSettings)
