import Toteboard from "../../components/Toteboards/Toteboard";
import matches from "../../components/Toteboards/match";
import Standings from "../../components/Standings/Standings";
import Rules from "../../components/Rules/Rules";
import useTotalisator from "../../hooks/useTotalisator";
import useUser from "../../hooks/useUser";
import {useEffect} from "react";

const TotalisatorOverviewPage = (() => {

    const user = useUser();
    const totalisator = useTotalisator();

    useEffect(()=>{

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

        const renderNotPredictedMatch = (m) => {
        console.log("m",m)
            console.log("matches[0]",matches[0])
        const isPredicted = false;
        return (
            !isPredicted && <Toteboard variant="user-not_predicted" match={m}/>
        )
        }

        return (
            <main>
                <section className="feed feed--not-predicted">
                    <h2 className="feed__title">MATCHES WAITING FOR YOUR PREDICTION</h2>
                    {totalisator.matches.map(m=>renderNotPredictedMatch(m))}
                </section>
                <section className="overview">
                    <h2 className="overview__title">CURRENT TOTALISATOR STANDINGS</h2>
                    <div className="overview__container">
                        <Standings/><Rules/>
                    </div>
                </section>
                <section className="feed feed--pending">
                    <h2 className="feed__title">YOUR REGISTERED PREDICTIONS</h2>
                    <Toteboard variant="user-pending" prediction={{homeScore: 7, awayScore: 2}} match={matches[0]}/>
                    <Toteboard variant="user-pending" prediction={{homeScore: 3, awayScore: 0}} match={matches[1]}/>
                    <Toteboard variant="user-pending" prediction={{homeScore: 1, awayScore: 1}} match={matches[2]}/>
                </section>
                <section className="feed feed--history">
                    <h2 className="feed__title">YOUR PREDICTION HISTORY</h2>
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
