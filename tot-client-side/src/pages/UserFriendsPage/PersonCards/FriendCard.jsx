import profilePic from "../../../assets/images/profile-small.png"
import friendPic from "../../../assets/images/friends.png"
import {Trans, useTranslation} from "react-i18next";

const FriendCard = ({
                        person,
                        handleAccept,
                        handleDismiss,
                        isRequest,
                        isFriend,
                        isForTotalisator,
                        handleInclude
                    }) => {

    const {t} = useTranslation('friends');

    return (
        <div className="found-user">
            <div className="found-user__image-container">
                {isFriend && <img src={friendPic} alt="add friend"/>}
                {!isFriend && <img src={profilePic} alt="add friend"/>}
            </div>
            <div className="found-user__info-container">
                {person.name && <p>{person.name.toUpperCase()}</p>}
                {isRequest &&
                <span className="found-user__link" onClick={handleAccept}>
                    <Trans i18nKey="friends:accept">
                        Accept
                    </Trans>
                </span>}
                {isRequest && <span className="found-user__link" onClick={handleDismiss}>
                    <Trans i18nKey="friends:dismiss">
                        Dismiss
                    </Trans>
                </span>}
                {!isRequest && !isForTotalisator && <span className="found-user__link" onClick={handleDismiss}>
                    <Trans i18nKey="friends:remove">
                        Remove
                    </Trans>
                </span>}
                {isForTotalisator && <span className="found-user__link" onClick={handleInclude}>
                    <Trans i18nKey="friends:include">
                        Include
                    </Trans>
                </span>}
            </div>
        </div>
    )
}

export default FriendCard;