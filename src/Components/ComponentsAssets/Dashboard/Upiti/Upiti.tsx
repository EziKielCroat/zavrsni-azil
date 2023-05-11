

import {useEffect, useState} from 'react';
import { doc, collection, updateDoc, arrayUnion, getDocs} from "firebase/firestore"; 
import {db} from '../../../../firebase.js';
import PrikaziUpit from './PrikaziUpiti.js';
import './Upiti.css';

function Upiti() {
    const [upiti, setUpiti] = useState([]);

    useEffect(()=> {
        async function getUpiti() {
            const querySnapshot = await getDocs(collection(db, "Upiti"));
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });
            setUpiti(data);
    }
    getUpiti();

    },[]);

    return(
        <div className="upiti-container">
                {upiti.map((upit, index) => (
                 <PrikaziUpit key={index} upit={upit} upiti={upiti}/>
                ))}
        </div>
    )
}

export default Upiti