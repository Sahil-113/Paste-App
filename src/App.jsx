import { useState, useEffect } from "react";
import "./App.css";
import Note from "./components/Note.jsx";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", text: "", image: "" });

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  const saveNotesToLocalStorage = (notes) => {
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  const addNote = () => {
    if (newNote.title && newNote.text) {
      const newId = Date.now().toString();
      const updatedNotes = [...notes, { ...newNote, id: newId }];
      setNotes(updatedNotes);
      saveNotesToLocalStorage(updatedNotes);
      setNewNote({
        title: "",
        text: "",
        image: "",
      });
    }
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
  };

  const editNote = (id, newText, newImage) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, text: newText, image: newImage } : note
    );
    setNotes(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewNote({ ...newNote, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Paste App</h1>
      <div className="note-form bg-white p-6 rounded-lg shadow-md mb-8">
        <input
          type="text"
          placeholder="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          className="w-full p-2 mb-4 border-b-2 border-blue-500 focus:border-blue-700 outline-none"
        />
        <textarea
          rows="4"
          cols="50"
          placeholder="Text"
          value={newNote.text}
          onChange={(e) => setNewNote({ ...newNote, text: e.target.value })}
          className="w-full p-2 mb-4 border-b-2 border-blue-500 focus:border-blue-700 outline-none"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4 mr-5 bg-green-500 text-white py-1 px-2 rounded hover:bg-green-700 transition"
        />
        <button
          onClick={addNote}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Add Note
        </button>
      </div>
      <div className="note-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            onDelete={deleteNote}
            onEdit={editNote}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
