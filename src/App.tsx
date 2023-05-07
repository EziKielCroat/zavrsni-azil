
import './App.css'
import {BrowserRouter, Routes,Route,Navigate} from "react-router-dom";
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import AboutUs from './Components/AboutUs';
import Notifications from './Components/Notifications';
import Donations from './Components/Donations';

function RequireAuth({ children }) {
  const authed = localStorage.getItem("userLogged"); // zamjenit ovdi sa localstorage kako ces upisivat jel korisnik ulogiran
  return authed ? children : <Navigate to="/login" replace />;
}

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<RequireAuth><Home /></RequireAuth>}/>
      <Route path="/aboutus" element={<RequireAuth><AboutUs /></RequireAuth>}/>
      <Route path="/donations" element={<RequireAuth><Donations /></RequireAuth>}/>
      <Route path="/notifications" element={<RequireAuth><Notifications /></RequireAuth>} />
      {/* napravit sljedece donacije ili obavijesti koji je jednostavniji<Route path="/" element={<AboutUs />}/>*/}

      <Route path="/login" element={<Login></Login>} />
      <Route path="/register" element={<Register></Register>} />
    </Routes>
    </BrowserRouter>
  )
}
export default App
