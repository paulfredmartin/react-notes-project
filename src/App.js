import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import './App.css';
import Sidebar from './Sidebar';
import Main from './Main';

function App() {

  const [notes, setNotes] = useState(localStorage.notes ? JSON.parse(localStorage.notes) : []);
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  /************************************HANDLERS************** */

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };
    console.log(newNote);
    setNotes([newNote,...notes]);
    setActiveNote(newNote.id);
  };

  const onUpdateNote = (updatedNote) => {
   const updatedNotesArray = notes.map((note) => {

    if(note.id === activeNote) {
      return updatedNote;
    }

    return note;
   });

    setNotes(updatedNotesArray);
    //console.log('notes array has been updated')
  };

  const onDeleteNote = (idToDelete) => {
    setNotes(notes.filter(note => note.id !== idToDelete));
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  }

/*********************MAIN APP******************************************/

  return (
    <div className="App">
     <Sidebar notes={notes} onAddNote={onAddNote} onDeleteNote={onDeleteNote} activeNote={activeNote} setActiveNote={setActiveNote}/>
     <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote}/>
    </div>
  );
}

export default App;
