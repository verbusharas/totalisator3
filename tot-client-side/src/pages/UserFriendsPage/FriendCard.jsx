import profilePic from "../../assets/images/profile-small.png"

export default({user, handleClick})=>{
    return (
        <div className="found-user">
            <div className="found-user__image-container">
                <img src={profilePic} alt="add friend" onClick={handleClick}/>
            </div>
            <div className="found-user__info-container">
                <p className="found-user__link" onClick={handleClick}>
                    Send friend request
                </p>
                <p>{user.name}</p>
            </div>
        </div>
    )
}