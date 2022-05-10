import { makeStyles } from '@material-ui/core/styles';
import { toREM } from '../../../../../../utils/generalUtils';

export const useStyles = makeStyles({
  root: {
    width: 400,
    height: 400,
    position: 'relative',
    marginTop: toREM(40),
    boxShadow: '0px 2px 6px 0px rgb(0 0 0 / 3%)',
    border: '1px solid #E5E5E5',
    borderRadius: '5px',
  },
  body: {
    fontSize: 15,
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '30px',
    textAlign: 'center',
    margin: '15px 0px',
  },
  containerButtons: {
    position: 'absolute',
    bottom: 0,
    marginBottom: '30px',
    display: 'flex',
  },
  marginButtons: {
    margin: '0 15px',
  },
  logo: {
    width: 120,
    height: 120,
    marginTop: '15px',
  },
  containerLogo: {
    width: '100%',
    textAlign: 'center',
  },
  primaryColor: {
    background: '#1976D2',
    color: '#FFF',
    '&:focus': {
      outlineColor: 'unset',
    },
  },
  deleteColor: {
    background: '#E03535',
    color: '#FFF',
    border: '#E03535',
    '&:focus': {
      outlineColor: 'unset',
    },
  },
});

export const modalStyles = makeStyles({
  secretInput: {
    marginTop: '25px',
  },
  submitButton: {
    height: toREM(35),
    margin: '0 35px',
    padding: `${toREM(8)} 0px`,
    width: '120px',
  },
});

export const modalStylesDisconnect = makeStyles({
  root: {
    '& .MuiPaper-root': {
      width: 440,
      height: 200,
    },
    '& .MuiDialogTitle-root': {
      paddingBottom: 4,
    },
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    color: '#999',
  },
  actions: {
    padding: 20,
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export const videoStyles = makeStyles({
  containerVideo: {
    height: '100%',
    padding: `0 ${toREM(130)}`,
  },
});
