

import './Notifications.css';

import { doc, updateDoc, getDoc} from "firebase/firestore"; 
import {db} from '../../../../firebase.js';


function ShowImportantNotifications(props) {
    const {importantNotifications} = props;
    
    const izbrisi = async (event) => {
        const el = JSON.parse(event.target.getAttribute('el'));
        const sveObavijestiRef = doc(db, 'Obavijesti', 'vazne-obavijesti');
        const sveObavijestiDoc = await getDoc(sveObavijestiRef);

        const sveObavijesti = sveObavijestiDoc.data().vazneObavijesti;

        const index = sveObavijesti.findIndex(obj => obj.notificationTitle == el.notificationTitle && obj.notificationMessage == el.notificationMessage && obj.notificationImportant == el.notificationImportant);

        if (index !== -1) {
            sveObavijesti.splice(index, 1);
        }

        await Promise.all([
            updateDoc(sveObavijestiRef, { vazneObavijesti: sveObavijesti }),
          ]);
    }

    return(
        <div className="importantNotifications">
            {importantNotifications.map(el => {
                return(
                    <div className="vaznaObavijest">
                        <div className="vaznaObavijestHeader">
                        <h3>{el.notificationTitle}</h3>
                        <h4>VAŽNO!</h4>
                        </div>

                        <p>{el.notificationMessage}</p> 
                        <button el={JSON.stringify(el)} onClick={() => {izbrisi(event)}}>Izbrisi</button>
                    </div>
                )
            })}
        </div>
    )
}

export default ShowImportantNotifications