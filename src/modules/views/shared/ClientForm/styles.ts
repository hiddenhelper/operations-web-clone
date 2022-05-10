import { createStyles, makeStyles } from '@material-ui/core/styles';
import { toREM } from '../../../../utils/generalUtils';
import { STYLE } from '../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    taxpayerFormatDialog: {
      '& .MuiDialog-paper': {
        width: 500,
        height: 272,
        padding: 20,
        '& .MuiDialogTitle-root': {
          marginTop: 4,
          padding: 0,
        },
      },
    },
    subtitle: {
      '&.MuiTypography-root': {
        fontSize: toREM(15),
        fontWeight: 'normal',
        lineHeight: 'normal',
      },
      marginTop: 8,
      marginBottom: 8,
      color: STYLE.COLOR.SEPTENARY,
    },
    formatsWrapper: {
      '& .MuiTypography-root': {
        marginBottom: 2,
        fontSize: toREM(15),
        fontWeight: 'normal',
        lineHeight: 'normal',
      },
    },
    closeDialogButton: {
      marginTop: 'auto',
      alignSelf: 'flex-end',
      width: 120,
      height: 35,
      fontSize: toREM(15),
      fontWeight: 600,
    },
  })
);

export const tableRowStyles = () =>
  createStyles({
    root: {
      '& td': {
        minWidth: '160px',
        paddingBottom: '12px',
        color: STYLE.COLOR.SECONDARY,
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
        maxWidth: '200px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        fontWeight: 400,

        '& a': {
          color: STYLE.COLOR.ACCENT_PRIMARY,
          textDecoration: 'none',
        },
      },
      '&:nth-of-type(odd)': {
        backgroundColor: STYLE.COLOR.LOGIN_BACKGROUND,
      },
    },
  });
