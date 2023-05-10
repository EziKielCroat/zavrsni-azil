

import './PopisZivotinja.css';
import { doc, collection, updateDoc, arrayUnion} from "firebase/firestore"; 
import {db} from '../../../firebase.js';

function PrikaziZivotinju(props) {

    const {zivotinja, popis} = props;
    // dodat logiku za udomljene zivotinje, udomi zivotinju ovdi dodaj
    // vjv samo if else za udomljene zivotinje jer neman vrimena za nista bolje

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const udomiZivotinju = async (event) => {
      const animal = JSON.parse(event.originalTarget.attributes[0].nodeValue);
      const animals = popis;

      animal.animalAdopted = true;
      const animalIndex = animals.findIndex(a => a.animalName === animal.animalName && a.animalType === animal.animalType && a.animalDescription === animal.animalDescription && a.animalAge === animal.animalAge && a.animalTracked === animal.animalTracked && a.animalLastCheckup === animal.animalLastCheckup);

      if (animalIndex !== -1) {
        animals[animalIndex] = animal;
        const sveZivotinjeRef = doc(db, "Zivotinje", "svezivotinje");
        try {
          await updateDoc(sveZivotinjeRef, {popis: animals});
          console.log("uspjesno usvojena zivotinja");
        } catch(error) {
          console.error(error);
        }
      } else {
        console.error("Životinja nije pronađena u db");
      }
    }
    
    if(zivotinja.animalAdopted) {
      return (
        <div className="popis-card" style={{border: '1px solid darkgreen'}}>
          <p className="disclaimer"><b>Životinja je udomljena!</b></p>
          <h2 className="abc">{capitalizeFirstLetter(zivotinja.animalName)}</h2>
            <div className="details">
                <span>{capitalizeFirstLetter(zivotinja.animalType)}</span>
                <span>, ima {zivotinja.animalAge} godina</span>
            </div>
          <p>Opis: {zivotinja.animalDescription}</p>
          <label htmlFor="tracked">Čipiran/a? </label>
          <input type="checkbox" name="tracked" disabled checked={zivotinja.animalTracked}/>
          <p>Zadnji pregled: {zivotinja.animalLastCheckup}</p>
          <p></p>
        </div>
      );
    } else {
      return (
        <div className="popis-card">
          <h2>{capitalizeFirstLetter(zivotinja.animalName)}</h2>
            <div className="details">
                <span>{capitalizeFirstLetter(zivotinja.animalType)}</span>
                <span>, ima {zivotinja.animalAge} godina</span>
            </div>
          <p>Opis: {zivotinja.animalDescription}</p>
          <label htmlFor="tracked">Čipiran/a? </label>
          <input type="checkbox" name="tracked" disabled checked={zivotinja.animalTracked}/>
          <p>Zadnji pregled: {zivotinja.animalLastCheckup}</p>
          <button data-el={JSON.stringify(zivotinja)} onClick={() => {udomiZivotinju(event)}}>Udomi me!</button>
        </div>
      );
    }
}

export default PrikaziZivotinju