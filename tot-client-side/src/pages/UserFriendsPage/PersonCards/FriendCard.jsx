import profilePic from "../../../assets/images/profile-small.png"

const FriendCard = ({person,
                        handleAccept,
                        handleDismiss,
                        isRequest,
                        isForTotalisator,
                        handleInclude})=>{
    return (
        <div className="found-user">
            <div className="found-user__image-container">
                <img src={profilePic} alt="add friend"/>
            </div>
            <div className="found-user__info-container">
                {person.name && <p>{person.name.toUpperCase()}</p> }
                { isRequest && <span className="found-user__link" onClick={handleAccept}>
                    Accept
                </span> }
                { isRequest && <span className="found-user__link" onClick={handleDismiss}>
                    Dismiss
                </span> }
                { !isRequest && !isForTotalisator && <span className="found-user__link" onClick={handleDismiss}>
                    Remove
                </span> }
                { isForTotalisator && <span className="found-user__link" onClick={handleInclude}>
                    Include
                </span> }
            </div>
        </div>
    )
}

export default FriendCard;