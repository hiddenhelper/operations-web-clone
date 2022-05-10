import { createStyles, makeStyles } from '@material-ui/core';
import { toREM } from 'utils';
import { STYLE } from 'constants/index';

const minWidth = 460;

export const useStyles = makeStyles(theme =>
  createStyles({
    backdrop: { zIndex: 1005 },
    wrapper: {
      display: 'flex',
      paddingLeft: 20,
      paddingRight: 20,
      alignItems: 'center',
      backgroundColor: STYLE.COLOR.WHITE,
      height: STYLE.SIDEBAR.WIDTH,
      marginLeft: (props: any) => (props.isActive ? -1 : 0),
      borderLeft: (props: any) => (props.isActive ? `1px solid ${STYLE.COLOR.LIGHT_GRAY3}` : 'none'),
      borderRight: (props: any) => (props.isActive ? `1px solid ${STYLE.COLOR.LIGHT_GRAY3}` : 'none'),
      borderTopLeftRadius: (props: any) => (props.isActive ? 5 : undefined),
      borderTopRightRadius: (props: any) => (props.isActive ? 5 : undefined),
      zIndex: 1010,
      '@media (max-width:811px)': {
        display: 'none',
      },
    },
    filterChip: {
      borderRadius: 4,
      padding: '8px 14px',
      backgroundColor: STYLE.COLOR.UNCOMPLETED,
      height: 28,
      lineHeight: 'normal',
      '&.MuiChip-colorPrimary': {
        backgroundColor: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
      },
      '& .MuiChip-label': {
        padding: 0,
        fontSize: toREM(14),
        fontWeight: 600,
        color: STYLE.COLOR.WHITE,
      },
    },
    searchModalContainer: {
      width: 'calc(40% + 42px)',
      minWidth: minWidth + 42,
      maxWidth: 600,
      maxHeight: '40vh',
      paddingTop: 10,
      borderTop: 'none',
      border: `1px solid ${STYLE.COLOR.LIGHT_GRAY3}`,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      boxShadow: '0 2px 6px 0 rgba(0,0,0,0.03)',
      backgroundColor: STYLE.COLOR.WHITE,
      position: 'relative',
      overflowY: 'auto',
      margin: 'auto',
    },
    filterWrapper: {
      padding: '0 20px 20px 20px',
    },
    filterTitle: {
      '&.MuiTypography-root': {
        fontSize: toREM(15),
        color: STYLE.COLOR.UNCOMPLETED,
        marginBottom: 10,
      },
    },
    pills: {
      display: 'flex',
      '& .MuiChip-root': {
        marginRight: 20,
        '&:last-child': {
          marginRight: 0,
        },
      },
    },
    loadingIndicatorWrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      paddingBottom: 30,
    },
    searchResultsInfo: {
      paddingLeft: 20,
      paddingRight: 20,
      '&.MuiTypography-root': {
        fontSize: toREM(15),
        color: STYLE.COLOR.UNCOMPLETED,
      },
    },
    emptyResultInfo: {
      padding: '12px 20px 14px',
      '&.MuiTypography-root': {
        fontSize: toREM(15),
        fontWeight: 600,
        color: STYLE.COLOR.SECONDARY_DARKER,
      },
    },
    searchResults: { marginTop: 16, height: '100%' },
    searchResult: {
      height: 70,
      padding: '12px 20px',
      display: 'flex',
      alignItems: 'center',
      borderBottom: `1px solid ${STYLE.COLOR.LIGHT_GRAY3}`,
      '&:last-child': { borderBottom: 'none' },
      '&:hover': {
        backgroundColor: STYLE.COLOR.QUINARY_LIGHTER,
        textDecoration: 'none',
      },
      '& .MuiChip-root': { marginLeft: 'auto' },
    },
    searchResultName: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      overflow: 'hidden',
      marginRight: 20,
      '& .MuiTypography-root': {
        fontSize: toREM(15),
        lineHeight: '15px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      '& .MuiTypography-root:nth-child(1)': {
        fontWeight: 600,
        color: STYLE.COLOR.SECONDARY_LIGHTER,
      },
      '& .MuiTypography-root:nth-child(2)': {
        color: STYLE.COLOR.UNCOMPLETED,
      },
    },
    error: { color: `${STYLE.COLOR.ERROR} !important` },
    searchMoreLoadingWrapper: { marginTop: 20 },
    noMoreItemsLabel: {
      '&.MuiTypography-root': {
        textAlign: 'center',
        padding: '10px 20px',
        fontSize: toREM(15),
        color: STYLE.COLOR.SECONDARY_LIGHTER,
      },
    },
  })
);

export const inputStyles = makeStyles(theme =>
  createStyles({
    input: {
      height: 40,
      '&.MuiTextField-root': {
        height: 40,
        width: '40%',
        minWidth,
        maxWidth: 600,
        fontSize: toREM(16),

        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: `${STYLE.COLOR.FOCUSED_PRIMARY}`,
          borderWidth: '1.5px',
        },
        '& .MuiOutlinedInput-root.Mui-focused': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: `${STYLE.COLOR.FOCUSED_PRIMARY}`,
            borderWidth: '1.5px',
          },
        },

        '& .MuiOutlinedInput-adornedStart': {
          padding: '0 8px',
        },

        '& .MuiInputAdornment-root': {
          color: STYLE.COLOR.UNCOMPLETED,
        },

        '& .MuiInputBase-root': {
          cursor: (props: any) => (!props.isActive ? 'pointer' : 'inherit'),
        },

        '& .MuiOutlinedInput-input': {
          padding: 0,
        },

        '& input': {
          cursor: (props: any) => (!props.isActive ? 'pointer' : 'inherit'),
        },

        '& input::placeholder': {
          fontSize: toREM(16),
          textTransform: 'none',
        },
      },
    },
    clearInputButton: {
      fontSize: toREM(16),
      fontWeight: 400,
      color: STYLE.COLOR.UNCOMPLETED,
      minWidth: 'auto',
      padding: '0 2px',
    },
    verticalDivider: { height: 20, width: 1, backgroundColor: STYLE.COLOR.INACTIVE, marginLeft: 10, marginRight: 5 },
    closeSearchButton: { padding: 4, color: STYLE.COLOR.UNCOMPLETED, '& .MuiSvgIcon-root': { fontSize: 18 } },
  })
);

export const workerStyles = makeStyles(theme =>
  createStyles({
    avatar: {
      '& .MuiBadge-badge': {
        top: '10px !important',
        right: '22px !important',
      },
    },
    name: { marginLeft: 5, maxWidth: '100%' },
  })
);
