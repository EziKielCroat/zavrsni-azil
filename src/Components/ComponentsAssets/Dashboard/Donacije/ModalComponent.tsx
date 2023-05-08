
import '.././Dashboards.css';
import { useForm } from "react-hook-form";

import { doc, collection, updateDoc, arrayUnion} from "firebase/firestore"; 
import {db} from '../../../../firebase.js';

function ModalComponent(props) {
    const { removeComponent } = props;
    const { register, handleSubmit } = useForm();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const onSubmit = async (data) => {
        if(userInfo.userType == "admin") {
            // admin trazimo popis
            trazimoDodaj(data);
        } else {
            // normalni korisnik
            nudiseDodaj(data);
        }
    }

    const trazimoDodaj = async (data) => {
        const id = Math.floor(Math.random() * 10000);
        data.id = id;
        console.log(data);
        const trazimoRef = doc(db, "Donacije", "trazimo");
        await updateDoc(trazimoRef, {trazimoPopis: arrayUnion(data)});
        window.location.reload();
    }

    const nudiseDodaj = async (data) => {
        const id = Math.floor(Math.random() * 10000);
        data.id = id;
        console.log(data);
        const nudiseRef = doc(db, "Donacije", "nudise");
        await updateDoc(nudiseRef, {nudisePopis: arrayUnion(data)});
        window.location.reload();
    }
    
    return(
        <div id="my-modal" className="modal">
        <div id="modal-content" className="modal-content">
                <span id="close-btn" className="close-btn" onClick={() => {removeComponent()}}>&times;</span>
                <h2 id="modal-title">Nova donacija</h2>

            <form id="my-form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="type">Tip donacije:</label> <br />
                <select name="type" id="donation-type" required {...register('donationType')}>
                    <option value="hrana">hrana</option>
                    <option value="lijekovi">lijekovi</option>
                    <option value="igračke">igračke</option>
                    <option value="oprema">oprema</option>
                </select>
                <br/>
                <label htmlFor="amount">Iznos donacije:</label>
                <input id="message-input" name="amount" {...register('donationAmount')} required/>
                <br/>
                <label htmlFor="description">Opis donacije:</label>
                <input id="message-input" name="description" {...register('donationDescription')}/>
                <br/>
                <button id="submit-btn" type="submit">Submit</button>
            </form>
        </div>
        </div>
    )
}

export default ModalComponent