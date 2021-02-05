import useUser from "../../hooks/useUser";
import useTotalisator from "../../hooks/useTotalisator";
import image from "../../assets/bg-images/bicycle-kick-01-small-flip-hue.png";

const UserWelcomePage = () => {

    const user = useUser();
    const totalisator = useTotalisator();

    const hasTotalisators = user.totalisators.length > 0;

    const renderForNewUser = () => {
        return (
            <article className="text-section__article">
                <h2>HELLO ORACLE! <strong>GET STARTED!</strong> </h2>
                <div className="text-section__description">
                    <p>
                        Seems that you don't participate in any totalisators yet. No worries!
                    </p>
                    <p>
                        You can either <a href="/totalisator/new">create your own totalisator </a>
                        or get invited to totalisators that were already created by your <a href="/user/friends">friends</a>.
                    </p>
                    <p>
                        You will be able to participate as player even in your managed totalisator.
                    </p>
                </div>
            </article>
        )
    }

    const renderUsual = () => {
        return (
            <article className="text-section__article">
                <h2>HELLO ORACLE! <strong>CONTINUE ON YOUR PROPHESIES!</strong> </h2>
                <div className="text-section__description">
                    <p>
                        Check out what's new in <a href="/totalisator">{totalisator.title}</a>.
                    </p>
                    <p>
                        Remember - you can participate in or <a href="/totalisator/new">create</a> as many totalisators as you need.
                        Find and join others who are using Totalisator 3.0 in <a href="/user/friends">friends section</a>.
                    </p>
                    <p>
                        Just a reminder - you are able to participate as player even in your own managed totalisator.
                    </p>
                </div>
            </article>

        )
    }

    return (
        <main className="default">
            <section className="graph-section">
                <img src={image} alt="ball in net"/>
            </section>
            <section className="text-section text-section--welcome">
                {hasTotalisators ? renderUsual() : renderForNewUser() }
            </section>

        </main>
    )
}

export default UserWelcomePage;