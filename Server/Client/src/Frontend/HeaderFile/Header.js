import React,{useState,useContext,useEffect} from 'react'
import {ImCross} from 'react-icons/im';
import {HiOutlineLogout} from 'react-icons/hi'; 
import { Redirect, Route, Switch  } from 'react-router-dom';
import {IoMdSettings} from 'react-icons/io'; 
import {MdAccountCircle} from 'react-icons/md'; 
import {Link} from 'react-router-dom';
import AccountSettings from '../AdditionalFiles/AccountSettings'
import Context  from '../HooksFiles/Context'
import UserImg from '../../images/user2.png'
import axios from 'axios'
import '../../css/header.css'

function Header() {

    const [showConfirmLogout,setshowConfirmLogout]=useState(false)
  
    const [logOut,setlogOut]=useState(false)
    const [acoountImageRender,setacoountImageRender]=useState(0)
    const [settingsCard,setsettingsCard]=useState(false)
    const {state,dispatch}=useContext(Context)
    const username=state.accDataVerify.username
    const ProfileImage=state.accDataVerify.profile
    const [profilepic,setprofilepic]=useState() 

    // ------------------------- Log Out Account  -------------------------//
 
    const logoutAccount=()=>{
      axios.get("/logouts", { withCredentials: 'true' }).then(res=>{console.log(res.data);
      })
    setshowConfirmLogout(false)
     
    }
  


    const logout=()=>{setshowConfirmLogout(true)}

    const profile=()=>{
        
      axios.post("/ProfilePicture",{email:state.accDataVerify.email})
      .then(res=>{setprofilepic(res.data.url)})
    
    }
    
    useEffect(() => {
      profile()
      
    }, [acoountImageRender])

{/*----------------------------------------- Html Section ---------------------------------------------------*/}

    return (
        <>
          <header id='header'>
             
          {/*  ------------------------- Redirect to Main on removing Cookie  ------------------------- */}

              <Switch>
                <Route exact path="/">
                  {logOut ? <Redirect to="/" /> : null}
                </Route>
              </Switch>
      <div style={{flex:.1}}></div>
          {/*  ------------------------- Settings Section  ------------------------- */}

              <div id='header_username' style={{width:"16%",height:'85%'}}>
              <div id="header_username_img_div" >
              {profilepic!=='' ?
              <img  style={{width:"100%",height:"100%"}} src={profilepic}/> :
              <MdAccountCircle size={38} />   
               }
                </div>
              <div id="header_username_name_div">
                {username ? username:'User'}
              </div>
             
              
              </div>
              
              <div id='heading'>
                Share your Data
              </div>
              <div style={{display:"flex",flex:2,justifyContent:'space-around',alignItems:"center"}}>
              <div id='header_aboutUs'>
                <Link to='/aboutus'>
                  {/* <FaUserSecret size={33}/> */}
                  <img src={UserImg} alt="About Us - Us Icon Png White @clipartmax.com" style={{width:"65%",height:"8%"}}/>
                </Link>
              </div>
              
              <div id='header_settings'>
                <IoMdSettings size={33} onClick={()=>{setsettingsCard(true)}}/>
              </div>
              
              <button id='header_logout_btn' className="btn btn-dark" onClick={logout}>
                Log Out
              </button>
              </div>
          </header>
               
          <div id='confirm_logout_background_fade_div' style={{display:showConfirmLogout ?"block":"none"}}>
              <div id='confirm_logout_div' >
                  <a id='confirm_logout_cross' style={{cursor:'pointer'}} onClick={()=>{return setshowConfirmLogout(false)}}><ImCross/></a>
                  <a id='confirm_logout_text'>Sir/Mam ! are you confirm to logOut from this site  <HiOutlineLogout id='confirm_logout_icon' size={119}/></a>
                  <Link to='/logout'  id='confirm_logout_btn' className="btn btn-dark" onClick={logoutAccount}>Confirm Log Out</Link>
              </div>
          </div>
          {state.accDataVerify.imagefolder!==undefined ?
        
      <AccountSettings 
      settingsCard={settingsCard}
      setsettingsCard={value=>setsettingsCard(value)}
      acoountImageRender={acoountImageRender}
      setacoountImageRender={(value)=>setacoountImageRender(value)}
      profilepic={profilepic}
      setprofilepic={(value)=>setprofilepic(value)}
      />

:null}
        </>
    )
}

export default Header
