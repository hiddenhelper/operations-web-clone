import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../../constants/style';
import { toREM } from '../../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      backgroundColor: STYLE.COLOR.WHITE,
      flexWrap: 'nowrap',
    },
    fixedSidebar: {
      position: 'fixed',
      top: 0,
      width: '320px',
      right: 0,
      height: '150px',
      zIndex: 999,
      background: 'white',
    },
    rightSidebar: {
      maxWidth: `${toREM(320)}`,
      width: '100%',
      fontSize: STYLE.FONT.SIZE.PARAGRAPH_BIG,
      color: STYLE.COLOR.SECONDARY_DARKER,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    rightSidebarStatus: {
      width: '75%',
      fontWeight: 600,
      position: 'relative',
      bottom: '7px',
    },
    approveButton: {
      height: `${toREM(50)}`,
      width: `${toREM(240)}`,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      borderRadius: '3px',
      textTransform: 'none',
      fontWeight: 600,

      '& .MuiButton-label': {
        position: 'relative',
        top: '1px',
      },
    },
  })
);
