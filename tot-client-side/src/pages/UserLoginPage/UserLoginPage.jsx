import {Form, Formik, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import Button from "../../components/Forms/Button";
import Undertext from "../../components/Forms/Undertext";
import {loginUser} from "../../api/userApi";
import {useHistory, useLocation} from "react-router-dom"
import {useDispatch} from "react-redux";
import {setJwt, setUserData} from "../../store/slices/userSlice";
import {fetchTotalisatorById, fetchTotalisators, fetchTotalisatorsByUserId} from "../../api/totalisatorApi";
import {setTotalisator} from "../../store/slices/totalisatorSlice";
import useUser from "../../hooks/useUser";

export default () => {

    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleLogin = (loginData, {setSubmitting}) => {
        setSubmitting(true);
        loginUser(loginData).then(({data, headers: {authorization}}) => {
            dispatch(setUserData(data))
            dispatch(setJwt(authorization))
            const {from} = location.state || {
                from: {
                    pathname: '/'
                }
            }
            history.push(from)
            return data.totalisators;
        }).then((totalisators)=>{
            if (totalisators.length > 0) {
                // TODO: change to locally stored "Last Active ID"
                fetchTotalisatorById(totalisators[1].id).then(res=>{
                    console.log("totalisators[0]", totalisators[0])
                    dispatch(setTotalisator(res.data))
                })
            }
        })
            .finally(() => setSubmitting(false))
    }

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


    return (
        <main className="default">
            <section className="graph-section">
            </section>
            <section className="form-section">
                <article className="form-section__article">
                    <h2>USER LOGIN</h2>

                    <Formik initialValues={{username: "", password: "", passwordConfirm: "", name: ""}}
                            onSubmit={handleLogin}>
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