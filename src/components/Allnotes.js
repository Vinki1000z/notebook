import React, { useContext, useEffect } from "react";
import Notesitems from "./Notesitems";
import Notecontext from "../createcontext/Notes/Notecontext";
export default function Navbar() {
  const context = useContext(Notecontext);

  // 1. main point
  //  ya dono declertion same he hai
  // const notes=context.notes;

  // 2. main point
  //  always rember what you have wriiten in hook value nad that value will bw written in contex desturcuting
  const { notes ,allnotes} = context;
  useEffect(() => {
    allnotes();
    /* eslint-disable */ 
  }, [notes])
  
  return (
    <>
      <div className="container">
        <div className="row my-5 gy-5">{
          notes.map((note)=>{
            return(
              <>
       
              {/*  main point
              1. in contex prop there is diiferrnt syntax
              2. in porp hook there is different syntax
               */}
              <div  key={note._id}  className="col-md-4" >
              <Notesitems note={note} />
              </div>
              </>

            )
          })
        } </div>
      </div>
    </>
  );
}


