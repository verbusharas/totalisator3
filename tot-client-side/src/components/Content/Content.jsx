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
import TotalisatorNewPage from "../../pages/TotalisatorNewPage/TotalisatorNewPage";
import ManagerHomePage from "../../pages/ManagerHomePage/ManagerHomePage";
import UserWelcomePage from "../../pages/UserLoginPage/UserWelcomePage";
import ManagePlayersPage from "../../pages/ManagePlayersPage/ManagePlayersPage";
import ManagerRoute from "../ManagerRoute/ManagerRoute";
import DeniedAccessPage from "../../pages/DeniedAccessPage/DeniedAccessPage";

const Content = () => {
    return (
        <Switch>
            <Route exact path="/">
                <HomePage/>
            </Route>
            <PrivateRoute exact path="/totalisator" roles={['USER']}>
                <TotalisatorOverviewPage/>
            </PrivateRoute>
            <Route exact path="/about">
                <About/>
            </Route>
            <Route exact path="/user/register">
                <UserRegisterPage/>
            </Route>
            <Route exact path="/user/login">
                <UserLoginPage/>
            </Route>
            <Route exact path="/forbidden">
                <DeniedAccessPage/>
            </Route>

            <PrivateRoute exact path="/user/welcome" roles={['USER']}>
                <UserWelcomePage/>
            </PrivateRoute>
            <PrivateRoute exact path="/user/friends" roles={['USER']}>
                <UserFriendsPage/>
            </PrivateRoute>
            <PrivateRoute exact path="/totalisator/new" roles={['USER']}>
                <TotalisatorNewPage/>
            </PrivateRoute>

            <ManagerRoute exact path="/totalisator/manage/matches" roles={['USER']}>
                <ManageMatchesPage/>
            </ManagerRoute>
            <ManagerRoute exact path="/totalisator/manage/players" roles={['USER']}>
                <ManagePlayersPage/>
            </ManagerRoute>
            <ManagerRoute exact path="/totalisator/manage" roles={['USER']}>
                <ManagerHomePage/>
            </ManagerRoute>

        </Switch>
    )
}

export default Content;
