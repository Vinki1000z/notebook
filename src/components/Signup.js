import React, { useState ,useContext} from "react";
import {useNavigate} from "react-router-dom"
import Alertcontext from '../createcontext/Alert/Alertcontext';

function Signup() {
  const network = "http://localhost:5000";
    let navigate = useNavigate();
    const context = useContext(Alertcontext);
    const {showalert}=context;

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
  const [auth, setauth] = useState({ email: "", password: " ", username: "" });
  const submit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${network}/api/auth/signup`, {
      method: "POST",
      body: JSON.stringify({
        email: auth.email,
        password: auth.password,
        name: auth.username,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiMjVkZDRkNTcxZDk1M2NhZmVkZWQ4In0sImlhdCI6MTY4OTQxMTAyOH0.6BNlsu0DQHKpipKkWoSG2g9B8MGGLyQs2X5qLVOuh44",
      },
    });
    const data = await response.json();

    if(data.success===true){
      // localStorage.setItem('token',data.token);
      navigate('/');
      sendingalert("Account created","success");
      
    }
    else{
      console.log(data.msg);
      sendingalert(data.msg,"warning");
    }
  };
  const setting = (e) => {
    setauth({ ...auth, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container my-4">
        <form onSubmit={submit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              onChange={setting}
              id="username"
              name="username"
              minLength={5} 
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              onChange={setting}
              id="email"
              name="email"
              required
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              onChange={setting}
              name="password"
              id="exampleInputPassword1"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
