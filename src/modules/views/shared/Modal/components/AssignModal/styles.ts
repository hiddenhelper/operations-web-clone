import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../../../constants';
import { toREM } from '../../../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    titleContainer: {
      padding: '18.5px 24px',
    },
    filterStatusSpaced: {
      justifyContent: 'space-between',
    },
    filterAssignSpacing: {
      paddingTop: `${toREM(10)}`,
    },
    minModalHeight: {
      height: '550px',
    },
    assignSponsorTitle: {
      fontSize: '15px',
      marginBottom: '25px',
    },
    assignFilters: {
      display: 'flex',
      width: 'auto',
      alignItems: 'center',
      fontSize: `${toREM(15)}`,
    },
    assignFiltersCentered: {
      justifyContent: 'center',
    },
    filterElement: {
      display: 'flex',
      alignItems: 'center',
      marginRight: `${toREM(15)}`,
    },
    filterElementCentered: {
      justifyContent: 'center',
      marginTop: '10px',
      marginBottom: '15px',
    },
    filterTextColor: {
      color: STYLE.COLOR.SECONDARY_DARKER,
    },
    boldFilter: {
      fontWeight: 600,
      '& svg': {
        opacity: 1,
      },
    },
    saveButton: {
      height: `${toREM(36)}`,
      width: `${toREM(163)}`,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      lineHeight: '17px',
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
    assignButtonWidth: {
      width: `${toREM(136)}`,
    },
    assignButtonRightSpace: {
      marginRight: `${toREM(19)}`,
    },
    modalWrapper: {
      '& .MuiPaper-root': {
        marginLeft: '110px',
        maxWidth: '1220px',
        '@media (max-width:600px)': {
          marginLeft: '32px !important',
        },
      },
    },
    assignSubModalContentWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    modalInput: {
      width: '300px',
      '& .MuiPaper-root': {
        marginLeft: '0px !important',
      },
      '@media (max-width:600px)': {
        width: '200px',
      },
    },
    dialogPaper: {
      width: '100%',
      maxWidth: 1400,
      height: 692,
    },
    assignTableSpacing: {
      padding: '10px 40px',
      '& table': {
        position: 'relative',
        top: `${toREM(20)}`,

        '& .MuiTableCell-root': {
          paddingTop: `9.8px`,
          paddingBottom: `9.8px`,
        },
      },
    },
    buttonsContainer: {
      marginRight: 12,
      marginLeft: 16,
      fontSize: toREM(15),
      height: 70,
    },
    closeButton: {
      marginRight: 'auto',
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,

      '&:hover': {
        backgroundColor: 'initial',
      },

      '&:focus': {
        outline: 'none',
        border: 'none',
      },

      '& .MuiButton-label:focus': {
        outline: 'none',
        border: 'none',
      },
    },
    boldButton: {
      fontWeight: 600,
    },
    assignSkeletonWrapper: {
      minHeight: `${toREM(450)}`,
    },
    assignViewWrapper: {
      height: 'auto',
      minHeight: `${toREM(450)}`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    notFoundText: {
      fontSize: `${toREM(STYLE.FONT.SIZE.HEADING)}`,
      color: STYLE.COLOR.SECONDARY_DARKER,
    },
    assignPagination: {
      marginTop: `${toREM(37.5)}`,
    },
    assignPaginationLower: {
      marginTop: `${toREM(30)}`,
    },
    hideOverflow: {
      overflow: 'hidden',
      minHeight: 'auto',
    },
    locationModalFilter: {
      '& .MuiAutocomplete-popper': {
        position: 'absolute',
        top: '77px !important',
      },

      '& .MuiAutocomplete-root': {
        position: 'absolute',
      },

      '& .floatingFilterWrapper': {
        padding: 13,
      },
    },
    fillInviteMethodDescription: {
      marginTop: '40px',
      display: 'inline-block',
      '& p': {
        fontSize: '15px',
      },
    },
    workerName: {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: '32px',
    },
    workerCompanyName: {
      fontSize: '15px',
      lineHeight: '24px',
    },
    inviteMethodGridContainer: {
      marginTop: '3px',
    },
    inviteMethodContainer: {
      marginTop: 0,
    },
    migratedWorkerContainer: {
      marginTop: '30px',
    },
    errorPosition: {
      '&.email': {
        position: 'relative',
      },
    },
    userSearchInput: {
      minWidth: `${toREM(245)}`,
      fontSize: `${toREM(16)}`,
      '& .MuiInputBase-root': {
        backgroundColor: STYLE.COLOR.WHITE,
        height: `${toREM(40)}`,
        maxWidth: `${toREM(280)}`,
        borderRadius: `${toREM(20)}`,
        fontSize: `${toREM(16)}`,
        '& ::placeholder': {
          fontSize: `${toREM(16)}`,
          fontWeight: 400,
          textTransform: 'inherit',
          lineHeight: `${toREM(26)}`,
        },

        '& .MuiOutlinedInput-input': {
          paddingLeft: '6px',
        },
      },
      '& .MuiOutlinedInput-root.Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: `${STYLE.COLOR.FOCUSED_PRIMARY}`,
          borderWidth: '1.5px',
        },
      },
    },
    usersSelected: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '15px',
      marginBottom: '5px',
    },
    inputWrapper: {
      display: 'flex',
      justifyContent: 'center',
    },
  })
);
