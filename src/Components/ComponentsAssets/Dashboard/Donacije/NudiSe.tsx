
import {useEffect, useState} from 'react';
import { doc, getDoc} from "firebase/firestore"; 
import {db} from '../../../../firebase.js';
import PrikaziNudise from './PrikaziNudiSe.js';

function NudiSe () {
    const [nudiSe, setNudiSe] = useState([]);

    useEffect(() => {
        async function getNudiSe() {
            const nudiSeRef = doc(db, "Donacije", "nudise");
            const nudiSeSnap = await getDoc(nudiSeRef);
            setNudiSe(nudiSeSnap.data().nudisePopis);
        }
        getNudiSe();    
    },[]);

    return(
        <div className="nudise-container">
            <h2>Nudi se:</h2>
            {nudiSe.length > 0 && <PrikaziNudise nudise={nudiSe}></PrikaziNudise>}    

        </div>
    )
}

export default NudiSe