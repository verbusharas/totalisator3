import {Route, Redirect, useLocation} from "react-router-dom";
import useUser from "../../hooks/useUser";
import _ from 'lodash'

export default ({ children, roles, ...props }) => {
    const user = useUser()
    const location = useLocation()

    const authorized = roles ? !!_.intersection(user?.roles, roles).length : !!user

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