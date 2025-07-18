import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddNew() {
 const navigate=useNavigate()
  const [title,setTitle]=useState("")
  const [content,setContent]=useState("")

const saveNote=()=>{
  if (!title.trim() && !content.trim()) {
    alert("notes cant be empty")
    return
  }

  const existingNotesString=localStorage.getItem('myNotesAppNotes')
  let existingNotes=[];
  if (existingNotesString) {
    try{
       existingNotes=JSON.parse(existingNotesString);
    }
    catch(error){
       console.log("Error parsing existing notes from localStorage:", error)
    }
  }

  const newNote ={
    id:Date.now(),
    title:title.trim(),
    content:content.trim(),
    
  }
  existingNotes.push(newNote)

  localStorage.setItem('myNotesAppNotes',JSON.stringify(existingNotes))

  console.log('new note saved')

  navigate('/')
}

 const cancelAdd=()=>{
  navigate('/')
 }
  return (
    <div>
       <div className='border rounded-[13px] p-6 max-w-[300px] flex flex-col'>
          <div>
          <label htmlFor="noteTitle" className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
          <input
            type="text"
            id="noteTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder="Enter note title"
          />
        </div>

        <div>
          <label htmlFor="noteContent" className='block text-sm font-medium text-gray-700 mb-1'>Content</label>
          <textarea
            id="noteContent"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="6"
            className='border rounded p-2 w-full resize-y focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder="Write your note content here..."
          ></textarea>
        </div>
         <button onClick={saveNote}> save note</button>
         <button onClick={cancelAdd}>cancel</button>
       </div>
    </div>
  )
}
