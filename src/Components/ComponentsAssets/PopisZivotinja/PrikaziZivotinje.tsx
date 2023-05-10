
import PrikaziZivotinju from "./PrikaziZivotinju";

function PrikaziZivotinje(props) {
    const {popis} = props

    console.log(popis);

    return(
        <div className="popis-container">
                {popis.map((zivotinja, index) => (
                 <PrikaziZivotinju key={index} zivotinja={zivotinja} popis={popis}/>
                ))}
        </div>
    )
}

export default PrikaziZivotinje