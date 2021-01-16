import {Switch, Route} from "react-router-dom";
import FixtureRegistration from "../../pages/FixtureRegistration/FixtureRegistration";
import About from "../../pages/About/About";
import Totalisator from "../../pages/Totalisator/Totalisator"
import "./content.css";

export default () => (
    <main className="content-container">
        <Switch>
            <Route exact path="/totalisator">
                <Totalisator/>
            </Route>
            <Route exact path="/add-fixtures">
                <FixtureRegistration/>
            </Route>
            <Route exact path="/about">
                <About/>
            </Route>
        </Switch>
    </main>
)