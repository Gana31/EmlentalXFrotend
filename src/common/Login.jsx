import React, { useState } from 'react'
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import '../assets/loginfrom.css'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';




const Login = () => {
  const apiUrl = import.meta.env.VITE_BaseUrl;
    const navigate = useNavigate();
    const [passShow, setPassShow] = useState(false);
    const [formdata,setformdata]=useState({
        userName: "",
        password: "",
    })
    
    const handleOnChange = (e) => {
        setformdata((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const handlesubmit =async(e) =>{
        e.preventDefault()
        const {userName,password} = formdata;
         if(password === "") {
          toast.error("password is required!", {
              position: "top-center"
          });
      } else if (password.length < 6) {
          toast.error("password must be 6 char!", {
              position: "top-center"
          });
      } else if (userName === "") {
          toast.error("userName is required!", {
              position: "top-center"
          });
      
    }
        
        try {
        
      const response = await axios.post(`${apiUrl}/login`,{userName,password},{  withCredentials: true,});
          console.log(response?.data?.user)
          if(response.data.success){
            toast.success("Login Successfully done 😃!", {
              position: "top-center"
            });
            navigate("/dashboard")
            localStorage.setItem("user",JSON.stringify(response.data.user));
          }
        
          // console.log(formdata)
        } catch (error) {
          toast.error(error.response?.data?.message)
          console.log("errrrr",error)
        }
      }
  return (
   <>
   <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log In</h1>
            <p>Hi, we are you glad you are back. Please login.</p>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="userName">Userame</label>
              <input type="text"  name="userName" id="userName" value={formdata.userName} onChange={handleOnChange} placeholder='Enter Your Email Address' />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input type={!passShow ? "password" : "text"} value={formdata.password} onChange={handleOnChange} name="password" id="password" placeholder='Enter Your password' />
                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

            <button className='btn' onClick={handlesubmit}>Login</button>
            <p>Don't have an Account? <NavLink to="/signup" className="blubtn">Sign Up</NavLink> </p>
          </form>
        </div>
      </section>
   </>
  )
}

export default Login