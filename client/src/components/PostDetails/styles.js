import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',
    maxWidth: '500px'
  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm xs')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
    justifyContent: 'center',
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
    justifyContent: 'center',
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
  },
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  commentsInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    marginRight: '30px',
    width: '50%',
    backgroundColor: '#fafafa',
  },
  cardComment: {
    height: 'auto',
    paddingLeft: '10px',
    borderRadius: '30px',
  },
  iconHover: {
    '&:hover': {
      background: "rgb(7, 177, 77, 0.42)",
      'border-radius': '10px',
      '-webkit-transition': 'all 500ms ease'
    }
  }
}));