import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '10px 50px',
    },
    heading: {
        color: 'rgba(0,183,255, 1)',
        textDecoration: 'none',
    },
    image: {
        marginLeft: '15px',
        borderRadius: '100%',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '500px',
    },
    toolbarContainer: {
        display: 'flex',
        width: '600px',
    },
    profile: {
        display: 'flex',
        width: '400px',
        justifyContent: 'flex-end',
    },
    userName: {
        display: 'flex',
        alignItems: 'center',
        width: '200px'
    },
    brandContainer: {
        display: 'flex',
        alignItems: 'center',
        width: '25%',
    },
    logout: {
        display: 'flex',
    },
    avatar: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    avatarText: {
        display: 'flex',
        width: '200px',
        justifyContent: 'flex-end',
    }
}));