
import {useEffect, useState} from 'react';
import { doc, getDoc} from "firebase/firestore"; 
import {db} from '../../../firebase.js';

import PrikazTrazimo from './PrikazTrazimo';
function Trazimo () {
    const [trazimoPopis, setTrazimoPopis] = useState([]);

    useEffect( () => {
        async function getTrazimoPopis() {
            const trazimoRef = doc(db, "Donacije", "trazimo");
            const trazimoSnap = await getDoc(trazimoRef);
            setTrazimoPopis(trazimoSnap.data().trazimoPopis);
        }
        getTrazimoPopis();
    }, []);

    return(
        <div className="trazimo-container">
        <h2>Tražimo:</h2>
        {trazimoPopis.length > 0 && <PrikazTrazimo trazimo={trazimoPopis}></PrikazTrazimo>}    
        </div>
    )
}

export default Trazimo