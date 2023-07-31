import React, { useContext, useState } from "react";
import Notecontext from "../createcontext/Notes/Notecontext";

export default function Navbar() {
  const context = useContext(Notecontext);
  
  const { Addnotes } = context;
  const [note, setnote] = useState({ title: "", description: "" });

  //  main point here
  function handelonchange(e) {
    setnote({ ...note, [e.target.name]: e.target.value });
  }

  function handleonclick(e) {
    e.preventDefault();
    Addnotes(note);
  }


  return (
    <>
      <form>
        <div className="mb-3 w-75">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            required
            minLength={5}
            onChange={handelonchange}
          />
        </div>
        <div className="mb-3 w-75">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Description
          </label>
          <input
            type="text "
            className="form-control"
            id="description"
            name="description"
            required
            minLength={5}
            onChange={handelonchange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleonclick}
        >
          Add Note
        </button>
      </form>
    </>
  );
}
