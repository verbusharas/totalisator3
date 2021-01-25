import {ErrorMessage, Field, Form, Formik} from "formik";
import Button from "../../components/Forms/Button";
import {useState} from "react";
import {findUsersByPartialName, saveUser} from "../../api/soccersApi";
import _ from "lodash";
import FoundPersonCard from "./FoundPersonCard";

export default () => {

    const [partialName, setPartialName] = useState("");
    const [foundUsers, setFoundUsers] = useState({typed: "", users: []});

    const handleOnSubmit = () => {
        return null;
    }

    const handleChange = (e) => {
        let value = e.target.value;
        setPartialName(value);
        if (value.length > 2) {
            findUsersByPartialName(value).then(res => {
                setFoundUsers({typed: value, users: res.data});
            }).catch(err => {
                console.log("Returned -> Error:", err.response.data)
            });
        }
    }

    const renderUser = (user) => {
        return <FoundPersonCard key={user.id} user={user} typedPart={foundUsers.typed}/>
    }

    return (
        <main className="default">
            <section className="graph-section">
            </section>
            <section className="form-section">
                <article className="form-section__article">
                    <h2>FIND FRIENDS</h2>

                    <Formik initialValues={{name: ""}}
                            onSubmit={handleOnSubmit}>
                        {(props) =>
                            (
                                <Form>
                                    <label>Person's name:</label>
                                    <Field name="name" id="name" value={partialName} onChange={handleChange}
                                           placeholder="Start typing a name..." autoComplete="off"/>
                                    <p>Found users:</p>
                                    <div className="found-users">
                                        {foundUsers.users.map(u => renderUser(u))}
                                    </div>

                                </Form>
                            )
                        }

                    </Formik>
                </article>
            </section>
        </main>
    )
}