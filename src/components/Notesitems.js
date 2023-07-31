import React, { useContext, useState} from "react";
import Notecontext from "../createcontext/Notes/Notecontext";

import Editmodal from "./Editmodal";

export default function Navbar(props) {
  const context = useContext(Notecontext);
  const [show,setshow]=useState(false);
  const [note2,setnote2]=useState({id:"",title:"",description:""});
  const { deletnote } = context;
  const { note } = props;
  // const [value,setvalue]=useState(0);
  const handelondelete = (e) => {
    e.preventDefault();
    const deletId = note._id;
    deletnote(deletId);
  };
  // const ref=useRef(null);

  const handleonedit = (e) => {
    e.preventDefault();
    setshow(true);
    setnote2.id(note._id);
    setnote2.title(note.title);
    setnote2.description(note.description);
    // ref.current.click();
  }
  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <div className="d-flex flex-row d-flex justify-content-between">
            <h5 className="card-title">{note.title}</h5>
            <div>
              <i
                style={{ cursor: "pointer", marginRight: "10px" }}
                onClick={handelondelete}
                className="fa-solid fa-trash"
              ></i>
              <i
                style={{ cursor: "pointer" }}
                className="fa-solid fa-pen-to-square "
                data-bs-toggle="modal"
                 data-bs-target="#exampleModal" 
                 data-bs-whatever="@mdo"
                
                // onClick={{handleonedit:handleonedit,noteid:note._id,title:note.title,description:note.description}}
                // onClick={<Editmodal noteid={note._id} title={note.title} description={note.description}/>}
                onClick={handleonedit}
              ></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
      
      { 
        show && <Editmodal
        // ref={ref}
          noteid={note2._id}
          title={note2.title}
          description={note2.description}
        />
      }
    </>
  );
}
