import { useState, useRef } from "react";

function Note({ note, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(note.text);
  const [editImage, setEditImage] = useState(note.image);
  const [fileChosen, setFileChosen] = useState(false);
  const fileInputRef = useRef(null);

  const handleEdit = () => {
    onEdit(note.id, editText, editImage);
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditImage(reader.result);
      setFileChosen(true);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="note bg-gray-800 text-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow transform hover:scale-105 duration-300">
      <div className="note-header flex justify-between items-center mb-2">
        <div className="flex items-center">
          {note.image && (
            <img
              src={note.image}
              alt="Note"
              className="w-12 h-12 rounded-full mr-4"
            />
          )}
          <h3 className="text-lg font-bold">{note.title}</h3>
        </div>
        <div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-700 transition mr-2"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
      {isEditing ? (
        <div>
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full p-2 mb-2 bg-gray-700 text-white border border-gray-600 rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            ref={fileInputRef}
          />
          <button
            onClick={triggerFileInput}
            className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700 transition mb-2 animate-bounce"
          >
            {fileChosen ? "File Chosen" : "Choose File"}
          </button>
          {editImage && (
            <img
              src={editImage}
              alt="Note"
              className="mb-2 w-16 h-16 rounded-full"
            />
          )}
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <p>{note.text}</p>
        </div>
      )}
    </div>
  );
}

export default Note;
