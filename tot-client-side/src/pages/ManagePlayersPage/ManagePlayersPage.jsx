import React, {useEffect, useState} from "react";
import useTotalisator from "../../hooks/useTotalisator";
import Standings from "../../components/Standings/Standings";
import {findFriendshipsByUserId} from "../../api/userApi";
import useUser from "../../hooks/useUser";
import FriendCard from "../UserFriendsPage/PersonCards/FriendCard";
import {addPlayerToTotalisator, fetchTotalisatorById} from "../../api/totalisatorApi";
import {useDispatch} from "react-redux";
import {setTotalisator} from "../../store/slices/totalisatorSlice";

const ManagePlayersPage = () => {

    const totalisator = useTotalisator();
    const user = useUser();
    const dispatch = useDispatch();
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        loadNotIncludedFriends();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadNotIncludedFriends = () => {
            findFriendshipsByUserId(user.id).then(res => {
                const friendships = res.data;
                setFriends(friendships.filter((f) => {
                    const playerIds = totalisator.players.map(p=>p.id);
                    const friend = (f.requester.id === user.id) ? f.receiver : f.requester;
                    // returns only friends && that are not yet in this totalisator
                    return f.isAccepted && !playerIds.includes(friend.id)
                }));
            }).catch(err => console.log("Returned -> Error:", err.response.data));
    }

    const includeFriend = (friend) => {
        addPlayerToTotalisator(totalisator.id, friend.id).then((res)=>{
            console.log("totalisator.id", totalisator.id, "friend.id", friend.id);
            console.log("After Adding player to tot, returned res: ", res)
            fetchTotalisatorById(totalisator.id).then((res) => {
                dispatch(setTotalisator(res.data))
                //FIXME: FIX BACKEND, TO RETURN TOTALISATOR WITH REFRESHED PLAYER DTO,
                // TO HAVE JUST ADDED TOTALISATOR ID IN ITS TOTALISATORS LIST
                loadNotIncludedFriends()
            })
        })
    }

    const renderFriend = (friendship) => {
        const {requester, receiver} = friendship;
        // Regardless of who is requester/receiver render the one who is not the current user
        const friend = (requester.id === user.id) ? receiver : requester;
        return <FriendCard key={"f" + friend.id}
                           person={friend}
                           isForTotalisator
                           handleInclude={()=>includeFriend(friend)}
        />
    }

    const printName = (player) => {
        return <span key={Math.random()}>{player.name}</span>
    }
    return (

        <main>
            <section className="feed feed--fifa">
                <h2 className="feed__title">MANAGE PLAYERS</h2>
                <article className="feed__description">
                    <p>
                        You can add/remove players to <strong>"{totalisator.title}"</strong> here.
                        Beware - kicking a player is irrevertable.
                    </p>
                    {totalisator.players.map(printName)}
                    <p>
                        Currently there are 6 players in this totalisator:
                    </p>
                    <Standings/>

                </article>
            </section>
            <section className="feed feed--added">
                <h2 className="feed__title">INCLUDE FRIENDS AS PLAYERS</h2>
                <article className="feed__description">
                    <div className="found-users">
                        {friends.map((f) => renderFriend(f))}
                        {!friends.length &&
                        <p>You don't have any friends yet.
                            Find people in the search below and add them as your friends.</p>}
                    </div>
                </article>
            </section>
        </main>
    )
}
export default ManagePlayersPage;