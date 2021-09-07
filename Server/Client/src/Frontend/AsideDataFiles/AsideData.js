import React, {  useContext } from 'react'
import { BsLayoutTextWindow } from 'react-icons/bs'; 
import { BsImages } from 'react-icons/bs'; 
import { ImFileText2 } from 'react-icons/im';
import { GoFileSubmodule } from 'react-icons/go'; 
import { Link } from 'react-router-dom';
import Context from '../HooksFiles/Context'
import '../../css/AsideData.css'


function AsideData() {

const {state,dispatch}=useContext(Context) 

const previewImage=state.url!==null?true:false

const previewNotes=state.notes!==null?true:false

const currentfolder=(folder)=>{
    dispatch({type:"setcurrentFolder",currentFolderValue:'MainFolder'})
    dispatch({type:"setcurrentTab",setcurrentTab:folder})
    dispatch({type:"setnotes",notes:null})
    dispatch({type:"ChangeUrl",recdata:null})
    console.log()
    if(state.currentTab!==folder){
    dispatch({type:"setloading",setloading:true})}
    // :null// dispatch({type:"setviewAllImages",setviewAllImages:false})
}

return (
      
    <aside id="container">
        <div id='icons'>
            <h2 style={{color:"white",cursor:"pointer",padding:"0px",fontSize: '2.4vw'}}>
            <Link to='/textDoc'><ImFileText2 color={'black'} onClick={()=>currentfolder('textDoc')}/></Link>
            <Link to='/txt'><BsLayoutTextWindow onClick={()=>currentfolder('messages')} color={'black'}/></Link>
            <Link to='/img'><BsImages onClick={()=>currentfolder('imagefolder')} color={'black'}/></Link>
            <Link
            //  to='/word'
              ><GoFileSubmodule 
            // onClick={()=>currentfolder('wordfolder')}
              color={'black'}/></Link>
                {previewImage || previewNotes ?null:
            <span id='file-heading'> Your Files Storage</span>
                }</h2>
        </div>
    </aside>
    )}

export default AsideData
