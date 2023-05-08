


import '../Dashboards.css';
import ModalComponent from './ModalComponent';
import Trazimo from './Trazimo';
import NudiSe from './NudiSe';
import Donirano from './Donirano';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

function Donations() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [modalComponentOn, setModalComponentOn] = useState(false);
    const navigate = useNavigate();

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

         <div className="donations-container-admin">
            <button className="nova-donacija" onClick={() => {novaDonacija()}}> Nova donacija</button>
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