import useUser from "../../hooks/useUser";
import useTotalisator from "../../hooks/useTotalisator";
import image from "../../assets/bg-images/bicycle-kick-01-small-flip-hue.png";
import {Trans, useTranslation} from "react-i18next";

const UserWelcomePage = () => {

    const user = useUser();
    const totalisator = useTotalisator();

    const {t} = useTranslation('user-welcome-page');

    const hasTotalisators = user.totalisators.length > 0;

    const renderForNewUser = () => {
        return (
            <article className="text-section__article">
                <h2>
                    <Trans i18nKey="user-welcome-page:greeting">
                        HELLO ORACLE! <strong>GET STARTED!</strong>
                    </Trans>
                </h2>
                <div className="text-section__description">
                    <p>
                        <Trans i18nKey="user-welcome-page:empty-totalisators-list">
                            Seems that you don't participate in any totalisators yet. No worries!
                        </Trans>
                    </p>
                    <p>
                        <Trans i18nKey="user-welcome-page:options">
                            You can either <u><a href="/totalisator/new">create your own totalisator </a></u>
                            or get invited to totalisators that were already created by your <u><a
                            href="/user/friends">friends</a></u>.
                        </Trans>
                    </p>
                    <p>
                        <Trans i18nKey="user-welcome-page:ability-to-participate">
                            You will be able to participate as player even in your managed totalisator.
                        </Trans>
                    </p>
                </div>
            </article>
        )
    }

    const renderUsual = () => {
        return (
            <article className="text-section__article">
                <h2>
                    <Trans i18nKey="user-welcome-page:greeting-continuous">
                        HELLO ORACLE! <strong>CONTINUE ON YOUR PROPHESIES!</strong>
                    </Trans>
                </h2>
                <div className="text-section__description">
                    <p>
                        {t("whats-new")}<a href="/totalisator">{totalisator.title}</a>.
                    </p>
                    <p>
                        <Trans i18nKey="user-welcome-page:ability-participate-create">
                            Remember - you can participate in or <u><a href="/totalisator/new">create</a></u> as many
                            totalisators
                            as you need.
                            Find and join others who are using Totalisator 3.0 in <u><a href="/user/friends">friends
                            section</a></u>.
                        </Trans>
                    </p>
                    <p>
                        <Trans i18nKey="user-welcome-page:reminder">
                            Just a reminder - you are able to participate as player even in your own managed
                            totalisator.
                        </Trans>
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
                {hasTotalisators ? renderUsual() : renderForNewUser()}
            </section>

        </main>
    )
}

export default UserWelcomePage;