import React, {useEffect, useState} from "react";
import useTotalisator from "../../hooks/useTotalisator";
import StandingsTable from "../../components/StandingsTable/StandingsTable";
import {findFriendshipsByUserId} from "../../api/userApi";
import useUser from "../../hooks/useUser";
import FriendCard from "../UserFriendsPage/PersonCards/FriendCard";
import {
    addPlayerToTotalisator,
    fetchPlayers,
    kickPlayerFromTotalisator
} from "../../api/totalisatorApi";
import convertFriendshipsToFriends from "../../utils/mapper";
import {Trans, useTranslation} from "react-i18next";

const ManagePlayersPage = () => {

    const {t} = useTranslation('manage-totalisator');

    const totalisator = useTotalisator();
    const user = useUser();
    const [players, setPlayers] = useState([]);
    const [possiblePlayers, setPossiblePlayers] = useState([]);

    useEffect(() => {
        fetchPlayers(totalisator.id).then(res=>{
            setPlayers(res.data);
            return res;
        }).then(({data:resPlayers})=>{
            findFriendshipsByUserId(user.id)
                .then(res => {
                const playerIds = resPlayers.map(player=>player.id);
                const unincludedFriends = convertFriendshipsToFriends(user.id, res.data).filter(friend=>!playerIds.includes(friend.id));
                setPossiblePlayers(unincludedFriends);
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const includeFriend = (friend) => {
        addPlayerToTotalisator(totalisator.id, friend.id).then((res) => {
            setPlayers([...players, friend])
            setPossiblePlayers(possiblePlayers.filter(pp => pp.id !== friend.id))
        })
    }

    const renderFriend = (friend) => {
        return <FriendCard key={"f" + Math.random()}
                           isFriend
                           person={friend}
                           isForTotalisator
                           handleInclude={() => includeFriend(friend)}
        />
    }

    const kickPlayer = (player) => {
        kickPlayerFromTotalisator(totalisator.id, player.id).then((res) => {
            setPlayers(players.filter(p => p.id !== player.id));
            setPossiblePlayers([...possiblePlayers, player]);
        })
    }

    return (
        <main>
            <section className="feed feed--fifa">
                <h2 className="feed__title">{t("title-manage-players")}</h2>
                <article className="feed__description">
                    <p>
                        <Trans i18nKey="manage-totalisator:description-players">
                        You can add/remove players to <strong>"{{title:totalisator.title}}"</strong> here.
                        Beware - kicking a player is irrevertable.
                        </Trans>
                    </p>
                    <p>
                        <Trans i18nKey="manage-totalisator:player-count">
                        Currently there are {{count:totalisator.players?.length}} players in this totalisator:
                        </Trans>
                    </p>
                    <StandingsTable players={players} handleKick={kickPlayer}/>
                </article>
            </section>
            <section className="friendlist-section  friendlist-section--players">
                <h2>{t("title-include-friends")}</h2>
                <article className="form-section__article">
                    <div className="found-users">
                        {possiblePlayers?.map(pp => renderFriend(pp))}
                    </div>
                </article>
            </section>
        </main>
    )
}
export default ManagePlayersPage;