import image from "../../assets/bg-images/ball-foot-01-small.png";
import {Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import useTotalisator from "../../hooks/useTotalisator";
import {fetchSettings, saveSettings} from "../../api/settingsApi";
import Button from "../../components/Forms/Button";
import Undertext from "../../components/Forms/Undertext";
import {saveUser} from "../../api/userApi";
import {useHistory} from "react-router-dom";

const ManageSettingsPage = () => {

    const [settings, setSettings] = useState({});
    const totalisator = useTotalisator();
    const history = useHistory();

    useEffect(()=>{
        let isSubscribed = true
        fetchSettings(totalisator.id).then(res=>{
            if(isSubscribed) {
                setSettings(res.data);
            }
            console.log("RETRIEVED SETTINGS:", res.data)
            return () => isSubscribed = false;
        })
    },[totalisator.id])

    const handleSubmit = (formValues) => {
        console.log("formValues", formValues)
        saveSettings(totalisator.id, formValues)
            .then((res) => {
                console.log("saved", res.data)
                history.push("/totalisator/manage/settings");
            })
    }

    return (
        <main className="default settings">
            <section className="graph-section">
                <img src={image} alt="ball and foot"/>
            </section>
            <section className="form-section">
                <article className="form-section__article">
                    <h2>CUSTOMIZE YOUR TOTALISATOR SETTINGS</h2>
                    <h3>POINT REWARD CALCULATIONS</h3>
                    <Formik enableReinitialize={true}
                            initialValues={{
                                pointsForAccurateScore: settings.pointsForAccurateScore || "",
                                pointsForAccurateGoalDifference: settings.pointsForAccurateGoalDifference || "",
                                pointsForAccurateWinner: settings.pointsForAccurateWinner || "",
                                pointsForEachAccurateGoal: settings.pointsForEachAccurateGoal || "",
                                pointsForNoGoalDeviation: settings.pointsForNoGoalDeviation || "",
                                penaltyForMissedGoal: settings.penaltyForMissedGoal || "",
                                canGetNegativePoints: settings.canGetNegativePoints || false,
                                // defaultHome: 0,
                                // defaultAway: 0
                            }}
                            onSubmit={handleSubmit}>
                        {(props) =>
                            (
                                <Form>
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td><label>Points for accurate exact prediction <span>(AEP)</span> :</label></td>
                                            <td><Field name="pointsForAccurateScore" id="pointsForAccurateScore" autoComplete="off"/></td>
                                        </tr>
                                        <tr>
                                            <td><label>Points for accurate goal difference <span>(AGD)</span> :</label></td>
                                            <td><Field name="pointsForAccurateGoalDifference" id="pointsForAccurateGoalDifference" autoComplete="off"/></td>
                                        </tr>
                                        <tr>
                                            <td><label>Points for accurate winner team <span>(AWT)</span> :</label></td>
                                            <td><Field name="pointsForAccurateWinner" id="pointsForAccurateWinner" autoComplete="off"/></td>
                                        </tr>
                                        <tr>
                                            <td><label>Bonus points for each predicted goal <span>(PG)</span> :</label></td>
                                            <td><Field name="pointsForEachAccurateGoal" id="pointsForEachAccurateGoal" autoComplete="off"/></td>
                                        </tr>
                                        <tr>
                                            <td><label>Initial accuracy points <span>(ACC)</span> :</label></td>
                                            <td><Field name="pointsForNoGoalDeviation" id="pointsForNoGoalDeviation" autoComplete="off"/></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>Penalty for each unpredicted goal <span>(PEN)</span> :</label>
                                                <p className="form-section__undertext">(subtracted from initial accuracy points)</p>
                                            </td>
                                            <td><Field name="penaltyForMissedGoal" id="penaltyForMissedGoal" autoComplete="off"/></td>
                                        </tr>
                                        <tr>
                                            <td><label>Allow accuracy points to be less than zero</label></td>
                                            <td><Field type="checkbox" name="canGetNegativePoints" id="canGetNegativePoints"/></td>
                                        </tr>
                                        {/*<tr>*/}
                                        {/*    <td><label>Default home score prediction when due</label></td>*/}
                                        {/*    <td><Field name="defaultHome" id="defaultHome" autoComplete="off"/></td>*/}
                                        {/*</tr>*/}
                                        {/*<tr>*/}
                                        {/*    <td><label>Default away score prediction when due</label></td>*/}
                                        {/*    <td><Field name="defaultAway" id="defaultAway" autoComplete="off"/></td>*/}
                                        {/*</tr>*/}
                                        </tbody>
                                    </table>

                                    <Button text="Save" type="submit"/>
                                    <Undertext text="Hitting save will have immediate effect on player standings."/>


                                </Form>
                            )
                        }
                    </Formik>
                </article>

            </section>
            <section className="form-section">
                <h2>TRY IT OUT</h2>
                <article className="form-section__article">
                </article>
            </section>
        </main>
    )

}

export default ManageSettingsPage;