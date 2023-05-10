
import {doc, getDoc, setDoc, updateDoc, deleteDoc} from 'firebase/firestore';
import {db} from '../../../../firebase.js';

function PrikazTrazimo (props) {
    const {trazimo} = props;

    const donirano = async (event) => {
      // tribalo mi je onako uru ipo za ovu funkciju cisto sumljan da cu je komentirat
      const id = event.target.id;
      try {
          const trazimoRef = doc(db, 'Donacije', 'trazimo');
          const trazimoDoc = await getDoc(trazimoRef);
      
          const trazimoPopis = trazimoDoc.data().trazimoPopis;
        
          const objectToMove = trazimoPopis.find(obj => obj.id == id);
          const objectsToDelete = trazimoPopis.filter((object) => object.id == id);

          objectsToDelete.forEach((object) => {
          const index = trazimoPopis.indexOf(object);
          trazimoPopis.splice(index, 1);
          });
      
          const doniranoRef = doc(db, 'Donacije', 'donirano');
          const doniranoDoc = await getDoc(doniranoRef);

          const doniranoPopis = doniranoDoc.data().doniranoPopis;
          const updatedDoniranoPopis = doniranoPopis.concat(objectToMove);
      
          await Promise.all([
            updateDoc(trazimoRef, { trazimoPopis: trazimoPopis }),
            updateDoc(doniranoRef, { doniranoPopis: updatedDoniranoPopis }),
          ]);
      
          console.log('Pomaknuto u donirano');
          window.location.reload();
        } catch (error) {
          console.error('Error moving object:', error);
        }
    }

    const izbrisi =async (event) => {
      const id = event.target.id;
      try {
          const trazimoRef = doc(db, 'Donacije', 'trazimo');
          const trazimoDoc = await getDoc(trazimoRef);
      
          const trazimoPopis = trazimoDoc.data().trazimoPopis;
        
          const objectToMove = trazimoPopis.find(obj => obj.id == id);
          const objectsToDelete = trazimoPopis.filter((object) => object.id == id);

          objectsToDelete.forEach((object) => {
          const index = trazimoPopis.indexOf(object);
          trazimoPopis.splice(index, 1);
          });
          await Promise.all([
            updateDoc(trazimoRef, { trazimoPopis: trazimoPopis }),
          ]);
      
          console.log('Pomaknuto u donirano');
          window.location.reload();
        } catch (error) {
          console.error('Error moving object:', error);
        }
    }

    return (
        <table>
          <thead className="thead">
            <tr>
              <th>Tip</th>
              <th>Vrijednosti</th>
              <th>Opis</th>
            </tr>
          </thead>
          <tbody>
            {trazimo.map((el) => (
              <tr>
                <td>{el.donationType}</td>
                <td>{el.donationAmount}</td>
                <td>{el.donationDescription}</td>
                <td><button id={el.id} onClick={() => {donirano(event)}}>Donirano</button></td>
                <td><button id={el.id} onClick={() => {izbrisi(event)}}>Izbriši</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      );
}

export default PrikazTrazimo