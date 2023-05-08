

function PrikaziDonirano(props) {
    const {donirano} = props;

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
              </tr>
            ))}
          </tbody>
        </table>
      );
}


export default PrikaziDonirano