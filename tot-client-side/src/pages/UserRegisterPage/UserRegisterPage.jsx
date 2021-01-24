export default () => (
    <main className="default">
        <section className="graph-section">
        </section>
        <section className="form-section">
            <article className="form-section__article">
                <h2>USER REGISTRATION</h2>
                <form action="post">
                    <label>Email (username):</label>
                    <input type="text"/>
                    <label>Password:</label>
                    <input type="text"/>
                    <label>Password confirm:</label>
                    <input type="text"/>
                    <label>Name:</label>
                    <input type="text"/>
                    <button className="form-section__button">
                        Register
                    </button>
                    <p className="form-section__undertext">Already a member? <a href="#">Sign In</a></p>
                </form>
            </article>
        </section>
    </main>
)