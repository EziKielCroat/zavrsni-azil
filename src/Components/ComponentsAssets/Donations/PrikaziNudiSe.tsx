
function PrikazTrazimo (props) {
    const {nudise} = props;

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
              </tr>
            ))}
          </tbody>
        </table>
      );
}

export default PrikazTrazimo