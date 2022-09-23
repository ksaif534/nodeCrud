import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '95%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1),
    },
    imageStyle: {
        width: '100%',
        margin: '15px 0 10px 18px',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));