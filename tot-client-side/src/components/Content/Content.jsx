import 'date-fns';
import "./content.css";
import {useState, useEffect} from "react";
import {fetchMatches} from "../../api/soccersApi";
import MatchInfo from "./MatchInfo";
import React from "react";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {Grid} from "@material-ui/core";
import NoFixturesFound from "./NoFixturesFound";


const Content = () => {

    const [matches, setMatches] = useState([]);
    const [selectedMatches, setSelectedMatches] = useState([]);
    const [requestsLeft, setRequestsLeft] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());


    const dateToString = date => date.toISOString().split('T')[0];

    const loadMatches = (date) => {
        fetchMatches(dateToString(date))
            .then(response => {
                setMatches(response.data.data)
                setRequestsLeft(response.data.requestsLeft)
            }).catch(err => {
            console.log("Error:", err);
        });
    }

    useEffect(() => {
        loadMatches(selectedDate);
    }, []);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        loadMatches(date);
    };

    const handleMatchClick = (match) => {
        if (!selectedMatches.includes(match.id)) {
            setSelectedMatches([...selectedMatches, match.id]);
        }
    }


    const createMatchPanel = (match) => {
        return (
            <MatchInfo
                key={match.id}
                id={match.id}
                country={match.league.country_name}
                league={match.league.name}
                date={match.time}
                homeTeam={match.homeTeam.name}
                awayTeam={match.awayTeam.name}
                isSelected={selectedMatches.includes(match.id)}
                onClick={() => {
                    handleMatchClick(match)
                }}
            />
        )
    }

    return (
        <div className="container">
            <h1>Browse Upcoming Fixtures</h1>
            <p>Requests Left: {requestsLeft}</p>
            {matches.filter(m=>selectedMatches.includes(m.id)).map(createMatchPanel)}
            <p>Selected matches: {selectedMatches}</p>
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
            {/*<NoFixturesFound handleNextDayClick={handleNextDayClick}/>*/}
            {/*<NoFixturesFound selectedDate={dateToString (selectedDate)} handleNextDayClick={handleNextDayClick}/>*/}
            {matches.length > 0 && <p>Choose matches that you want to add:</p>}
            {matches.length > 0
                ? matches.map(createMatchPanel)
                : <NoFixturesFound
                    selectedDate={dateToString(selectedDate)}
                />}
        </div>
    )
}

export default Content;