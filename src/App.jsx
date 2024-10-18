import './App.css'

import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './common/Login'
import Signup from './common/Signup'
import PrivateRoute from './common/ProtectedRoutes'
import Dashboard from './common/Dashboard'
import NavbarComponent from './common/Navbar'

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
    <NavbarComponent/>
    <Routes>    
      {!user && 
            <>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            </>
      }

      <Route element={<PrivateRoute/>}>
        <Route path="/" element={<Navigate to="/dashboard"/>} />
        <Route path="/login" element={<Navigate to="/dashboard"/>} />
        <Route path="/signup" element={<Navigate to="/dashboard"/>} />
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Route>
    </Routes>


    </>

  )
}

export default App
