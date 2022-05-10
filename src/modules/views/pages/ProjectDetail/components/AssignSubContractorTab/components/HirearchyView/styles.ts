import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    nodeContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    subLevelContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
      '& .nodeContainer': {
        paddingLeft: '5%',
      },
    },
    node: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: STYLE.COLOR.WHITE,
      padding: '12px 18px',
      boxSizing: 'border-box',
      height: '60px',
      border: '1px solid #E5E5E5',
      borderRadius: '5px',
      marginBottom: '10px',
      justifyContent: 'space-between',
    },
    nodeContent: {
      display: 'flex',
      alignItems: 'center',
      '& > div': {
        marginRight: '10px',
      },
      '& .MuiIconButton-root:focus': {
        outline: '0 !important',
      },
      maxWidth: '90%',
    },
    nodeStatus: {
      display: 'flex',
    },
    nodeTrades: {
      fontWeight: 500,
      color: '#444444',
      fontSize: '15px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '65%',
    },
    role: {
      marginLeft: '-20px',
    },
  })
);
