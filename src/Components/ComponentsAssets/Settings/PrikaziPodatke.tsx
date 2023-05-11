
import {useState} from 'react';
import Promjeni from './Promjeni';

function PrikaziPodatke(props) {

    const {podaci} = props;
    const [showPassword, setShowPassword] = useState(false);
    const [promjeni, setPromjeni] = useState(false);

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

    const removePromjeni = () => {
        setPromjeni(false);
    }

    return(
        <div className="account-info">
        <div className="title">
          <h4>Tvoji podaci:</h4>
        </div>
        <div className="content">
          <p>Ime: {podaci.userName}</p>
          <p>Datum rođenja: {podaci.userDob}</p>
          <p>Email: {podaci.userEmail}</p>
          <p>Dozvola: {podaci.userType}</p>
          <p> Šifra: <input type={showPassword ? 'text' : 'password'} value={podaci.userPassword} disabled/> <button onClick={handleTogglePassword}>Prikaži šifru</button></p>
          <p><button onClick={() => {setPromjeni(true)}}>Promjeni podatke</button></p>
          {promjeni && <Promjeni removeComponent={removePromjeni} podaci={podaci}></Promjeni>}
        </div>
      </div>
    )
}

export default PrikaziPodatke