import Toteboard from "../../components/Toteboards/Toteboard";
import StandingsTable from "../../components/StandingsTable/StandingsTable";
import Rules from "../../components/Rules/Rules";
import useTotalisator from "../../hooks/useTotalisator";
import useUser from "../../hooks/useUser";
import {useEffect, useState} from "react";
import {savePrediction} from "../../api/predictionApi";
import {fetchFinishedMatches, fetchPlayerNotPredictedMatches, fetchPlayerPendingMatches} from "../../api/matchApi";
import {fetchPlayers} from "../../api/totalisatorApi";
import {Trans, useTranslation} from "react-i18next";

const TotalisatorOverviewPage = (() => {

    const {t} = useTranslation('overview');

    const [notPredictedMatches, setNotPredictedMatches] = useState({feed: [], isLoading: false});
    const [players, setPlayers] = useState([]);
    const [pendingMatches, setPendingMatches] = useState({feed: [], isLoading: false});
    const [finishedMatches, setFinishedMatches] = useState({feed: [], isLoading: false});

    const user = useUser();
    const totalisator = useTotalisator();

    useEffect(() => {
        loadNotPredictedMatches();
        loadPlayers();
        loadPendingMatches();
        loadFinishedMatches();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalisator.id])

    const registerPrediction = (match, home, away) => {
        const prediction = {
            totalisatorId: totalisator.id,
            matchId: match.entityId,
            userId: user.id,
            homeScore: home,
            awayScore: away
        }
        const updatedNotPredictedFeed = notPredictedMatches.feed.filter(m => m.entityId !== match.entityId);
        setNotPredictedMatches(prev => ({...prev, feed: updatedNotPredictedFeed}))
        setNotPredictedMatches(prev => ({...prev, isLoading: true}));
        savePrediction(prediction).then((res) => {
            setPendingMatches(prev => ({...prev, feed: res.data}))
        }).finally(() => setNotPredictedMatches(prev => ({...prev, isLoading: false})));
    }

    const loadNotPredictedMatches = () => {
        setNotPredictedMatches(prev => ({...prev, isLoading: true}));
        fetchPlayerNotPredictedMatches(totalisator.id).then((res) => {
            setNotPredictedMatches(prev => ({...prev, feed: res.data}));
        }).finally(() => setNotPredictedMatches(prev => ({...prev, isLoading: false})));
    }

    const loadPlayers = () => {
        fetchPlayers(totalisator?.id).then(res => {
            setPlayers(res.data)
        })
    }

    const loadPendingMatches = () => {
        setPendingMatches(prev => ({...prev, isLoading: true}));
        fetchPlayerPendingMatches(totalisator.id).then((res) => {
            setPendingMatches(prev => ({...prev, feed: res.data}));
        }).finally(() => setPendingMatches(prev => ({...prev, isLoading: false})));
    }

    const loadFinishedMatches = () => {
        setFinishedMatches(prev => ({...prev, isLoading: true}));
        fetchFinishedMatches(totalisator.id).then((res) => {
            setFinishedMatches(prev => ({...prev, feed: res.data}));
        }).finally(() => setFinishedMatches(prev => ({...prev, isLoading: false})));
    }

    const getUserPrediction = (m) => {
        return m.predictions.find(p => p.userId === user.id);
    }

    const renderNotPredictedMatch = (m) => {
        return (
            <Toteboard key={"np" + Math.random()}
                       variant="user-not_predicted"
                       match={m}
                       handleRegisterPrediction={registerPrediction}
            />
        )
    }

    const renderPredictedMatch = (m) => {
        const prediction = getUserPrediction(m)
        return (
            <Toteboard key={"np" + Math.random()}
                       variant="user-pending"
                       match={m}
                       prediction={prediction}
            />
        )
    }

    const renderFinishedMatch = (m) => {
        const prediction = getUserPrediction(m)
        return (
            <Toteboard key={"f" + Math.random()}
                       variant="user-finished"
                       prediction={prediction}
                       match={m}
            />
        )
    }

    return (
        <main>
            <section className="feed feed--not-predicted feed--empty">
                <h2 className="feed__title">{t("title-feed-player-not-predicted")}</h2>
                {notPredictedMatches.feed.length === 0 &&
                <div>
                    <p className="feed__text">
                        <strong>"{totalisator.title}" </strong>
                        {t("empty-feed-player-not-predicted-text")}
                    </p>
                    <p className="feed__text">
                        {t("empty-feed-player-not-predicted-meanwhile")}
                    </p>
                </div>
                }
                {notPredictedMatches.feed.map(m => renderNotPredictedMatch(m))}
            </section>
            <section className="overview">
                <h2 className="overview__title">{t("title-standings")}</h2>
                <div className="overview__container">
                    <StandingsTable players={players}/>
                    <Rules/>
                </div>
            </section>
            <section className="feed feed--pending">
                <h2 className="feed__title">{t("title-feed-player-pending")}</h2>
                {pendingMatches.feed.length === 0 &&
                <p className="feed__text">
                    {t("empty-feed-player-pending")}
                </p>}
                {pendingMatches.feed.map(m => renderPredictedMatch(m))}
            </section>
            <section className="feed feed--history">
                <h2 className="feed__title">{t("title-feed-player-history")}</h2>
                {finishedMatches.feed.length === 0 &&
                <p className="feed__text">
                    {t("empty-feed-player-history")}
                </p>}
                {finishedMatches.feed.map(m => renderFinishedMatch(m))}
            </section>
        </main>
    )
}
)

export default TotalisatorOverviewPage;
