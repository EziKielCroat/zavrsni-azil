
import './App.css'
import {BrowserRouter, Routes,Route,Navigate} from "react-router-dom";
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import AboutUs from './Components/AboutUs';

function RequireAuth({ children }) {
  const authed = localStorage.getItem("userLogged"); // zamjenit ovdi sa localstorage kako ces upisivat jel korisnik ulogiran
  return authed ? children : <Navigate to="/login" replace />;
}

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/home" element={<RequireAuth><Home /></RequireAuth>}/>
      <Route path="/login" element={<Login></Login>} />
      <Route path="/register" element={<Register></Register>} />
      <Route path="/onama" element={<RequireAuth><AboutUs /></RequireAuth>}/>
    </Routes>
    </BrowserRouter>
  )
}
export default App
