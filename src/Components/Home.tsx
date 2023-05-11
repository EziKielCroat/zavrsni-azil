
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import './ComponentsAssets/Home.css';

import { doc, getDoc} from "firebase/firestore"; 
import {db} from '../firebase.js';

import PrikaziZivotinje from './ComponentsAssets/PopisZivotinja/PrikaziZivotinje.js';

function Home() {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [sveZivotinje, setSveZivotinje] = useState([]);

    async function getZivotinje() {
        try {
            const zivotinjeRef = doc(db, "Zivotinje", "svezivotinje");
            const zivotinjeSnap = await getDoc(zivotinjeRef);
    
            if (zivotinjeSnap.exists()) {
                setSveZivotinje(zivotinjeSnap.data().popis);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function getZivotinjeHelper() {
        try {
            const zivotinjeRef = doc(db, "Zivotinje", "svezivotinje");
            const zivotinjeSnap = await getDoc(zivotinjeRef);
    
            if (zivotinjeSnap.exists()) {
                return zivotinjeSnap.data().popis;
            }
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        getZivotinje();
    }, []);

    const checkAdmin = () => {
        if(userInfo.userType == "admin") {
            return true;
        } else {
            return false;
        }
    }

    const filtrirajStatusUdomljenosti = async (event) => {

        if(sveZivotinje.length > 0) {

            if(event.target.value == "udomljeni") {
                const popisZivotnja = await getZivotinjeHelper();
                const filtrirane = popisZivotnja.filter(animal => animal.animalAdopted === true);
                setSveZivotinje(filtrirane);

            } else if(event.target.value == "neudomljeni") {

                const popisZivotnja = await getZivotinjeHelper();
                const filtrirane = popisZivotnja.filter(animal => animal.animalAdopted === false);
                setSveZivotinje(filtrirane);
            }else if(event.target.value == "svi") {

                getZivotinje();
            }else {
                console.error("Nemogu dobiti vrijednost iz selecta.");
            }

        }
    }

    const filtrirajVrstaZivotinje = async(event) => {

        if(sveZivotinje.length > 0) {

            if(event.target.value == "macke") {

                const popisZivotnja = await getZivotinjeHelper();
                const filtrirane = popisZivotnja.filter(animal => animal.animalType === "macka");
                setSveZivotinje(filtrirane);
            } else if(event.target.value == "psi") {

                const popisZivotnja = await getZivotinjeHelper();
                const filtrirane = popisZivotnja.filter(animal => animal.animalType === "pas");
                setSveZivotinje(filtrirane);
            }else if(event.target.value == "svi") {

                getZivotinje();
            }else {

                console.error("Nemogu dobiti vrijednost iz selecta.");
            }
        }
    }

    return(
            <div className="container">
                <nav className="nav-holder">
                    <h2>Azil za životinje</h2>

                    <ul className="nav-stranice">
                        <button onClick={() => {navigate('/aboutus')}}><li>O nama</li></button>
                        <button onClick={() => {navigate('/donations')}}><li>Donacije</li></button>
                        <button onClick={() => {navigate('/notifications')}}><li>Obavijesti</li></button>
                        <button onClick={() => {navigate('/settings')}}><li>Postavke računa</li></button>
                        {checkAdmin() ? (<button onClick={() => {navigate('/dashboard')}}><li>Admin opcije</li></button>) : ( <></>)}
                    </ul>
                </nav>

                <div className="popis-zivotinja">
                    <div className="filter-zivotinja">
                        <h3>Filtriraj:</h3>
                        <div className="filter-1">
                            <h4>Po statusu udomljenosti</h4>
                            <select name="filter-1" id="filter-1" onChange={() => {filtrirajStatusUdomljenosti(event)}}>
                                <option value="svi">Svi</option>
                                <option value="udomljeni">Udomljeni</option>
                                <option value="neudomljeni">Neudomljeni</option>
                            </select>
                        </div>
                        <div className="filter-2">
                            <h4>Po vrsti životinje</h4>
                            <select name="filter-2" id="filter-2" onChange={() => {filtrirajVrstaZivotinje(event)}}>
                                <option value="svi">Svi</option>
                                <option value="macke">Mačke</option>
                                <option value="psi">Psi</option>
                            </select>
                        </div>
                    </div>
                    {sveZivotinje.length > 0 && <PrikaziZivotinje popis={sveZivotinje}></PrikaziZivotinje>}
                </div>
            </div>
    )
}

export default Home