import profilePic from "../../../assets/images/profile-small.png"
import {useState} from "react";
import {createFriendRequest} from "../../../api/soccersApi";
import useUser from "../../../hooks/useUser";

const FoundPersonCard = ({person, typedPart, isRequested}) => {

    const [gotRequested, setGotRequested] = useState(isRequested);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const user = useUser();

    const handleClick = () => {
        setIsSubmitting(true);
        createFriendRequest(user.id, person.id)
            .then(() => setGotRequested(true)).catch(err => {
            console.log("Failed to send friend request: ", err.response.data)
        }).finally(() => setIsSubmitting(false));
    }

    const notTypedParts = person.name.toLowerCase().split(typedPart);

    // Splits person name into parts and highlights the "searched part"
    const splitPerson = [<span key={person.id + "typed" + 0}
                             style={{color: "var(--light-teal)"}}>{(notTypedParts[0].toUpperCase())}</span>];
    for (let i = 1; i <= notTypedParts.length - 1; i++) {
        splitPerson.push(<span key={person.id + "typed" + i}
                             style={{color: "var(--yellow)"}}>{typedPart.toUpperCase()}</span>);
        splitPerson.push(<span key={person.id + "notTyped" + i}
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
                <p>{splitPerson}</p>
            </div>
        </div>
    )
}

export default FoundPersonCard;