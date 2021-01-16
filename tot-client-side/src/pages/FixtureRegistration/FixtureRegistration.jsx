import 'date-fns';
import "./fixture-register.css";
import {useState, useEffect} from "react";
import {fetchFifaFixtures, saveFixtures} from "../../api/soccersApi";
import Fixture from "./FixturePanels/Fixture";
import React from "react";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {Grid} from "@material-ui/core";
import NoFixturesFound from "./FixturePanels/NoFixturesFound";
import NoFixturesSelected from "./FixturePanels/NoFixturesSelected";
import SelectedFixture from "./FixturePanels/SelectedFixture";
import FixtureRegisterForm from "./FixtureRegisterForm";


const FixtureRegistration = () => {

    const [fifaFixtures, setFifaFixtures] = useState([]);
    const [selectedFixtures, setSelectedFixtures] = useState([]);
    const [requestsLeft, setRequestsLeft] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());


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

    useEffect(() => {
        loadFifaFixtures(selectedDate);
    }, []);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        loadFifaFixtures(date);
    };

    const handleFixtureSelectClick = (fixture) => {
        if (!isFixtureSelected(fixture)) {
            setSelectedFixtures([...selectedFixtures, fixture]);
        }
    }

    const handleFixtureUnselectClick = (fixture) => {
        const otherFixtures = selectedFixtures.filter(f => f.id !== fixture.id);
        setSelectedFixtures(otherFixtures);
    }

    const isFixtureSelected = (fixture) => {
        const selectedIds = selectedFixtures.map(f => f.id);
        return selectedIds.includes(fixture.id);
    }


    const createFifaFixturePanel = (fixture) => {
        return (
            <Fixture
                key={fixture.id}
                id={fixture.id}
                country={fixture.league.country_name}
                league={fixture.league.name}
                date={fixture.time}
                homeTeam={fixture.homeTeam.name}
                awayTeam={fixture.awayTeam.name}
                isSelected={isFixtureSelected(fixture)}
                onClick={() => {
                    handleFixtureSelectClick(fixture)
                }}
            />
        )
    }

    const createFixtureSelectedPanel = (match) => {
        return (
            <SelectedFixture
                key={match.id}
                id={match.id}
                country={match.league.country_name}
                league={match.league.name}
                date={match.time}
                homeTeam={match.homeTeam.name}
                awayTeam={match.awayTeam.name}
                removeClicked={() => {
                    handleFixtureUnselectClick(match)
                }}
            />
        )
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log("selectedFixtures", selectedFixtures);
        saveFixtures(selectedFixtures)
            .then(response => {
                console.log("Saved selected fixtures and got a response: ", response);
            })
    }

    return (
        <div className="page-container">
            <div className="fixture-selection section">
                <h1>Browse Upcoming Fixtures</h1>
                <p>Requests Left: {requestsLeft}</p>
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
                {fifaFixtures.length > 0 && <p>Choose matches that you want to add:</p>}
                {fifaFixtures.length > 0
                    ? fifaFixtures.map(createFifaFixturePanel)
                    : <NoFixturesFound
                        selectedDate={dateToString(selectedDate)}
                    />}
            </div>
            <div className="selected-fixtures section">
                <h1>Selected Fixtures</h1>
                {selectedFixtures.length > 0
                    ? selectedFixtures.map(createFixtureSelectedPanel)
                    : <NoFixturesSelected/>}
                {selectedFixtures.length > 0 && <FixtureRegisterForm onSubmit={handleOnSubmit}/>}
            </div>
        </div>
    )
}

export default FixtureRegistration;