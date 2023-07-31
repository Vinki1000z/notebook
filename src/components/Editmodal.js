import React, { useContext ,useState } from "react";
import Notecontext from "../createcontext/Notes/Notecontext";

export default function Editmodal(props) {
  const {noteid,title,description}=props;
  // console.log("modal"+noteid);
  // console.log(title,description);
  const context = useContext(Notecontext);
  const {editnote}=context;

  const [Editnote, setEditnote] = useState({ title,description});

  function handelonchange(e) {
    // console.log( {[e.target.name]: e.target.value })
    setEditnote({ ...Editnote, [e.target.name]: e.target.value });
  }
  function handleonclick(e){
  
      e.preventDefault();
      editnote(Editnote,noteid);
  }

  return (
    <>
      <div
        className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
        
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
                <div className="mb-3 w-75">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={Editmodal.title}
                    // aria-describedby="emailHelp"
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
                    value={Editmodal.description}
                    onChange={handelonchange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleonclick}
                data-bs-dismiss="modal"
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
