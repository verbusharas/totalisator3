import profilePic from "../../assets/images/profile-small.png"
import {useState} from "react";
import {createFriendRequest} from "../../api/soccersApi";
import {connect} from "react-redux";

const FoundPersonCard = ({user, typedPart, isRequested, loggedInUserId}) => {

    const [gotRequested, setGotRequested] = useState(isRequested);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleClick = () => {
        setIsSubmitting(true);
        createFriendRequest(loggedInUserId, user.id)
            .then(() => setGotRequested(true)).catch(err => {
            console.log("Failed to send friend request: ", err.response.data)
        }).finally(() => setIsSubmitting(false));
    }

    const notTypedParts = user.name.toLowerCase().split(typedPart);

    const splitUser = [<span key={user.id + "typed" + 0}
                             style={{color: "var(--light-teal)"}}>{(notTypedParts[0].toUpperCase())}</span>];
    for (let i = 1; i <= notTypedParts.length - 1; i++) {
        splitUser.push(<span key={user.id + "typed" + i}
                             style={{color: "var(--yellow)"}}>{typedPart.toUpperCase()}</span>);
        splitUser.push(<span key={user.id + "notTyped" + i}
                             style={{color: "var(--light-teal)"}}>{notTypedParts[i].toUpperCase()}</span>);
    }
    return (
        <div className="found-user">
            <div className="found-user__image-container">
                <img src={profilePic} alt="add friend"/>
            </div>
            <div className="found-user__info-container">
                {!gotRequested && !isSubmitting &&
                <p className="found-user__link" onClick={handleClick}>
                    Send friend request
                </p>}
                {isSubmitting &&
                <p className="found-user__link" onClick={handleClick}>
                    Sending...
                </p>}
                {gotRequested &&
                <p className="found-user__info">
                    Friend request was sent
                </p>}
                <p>{splitUser}</p>
            </div>
        </div>
    )
}

const mapStateToProps = ({user}) => ({
    loggedInUserId: user.id,
})

export default connect(mapStateToProps, null)(FoundPersonCard);