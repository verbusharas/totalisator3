const DeniedAccessPage = () => {

    return (
        <main className="default">
            <section className="graph-section">
            </section>
            <section className="form-section">
                <article className="form-section__article">
                    <h2>ACCESS DENIED</h2>
                    <p>It seems that your account does not have access rights to this page</p>
                    <p><a href="/user/login">Login</a> with different account, or continue browsing to accessible pages.</p>
                </article>
            </section>
        </main>
    )
}

export default DeniedAccessPage;