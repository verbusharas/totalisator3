import Toteboard from "../../components/Toteboards/Toteboard";
import StandingsTable from "../../components/StandingsTable/StandingsTable";
import Rules from "../../components/Rules/Rules";
import useTotalisator from "../../hooks/useTotalisator";
import useUser from "../../hooks/useUser";
import {useEffect, useState} from "react";
import {getMatchPayouts, getTotalisatorPayouts, savePrediction} from "../../api/predictionApi";
import {useDispatch} from "react-redux";
import {addPrediction} from "../../store/slices/totalisatorSlice";
import {fetchFinishedMatches, fetchPlayerNotPredictedMatches, fetchPlayerPendingMatches} from "../../api/matchApi";

const TotalisatorOverviewPage = (() => {

        // decoupling
        const [notPredictedMatches, setNotPredictedMatches] = useState({feed:[],isLoading:false});
        const [pendingMatches, setPendingMatches] = useState({feed:[],isLoading:false});
        const [finishedMatches, setFinishedMatches] = useState({feed:[],isLoading:false});

        const user = useUser();
        const totalisator = useTotalisator();
        // const dispatch = useDispatch();

        useEffect(()=>{
            getNotPredictedMatches();
            getPendingMatches();
            getFinishedMatches();
        },[totalisator.id])

        const registerPrediction = (match, home, away) => {
            const prediction = {
                totalisatorId: totalisator.id,
                matchId: match.entityId,
                userId: user.id,
                homeScore: home,
                awayScore: away
            }
            const updatedNotPredictedFeed = notPredictedMatches.feed.filter(m=>m.entityId !== match.entityId);
            setNotPredictedMatches(prev=>({...prev, feed:updatedNotPredictedFeed}))
            setNotPredictedMatches(prev=>({...prev, isLoading: true}));
            savePrediction(prediction).then((res) => {
                console.log("PREDICTION SAVED:", res.data)
                setPendingMatches(prev=>({...prev, feed:res.data}))
            }).finally(() => setNotPredictedMatches(prev=>({...prev, isLoading: false})));
        }

        // const getUnpredictedMatches = () => {
        //     return totalisator?.matches?.filter(m => !hasUserPrediction(m));
        // }

        // decoupling
        const getNotPredictedMatches = () => {
            setNotPredictedMatches(prev=>({...prev, isLoading: true}));
            fetchPlayerNotPredictedMatches(totalisator.id).then((res)=>{
                console.log("GOT BACK NOT PREDICTED:", res.data)
                setNotPredictedMatches(prev=>({...prev, feed:res.data}));
            }).finally(() => setNotPredictedMatches(prev=>({...prev, isLoading: false})));
        }

        // const getPendingMatches = () => {
        //     return totalisator?.matches?.filter(m => hasUserPrediction(m)
        //         && m.statusName !== "Finished");
        // }

        const getPendingMatches = () => {
            setPendingMatches(prev=>({...prev, isLoading: true}));
            fetchPlayerPendingMatches(totalisator.id).then((res)=>{
                console.log("GOT BACK PENDING:", res.data)
                setPendingMatches(prev=>({...prev, feed:res.data}));
            }).finally(() => setPendingMatches(prev=>({...prev, isLoading: false})));
        }

        // const getFinishedMatches = () => {
        //     return totalisator?.matches?.filter(m => m.statusName === "Finished");
        // }

        const getFinishedMatches = () => {
            setFinishedMatches(prev=>({...prev, isLoading: true}));
            fetchFinishedMatches(totalisator.id).then((res)=>{
                console.log("GOT BACK FINISHED:", res.data)
                setFinishedMatches(prev=>({...prev, feed:res.data}));
            }).finally(() => setFinishedMatches(prev=>({...prev, isLoading: false})));
        }

        // const hasUserPrediction = (m) => {
        //     return m.predictions.map(p => p.userId).includes(user.id);
        // }

        const getUserPrediction = (m) => {
            // if (m.predictions.length === 0) {
            //     return false;
            // }
            return m.predictions.find(p => p.userId === user.id);
        }

        const renderNotPredictedMatch = (m) => {
            return (
                // !hasUserPrediction(m) &&
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
                // hasUserPrediction(m) &&
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
                // hasUserPrediction(m) &&
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
                    <h2 className="feed__title">MATCHES WAITING FOR YOUR PREDICTION</h2>
                    {/*{getUnpredictedMatches()?.length === 0 &&*/}
                    {notPredictedMatches.feed.length === 0 &&
                    <div>
                        <p className="feed__text">
                            <strong>"{totalisator.title}" </strong>
                            currently doesn't have any matches for you to predict.
                            Wait for manager to announce new fixtures.
                        </p>
                        <p className="feed__text">
                            Meanwhile check out the latest standings below.
                        </p>
                    </div>
                    }
                    {/*{getUnpredictedMatches()?.map(m => renderNotPredictedMatch(m))}*/}
                    {notPredictedMatches.feed.map(m => renderNotPredictedMatch(m))}
                </section>
                <section className="overview">
                    <h2 className="overview__title">CURRENT TOTALISATOR STANDINGS</h2>
                    <div className="overview__container">
                        <StandingsTable/>
                        <Rules/>
                    </div>
                </section>
                <section className="feed feed--pending">
                    <h2 className="feed__title">YOUR REGISTERED PREDICTIONS</h2>
                    {pendingMatches.feed.length === 0 &&
                    <p className="feed__text">
                        You currently don't have any pending matches.
                    </p>}
                    {pendingMatches.feed.map(m => renderPredictedMatch(m))}
                </section>
                <section className="feed feed--history">
                    <h2 className="feed__title">YOUR PREDICTION HISTORY</h2>
                    {finishedMatches.feed.length === 0 &&
                    <p className="feed__text">
                        You currently don't have any finished matches.
                    </p>}
                    {finishedMatches.feed.map(m => renderFinishedMatch(m))}
                </section>
            </main>
        )
    }
)


export default TotalisatorOverviewPage;
