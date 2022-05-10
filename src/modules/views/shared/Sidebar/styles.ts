import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';
import { toREM } from '../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      zIndex: 3,
      position: 'fixed',
      backgroundColor: STYLE.COLOR.ACCENT_PRIMARY_DARKER,
      boxShadow: '0 2px 8px 0 rgba(0,0,0,0.1)',
      width: STYLE.SIDEBAR.WIDTH,

      '& .MuiTabs-indicator': {
        minHeight: 80,
        opacity: '1',
        border: `${toREM(2)} solid ${STYLE.COLOR.WHITE}`,
        left: 0,
      },

      '& .MuiTabs-flexContainer': {
        color: STYLE.COLOR.WHITE,
        height: '100%',
        '& a:hover': {
          color: 'inherit',
          outline: 'none',
          textDecoration: 'none',
        },
      },
      '& .MuiTab-textColorInherit.Mui-selected': {
        transition: 'background-color 0.3s linear',
        backgroundColor: 'rgba(245, 245, 245, 0.15)',
        width: `${toREM(80)}`,
      },
      '& .MuiTabs-root': {
        overflow: 'unset',
        height: '100%',
      },
      '& .MuiTabs-fixed': {
        height: '100%',
      },
      '& .MuiTab-root': {
        fontSize: '11px',
        minWidth: '100%',
        minHeight: `${toREM(57)}`,
        width: '7.273em',
        height: '7.273em',
        textTransform: 'capitalize',
        border: 'none',
        outline: 'none',
      },
      '& .MuiTab-textColorInherit': {
        opacity: '1',
      },
      '& .MuiTab-wrapper > *:first-child': {
        marginBottom: '14px',
        position: 'relative',
        top: '5px',
      },
      '& .MuiTabs-scroller': {
        overflowY: 'auto !important',
      },
      '& .MuiTabs-scroller::-webkit-scrollbar': {
        display: 'none',
      },
    },
    logo: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: `${toREM(80)}`,
      width: `${toREM(80)}`,
      backgroundColor: STYLE.COLOR.ACCENT_PRIMARY_DARKER,
      textAlign: 'center',
      marginBottom: '0',

      '& svg': {
        '& path': {
          fill: STYLE.COLOR.WHITE,
        },
      },
    },
  })
);
