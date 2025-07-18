import React,{useState,useEffect} from 'react'
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import Delete from '../delete/Delete';

export default function NoteCard({id,onNoteDeleted ,title,content}) {
   const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false); 

   const handleOpenDeleteConfirmModal = () => {
    setShowDeleteConfirmModal(true);
  };

   const handleCloseDeleteConfirmModal = () => {
    setShowDeleteConfirmModal(false);
  };

  const handleConfirmDelete = () => {
    console.log("Deletion confirmed! Performing deletion...");
   const existingNotesString = localStorage.getItem('myNotesAppNotes');
  let existingNotes = [];

  if (existingNotesString) {
    try {
      existingNotes = JSON.parse(existingNotesString);
    } catch (error) {
      console.error("Error parsing existing notes from localStorage during deletion:", error);
      // If data is corrupted, perhaps clear it or handle gracefully
      alert("Error reading notes for deletion. Please try again.");
      handleCloseDeleteConfirmModal();
      return;
    }
  }
  const updatedNotes = existingNotes.filter(item => {
    // If item is null or undefined, or not an object, definitely remove it (return false)
    if (!item || typeof item !== 'object') {
        return false;
    }

    console.log("Deleting note with id:", id);
console.log("All existing notes:", existingNotes);

    // Otherwise, keep the item only if its ID does NOT match the ID of the note we want to delete
    return item.id !== id;
});

    // Save the updated array back to localStorage
    localStorage.setItem('myNotesAppNotes', JSON.stringify(updatedNotes));
    
    alert("Note has been deleted!"); // For demonstration purposes

    handleCloseDeleteConfirmModal(); // Close the modal after deletion

    if (onNoteDeleted) { // Check if the prop was provided
      onNoteDeleted(); // Call the callback function provided by the parent
    }
  };


  return (
    <div>
      <div className='min-w-[150px] border rounded-lg p-5 min-h-[150px]'>
        <div className='flex flex-row gap-4 justify-end'>
            <div><EditNoteIcon/></div>
            <button onClick={handleOpenDeleteConfirmModal}><DeleteIcon/></button>
        </div>
        <p>{title}</p>
        <p>{content}</p>
      </div>

      <Delete  show={showDeleteConfirmModal} onClose={handleCloseDeleteConfirmModal}>
       <h2> Confirm Deletion</h2>
       <p>Are you sure you want to delete this note? This action cannot be undone.</p>
       <button onClick={handleCloseDeleteConfirmModal}>cancel</button>
       <button  onClick={handleConfirmDelete}>delete</button>
       </Delete>
    </div>
  )
}
