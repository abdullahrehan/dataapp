import React,{ useState,useContext, useRef} from 'react'
import { ImCross } from 'react-icons/im'; 
import { FcNext } from 'react-icons/fc'; 
import { FcPrevious } from 'react-icons/fc'; 
import dot from '../../images/doted.png'
import Context1 from '../HooksFiles/Context'
import ImageUploading from "react-images-uploading";
// import { Line, Circle } from 'rc-progress';
import axios from 'axios' 
import '../../css/ImageUpload.css'   
 

function ImagesUploads({
    ImagesDataApi,
    progress,
    setprogress,
    setshowprogress,
    mutipleFilesUploadLoading,
    setmutipleFilesUploadLoading
}) {


    const {state,dispatch}=useContext(Context1)
    const [preview_frame,setpreview_frame]=useState(false)
    const [disableprevbutton]=useState(false)
    const [disablenextbutton]=useState(false)
    const [MultiImagesFrame,setMultiImagesFrame]=useState(0)
    
    const [images, setImages] = React.useState([]);
    const [maxNumber,setmaxNumber] = useState(69);
    const onChange = (imageList, addUpdateIndex) => {setImages(imageList)};


    const ImageUploadingRef=useRef()
 
    const previewImage=state.url!==null?true:false
//------------------------------------------------------Api Sections--------------------------------------------------------------



 
    //--------------- Function for Sending Image data to the Server -----------------//
    
 
 

const imageUpload=async(e)=>{
    
if(images.length<=1){

    setshowprogress(true)
}
else if(images.length>1){

    setmutipleFilesUploadLoading(true)

}

        e.preventDefault()
        const form=new FormData();
        images.map(data=>{
            form.append("uploadedFile",data.file)
        })
        form.append("email",state.accDataVerify.email)
        form.append("folder",state.currentFolder)
        form.append("tab",state.currentTab)

        const options={
            
            onUploadProgress:(progressEvent) =>{
                const {loaded,total}=progressEvent;
                let percent=Math.floor((loaded * 100) /total)
                setprogress(percent) 
                if(percent===100){ 
                    setTimeout(() => {
                        setshowprogress(false)  
                        
                    }, 1000);}

            }
        }
        
    axios.post("/uploadValue",{tab:state.currentTab,folder:state.currentFolder}).then(res=>console.log(''))         
       
   await axios.post("/uploads",form,options)
   .then(res=>{ 
        setmutipleFilesUploadLoading(false);
        setshowprogress(false);
        dispatch({type:"setonEffect",setonEffect:state.onEffect+1})
        dispatch({type:"ChangeUrl",recdata:null})
})
    resetForm()

}

   
      //------------------------------ Next Image btn function --------------------------------//
    
    const NextImage=(image)=>{
        const result=ImagesDataApi.findIndex((data,index)=>index!==0?data.Url===state.url:null)
        // console.log(ImagesDataApi[result-1].Url)
       
        document.getElementsByClassName(`card_image_preview_hover${state.image.index}`)[0].style.removeProperty("opacity")
            document.getElementsByClassName(`card_image_preview_hover${state.image.index-1}`)[0].style.opacity=100
            dispatch({type:"ChangeUrl",recdata:ImagesDataApi[result-1].Url})
            dispatch({type:"setimage",image:{name:ImagesDataApi[state.image.index-1],index:state.image.index-1}})
    }


    //------------------------------ Previous Image btn function --------------------------------//
    
    const PrevImage=(image)=>{

        const result=ImagesDataApi.findIndex((data,index)=>index!==0?data.Url===state.url:null)

        document.getElementsByClassName(`card_image_preview_hover${state.image.index}`)[0].style.removeProperty("opacity")
        document.getElementsByClassName(`card_image_preview_hover${state.image.index+1}`)[0].style.opacity=100    
        dispatch({type:"ChangeUrl",recdata:ImagesDataApi[result+1].Url})
        dispatch({type:"setimage",image:{name:ImagesDataApi[state.image.index+1],index:state.image.index+1}})

    }

    const seturl=()=>{
        dispatch({type:"ChangeUrl",recdata:null})
        document.getElementsByClassName(`card_image_preview_hover${state.image.index}`)[0].style.removeProperty("opacity")
    }

    const url1=`${state.url}`    
    const url2=url1.split('/')[5]

const resetForm=()=>{
    setImages(null)
}

//------------------------------------------------------ Html Section --------------------------------------------------------------

    return (
         <>
            <form 
            encType="multipart/form-data" method="POST" 
            id='ImageUpload_main_div' 
             onSubmit={imageUpload}
               >
            <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        ref={ImageUploadingRef}
      >
          {({
          imageList,
          onImageUpload,
          onImageRemoveAll, 
          isDragging,
          dragProps
        }) => (
            <> 
         
            {/* ------------------------------  Image Shwoing Frame Section ------------------------------- */}
                <div id='drag_and_drop_area' style={{borderBottom:state.currentTab==='textDoc'?"none":"1px solid powderblue",height:state.currentTab==='messages'?"100%":"87%",transition:'1s'}}>
         
                <div id='Showing_upload_image_div'>
                        
                        <div id='Showing_upload_image_div_heading_text' >
                            Images
                        </div>
                        {!previewImage?<span id='preview_frame_cross_icon' ><ImCross size={30} id="accountSetting_cross_icon" className="crossIcon" style={{position:"relative"}} onClick={resetForm}/></span>:null}
                    </div>
                    
                    <div style={{position:'absolute',width:"100%",height:previewImage?"90%":"78%",top:"9%"}}>
         
        

                   
                    <img src={dot} id="frame" style={{display:state.url!==null?"none":"block",height:state.currentTab==='messages'?"88%":null}}/>
                    <span id='preview_frame_cross_icon' style={{display:state.url!==null?'block':'none',top:"-7%"}}><ImCross size={30} onClick={seturl}/></span>
        
                               
               {imageList.length===1?
               <>
    { imageList.map((image, index) => (
                        index ===0?
                        <img src={image.data_url} id="output2" width="100%" height="100%"/>
                        :null))
                }
                </>

:imageList.length>=1?
                <div id="upload__image_wrapper_main"> 

                    <div id="image_upload_main_image">

                        <div id="prev_icon_image_upload_div">  
                            <button className="btn btn-drak" type="button" disabled={MultiImagesFrame===0?true:false} onClick={()=>setMultiImagesFrame(MultiImagesFrame-1)}>  
                                <FcPrevious size={30} style={{backgroundColor:"#0000"}} />
                            </button>
                        </div>

                        {imageList.map((image, index) => (
                        index ===MultiImagesFrame?
                        <img src={image.data_url} key={{index}} alt="" width="100%" height="100%" style={{padding:"1%",border:"1px solid white"}}/>
                        :null))
                        }

                        <div id="next_icon_image_upload_div"> 
                            <button className="btn btn-drak" disabled={MultiImagesFrame===imageList.length-1?true:false} type="button" onClick={()=>setMultiImagesFrame(MultiImagesFrame+1)}>
                                <FcNext size={30}  style={{backgroundColor:"#0000"}} />
                            </button> 
                        </div>
                    </div>   

                    <div id="images_row_div">

                    <div id="upload__image_wrapper" style={{justifyContent:imageList.length<7?'center':null,overflowX:imageList.length>7?'scroll':'hidden'}} >
                
                        {imageList.map((image, index) => (
                            <img 
                            key={index}
                            src={image.data_url}  
                            alt="" 
                            width="auto" 
                            height="100%"
                            style={{padding:"1%",border:"1px solid white",backgroundColor:index===MultiImagesFrame?'white':null,cursor:"pointer"}}
                            onClick={()=>setMultiImagesFrame(index)}
                            />
     
                        ))}

                    </div>

                    </div>
                
                </div>
                
               :null }
                   {previewImage?
                    <div id="ImageIndex">{ImagesDataApi.length-ImagesDataApi.findIndex(data=>data.defaultName===url2)}/{ImagesDataApi.length-1}</div>
                    :null}<div id={state.url?'Showing_upload_image_div_image_area2':'Showing_upload_image_div_image_area'} >
                             <img id="output" width="200" src={state.url}  />
                    </div>
                    {previewImage? 
                    <>
                  <div>
                    <button onClick={()=>PrevImage(state.url)} disabled={state.image.index+1==ImagesDataApi.length  ? true:false} id='preview_frame_prev_button' type="button" className="btn btn-dark"><FcPrevious size={30}/></button>
                    <button onClick={()=>NextImage(state.url)} disabled={state.image.index-1===0 ? true:false} id='preview_frame_next_button' type="button" className="btn btn-dark"><FcNext size={30}/></button>
                    </div>

                    <div id="preview_frame_imageName" >
                        <h2 style={{borderBottom:'1px solid white'}}>
                        {state.image.name.editedName!==""?
                        state.image.name.editedName:
                        state.image.name.publicId}
                        </h2>
                    </div>
                     </>
                    :null}
                
                </div>
                    
                    
             

                     
                </div>
        


            {/* ------------------------------  Image Upload Section ------------------------------- */}

                <div id="uploading-area" style={{position:"relative",display:state.url!==null? "none":"flex",height:state.currentTab==="messages"?"0%":"12.5%",transition:"1s"}}>
                    
                    <div style={{flex:1}}>Upload Files :</div>
                    
                    <div id='upload'>
                        <div 
                        type="file"
                        name="file" 
                  
                        id="upload_input2"
                         onClick={onImageUpload} 
                        style={{left:"0%",cursor:"pointer"}}   
                        accept={ 'image/png ,image/jpeg ' }
                        multiple
                        > 
                       <soan style={{backgroundColor:"#212529"}}> Upload</soan>
                         {/* {imageList.length!==0?` ${imageList.length}`:null} */}
                         </div>
                        <button style={{marginRight:'2%'}}   type="submit"   className="btn btn-dark">Upload</button>
                    </div>
                </div>

            </>
)}
      </ImageUploading>
            </form>
            
                            
            {/* ------------------------------  Images Preview Frame Section ------------------------------- */}

            <div id='Images_preview_frame' style={{display:preview_frame ? 'block':'none'}}>
               
                <span id='preview_frame_cross_icon'><ImCross size={30} onClick={()=>{return setpreview_frame(false)}}/></span>
                <div id='preview_frame_image_div'>
                    <img id="images_of_preview_frame" width="200" src={state.url} style={{zIndex: 2}}/>
                    <button onClick={()=>PrevImage(state.url)} disabled={disableprevbutton ? true:false} id='preview_frame_prev_button' type="button" className="btn btn-dark"><FcPrevious size={30}/></button>
                    <button onClick={()=>NextImage(state.url)} disabled={disablenextbutton ? true:false} id='preview_frame_next_button' type="button" className="btn btn-dark"><FcNext size={30}/></button>
                </div>   
          
            </div>           
        </>
    )
}

export default ImagesUploads