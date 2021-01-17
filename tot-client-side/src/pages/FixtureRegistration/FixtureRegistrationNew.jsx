import Feed from "./Feed";
import {fetchFifaFixtures, fetchMatches, saveAsMatch, saveAsMatches} from "../../api/soccersApi";
import React, {useEffect, useState} from "react";
import FifaFixturePanel from "./Panels/FixturePanel";
import DateFnsUtils from "@date-io/date-fns";
import {Grid} from "@material-ui/core";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import './fixture-registration-new.css';
import MatchPanel from "./Panels/MatchPanel";


const FixtureRegistrationNew = () => {
    const [fifaFixtures, setFifaFixtures] = useState([]);
    const [requestsLeft, setRequestsLeft] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalisatorMatches, setTotalisatorMatches] = useState({});

    const dateToString = date => date.toISOString().split('T')[0];

    const loadFifaFixtures = (date) => {
        fetchFifaFixtures(dateToString(date))
            .then(response => {
                setFifaFixtures(response.data.data)
                setRequestsLeft(response.data.requestsLeft)
            }).catch(err => {
            console.log("Error:", err);
        });
    }

    const loadTotalisatorMatches = () => {
        fetchMatches()
            .then(response => {
                setTotalisatorMatches(response.data)
                console.log("MATCHES RESPONSE.DATA is: ", response.data)
            }).catch(err => {
            console.log("Error:", err);
        });
    }

    useEffect(() => {
        loadFifaFixtures(selectedDate);
        loadTotalisatorMatches();
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
        saveAsMatch(fixture)
            .then(response => {
                loadTotalisatorMatches();
                console.log("Saved selected fixture and got a response: ", response);
            })
    }

    const createFifaFixturePanel = (fixture) => {
        console.log("fixture", fixture);
        const addedIds = totalisatorMatches.map(m=>m.id);
        console.log("addedIds", addedIds);
        const isInTotalisator = addedIds.includes(fixture.id);
        console.log("isInTotalisator", isInTotalisator);
        return (
            <FifaFixturePanel
                key={fixture.id}
                fixture={fixture}
                handleClick={()=>handleFifaFixtureSelect(fixture)}
                isAdded={isInTotalisator}
            />
        )
    }

    const createTotalisatorMatchPanel = (match) => {
        return (
            <MatchPanel key={match.id} fixture={match}/>
        )
    }

    return (
        <div className="content-columns">
            <Feed
                title="BROWSE UPCOMING FIFA FIXTURES:"
                list={fifaFixtures}
                panel={createFifaFixturePanel}
                extras={createDatePicker}
            />
            <Feed
                title="TOTALISATOR MATCHES:"
                list={totalisatorMatches}
                panel={createTotalisatorMatchPanel}
            />
            <button onClick={()=>{console.log(totalisatorMatches)}}>SPAUSK</button>
        </div>
    )
}

export default FixtureRegistrationNew;