

import { useNavigate } from 'react-router-dom';
import './ComponentsAssets/Dashboard/Dashboards.css';
import {useState, useEffect} from 'react';
import Zivotinje from './ComponentsAssets/Dashboard/Zivotinje/Zivotinje';
import Donations from './ComponentsAssets/Dashboard/Donacije/Donations';
import Notifications from './ComponentsAssets/Dashboard/Obavijesti/Notifications';
import Upiti from './ComponentsAssets/Dashboard/Upiti/Upiti';

function Dashboard () {
    const navigate = useNavigate();
    const [prikaziZivotinje, setPrikaziZivotinje] = useState(false);
    const [prikaziDonacije, setPrikaziDonacije] = useState(false);
    const [prikaziObavijesti, setPrikaziObavijesti] = useState(false);
    const [prikaziUpiti, setPrikaziUpiti] = useState(false);

    const resetirajPrikaz = () => {
        setPrikaziZivotinje(false);
        setPrikaziDonacije(false);
        setPrikaziObavijesti(false);
        setPrikaziUpiti(false);
    }

    const upaliZivotinje = () => {
        setPrikaziZivotinje(true);
    }

    const upaliDonacije= () => {
        setPrikaziDonacije(true);
    }

    const upaliObavijesti = () => {
        setPrikaziObavijesti(true);
    }
    
    const upaliUpiti = () => {
        setPrikaziUpiti(true);
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
                    </ul>
                </nav>

                <div className="side-nav">
                    <h3>Admin funkcionalnosti</h3>
                    <button onClick={() => {resetirajPrikaz(); upaliZivotinje()}}>Životinje</button>
                    <button onClick={() => {resetirajPrikaz(); upaliDonacije()}}>Donacije</button>
                    <button onClick={() => {resetirajPrikaz(); upaliObavijesti()}}>Obavijesti</button>
                    <button onClick={() => {resetirajPrikaz(); upaliUpiti()}}>Upiti</button>
                </div>

                <div className="admin-main">
                {prikaziZivotinje && <Zivotinje></Zivotinje>}
                {prikaziDonacije && <Donations></Donations>}
                {prikaziObavijesti && <Notifications></Notifications>}
                {prikaziUpiti && <Upiti></Upiti>}
                </div>
        </div>
    )
}

export default Dashboard