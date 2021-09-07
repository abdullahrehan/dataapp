import React, {useEffect,useContext,useState } from 'react'
import { Redirect, Route, Switch  } from 'react-router-dom';
import SignIn  from '../SignInFiles/SignIn'
import Default from '../AsideDataFiles/DefaultTab'
import Images from '../AsideDataFiles/Images'
import NotFound from '../AdditionalFiles/NotFound'
import Context  from '../HooksFiles/Context'
import Videos  from '../AsideDataFiles/TextData'
import Header from '../HeaderFile/Header'
import Files from '../AsideDataFiles/Files' 
import AboutUs from '../AdditionalFiles/AboutUs' 
import Messages from '../AsideDataFiles/Messages' 
import Notes from '../AsideDataFiles/Notes' 
import LogOut from '../AsideDataFiles/LogOut' 
import {IoMdSettings} from 'react-icons/io'; 
import { useImmer } from "use-immer";
import axios from 'axios'
import  '../../css/main.css'

function Main() {
   
  const {state,dispatch}=useContext(Context)
  const [loading,setloading]=useState(true)
//------------------------------------------------------Login Through Cookies--------------------------------------------------------------
   
  const jwtfunction=()=>{ 
    
      axios(`/jwt`, { withCredentials: true })
      .then(res=>{
        if (res.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            res.status);
          return;
        }
        else{
          console.log(res.status) ;return res.data[0]
      }
      
      })
      .then((res2)=>res2!==undefined?
      dispatch({type:"setAccountData",accData:res2}):null)
    

  }

 
  const setTabs=()=>{
  
   if(window.location.pathname==="/txt"){
         dispatch({type:"setcurrentTab",setcurrentTab:"messages"})
  }
  else if(window.location.pathname==="/textDoc"){
         dispatch({type:"setcurrentTab",setcurrentTab:"textDoc"})
  }
  else{
    dispatch({type:"setcurrentTab",setcurrentTab:"imagefolder"})
  }
}


//------------------------------------------------------UseEffect Hook------------------------------------------------------------------------
 

 
    useEffect(() => {
    
      jwtfunction()
      setTabs()
   
   },[])


    
// console.log(state.accDataVerify)
//------------------------------------------------------Html Section----------------------------------------------------------------------------

const preloaderFunction=()=>{
  if(!loading){
setTimeout(() => {
  document.getElementById('loading_Maindiv').style.display='none'
}, 500);
  }
}

useEffect(() => {
  preloaderFunction()
}, [loading])

    return (
    <div>

{/* //------------------------------Preloader Section--------------------------------- */}
  
      <div id="loading_Maindiv" style={{opacity:loading?100:0,transition:'1s'}}>
        <div id='loading_Centered_Div'>
          <div id="loading_loader_div">
            <IoMdSettings id="loading_loader1" size={55} color={'white'}/>
            <IoMdSettings id="loading_loader2" size={55} color={'white'}/>
            <IoMdSettings id="loading_loader3" size={55} color={'white'}/>
          </div>
          <span id="loading_textArea">Page is Loading . . . .</span>
        </div>
      </div>

{/* //------------------------------Main Section--------------------------------- */}

      <div id="main_div" onLoad={()=>setloading(false)}>
    
        <Switch>
            <Route exact path='/' component={SignIn}/>
            {/* <Route component={NotFound}/> */}
        </Switch>  




{/*-------------------------------------------- This Code Area will run after the excecution of JWTFuction----------------------------------*/}
 
{state.accDataVerify.imagefolder!==undefined ?
        
        // This Condition Check Weather The SignIN Through Google is Verified               
       state.accDataVerify.email_verified===true || state.accDataVerify.username!==undefined ?   
       
        <>
      <div id='Header'><Header/></div> 
         
        
        
          <div id='AsideData'>
           
      
      {/*----------------------------------------- When The user Authenticated .Following Urls are given to the user ------------------------------*/}
            <Switch>
                <Route exact path="/">
                {state.accDataVerify.username!==undefined ? <Redirect to="/img" />  : <Redirect to="/" />}
                </Route>
                <Route exact path='/video'component={Videos}/>
                <Route exact path='/file' component={Files}/>
                <Route exact path='/img'  component={Images}/>
                <Route exact path='/pdf'  component={Default}/>
                <Route exact path='/word' component={Default}/>
                <Route exact path='/txt'  component={Messages}/>
                <Route exact path='/textDoc'  component={Notes}/>
                <Route exact path='/aboutus'  component={AboutUs}/>
                <Route exact path='/logout'  component={LogOut}/>
                <Route component={NotFound}/>
            </Switch>
          </div>
        </>
       :null
      :null}  






  </div>
  </div>

)}

export default Main




