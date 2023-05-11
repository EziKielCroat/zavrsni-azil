


import './ComponentsAssets/Donations/Donations.css';
import ModalComponent from './ComponentsAssets/Donations/ModalComponet';
import Trazimo from './ComponentsAssets/Donations/Trazimo';
import NudiSe from './ComponentsAssets/Donations/NudiSe';
import Donirano from './ComponentsAssets/Donations/Donirano';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

function Donations() {
    const [modalComponentOn, setModalComponentOn] = useState(false);
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const checkAdmin = () => {
        if(userInfo.userType == "admin") {
            return true;
        } else {
            return false;
        }
    }

    const novaDonacija = () => {
        setModalComponentOn(true);
    }

    const removeComponent = () => {
        setModalComponentOn(false);
    }

    return(
        <div className="container">
            <nav className="nav-holder">
            <h2>Azil za životinje</h2>

            <ul className="nav-stranice">
                <button onClick={() => {navigate('/')}}><li>Home</li></button>
                <button onClick={() => {navigate('/aboutus')}}><li>O nama</li></button>
                <button onClick={() => {navigate('/notifications')}}><li>Obavijesti</li></button>
                <button onClick={() => {navigate('/settings')}}><li>Postavke računa</li></button>
                {checkAdmin() ? (<button onClick={() => {navigate('/dashboard')}}><li>Admin opcije</li></button>) : ( <></>)}
            </ul>
        </nav>

         <div className="donations-container">
            <button className="nova-donacija" onClick={() => {novaDonacija()}}>Nova donacija</button>
            {modalComponentOn && <ModalComponent removeComponent={removeComponent}></ModalComponent>}
            <div className="donations-show">
            <Trazimo></Trazimo>
            <NudiSe></NudiSe>
            <Donirano></Donirano>
            </div>
         </div>
        </div>
    )
}

export default Donations