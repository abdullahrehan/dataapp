import React,{ useState,useContext, useRef,useEffect} from 'react'
import { ImCross } from 'react-icons/im';  
import { IoIosColorPalette } from 'react-icons/io';  
import background from '../../images/bac.jpg' 
import Context1 from '../HooksFiles/Context'
import axios from 'axios' 
import '../../css/ImageUpload.css'   
import '../../css/messagesUpload.css'    
 
import TextSelector from 'text-selection-react'

function MessagesUpload({textMessagesData,EffectOn,setEffectOn,oldHeading}) {

    const {state,dispatch}=useContext(Context1)

    const [messageHeading,setmessageHeading]=useState('')
    const [messageBody,setmessageBody]=useState("")
    const [detectChange,setdetectChange]=useState(false)
    const [showColors,setshowColors]=useState(false)
    const [ColorValue,setColorValue]=useState('white')
    const [Colorhighlights,setColorhighlights]=useState('orangered')
    const [defaultColorText,setdefaultColorText]=useState(true)
    const [StartIndex,setStartIndex]=useState()
    const [EndIndex,setEndIndex]=useState()
    
    // const [NotesData,setNotesData]=useState();
    const [NotesData,setNotesData]=useState();
    const [rescentColrs,setrescentColrs]=useState([])
    // const [rescentColrs,setrescentColrs]=useState([{name:"coral",top:0,default:false},{name:"orangered",top:20,default:false},{name:"cadetblue",top:40,default:true},{name:"yellow",top:60,default:false},{name:"red",top:80,default:false}])
    const colorsList=useState(['coral','orange','blue','yellow','red','teal','green','white','maroon','black'])
    const [defaultColor,setdefaultColor]=useState('white')
    const messagesTextarea=useRef()
    const messagesTextareaHeading=useRef()
    const colors=useRef([])
    const spell=useRef()

    const previewText=state.messages!==null?true:false
    const heading=messagesTextareaHeading.current!==undefined ? messagesTextareaHeading.current.value :null
    const body=messagesTextarea.current!==undefined ? messagesTextarea.current.value :null
    const currentFolder=state.currentFolder
    const oldBody=state.messages!==null ? state.messages.body :null
    const oldheading=state.messages!==null ? state.messages.heading :null
    const messageIndex=textMessagesData.findIndex(data=>data===state.messages)
    const shape = document.querySelector(".left");

  
    // let recentcolorClon=...rescentColrs/


   const uploadMessage =()=>{
    
    axios.post('/uploadTxt',
    {
        email:state.accDataVerify.email,
        heading:messageHeading,
        body:messagesTextarea.current.innerHTML,
        color:ColorValue,
        folder:state.currentFolder
    })

  
    dispatch({type:"setonEffect",setonEffect:state.onEffect+1})

    setmessageHeading('')
    
    setmessageBody('') 
console.log(messagesTextarea.current.innerHTML)
}
 

// --------------- Save the updated text ---------------//

const saveMessage=()=>{
    // if(detectChange==state.messages.heading){ 
    
    axios.post("/txt/update",
    {email:state.accDataVerify.email,
    heading:messagesTextareaHeading.current.value,
    body:messagesTextarea.current.value,
    currentFolder:state.currentFolder,
    oldBody:state.messages.body,
    oldheading:oldHeading})

    dispatch({type:"setonEffect",setonEffect:state.onEffect+1})
    setEffectOn(EffectOn+1)
    dispatch({type:"setmessages",setmessages:null})

    
}
 
    const crossTextEditor=()=>{

        dispatch({type:"setmessages",setmessages:null});                             
        document.getElementById('text_body').value='';
        setmessageBody('');
        setmessageHeading('')
        dispatch({type:"setreadOnlyText",readOnlyText:!state.readOnlyText})  
        
    }
    const changeTextEditorValue=(e)=>{
    
        state.messages!==null ?
        dispatch({type:"setmessages",setmessages:e.target.value}):
        setmessageBody(e.target.value)
    
    }
    console.log(rescentColrs)

    const setColorValueFunc=(datas)=>{

        const rescentColrsClon=[...rescentColrs]
        const findColor=rescentColrs.find(data=>data.name===datas)
        
        console.log(findColor)
        console.log(rescentColrsClon,datas)   
        if(findColor===undefined){ 
            if(rescentColrs.length<=4){
                
        rescentColrsClon.push({name:datas,top:20,default:false})
            setrescentColrs(rescentColrsClon)}
            else{
                rescentColrsClon.shift()
                
        rescentColrsClon.push({name:datas,top:20,default:false})
                setrescentColrs(rescentColrsClon)
            }
        }        
        // else{setrescentColrs(rescentColrsClon)}/
        setColorValue(datas)
    }

    if(spell.current!==undefined){

        spell.current.spellChecker.removeUnderline = false;
    
    }

    if(document.querySelector(".circularScrollbox")!==null){

        document.querySelector(".circularScrollbox").onscroll=function() {
        shape.style.marginTop = this.scrollTop+"px"}
        
    }


const div = document.getElementById("text_body");

const highlight=()=> {
    if(div){

  const words = div.textContent.split(" ");
  
  div.innerHTML = "";
  words.forEach((word,index) => {
    const span = div.appendChild(document.createElement('span'));
    span.textContent = word + ' ';

    span.classList.add(ColorValue)
    span.classList.add(`span${index}`)
    
  });
}
}
; 
window.onload=function(){ 
console.log(window.getSelection(),'asd')
div.addEventListener("blur", highlight);

}
 

    return (
     
            <div id='messagesUpload_main_div' style={{position:'relative'}}   >
               <div style={{position:"absolute",width:'100%',height:"100%",zIndex:1}}>
                   <img src={background} width="100%" height="100%"/>
                </div>
               
                    <div id='Showing_upload_text_div' >
                                
                        <div id='Showing_upload_message_div_heading' >
                            <label id="Showing_upload_text_div_heading_text"> 
                                Messages
                            </label>
                        </div>
                                
                        
                           
                    <div id="text-Messages-preview-container-Main">
                       
                        <div id="text-Messages-preview-container" >
                         
                            
                           <div id="text_Messages_header">
                               
                                <textarea id="text_heading"
                                ref={spell}
                                spellCheck={false} 
                                placeholder="Heading"
                                defaultValue= {state.messages!==null ?state.messages.heading:messageHeading}
                                readOnly={state.messages===null ? false : state.readOnlyText}
                                ref={messagesTextareaHeading}
                                onChange={(e)=>{setmessageHeading(e.target.value)}}/>                       

                                <div id="cross_btn">
                               
                                    <ImCross color="white"  size={24}  onClick={crossTextEditor}/>
                               
                                </div>
                            
                            </div>    
                           
                            <div 
                            contentEditable={true}
                            dangerouslySetInnerHTML={{
                                __html:state.messages!==null ?state.messages.body :messageBody}}
                            id="text_body"  
                            placeholder={"Body"}
                            value={state.messages!==null ?state.messages.body :messageBody}
                            style={{color:state.messages!==null ?state.messages.color :ColorValue}}
                            onChange={(e)=>changeTextEditorValue(e)}
                            readOnly={state.messages===null ? false : state.readOnlyText}
                            ref={messagesTextarea}
                            contentEditable={true}
                            // style={{color:ColorValue}
                        >
                                </div>
                            
                     
                        </div>
                      
                       
                        <div id="text_Styling_Main_Div" style={{display:"block"}}>

                            <div style={{position:"relative",width:"100%",height:"100%"}}>
                                
                                <div id={showColors?"Color_icon_div":"Color_icon_div2"}>
                                
                                    <div id="color_icon" onClick={()=>setshowColors(!showColors)}><IoIosColorPalette color={'white'} size={45}/></div>
                                
                                </div>
                                
                                <div class={'circularScrollbox'} style={{display:showColors ? 'block' : 'none'}}>
                                
                                    <div class="left"></div>

                                    <ol class='scrollboxList'>
                                       
                                        {colorsList[0].map(data=>
                                    
                                            <li className="vjListItem rellax" onClick={()=>setColorValueFunc(data)}>
                                            
                                                {data}
                                            
                                                <span style={{backgroundColor:data,width:"15%"}} className={'color-circle'}></span>
                                            
                                            </li>
                                            
                                       )}
                                    
                                    </ol>
                                
                                </div>

                            </div>

                            <div id="saved_Colors">
                                
                                {rescentColrs.map((data,index)=>
                                     <div className="rescentColrs_Maindiv" >
                                    {/* onMouseLeave={()=>{colors.current[index].style.display="none";setdefaultColorText(true)}} */}
                                        <span className="saved_colors_circle color-circle" onClick={()=>setColorValue(data.name)}  style={{backgroundColor:data.name,position:'absolute',cursor:"pointer",height:"100%"}}/>
                                        {/* onMouseOver={()=>data.default?null:colors.current[index]?colors.current[index].style.display="block":null} */}
                                        <span id="setAsDefault_color" ref={(element)=>colors.current.push(element)} style={{display:"none",height:"100%"}}>
                                          
                                                set as Default

                                                <input className="setAsDefault_color_checkbox" type='checkbox' onChange={
                                                    (e)=>{
                                                    if(e.target.value==='on'){
                                                    let recentcolorClon=[...rescentColrs]

                                                    recentcolorClon[recentcolorClon.findIndex(data=>data.default===true)].default=false;
                                                    recentcolorClon[index].default=true
                                                    console.log(recentcolorClon.findIndex(data=>data.default===true))
                                                    setdefaultColorText(false)
                                                    setrescentColrs(recentcolorClon)    
                                                    
                                                    }
                                                    
                                                }} />
                                        </span>
                                        
                                       {/* <span id="defaultColor" style={{top:`${data.top}%`,display:defaultColorText && data.default ? "block" : "none"}}> Default </span> */}
                                    
                                    </div>
                                )}

                            

                            </div>

                            <div id="upload_btn"  style={{display: messageHeading!=='' || messageBody!=='' || (state.messages!==null &&  state.readOnlyText===false)? 'block':'block'}}>
                           
                                <button className="btn btn-dark" id="message_submit_btn" style={{display: heading!==oldheading || body!==oldBody ? 'block':'none'}} onClick={previewText ? saveMessage :uploadMessage}>
                                    
                                    {previewText ? "Save" :"Submit"}
                            
                                </button> 
                            
                            </div>
                           
                        </div> 
                       
                                                 
                            <TextSelector
                            events={[
                            {
                            text: 'Colors',
                            handler: (html,text)=>{console.log(window.getSelection().toString())}
                            
                            }
                            ]}
                            color={'orangered'}
                            colorText={true}
                            />
                        </div>
                    </div>

                 
        </div>
    )
}

export default MessagesUpload


 