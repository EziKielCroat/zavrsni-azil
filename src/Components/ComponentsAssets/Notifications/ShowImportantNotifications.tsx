

import './Notifications.css';

function ShowImportantNotifications(props) {
    const {importantNotifications} = props;
    
    console.log(importantNotifications);
    return(
        <div className="importantNotifications">
            {importantNotifications.map(el => {
                return(
                    <div key={el.id} className="vaznaObavijest">
                        <div className="vaznaObavijestHeader">
                        <h3>{el.notificationTitle}</h3>
                        <h4>VAŽNO!</h4>
                        </div>

                        <p>{el.notificationMessage}</p> 
                    </div>
                )
            })}
        </div>
    )
}

export default ShowImportantNotifications