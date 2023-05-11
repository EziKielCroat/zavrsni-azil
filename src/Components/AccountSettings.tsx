

import { useNavigate } from 'react-router-dom';
import './ComponentsAssets/Settings/Settings.css'
import {useState, useEffect} from 'react';

import { where, collection, query, getDocs} from "firebase/firestore"; 
import {db} from '../firebase.js';

import PrikaziPodatke from './ComponentsAssets/Settings/PrikaziPodatke.js';

function AccountSettings() {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userEmail = JSON.parse(localStorage.getItem('userInfo')).userEmail;
    const [userInfo2, setUserInfo2] = useState(null);

    useEffect(() => {
        const getUserInfo = async (userEmail) => {
            const usersRef = collection(db, "Users");
            const q = query(usersRef, where("userEmail", "==", userInfo.userEmail));
            const querySnapshot = await getDocs(q);

            if(querySnapshot.size == 0) {
                console.error("korisnik nije pronađen");
            } else {
                console.log(querySnapshot.docs[0].data());
                setUserInfo2(querySnapshot.docs[0].data());
            }
        }
        getUserInfo(userEmail);
    }, [userEmail, userInfo.userEmail]);

    const checkAdmin = () => {
        if(userInfo.userType == "admin") {
            return true;
        } else {
            return false;
        }
    }

    return(
        <div className="container">
            <nav className="nav-holder">
                <h2>Azil za životinje</h2>

                <ul className="nav-stranice">
                    <button onClick={() => {navigate('/')}}><li>Home</li></button>
                    <button onClick={() => {navigate('/aboutus')}}><li>O nama</li></button>
                    <button onClick={() => {navigate('/donations')}}><li>Donacije</li></button>
                    <button onClick={() => {navigate('/notifications')}}><li>Obavijesti</li></button>
                    {checkAdmin() ? (<button onClick={() => {navigate('/dashboard')}}><li>Admin opcije</li></button>) : ( <></>)}
                </ul>
            </nav>

            <div className="settings-container">
                {<h3>Bok, {userInfo.userName}</h3>}

                <div className="account-info-container">
                    {userInfo2 && <PrikaziPodatke podaci={userInfo2}></PrikaziPodatke>}
                </div>
            </div>
        </div>
)
}

export default AccountSettings