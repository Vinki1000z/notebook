import React,{useState,useContext} from 'react'
import {useNavigate} from "react-router-dom"
import Alertcontext from '../createcontext/Alert/Alertcontext';
function Login() {
    const network = "http://localhost:5000";
    const context = useContext(Alertcontext);
    const {showalert}=context;
    let navigate = useNavigate();
    const sendingalert=(msg,role)=>{
      let show=true;
      const alert={grole:role,gmsg:msg,gshow:show}
      // const alert2="hii"
      showalert(alert);
      setTimeout(() => {
        show=false;
        const alert={grole:role,gmsg:msg,gshow:show}
        showalert(alert);
      }, 2000);
    }

    const [auth,setauth]=useState({email:"",password:" "});
    const submit=async(e)=>{
        e.preventDefault();
        const {email,password}=auth;
        const response = await fetch(`${network}/api/auth/login`, {
            method: "POST",
            body: JSON.stringify({ email,password }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiMjVkZDRkNTcxZDk1M2NhZmVkZWQ4In0sImlhdCI6MTY4OTQxMTAyOH0.6BNlsu0DQHKpipKkWoSG2g9B8MGGLyQs2X5qLVOuh44",
      
            },
          });
          const data=await response.json();
          // console.log(data);
          if(data.success===true){
            localStorage.setItem('token',data.token);
            // console.log(data.msg);
            sendingalert("Login successsfuly","success");
            navigate('/home');
            
          }
          else{
            // console.log(data.msg);
            sendingalert(data.msg,"warning");
            console.log(data);
          }
            }
    const setting=(e)=>{
        setauth({ ...auth, [e.target.name]: e.target.value });
    }  
    
    return (
    <>
    <div className='container my-4' on>

    <form onSubmit={submit}>
        

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" onChange={setting} name='email' aria-describedby="emailHelp"  required/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" onChange={setting} id="exampleInputPassword1"required/>
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
    </>
  )
}

export default Login;
