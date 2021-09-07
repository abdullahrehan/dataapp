import React from 'react'
import { FaRegFilePdf } from 'react-icons/fa'; 
import { RiFileWord2Fill } from 'react-icons/ri'; 
import { NavLink} from 'react-router-dom';
import '../../css/Files.css'

function Files() {
    return (
        <div id='Files_folder'>
         <NavLink to='/file/pdf'><FaRegFilePdf size={44}/></NavLink>
         <NavLink to='/file/word'><RiFileWord2Fill size={44}/></NavLink>
        </div>
    )
}

export default Files
