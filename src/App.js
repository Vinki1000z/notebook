import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login"
import Signup from "./components/Signup"

//  header me notes state wali file jani hai
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Notestate from "./createcontext/Notes/Notestate";
import Alertstate from "./createcontext/Alert/Alertstate";
function App() {
  // see this
  // window.onbeforeunload = function() {
  //   localStorage.removeItem("token");
  //   return '';
  // };
  return (
    <>
    <Router>
        <Navbar />
        <Alertstate>
      <Notestate>
        <Routes>
        <Route exact path="/" element={<Login/>}></Route>
        <Route exact path="/signup" element={<Signup/>}></Route>
        <Route exact path="/home" element={<Home/>}></Route>
     
        </Routes>
      </Notestate>
      </Alertstate>
    </Router>
    </>
  );
}

export default App;
