// import React, { useState,useEffect,useContext,memo, useRef } from 'react'
// import {RiDownload2Fill} from 'react-icons/ri'
// import {AiTwotoneDelete} from 'react-icons/ai'
// import {HiDotsVertical} from 'react-icons/hi'; 
// import {RiFolderSharedFill} from 'react-icons/ri'; 
// import {BsFileEarmarkText} from 'react-icons/bs'; 
// import {RiImageEditLine} from 'react-icons/ri'; 
// import {LazyLoadImage} from 'react-lazy-load-image-component';
// import {BsArrowLeftShort} from 'react-icons/bs'; 
// import Image from '../../images/word.png'
// import Securepopup from './Securepopup'
// import Imagepdf from '../../images/pdf.png'
// import Context from '../HooksFiles/Context'
// import '../../css/DefaultTab.css'
// import '../../css/FilesCard.css'


// function FilesCard(
//     {showAdvanceFeatures,
//     ViewAllImages,
//     ImagesDataApi,
//     displaySendToDiv,
//     editButton,
//     showNewImageNameDiv,
//     folderName,
//     setshowNewImageNameDiv,
//     deleteFile,
//     editedImageName,
//     sendFileFunction,
// }) {


//     const {state,dispatch}=useContext(Context)
//     const [ImageIndex,setImageIndex]=useState('')
//     const currentFolder=state.currentFolder
    
//     const previewImage=state.url!==null?true:false
//     const preview_hover=useRef()


//    // ---------------------------------- Dyanamic Styles ---------------------------------- //

//     const form_Styles={ 
//         width:ViewAllImages && previewImage ?"46%":ViewAllImages?"26%":"57%",
//         height:ViewAllImages?"30%":'65%',
//         left:ViewAllImages?"0%":"17%"
//     }

//     const form_Styles_Mobile={ 
//         width:"96%",
//         height:'50%',
//         left:"0%"
//     }
        
//     const card_Styles={
//         width:ViewAllImages?'96%':'90%',
//         height:ViewAllImages?'88%':'90%',
//         left:ViewAllImages?'3.5%':'6%',
//     }

//     const preview_text_Styles={
//         width:ViewAllImages?'100%':"23vw",
//         height:ViewAllImages?'100%':"33vh",
//         fontSize:ViewAllImages?'2.2vw':"3.2vw",
//         top:ViewAllImages?'3%':"0%",
//         left:ViewAllImages?'-4%':null, 
//         right:!ViewAllImages?'4%':null, 
//     }

//     const sendToDiv_heading_Styles={
//         fontSize:ViewAllImages?"1.1vw":"1.5vw",
//         left:ViewAllImages?"20%":"30%"
//     }

//     const checkbox_styles={
//         width:ViewAllImages?"13%":'11%',
//         height:ViewAllImages?"13%":'8%',
//         left:ViewAllImages?"1%":'0%',
//         top:ViewAllImages?"3%":'2%',
//     }
    
//     const imageArea_Styles={height:ViewAllImages?'100%':'70%'}
//     const sendtodiv_Styles={height:ViewAllImages?"100%":"70%"}
//     const editIcon_Styles={display:ViewAllImages?'none':'block'}
//     const imageName_Styles={display:ViewAllImages ?'none':'block'}
//     const sendto_mappingdiv_Styles={fontSize:ViewAllImages?"1vw":"1.5vw"}

//    // -----------------Going Back From SendToDiv -----------------//

//    const Back_Icon_SendToDiv=(index)=>{
    
//     document.getElementsByClassName(`sendToDiv${index}`)[0].style.display='none'

//     }
  
//     const displayImage=(imageName,index)=>{

//         dispatch({type:"ChangeUrl",recdata:imageName.Url})
//         dispatch({type:"setimage",image:{name:imageName,index:index}})
//         const element=document.getElementsByClassName(`card_image_preview_hover${ImageIndex}`)[0]

//             if(ImageIndex!=='' && element!==undefined){ 

//                 document.getElementsByClassName(`card_image_preview_hover${ImageIndex}`)[0].style.opacity=0

//             }

//         document.getElementsByClassName(`card_image_preview_hover${index}`)[0].style.opacity=100
//     }

    

 
//     const checkedImage=(index)=>{
//         const element=document.getElementsByClassName(`checkbox${index}`)[0]        
//         document.getElementsByClassName(`select_div_text${index}`)[0].innerText=element.checked?'Selected':'Select Image'
//         showAdvanceFeatures()
//     }


    
//     const ScrollToPic=(index)=>{  
//         dispatch({type:"setviewAllImages",setviewAllImages:false})

//         setTimeout(() => {
//             document.getElementById(`images_form${index}`).scrollIntoView(true);
            
//         }, 500);
 
//         console.log( document.getElementById(`images_form${index}`))
//     }
  

//  return (
//      <div style={{flex:12,display:"flex"}}>
//         <div id="images_mapping_main_div">

         
       
//         {ImagesDataApi!==undefined ? ImagesDataApi.map((ImageName,index) =>{  
          

//         return(
    
//         <>
//         {ImageName.defaultName===currentFolder && index < 1 ? null :
              
//         <form key={index} className="image_Form" id={`images_form${index}`} style={!state.pix ? form_Styles : form_Styles_Mobile} method="GET" encType="multipart/form-data" > 
 
//         {/* --------------------------------- Default Image Card ----------------------------------- */}
     
//             <div id="Default_Tab_Image_Card" style={card_Styles}>
            
//                 <div id="select_div_box" className={`select_div_box${index}`} style={{display:state.selectMultipleimages?'block':'none'}}>
             
//                     <input type="checkbox" className={`checkbox checkbox${index}`} style={checkbox_styles} onClick={()=>checkedImage(index)}/>
            
//                     <p className={`select_div_text${index}`} style={{color:"white",fontSize:ViewAllImages?"1.4vw":"2.2vw"}}>
                
//                         Select Image
                
//                     </p>
                
//                 </div>

//                 <div id='three_dots_div' onClick={()=>{displaySendToDiv(index)}} style={{zIndex:state.showFoldersDiv?0:1}}>
                
//                     <HiDotsVertical size={ViewAllImages?24:30}/>
                
//                 </div>
                    
//         {/* ----------------------------------- Card Image Area ------------------------------------- */}
 
//                 <div id="card_image_area" style={imageArea_Styles} >

//                     {state.currentTab==='imagefolder'?<LazyLoadImage height={'100%'}  width={'100%'} src={ImageName.Url} id="form-card"/>
//                     :state.currentTab==='wordfolder'?<LazyLoadImage height={'100%'} width={'80%'} src={Image} id="form-card"  />
//                     :state.currentTab==='pdffolder'?<LazyLoadImage height={'100%'} width={'80%'} src={Imagepdf} id="form-card"  />                        
//                     :null}
                    
//                 </div>



//         {/* ---------------------------------- Card Preview hover ------------------------------------ */}

    
//                 <div className={`card_image_preview_hover${index}`}  id="card_image_preview_hover" style={{height:ViewAllImages?'100%':'70%'}} ref={preview_hover} onDoubleClicks={ViewAllImages?()=>ScrollToPic(index):null }>
//       {/* { document.getElementsByClassName(`card_image_preview_hover${index}`)[0].style.display==='block'? document.getElementsByClassName(`card_image_preview_hover${index}`)[0].scrollIntoView(true):null} */}
//                     <div id="goto_file"  style={{display:ViewAllImages && !previewImage ?"block":'none'}}><BsFileEarmarkText size={30} onClick={()=>ScrollToPic(index) }/></div>
                
//                     <div id="preview_text_div" style={preview_text_Styles} onClick={()=>{setImageIndex(index);displayImage(ImageName,index)}}  >
                    
//                         Preview
                    
//                     </div> 
                    
//                     <div>
                    
//                         <RiImageEditLine  id="Card_edit_icon" style={editIcon_Styles} size={45} onClick={()=>{editButton(ImageName.defaultName)}}/>
                    
//                     </div>
                
//                 </div>
              
//         {/* ------------------------------------- Calling change Image Name Div --------------------------------------- */}
        
//                 {showNewImageNameDiv?
                
//                 <Securepopup 
//                 showNewImageNameDiv={showNewImageNameDiv}
//                 editedImageName={value=>editedImageName(value,ImageName.defaultName)}
//                 crossFunction={(value)=>{setshowNewImageNameDiv(value)}}
//                 iconDisplay={false}/> 
                
//                 :null}

//         {/* ------------------------------------- SendToDiv Area --------------------------------------- */}


//                 <div id="sendToDiv" className={`sendToDiv${index}`} style={sendtodiv_Styles} >

//                     {/*-------------------- SendToDiv Back Icon -----------------*/}
                    
//                     <div id="Back_Icon_SendToDiv"  onClick={()=>{Back_Icon_SendToDiv(index)}}>
//                         <BsArrowLeftShort size={ViewAllImages?28:38}/>
//                     </div>
                    
//                     <div id='sendToDiv_heading' style={sendToDiv_heading_Styles}>
//                         Send To Folder
//                     </div>

//                     {/*-------------- SendToDiv Mapping Folder Names -------------*/}

//                     <div id='sendToDiv_maindata_div'>
 
//                         {folderName!==undefined?folderName.map((folder_datass,index)=> 
                            
//                             folder_datass.name===currentFolder ? null :
                            
//                                 <div key={index}  id='sendToDiv_mapping_div' onClick={()=>{sendFileFunction(folder_datass,ImageName);Back_Icon_SendToDiv(index)}} style={sendto_mappingdiv_Styles}>
                                
//                                     <a style={{display:ViewAllImages?"none":"block"}}>
                                
//                                         <RiFolderSharedFill/>{folder_datass.name}
                                
//                                     </a>
                            
//                                     <span style={{display:ViewAllImages?"block":"none"}}>{folder_datass.name}</span>
                            
//                                 </div>
//                         )
//                         :null}

//                     </div> 
//                 </div>


// {/* ------------------------------------- Image Card Text Area ------------------------------------- */}

//                 <div className="Image_Card_Text_area" >
                    
//                     {/*-------------------- Text Area Image Name ------------------*/}   

//                     <h4 className="Image_Card_Name" style={imageName_Styles}>
//                         {ImageName.editedName=='' ?ImageName.publicId:ImageName.editedName}
//                     </h4>

//                     <h4 className="Image_Card_Name">
//                     {ImageName.heading}
//                     </h4>

//                     {/*-------------------- Text Area Buttons Div ------------------*/}   

//                     <div id='ImageData_card_button_div' style={{display:ViewAllImages || state.currentFolder==="textDoc"?'none':'block'}}>

//                      {/*------------------ Text Area Download Button ---------------*/}   
//                         <a href={ImageName.Url} download> 

//                         <button type="button" className="ImageData_card_button1 btn btn-primary">
//                                 <RiDownload2Fill size={18}/>Download
//                         </button> 
                    
//                         </a>

//                      {/*-------------------- Text Area Delete Button ---------------*/}   

//                         <button className="ImageData_card_button2 btn btn-primary" type="button" onClick={()=>{deleteFile(ImageName.publicId)}}>
                            
//                             <AiTwotoneDelete size={18}/>
//                             Delete
//                         </button>

//                     </div>
                
//                 </div>

//             </div> 
     
//         </form>
//         }
//     </>

//     )}).reverse():null} 

// </div>  
// </div> 
//     )
// }

// export default memo(FilesCard)


import React, { useState,useEffect,useContext,memo, useRef } from 'react'
import {RiDownload2Fill} from 'react-icons/ri'
import {AiTwotoneDelete} from 'react-icons/ai'
import {HiDotsVertical} from 'react-icons/hi'; 
import {RiFolderSharedFill} from 'react-icons/ri'; 
import {BsFileEarmarkText} from 'react-icons/bs'; 
import {RiImageEditLine} from 'react-icons/ri'; 
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {BsArrowLeftShort} from 'react-icons/bs'; 
import Image from '../../images/word.png'
import Securepopup from './Securepopup'
import Imagepdf from '../../images/pdf.png'
import Context from '../HooksFiles/Context'
import '../../css/DefaultTab.css'
import '../../css/FilesCard.css'


function FilesCard(
    {showAdvanceFeatures,
    ViewAllImages,
    ImagesDataApi,
    displaySendToDiv,
    editButton,
    showNewImageNameDiv,
    folderName,
    setshowNewImageNameDiv,
    deleteFile,
    editedImageName,
    sendFileFunction,
}) {


    const {state,dispatch}=useContext(Context)
    const [ImageIndex,setImageIndex]=useState('')
    const currentFolder=state.currentFolder
    const [ImageDefaultName,setImageDefaultName]=useState(false)
    const previewImage=state.url!==null?true:false
    const preview_hover=useRef()


   // ---------------------------------- Dyanamic Styles ---------------------------------- //

    const form_Styles={ 
        width:ViewAllImages && previewImage ?"46%":ViewAllImages?"26%":"57%",
        height:ViewAllImages?"30%":'63%',
        left:ViewAllImages?"0%":"17%"
    }

    const form_Styles_Mobile={ 
        width:"96%",
        height:'50%',
        left:"0%"
    }
        
    const card_Styles={
        width:ViewAllImages?'96%':'86%',
        height:ViewAllImages?'88%':'88%',
        left:ViewAllImages?'3.5%':'9%',
        userSelect:"none"
    }

    const preview_text_Styles={
        width:ViewAllImages?'100%':"100%",
        height:ViewAllImages?'100%':"100%",
        fontSize:ViewAllImages?'2.2vw':"3vw",
        top:ViewAllImages?'3%':"11%",
        left:ViewAllImages?'-4%':null, 
        right:!ViewAllImages?'5%':null, 
    }

    const sendToDiv_heading_Styles={
        fontSize:ViewAllImages?"1.1vw":"1.5vw",
        left:ViewAllImages?"20%":null,
        top:ViewAllImages?'5%':'1%'
    }

    const checkbox_styles={
        width:ViewAllImages?"13%":'11%',
        height:ViewAllImages?"13%":'8%',
        left:ViewAllImages?"1%":'0%',
        top:ViewAllImages?"3%":'2%',
    }
    
    const imageArea_Styles={height:ViewAllImages?'100%':'100%'}
    const sendtodiv_Styles={height:"100%",zIndex:1}
    const editIcon_Styles={display:ViewAllImages?'none':'block'}
    const imageName_Styles={display:ViewAllImages ?'none':'block'}
    const sendto_mappingdiv_Styles={fontSize:ViewAllImages?"1vw":"1.5vw",fontFamily:"cursive",borderRadius:"6px",paddingLeft:'3%'}

   // -----------------Going Back From SendToDiv -----------------//

   const Back_Icon_SendToDiv=(index)=>{
    
    document.getElementsByClassName(`sendToDiv${index}`)[0].style.display='none'

    }
  
    const displayImage=(imageName,index)=>{

        dispatch({type:"ChangeUrl",recdata:imageName.Url})
        dispatch({type:"setimage",image:{name:imageName,index:index}})
        const element=document.getElementsByClassName(`card_image_preview_hover${ImageIndex}`)[0]

            if(ImageIndex!=='' && element!==undefined){ 

                document.getElementsByClassName(`card_image_preview_hover${ImageIndex}`)[0].style.opacity=0

            }

        document.getElementsByClassName(`card_image_preview_hover${index}`)[0].style.opacity=100
    }

    

 
    const checkedImage=(index)=>{
        // const element=document.getElementsByClassName(`checkbox${index}`)[0]        
        const element=document.getElementsByClassName(`checkbox${index}`)[0]        
        // console.log(element.checked)
        element.checked=!element.checked;
        document.getElementsByClassName(`select_div_text${index}`)[0].innerText=element.checked?'Selected':'Select Image'
        showAdvanceFeatures()
    }


    
    const ScrollToPic=(index)=>{  
        dispatch({type:"setviewAllImages",setviewAllImages:false})

        setTimeout(() => {
            document.getElementById(`images_form${index}`).scrollIntoView(true);
            
        }, 500);
 
        console.log( document.getElementById(`images_form${index}`))
    }
  

 return (
     <div style={{flex:12,display:"flex"}}>
        <div id="images_mapping_main_div">

         
       
        {ImagesDataApi!==undefined ? ImagesDataApi.map((ImageName,index) =>{  
          

        return(
    
        <>
        {ImageName.defaultName===currentFolder && index < 1 ? null :
              
        <form key={index} className="image_Form" id={`images_form${index}`} style={!state.pix ? form_Styles : form_Styles_Mobile} method="GET" encType="multipart/form-data" > 
 
        {/* --------------------------------- Default Image Card ----------------------------------- */}
     
            <div id="Default_Tab_Image_Card" style={card_Styles}>
            
                <div id="select_div_box" className={`select_div_box${index}`} style={{display:state.selectMultipleimages?'block':'none'}} onClick={()=>checkedImage(index)}>
             
                    <input type="checkbox" className={`checkbox checkbox${index}`} style={checkbox_styles} />
            
                    <p className={`select_div_text${index}`} style={{color:"white",fontSize:ViewAllImages?"1.4vw":"2.2vw",userSelect:"none",marginTop:ViewAllImages?'2px':"17px"}}>
                
                        Select Image
                
                    </p>
                
                </div>

                <div id='three_dots_div' onClick={()=>{displaySendToDiv(index)}} style={{zIndex:state.showFoldersDiv?0:1}}>
                
                    <HiDotsVertical size={ViewAllImages?24:30}/>
                
                </div>
                    
        {/* ----------------------------------- Card Image Area ------------------------------------- */}
 
                <div id="card_image_area" style={imageArea_Styles} >

                    {state.currentTab==='imagefolder'?<LazyLoadImage height={'100%'}  width={'100%'} src={ImageName.Url} id="form-card"/>
                    :state.currentTab==='wordfolder'?<LazyLoadImage height={'100%'} width={'80%'} src={Image} id="form-card"  />
                    :state.currentTab==='pdffolder'?<LazyLoadImage height={'100%'} width={'80%'} src={Imagepdf} id="form-card"  />                        
                    :null}
                    
                </div>



        {/* ---------------------------------- Card Preview hover ------------------------------------ */}

    
                <div className={`card_image_preview_hover${index}`}  id="card_image_preview_hover" style={{height:ViewAllImages?'100%':'100%'}} ref={preview_hover} 
                // onDoubleClicks={ViewAllImages?()=>ScrollToPic(index):null }
                >
    {document.getElementsByClassName(`card_image_preview_hover${index}`)[0]!==undefined?
     document.getElementsByClassName(`card_image_preview_hover${index}`)[0].style.opacity==='100'? 
     document.getElementById(`images_form${index}`).scrollIntoView(true):
      console.log(document.getElementsByClassName(`card_image_preview_hover${index}`)[0].style.opacity)
      :null
}
                   
                    <div id="goto_file"  style={{display:ViewAllImages && !previewImage ?"block":'none'}}><BsFileEarmarkText size={30} onClick={()=>ScrollToPic(index) }/></div>
                
                    <div id="preview_text_div" style={preview_text_Styles} onClick={()=>{setImageIndex(index);displayImage(ImageName,index)}}  >
                    
                        Preview
                    
                    </div> 
                    
                    <div>
                    
                        <RiImageEditLine  id="Card_edit_icon" style={editIcon_Styles} size={45} onClick={()=>{editButton(ImageName.defaultName);setImageDefaultName(ImageName.defaultName)}}/>
                    
                    </div>
                
                </div>
              
        {/* ------------------------------------- Calling change Image Name Div --------------------------------------- */}
{/*         
                {showNewImageNameDiv?
                
                <Securepopup 
                showNewImageNameDiv={showNewImageNameDiv}
                editedImageName={value=>editedImageName(value,ImageName.defaultName)}
                crossFunction={(value)=>{setshowNewImageNameDiv(value)}}
                iconDisplay={false}/> 
                
                :null} */}

        {/* ------------------------------------- SendToDiv Area --------------------------------------- */}


                <div id="sendToDiv" className={`sendToDiv${index}`} style={sendtodiv_Styles} >

                    {/*-------------------- SendToDiv Back Icon -----------------*/}
                    
                    <div id="Back_Icon_SendToDiv"  onClick={()=>{Back_Icon_SendToDiv(index)}}>
                        <BsArrowLeftShort size={ViewAllImages?28:38}/>
                    </div>
                    
                    <div id='sendToDiv_heading' style={sendToDiv_heading_Styles}>
                        Send To Folder
                    </div>

                    {/*-------------- SendToDiv Mapping Folder Names -------------*/}

                    <div id='sendToDiv_maindata_div'>
 
                        {folderName!==undefined?folderName.map((folder_datass,index)=> 
                            
                            folder_datass.name===currentFolder ? null :
                            
                                <div key={index}  id='sendToDiv_mapping_div' onClick={()=>{sendFileFunction(folder_datass,ImageName);Back_Icon_SendToDiv(index)}} style={sendto_mappingdiv_Styles}>
                                
                                    <a style={{display:ViewAllImages?"none":"block"}}>
                                
                                        <RiFolderSharedFill/>  {folder_datass.name}
                                
                                    </a>
                            
                                    <span style={{display:ViewAllImages?"block":"none"}}>{folder_datass.name}</span>
                            
                                </div>
                        )
                        :null}

                    </div> 
                </div>


{/* ------------------------------------- Image Card Text Area ------------------------------------- */}

                <div className="Image_Card_Text_area" >
                    
                    {/*-------------------- Text Area Image Name ------------------*/}   

                    {/* <h4 className="Image_Card_Name" style={imageName_Styles}>
                        {ImageName.editedName=='' ?ImageName.publicId:ImageName.editedName}
                    </h4>

                    <h4 className="Image_Card_Name">
                    {ImageName.heading}
                    </h4> */}

                    {/*-------------------- Text Area Buttons Div ------------------*/}   

                    <div id='ImageData_card_button_div' style={{display:ViewAllImages || state.currentFolder==="textDoc"?'none':'block'}} >

                     {/*------------------ Text Area Download Button ---------------*/}   
                        <a href={ImageName.Url} download> 

                        <button type="button" className="ImageData_card_button1 btn btn-dark" >
                                <RiDownload2Fill size={28} color={"green"}/>
                 
                        </button> 
                    
                        </a>

                     {/*-------------------- Text Area Delete Button ---------------*/}   

                        <button className="ImageData_card_button2 btn btn-dark" type="button" onClick={()=>{deleteFile(ImageName.publicId)}}>
                            
                            <AiTwotoneDelete size={28} color={"red"}/>
                   
                        </button>

                    </div>
                
                </div>

            </div> 
      
        </form>
        }
    </>

    )}).reverse():null} 

</div>  

{showNewImageNameDiv?
                
                <Securepopup 
                showNewImageNameDiv={showNewImageNameDiv}
                editedImageName={value=>editedImageName(value,ImageDefaultName)}
                crossFunction={(value)=>{setshowNewImageNameDiv(value)}}
                iconDisplay={false}/> 
                
                :null}
</div> 
    )
}

export default memo(FilesCard)
