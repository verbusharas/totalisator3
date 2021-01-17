import {Switch, Route} from "react-router-dom";
import About from "../../pages/About/About";
import "./content.css";
import AddFixtures from "../../pages/AddFixtures/AddFixtures";

export default () => (
    <main className="content-container">
        <Switch>
            <Route exact path="/add-fixtures-new">
                <AddFixtures/>
            </Route>
            <Route exact path="/about">
                <About/>
            </Route>
        </Switch>
    </main>
)