import {Form, Formik, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import Button from "../../components/Forms/Button";
import Undertext from "../../components/Forms/Undertext";
import {loginUser} from "../../api/userApi";
import {useHistory, useLocation} from "react-router-dom"
import {useDispatch} from "react-redux";
import {setJwt, setUserData} from "../../store/slices/userSlice";
import {fetchTotalisatorById} from "../../api/totalisatorApi";
import {loadTotalisatorFromStorage, setTotalisator} from "../../store/slices/totalisatorSlice";
import image from "../../assets/bg-images/ball-in-net-01-small.png";
import {useTranslation} from "react-i18next";

const UserLoginPage = () => {

    const {t} = useTranslation('forms');

    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleLogin = (loginData, {setSubmitting}) => {
        setSubmitting(true);
        loginUser(loginData)
            .then(({data, headers: {authorization}}) => {
            dispatch(setUserData(data))
            dispatch(setJwt(authorization))
            return data.totalisators;
        }).then((totalisators) => {
            if (totalisators.length > 0) {
                const defaultTotalisatorId = totalisators[0].id;

                let selectedTotalisatorId = loadTotalisatorFromStorage()?.totalisatorData.prevId || defaultTotalisatorId;
                let hasSelectedTotalisator = totalisators.map(t=>t.id).includes(selectedTotalisatorId);

                if (!hasSelectedTotalisator) {
                    selectedTotalisatorId = defaultTotalisatorId;
                }

                fetchTotalisatorById(selectedTotalisatorId).then(res => {
                    dispatch(setTotalisator(res.data))
                }).then(()=> {
                    const {from} = location.state || {from: {pathname: '/totalisator'}}
                    history.push(from)
                })
            } else {
                history.push("/user/welcome")
            }
        })
            .finally(() => setSubmitting(false))
    }

    return (
        <main className="default">
            <section className="graph-section">
                <img src={image} alt="ball in net"/>
            </section>
            <section className="form-section">
                <article className="form-section__article">
                    <h2>{t("login-title")}</h2>

                    <Formik initialValues={{username: "", password: "", passwordConfirm: "", name: ""}}
                            onSubmit={handleLogin}>
                        {(props) =>
                            (
                                <Form>
                                    <label>{t("login-email")}</label>
                                    <Field name="username" id="username"/>
                                    <ErrorMessage name="username" component="small"
                                                  className="form-section__field-error"/>

                                    <label>{t("login-password")}</label>
                                    <Field name="password" id="password" type="password"/>
                                    <ErrorMessage name="password" component="small"
                                                  className="form-section__field-error"/>

                                    <Button text={t("btn-login")} type="submit" disabled={props.isSubmitting}/>
                                    <Undertext text={t("login-not-a-member")} link={t("btn-sign-up")} to="/user/register"/>
                                </Form>
                            )
                        }
                    </Formik>
                </article>
            </section>
        </main>
    )
}

export default UserLoginPage;