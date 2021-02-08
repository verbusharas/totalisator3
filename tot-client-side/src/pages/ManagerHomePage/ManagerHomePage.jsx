import React from "react";
import useTotalisator from "../../hooks/useTotalisator";
import {Trans, useTranslation} from "react-i18next";

const ManagerHomePage = () => {

    const totalisator = useTotalisator();
    const {t} = useTranslation('manage-totalisator');
    return (
        <main>
            <section className="feed feed--fifa">
                <h2 className="feed__title">{t("title-created-totalisator")}</h2>
                <article className="feed__description">
                    <p>
                        <Trans i18nKey="manage-totalisator:description-created-totalisator">
                            You will be the manager of <strong>"{{title: totalisator.title}}"</strong>. Choose what you
                            want to do next:
                        </Trans>
                    </p>
                    <div className="feed__links">
                        <a href="/totalisator/manage/matches">{t("btn-add-remove-matches")}</a>
                        <a href="/totalisator/manage/players">{t("btn-add-players")}</a>
                        <a href="/totalisator/manage/settings">{t("btn-configure-settings")}</a>
                    </div>

                    <p>
                        <Trans i18nKey="manage-totalisator:access-anytime">
                            You can access these pages anytime.
                            Use the highlighted manager menu at the top.
                        </Trans>
                    </p>

                    <p>
                        <Trans i18nKey="manage-totalisator:keep-busy">
                            Don't forget to keep players busy - add new matches to predict on regular basis.
                        </Trans>
                    </p>

                </article>
            </section>
        </main>
    )
}

export default ManagerHomePage;