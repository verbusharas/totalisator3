import "../../style/feed-fifa.css"
import Toteboard from "../../components/Toteboards/Toteboard";
import matches from "../../components/Toteboards/match";

export default () => {
    return (
        <main>
            <section className="feed feed--fifa">
                <h2 className="feed__title">FIND & ADD MATCHES</h2>
                <article className="feed__description">
                    <p>
                        You can add new matches to your totalisator here. Select a date to
                        get official Fifa fixtures for. Choose and add the desired ones to
                        your managed totalisator. Once the match is added, players can
                        immediately start registering their predictions.
                    </p>
                    <p>Select date:</p>
                    <input type="text"/>
                    <p>Choose fixtures:</p>
                </article>
                <Toteboard match = {matches[0]} variant="fifa-finished"/>
                <Toteboard match = {matches[1]} variant="fifa-listed"/>
                <Toteboard match = {matches[2]} variant="fifa-added"/>
                <Toteboard match = {matches[2]} variant="fifa-invalid"/>

            </section>
            <section className="feed feed--added">
                <h2 className="feed__title">MANAGE REGISTERED MATCHES</h2>
                <article className="feed__description">
                    <p>
                        The newly added, not started matches can be viewed here. This is the
                        list that players see on top of their page if they have not yet
                        registered their predictions. You can remove any match by clicking
                        “X” on the top corner of corresponding tote board.
                    </p>
                    <p>
                        Please note that by removing the match at any stage, also deletes
                        its registered predictions and subtracts earned points.
                    </p>
                </article>
                <Toteboard match = {matches[0]} variant="manager-pending"/>
                <Toteboard match = {matches[1]} variant="manager-pending"/>
                <Toteboard match = {matches[2]} variant="manager-pending"/>
            </section>
            <section className="feed feed--finished">
                <h2 className="feed__title">HISTORY OF FINISHED MATCHES</h2>
                <article className="feed__description">
                    <p>
                        This is a list of added matches that have already finished. These
                        matches contain predictions of all participants, and their earned
                        points. You can still delete any of these matches, in which case the
                        corresponding earned points get subtracted from total score.
                    </p>
                </article>
                <Toteboard match = {matches[0]} variant="manager-finished"/>
                <Toteboard match = {matches[1]} variant="manager-finished"/>
                <Toteboard match = {matches[2]} variant="manager-finished"/>
            </section>
        </main>
    )
}
