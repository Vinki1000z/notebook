import React, { useState ,useContext} from "react";
import Notecontext from "./Notecontext";
import Alertcontext from "../Alert/Alertcontext";
// main point
//  rembeber to add http://
const network = "http://localhost:5000";
export default function Notestate(props) {
  const context = useContext(Alertcontext);
  const {showalert}=context;
  const notes_int = [];
  const [notes, setnotes] = useState(notes_int);
  const sendingalert=(msg,role)=>{
    let show=true;
    const alert={grole:role,gmsg:msg,gshow:show}
    showalert(alert);
    setTimeout(() => {
      show=false;
      const alert={grole:role,gmsg:msg,gshow:show}
      showalert(alert);
    }, 2000);
  }
  //  main point
  // fixing cors issue in react js
  const Addnotes = async (note) => {
    const { title, description } = note;

    const response = await fetch(`${network}/api/notes/createnote`, {
      method: "POST",
      body: JSON.stringify({ title, description }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "auth-token":localStorage.getItem('token'),

      },
    });
    //  main point
    const data=await response.json();
    sendingalert(data.msg,data.role);
    setnotes(notes.concat(data));
    // console.log(data);
  };
  const allnotes = async () => {
    const response = await fetch(`${network}/api/notes/allnotes`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "auth-token":localStorage.getItem('token'),
      },
    });
    const data=await response.json();
    // console.log(data);
    setnotes(data);
  };
  const deletnote = async(deletId) => {

    const response = await fetch(`${network}/api/notes/delete/${deletId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "auth-token":localStorage.getItem('token'),
         
      },
    });
    //  main point
    const data=await response.json();
    console.log(data);
    sendingalert(data.msg,data.role);
    const newnotes = notes.filter((note) => {
      return note._id !== deletId;
    });
    setnotes(newnotes);
  };

  const editnote = async(note,id) => {
    console.log(id);
    const {title, description } = note;
    const response = await fetch(`${network}/api/notes/editnote/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, description }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "auth-token":localStorage.getItem('token'),
         
      },
    });
    const data=await response.text();
    console.log(data);
    let newnote=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newnote.length; index++) {
      const element = newnote[index];
      if (element._id === id) {
        newnote[index].title = title;
        newnote[index].description = description;
      }
      break;
    }
    setnotes(newnote);
  };
  return (
    <>
      {/*  carefull it should be value not values */}
      <Notecontext.Provider
        value={{ notes, setnotes, Addnotes, deletnote, editnote, allnotes }}
      >
        {props.children}
      </Notecontext.Provider>
    </>
  );
}
