import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    root: {
        '& .MuiTextField-root': {
            margin: '10px',
        },
    },
    paper: {
        padding: '20px',
        paddingBottom: '30px',
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    fileInput: {
        width: '97%',
        margin: '10px 0 0 0',
    },
    buttonSubmit: {
        marginTop: '20px',
        marginBottom: '20px',
    },
}));