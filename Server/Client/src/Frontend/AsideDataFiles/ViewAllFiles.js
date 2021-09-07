import React,{useContext,memo} from 'react'
import Context from '../HooksFiles/Context'
import {ImShrink2} from 'react-icons/im'; 
import {FaExpandAlt} from 'react-icons/fa'; 
import '../../css/ViewAllFiles.css'

function ViewAllFiles({setViewAllMode}) {
    
    const {state,dispatch}=useContext(Context)
    const ViewAllImages=state.viewAllImages

    // if(window.innerWidth)

    return (
        <div id="view_all_button">
        <button className="btn btn-dark" id="view_btn" onClick={()=>{dispatch({type:"setviewAllImages",setviewAllImages:!ViewAllImages});setViewAllMode(!ViewAllImages)}}>
            {ViewAllImages?
            <FaExpandAlt size={25} color={'white'}/>:
            <ImShrink2 size={25} color={'white'}/>}
        </button> 
        </div>
    )
}

export default memo(ViewAllFiles)

// import React,{useContext,memo} from 'react'
// import Context from '../HooksFiles/Context'
// import {ImShrink2} from 'react-icons/im'; 
// import {FaExpandAlt} from 'react-icons/fa'; 
// import '../../css/ViewAllFiles.css'

// function ViewAllFiles({ViewAllImages,setViewAllMode}) {
    
//     const {state,dispatch}=useContext(Context)
//     // const ViewAllImages=state.viewAllImages

//     // if(window.innerWidth)

//     return (
//         <div id="view_all_button">
//         <button className="btn btn-dark" id="view_btn" onClick={()=>{setViewAllMode(!ViewAllImages)}}>
//             {ViewAllImages?
//             <FaExpandAlt size={25} color={'white'}/>:
//             <ImShrink2 size={25} color={'white'}/>}
//         </button> 
//         </div>
//     )
// }

// export default memo(ViewAllFiles)