

function PrikaziZivotinje(props) {
    const {popis} = props

    return(
        <div className="zivotinje">
            <div className="zivotinja">
                {popis.map((el) => {
                    {/*iden prvo dodat nacin dodavanja zivotinja pacu onda prikazivanje*/}
                })}
            </div>
        </div>
    )
}

export default PrikaziZivotinje