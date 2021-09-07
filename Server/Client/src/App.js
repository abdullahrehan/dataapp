import React,{useState} from 'react'
import Main from './Frontend/MainFile/Main'
import Context from './Frontend/HooksFiles/Context'
import Reducer from './Frontend/HooksFiles/Reducer'
import { useImmerReducer } from "use-immer";
import Gif from './images/const.png'
import './css/App.css'
import {Circle} from 'rc-progress'


function App() {
  const [state,dispatch]=useImmerReducer(Reducer,
    {
      serverUrl:'http://localhost:2000',
      onEffect:0,
      url:null,
      image:null,
      selectMultipleimages:false,
      pdf:null,
      notes:null,
      messages:null,
      viewAllImages:false,
      showFoldersDiv:false,
      showHalfFoldersDiv:false,
      editNotes:true,
      readOnlyText:true,
      accDataVerify:[],
      currentFolder:'MainFolder',
      currentTab:'imagefolder',
      pix:window.innerWidth>=320 && window.innerWidth<=768,
      loading:true

    })




return (
  <>
<div id='App_mainDiv'  >

<div >
    <Context.Provider value={{state,dispatch}}>
       <Main  /> 
    </Context.Provider>     
    </div>
    </div>
<div id="resolution_Message">
  <img src={Gif} id="resolution_Message_Image"/>
  <div id='resolution_Message_Text'>
  <span>Unfortunately ! This Area of Website is under under Construction<br/></span>
  <span>Your Screen Size Must Be Greater than 1300px</span> 
  </div>   
  
 </div>
 </>
 
)}

export default App









// onKeyUp={()=>settextarray(text.split(" ").map(data=>{return({value:data,color:'black'})}))}

// const [text,setText]=useState('')
// const [selectedtext,setselectedText]=useState('')
// const [textarray,settextarray]=useState([])
// const [textColor,settextColor]=useState('black')

// const btn=(value)=>{
// // if(setselectedText(window.getSelection().toString())!==null){
// // const index=textarray.findIndex(data=>data.value===window.getSelection().toString())
// // document.getElementById(`textIndex${index}`).style.color=value
// // }
// }



  {/* <div >
    <Context.Provider value={{state,dispatch}}>
       <Main  /> 
    </Context.Provider>     
    </div>
    </div>
<div id="resolution_Message">
  <img src={Gif} id="resolution_Message_Image"/>
  <div id='resolution_Message_Text'>
  <span>Unfortunately ! This Area of Website is under under Construction<br/></span>
  <span>Your Screen Size Must Be Greater than 1300px</span> 
  </div>    */}

  // console.log(textarray)
// window.addEventListener(onkeydown
// )
// if(text.length>0){
//   btn()
// }

{/* onKeyDown={(e)=> alert(e.ctrlKey==1)} */}

// <textarea id="as"   onChange={e=>{console.log(document.getElementById('as').innerHTML)}}  >

// </textarea>
// {/* <select onChange={(e)=>settextColor(e.target.value)}>
//   <option>black</option>
//   <option>orange</option>
//   <option>black</option>
//   <option>red</option>
// </select> */}
// <button onClick={()=>btn('red')}>Red</button>
// <button onClick={()=>btn('yellow')}>Yellow</button>
// <button onClick={()=>btn('blue')}>Blue</button>
// <div id='texts'>
// {textarray.map((data,index)=>
// <>
// <span id={index} style={{color:data.color}} id={`textIndex${index}`}>
// {data.value}
// </span>
// <span id={index}>  </span>
// </>
// )}
// </div>
// {/* <button onClick={()=>setselectedText(window.getSelection().toString())}>Select</button> */}