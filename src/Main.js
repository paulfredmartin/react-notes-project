import React from 'react';
import ReactMarkdown from 'react-markdown';

const Main = ({ activeNote, onUpdateNote }) => {

  const onEditField = (key, value) => {
    //if (value.includes('{{title}}')) {
    //  var finalValue = value.replace('{{title}}',activeNote.title)
   // } 
    
    onUpdateNote({
      ...activeNote,
      [key]: value,
      lastModified: Date.now(),
    })
  };

  const selectText = (event) => {
    const input = document.getElementById(event.currentTarget.id);
    input.select();
  };


  if (!activeNote) return <div className="no-active-note">No note selected</div>;

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input type="text" id="title" value={activeNote.title} onChange={(e) => onEditField("title", e.target.value)} autoFocus onClick={selectText}/>
        <textarea id="body" placeholder="Start typing notes here..." value={activeNote.body} onChange={(e) => onEditField("body", e.target.value)}/>
      </div>

      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">{activeNote.body}</ReactMarkdown>
      </div>
    </div>
  )

}

export default Main;