import "../../style/feed-fifa.css"
import Toteboard from "../../components/Toteboards/Toteboard";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {Grid, makeStyles} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {fetchFakeFixtures, fetchFifaFixtures} from "../../api/fixtureApi";
import {deleteMatch, fetchFinishedMatches, fetchRegisteredMatches, saveAsMatch} from "../../api/matchApi";
import useTotalisator from "../../hooks/useTotalisator";
import DemoSwitch from "../../components/Header/HeaderFragments/DemoSwitch";
import usePreferences from "../../hooks/usePreferences";
import {Trans, useTranslation} from "react-i18next";

const ManageMatchesPage = () => {

    const {t} = useTranslation('manage-matches');

    const [fifaFixtures, setFifaFixtures] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [addingIds, setAddingIds] = useState([]);
    const [managerPendingMatches, setManagerPendingMatches] = useState([]);
    const [managerFinishedMatches, setManagerFinishedMatches] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const dateToString = date => date.toISOString().split('T')[0];

    const totalisator = useTotalisator();
    const preferences = usePreferences();

    useEffect(() => {
        fetchRegisteredMatches(totalisator.id)
            .then(res => {
                setManagerPendingMatches(res.data)
                fetchFinishedMatches(totalisator.id)
                    .then(response => {
                        setManagerFinishedMatches(response.data)
                        loadFixtures(selectedDate);
                    }).catch(err => console.log("Error:", err.response.data));
            }).catch(err => console.log("Error:", err.response.data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const loadFixtures = (date) => {
        setIsLoading(true);
        fetchFifaFixtures(dateToString(date))
            .then(res => {
                setFifaFixtures(res.data)
                return res.data;
            }).then(() => {
            if (preferences?.isFakeMatchesIncluded) {
                fetchFakeFixtures().then(res => {
                    const fakeFixtures = res.data;
                    if (fifaFixtures?.length > 0) {
                        setFifaFixtures((prevArray) => [...prevArray, ...fakeFixtures])
                    } else {
                        setFifaFixtures(fakeFixtures)
                    }
                })
            }
        })
            .catch(err => console.log("Error:", err.response.data))
            .finally(() => setIsLoading(false));
    }

    const loadTotalisatorMatches = () => {
        fetchRegisteredMatches(totalisator.id)
            .then(response => setManagerPendingMatches(response.data))
            .catch(err => console.log("Error:", err));

        fetchFinishedMatches(totalisator.id)
            .then(response => setManagerFinishedMatches(response.data))
            .catch(err => console.log("Error:", err));
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
        loadFixtures(date);
    };

    const handleFixtureSelect = (fixture) => {
        setAddingIds([...addingIds, fixture.fifaId]);
        fixture.totalisatorId = totalisator.id;
        saveAsMatch(totalisator.id, fixture).then((res) => {
            loadTotalisatorMatches();
        });
    }

    const handleDelete = (match) => {
        deleteMatch(totalisator.id, match.entityId).then(res => {
            if (res.status === 204) {
                const pendingWithoutDeleted = managerPendingMatches.filter(m => m.entityId !== match.entityId);
                const finishedWithoutDeleted = managerFinishedMatches.filter(m => m.entityId !== match.entityId);
                setManagerPendingMatches(pendingWithoutDeleted);
                setManagerFinishedMatches(finishedWithoutDeleted);
            }
        })
    }

    const useStyles = makeStyles({
        root: {
            "& .MuiInputBase-root": {
                padding: 0,
                "& .MuiButtonBase-root": {
                    padding: 0,
                    paddingLeft: 10
                },
                "& .MuiInputBase-input": {
                    padding: 5,
                    paddingLeft: 20
                }
            },
            backgroundColor: "#ffda1f",
            paddingRight: 20,
            marginTop: 0
        }
    });
    const classes = useStyles();

    const createDatePicker = () => {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="center">
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        format="yyyy/MM/dd"
                        variant="inline"
                        value={selectedDate}
                        onChange={handleDateChange}
                        autoOk={true}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        className={classes.root}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
        )
    }

    const createFifaToteboard = (match) => {
        const registeredFifaIds = managerPendingMatches.map(m => m.fifaId);
        if (registeredFifaIds.includes(match.fifaId) || addingIds.includes(match.fifaId)) {
            return <Toteboard key={match.fifaId} match={match} variant="fifa-added"/>
        }
        switch (match.statusName) {
            case "Notstarted":
                return <Toteboard key={match.fifaId} match={match} variant="fifa-listed"
                                  handleClick={() => handleFixtureSelect(match)}/>;
            case "Notannounced":
                return <Toteboard key={match.fifaId} match={match} variant="fifa-listed"
                                  handleClick={() => handleFixtureSelect(match)}/>;
            case "Finished":
                return <Toteboard key={match.fifaId} match={match} variant="fifa-finished"/>;
            default :
                return <Toteboard key={match.fifaId} match={match} variant="fifa-invalid"/>
        }
    }

    const createManagerPendingToteboard = (match) => {
        return <Toteboard key={"mp" + match.entityId}
                          match={match}
                          handleDelete={() => handleDelete(match)}
                          variant="manager-pending"/>
    }

    const createManagerFinishedToteboard = (match) => {
        return <Toteboard key={"mf" + match.entityId}
                          match={match}
                          handleDelete={() => handleDelete(match)}
                          variant="manager-finished"/>
    }

    return (
        <main>
            <section className="feed feed--fifa">
                <h2 className="feed__title">{t("title-find-and-add")}</h2>
                <article className="feed__description">
                    <p>
                        <Trans i18nKey="manage-matches:fixtures-description">
                            You can add new matches to your totalisator here. Select a date to
                            get official Fifa fixtures for. Choose and add the desired ones to
                            your managed totalisator. Once the match is added, players can
                            immediately start registering their predictions.
                        </Trans>
                    </p>
                    <p>
                        <Trans i18nKey="manage-matches:select-date">
                            Select date:
                        </Trans>
                    </p>
                    {createDatePicker()}
                    <div style={{display: "flex"}}>
                        <Trans i18nKey="manage-matches:include-demo-fixtures">
                            <span>Include demo fixtures?</span>
                        </Trans>
                        <DemoSwitch/>
                    </div>
                    <p>
                        <Trans i18nKey="manage-matches:choose-fixtures">
                            Choose fixtures:
                        </Trans>
                    </p>
                    {isLoading && <p>{t("loading")}</p>}
                </article>
                {fifaFixtures.length > 0
                    ? fifaFixtures.map((m) => createFifaToteboard(m))
                    : <p className="feed__description">{t("no-fixtures-found")}</p>}
            </section>
            <section className="feed feed--added">
                <h2 className="feed__title">{t("title-manage-registered-matches")}</h2>
                <article className="feed__description">
                    <p>
                        <Trans i18nKey="manage-matches:registered-matches-description">
                            The newly added, not started matches can be viewed here. This is the
                            list that players see on top of their page if they have not yet
                            registered their predictions. You can remove any match by clicking
                            “X” on the top corner of corresponding tote board.
                        </Trans>
                    </p>
                    <p>
                        <Trans i18nKey="manage-matches:match-delete-warning">
                            Please note that by removing the match at any stage, also deletes
                            its registered predictions and subtracts earned points.
                        </Trans>
                    </p>
                </article>
                {managerPendingMatches
                    ? managerPendingMatches.map((m) => createManagerPendingToteboard(m))
                    : <Trans i18nKey="manage-matches:empty-feed-pending">
                        <p className="feed__description">Currently there are no matches pending. Try adding some
                            in the section above.
                        </p>
                    </Trans>}
            </section>
            <section className="feed feed--finished">
                <h2 className="feed__title">{t("title-history")}</h2>
                <article className="feed__description">
                    <p>
                        <Trans i18nKey="manage-matches:history-description">
                        This is a list of added matches that have already finished. These
                        matches contain predictions of all participants, and their earned
                        points. You can still delete any of these matches, in which case the
                        corresponding earned points get subtracted from total score.
                        </Trans>
                    </p>
                </article>
                {managerFinishedMatches
                    ? managerFinishedMatches.map((m) => createManagerFinishedToteboard(m))
                    :
                    <p className="feed__description">
                        <Trans i18nKey="manage-matches:empty-feed-history">
                        Currently there are no matches pending for a game. Try adding some
                        in the section above.
                        </Trans>
                    </p>}
            </section>
        </main>
    )
}

export default ManageMatchesPage;
