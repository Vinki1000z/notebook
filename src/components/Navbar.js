import React from "react";
import {
  Link
} from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  let navigate = useNavigate();

  const clear=()=>{
    localStorage.removeItem('token');
    navigate("/");

  }
  return (
    <>
    
     <nav className="navbar navbar-expand-lg bg-body-tertiary ">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Note Book</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active"  aria-current="page" to="/home">Home</Link>
        </li>
        
      </ul>
   
    </div>
 {localStorage.getItem("token")===null?<form><Link className="btn btn-primary" to="/" role="button">Login-In</Link>
    <Link className="btn btn-primary mx-2" to="/signup" role="button">Sign-Up</Link></form>: <Link className="btn btn-primary mx-2" onClick={clear} role="button">Log-Out</Link>}

  </div>
</nav>

    </>
  );
}
