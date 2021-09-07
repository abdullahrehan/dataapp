const Reducer=(state,action)=>{
const {url,pdf,notes,editNotes,accDataVerify,currentFolder,currentTab}=state

switch(action.type){

    case"ChangeUrl":
   // return {url:action.recdata,pdf:action.setpdffile,accDataVerify:accDataVerify,currentFolder:currentFolder,currentTab:currentTab,notes:notes,editNotes:editNotes}

   return {...state,url:action.recdata,pdf:action.setpdffile,}
        
        case"setpdf":
        return {...state,pdf:action.setpdffile,}

        case"setAccountData":
        return{...state,accDataVerify:action.accData }

        case"setcurrentFolder":
        return{...state,currentFolder:action.currentFolderValue}
      
        case"setcurrentTab":
        return{...state,currentTab:action.setcurrentTab}

        case"setnotes":
        return{...state,notes:action.notes}

        case"setimage":
        return{...state,image:action.image}

        case"seteditNotes":
        return{...state,editNotes:action.editNotes}

        case"setselectMultipleimages":
        return{...state,selectMultipleimages:action.setselectMultipleimages}

        case"setreadOnlyText":
        return{...state,readOnlyText:action.readOnlyText}

        case"setmessages":
        return{...state,messages:action.setmessages}
        
        case"setviewAllImages":
        return{...state,viewAllImages:action.setviewAllImages}

        case"setshowFoldersDiv":
        return{...state,showFoldersDiv:action.setshowFoldersDiv}
    
        case"setshowHalfFoldersDiv":
        return{...state,showHalfFoldersDiv:action.setshowHalfFoldersDiv}
    
        case"setonEffect":
        return{...state,onEffect:action.setonEffect}
        
        case"setloading":
        return{...state,loading:action.setloading}
    }
}
export default Reducer