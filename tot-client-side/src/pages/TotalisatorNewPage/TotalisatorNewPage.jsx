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

const TotalisatorNewPage = () => {

    const user = useUser();
    const dispatch = useDispatch();
    const history = useHistory();

    const validationSchema = Yup.object().shape({
        title: Yup
            .string()
            .required("Title cannot be empty")
            .min(3, "Title must be at least 3 characters long")
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
            </section>
            <section className="form-section">
                <article className="form-section__article">
                    <h2>NEW TOTALISATOR</h2>

                    <Formik initialValues={{title: ""}}
                            onSubmit={handleCreate}
                            validationSchema={validationSchema}>
                        {/*validationSchema={validationSchema}>*/}
                        {(props) =>
                            (
                                <Form>
                                    <label>Totalisator title:</label>
                                    <Field name="title" id="title" placeholder="e.g. Friends Totalisator 2021"/>
                                    <ErrorMessage name="title" component="small"
                                                  className="form-section__field-error"/>

                                    <Button text="Create" type="submit" disabled={props.isSubmitting}/>
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