import React, {useState} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import {withStyles} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {excludeFakeMatches, includeFakeMatches} from "../../../store/slices/preferencesSlice";

const DemoSwitch = () => {

    const YellowSwitch = withStyles({
        switchBase: {
            color: "var(--white-blue)",
            '&$checked': {
                color: "var(--yellow)",
            },
            '&$checked + $track': {
                backgroundColor: "var(--yellow)",
            },
        },
        checked: {},
        track: {},
    })(Switch);

    const [state, setState] = useState({
        checkedA: false,
        checkedB: false,
    });

    const dispatch = useDispatch();

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        if (event.target.checked) {
            dispatch(includeFakeMatches())
        } else {dispatch(excludeFakeMatches())}
    };

    return (
        <FormGroup row>
           <YellowSwitch size="small" checked={state.checkedA} onChange={handleChange} name="checkedA" />
        </FormGroup>
    );
}

export default DemoSwitch;