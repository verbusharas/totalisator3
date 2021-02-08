import {Route, Redirect, useLocation} from "react-router-dom";
import useUser from "../../hooks/useUser";
import _ from 'lodash'
import useTotalisator from "../../hooks/useTotalisator";

const PrivateRoute = ({ children, roles, requiresTotalisator, ...props }) => {
    const user = useUser()
    const totalisator = useTotalisator();
    const location = useLocation()

    const authorized = roles ? !!_.intersection(user?.roles, roles).length : !!user

    if (requiresTotalisator && !totalisator.id) {
        return (
            <Redirect
                to={{
                    pathname: '/user/welcome',
                    state: {
                        from: location
                    }
                }}
            />
        )
    }

    return (
        <Route {...props}>
            {
                authorized ? children : (
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

export default PrivateRoute;