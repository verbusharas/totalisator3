import React, {useEffect, useState} from "react";
import useTotalisator from "../../hooks/useTotalisator";
import StandingsTable from "../../components/StandingsTable/StandingsTable";
import {findFriendshipsByUserId} from "../../api/userApi";
import useUser from "../../hooks/useUser";
import FriendCard from "../UserFriendsPage/PersonCards/FriendCard";
import {
    addPlayerToTotalisator,
    fetchPlayers,
    fetchTotalisatorById,
    kickPlayerFromTotalisator
} from "../../api/totalisatorApi";
import {useDispatch} from "react-redux";
import {setTotalisator} from "../../store/slices/totalisatorSlice";
import convertFriendshipsToFriends from "../../utils/mapper";

const ManagePlayersPage = () => {

    const totalisator = useTotalisator();
    const user = useUser();
    // const dispatch = useDispatch();
    const [playerIds, setPlayerIds] = useState([]);
    const [possiblePlayers, setPossiblePlayers] = useState([]);
    const [friends, setFriends] = useState([])

    useEffect(() => {
        fetchPlayers(totalisator.id).then(res=>{
            setPlayerIds(res.data.map(p=>p.id));
            return res.data;
        }).then(()=> {
            getFriends();
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // const refreshTotalisator = () => {
    //     fetchTotalisatorById(totalisator.id)
    //         .then((res) => {
    //             dispatch(setTotalisator(res.data))
    //         })
    // }

    const includeFriend = (friend) => {
        addPlayerToTotalisator(totalisator.id, friend.id).then((res) => {
            setPlayerIds([...playerIds, friend.id])
            setPossiblePlayers(possiblePlayers.filter(pp => pp.id !== friend.id))
            // refreshTotalisator();
        })
    }

    const renderFriend = (friend) => {
        return <FriendCard key={"f" + Math.random()}
                           person={friend}
                           isForTotalisator
                           handleInclude={() => includeFriend(friend)}
        />
    }

    const kickPlayer = (player) => {
        kickPlayerFromTotalisator(totalisator.id, player.id).then((res) => {
            setPlayerIds(playerIds.filter(pi => pi !== player.id));
            setPossiblePlayers([...possiblePlayers, player]);
            // refreshTotalisator();
        })
    }


    const getFriends = () => {
        findFriendshipsByUserId(user.id).then(res => {
            const friends = convertFriendshipsToFriends(user.id, res.data);
            console.log("all friends", friends)
            const unincludedFriends = friends.filter(f => !playerIds.includes(f.id));
            console.log("unincluded", unincludedFriends)
            setPossiblePlayers(unincludedFriends);
        })
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
                    <p>
                        Currently there are {totalisator.players?.length} players in this totalisator:
                    </p>
                    <StandingsTable handleKick={kickPlayer}/>

                </article>
            </section>
            <section className="feed feed--added">
                <h2 className="feed__title">INCLUDE FRIENDS AS PLAYERS</h2>
                <article className="feed__description">
                    <div className="found-users">
                        {possiblePlayers?.map(pp => renderFriend(pp))}
                        {/*{!getPossiblePlayers()?.length &&*/}
                        {/*<p>You don't have any friends yet.*/}
                        {/*    Find people in the search below and add them as your friends.</p>}*/}
                    </div>
                </article>
            </section>
        </main>
    )
}
export default ManagePlayersPage;