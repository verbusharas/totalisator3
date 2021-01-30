import React, {useEffect, useState} from "react";
import useTotalisator from "../../hooks/useTotalisator";
import Standings from "../../components/Standings/Standings";
import {findFriendshipsByUserId} from "../../api/userApi";
import useUser from "../../hooks/useUser";
import FriendCard from "../UserFriendsPage/PersonCards/FriendCard";
import {addPlayerToTotalisator, fetchTotalisatorById, kickPlayerFromTotalisator} from "../../api/totalisatorApi";
import {useDispatch} from "react-redux";
import {setTotalisator} from "../../store/slices/totalisatorSlice";
import convertFriendshipsToFriends from "../../utils/mapper";

const ManagePlayersPage = () => {

    const totalisator = useTotalisator();
    const user = useUser();
    const dispatch = useDispatch();
    const [playerIds, setPlayerIds] = useState([]);
    const [possiblePlayers, setPossiblePlayers] = useState([]);

    useEffect(() => {
        setPlayerIds(totalisator.players.map(p => p.id));
        getPossiblePlayers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const refreshTotalisator = () => {
        fetchTotalisatorById(totalisator.id)
            .then((res) => {
                dispatch(setTotalisator(res.data))
            })
    }

    const includeFriend = (friend) => {
        addPlayerToTotalisator(totalisator.id, friend.id).then((res) => {
            setPlayerIds([...playerIds, friend.id])
            setPossiblePlayers(possiblePlayers.filter(pp => pp.id !== friend.id))
            refreshTotalisator();
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
            console.log("after kick", res.data)
            setPlayerIds(playerIds.filter(pi => pi !== player.id));
            setPossiblePlayers([...possiblePlayers, player]);
            refreshTotalisator();
        })
    }

    const printName = (player) => {
        return <div key={Math.random()}>
            <span>{player.name}</span>
            {player.id !== user.id && <button type="button" onClick={() => kickPlayer(player)}>KICK</button>}
        </div>
    }


    const getPossiblePlayers = () => {
        findFriendshipsByUserId(user.id).then(res => {
            const friends = convertFriendshipsToFriends(user.id, res.data);
            console.log("plauerIds", playerIds)
            console.log("possiblePlayers", possiblePlayers)
            const includedIds = totalisator.players.map(p => p.id)
            const unincludedFriends = friends.filter(f => !includedIds.includes(f.id));
            console.log("uncincluded friends", unincludedFriends)
            setPossiblePlayers(unincludedFriends)
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
                        {possiblePlayers.map(pp => renderFriend(pp))}
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