import {Route, Redirect, useLocation} from "react-router-dom";
import useUser from "../../hooks/useUser";
import _ from 'lodash'
import useTotalisator from "../../hooks/useTotalisator";

const ManagerRoute = ({children, roles, ...props}) => {
    const user = useUser()
    const location = useLocation()
    const totalisator = useTotalisator()

    const isAuthorized = roles ? !!_.intersection(user?.roles, roles).length : !!user
    const isManager = user?.managedTotalisators.includes(totalisator.id);
    return (

        <Route {...props}>
            {
                user && isAuthorized && isManager ? children : user ? (
                        <Redirect
                            to={{
                                pathname: '/forbidden',
                                state: {
                                    from: location
                                }
                            }}
                        />
                    )
                    : (
                        <Redirect
                            to={{
                                pathname: '/user/login',
                                state: {
                                    from: location
                                }
                            }}
                        />
                    )
            }
        </Route>
    )
}

export default ManagerRoute;