import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      border: '1px solid #E5E5E5',
      borderRadius: '5px',
      backgroundColor: '#FFFFFF',
      boxShadow: ' 0 2px 6px 0 rgba(0,0,0,0.03)',
      padding: '25px 40px 25px 24px',
      marginBottom: '30px',
    },
    iconContainer: {
      alignSelf: 'center',
      paddingRight: '24px',
      '& .MuiAvatar-root': {
        backgroundColor: '#E5E5E5',
      },
      '& .MuiSvgIcon-root': {
        fill: '#AAAAAA',
      },
    },
    linkContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      '& span': {
        color: '#1F86E8',
        fontSize: '15px',
        lineHeight: '20px',
        cursor: 'pointer',
      },
    },
    titleContainer: {
      display: 'flex',
      '& h2, h3': {
        fontSize: '20px',
        lineHeight: '26px',
        margin: 0,
        color: '#293D4B',
      },
      '& h2': {
        fontFamily: 'Hind',
        fontWeight: 'bold',
      },
      '& h3': {
        fontFamily: 'Hind',
        fontWeight: 'normal',
      },
    },
  })
);
