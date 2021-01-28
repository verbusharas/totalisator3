import {Switch, Route} from "react-router-dom";
import About from "../../pages/About/About";
import "./content.css";
import HomePage from "../../pages/HomePage/HomePage";
import UserRegisterPage from "../../pages/UserRegisterPage/UserRegisterPage";
import ManageMatchesPage from "../../pages/Manage/ManageMatchesPage";
import TotalisatorOverviewPage from "../../pages/TotalisatorOverviewPage/TotalisatorOverviewPage";
import UserLoginPage from "../../pages/UserLoginPage/UserLoginPage";
import UserFriendsPage from "../../pages/UserFriendsPage/UserFriendsPage";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export default () => (
            <Switch>
                <Route exact path="/">
                    <HomePage/>
                </Route>
                <PrivateRoute path="/totalisator" roles={['USER']}>
                    <TotalisatorOverviewPage/>
                </PrivateRoute>
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
                <PrivateRoute path="/user/friends" roles={['USER']}>
                    <UserFriendsPage/>
                </PrivateRoute>
            </Switch>
)