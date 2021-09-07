import React from 'react'
import loader from '../../images/1494.gif'
import '../../css/LoadingDiv.css'

function LoadingDiv() {
    return (
        <div id='loadingDiv_Maindiv' >
                <img src={loader} />
        </div>
    )
}

export default LoadingDiv
