import React, { useEffect } from "react";
import Addnotes from "./Addnotes";
import Allnotes from "./Allnotes";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/");
    }
    /* eslint-disable */
  });

  return (
    <>
      <div className="container my-3 ">
        <h2>Add Note</h2>
      </div>
      <div className="container my-3 ">
        <Addnotes />
        <Allnotes />
      </div>
    </>
  );
}
