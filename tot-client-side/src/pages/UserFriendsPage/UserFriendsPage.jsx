import {Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import {
    acceptFriendRequest,
    dismissFriendRequest,
    findFriendshipsByUserId,
    findUsersByPartialName
} from "../../api/soccersApi";
import FoundPersonCard from "./FoundPersonCard";
import {connect} from "react-redux";
import FriendCard from "./FriendCard";

const UserFriendsPage = ({loggedInUserId}) => {

    const [partialName, setPartialName] = useState("");
    const [foundUsers, setFoundUsers] = useState({typed: "", users: []});
    const [foundFriendships, setFoundFriendships] = useState([]);

    const loadFriends = () => {
        findFriendshipsByUserId(loggedInUserId).then(res => {
            setFoundFriendships(res.data);
            console.log("CURRENT FRIENDSHIPS FROM API (res.data): ", res.data)
        }).catch(err => {
            console.log("Returned -> Error:", err.response.data)
        });
    }

    useEffect(() => {
        loadFriends();
    }, [])

    const handleChange = (e) => {
        loadFriends();
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

    const handleFriendAccept = (friendship) => {
        acceptFriendRequest(loggedInUserId, friendship.requester.id)
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

    const renderUser = (user) => {

        const requestedFriendIds = foundFriendships.map(f => f.receiver.id);
        const isRequested = requestedFriendIds.includes(user.id);

        return <FoundPersonCard
            key={"l" + user.id}
            user={user}
            typedPart={foundUsers.typed}
            isRequested={isRequested}
        />
    }

    const renderFriendRequest = (friendship) => {
        // Show only incomming requests, not outgoing
        if ((friendship.requester.id !== loggedInUserId) && !friendship.isAccepted) {
            return <FriendCard key={"fr" + friendship.requester.id}
                               user={friendship.requester}
                               isRequest
                               handleAccept={() => handleFriendAccept(friendship)}
                               handleDismiss={() => handleFriendDismiss(friendship)}
            />
        }
    }

    const renderFriend = (friendship) => {
        // Regardless of who is requester/receiver render the one who is not the current user
        const friend = (friendship.requester.id === loggedInUserId) ? friendship.receiver : friendship.requester;
        return <FriendCard key={"f" + friend.id}
                           user={friend}
                           handleDismiss={() => handleFriendDismiss(friendship)}
        />
    }

    return (
        <main className="default">
            <section className="graph-section">
            </section>
            <section className="form-section">

                <article className="form-section__article">
                    <h2>FRIEND REQUESTS</h2>
                    <p>Received friend requests waiting for your action:</p>
                    <div className="found-users">
                        {foundFriendships.map((f) => renderFriendRequest(f))}
                    </div>
                    <h2>FRIENDS</h2>
                    <div className="found-users">
                        {foundFriendships.filter((f) => f.isAccepted).map((f) => renderFriend(f))}
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

const mapStateToProps = ({user}) => ({
    loggedInUserId: user.id,
})

export default connect(mapStateToProps, null)(UserFriendsPage);