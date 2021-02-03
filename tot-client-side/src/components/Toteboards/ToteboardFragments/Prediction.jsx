import cx from "classnames";

const Prediction = ({player, isCurrentUser, prediction, payout}) => {

    const sliceName = (name) => {

        const maxLength = 14;

        if (name.length<=maxLength) {
            return name;
        } else {
            const parts = name.split(" ");
            if (parts.length === 1) {
                return name.length > maxLength ? name.slice(0,maxLength-2) + "..." : name;
            }
            if (parts.length === 2) {

                const short = parts[0].slice(0,1) + ". " + parts[1];
                return short.length > maxLength ? short.slice(0,maxLength-2) + "..." : short;
            }

            if (parts.length > 2) {
                let short = "";
                for (let i = 0; i < parts.length-1; i++) {
                    short += parts[i].slice(0,1);
                }
                short+=parts[parts.length-1];
                return short.length > maxLength ? short.slice(0,maxLength-2) + "..." : short;
            }
        }
    }

    return (

        <div className="tote-board__prediction">
            <div className="tote-board__prediction-user">
                {payout && <strong>+{payout?.award} points</strong>}
                <span>{sliceName(player.name)}</span>
            </div>
            <div className="tote-board__prediction-digit">
                <span>{prediction? prediction.homeScore : "_"}</span>
            </div>
            <div className="tote-board__prediction-digit">
                <span>{prediction? prediction.awayScore : "_"}</span>
            </div>
        </div>

    )
}

export default Prediction;