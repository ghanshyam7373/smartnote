import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(NoteContext);
  const { notes, getNotes, updateNote } = context;
  const history = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      history('/login');
    }
  }, []);

  const [note, setNote] = useState({
    etitle: "",
    edescription: "",
    etag: "",
    eid: ""
  });

  const handleClick = (e) => {
    e.preventDefault();
    updateNote(note.eid, note.etitle, note.edescription, note.etag);
    closeref.current.click();
    props.showAlert("Note Updated Successfully","success")
  };
 
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const ref = useRef(null);
  const closeref = useRef(null);
  const openEditModal = (currNote) => {
    const { title, description, tag, _id } = currNote;
    setNote({ etitle: title,edescription: description,etag: tag, eid: _id });
    ref.current.click();
  };

  return (
    <>
      {/* edit modal */}
      <div>
        <button
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#edit-modal"
          ref={ref}
        >
          Launch demo modal
        </button>
        <div
          className="modal fade"
          id="edit-modal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit Note
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={note.etitle}
                      id="etitle"
                      name="etitle"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">
                      Tag
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={note.etag}
                      id="etag"
                      name="etag"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      value={note.edescription}
                      rows="3"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-warning"
                  data-bs-dismiss="modal"
                  ref = {closeref}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={handleClick}
                >
                  Update Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-3">
        <div className="row">
          <h3>Your Notes</h3>
          {notes.length > 0?
          notes.map((note) => {
            return (
              <NoteItem
                key={note._id+"h1"}
                note={note}
                openEditModal={openEditModal}
                showAlert={props.showAlert}
              />
            );
          }): <h6>Add notes to preview</h6>}
        </div>
      </div>
    </>
  );
};

export default Notes;
