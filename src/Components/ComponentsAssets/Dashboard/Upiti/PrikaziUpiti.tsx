

import './Upiti.css';
import { doc, deleteDoc, getDocs, collection, query, where} from "firebase/firestore"; 
import {db} from '../../../../firebase.js';

function PrikaziUpit (props) {

    const {upit, upiti} = props;

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const izbrisi = async (event) => {
        const el = JSON.parse(event.target.getAttribute('el'));
        const collectionRef = collection(db, 'Upiti');
  
        const q = query(collectionRef, where("userName", "==", el.userName), where("userLastName", "==", el.userLastName), where("userNumber", "==", el.userNumber), where("userEmail", "==", el.userEmail), where("userMessage", "==", el.userMessage));
        const querySnapshot = await getDocs(q);
        try {
            querySnapshot.forEach((doc) => {
                deleteDoc(doc.ref);
            });
        } catch(error) {
            console.error("Pogreška pri brisanju datoteke =>  ", error);
        }
        window.location.reload();
    }

        return(
            <div className="popis-card">
              <h2 className="abc">{capitalizeFirstLetter(upit.userName) + " " + capitalizeFirstLetter(upit.userLastName)}</h2>
                <div className="details">
                    <span>{upit.userNumber}</span>
                    <span>, {upit.userEmail}</span>
                </div>
                <textarea name="upit" id="" cols="10" rows="5" defaultValue={upit.userMessage} disabled></textarea>
    
                <button el={JSON.stringify(upit)} onClick={()=>{izbrisi(event)}}>Izbriši</button>
            </div>
        )
}

export default PrikaziUpit