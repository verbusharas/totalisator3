import image from "../../assets/bg-images/ball-foot-01-small.png";
import {Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import useTotalisator from "../../hooks/useTotalisator";
import {fetchSettings, saveSettings} from "../../api/settingsApi";
import Button from "../../components/Forms/Button";
import Undertext from "../../components/Forms/Undertext";
import {useHistory} from "react-router-dom";
import SettingsSampleRow from "./SettingsSampleRow";
import {getSamplePayouts} from "../../api/predictionApi";
import {useTranslation} from "react-i18next";

const ManageSettingsPage = () => {

    const {t} = useTranslation('manage-totalisator');

    const totalisator = useTotalisator();
    const [settings, setSettings] = useState({});
    const [tryoutScore, setTryoutScore] = useState({totalisatorId: totalisator.id, home:0, away:0})
    const [samplePayouts, setSamplePayouts] = useState([])
    const history = useHistory();

    useEffect(()=>{
        let isSubscribed = true
        fetchSettings(totalisator.id).then(res=>{
            if(isSubscribed) {
                setSettings(res.data);
            }
            return () => isSubscribed = false;
        })

        const sampleScore = {
            totalisatorId: totalisator.id,
            actualHome: 0,
            actualAway: 0,
        }
        getSamplePayouts(sampleScore).then(res=> {
            setSamplePayouts(res.data);
        })

    },[totalisator.id])

    const handleSubmit = (formValues) => {
        console.log("formValues", formValues)
        saveSettings(totalisator.id, formValues)
            .then((res) => {
                history.push("/totalisator/manage/settings");
                const sampleScore = {
                    totalisatorId: totalisator.id,
                    actualHome: tryoutScore.home,
                    actualAway: tryoutScore.away,
                }
                getSamplePayouts(sampleScore).then(res=> {
                    setSamplePayouts(res.data);
                })
            })
    }

    const handleHomeScoreChange = (e) => {
        const homeScore = e.target.value;
        setTryoutScore(prev => ({...prev, home:homeScore}));
        const sampleScore = {
            totalisatorId: totalisator.id,
            actualHome: homeScore,
            actualAway: tryoutScore.away,
        }
        getSamplePayouts(sampleScore).then(res=> {
            setSamplePayouts(res.data);
        })

    }

    const handleAwayScoreChange = (e) => {
        const awayScore = e.target.value;
        setTryoutScore(prev => ({...prev, away:awayScore}));
        const sampleScore = {
            totalisatorId: totalisator.id,
            actualHome: tryoutScore.home,
            actualAway: awayScore,
        }
        getSamplePayouts(sampleScore).then(res=> {
            setSamplePayouts(res.data);
        })
    }

    const renderSamplePayoutRow  = (samplePayout) => (
        <SettingsSampleRow
            className = "settings__sample-row"
            payout={samplePayout}
            key={Math.random() + " " + samplePayout.award}/>
    )

    return (
        <main className="default settings">
            <section className="graph-section">
                <img src={image} alt="ball and foot"/>
            </section>
            <section className="form-section">
                <article className="form-section__article">
                    <h2>{t("title-settings")}</h2>
                    <h3>{t("title-point-calculations")}</h3>
                    <Formik enableReinitialize={true}
                            initialValues={{
                                pointsForAccurateScore: settings.pointsForAccurateScore || "",
                                pointsForAccurateGoalDifference: settings.pointsForAccurateGoalDifference || "",
                                pointsForAccurateWinner: settings.pointsForAccurateWinner || "",
                                pointsForEachAccurateGoal: settings.pointsForEachAccurateGoal || "",
                                pointsForNoGoalDeviation: settings.pointsForNoGoalDeviation || "",
                                penaltyForMissedGoal: settings.penaltyForMissedGoal || "",
                                canGetNegativePoints: settings.canGetNegativePoints || false,
                            }}
                            onSubmit={handleSubmit}>
                        {(props) =>
                            (
                                <Form>
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td><label>{t("points-for-accurate-score")}<span>(AEP)</span> :</label></td>
                                            <td><Field name="pointsForAccurateScore" id="pointsForAccurateScore" autoComplete="off"/></td>
                                        </tr>
                                        <tr>
                                            <td><label>{t("points-for-accurate-goal-diff")}<span>(AGD)</span> :</label></td>
                                            <td><Field name="pointsForAccurateGoalDifference" id="pointsForAccurateGoalDifference" autoComplete="off"/></td>
                                        </tr>
                                        <tr>
                                            <td><label>{t("points-for-accurate-winner-team")}<span>(AWT)</span> :</label></td>
                                            <td><Field name="pointsForAccurateWinner" id="pointsForAccurateWinner" autoComplete="off"/></td>
                                        </tr>
                                        <tr>
                                            <td><label>{t("bonus-for-each-goal")}<span>(PG)</span> :</label></td>
                                            <td><Field name="pointsForEachAccurateGoal" id="pointsForEachAccurateGoal" autoComplete="off"/></td>
                                        </tr>
                                        <tr>
                                            <td><label>{t("initial-accuracy-points")}<span>(ACC)</span> :</label></td>
                                            <td><Field name="pointsForNoGoalDeviation" id="pointsForNoGoalDeviation" autoComplete="off"/></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>{t("penalty-for-each-missed")}<span>(PEN)</span> :</label>
                                                <p className="form-section__undertext">{t("penalty-for-each-missed-undertext")}</p>
                                            </td>
                                            <td><Field name="penaltyForMissedGoal" id="penaltyForMissedGoal" autoComplete="off"/></td>
                                        </tr>
                                        <tr>
                                            <td><label>{t("allow-less-than-zero")}</label></td>
                                            <td><Field type="checkbox" name="canGetNegativePoints" id="canGetNegativePoints"/></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <Button text={t("btn-save")} type="submit"/>
                                    <Undertext text={t("btn-save-undertext")}/>
                                </Form>
                            )
                        }
                    </Formik>
                </article>

            </section>
            <section className="form-section settings--tryout">
                <h2>{t("title-tryout")}</h2>
                <article>
                    <div>
                        <p>{t("enter-score")}</p>
                    </div>
                    <div>
                        <input type="number" value={tryoutScore.home} onChange={handleHomeScoreChange}/>
                        <input type="number" value={tryoutScore.away} onChange={handleAwayScoreChange}/>
                    </div>
                    <div>
                        <div>
                            <p>{t("title-award-distribution")}</p>
                        </div>
                        <table className="settings__sample-table">
                            <thead>
                            <tr>
                                <th><strong className="settings__sample-row--prediction">{t("thead-prediction")}</strong></th>
                                <th><strong className="settings__sample-row--total-award">{t("thead-award")}</strong></th>
                                <th>AEP</th>
                                <th>AGD</th>
                                <th>AWT</th>
                                <th>Σ PG</th>
                                <th>ACC</th>
                                <th>Σ PEN</th>
                            </tr>
                            </thead>
                            <tbody>
                            {samplePayouts?.map(renderSamplePayoutRow)}
                            </tbody>
                        </table>
                    </div>
                </article>
            </section>
        </main>
    )

}

export default ManageSettingsPage;