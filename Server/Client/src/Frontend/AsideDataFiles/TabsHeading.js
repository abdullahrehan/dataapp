import React,{useContext,memo} from 'react'
import Context from '../HooksFiles/Context'
import LoadingDiv from '../AsideDataFiles/LoadingDiv'
import loader from '../../images/813.gif'
import '../../css/TabsHeading.css'
import ViewAllFiles from './ViewAllFiles'


function TabsHeading({ImagesDataApi}) {
    // console.log(ImagesDataApi)
    const {state,dispatch}=useContext(Context)
    return (
        <div id="Folder_heading_div">
        <h2 id="folders_Heading" >{state.currentFolder}</h2>
       
        <div id="no_of_files">
       
            {ImagesDataApi!==undefined ? 
                
                ImagesDataApi.length-1!==-1?
                    
                    ImagesDataApi.length-1 :
                        
                         <div style={{width:"5%"}}>
                                
                        <img style={{paddingTop:"3%",width:"10%",height:"75%",width:"75%"}} src={loader}  />
                        
                    
                        </div> 
                    :null}  
            
             Files
       
        </div>  
            
        </div>
    )
}

export default memo(TabsHeading)
