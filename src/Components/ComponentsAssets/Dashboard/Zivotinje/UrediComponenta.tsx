
import '../Dashboards.css';
import { useForm } from "react-hook-form";

import { doc, collection, updateDoc, arrayUnion, getDoc} from "firebase/firestore"; 
import {db} from '../../../../firebase.js';

function UrediComponenta(props) {
    const { removeComponent, el, zivotinje } = props;
    const { register, handleSubmit } = useForm();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const index = zivotinje.findIndex((zivotinja) => zivotinja.id === el.id);
        
            if (index === -1) {
              console.log("Object not found in array");
              return;
            }
        
            const updatedZivotinje = [
              ...zivotinje.slice(0, index),
              data,
              ...zivotinje.slice(index + 1),
            ];
        
            await updateDoc(doc(db, "Zivotinje", "svezivotinje"), {
              popis: updatedZivotinje,
            });
        
            console.log("Uspješno uređeno");
            window.location.reload();
          } catch (error) {
            console.error("pogreska : ", error);
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
                <h2 id="modal-title">Unos nove životinje</h2>

            <form id="my-form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">Ime:</label> <br />
                <input type="text" id="name-input" name="name" required {...register('animalName')} defaultValue={el.animalName}/>
                <br/>
                <br />
                <label htmlFor="taken">Udomljen/a: </label> <br />
                <input type="checkbox" required {...register('animalAdopted')}/> <br />
                <label htmlFor="type">Vrsta</label> <br />
                <select name="type" id="type" required {...register('animalType')} defaultValue={el.animalType}>
                    <option value="Pas">Pas</option>
                    <option value="Mačka">Mačka</option>
                    <option value="Ostalo">Ostalo</option>
                </select> <br /> <br />
                <label htmlFor="age">Godine:</label> <br />
                <input type="number" id="age" name="age" required {...register('animalAge')} defaultValue={el.animalAge}/> <br />
                <br/>
                <label htmlFor="description">Opis:</label> <br />
                <textarea name="description" id="description" {...register('animalDescription')} defaultValue={el.animalDescription}></textarea>
                <br/>
                <label htmlFor="tracked">Čipiran?</label>
                <input type="checkbox" name="tracked" {...register('animalTracked')} defaultValue={el.animalTracked}/>
                <br />
                <label htmlFor="last_checkup">Zadnji pregled</label> <br />
                <input type="date" name="last_checkup" {...register('animalLastCheckup')} defaultValue={el.animalLastCheckup}/>
                <br />
                <button id="submit-btn" type="submit">Submit</button>
            </form>
        </div>
        </div>
    )
}

export default UrediComponenta