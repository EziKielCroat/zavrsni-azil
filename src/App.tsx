
import './App.css'
import {BrowserRouter, Routes,Route,Navigate} from "react-router-dom";
import Home from './Components/Home';
import Login from './Components/Login';
function RequireAuth({ children }) {
  const authed = false; // zamjenit ovdi sa localstorage kako ces upisivat jel korisnik ulogiran

  return authed === true ? children : <Navigate to="/login" replace />;
}

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route path="/login" element={<Login></Login>} />
    </Routes>
    </BrowserRouter>
  )
}
export default App
