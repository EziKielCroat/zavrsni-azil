

import {useState} from 'react';
import UrediComponenta from './UrediComponenta';

function PopisZivotinja(props) {
    const {zivotinje} = props;
    const [prikaziUrediComponentu, setPrikaziUrediComponentu] = useState(false);
    const [elCurrent, setEl] = useState({});
    
    const urediComponenta = (el) => {
      setEl(el);
      setPrikaziUrediComponentu(true);
    }

    const removeComponent = () => {
      setPrikaziUrediComponentu(false);
    }

    return (
        <table style={{marginLeft:'50vh'}}>
          <thead className="thead">
            <tr>
              <th>Ime</th>
              <th>Tip</th>
              <th>Opis</th>
              <th>Godine</th>
              <th>Čipirano</th>
              <th>Zadnji pregled</th>
            </tr>
          </thead>
          <tbody>
            {zivotinje.map((el) => (
              <tr style={{border: '1px solid white'}}>
                <td>{el.animalName}</td>
                <td>{el.animalType}</td>
                <td>{el.animalDescription}</td>
                <td>{el.animalAge}</td>
                <td><input type="checkbox" disabled checked={el.animalTracked}/></td>
                <td>{el.animalLastCheckup}</td>
                <br />
                <td><button onClick={() => {urediComponenta(el)}}>Uredi</button></td>
              </tr>
            ))}
          </tbody>
          {prikaziUrediComponentu && <UrediComponenta zivotinje={zivotinje} el={elCurrent} removeComponent={removeComponent}></UrediComponenta>}

        </table>

      );
} 

export default PopisZivotinja