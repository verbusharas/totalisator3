import React, {useEffect, useState} from "react";
import {fetchFifaFixtures, fetchMatches} from "../../api/soccersApi";
import NoFixturesSelected from "../FixtureRegistration/FixturePanels/NoFixturesSelected";
import FixtureRegisterForm from "../FixtureRegistration/FixtureRegisterForm";
import SelectedFixture from "../FixtureRegistration/FixturePanels/SelectedFixture";

const Totalisator = () => {

    const [registeredFixtures, setRegisteredFixtures] = useState([]);


    const loadRegisteredFixtures = () => {
        fetchMatches()
            .then(response => {
                setRegisteredFixtures(response.data);
                console.log("FIXTURES FROM DATABASE: ", response.data);
            }).catch(err => {
            console.log("Error:", err);
        });
    }

    useEffect(() => {
        loadRegisteredFixtures();
    }, []);

    const createFixtureSelectedPanel = (fixture) => {
        return (
            <SelectedFixture
                key={fixture.id}
                id={fixture.id}
                country={fixture.league.countryName}
                league={fixture.league.name}
                date={fixture.date}
                homeTeam={fixture.homeTeam.name}
                awayTeam={fixture.awayTeam.name}
            />
        )
    }

    return (
        <div>
            <h1>Totalisator</h1>
            <div className="selected-fixtures section">
                <h1>Registered Fixtures</h1>
                {registeredFixtures.length > 0
                    ? registeredFixtures.map(createFixtureSelectedPanel)
                    : <NoFixturesSelected/>}
            </div>
        </div>
    )

}

export default Totalisator;