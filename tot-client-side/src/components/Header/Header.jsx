import {NavLink} from "react-router-dom";
import {makeStyles} from "@material-ui/core";
import {AppBar, CssBaseline, Link, Toolbar, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },
}));


export default () => {
    const classes = useStyles();
    return (
        <header>
            <CssBaseline/>
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        TOTALISATOR
                    </Typography>
                    <nav>
                        <Link className={classes.link} component={NavLink} to="/add-fixtures">Add Fixtures</Link>
                        <Link className={classes.link} component={NavLink} to="/add-fixtures-new">Add Fixtures NEW</Link>
                        <Link className={classes.link} component={NavLink} to="/totalisator">Totalisator</Link>
                        <Link className={classes.link} component={NavLink} to="/about">About</Link>
                    </nav>

                    <Button href="#" color="primary" variant="outlined" className={classes.link}>
                        Login
                    </Button>

                </Toolbar>
            </AppBar>
        </header>
    )
}
