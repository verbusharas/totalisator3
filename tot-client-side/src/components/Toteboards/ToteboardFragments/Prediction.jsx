import cx from "classnames";

const Prediction = ({player, isCurrentUser, prediction}) => {

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

        <p className={cx({"tote-board--current-user": isCurrentUser})}>
            {sliceName(player.name)}
            <strong>{prediction? prediction.homeScore : "_"}</strong>
            :
            <strong>{prediction? prediction.awayScore : "_"}</strong>
        </p>
    )
}

export default Prediction;