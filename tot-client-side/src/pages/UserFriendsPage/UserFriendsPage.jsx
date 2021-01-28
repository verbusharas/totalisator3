import {Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import {
    acceptFriendRequest,
    dismissFriendRequest,
    findFriendshipsByUserId,
    findUsersByPartialName
} from "../../api/soccersApi";
import FoundPersonCard from "./PersonCards/FoundPersonCard";
import FriendCard from "./PersonCards/FriendCard";
import useUser from "../../hooks/useUser";
import image from "../../assets/bg-images/ball3.png"

const UserFriendsPage = () => {

    const [partialName, setPartialName] = useState("");
    const [foundPeople, setFoundPeople] = useState({typed: "", entities: []});
    const [foundFriendships, setFoundFriendships] = useState([]);
    const user = useUser();

    const loadFriends = () => {
        if (user) {
            findFriendshipsByUserId(user.id).then(res => {
                setFoundFriendships(res.data);
            }).catch(err => console.log("Returned -> Error:", err.response.data));
        }
    }

    useEffect(() => {
        loadFriends();
    }, [])

    const handleChange = (e) => {
        if (user) {
            loadFriends();
            const value = e.target.value;
            setPartialName(value);
            if (value.length > 1) {
                findUsersByPartialName(value).then(res => {
                    setFoundPeople({typed: value, entities: res.data});
                }).catch(err => {
                    console.log("Returned -> Error:", err.response.data)
                });
            }
        }
    }

    const handleFriendAccept = (friendship) => {
        acceptFriendRequest(user.id, friendship.requester.id)
            .then((res) => {
                loadFriends();
                console.log("Friend Request Accepted", res)
            });
    }

    const handleFriendDismiss = ({requester, receiver}) => {
        dismissFriendRequest(requester.id, receiver.id)
            .then((res) => {
                loadFriends();
                console.log("Friendship Deleted", res)
            });
    }

    const renderPerson = (person) => {
        const requestedFriendIds = foundFriendships.map(f => f.receiver.id);
        const isRequested = requestedFriendIds.includes(person.id);
        return <FoundPersonCard
            key={"l" + person.id}
            person={person}
            typedPart={foundPeople.typed}
            isRequested={isRequested}
        />
    }

    const getFriendRequests = () => {
            return foundFriendships.filter((f) => {
                return (f.requester.id !== user.id) && !f.isAccepted
            })
    }

    const getFriends = () => {
        return foundFriendships.filter((f) => {
            return f.isAccepted
        })
    }

    const renderFriendRequest = (friendship) => {
        if (user) {
            const {requester} = friendship;
            return <FriendCard key={"fr" + requester.id}
                               person={requester}
                               isRequest
                               handleAccept={() => handleFriendAccept(friendship)}
                               handleDismiss={() => handleFriendDismiss(friendship)}
            />
        }
    }

    const renderFriend = (friendship) => {
        const {requester, receiver, isAccepted} = friendship;
        // Regardless of who is requester/receiver render the one who is not the current user
        const friend = (requester.id === user.id) ? receiver : requester;
        return <FriendCard key={"f" + friend.id}
                           person={friend}
                           handleDismiss={() => handleFriendDismiss(friendship)}
        />
    }

    return (
        <main className="default">
            <section className="graph-section">
                <img src={image} alt="ball image"/>
            </section>
            {user &&
            <section className="form-section">
                <article className="form-section__article">
                    {getFriendRequests().length > 0 &&
                    <>
                        <h2>FRIEND REQUESTS</h2>
                        <p>Received friend requests waiting for your action:</p>
                        <div className="found-users">
                            {getFriendRequests().map((f) => renderFriendRequest(f))}
                        </div>
                    </>
                    }
                    <h2>FRIENDS</h2>

                    <div className="found-users">
                        {getFriends().map((f) => renderFriend(f))}
                        {!getFriends().length &&
                        <p>You don't have any friends yet.
                            Find people in the search below and add them as your friends.</p>}
                    </div>

                </article>
                <article className="form-section__article">
                    <h2>FIND PEOPLE</h2>
                    <Formik initialValues={{name: ""}}>
                        {(props) =>
                            (
                                <Form>
                                    <label>Person's name:</label>
                                    <Field name="name" id="name" value={partialName} onChange={handleChange}
                                           placeholder="Start typing a name..." autoComplete="off"/>
                                    {!!foundPeople.entities.length &&
                                    <>
                                    <p>Found users:</p>
                                    <div className="found-users">
                                        {foundPeople.entities.map(u => renderPerson(u))}
                                    </div>
                                    </>
                                    }
                                </Form>
                            )
                        }
                    </Formik>
                </article>
            </section>
            }
        </main>
    )
}


export default UserFriendsPage