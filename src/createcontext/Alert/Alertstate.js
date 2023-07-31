import React, { useState } from "react";
import Alertcontext from "./Alertcontext";

function Alertstate(props) {
  const [role, setrole] = useState("");
  const [msg, setmsg] = useState("");
  const [show, setshow] = useState("");
  const showalert = (alert) => {
    const { grole, gmsg ,gshow} = alert;
    setrole(grole);
    setmsg(gmsg);
    setshow(gshow);
    // console.log(alert);
  };

  return (
    <>
      <Alertcontext.Provider value={{showalert}}>
        
       { show &&
        <div
          className={`alert alert-${role}  alert-dismissible`}
          
          role="alert"
        >
          {msg}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
}
        {props.children}

      </Alertcontext.Provider>
    </>
  );
}

export default Alertstate;
