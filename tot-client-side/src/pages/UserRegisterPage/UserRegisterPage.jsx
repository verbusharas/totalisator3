import {Form, Formik, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import Button from "../../components/Forms/Button";
import Undertext from "../../components/Forms/Undertext";
import {saveUser} from "../../api/userApi";
import {useHistory} from "react-router-dom";
import {useState} from "react";
import ServerErrorMessage from "../../components/Forms/ServerErrorMessage";
import image from "../../assets/bg-images/kick-01-small.png";
import {useTranslation} from "react-i18next";

const UserRegisterPage = () => {

    const {t} = useTranslation('forms');

    const [serverValidationErrors, setServerValidationErrors] = useState({});
    const history = useHistory();

    const handleOnSubmit = (formValues) => {
        saveUser(formValues)
            .then(() => {
                history.push("/user/login");
            }).catch(err => {
                setServerValidationErrors(err.response.data)
            console.log("User registration failed with server error:", err.response.data);
        })
    }

    const validationSchema = Yup.object().shape({
        username: Yup
            .string()
            .email(t("validation-error-valid-email"))
            .required(t("validation-error-email-required")),
        password: Yup
            .string()
            .min(8, t("validation-error-password-length"))
            .required(t("validation-error-password-required")),
        passwordConfirm: Yup
            .string()
            .oneOf([Yup.ref('password'), null], t("validation-error-password-mismatch")),
        name: Yup
            .string()
            .min(3, t("validation-error-name-length"))
            .required(t("validation-error-name-required"))
    });


    return (
        <main className="default">
            <section className="graph-section">
                <img src={image} alt="ball in net"/>
            </section>
            <section className="form-section">
                <article className="form-section__article">
                    <h2>{t("register-title")}</h2>
                    <Formik initialValues={{username: "", password: "", passwordConfirm: "", name: ""}}
                            onSubmit={handleOnSubmit}
                            validationSchema={validationSchema}>
                        {(props) =>
                            (
                                <Form>
                                    <label>{t("register-username")}</label>
                                    <Field name="username" id="username" placeholder={t("register-username-placeholder")}/>
                                    <ErrorMessage name="username" component="small" className="form-section__field-error"/>
                                    <ServerErrorMessage message={serverValidationErrors.username}/>

                                    <label>{t("register-password")}</label>
                                    <Field name="password" id="password" type="password"/>
                                    <ErrorMessage name="password" component="small" className="form-section__field-error"/>
                                    <ServerErrorMessage message={serverValidationErrors.password}/>

                                    <label>{t("register-password-confirm")}</label>
                                    <Field name="passwordConfirm" id="passwordConfirm" type="password"/>
                                    <ErrorMessage name="passwordConfirm" component="small" className="form-section__field-error"/>


                                    <label>{t("register-name")}</label>
                                    <Field name="name" id="name" placeholder={t("register-name-placeholder")}/>
                                    <ErrorMessage name="name" component="small" className="form-section__field-error"/>
                                    <ServerErrorMessage message={serverValidationErrors.name}/>

                                    <Button text={t("btn-register")} type="submit"/>
                                    <Undertext text={t("register-already-member")} link={t("btn-sign-in")} to="/user/login"/>

                                </Form>
                            )
                        }

                    </Formik>
                </article>
            </section>
        </main>
    )
}

export default UserRegisterPage;