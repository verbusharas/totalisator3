import {Form, Formik, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import Button from "../../components/Forms/Button";
import Undertext from "../../components/Forms/Undertext";
import {saveUser} from "../../api/soccersApi";
import {useHistory} from "react-router-dom";
import {useState} from "react";
import ServerErrorMessage from "../../components/Forms/ServerErrorMessage";

export default () => {
    const [serverValidationErrors, setServerValidationErrors] = useState({});
    const history = useHistory();


    const handleOnSubmit = (formValues) => {
        saveUser(formValues)
            .then(res => {
                history.push("/user/login");
            }).catch(err => {
                setServerValidationErrors(err.response.data)
            console.log("User registration failed with server error:", err.response.data);
        })
    }

    const validationSchema = Yup.object().shape({
        username: Yup
            .string()
            .email("Please enter a valid email address")
            .required("Email is required"),
        password: Yup
            .string()
            .min(8, "Password must be at least 8 characters long")
            .required("Password is required"),
        passwordConfirm: Yup
            .string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        name: Yup
            .string()
            .min(3, "Name must be at least 3 characters long")
            .required("Name is required")
    });


    return (
        <main className="default">
            <section className="graph-section">
            </section>
            <section className="form-section">
                <article className="form-section__article">
                    <h2>USER REGISTRATION</h2>
                    <Formik initialValues={{username: "", password: "", passwordConfirm: "", name: ""}}
                            onSubmit={handleOnSubmit}
                            validationSchema={validationSchema}>
                        {(props) =>
                            (
                                <Form>
                                    <label>Email (username):</label>
                                    <Field name="username" id="username" placeholder="This will be your username"/>
                                    <ErrorMessage name="username" component="small" className="form-section__field-error"/>
                                    <ServerErrorMessage message={serverValidationErrors.username}/>

                                    <label>Password:</label>
                                    <Field name="password" id="password" type="password"/>
                                    <ErrorMessage name="password" component="small" className="form-section__field-error"/>
                                    <ServerErrorMessage message={serverValidationErrors.password}/>

                                    <label>Password confirm:</label>
                                    <Field name="passwordConfirm" id="passwordConfirm" type="password"/>
                                    <ErrorMessage name="passwordConfirm" component="small" className="form-section__field-error"/>


                                    <label>Name:</label>
                                    <Field name="name" id="name" placeholder="This name will be visible by others"/>
                                    <ErrorMessage name="name" component="small" className="form-section__field-error"/>
                                    <ServerErrorMessage message={serverValidationErrors.name}/>

                                    <Button text="Register" type="submit"/>
                                    <Undertext text="Already a member?" link="Sign In" to="/user/login"/>

                                </Form>
                            )
                        }

                    </Formik>
                </article>
            </section>
        </main>
    )
}