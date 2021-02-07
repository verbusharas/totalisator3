import {useEffect, useState} from "react";
import {deleteUser, fetchAllUsers} from "../../api/userApi";
import image from "../../assets/bg-images/soul-02-small.png";

const AdminPage = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchAllUsers().then(res => {
            setUsers(res.data)
        })
    }, [])

    const deleteUserClicked = (userId) => {
        deleteUser(userId).then(res=> {
            if (res.status === 204) {
                const updatedUserList = users.filter(u=>u.id!==userId);
                setUsers(updatedUserList);
            }
        })
    }

    const renderUser = (user) => {
        console.log("User", user);
        return (
            <tr key={user.id}>
                <td>
                    {user.id}
                </td>
                <td>
                    {user.name}
                </td>
                <td>
                    {user.username}
                </td>
                <td>
                    <button onClick={()=>deleteUserClicked(user.id)}>✖ <span> DELETE</span></button>
                </td>
            </tr>
        )
    }

    return (
        <main className="default admin">
            <section className="graph-section">
                <img src={image} alt="ball and foot"/>
            </section>
            <section className="form-section">
                <h2>LIST OF REGISTERED USERS</h2>
                <article className="form-section__article">
                    <table>
                        <thead>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Username</td>
                        </thead>
                        <tbody>
                        {users.map(renderUser)}
                        </tbody>
                    </table>
                </article>
            </section>
        </main>
    )

}

export default AdminPage;