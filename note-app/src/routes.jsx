import React from 'react'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import AddNew from './pages/addnew/AddNew'
import Notes from './pages/notes/Notes'

export default function Routing() {
  return (
   
     
       <Routes>
         <Route path='/' element={<Notes/>}/>
         <Route path='/addNew' element={<AddNew/>}/>
        
       </Routes>
      
    
  )
}
