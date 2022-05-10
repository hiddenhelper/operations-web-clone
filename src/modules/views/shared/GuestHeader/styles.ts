import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants/style';
import { toREM } from '../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      width: '100%',
      backgroundColor: '#fff',
      display: 'flex',
      position: 'fixed',
      boxShadow: '0 1px 0 0 rgba(0,0,0,0.1)',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px',
      zIndex: 4,
    },
    mainContent: {
      display: 'flex',
      alignItems: 'center',
      width: '50%',
      '& div': {
        padding: '10px',
      },
    },
    secondaryContent: {
      display: 'flex',
      alignItems: 'center',
      width: '45%',
      '& button': {
        padding: '15px 20px',
        with: '200px',
      },
      '& p': {
        padding: '0px 10px',
      },
    },
    guestScrollHided: {
      width: props => `calc(100vw - ${STYLE.SIDEBAR.WIDTH} - ${(props as any).scrollWidth}px) !important`,
    },
    guestLoginLogo: {
      width: '130px',
    },
    guestAvatarContainer: {
      marginLeft: 'auto',
      width: 'auto',
      height: `${toREM(50)}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginRight: '100px',
      '@media (max-width:601px)': {
        marginRight: '20px',
      },
    },
    guestAvatarElement: {
      height: '50px',
      width: '50px',
    },
    guestAvatarText: {
      letterSpacing: '-0.11px',
      lineHeight: '26px',
      fontWeight: 600,
      marginRight: `${toREM(11)}`,
    },
    guestDropdownIcon: {
      marginLeft: '10px',
      '& .MuiButton-root': {
        minWidth: 0,
      },
      '& .MuiButtonBase-root': {
        padding: 0,

        '& .MuiButton-label': {
          '& .MuiButton-startIcon': {
            margin: 0,
          },
        },
      },

      '& svg': {
        opacity: '0.3',
      },
    },
    guestPopoverWrapper: {
      zIndex: 2,
      '& .MuiPaper-root': {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '160px',
        alignItems: 'flex-start',
        paddingBottom: '6px',
        border: `1px solid ${STYLE.COLOR.LIGHT_GRAY3}`,
        borderRadius: '5px',
        boxShadow: '0 0 5px 0 #D8D8D8',

        '& .MuiList-root': {
          width: '100%',
        },

        '& .MuiList-padding': {
          padding: 0,
        },

        '& .MuiButtonBase-root': {
          height: `${toREM(50)}`,
          width: '100%',
          justifyContent: 'flex-start',
          textTransform: 'capitalize',
          fontSize: `${toREM(16)}`,
          marginTop: 6,
          marginBottom: 6,

          '&:last-child': {
            marginBottom: 0,
          },

          '& span': {
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          },
        },

        '& li': {
          height: `${toREM(41)}`,
          maxWidth: '148px',
          margin: '0 auto',
          borderRadius: '5px',
          paddingLeft: `${toREM(10)}`,

          '&:hover': {
            backgroundColor: 'rgba(0, 109, 247, 0.11)',
            color: STYLE.COLOR.ACCENT_PRIMARY,
          },
        },
      },
    },
  })
);
