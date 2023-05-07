

import './Notifications.css';

function ShowNotImportantNotifications(props) {
    const {notImportantNotifications} = props;
    
    return(
        <div className="notImportantNotifications">
            {notImportantNotifications.map(el => {
                return(
                    <div key={el.id} className="nevaznaObavijest">
                        <div className="nevaznaObavijestHeader">
                        <h3>{el.notificationTitle}</h3>
                        </div>

                        <p>{el.notificationMessage}</p> 
                    </div>
                )
            })}
        </div>
    )
}

export default ShowNotImportantNotifications