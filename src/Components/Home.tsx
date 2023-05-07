
import { useNavigate } from 'react-router-dom';
import './ComponentsAssets/Home.css';
import {useState, useEffect} from 'react';

import { doc, collection, addDoc, getDoc} from "firebase/firestore"; 
import {db} from '../firebase.js';

import PrikaziZivotinje from './ComponentsAssets/PopisZivotinja/PrikaziZivotinje.js';

function Home() {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [sveZivotinje, setSveZivotinje] = useState([]);

    useEffect(() => {
        async function getZivotinje() {
            const zivotinjeRef = doc(db, "Zivotinje", "svezivotinje");
            const zivotinjeSnap = await getDoc(zivotinjeRef);

            console.log(zivotinjeSnap.data().popis);
            setSveZivotinje(zivotinjeSnap.data().popis);
        }
        getZivotinje();
    }, []);

    const checkAdmin = () => {
        if(userInfo.userType == "admin") {
            return true;
        } else {
            return false;
        }
    }
    return(
        <div>
            <div className="container">
                <nav className="nav-holder">
                    <h2>Azil za životinje</h2>

                    <ul className="nav-stranice">
                        <button onClick={() => {navigate('/aboutus')}}><li>O nama</li></button>
                        <button onClick={() => {navigate('/donations')}}><li>Donacije</li></button>
                        <button onClick={() => {navigate('/notifications')}}><li>Obavijesti</li></button>
                        {checkAdmin() ? (<button onClick={() => {navigate('/dashboard')}}><li>Admin opcije</li></button>) : ( <></>)}
                    </ul>
                </nav>

                <div className="popis-zivotinja">
                    <div className="filter-zivotinja">
                        <h3>Filtriraj:</h3>
                        <div className="filter-1">
                            <h4>Po statusu udomljenosti</h4>
                            <select name="filter-1" id="filter-1" onChange={() => {filtrirajStatusUdomljenosti()}}>
                                <option value="svi">Svi</option>
                                <option value="udomljeni">Udomljeni</option>
                                <option value="neudomljeni">Neudomljeni</option>
                            </select>
                        </div>
                        <div className="filter-2">
                            <h4>Po vrsti životinje</h4>
                            <select name="filter-2" id="filter-2" onChange={() => {filtrirajVrstaZivotinje()}}>
                                <option value="svi">Svi</option>
                                <option value="macke">Mačke</option>
                                <option value="psi">Udomljeni</option>
                            </select>
                        </div>
                    </div>
                    {sveZivotinje.length > 0 && <PrikaziZivotinje popis={sveZivotinje}></PrikaziZivotinje>}
                </div>
            </div>
        </div>
    )
}

export default Home