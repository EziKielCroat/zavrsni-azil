
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import ModalComponent from './ComponentsAssets/Notifications/ModalComponent.js';
import ShowImportantNotifications from "./ComponentsAssets/Notifications/ShowImportantNotifications.js";
import ShowNotImportantNotifications from "./ComponentsAssets/Notifications/ShowNotImportantNotifications.js";
import './ComponentsAssets/Notifications/Notifications.css';

import { doc, collection, addDoc, getDoc} from "firebase/firestore"; 
import {db} from '../firebase.js';

function Notifications() {
    const [modalComponentOn, setModalComponentOn] = useState(false);
    const [importantNotifications, setImportantNotifications] = useState([]);
    const [notImportantNotifications, setnotImportantNotifications] = useState([]);

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    const checkAdmin = () => {
        if(userInfo.userType == "admin") {
            return true;
        } else {
            return false;
        }
    }

    const onSubmit = async (data) => {
        // Upiti se spremaju na firebase za administratore da vide
        await addDoc(collection(db, "Upiti"), data); 
        
        console.log("Upit uspješno poslan");
        window.location.reload();
    }

    const dodajObavijest = () => {
        setModalComponentOn(true);
    }

    const removeComponent = () => {
        setModalComponentOn(false);
    }

    useEffect(() => {
        const doc1 = doc(collection(db, "Obavijesti"), "vazne-obavijesti");
        const doc2 = doc(collection(db, "Obavijesti"), "nevazne-obavijesti");
        
        getDoc(doc1).then((docSnapshot) => {
          if (docSnapshot.exists()) {
            setImportantNotifications(docSnapshot.data().vazneObavijesti);
          } else {
            console.error('Vazne obavijesti document ne postoji');
          }
        }).catch((error) => {
          console.error('Error getting document:', error);
        });
      
        getDoc(doc2).then((docSnapshot) => {
            if (docSnapshot.exists()) {
              let data = docSnapshot.data();
              setnotImportantNotifications(data.nevazneObavijest);
            } else {
              console.error('Nevazne obavijesti document ne postoji');
            }
          }).catch((error) => {
            console.error('Error getting document:', error);
          });
    }, []);

    return(
    <div className="container">
        <nav className="nav-holder">
            <h2>Azil za životinje</h2>

            <ul className="nav-stranice">
                <button onClick={() => {navigate('/')}}><li>Home</li></button>
                <button onClick={() => {navigate('/donations')}}><li>Donacije</li></button>
                <button onClick={() => {navigate('/aboutus')}}><li>O nama</li></button>
                {checkAdmin() ? (<button onClick={() => {navigate('/dashboard')}}><li>Admin opcije</li></button>) : ( <></>)}
            </ul>
        </nav>
            <button className="novaObavijest" onClick={() => {dodajObavijest()}}>Nova obavijest</button>
            {modalComponentOn && <ModalComponent removeComponent={removeComponent}></ModalComponent>}
            {importantNotifications.length > 0 && <ShowImportantNotifications importantNotifications={importantNotifications}></ShowImportantNotifications>}    
            {notImportantNotifications.length > 0 && <ShowNotImportantNotifications notImportantNotifications={notImportantNotifications}></ShowNotImportantNotifications>}    
            
    </div>
    )
}

export default Notifications