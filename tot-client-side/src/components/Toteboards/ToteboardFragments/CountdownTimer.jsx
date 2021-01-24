import {useEffect, useState} from "react";

export default ({countdownTo}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const calculateTimeLeft = () => {
        let year = new Date().getFullYear();
        const difference = +new Date(countdownTo) - +new Date();

        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                d: Math.floor(difference / (1000 * 60 * 60 * 24)),
                h: Math.floor((difference / (1000 * 60 * 60)) % 24),
                min: Math.floor((difference / 1000 / 60) % 60),
                s: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    const timerComponents = [];
    Object.keys(timeLeft).forEach(
        (timeMeasurementUnit) => {
        if (!timeLeft[timeMeasurementUnit]) {return;}
        timerComponents.push(<span key={Math.random() + countdownTo}>{timeLeft[timeMeasurementUnit]} {timeMeasurementUnit}{" "}</span>);
    });

    return (
        <p>
                <span className="tote-board__incentives--highlighted">
                    {timerComponents.length
                        ? timerComponents
                        : <span>Time's up!</span>}
                </span>
            to predict this score.
        </p>
    )

}