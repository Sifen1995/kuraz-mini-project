import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

const Delete=({show,onClose,children})=> {
    if (!show) {
        return null
    }
  return (
    <div>
       <div onClick={onClose}>
         <div onClick={(e)=>e.stopPropagation()}>
             <button onClick={onClose}><CloseIcon/></button>
             {children}
         </div>
       </div>
    </div>
  )
}

export default Delete
