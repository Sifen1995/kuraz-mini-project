
import React, { useState, useEffect, useCallback } from 'react'; 
import { useNavigate } from 'react-router-dom';
import NoteCard from '../../components/note-card/NoteCard';


export default function Notes() {
  const navigate = useNavigate();
  const add = () => {
    navigate("/addNew");
  };

   const [notes, setNotes] = useState([]);

  
  const loadNotes = useCallback(() => {
    const existingNotesString = localStorage.getItem('myNotesAppNotes');
    let loadedNotes = []; 

    if (existingNotesString) {
      try {
        loadedNotes = JSON.parse(existingNotesString);
      } catch (error) {
        console.error("Error parsing existing notes from localStorage:", error);
        
      }
    }
    
    setNotes(loadedNotes);
    console.log("Loaded notes from localStorage:", loadedNotes); 
  }, []); 

  
  useEffect(() => {
    loadNotes();

    const handleStorageChange = (event) => {
      if (event.key === 'myNotesAppNotes') {
        loadNotes();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [loadNotes]); 

   const handleNoteDeleted = useCallback(() => {
    loadNotes(); // Simply re-load all notes to refresh the list
  }, [loadNotes]);

  return (
    <div className='ml-[50px] mr-[20px] mt-[20px]'>
      <header className='flex flex-row gap-[80%]'>
        <h3 className='text-[20px] font-semibold'>My Notes</h3>
        <button className='border rounded-[10px] p-4 bg-button' onClick={add}>+ Add Note</button>
      </header>
      <div>
        
        {notes.length === 0 ? (
          <p>No notes yet. Add one to get started!</p>
        ) : (
          notes.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              onNoteDeleted={handleNoteDeleted} 
            
            />
          ))
        )}
        
      </div>
    </div>
  );
}