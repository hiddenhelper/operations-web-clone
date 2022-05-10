import { createStyles, makeStyles } from '@material-ui/core/styles';
import { toREM } from '../../../../utils/generalUtils';
import { STYLE } from '../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    workerFormContainer: {
      marginTop: toREM(20),
    },
    veteranRadio: {
      marginTop: 8,
      marginLeft: 12,

      '& .MuiFormControlLabel-root:nth-child(2)': {
        position: 'relative',
        left: 32,
      },
    },
    workerFormWrapper: {
      '& .MuiGrid-root.MuiGrid-container': {
        justifyContent: 'space-between',

        '& .MuiGrid-grid-lg-6': {
          flexBasis: '49%',
          maxWidth: '49%',
        },
        '& .MuiGrid-grid-lg-4': {
          flexBasis: '32%',
          maxWidth: '32%',
        },
      },
    },
    workerTradesRadio: {
      marginLeft: 5,
    },
    errorInputWrapper: {
      position: 'relative',
      width: '100%',
    },
    errorPosition: {
      bottom: '2px',
    },
    divider: {
      width: '100%',
      margin: '7px 0 30px 0',
      backgroundColor: STYLE.COLOR.DIVIDER,
    },
    formGroupRoot: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gridTemplateRows: 'repeat(7, minmax(0, 1fr))',
      gridGap: '12px 15px',
      gridAutoRows: '2em',
      gridAutoFlow: 'column',

      '@media (max-width:1380px)': {
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridTemplateRows: 'repeat(auto-fit, minmax(0, 1fr))',
        gridAutoFlow: 'dense',
      },
      '@media (max-width:1200px)': {
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: 'repeat(auto-fit, minmax(0, 1fr))',
        gridAutoFlow: 'dense',
      },

      '& .MuiFormControlLabel-root': {
        width: `${toREM(262)}`,
        maxHeight: '32px',
        margin: 0,

        '& .MuiSvgIcon-root': {
          fontSize: '1.2rem',
          marginRight: '4px',
        },
        '& .MuiTypography-root': {
          fontSize: `${toREM(13)}`,
        },
      },
    },
    workerTrades: {
      position: 'relative',
      width: '100%',
      '& .MuiFormGroup-root': {
        gridTemplateColumns: '1fr 1fr 1fr',
        gridAutoFlow: 'initial',
        '@media (max-width:1200px)': {
          gridTemplateColumns: '1fr',
        },
      },
      '& .MuiFormGroup-root .MuiFormControlLabel-root:last-of-type': {
        gridColumn: 1,
      },
    },
    otherTradeWrapper: {
      position: 'relative',
      left: '11px',
      paddingBottom: '26px',
      '& .MuiFormControl-root': {
        width: '100%',
        '& .MuiInputBase-root': {
          width: '25.5%',
        },
      },
    },
    selectLabel: {
      fontSize: toREM(STYLE.FONT.SIZE.PARAGRAPH),
      maxHeight: '20px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    workerModal: {
      width: 522,
      maxWidth: '100%',

      '& .MuiDialogTitle-root': {
        paddingBottom: 0,
        paddingTop: 20,
        '& .MuiTypography-root': {
          fontWeight: 600,
        },
      },

      '& .MuiDialogContent-root': {
        paddingLeft: 20,
      },

      '& .MuiButton-containedPrimary': {
        padding: 0,
        width: `${toREM(120)}`,
        marginRight: 12,
      },

      '& .MuiButton-textPrimary': {
        fontWeight: 600,
        marginLeft: 18,
      },

      '& .MuiDialogActions-root': {
        paddingBottom: 19,
      },
    },

    existingWorkerModal: {
      width: 538,
      maxWidth: '100%',

      '& .MuiDialogTitle-root': {
        paddingBottom: 0,
        paddingTop: 20,
        '& .MuiTypography-root': {
          fontWeight: 600,
        },
      },

      '& .MuiDialogContent-root': {
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
        color: STYLE.COLOR.SEPTENARY,
      },

      '& .MuiButton-containedPrimary': {
        padding: 0,
        width: `${toREM(160)}`,
        marginRight: 12,
      },

      '& .MuiButton-textPrimary': {
        fontWeight: 600,
        marginLeft: 18,
      },

      '& .MuiDialogActions-root': {
        paddingBottom: 19,
      },
    },
    duplicatedWorkerModalContent: {
      minHeight: '140px',
    },
    workerModalSecondaryTextPosition: {
      position: 'relative',
      bottom: 2,
      paddingLeft: 5,
    },
    workerModalAvatarPosition: {
      position: 'relative',
      top: 14,
    },
    labelWrapper: {
      display: 'flex',
      flexDirection: 'row',
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      color: STYLE.COLOR.SECONDARY,
      wordBreak: 'break-all',

      '& .MuiTypography-root': {
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      },
    },
    workerAccent: {
      color: STYLE.COLOR.SECONDARY,
      fontWeight: 600,
    },
    companyAccent: {
      color: STYLE.COLOR.SEPTENARY,
    },
    listWrapper: {
      listStyleType: 'none',
      position: 'relative',
      marginTop: 14,
      paddingLeft: 20,
    },
    avatarWrapper: {
      display: 'flex',
    },
    emailAccent: {
      color: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
      fontWeight: 600,
      '&:hover': {
        color: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
        textDecoration: 'none',
      },
    },
    inviteMethodInput: {
      marginTop: '0 !important',
    },
  })
);
