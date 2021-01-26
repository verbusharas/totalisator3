
import profilePic from "../../assets/images/profile-small.png"

export default({user, typedPart, handleClick})=>{

    const notTypedParts = user.name.toLowerCase().split(typedPart);
    const splitUser = [<span key={user.id + "typed" + 0} style={{color: "var(--light-teal)"}}>{(notTypedParts[0].toUpperCase())}</span>];
    for (let i = 1; i <= notTypedParts.length - 1; i++) {
        splitUser.push(<span key={user.id + "typed" + i} style={{color: "var(--yellow)"}}>{typedPart.toUpperCase()}</span>);
        splitUser.push(<span key={user.id + "notTyped" + i} style={{color: "var(--light-teal)"}}>{notTypedParts[i].toUpperCase()}</span>);
    }
    return (
        <div className="found-user">
            <div className="found-user__image-container">
                <img src={profilePic} alt="add friend" onClick={handleClick}/>
            </div>
            <div className="found-user__info-container">
                <p className="found-user__link" onClick={handleClick}>
                    Send friend request
                </p>
                <p>{splitUser}</p>
            </div>
        </div>
    )
}