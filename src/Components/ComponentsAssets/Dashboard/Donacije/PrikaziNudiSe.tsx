
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {db} from '../../../../firebase.js';

function PrikazTrazimo (props) {
    const {nudise} = props;

    const prihvati =async (event) => {
      const id = event.target.id;
      try {
          const nudiSeRef = doc(db, 'Donacije', 'nudise');
          const nudiSeDoc = await getDoc(nudiSeRef);
      
          const nudiSePopis = nudiSeDoc.data().nudisePopis;
        
          const objectToMove = nudiSePopis.find(obj => obj.id == id);
          const objectsToDelete = nudiSePopis.filter((object) => object.id == id);

          objectsToDelete.forEach((object) => {
            const index = nudiSePopis.indexOf(object);
            nudiSePopis.splice(index, 1);
          });
      
          const doniranoRef = doc(db, 'Donacije', 'donirano');
          const doniranoDoc = await getDoc(doniranoRef);

          const doniranoPopis = doniranoDoc.data().doniranoPopis;
          const updatedDoniranoPopis = doniranoPopis.concat(objectToMove);
      
          await Promise.all([
            updateDoc(nudiSeRef, { nudisePopis: nudiSePopis }),
            updateDoc(doniranoRef, { doniranoPopis: updatedDoniranoPopis }),
          ]);
      
          console.log('Uspješno prihvaćena donacija');
          window.location.reload();
        } catch (error) {
          console.error('Pogreška pri prihvaćenju donacije: ', error);
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
            {nudise.map((el) => (
              <tr>
                <td>{el.donationType}</td>
                <td>{el.donationAmount}</td>
                <td>{el.donationDescription}</td>
                <td><button id={el.id} onClick={() => {prihvati(event)}}>Prihvati</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      );
}

export default PrikazTrazimo