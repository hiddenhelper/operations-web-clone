import { createStyles, makeStyles } from '@material-ui/core/styles';
import { toREM } from '../../../../utils/generalUtils';
import { STYLE } from '../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    root: { width: '100vw' },
    container: {
      width: '100%',
    },
    dialogContainer: {
      '& .MuiPaper-root': {
        width: `${toREM(520)}`,
        minHeight: `${toREM(182)}`,
        padding: '20.4px 20px 19.61px 20px',
        boxShadow: '0 0 10px 0 rgba(0,0,0,0.5)',
      },
      '& .MuiDialogTitle-root': {
        padding: 0,
        paddingBottom: '10px',

        '& .MuiTypography-root': {
          fontSize: `${toREM(20)}`,
          fontWeight: 600,
          lineHeight: '32px',
        },
      },
      '& .MuiDialogContent-root': {
        padding: 0,
        '& .MuiDialogContentText-root': {
          fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
          lineHeight: '28px',
        },
      },
      '& .MuiDialogActions-root': {
        justifyContent: 'space-between',
        padding: 0,

        '& .MuiButtonBase-root': {
          fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
          textTransform: 'capitalize',
          outline: 'none',
          lineHeight: `${toREM(24)}`,
          fontWeight: 600,

          '& .MuiButton-label': {
            position: 'relative',
            top: '1px',
          },
        },

        '& .MuiButton-containedPrimary': {
          marginLeft: `${toREM(19)}`,
        },
      },
    },
    buttonsWrapper: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    cancelButtonWrapper: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    primaryButton: {
      marginLeft: `${toREM(19)}`,
    },
    closeButton: {
      width: `${toREM(80)}`,
      height: `${toREM(24)}`,

      '&:hover': {
        backgroundColor: 'initial',
      },
    },
    closeButtonFont: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      fontWeight: 600,

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
    title: {
      wordBreak: 'break-all',
      color: STYLE.COLOR.SECONDARY,
    },
    deleteModal: {
      '& .MuiPaper-root': {
        width: `${toREM(442)}`,
        minHeight: `${toREM(180)}`,
        padding: 20,
      },
    },
    modalContentText: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      lineHeight: '28px',
      color: STYLE.COLOR.SEPTENARY,
    },
    modalContentSecondaryText: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      color: STYLE.COLOR.SECONDARY_DARKER,
      letterSpacing: 0,
    },
    smallConfirmButton: {
      width: '158px !important',
    },
    dialogTitleSmallBottomMargin: {
      '& .MuiDialogTitle-root': {
        padding: 0,
        paddingBottom: 3,
      },
    },
    descriptionField: {
      padding: 0,
      '& .MuiInputBase-root': {
        padding: 0,
        height: 97,
      },
      '& .MuiInputBase-input': {
        height: '68px !important',
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_BIG)}`,
        fontWeight: 600,
        padding: '20.5px 14px',

        '&::placeholder': {
          textTransform: 'none',
        },
      },
    },
    inputField: {
      padding: 0,
      '& .MuiInputBase-root': {
        padding: 0,
        height: 'auto',
      },
    },
    backgroundTitle: {
      display: 'flex',
      alignItems: 'center',
      padding: 0,
      paddingLeft: 40,
      borderBottom: `1px solid ${STYLE.COLOR.LIGHT_GRAY3}`,

      '& .MuiTypography-root': {
        fontWeight: 600,
        position: 'relative',
        top: 2,
      },
    },

    backgroundModal: {
      height: `${toREM(69)}`,
      backgroundColor: STYLE.COLOR.WHITE,
    },

    buttonWrapper: {
      paddingLeft: '26px !important',
      paddingRight: '40px !important',
      borderTop: `1px solid ${STYLE.COLOR.LIGHT_GRAY3}`,
    },
    secondaryButton: {
      fontWeight: 600,
      fontSize: '15px',

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
    detailModal: {
      '& .MuiDialog-paper': {
        width: '100%',
        maxWidth: '580px',
      },
      '& .MuiDialogTitle-root': {
        paddingBottom: 0,
        textTransform: 'capitalize',
      },
      '& .MuiDialogContent-root': {
        paddingBottom: `${toREM(10)}`,
        '& .MuiTypography-root': {
          paddingBottom: `${toREM(10)}`,
          fontSize: `${toREM(15)}`,
        },
        '& .MuiTypography-subtitle1': {
          color: STYLE.COLOR.SEPTENARY,
          fontWeight: 400,
          linHeight: 1.5,
          paddingBottom: `${toREM(18)}`,
        },
      },
      '& .MuiDialogActions-root': {
        paddingTop: `${toREM(10)}`,
        justifyContent: 'flex-end',
      },
    },
    termsAndConditions: {
      '& .MuiPaper-root': {
        width: '65%',
        maxWidth: '100%',
        padding: '40px',
      },
    },
    modalSubtitle: {
      fontWeight: 600,
      paddingBottom: '0px !important',
    },
    fileListWrapper: {
      marginTop: 15,
    },
    modalDescription: {
      marginTop: 10,
    },
  })
);

export const accountConfirmModalStyles = makeStyles(theme =>
  createStyles({
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: `1px solid ${STYLE.COLOR.LIGHT_GRAY8}`,

      '& .title': {
        fontSize: `26px`,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: STYLE.COLOR.SECONDARY_DARKER,
      },
      '& .date': {
        fontSize: `16px`,
        color: STYLE.COLOR.LIGHT_GRAY8,
        textAlign: 'center',
      },
    },
    paragraph: {
      margin: '25px 0',

      '& .title': {
        fontSize: `${STYLE.FONT.SIZE.HEADING}px`,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: STYLE.COLOR.SECONDARY_DARKER,
        marginBottom: '10px',
      },

      '& pre': {
        fontSize: `${STYLE.FONT.SIZE.PARAGRAPH}px`,
        overflow: 'hidden',
        fontFamily: `${STYLE.FONT.PRIMARY_FONT}`,
        whiteSpace: 'break-spaces',
        color: STYLE.COLOR.SECONDARY_DARKER,
      },
    },
  })
);
