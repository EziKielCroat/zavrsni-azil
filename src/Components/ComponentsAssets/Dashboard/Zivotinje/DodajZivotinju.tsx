
import '../Dashboards.css'
import { useForm } from "react-hook-form";

import { doc, collection, updateDoc, arrayUnion} from "firebase/firestore"; 
import {db} from '../../../../firebase.js';

function DodajZivotinju(props) {
    const { removeComponent } = props;
    const { register, handleSubmit } = useForm();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const onSubmit = async (data) => {
        const zivotinjeRef = doc(db, "Zivotinje", "svezivotinje");
        await updateDoc(zivotinjeRef, {popis: arrayUnion(data)});

        window.location.reload();
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
                <h2 id="modal-title">Unos nove životinje</h2>

            <form id="my-form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">Ime:</label> <br />
                <input type="text" id="name-input" name="name" required {...register('animalName')}/>
                <br/>
                <label htmlFor="type">Vrsta</label> <br />
                <select name="type" id="type" required {...register('animalType')}>
                    <option value="pas">Pas</option>
                    <option value="macka">Mačka</option>
                    <option value="ostalo">Ostalo</option>
                </select> <br /> <br />
                <label htmlFor="age">Godine:</label> <br />
                <input type="number" id="age" name="age" required {...register('animalAge')}/> <br />
                <br/>
                <label htmlFor="description">Opis:</label> <br />
                <textarea name="description" id="description" {...register('animalDescription')}></textarea>
                <br/>
                <label htmlFor="tracked">Čipiran?</label>
                <input type="checkbox" name="tracked" {...register('animalTracked')}/>
                <br />
                <label htmlFor="last_checkup">Zadnji pregled</label> <br />
                <input type="date" name="last_checkup" {...register('animalLastCheckup')}/>
                <br />
                <button id="submit-btn" type="submit">Submit</button>
            </form>
        </div>
        </div>
    )
}

export default DodajZivotinju