import {Trans, useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {fetchSettings} from "../../api/settingsApi";
import useTotalisator from "../../hooks/useTotalisator";

const Rules = () => {

    const [settings, setSettings] = useState({});
    const totalisator = useTotalisator();

    useEffect(() => {
        let isSubscribed = true
        fetchSettings(totalisator.id).then(res => {
            if (isSubscribed) {
                setSettings(res.data);
            }
            return () => isSubscribed = false;
        })
    }, [totalisator.id])

    const {t} = useTranslation('overview');

    return (
        <article className="rules">
            <h3>{t("title-general-rules")}</h3>
            <p>
                <Trans i18nKey="overview:rules-when-calculated">
                Points are calculated for matches that have finished and have official final scores announced.
                </Trans>
            </p>
            <p>
                <Trans i18nKey="overview:rules-when-to-predict">
                Score predictions can be registered any time but not after the match starts. If player fails to
                supply the prediction on time - default prediction is registered automatically (0-0).
                </Trans>
            </p>
            <p>
                <Trans i18nKey="overview:rules-what-happens-next">
                Official final scores are compared to the score prediction of players. The more accurate prediction
                the more points player gets in return. Point calculation rules are determined by your totalisator
                settings.
                </Trans>
            </p>
            <h3>{t("title-point-calc-rules")}</h3>
            <p>
                <Trans i18nKey="overview:rules-calc-accurate">
                    aFor correctly predicting a winner team of the game you are rewarded
                    <strong>+{{pointsForAccurateWinner: settings.pointsForAccurateWinner}}</strong>.
                    If you also got the goal difference right you get additional
                    <strong>+{{pointsForAccurateGoalDifference: settings.pointsForAccurateGoalDifference}}</strong>.
                    In addition to that, accurately predicting the exact score gets you extra
                    <strong> +{{pointsForAccurateScore: settings.pointsForAccurateScore}}</strong>.
                </Trans>
            </p>
            <p>
                <Trans i18nKey="overview:rules-calc-bonus">
                DYNAMIC BONUS: initially you always get
                    <strong>+{{pointsForNoGoalDeviation:settings.pointsForNoGoalDeviation}}</strong>
                     starting bonus points. Don't be afraid to predict fat scores,
                    because each correctly predicted goal increases your initial bonus points by
                    <strong>+{{pointsForEachAccurateGoal:settings.pointsForEachAccurateGoal}}</strong>.
                    However don't be too liberate since each missed goal costs
                    <strong>-{{penaltyForMissedGoal:settings.penaltyForMissedGoal}}</strong>
                    bonus points.
                </Trans>
            </p>
            <p>
                <Trans i18nKey="overview:rules-about-negative">
                So, in case of crazily misjudged prediction, can the dynamic bonus become negative value? According to
                current settings:
                </Trans>
                <strong> {settings.canGetNegativePoints ? t("yes") : t("no")}</strong>.
            </p>
            <h3>{t("title-manager-message")}</h3>
            <p>
                [...]
            </p>
        </article>
    )
}

export default Rules