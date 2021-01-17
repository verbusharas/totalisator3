import Feed from "./Feed/Feed";
import {fetchFifaFixtures, fetchMatches, saveAsMatch, saveAsMatches} from "../../api/soccersApi";
import React, {useEffect, useState} from "react";
import FifaFixtureToteboard from "./Toteboards/FixtureToteboard";
import DateFnsUtils from "@date-io/date-fns";
import {Grid} from "@material-ui/core";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import './add-fixtures.css';
import MatchToteboard from "./Toteboards/MatchToteboard";


const AddFixtures = () => {
    const [fifaFixtures, setFifaFixtures] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalisatorMatches, setTotalisatorMatches] = useState({});

    const dateToString = date => date.toISOString().split('T')[0];

    const loadFifaFixtures = (date) => {
        fetchFifaFixtures(dateToString(date))
            .then(response => {
                setFifaFixtures(response.data.data)
            }).catch(err => {
            console.log("Error:", err);
        });
    }

    const loadTotalisatorMatches = () => {
        fetchMatches()
            .then(response => {
                setTotalisatorMatches(response.data)
            }).catch(err => {
            console.log("Klaida:", err);
        });
    }

    useEffect(() => {
        fetchMatches()
            .then(response => {
                setTotalisatorMatches(response.data);
                loadFifaFixtures(selectedDate);
            }).catch(err => {
            console.log("Klaida:", err);
        });
    }, []);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        loadFifaFixtures(date);
    };

    const createDatePicker = () => {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="center">
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Select match date:"
                        format="yyyy/MM/dd"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
        )
    }

    const handleFifaFixtureSelect = (fixture) => {
        saveAsMatch(fixture).then(() => loadTotalisatorMatches())
    }

    const createFifaFixtureToteboard = (fixture) => {
        const addedIds = totalisatorMatches.map(m => m.id);
        const isInTotalisator = addedIds.includes(fixture.id);
        return (
            <FifaFixtureToteboard
                key={fixture.id}
                fixture={fixture}
                handleClick={() => handleFifaFixtureSelect(fixture)}
                isAdded={isInTotalisator}
            />
        )
    }

    const createTotalisatorMatchToteboard = (match) =>
        <MatchToteboard key={match.id} fixture={match}/>

    return (
        <div className="content-columns">
            <Feed
                title="BROWSE UPCOMING FIFA FIXTURES:"
                list={fifaFixtures}
                panel={createFifaFixtureToteboard}
                extras={createDatePicker}
            />
            <Feed
                title="TOTALISATOR MATCHES:"
                list={totalisatorMatches}
                panel={createTotalisatorMatchToteboard}
            />
        </div>
    )
}

export default AddFixtures;