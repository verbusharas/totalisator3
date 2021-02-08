import {Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import {
    acceptFriendRequest,
    dismissFriendRequest,
    findFriendshipsByUserId,
    findUsersByPartialName
} from "../../api/userApi";
import FoundPersonCard from "./PersonCards/FoundPersonCard";
import FriendCard from "./PersonCards/FriendCard";
import useUser from "../../hooks/useUser";
import image from "../../assets/bg-images/ball3.png"
import {useTranslation} from "react-i18next";

const UserFriendsPage = () => {

    const {t} = useTranslation('friends');

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSearchTyping = (e) => {
        if (user) {
            loadFriends();
            const value = e.target.value;
            setPartialName(value);
            if (value.length > 1) {
                findUsersByPartialName(value).then(res => {
                    const foundUsers = res.data;
                    const allButCurrent = foundUsers.filter(u=>u.id!==user.id);
                    setFoundPeople({typed: value, entities: allButCurrent});
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
            });
    }

    const handleFriendDismiss = ({requester, receiver}) => {
        dismissFriendRequest(requester.id, receiver.id)
            .then((res) => {
                loadFriends();
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
        const {requester, receiver} = friendship;
        // Regardless of who is requester/receiver render the one who is not the current user
        const friend = (requester.id === user.id) ? receiver : requester;
        return <FriendCard key={"f" + friend.id}
                           isFriend
                           person={friend}
                           handleDismiss={() => handleFriendDismiss(friendship)}
        />
    }

    return (
        <main className="default">
            <section className="graph-section">
                <img src={image} alt="ball"/>
            </section>
            {user &&
            <section className="form-section">
                <article className="form-section__article">
                    {getFriendRequests().length > 0 &&
                    <>
                        <h2>{t("title-friend-requests")}</h2>
                        <p>{t("description-friend-requests")}</p>
                        <div className="found-users">
                            {getFriendRequests().map((f) => renderFriendRequest(f))}
                        </div>
                    </>
                    }

                </article>
                <article className="form-section__article">
                    <h2>{t("title-find-people")}</h2>
                    <Formik initialValues={{name: ""}}>
                        {(props) =>
                            (
                                <Form>
                                    <label>{t("person-name")}</label>
                                    <Field name="name" id="name" value={partialName} onChange={handleSearchTyping}
                                           placeholder={t("person-name-placeholder")} autoComplete="off"/>
                                    {!!foundPeople.entities.length &&
                                    <>
                                    <p>{t("title-found-users")}</p>
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
            <section className="friendlist-section">
                <article className="form-section__article">
                    <h2>{t("title-friends")} ({getFriends().length})</h2>

                    <div className="found-users">
                        {getFriends().map((f) => renderFriend(f))}
                        {!getFriends().length &&
                        <p>
                            {t("empty-friends-list")}
                        </p>}
                    </div>

                </article>
            </section>
        </main>
    )
}

export default UserFriendsPage;