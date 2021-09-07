import React,{useState,useContext,useRef} from 'react'
import {BsFillEyeFill as Eye} from "react-icons/bs";
import {BsFillEyeSlashFill as Eyecross} from "react-icons/bs";
import {IoMdArrowRoundBack as Back} from "react-icons/io";
import {RiAccountPinCircleFill} from "react-icons/ri";
import {BiError} from "react-icons/bi";
import axios from 'axios'
import back from '../../images/g.jpg';
import Const from '../../images/fairy-tale-wonderful-life-popular-quotes-wallpaper-preview.jpg';
import sign from '../../images/signs.png'
import Context from '../HooksFiles/Context'
import {MdAccountCircle} from 'react-icons/md'; 
import validator from 'email-validator'
import usePasswordValidator from 'react-use-password-validator'
import '../../css/SignIn.css'
  

    function SignIn() { 
//----------------------------------------------------------------Assigning States-------------------------------------------------------------

        const {state,dispatch}=useContext(Context)  
        let [codeInputs,setcodeInputs]=useState({inputOne:"",inputTwo:"",inputThree:"",inputFour:""})
        let [username,setusername]=useState('')
        let [useremail,setuseremail]=useState('')
        let [userpassword,setuserpassword]=useState('')
        let [ isValid, setIsValid ] = usePasswordValidator({
            digits: 2,
            lowercase: true,
            uppercase: 1,
            spaces: false
          })
        let [loginuseremail,setloginuseremail]=useState('')
        let [loginuserpassword,setloginuserpassword]=useState('')
        let [LoginDemoMessage,setLoginDemoMessage]=useState(false)
        let [signinErrorsEmailDBCheck,setsigninErrorsEmailDBCheck]=useState(false)
        let [passwordIncorrectPageError,setpasswordIncorrectPageError]=useState(false)

        let [inCompleteCodeError,setinCompleteCodeError]=useState(false)
        let [signupmessage,setsignupmessage]=useState()
        let [showpassword,setshowpassword]=useState(false)
        let [confirmCode,setconfirmCode]=useState(false)
        let [login,setlogin]=useState(true)
        let [Sigin,setsignin]=useState(true)
          const[passwordIncorrectDiv,setpasswordIncorrectDiv]=useState(false)
        // ------------------------- States for SignIn Errors -------------------------// 

        let [allFieldMandatorySigninErrror,setallFieldMandatorySigninErrror]=useState(false)
        let [signinErrorsUsername,setsigninErrorsUsername]=useState(false)
        let [signinErrorsEmail,setsigninErrorsEmail]=useState(false)
        let [signinErrorsPassword,setsigninErrorsPassword]=useState(false)

        // ------------------------- States for LogIn Errors  -------------------------//
        
        let [logininErrorsEmail,setlogininErrorsEmail]=useState(false)
        let [logininErrorsPassword,setlogininErrorsPassword]=useState(false)
        let [allFieldMandatoryLoginErrror,setallFieldMandatoryLoginErrror]=useState(false)
        let [passwordWrongUsername,setpasswordWrongUsername]=useState(false)
        let [passwordWrongUserImg,setpasswordWrongUserImg]=useState(false)
        const confirmation_code_array=[1,2,3,4]
        // ------------------------- Confirmation Code  -------------------------//

        const Confirmation_Code=codeInputs.inputOne+codeInputs.inputTwo+codeInputs.inputThree+codeInputs.inputFour
        
        const Signinv= {display: login ? "block": "none" , width:"100%", height:"53%" ,cursor: "pointer"}
        const Loginv = {display: Sigin ? "none" : "block", width:"100%", height:"53%" ,cursor: "pointer"}

        const greeting=useRef()
        const SignInPart=useRef()
        const signInInput=useRef()
//---------------------------------------------------------------- Assigning States -------------------------------------------------------------

    // ------------------------- Sign Up button   -------------------------//
    
    const firstSignupbtn=async()=>{
        
        const signinFieldsError=!signinErrorsUsername && !signinErrorsEmail  && !signinErrorsPassword
            
            if(username=='' || useremail=='' || userpassword==''){
          
                setallFieldMandatorySigninErrror(true)
               
            }
            else {
                setallFieldMandatorySigninErrror(false)

                if (!validator.validate(useremail)){
                    setsigninErrorsEmail(true)
                }
                else{
                    setsigninErrorsEmail(false)
                    if(!isValid){setsigninErrorsPassword(true)}
                    else {
                        setsigninErrorsPassword(false)
                        if(!allFieldMandatorySigninErrror && !signinErrorsEmail && !signinErrorsPassword){
              
                      
                     await axios.post(`http://localhost:2000/emailverify`,{email:useremail})
                            .then((res)=>{
                                if(res.data==='available'){
                                    setsigninErrorsEmailDBCheck(false)
                                    axios.post(`http://localhost:2000/nameverify`,{name:username})
                                    .then((res)=>{
                                    
                                    if(res.data==='available'){
                                        setsigninErrorsUsername(false)
                                  
                                        
                                    if(!signinErrorsEmailDBCheck && !signinErrorsUsername){
                                        
                                        setsigninErrorsPassword(false)
                                        // if(!allFieldMandatorySigninErrror && signinFieldsError){
                                            axios.post(`http://localhost:2000/user/sendConfirmation`,{name:username}, { withCredentials: true })
                                            .then(res=>{setsignupmessage(res.data)})    
                                            setconfirmCode(true)
                                        // }
                                
                                }
                                  
                                    }
                                
                                    else{
                                        setsigninErrorsUsername(true)
                                    }
                                })
                                }
                                else {

                                setsigninErrorsEmailDBCheck(true)
                           
                              
                                
                                }
                            
                           
                            })
                            
                           
                     
                                
                            
                                 
                          
                           
                            
                          
                    }   

                        // if(!signinErrorsEmailDBCheck && !signinErrorsUsername){
                        //     // const fun=()=>{
                        //         setsigninErrorsPassword(false)
                        //         if(!allFieldMandatorySigninErrror && signinFieldsError){
                        //             axios.post(`http://localhost:2000/user/sendConfirmation`,{name:username}, { withCredentials: true })
                        //             .then(res=>{setsignupmessage(res.data)})    
                        //             setconfirmCode(true)
                        //         }
                        // // }
                        // }

                    }
                }
            }
        
    

    }
 
    // ------------------------- Confirm Sign Up button   -------------------------//
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
    const secoundSignupbtn=()=>{
        
        const userdetails={name:username,email:useremail,password:userpassword,confirmation_Code:Confirmation_Code}

        axios.post(`http://localhost:2000/user/SignIn`,userdetails, { withCredentials: true })
        .then(res=>{setsignupmessage(res.data);
        
        if(res.data=='Data Inserted'){
        
            axios.post(`http://localhost:2000/setMainfolder`,{email:useremail,name:username})
            // axios.post(`http://localhost:2000/user/signupaccess`,{email:useremail}).then(res=>{console.log(res.data,'response coming');dispatch({type:"setAccountData",accData:res.data})})
            jwtfunction()
        }
        console.log(res.data);})
        
        setconfirmCode(true)
        if(Confirmation_Code.length!==4){setinCompleteCodeError(true)}else{ setinCompleteCodeError(false)} 
       

        
    }

    // ------------------------- Log In button   -------------------------//

    const loginbtn=()=>{
            
        if(loginuseremail=='' || loginuserpassword==''){setallFieldMandatoryLoginErrror(true)}
       
        else{ 
        setallFieldMandatoryLoginErrror(false)
        loginuseremail.length<3 ? setlogininErrorsEmail(true) :  setlogininErrorsEmail(false)         
        loginuserpassword.length<3 ? setlogininErrorsPassword(true) :setlogininErrorsPassword(false)
        }
      
        const userdetailslogin={email:loginuseremail,password:loginuserpassword}
        
        axios.post(`http://localhost:2000/user/login`,userdetailslogin, { withCredentials: true })
        
        .then(res=>{
        
            if(res.data.msg=='invalid email'){
                setlogininErrorsEmail(true)
            }
            else if(res.data.msg=='password incorrect'){
                setpasswordIncorrectDiv(true)
                setlogininErrorsPassword(true)
                setloginuserpassword('')
                setpasswordWrongUsername(res.data.data[0])
                setpasswordWrongUserImg(res.data.data[1].url)
                setpasswordIncorrectPageError(true)
                console.log(res.data.data[0],res.data.data[1].url)
            }
            else{
                dispatch({type:"setAccountData",accData:res.data});
            }
            
            // console.log(res.data);
        })        
        
    }

    // ------------------------- Sign In With Demo Account   -------------------------//

    const DemoAccount=()=>{   
        console.log('demo')
        
        SignInPart.current.style.display='none'
        setLoginDemoMessage(true)
        const userdetailslogin={email:"Demo",password:"Demo"}   
        axios.post(`/user/login`,userdetailslogin, { withCredentials: true })
        .then(res=>!LoginDemoMessage ? dispatch({type:"setAccountData",accData:res.data}):null )     
        
        setTimeout(() => {
            setLoginDemoMessage(false)
            setTimeout(() => {
                   
            }, 1000);
        }, 4000);
   
          
    }

     {/*------------------------------------------------------------ Html Section ------------------------------------------------------------*/}
  
        return (
            <div style={{display:state.accDataVerify.email_verified===true || state.accDataVerify.username!==undefined  ? "none" : "block"}}>
             

                 <header id='header' style={{height:"11vh",position:'absolute',zIndex:2}}>
             
          {/*  ------------------------- Redirect to Main on removing Cookie  ------------------------- */}

             
         
              <div id='header_username' style={{width:"16%",height:'85%'}}>
           
             
              
              </div>
              
              <div id='heading'>
                Share your Data
              </div>
              <div style={{display:"flex",flex:2,justifyContent:'space-around',alignItems:"center"}}>
              </div>
          </header>

            <img id="blured_background_image" src={back}  alt={"Image loading"}/>

            <div className='Signin-page' >

            <div className="siginfoam" style={{display: confirmCode? 'none' : 'block',zIndex:6}} >
         
            <div ref={SignInPart} style={{width:'100%',height:"100%",position:"inherit",zIndex:1,display: passwordIncorrectDiv ? 'none' : 'block'}}>
            <div className="signinfoam-divno1">
                 
            </div>
    
            <div className="signinfoam-divno2">
                <button className='btn btn-dark foambtn' >
                   <span>Welcome to DataSharing </span>
                </button>
            </div>
    
            <div className="signinfoam-divno3">
                <div className='btn btn-dark foambtn'  onClick={DemoAccount}>
                        <RiAccountPinCircleFill size={32} className="ggl-icon" />Demo Account
                </div>
            </div>
    
            <div className="signinfoam-divno4">
               
                "SignIn with Demo Account as Login System is <wbr/>in testing phase"
            </div>
            
            <div className="signinfoam-divno5"></div>
            
            <div className="signinfoam-divno6">
                <div className="signin-title" id="signin-title" onClick={()=>{setlogin(true);setsignin(true)}} style={{ borderBottom: login? '2px solid white' :'0px solid black', transition:'0.2s'}}>Sign In</div>
                <div className="login-title" id="login-title" onClick={()=>{setsignin(false);setlogin(false)}}  style={{ borderBottom: Sigin? '0px solid black' :'2px solid white', transition:'.2s'}}> Log In</div>
            </div>
               
            <div style={Signinv}  id='signin'>
               
                <div className="signinfoam-divno7"><input  type="text" className="inputstyl" placeholder="First Name"  value={username} onChange={(e)=>setusername(e.target.value)} minLength={3} maxLength={10}/>
                <div id='signin_errors_name' style={{display: signinErrorsUsername ? 'block' : "none" }}><BiError/> Name is already taken !</div></div>
                <div className="signinfoam-divno8"><input  type="text" className="inputstyl2"   placeholder="Email"   value={useremail} onChange={(e)=>setuseremail(e.target.value)}/>
                <div id='signin_errors_email' style={{display: signinErrorsEmail ? 'block' : "none" }}><BiError className='signin_error_icon'/> Email Must Valid !</div>
                <div id='signin_errors_email' style={{display: signinErrorsEmailDBCheck ? 'block' : "none" }}><BiError className='signin_error_icon'/> Account already available !</div></div>
                <div className="signinfoam-divno9"><input  type={showpassword ? "text" : "password" } className="inputstyl3" placeholder="Password" ref={signInInput} value={userpassword} onChange={(e)=>{setuserpassword(e.target.value);setIsValid(e.target.value)}} minLength={8} maxLength={20}/>
                <div id='signin_errors_password' style={{display: signinErrorsPassword ? 'block' : "none" }}><BiError id='signin_error_icon_password' className='signin_error_icon'/> <span style={{position:'absolute',left:"10%",top:"4%"}}>Password must be a combination of digits (atleast 2) , lower and uppercase  letters without any spaces</span></div>
                <div id='show_password_icon'  onClick={()=> {return setshowpassword(!showpassword)}}>{showpassword ? <Eyecross/> :<Eye/>}</div></div>
                <div className="signinfoam-divno10"><a className='receivemail' style={{marginTop:'4%',display:allFieldMandatorySigninErrror?'none':'block'}}><input type='checkbox' /> Receive welcome emails{signupmessage}</a>
                <div id='signin_fill_all_fields_error' style={{display: allFieldMandatorySigninErrror ? 'block' : "none" }}><BiError/> All the fields are mandatory !</div>
                </div>
                
                <div className="signinfoam-divno11"><button className='btn btn-dark foambtn2' onClick={firstSignupbtn} >Sign Up</button></div>
                <div id='signin_errors'>
                
                
               
                </div>
            </div>
    
            <div style={Loginv} id='login' >
                <div className="signinfoam-divno12"><input type="text" className="inputstyl" placeholder="Email" value={loginuseremail}  onChange={(e)=>setloginuseremail(e.target.value)}/>
                <div id='login_errors_email' style={{display: logininErrorsEmail ? 'block' : "none" }}><BiError/> Email does not Match !</div></div>
                <div className="signinfoam-divno13"><input type={showpassword ? "text" : "password" } className="inputstyl" placeholder="Password" value={loginuserpassword} onChange={(e)=>setloginuserpassword(e.target.value)}/>
                <div id='login_errors_password' style={{display: logininErrorsPassword ? 'block' : "none" }}><BiError/>Password does not matched</div>
                <div id='show_password_icon_login'  onClick={()=> {return setshowpassword(!showpassword)}}>{showpassword ? <Eyecross/> :<Eye/>}</div></div>
                <div className="signinfoam-divno14"><a href="#" style={{color:'white',borderBottom:'1 px solid white'}}>Forget Password ?</a>
                <div id='login_fill_all_fields_error' style={{display: allFieldMandatoryLoginErrror ? 'block' : "none" }}><BiError/> All the fields are mandatory !</div>
                </div>
                <div className="signinfoam-divno15"><button className='btn btn-dark foambtn2'  onClick={loginbtn}>Log In</button></div>
                </div>
                </div>
            
                <div  id='DemoAccountDiv' ref={greeting} style={{opacity:LoginDemoMessage?100:0,transition:".5s",zIndex:LoginDemoMessage?1:0}}>
                
                    <div id="accountIcon">
                   
                        <MdAccountCircle size={210}/>
                        <h4 style={{paddingLeft:'11%'}}>Hello Sir/Mam!</h4>
                   
                    </div>
                   
                    <div id='welcomeLine'>
                    
                        Welcome to the <b>DataSharing App</b>
                
                    </div>
                    
                    <div id='feedbackLine'>
                    
                        Kindly send us your feed back regerding this Website
                    
                    </div>
                    
                    <div style={{position:"relative",top:"1%",left:"1%"}}>
                    
                        <h4>From</h4>
                        <img src={sign} />
                    
                    </div>
                
                </div>
                 
            <div style={{display: passwordIncorrectDiv  ? 'block' : 'none'}} id='passwordIncorrectDiv'>
            <Back onClick={()=>{return setpasswordIncorrectDiv(false)}} size={30} style={{cursor:"pointer",position:'absolute'}}/>
            <img src={passwordWrongUserImg} id="passwordIncorrectUserImg"/>
            <span id='passwordIncorrectText'>Hello {passwordWrongUsername} ! </span>
            <span id="passwordIncorrectTextPI" style={{display:passwordIncorrectPageError?"block":"none"}}><br/> Password didn't match </span>
            <div className="passwordIncorrectPasswordDiv"><input type={showpassword ? "text" : "password" } className="passwordIncorrectPasswordInput" placeholder="Password" value={loginuserpassword} onChange={(e)=>{setloginuserpassword(e.target.value);setpasswordIncorrectPageError(false)}}/>
            <div id='show_password_icon_login'  onClick={()=> {return setshowpassword(!showpassword)}} style={{bottom:'55%',cursor:"pointer"}}>{showpassword ? <Eyecross/> :<Eye/>}</div>
            </div>
            <button className="btn btn-dark" id="passwordIncorrectLogonBtn" onClick={loginbtn}>Login</button>
            <a href='/' id='passwordIncorrectForgetText'>Forget Password</a>
            </div>

                </div>

            <div id='confirmation_code' style={{display:confirmCode ? 'block' : 'none'}}>
            <Back onClick={()=>{return setconfirmCode(false)}} size={30} style={{cursor:"pointer"}}/>
           
            <div id='confirmation_code_header_text' >
            <a style={{fontSize:'1.2em'}}>We have sent an activation code on your email</a>
            <a > Write the received code in the section below </a>
            </div>

             <div id='confirmation_code_inputs_maindiv'>
            <input type='text'id='confirmation_code_input1' maxLength={1} onChange={(e)=>{return setcodeInputs({...codeInputs,inputOne:e.target.value})}}/>
            <input type='text'id='confirmation_code_input1' maxLength={1} onChange={(e)=>{return setcodeInputs({...codeInputs,inputTwo:e.target.value})}}/>
            <input type='text'id='confirmation_code_input1' maxLength={1} onChange={(e)=>{return setcodeInputs({...codeInputs,inputThree:e.target.value})}}/>
            <input type='text'id='confirmation_code_input1' maxLength={1} onChange={(e)=>{return setcodeInputs({...codeInputs,inputFour:e.target.value})}}/>
            </div> 
           
            <button id='confirmation_code_submit_btn' className='btn btn-dark' onClick={secoundSignupbtn} >Submit</button>
            <div id='confirmation_code_incomplete_error' style={{display: inCompleteCodeError ? "block" : "none"}}><BiError/>  All the filds Are Mandatory</div>
            <div id='confirmation_code_resend_email_text'>If you haven't received any email yet .<br/>Click this Link :<a href='/'> Resend Email </a> </div>
       
            
            </div>
            
           
           

            </div>

          

            
            </div>
        )
    }
    
    export default SignIn
    