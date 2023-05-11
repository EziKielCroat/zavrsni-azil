

import './Notifications.css';
import { doc, updateDoc, getDoc} from "firebase/firestore"; 
import {db} from '../../../../firebase.js';

function ShowNotImportantNotifications(props) {
    const {notImportantNotifications} = props;

    const izbrisi = async (event) => {
        const el = JSON.parse(event.target.getAttribute('el'));
        const sveObavijestiRef = doc(db, 'Obavijesti', 'nevazne-obavijesti');
        const sveObavijestiDoc = await getDoc(sveObavijestiRef);

        const sveObavijesti = sveObavijestiDoc.data().nevazneObavijest;
        const index = sveObavijesti.findIndex(obj => obj.notificationTitle == el.notificationTitle && obj.notificationMessage == el.notificationMessage && obj.notificationImportant == el.notificationImportant);
        if (index !== -1) {
            sveObavijesti.splice(index, 1);
        }

        await Promise.all([
            updateDoc(sveObavijestiRef, { nevazneObavijest: sveObavijesti }),
        ]);

        console.log("Uspješno izbrisana obavijest");
    }
    
    return(
        <div className="notImportantNotifications">
            {notImportantNotifications.map(el => {
                return(
                    <div key={el.id} className="nevaznaObavijest">
                        <div className="nevaznaObavijestHeader">
                        <h3>{el.notificationTitle}</h3>
                        </div>

                        <p>{el.notificationMessage}</p>

                        <span el={JSON.stringify(el)} onClick={() => {izbrisi(event)}}>Izbrisi</span>
                    </div>
                )
            })}
        </div>
    )
}

export default ShowNotImportantNotifications