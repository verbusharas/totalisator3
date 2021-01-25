import {Form, Formik, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import Button from "../../components/Forms/Button";
import Undertext from "../../components/Forms/Undertext";

export default () => {

    const handleOnSubmit = () => {
        return null;
    }



    const validationSchema = Yup.object().shape({
            username: Yup
                .string()
                .email("Please enter a valid email address")
                .required("Enter your email address"),
        password: Yup
            .string()
            .min(8,"Password must be at least 8 characters long")
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
                            onSubmit={handleOnSubmit}
                            validationSchema={validationSchema}>
                        {(props) =>
                            (
                                <Form>
                                    <label>Email (username):</label>
                                    <Field name="username" id="username"/>
                                    <ErrorMessage name="username" component="small" className="form-section__field-error"/>

                                    <label>Password:</label>
                                    <Field name="password" id="password" type="password"/>
                                    <ErrorMessage name="password" component="small" className="form-section__field-error"/>

                                    <Button text="Login" type="button"/>
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