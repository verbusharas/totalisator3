import profilePic from "../../assets/images/profile-small.png"

export default({user, handleAccept, handleDismiss, isRequest})=>{
    return (
        <div className="found-user">
            <div className="found-user__image-container">
                <img src={profilePic} alt="add friend"/>
            </div>
            <div className="found-user__info-container">
                <p>{user.name.toUpperCase()}</p>
                { isRequest && <span className="found-user__link" onClick={handleAccept}>
                    Accept
                </span> }
                { isRequest && <span className="found-user__link" onClick={handleDismiss}>
                    Dismiss
                </span> }
                { !isRequest && <span className="found-user__link" onClick={handleDismiss}>
                    Remove
                </span> }
            </div>
        </div>
    )
}