import top from "../../assets/bg-images/chest/chest3-top.png";
import mid from "../../assets/bg-images/chest/chest3-mid1.png";
import preBottom from "../../assets/bg-images/chest/chest3-pre-bottom.png";
import bottom from "../../assets/bg-images/chest/chest3-bottom.png";
import {useEffect, useState} from "react";
import {findFriendshipsByUserId} from "../../api/userApi";
import useUser from "../../hooks/useUser";

const UserWelcomePage = () => {

    const [hasFriends, setHasFriends] = useState(false);

    const user = useUser();

    useEffect(()=> {
        findFriendshipsByUserId(user.id).then(res=>{
            console.log("friends response:", res.data);
            if (res.data?.filter(friendship=>friendship.isAccepted).length > 0) {
             setHasFriends(true);
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <main className="default">
            <section className="text-section">
                <article className="text-section__article">
                    <h2>HELLO ORACLE! <strong>GET STARTED!</strong> </h2>
                    <div className="text-section__description">
                        <p>
                            You don't participate in any totalisators yet.
                        </p>
                        <p>
                            You can either <a href="/totalisator/new">create your own totalisator </a>
                            or get invited to totalisators that were already created by your <a href="/user/friends">friends</a>.
                        </p>
                        <p>
                            You will be able to participate as player even in your managed totalisator.
                        </p>
                    </div>
                </article>
            </section>
            <section className="vfx-section parallax-container">
                <div className="parallax-item" data-depth="0.1">
                    <img className="ball" src={top} alt="racoon"/>
                </div>
                <div className="parallax-item" data-depth="0.4">
                    <img className="particles" src={mid} alt="racoon"/>
                </div>
                <div className="parallax-item" data-depth="1">
                    <img className="shadow" src={preBottom} alt="racoon"/>
                </div>
                <div className="parallax-item" data-depth="0.7">
                    <img className="human" src={bottom} alt="racoon"/>
                </div>
            </section>
        </main>
    )
}

export default UserWelcomePage;