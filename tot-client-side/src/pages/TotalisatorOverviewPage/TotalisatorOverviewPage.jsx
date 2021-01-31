import Toteboard from "../../components/Toteboards/Toteboard";
import matches from "../../components/Toteboards/match";
import Standings from "../../components/Standings/Standings";
import Rules from "../../components/Rules/Rules";
import useTotalisator from "../../hooks/useTotalisator";
import useUser from "../../hooks/useUser";
import {useEffect} from "react";
import {savePrediction} from "../../api/predictionApi";
import {useDispatch} from "react-redux";
import {addPrediction} from "../../store/slices/totalisatorSlice";

const TotalisatorOverviewPage = (() => {

        const user = useUser();
        const totalisator = useTotalisator();
        const dispatch = useDispatch();

        useEffect(() => {

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])


        const registerPrediction = (match, home, away) => {
            const prediction = {
                totalisatorId: totalisator.id,
                matchId: match.entityId,
                userId: user.id,
                homeScore: home,
                awayScore: away
            }
            const matchIndex = totalisator.matches.indexOf(match)
            savePrediction(prediction).then((res)=>{
                console.log("RES DATA:", res.data);
                prediction.matchIndex = matchIndex;
                dispatch(addPrediction(prediction))
            })
        }

        const getUnpredictedMatches = () => {
            const unpredictedMatches = totalisator?.matches?.filter(m => !hasUserPrediction(m))
            console.log("unpredicted", unpredictedMatches);
            return unpredictedMatches;
        }

        const getPendingMatches = () => {
            const predictedMatches = totalisator?.matches?.filter(m => hasUserPrediction(m))
            console.log("predicted", predictedMatches);
            return predictedMatches;
        }

        const getFinishedMatches = () => {
            const finishedMatches = totalisator?.matches?.filter(m => m.statusName === "Finished")
            console.log("finished", finishedMatches);
            return finishedMatches;
        }


        const hasUserPrediction = (m) => {
            return m.predictions.map(p => p.userId).includes(user.id);
        }

        const getUserPrediction = (m) => {
            if (m.predictions.length === 0 ) {
                return false;
            }
            return m.predictions.find(p=>p.userId===user.id);
        }

        const renderNotPredictedMatch = (m) => {
            return (
                !hasUserPrediction(m) &&
                <Toteboard key={"np" + Math.random()} variant="user-not_predicted" match={m} handleRegisterPrediction={registerPrediction}/>
            )
        }

        const renderPredictedMatch = (m) => {
            const prediction = getUserPrediction(m)
            return (
                hasUserPrediction(m) &&
                <Toteboard  key={"np" + Math.random()} variant="user-pending" prediction={prediction} match={m}/>
            )
        }


        const renderFinishedMatch = (m) => {
            const prediction = getUserPrediction(m)
            prediction.payout = 999
            return (
                hasUserPrediction(m) &&
                <Toteboard  key={"f" + Math.random()} variant="user-finished" prediction={prediction} match={m}/>
                )
        }


        return (
            <main>
                <section className="feed feed--not-predicted">
                    <h2 className="feed__title">MATCHES WAITING FOR YOUR PREDICTION</h2>
                    {getUnpredictedMatches().length === 0 && <p>You currently don't have any unpredicted matches.</p>}
                    {getUnpredictedMatches().map(m => renderNotPredictedMatch(m))}
                </section>
                <section className="overview">
                    <h2 className="overview__title">CURRENT TOTALISATOR STANDINGS</h2>
                    <div className="overview__container">
                        <Standings/><Rules/>
                    </div>
                </section>
                <section className="feed feed--pending">
                    <h2 className="feed__title">YOUR REGISTERED PREDICTIONS</h2>
                    {getPendingMatches().length === 0 && <p>You currently don't have any pending matches.</p>}
                    {getPendingMatches().map(m => renderPredictedMatch(m))}
                </section>
                <section className="feed feed--history">
                    <h2 className="feed__title">YOUR PREDICTION HISTORY</h2>
                    {getFinishedMatches().length === 0 && <p>You currently don't have any finished matches.</p>}
                    {getFinishedMatches().map(m => renderFinishedMatch(m))}
                    <Toteboard variant="user-finished" prediction={{homeScore: 33, awayScore: 27, payout: 10}}
                               match={matches[0]}/>
                    <Toteboard variant="user-finished" prediction={{homeScore: 0, awayScore: 1, payout: 250}}
                               match={matches[1]}/>
                    <Toteboard variant="user-finished" prediction={{homeScore: 2, awayScore: 3, payout: 455}}
                               match={matches[2]}/>
                </section>
            </main>
        )
    }
)


export default TotalisatorOverviewPage;
