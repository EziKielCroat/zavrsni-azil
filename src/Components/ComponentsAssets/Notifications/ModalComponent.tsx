
import './Notifications.css';
import { useForm } from "react-hook-form";

import { doc, collection, updateDoc, arrayUnion} from "firebase/firestore"; 
import {db} from '../../../firebase.js';

function ModalComponent(props) {
    const { removeComponent } = props;
    const { register, handleSubmit } = useForm();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const onSubmit = async (data) => {
        if(!data.notificationImportant) {
            data.notificationImportant = false;
            const nevazneObavijestiRef = doc(db, "Obavijesti", "nevazne-obavijesti");
            await updateDoc(nevazneObavijestiRef, {nevazneObavijest: arrayUnion(data)});
            window.location.reload();
        } else {
            data.notificationImportant = true;
            const vazneObavijestiRef = doc(db, "Obavijesti", "vazne-obavijesti");
            await updateDoc(vazneObavijestiRef, {vazneObavijesti: arrayUnion(data)});
            window.location.reload();
        }
    }

    const checkAdmin = () => {
        if(userInfo.userType == "admin") {
            return true;
        } else {
            return false;
        }
    }
    
    return(
        <div id="my-modal" className="modal">
        <div id="modal-content" className="modal-content">
                <span id="close-btn" className="close-btn" onClick={() => {removeComponent()}}>&times;</span>
                <h2 id="modal-title">Nova obavijest</h2>

            <form id="my-form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="title">Naslov:</label>
                <input type="text" maxLength={20}  id="title-input" name="title" required {...register('notificationTitle')}/>
                <br/>
                <label htmlFor="message">Tekst:</label>
                <textarea id="message-input" minLength={10} maxLength={200} name="message" {...register('notificationMessage')}></textarea>
                <br/>
                <label htmlFor="checkbox">Važno:</label>
            
                {checkAdmin() ? (<input type="checkbox" id="checkbox-input" name="checkbox" {...register('notificationImportant')}/>) : ( <input type="checkbox" id="checkbox-input" name="checkbox" disabled {...register('notificationImportant')}/>)}
                <br/>
                <button id="submit-btn" type="submit">Submit</button>
            </form>
        </div>
        </div>
    )
}

export default ModalComponent