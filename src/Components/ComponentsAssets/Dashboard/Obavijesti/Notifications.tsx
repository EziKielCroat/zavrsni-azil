
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import ModalComponent from './ModalComponent.js';
import ShowImportantNotifications from "./ShowImportantNotifications.js";
import ShowNotImportantNotifications from "./ShowNotImportantNotifications.js";
import './Notifications.css';

import { doc, collection, addDoc, getDoc} from "firebase/firestore"; 
import {db} from '../../../../firebase.js';

function Notifications() {
    const [modalComponentOn, setModalComponentOn] = useState(false);
    const [importantNotifications, setImportantNotifications] = useState([]);
    const [notImportantNotifications, setnotImportantNotifications] = useState([]);  

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
              setnotImportantNotifications(docSnapshot.data().nevazneObavijest);
            } else {
              console.error('Nevazne obavijesti document ne postoji');
            }
          }).catch((error) => {
            console.error('Error getting document:', error);
          });
    }, []);

    return(
    <div>
        <div className="obavijesti-container">
        <button className="novaObavijest" onClick={() => {dodajObavijest()}}>Nova obavijest</button>
            {modalComponentOn && <ModalComponent removeComponent={removeComponent}></ModalComponent>}
            {importantNotifications.length > 0 && <ShowImportantNotifications importantNotifications={importantNotifications}></ShowImportantNotifications>}    
            {notImportantNotifications.length > 0 && <ShowNotImportantNotifications notImportantNotifications={notImportantNotifications}></ShowNotImportantNotifications>}  
        </div>    
    </div>
    )
}

export default Notifications