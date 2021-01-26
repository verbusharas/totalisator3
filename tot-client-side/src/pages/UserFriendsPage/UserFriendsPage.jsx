import {Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import {findFriendshipsByUserId, findUsersByPartialName} from "../../api/soccersApi";
import FoundPersonCard from "./FoundPersonCard";
import {connect} from "react-redux";
import FriendCard from "./FriendCard";

 const UserFriendsPage = ({loggedInUserId}) => {

    const [partialName, setPartialName] = useState("");
    const [foundUsers, setFoundUsers] = useState({typed: "", users: []});
    const [foundFriendships, setFoundFriendships] = useState([]);

    useEffect(()=>{
        findFriendshipsByUserId(loggedInUserId).then(res => {
            setFoundFriendships(res.data);
        }).catch(err => {
            console.log("Returned -> Error:", err.response.data)
        });
    }, [])


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
        return <FoundPersonCard key={"l" + user.id} user={user} typedPart={foundUsers.typed}/>
    }

     const renderFriendRequest = (user) => {
         return <FriendCard key={"fr" + user.id} user={user} />
     }

    return (
        <main className="default">
            <section className="graph-section">
            </section>
            <section className="form-section">
                <article className="form-section__article">
                    <h2>FIND PEOPLE</h2>
                    <Formik initialValues={{name: ""}}>
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
                <article className="form-section__article">
                    <h2>FRIENDS</h2>
                    <p>Received friend requests waiting for your action:</p>
                    {foundFriendships.map((requester)=>renderFriendRequest(requester))}
                    <p>Friend list:</p>
                </article>

            </section>
        </main>
    )
}

const mapStateToProps = ({ user }) => ({
    loggedInUserId: user.id,
})

export default connect(mapStateToProps, null)(UserFriendsPage);