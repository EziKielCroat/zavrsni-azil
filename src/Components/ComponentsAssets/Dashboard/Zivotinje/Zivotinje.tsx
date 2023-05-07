
import {useEffect, useState} from 'react';
import { doc, collection, updateDoc, arrayUnion, getDoc} from "firebase/firestore"; 
import {db} from '../../../../firebase.js';

import PopisZivotinja from './PopisZivotinja.js';
import DodajZivotinju from './DodajZivotinju.js';
function Zivotinje(props) {
    const [sveZivotinje, setSveZivotinje] = useState([]);
    const [prikaziDodajZivotinju, setPrikaziDodajZivotinju] = useState(false);

    useEffect(() => {
        async function getZivotinje() {
            const zivotinjeRef = doc(db, "Zivotinje", "svezivotinje");
            const zivotinjeSnap = await getDoc(zivotinjeRef);
            setSveZivotinje(zivotinjeSnap.data().popis);
        }

        getZivotinje();
    }, []);

    const removeComponent = () => {
        setPrikaziDodajZivotinju(false);
    }

    return(
        <div className="zivotinje-holder">
            <h3>Životinje</h3>
            {sveZivotinje.length > 0 && <PopisZivotinja zivotinje={sveZivotinje}></PopisZivotinja>}
            {prikaziDodajZivotinju && <DodajZivotinju removeComponent={removeComponent}></DodajZivotinju>} 
            <br />
            <button onClick={() => {setPrikaziDodajZivotinju(true)}}>Dodaj novu životinju</button>
            {/*popisZivotinja, UnosiZivotinje*/}
        </div>
    )
} 

export default Zivotinje