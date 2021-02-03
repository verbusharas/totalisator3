import Toteboard from "../../components/Toteboards/Toteboard";
import StandingsTable from "../../components/StandingsTable/StandingsTable";
import Rules from "../../components/Rules/Rules";
import useTotalisator from "../../hooks/useTotalisator";
import useUser from "../../hooks/useUser";
import {useEffect, useState} from "react";
import {getMatchPayouts, getTotalisatorPayouts, savePrediction} from "../../api/predictionApi";
import {useDispatch} from "react-redux";
import {addPrediction} from "../../store/slices/totalisatorSlice";
import cx from "classnames";

const TotalisatorOverviewPage = (() => {

        const user = useUser();
        const totalisator = useTotalisator();
        const dispatch = useDispatch();


        const registerPrediction = (match, home, away) => {
            const prediction = {
                totalisatorId: totalisator.id,
                matchId: match.entityId,
                userId: user.id,
                homeScore: home,
                awayScore: away
            }
            const matchIndex = totalisator.matches.indexOf(match)
            savePrediction(prediction).then(() => {
                prediction.matchIndex = matchIndex;
                dispatch(addPrediction(prediction))
            })
        }

        const getUnpredictedMatches = () => {
            return totalisator?.matches?.filter(m => !hasUserPrediction(m));
        }

        const getPendingMatches = () => {
            return totalisator?.matches?.filter(m => hasUserPrediction(m)
                && m.statusName !== "Finished");
        }

        const getFinishedMatches = () => {
            return totalisator?.matches?.filter(m => m.statusName === "Finished");
        }

        const hasUserPrediction = (m) => {
            return m.predictions.map(p => p.userId).includes(user.id);
        }

        const getUserPrediction = (m) => {
            if (m.predictions.length === 0) {
                return false;
            }
            return m.predictions.find(p => p.userId === user.id);
        }


        const renderNotPredictedMatch = (m) => {
            return (
                !hasUserPrediction(m) &&
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
                hasUserPrediction(m) &&
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
                hasUserPrediction(m) &&
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
                    {getUnpredictedMatches()?.length === 0 &&
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
                    {getUnpredictedMatches()?.map(m => renderNotPredictedMatch(m))}
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
                    {getPendingMatches()?.length === 0 &&
                    <p className="feed__text">
                        You currently don't have any pending matches.
                    </p>}
                    {getPendingMatches()?.map(m => renderPredictedMatch(m))}
                </section>
                <section className="feed feed--history">
                    <h2 className="feed__title">YOUR PREDICTION HISTORY</h2>
                    {getFinishedMatches()?.length === 0 &&
                    <p className="feed__text">
                        You currently don't have any finished matches.
                    </p>}
                    {getFinishedMatches()?.map(m => renderFinishedMatch(m))}
                </section>
            </main>
        )
    }
)


export default TotalisatorOverviewPage;
