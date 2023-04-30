
import './App.css'
import {BrowserRouter, Routes,Route,Navigate} from "react-router-dom";
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';

function RequireAuth({ children }) {
  const authed = localStorage.getItem("userLogged"); // zamjenit ovdi sa localstorage kako ces upisivat jel korisnik ulogiran
  console.log(authed);
  return authed ? children : <Navigate to="/login" replace />;
}

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/home"element={<RequireAuth><Home /></RequireAuth>}/>
      <Route path="/login" element={<Login></Login>} />
      <Route path="/register" element={<Register></Register>} />
    </Routes>
    </BrowserRouter>
  )
}
export default App
