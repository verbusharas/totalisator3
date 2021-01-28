import useUser from "../../../hooks/useUser";
import Button from "../../Forms/Button";
import {useDispatch} from "react-redux";
import {clearJwt, clearUserData} from "../../../store/slices/userSlice";
import {FormControl, InputLabel, makeStyles, MenuItem, Select} from "@material-ui/core";
import {useState} from "react";
import {lightGreen, red} from "@material-ui/core/colors";
import Select2 from "react-select";

export default () => {

    const useStyles = makeStyles((theme) => ({

        root: {
            canvasColor: "blue",
            paddingTop: "10.5px",
            paddingBottom: "10.5px"
        },
        MuiInputBase: {
            backgroundColor: "lightcoral",
            padding: 0
        },


        MuiMenu: {
            background: "lightcoral",
        },

        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            background: "transparent",
            color: "green",
            fill: "yellow",
            icon: {
                fill: "yellow",
            },
            menu: {
                backgroundColor: "green",
                canvasColor: "green"
            }
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
            background: "orange",
        },
        myClass: {

            color: "var(--light-teal)",
            backgroundColor: "var(--black-brown)",
            "&:hover": {
                backgroundColor: "var(--black-teal)",
            },
            "&.Mui-selected": {
                backgroundColor: "var(--black-brown)",
            },
            "&.Mui-selected:hover": {
                backgroundColor: "var(--black-brown)",
            },
            "&.Mui-root": {
                backgroundColor: "var(--black-brown)",
            },
            "& option": {
                backgroundColor: "black"
            }


        },

        inputLabel: {
            color: "lightgray",
            "&.Mui-focused": {
                color: "orange"
            }

        },

        select: {
            '&:before': {
                borderColor: "var(--light-teal)",
            },
            '&:after': {
                borderColor: "yellow",
                color: "red"
            },

            //pasirinktas
            color: "var(--light-teal)",

            "& .MuiSvgIcon-root": {
                color: "yellow",
            },

            "& option": {
                backgroundColor: "black"
            },


        },

    }));

    const customStyles = {



        control: (base, state) => ({
            ...base,
            background: "var(--black-brown)",
            // match with the menu
            borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
            // Overwrittes the different states of border
            borderColor: state.isFocused ? "yellow" : "green",
            // Removes weird border around container
            boxShadow: state.isFocused ? null : null,
            "&:hover": {
                // Overwrittes the different states of border
                borderColor: state.isFocused ? "red" : "blue"
            },
            width:"250px",
            color:"red"
        }),


        menu: base => ({
            ...base,
            // override border radius to match the box
            borderRadius: 0,
            // kill the gap
            marginTop: 0,
            color:"red"
        }),
        menuList: base => ({
            ...base,
            // kill the white space on first and last option
            padding: 0,
            backgroundColor: "var(--black-teal)",
            "&:hover": {
                backgroundColor: "var(--black-teal)",
            },
        }),
        option: base => ({
            ...base,
            // kill the white space on first and last option
            backgroundColor: "var(--black-teal)",
            "&:hover": {
                backgroundColor: "var(--dark-teal)",
            },
        }),

    }


    const classes = useStyles();
    const [age, setAge] = useState(1);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const user = useUser();
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(clearJwt())
        dispatch(clearUserData())
    }

    const options = [
        {
            label: "option 1",
            value: 1
        },
        {
            label: "option 2",
            value: 2
        },
        {
            label: "option 3",
            value: 3
        },
        {
            label: "option 4",
            value: 4
        },
        {
            label: "option 5",
            value: 5
        }
    ];

    return (
        <div className="user-menu">
            <div className="user-menu__lang-select">
                <a className="user-menu__link">LT</a>
                <a className="user-menu__link">EN</a>
            </div>
            {
                user ?
                    <>
                        <span className="user-menu__text">{`${user.name}`}</span>
                        <a className="user-menu__link" onClick={logout}>Sign Out</a>
                    </>
                    : <a href="/user/login" className="user-menu__link">Sign In</a>
            }

            <FormControl className={classes.formControl}>
                <InputLabel className={classes.inputLabel}
                            id="demo-simple-select-label">Current:</InputLabel>
                <Select

                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    onChange={handleChange}
                    styles={customStyles}
                    className={classes.select}
                    classes={{
                        root: classes.root,
                        "MuiInputBase-input": classes.MuiInputBase
                    }}
                >
                    <MenuItem className={classes.myClass} value={1}>Swedbank Totalizatorius 2021</MenuItem>
                    <MenuItem className={classes.myClass} value={2}>12-United Totalizatorius 2021</MenuItem>
                    <MenuItem className={classes.myClass} value={3}>Zmnhf</MenuItem>
                </Select>
            </FormControl>
            <div>
                <Select2 styles={customStyles} options={options} />
            </div>
        </div>
    )
}