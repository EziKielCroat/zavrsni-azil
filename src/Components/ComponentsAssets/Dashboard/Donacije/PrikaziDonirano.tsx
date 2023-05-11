
import { doc, getDoc, updateDoc} from "firebase/firestore"; 
import {db} from '../../../../firebase.js';

function PrikaziDonirano(props) {
    const {donirano} = props;

    const ponovi =async (event) => {
      const id = event.target.id;
      try {
          const doniranoRef = doc(db, 'Donacije', 'donirano');
          const doniranoDoc = await getDoc(doniranoRef);
      
          const doniranoPopis = doniranoDoc.data().doniranoPopis;
        
          const objectToMove = doniranoPopis.find(obj => obj.id == id);
          const objectsToDelete = doniranoPopis.filter((object) => object.id == id);

          objectsToDelete.forEach((object) => {
            const index = doniranoPopis.indexOf(object);
            doniranoPopis.splice(index, 1);
          });
      
          const trazimoRef = doc(db, 'Donacije', 'trazimo');
          const trazimoDoc = await getDoc(trazimoRef);

          const trazimoPopis = trazimoDoc.data().trazimoPopis;
          const updatedTrazimoPopis = trazimoPopis.concat(objectToMove);
      
          await Promise.all([
            updateDoc(doniranoRef, { doniranoPopis: doniranoPopis }),
            updateDoc(trazimoRef, { trazimoPopis: updatedTrazimoPopis }),
          ]);
      
          console.log('Uspješno ponovljena donacije');
          window.location.reload();
        } catch (error) {
          console.error('Pogreška pri ponavljaju donacije:', error);
        }
    }
    
    const izbrisi =async (event) => {
      const id = event.target.id;
      try {
          const doniranoRef = doc(db, 'Donacije', 'donirano');
          const doniranoDoc = await getDoc(doniranoRef);
      
          const doniranoPopis = doniranoDoc.data().doniranoPopis;
        
          const objectsToDelete = doniranoPopis.filter((object) => object.id == id);

          objectsToDelete.forEach((object) => {
          const index = doniranoPopis.indexOf(object);
          doniranoPopis.splice(index, 1);
          });

          console.log(doniranoPopis);
      
          await Promise.all([
            updateDoc(doniranoRef, { doniranoPopis: doniranoPopis }),
          ]);
      
          console.log('Uspješno izbrisano');
          window.location.reload();
        } catch (error) {
          console.error('Pogreška pri brisanju: ', error);
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
            {donirano.map((el) => (
              <tr>
                <td>{el.donationType}</td>
                <td>{el.donationAmount}</td>
                <td>{el.donationDescription}</td>
                <td><button id={el.id} onClick={() => {ponovi(event)}}>Ponovi</button></td>
                <td><button id={el.id} onClick={() => {izbrisi(event)}}>Izbriši</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      );
}


export default PrikaziDonirano