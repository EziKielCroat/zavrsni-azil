
import ModalComponent from './ModalComponent';
import Trazimo from './Trazimo';
import NudiSe from './NudiSe';
import Donirano from './Donirano';

import { useState } from "react";

import '../Dashboards.css';

function Donations() {
    const [modalComponentOn, setModalComponentOn] = useState(false);

    const novaDonacija = () => {
        setModalComponentOn(true);
    }

    const removeComponent = () => {
        setModalComponentOn(false);
    }

    return(
         <div className="donations-container-admin">
            <button className="nova-donacija" onClick={() => {novaDonacija()}}> Nova donacija</button>
            {modalComponentOn && <ModalComponent removeComponent={removeComponent}></ModalComponent>}
            <div className="donations-show">
            <Trazimo></Trazimo>
            <NudiSe></NudiSe>
            <Donirano></Donirano>
            </div>
         </div>
    )
}

export default Donations