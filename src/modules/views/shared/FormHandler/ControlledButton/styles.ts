import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../../constants';
import { toREM } from '../../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    saveButton: {
      width: `${toREM(163)}`,
      height: `${toREM(36)}`,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      lineHeight: `${toREM(17)}`,
      textTransform: 'none',
      boxShadow: 'none',
      fontWeight: 600,
      outline: 'none',
      marginLeft: '20px !important',

      '& .MuiButton-label': {
        position: 'relative',
        top: '1px',
      },
    },
    borderPrimaryButton: {
      border: `2px solid ${STYLE.COLOR.ACCENT_PRIMARY}`,
      '& .MuiButton-label': {
        color: STYLE.COLOR.ACCENT_PRIMARY,
      },
      '&:hover': { border: `2px solid ${STYLE.COLOR.ACCENT_PRIMARY}` },
    },
    createButton: {
      fontSize: `${toREM(15)}`,
      lineHeight: '17px',
      textTransform: 'none',
      boxShadow: 'none',
      fontWeight: 600,
      float: 'right',
      outline: 'none',

      '& .MuiButton-label': {
        position: 'relative',
        top: '1px',
      },
    },
    primaryButtonPadding: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      border: `2px solid ${STYLE.COLOR.ACCENT_PRIMARY}`,
      paddingLeft: `${toREM(13)}`,
      paddingRight: `${toREM(13)}`,
      '& .MuiButton-label': {
        color: STYLE.COLOR.ACCENT_PRIMARY,
      },
    },
    primaryButtonLarge: {
      width: `${toREM(160)}`,
      height: `${toREM(50)}`,
    },
    primaryButtonDisableHover: {
      '&:hover': {
        background: STYLE.COLOR.ACCENT_PRIMARY,
      },
    },
    primaryButtonExtraLarge: {
      width: `${toREM(200)}`,
      height: `${toREM(50)}`,
    },
    primaryButtonLarger: {
      width: `${toREM(217)}`,
      height: `${toREM(50)}`,
    },
    editButton: {
      '&:focus': {
        outline: 'none',
        border: 'none',
      },

      '& .MuiButton-label:focus': {
        outline: 'none',
        border: 'none',
      },
    },
    drawerCTA: {
      width: '100%',
      textTransform: 'inherit',
      maxWidth: `${toREM(130)}`,
      height: `${toREM(35)}`,
      minWidth: `${toREM(120)}`,
      paddingTop: '6px',
      display: 'flex',
      alignItems: 'center',
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      lineHeight: 0,

      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    warningButton: {
      border: `2px solid ${STYLE.COLOR.ERROR_ICON}`,
      '& .MuiButton-label': {
        color: STYLE.COLOR.ERROR_ICON,
      },
    },
    deleteButton: {
      position: 'relative',
      top: '24px',
      paddingLeft: 0,
      paddingRight: 0,

      '&:hover': {
        backgroundColor: 'transparent',
      },
      '& svg': {
        '& path': {
          fill: STYLE.COLOR.ERROR,
        },
      },
    },
    hideDeleteButton: {
      display: 'none',
    },
    showDeleteButton: {
      display: 'flex',
    },
    addUserButton: {
      display: 'flex',
      justifyContent: 'flex-start',
      padding: 0,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      textTransform: 'capitalize',
      width: `${toREM(128)}`,
      height: `${toREM(20)}`,
      position: 'relative',
      right: '2px',
      marginBottom: `${toREM(24)}`,
      fontWeight: 600,

      '&:hover': {
        backgroundColor: 'transparent',
      },

      '& .MuiButton-startIcon': {
        marginLeft: 0,
        marginRight: '10px',
      },

      '& svg': {
        '& path': {
          fill: STYLE.COLOR.SUCCESS,
        },
      },
    },
    noPadding: {
      padding: 0,
    },
    loadingPadding: {
      padding: 10,
    },
    noOutline: {
      outline: 'none',
    },
    nextButton: {
      height: `${toREM(36)}`,
      width: `${toREM(120)}`,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      lineHeight: '17px',
      textTransform: 'none',
      boxShadow: 'none',
      fontWeight: 600,
      outline: 'none',

      '& .MuiButton-label': {
        position: 'relative',
        top: '1px',
      },
    },
    discardButton: {
      height: '36px',
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      lineHeight: '17px',
      textTransform: 'none',
      boxShadow: 'none',
      fontWeight: 600,
      marginRight: '17px',
    },
    floatingAppBarButton: {
      height: `${toREM(56)}`,
    },
    closeButtonWidth: {
      width: `${toREM(120)}`,
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
    badgeProjectActiveBadgeDeactivated: {
      backgroundColor: STYLE.COLOR.SECONDARY_DARKER,
      '&:hover': {
        backgroundColor: STYLE.COLOR.SECONDARY_DARKER,
      },
    },
    badgeActive: {
      backgroundColor: STYLE.COLOR.SUCCESS,
      '&:hover': {
        backgroundColor: STYLE.COLOR.SUCCESS,
      },
    },
    badgeRevoked: {
      backgroundColor: STYLE.COLOR.ERROR_ICON,
      '&:hover': {
        backgroundColor: STYLE.COLOR.ERROR_ICON,
      },
    },
    disabled: {
      opacity: 0.5,
    },
  })
);
