import React, { useState ,useEffect,useContext,useRef,memo } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState,Modifier,getDefaultKeyBinding ,KeyBindingUtil,ContentState,RichUtils,convertFromRaw,readOnly } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Context from '../HooksFiles/Context'
import axios from 'axios'
// import Editor from '@draft-js-plugins/editor';

import createImagePlugin from '@draft-js-plugins/image';
// import '../../css/editor2.css'

const initialstate= EditorState.createEmpty()

  const Editors = ({emptyEditor,NotesData,setNotesData}) => {

    const [file,setfile]=useState('')
    const {state,dispatch}=useContext(Context)
    // const [NotesData,setNotesData]=useState(initialstate);
    const editorRef=useRef()

    const previewNotes=state.notes!==null?true:false
    const imagePlugin = createImagePlugin();

    function uploadImageCallBack(file) {
 
         return new Promise(
            (resolve, reject) => {
               
      const form=new FormData();
      const folder=state.currentFolder
      form.append('image', file);
      form.append('folder', folder);
              console.log(folder)
      axios.post("/notesImages",form)
 

          }
        );
      }
    function insertCharacter(characterToInsert, editorState) {
      const currentContent = editorState.getCurrentContent(),
            currentSelection = editorState.getSelection();
    
      const newContent = Modifier.replaceText(
        currentContent,
        currentSelection,
        characterToInsert
      );
    
      const newEditorState = EditorState.push(editorState, newContent, 'insert-characters');
    
      return  newEditorState;
    }
    const removeSelectedBlocksStyle = (editorState)  => {
      const newContentState = RichUtils.tryToRemoveBlockStyle(editorState);
      if (newContentState) {
          return EditorState.push(editorState, newContentState, 'change-block-type');
      }
      return editorState;
  }
   
   const getResetEditorState = (editorState) => {
      const blocks = editorState
          .getCurrentContent()
          .getBlockMap()
          .toList();
      const updatedSelection = editorState.getSelection().merge({
          anchorKey: blocks.first().get('key'),
          anchorOffset: 0,
          focusKey: blocks.last().get('key'),
          focusOffset: blocks.last().getLength(),
      });
      const newContentState = Modifier.removeRange(
          editorState.getCurrentContent(),
          updatedSelection,
          'forward'
      );
  
      const newState = EditorState.push(editorState, newContentState, 'update-state');
      return removeSelectedBlocksStyle(newState)
  }

const g=()=>{
  const da=getResetEditorState(NotesData)
  setNotesData(da)         
  setNotesData(initialstate) 
}

const a=()=>{
  
   
  

    const data2=EditorState.createWithContent(convertFromRaw(JSON.parse(state.notes.body)))
 
 const data=insertCharacter(data2, NotesData)
 
  setNotesData(data2) 
 
  console.log(NotesData)
}

useEffect(() => { 
  if(emptyEditor){
    g()
  }

}, [emptyEditor])

    useEffect(() => { 
      if(state.notes!==null){
      
        a()
      }
 
    }, [state.notes])
   
    const styleMap = {
      'STRIKETHROUGH': {
        width: '53%',
        left: '6%',
      },
    };
    if(previewNotes && document.getElementsByClassName('rdw-editor-main')[0]!==undefined){
  document.getElementsByClassName('rdw-editor-main')[0].style.width="53%"
  document.getElementsByClassName('rdw-editor-main')[0].style.left="6%"
  document.getElementsByClassName('rdw-editor-main')[0].style.height="87%"
  document.getElementsByClassName('rdw-editor-main')[0].style.top="12%"
  document.getElementsByClassName('DraftEditor-root')[0].style.paddingTop="2%"
  
}
else if(!previewNotes && document.getElementsByClassName('rdw-editor-main')[0]!==undefined){
  document.getElementsByClassName('rdw-editor-main')[0].style.width="25%"
  document.getElementsByClassName('rdw-editor-main')[0].style.left="1%"
  document.getElementsByClassName('rdw-editor-main')[0].style.height="71%"
  document.getElementsByClassName('rdw-editor-main')[0].style.top="18%"
  document.getElementsByClassName('rdw-editor-main')[0].style.borderLeft="1px solid"
  document.getElementsByClassName('rdw-editor-main')[0].style.borderBottom="1px solid"
  document.getElementsByClassName('rdw-editor-main')[0].style.borderRadius="5px"
  document.getElementsByClassName('rdw-editor-main')[0].style.backgroundColor="#0009"
  document.getElementsByClassName('DraftEditor-root')[0].style.paddingTop="0%"
  document.getElementsByClassName('rdw-editor-toolbar')[0].style.width="100%"
  document.getElementsByClassName('rdw-editor-wrapper')[0].style.width="11%"
  document.getElementsByClassName('rdw-editor-wrapper')[0].style.left="86%"
  document.getElementsByClassName('rdw-inline-wrapper')[0].style.display="none"
  document.getElementsByClassName('rdw-text-align-wrapper')[0].style.display="none"
  document.getElementsByClassName('rdw-link-wrapper')[0].style.display="none"
  document.getElementsByClassName('rdw-history-wrapper')[0].style.display="none"
  document.getElementsByClassName('rdw-block-wrapper')[0].style.display="none"
  document.getElementsByClassName('rdw-fontsize-wrapper')[0].style.display="none"
  document.getElementsByClassName('rdw-history-wrapper')[0].style.display="none"

  document.getElementsByClassName('rdw-list-wrapper')[0].style.display="none"
  document.getElementsByClassName('rdw-embedded-wrapper')[0].style.display="none"
  document.getElementsByClassName('rdw-image-wrapper')[0].style.display="none"

  // document.getElementsByClassName('rdw-colorpicker-modal-header')[0].style.height="18%"
  // document.getElementsByClassName('rdw-colorpicker-modal-header')[0].style.paddingBottom="0%"
  // document.getElementsByClassName('rdw-image-wrapper')[0].style.display="none"
  // document.getElementsByClassName('rdw-image-wrapper')[0].style.display="none"
  // document.getElementsByClassName('rdw-image-wrapper')[0].style.display="none"
  // document.getElementsByClassName('rdw-image-wrapper')[0].style.display="none"
 

  
 
}
    return (
    <>
    <Editor
    // plugins={[imagePlugin]}
      editorState={NotesData}
      wrapperClassName="demo-wrapper"
      editorClassName="demo-editor"
      toolbar={{
        inline: { inDropdown: false },
        list: { inDropdown: false },
        textAlign: { inDropdown: false },
        link: { inDropdown: false },
        history: { inDropdown: false },
        image: { uploadCallback: uploadImageCallBack, alt: { present: false, mandatory: false } },
      }}
      onEditorStateChange={setNotesData}
      readOnly={state.notes!==null ? state.editNotes : false}
      ref={editorRef}
      customStyleMap={styleMap}

/> 
    </>
  )
}

  
export default memo(Editors)
 