import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import FirebaseWrapper from "./db";

  function App() {
  const fb = new FirebaseWrapper()
  const [notes, setNotes] = useState([]);
  // const getData =  async() {
  //   let notes = await fb.getAll('notes')
  //   console.log("notes", notes)
  //   setNotes(notes)
  // }
  // react hooks
  //  1. functional component/ stateless componant == if you are not define any state
  // 2. class componant / stateful componnet // if you hAVE state then class

  useEffect(() => {
    async function getData() {
      const notes = await fb.getAll('notes')
      setNotes(notes)
    }
    getData()
  }, [])

  function addNote(newNote) {
    // TODO add data to firebase
    fb.insert('notes', newNote)
    // setNotes(prevNotes => {
    //   return [...prevNotes, newNote];
    // });
  }

  function deleteNote(id) {
    fb.delete('notes', id)

    // setNotes(prevNotes => {
    //   return prevNotes.filter((noteItem, index) => {
    //     return index !== id;
    //   });
    // });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
