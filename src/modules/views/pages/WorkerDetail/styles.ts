import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';
import { toREM } from '../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    breadcrumb: {
      fontSize: `${toREM(15)}`,
      color: STYLE.COLOR.ACCENT_SECONDARY,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      '& a': {
        textDecoration: 'none',
      },
    },
    noDivider: {
      borderRight: 'transparent !important',
    },
    projectRowButtonWrapper: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      width: '100%',
      '& .MuiButtonBase-root': {
        padding: 1,
      },

      '& .MuiButtonBase-root:hover': {
        backgroundColor: 'initial',
      },
    },
    workerSummary: {
      display: 'flex',
      width: '100%',
      marginBottom: 20,
    },
    titleSkeleton: {
      minHeight: 64,
    },
    filterWrapper: {
      display: 'flex',
      position: 'relative',
      left: `${toREM(20)}`,
    },
    fileItemsWrapper: {
      paddingTop: `${toREM(10)}`,
      '& span': {
        fontSize: `${toREM(15)}`,
      },
    },
    fileItem: {
      position: 'relative',
      width: '100%',
      height: '52px',
      paddingTop: `${toREM(14)}`,
      paddingLeft: `${toREM(14)}`,
      paddingBottom: `${toREM(14)}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: STYLE.COLOR.LIGHT_GRAY3,
      borderRadius: '4px',
      overflow: 'hidden',
      marginBottom: `${toREM(20)}`,
      '&:last-child': {
        marginBottom: 0,
      },
    },
    fileItemText: {
      fontSize: `${toREM(17)}`,
      fontWeight: 600,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    fileName: {
      color: STYLE.COLOR.ACCENT_PRIMARY,
    },
    fileSize: {
      color: 'inherit',
      marginLeft: `${toREM(10)}`,
    },
    projectRowLastCell: {
      display: 'flex',
      width: '95%',
      justifyContent: 'flex-end',
    },
    projectRowIconsWrapper: {
      display: 'flex',
      width: '37%',
      justifyContent: 'space-between',
      '& .MuiButtonBase-root': {
        padding: 0,
      },
    },
    projectRowIcon: {
      '& path': {
        fill: STYLE.COLOR.UNCOMPLETED,
      },
    },
    projectRowLastIcon: {
      marginLeft: 24,
    },
    projectRowFontColor: {
      color: STYLE.COLOR.ACCENT_QUATERNARY,
    },
    activeRowIcon: {
      opacity: 1,
      cursor: 'pointer',
    },
    inactiveRowIcon: {
      opacity: 0.3,
    },
    statusChipMargin: {
      margin: '0 !important',
    },
    noBreakWord: {
      whiteSpace: 'initial',
    },
    spanEllipsis: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    reviewCardBody: {
      paddingTop: `${toREM(9)}`,
      '& > .cardBody-row': {
        paddingTop: `${toREM(20)}`,
        paddingBottom: `${toREM(20)}`,
        borderBottom: `1px solid ${STYLE.COLOR.DIVIDER}`,
        '&:first-child': {
          paddingTop: 0,
        },
        '&:last-child': {
          paddingBottom: 0,
          borderBottom: 0,
        },
        '& .cardBody-item': {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          '& span': {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
        },
        '& > .cardBody-item:nth-child(odd)': {
          '& .MuiGrid-container': {
            paddingRight: `${toREM(40)}`,
            borderRight: `1px solid ${STYLE.COLOR.DIVIDER}`,
          },
        },
        '& > .cardBody-item:nth-child(even)': {
          paddingLeft: `${toREM(40)}`,
        },
      },
    },
    noMargin: { margin: '0 !important' },
    inputPaddingRight: {
      paddingRight: '20px',
    },
    textAreaWrapper: {
      height: '100%',
      '& div': {
        height: 'inherit',
      },
    },
    textArea: {
      '& .MuiInputBase-multiline': {
        padding: 0,
        height: 'inherit',
        '& .MuiInputBase-input': {
          height: '100%',
          boxSizing: 'border-box',
          padding: '14px',
        },
      },
    },
    backgroundInput: {
      '& .MuiInputBase-root': {
        background: STYLE.COLOR.SECONDARY_WHITE,
        '& .MuiInputBase-input': {
          fontSize: `${toREM(17)}`,
        },
      },
    },
    assignModalMaxHeight: {
      '& .MuiPaper-root': {
        maxHeight: 628,
        maxWidth: '960px',
        minWidth: 'initial',
      },
    },
    errorPosition: {
      position: 'absolute',
    },
    secondaryDetailValue: {
      fontWeight: 400,
    },
  })
);
