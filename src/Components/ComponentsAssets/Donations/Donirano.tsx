
import {useEffect, useState} from 'react';
import { doc, getDoc} from "firebase/firestore"; 
import {db} from '../../../firebase.js';
import PrikaziDonirano from './PrikaziDonirano.js';

function Donirano () {
    const [donirano, setDonirano] = useState([]);

    useEffect(() => {
        async function getDonirano() {
            const doniranoRef = doc(db, "Donacije", "donirano");
            const doniranoSnap = await getDoc(doniranoRef);
            setDonirano(doniranoSnap.data().doniranoPopis);
        }
        getDonirano();    
    },[]);

    useEffect(() => {console.log(donirano)},[donirano]);

    return(
        <div className="nudise-container">
            <h2>Donirano:</h2>
            {donirano.length > 0 && <PrikaziDonirano donirano={donirano}></PrikaziDonirano>}    

        </div>
    )
}

export default Donirano