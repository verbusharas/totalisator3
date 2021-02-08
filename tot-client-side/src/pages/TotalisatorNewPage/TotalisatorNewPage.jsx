import {ErrorMessage, Field, Form, Formik} from "formik";
import Button from "../../components/Forms/Button";
import * as Yup from "yup";
import {fetchUserById} from "../../api/userApi";
import useUser from "../../hooks/useUser";
import {createTotalisator} from "../../api/totalisatorApi";
import {useDispatch} from "react-redux";
import {setUserData} from "../../store/slices/userSlice";
import {setTotalisator} from "../../store/slices/totalisatorSlice";
import {useHistory} from "react-router-dom";
import image from "../../assets/bg-images/header-01-small-flip.png";
import {useTranslation} from "react-i18next";

const TotalisatorNewPage = () => {

    const {t} = useTranslation('forms');

    const user = useUser();
    const dispatch = useDispatch();
    const history = useHistory();

    const validationSchema = Yup.object().shape({
        title: Yup
            .string()
            .required(t("validation-error-empty-title"))
            .min(3, t("validation-error-title-length"))
    });

    const handleCreate = (formValues) => {
        formValues.managerId = user.id;
        createTotalisator(formValues).then(res=>{
            dispatch(setTotalisator(res.data))
            fetchUserById(user.id).then(res=>{
                dispatch(setUserData(res.data))
            })
            history.push("/totalisator/manage")

        })
    }

    return (
        <main className="default">
            <section className="graph-section">
                <img src={image} alt="ball in net"/>
            </section>
            <section className="form-section">
                <article className="form-section__article">
                    <h2>{t("title-new-totalisator")}</h2>

                    <Formik initialValues={{title: ""}}
                            onSubmit={handleCreate}
                            validationSchema={validationSchema}>
                        {(props) =>
                            (
                                <Form>
                                    <label>{t("create-totalisator-title")}</label>
                                    <Field name="title" id="title" placeholder={t("create-totalisator-title-placeholder")}/>
                                    <ErrorMessage name="title" component="small"
                                                  className="form-section__field-error"/>

                                    <Button text={t("btn-breate")} type="submit" disabled={props.isSubmitting}/>
                                </Form>
                            )
                        }
                    </Formik>
                </article>
            </section>
        </main>
    )
}

export default TotalisatorNewPage;