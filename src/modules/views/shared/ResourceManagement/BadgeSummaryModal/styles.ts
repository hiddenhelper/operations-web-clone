import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../../constants';
import { toREM } from '../../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    modalWrapper: {
      padding: '0 24px',
      overflow: 'auto',
    },
    emptyBadgeHistory: {
      '& .MuiAvatar-root': {
        '& svg': {
          height: 37,
          width: 36,
          bottom: 0,
          '& g': {
            '& path': {
              fill: STYLE.COLOR.WHITE,
            },
          },
        },
      },
    },
    expirationDateContainer: {
      width: '54%',
      marginLeft: 20,
    },
    badgeButtonContainer: {
      height: 35,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      fontWeight: 600,
      padding: '0 10px !important',

      '& .MuiButton-label': {
        position: 'relative',
        top: 1,
      },

      '& .MuiButton-endIcon': {
        '& svg': {
          opacity: 1,
          '& g': {
            '& polygon': {
              fill: STYLE.COLOR.WHITE,
            },
          },
        },
      },
    },
    ProjectActiveBadgeDeactivated: {
      backgroundColor: STYLE.COLOR.SECONDARY_DARKER,
      '&:hover': {
        backgroundColor: STYLE.COLOR.SECONDARY_DARKER,
      },
    },
    Active: {
      backgroundColor: STYLE.COLOR.SUCCESS,
      '&:hover': {
        backgroundColor: STYLE.COLOR.SUCCESS,
      },
    },
    Revoked: {
      backgroundColor: STYLE.COLOR.ERROR_ICON,
      '&:hover': {
        backgroundColor: STYLE.COLOR.ERROR_ICON,
      },
    },
    modalContainer: {
      '& .MuiDialog-paper': {
        width: '1040px',
        height: '700px',
        maxWidth: 'none !important',
      },
      '& .frontView': {
        height: 415,
        position: 'relative',
        width: 262,
      },
      '& .backView': {
        height: 415,
        width: 262,
        position: 'relative',
      },
    },
    modalBadgeContainer: {
      display: 'flex',
      width: 563,
      justifyContent: 'space-between',
      padding: '0 10px',
      position: 'relative',

      '&::after': {
        position: 'absolute',
        content: '""',
        borderRight: `1px solid ${STYLE.COLOR.LIGHT_GRAY3}`,
        height: '100%',
        right: '-29px',
      },
    },
    badgeSection: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 21,

      '& h2': {
        fontSize: '17px',
        fontWeight: 600,
        color: STYLE.COLOR.SECONDARY_LIGHTER,
        fontFamily: STYLE.FONT.PRIMARY_FONT,
        marginBottom: 10,
      },
      '& .controlledRadioContainer': {
        marginTop: 0,
        '& legend': {
          margin: 0,
        },
      },
      '& .buttonMenuContainer': {
        justifyContent: 'flex-start',
        '& .buttonMenuWrapper': {
          left: 0,
        },
      },
    },
    titleMargin: {
      marginBottom: 10,
    },
    modalBadgeSkeleton: {
      height: 475,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      top: 10.5,
    },
    modalBadgeWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      width: 'auto',
      position: 'relative',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 32,
      marginBottom: 42,

      '& .frontView': {
        boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
      },
      '& .backView': {
        boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
      },
    },
    badgeForm: {
      width: '35.5%',
      display: 'flex',
      flexDirection: 'column',
    },
    modalTitleContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 68,
      paddingTop: 0,
      paddingBottom: 0,
    },
    modalButtonWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    modalStatusFilterPosition: {
      paddingTop: 14,
      width: '97%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    printButton: {
      width: 112,
    },
    disabled: {
      '& li': {
        color: STYLE.COLOR.SEPTENARY,
      },
      '& svg': {
        '& circle': {
          fill: STYLE.COLOR.INACTIVE,
          color: STYLE.COLOR.WHITE,
        },
      },
    },
  })
);
