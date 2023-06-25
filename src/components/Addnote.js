import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

const Addnote = (props) => {
  const context = useContext(NoteContext);
  const [note, setNote] = useState({title: "", description: "", tag: "default"})
  const { addNote } = context;

  const handleClick = (e) =>{
    props.showAlert("Note Added Successfully","success")
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    document.getElementById('title').value = "";
    document.getElementById('tag').value = "";
    document.getElementById('description').value = "";
  }
  const handleChange = (e) =>{
    setNote({...note, [e.target.name]:e.target.value})
  }
  return (
    <div className="container my-3">
      <h3>Add Note</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-outline-warning" onClick={handleClick}>
          Add
        </button>
      </form>
    </div>
  );
};

export default Addnote;
