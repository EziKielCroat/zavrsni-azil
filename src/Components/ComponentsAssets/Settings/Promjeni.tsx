
import './Settings.css';
import { useForm } from "react-hook-form";

import { doc, collection, query, getDocs, where, setDoc} from "firebase/firestore"; 
import {db} from '../../../firebase.js';

function Promjeni(props) {
    const { removeComponent, podaci } = props;
    const { register, handleSubmit } = useForm();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));


    const onSubmit = async (data) => {
        const usersRef = collection(db, "Users");
        const q = query(usersRef, where("userEmail", "==", userInfo.userEmail));
        const querySnapshot = await getDocs(q);
      
        if (querySnapshot.size == 0) {
          console.log("Korisnik s tim emailom nije pronađen");
        }
      
        const userDoc = querySnapshot.docs[0];
      
        const updatedData = { ...userDoc.data(), ...data }; 
        await setDoc(doc(usersRef, userDoc.id), updatedData);
      
        console.log("Podaci na računu uspješno promjenjeni.");
        window.location.reload();
    }


    return(
        <div id="my-modal" className="modal">
        <div id="modal-content" className="modal-content">
                <span id="close-btn" className="close-btn" onClick={() => {removeComponent()}}>&times;</span>
                <h2 id="modal-title">Promjeni korisničke podatke</h2>

            <form id="my-form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">Ime:</label> <br />
                <input id="message-input" name="name" {...register('userName')} required defaultValue={podaci.userName}/>
                <br/>
                <label htmlFor="dob">Datum rođenja:</label>
                <input type="date" id="message-input" name="dob" {...register('userDob')} required defaultValue={podaci.userDob}/>
                <br/>
                <label htmlFor="email">Email: </label>
                <input type="email" id="message-input" name="email" required value={podaci.userEmail}/>
                <br/>
                <label htmlFor="type">Dozvola: </label>
                <select name="type" id="type" defaultValue={podaci.userType} required>
                    <option value="user">Korisnik</option>
                    <option value="admin">Administrator</option>
                </select>
                <br />
                <label htmlFor="password">Šifra</label>
                <input type="password" id="message-input" name="password" {...register('userPassword')} required defaultValue={podaci.userPassword}/>
                <br/>
                <button id="submit-btn" type="submit">Submit</button>
            </form>
        </div>
        </div>
    )
}

export default Promjeni