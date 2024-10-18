import React, { useState } from 'react'
import "../assets/loginfrom.css"
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import axios from 'axios'; 

const Signup = () => {
    const apiUrl = import.meta.env.VITE_BaseUrl;
  const navigate = useNavigate();
  const [passShow, setPassShow] = useState(false);
  const [formdata,setFormData]=useState({
    Name:"",
    userName: "",
    email: "",
    password: "",
    dateOfBirth: "",
  })
  
  const handleOnChange = (e) => {
      setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
      }))
  }

  const handlesubmit =async(e) =>{
    e.preventDefault()
    const {Name,userName,email,password,dateOfBirth} = formdata;
    if (Name === "") {
      toast.warning("Name is required!", {
          position: "top-center"
      });
  } else if (email === "") {
      toast.error("email is required!", {
          position: "top-center"
      });
  } else if (!email.includes("@")) {
      toast.error("includes @ in your email!", {
          position: "top-center"
      });
  } else if (password === "") {
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
  else if (dateOfBirth === "") {
    toast.error("dateOfBirth is required!", {
        position: "top-center"
    });
}
    
    try {
    
  const response = await axios.post(`${apiUrl}/register`,{Name,userName,email,password,dateOfBirth});
      console.log(response);
      if(response.data.success){
        toast.success("Registration Successfully done 😃!", {
          position: "top-center"
        });
        navigate("/login")
      }
    
      // console.log(formdata)
    } catch (error) {
      toast.error(error.response.data.message)
      // console.log("errrrr",error)
    }
  }
  return (
    <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Sign Up</h1>
                        <p style={{ textAlign: "center" }}>We are glad that you will be using Resume Builder to manage <br />
                            your Resume! We hope that you will get like it.</p>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="Name">Name</label>
                            <input type="text" name="Name"value={formdata.Name} onChange={handleOnChange} id="Name" placeholder='Enter Your Name' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="fname">Username</label>
                            <input type="text" name="userName" value={formdata.userName} onChange={handleOnChange} id="userName" placeholder='Enter Your usename' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email"  name="email" value={formdata.email} onChange={handleOnChange} id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} value={formdata.password} onChange={handleOnChange}  name="password" id="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <div className="form_input">
                        <label htmlFor="dob">Date of Birth</label>
                        <input 
                          type="date" 
                          name="dateOfBirth" 
                          id="dateOfBirth"
                          value={formdata.dateOfBirth}
                          onChange={handleOnChange}
                        />
                      </div>
                        <button className='btn' onClick={handlesubmit}>Sign Up</button>
                        <p>Already have an account? <NavLink to="/login" className="blubtn">Log In</NavLink></p>
                    </form>
                  
                </div>
            </section>
  )
}

export default Signup