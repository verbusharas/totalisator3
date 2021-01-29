import React from "react";
import useTotalisator from "../../hooks/useTotalisator";

const ManagerHomePage = () => {

    const totalisator = useTotalisator();

    return (
        <main>
            <section className="feed feed--fifa">
                <h2 className="feed__title">SUCCESSFULLY CREATED TOTALISATOR, CONGRATULATIONS!</h2>
                <article className="feed__description">
                    <p>
                       You will be the manager of "{totalisator.title}". Choose what you want to do next:
                    </p>
                    <div className="feed__links">
                        <a href="/totalisator/manage/players">ADD FRIENDS AS PLAYERS</a>
                        <a href="/totalisator/manage/matches">ADD/REMOVE MATCHES FOR PLAYERS TO PREDICT</a>
                        <a href="/totalisator/manage/settings">CONFIGURE TOTALISATOR SETTINGS</a>
                    </div>

                    <p>
                        You can access these pages anytime.
                        Use the highlighted manager menu at the top.
                    </p>

                    <p> Don't forget to keep players busy - add new matches to predict on regular basis.</p>
                </article>
            </section>
        </main>
    )
}

export default ManagerHomePage;