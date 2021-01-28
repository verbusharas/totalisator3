import {Form, Formik, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import Button from "../../components/Forms/Button";
import Undertext from "../../components/Forms/Undertext";
import {loginUser} from "../../api/soccersApi";
import {useHistory, useLocation} from "react-router-dom"
import {useDispatch} from "react-redux";
import {setJwt, setUserData} from "../../store/slices/userSlice";

export default () => {

    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();


    const validationSchema = Yup.object().shape({
        username: Yup
            .string()
            .email("Please enter a valid email address")
            .required("Enter your email address"),
        password: Yup
            .string()
            .min(8, "Password must be at least 8 characters long")
            .required("Enter password"),
    });

    const handleSubmit = (loginData, {setSubmitting}) => {
        setSubmitting(true);
        console.log("Logging in user", loginData)
        loginUser(loginData).then(({data, headers: {authorization}}) => {
            dispatch(setUserData(data))
            dispatch(setJwt(authorization))
            const {from} = location.state || {
                from: {
                    pathname: '/'
                }
            }
            history.push(from)
        })
            .finally(() => setSubmitting(false))
    }


    return (
        <main className="default">
            <section className="graph-section">
            </section>
            <section className="form-section">
                <article className="form-section__article">
                    <h2>USER LOGIN</h2>

                    <Formik initialValues={{username: "", password: "", passwordConfirm: "", name: ""}}
                            onSubmit={handleSubmit}>
                        {/*validationSchema={validationSchema}>*/}
                        {(props) =>
                            (
                                <Form>
                                    <label>Email (username):</label>
                                    <Field name="username" id="username"/>
                                    <ErrorMessage name="username" component="small"
                                                  className="form-section__field-error"/>

                                    <label>Password:</label>
                                    <Field name="password" id="password" type="password"/>
                                    <ErrorMessage name="password" component="small"
                                                  className="form-section__field-error"/>

                                    <Button text="Login" type="submit" disabled={props.isSubmitting}/>
                                    <Undertext text="Not a member?" link="Sign Up" to="/user/register"/>
                                </Form>
                            )
                        }
                    </Formik>
                </article>
            </section>
        </main>
    )
}