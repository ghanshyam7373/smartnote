import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import "../App.css";

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const {deleteNote } = context;
  const { openEditModal, note } = props;

  return (
    <>
      <div className="col-md-3 my-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <h6 className="card-subtitle mb-2">
              {note.tag}
            </h6>
            <p className="card-text">{note.description}</p>
          </div>
          <div className="card-icons">
            <i
              className="fa-solid fa-trash card-icon"
              onClick={()=>{
                  deleteNote(note._id)
                  props.showAlert("Note Deleted Successfully","success")
              }}
            ></i>
            <i
              className="fa-solid fa-pen-to-square card-icon"
              onClick={()=>{openEditModal(note)}}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
