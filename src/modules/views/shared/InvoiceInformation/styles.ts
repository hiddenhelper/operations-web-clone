import { createStyles, makeStyles } from '@material-ui/core/styles';
import { toREM } from '../../../../utils/generalUtils';
import { STYLE } from '../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    textColor: {
      color: STYLE.COLOR.SECONDARY_DARKER,
    },
    invoiceStatusChip: {
      marginLeft: '10px',
    },
    invoiceStatusWrapper: {
      position: 'relative',
      top: '2px',
    },
    invoiceTitleDate: {
      fontWeight: 600,
      fontSize: `${toREM(15)}`,
      position: 'relative',
      top: '2px',
    },
    infoWrapper: {
      fontSize: `${toREM(17)}`,
    },
    infoAccent: {
      fontWeight: 600,
    },
    breakWord: {
      wordBreak: 'break-word',
    },
    infoDivider: {
      borderRight: `solid 1px ${STYLE.COLOR.LIGHT_GRAY3}`,
    },
    infoSecondItem: {
      paddingLeft: 20,
    },
    divider: {
      margin: '21px 0px',
      marginBottom: '30px !important',
      backgroundColor: STYLE.COLOR.DIVIDER,
    },
    subtitle: {
      fontSize: `${toREM(20)}`,
      fontWeight: 600,
    },
    serviceNameCell: {
      padding: '10px 0px 8px 16px',

      '& .MuiSelect-root': {
        width: '85%',
      },

      '& .MuiOutlinedInput-notchedOutline': {
        border: 0,
      },

      '& .MuiOutlinedInput-root': {
        backgroundColor: STYLE.COLOR.WHITE,
      },

      '& .MuiOutlinedInput-input': {
        backgroundColor: STYLE.COLOR.WHITE,
        padding: '10px 0px',
        fontWeight: 400,
      },

      '& .MuiSelect-root:focus': {
        backgroundColor: STYLE.COLOR.WHITE,
      },
    },
    secondarySubtitle: {
      fontSize: `${toREM(15)}`,
      fontWeight: 600,
      marginTop: 30,
      marginBottom: 10,
    },
  })
);
