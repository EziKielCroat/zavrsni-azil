
import './App.css'
import {BrowserRouter, Routes,Route,Navigate} from "react-router-dom";
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import AboutUs from './Components/AboutUs';
import Notifications from './Components/Notifications';
import Donations from './Components/Donations';
import Dashboard from './Components/Dashboard';
import AccountSettings from './Components/AccountSettings';
function RequireAuth({ children }) {
  const authed = localStorage.getItem("userLogged"); 
  return authed ? children : <Navigate to="/login" replace />;
}

function RequireAdmin({children}) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if(userInfo.userType == "admin") {
    return children
  } else {
    return <Navigate to="/login" replace />
  }
}

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<RequireAuth><Home /></RequireAuth>}/>
      <Route path="/aboutus" element={<RequireAuth><AboutUs /></RequireAuth>}/>
      <Route path="/donations" element={<RequireAuth><Donations /></RequireAuth>}/>
      <Route path="/notifications" element={<RequireAuth><Notifications /></RequireAuth>} />
      <Route path="/settings" element={<RequireAuth><AccountSettings /></RequireAuth>} />

      
      <Route path="/dashboard" element={<RequireAdmin><Dashboard /></RequireAdmin>} />

      <Route path="/login" element={<Login></Login>} />
      <Route path="/register" element={<Register></Register>} />
    </Routes>
    </BrowserRouter>
  )
}
export default App
