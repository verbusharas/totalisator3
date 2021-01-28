import {Switch, Route} from "react-router-dom";
import About from "../../pages/About/About";
import "./content.css";
import HomePage from "../../pages/HomePage/HomePage";
import UserRegisterPage from "../../pages/UserRegisterPage/UserRegisterPage";
import ManageMatchesPage from "../../pages/Manage/ManageMatchesPage";
import TotalisatorOverviewPage from "../../pages/TotalisatorOverviewPage/TotalisatorOverviewPage";
import UserLoginPage from "../../pages/UserLoginPage/UserLoginPage";
import UserFriendsPage from "../../pages/UserFriendsPage/UserFriendsPage";

export default () => (
            <Switch>
                <Route exact path="/">
                    <HomePage/>
                </Route>
                <Route exact path="/totalisator">
                    <TotalisatorOverviewPage/>
                </Route>
                <Route exact path="/totalisator/manage/matches">
                    <ManageMatchesPage/>
                </Route>
                <Route exact path="/about">
                    <About/>
                </Route>
                <Route exact path="/user/register">
                    <UserRegisterPage/>
                </Route>
                <Route exact path="/user/login">
                    <UserLoginPage/>
                </Route>
                <Route exact path="/user/friends">
                    <UserFriendsPage/>
                </Route>
            </Switch>
)