import "../../style/feed-fifa.css"
import Toteboard from "../../components/Toteboards/Toteboard";
import matches from "../../components/Toteboards/match";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {Grid, makeStyles} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {fetchFifaFixtures} from "../../api/fixtureApi";
import {fetchManagerFinishedMatches, fetchManagerPendingMatches, fetchMatches, saveAsMatch} from "../../api/matchApi";

export default () => {

    const [fifaFixtures, setFifaFixtures] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [addingIds, setAddingIds] = useState([]);
    const [managerPendingMatches, setManagerPendingMatches] = useState([]);
    const [managerFinishedMatches, setManagerFinishedMatches] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const dateToString = date => date.toISOString().split('T')[0];

    const loadFifaFixtures = (date) => {
        setIsLoading(true);
        fetchFifaFixtures(dateToString(date))
            .then(response => {
                setFifaFixtures(response.data.data)
            }).catch(err => {
            console.log("Error:", err)
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const loadTotalisatorMatches = () => {

        fetchManagerPendingMatches()
            .then(response => {
                setManagerPendingMatches(response.data)
            }).catch(err => {
            console.log("Klaida:", err);
        });

        fetchManagerFinishedMatches()
            .then(response => {
                setManagerFinishedMatches(response.data)
            }).catch(err => {
            console.log("Klaida:", err);
        });
    }

    useEffect(() => {
        fetchManagerPendingMatches()
            .then(response => {
                setManagerPendingMatches(response.data)
                fetchManagerFinishedMatches()
                    .then(response => {
                        setManagerFinishedMatches(response.data)
                        loadFifaFixtures(selectedDate);
                    }).catch(err => {
                    console.log("Klaida:", err);
                });
            }).catch(err => {
            console.log("Klaida:", err);
        });
    }, []);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        loadFifaFixtures(date);
    };

    const handleFifaFixtureSelect = (fixture) => {
        console.log("attempting to save fixture as match", fixture)
        setAddingIds([...addingIds, fixture.id]);
        saveAsMatch(fixture).then(() => {
            loadTotalisatorMatches()
        });
        //TODO vėluoja: .finally(() => setAddingIds([]))
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
                        // className="date-picker"
                        className={classes.root}
                    />
                </Grid>
            </MuiPickersUtilsProvider>

        )
    }

    const createFifaToteboard = (match) => {
        const addedIds = managerPendingMatches.map(tm => tm.id);
        if (addedIds.includes(match.id) || addingIds.includes(match.id)) {
            return <Toteboard key={match.id} match={match} variant="fifa-added"/>
        }
        switch (match.statusName) {
            case "Notstarted":
                return <Toteboard key={match.id} match={match} variant="fifa-listed"
                                  handleClick={() => handleFifaFixtureSelect(match)}/>;
            case "Finished":
                return <Toteboard key={match.id} match={match} variant="fifa-finished"/>
            default :
                return <Toteboard key={match.id} match={match} variant="fifa-invalid"/>
        }
    }

    const createManagerPendingToteboard = (match) => {
        console.log("ADDED MATCH TO PENDING: ", match)
        return <Toteboard key={"mp" + match.entity_id} match={match} variant="manager-pending"/>
    }

    const createManagerFinishedToteboard = (match) => {
        console.log("ADDED MATCH TO FINISHED: ", match)
        return <Toteboard key={"mf" + match.entity_id} match={match} variant="manager-finished"/>
    }

    return (
        <main>
            <section className="feed feed--fifa">
                <h2 className="feed__title">FIND & ADD MATCHES</h2>
                <article className="feed__description">
                    <p>
                        You can add new matches to your totalisator here. Select a date to
                        get official Fifa fixtures for. Choose and add the desired ones to
                        your managed totalisator. Once the match is added, players can
                        immediately start registering their predictions.
                    </p>
                    <p>Select date:</p>
                    {createDatePicker()}
                    <p>Choose fixtures:</p>
                    {isLoading && <p>LOADING...</p>}
                </article>
                {fifaFixtures
                    ? fifaFixtures.map((m) => createFifaToteboard(m))
                    : <p className="feed__description">No fixtures found. Try another date.</p>}
            </section>
            <section className="feed feed--added">
                <h2 className="feed__title">MANAGE REGISTERED MATCHES</h2>
                <article className="feed__description">
                    <p>
                        The newly added, not started matches can be viewed here. This is the
                        list that players see on top of their page if they have not yet
                        registered their predictions. You can remove any match by clicking
                        “X” on the top corner of corresponding tote board.
                    </p>
                    <p>
                        Please note that by removing the match at any stage, also deletes
                        its registered predictions and subtracts earned points.
                    </p>
                </article>
                {managerPendingMatches
                    ? managerPendingMatches.map((m) => createManagerPendingToteboard(m))
                    :
                    <p className="feed__description">Currently there are no matches pending for a game. Try adding some
                        in the section above.</p>}
            </section>
            <section className="feed feed--finished">
                <h2 className="feed__title">HISTORY OF FINISHED MATCHES</h2>
                <article className="feed__description">
                    <p>
                        This is a list of added matches that have already finished. These
                        matches contain predictions of all participants, and their earned
                        points. You can still delete any of these matches, in which case the
                        corresponding earned points get subtracted from total score.
                    </p>
                </article>
                {managerFinishedMatches
                    ? managerFinishedMatches.map((m) => createManagerFinishedToteboard(m))
                    :
                    <p className="feed__description">Currently there are no matches pending for a game. Try adding some
                        in the section above.</p>}
            </section>
        </main>
    )
}
