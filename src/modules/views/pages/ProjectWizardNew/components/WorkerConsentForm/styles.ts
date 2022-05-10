import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../../../constants';
import { toREM } from '../../../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    tableHeader: {
      '& .MuiTableCell-head': {
        fontSize: `${toREM(15)}`,
        fontWeight: 600,
        color: STYLE.COLOR.SECONDARY_DARKER,
        letterSpacing: 0,
      },
    },
    fieldTitleWrapper: {
      minWidth: 275,
      paddingLeft: 30,
    },
    reorderIcon: {
      color: STYLE.COLOR.UNCOMPLETED,
    },
    fieldTitle: {
      color: STYLE.COLOR.SECONDARY_DARKER,
      fontSize: `${toREM(15)}`,
      fontWeight: 500,
      marginLeft: 15,
    },
    fieldDescription: {
      color: STYLE.COLOR.SECONDARY_DARKER,
      fontSize: `${toREM(15)}`,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    legalInput: {
      '& .MuiInputBase-root': {
        padding: 0,
        height: '610px',
      },
      '& .MuiInputBase-input': {
        height: '570px !important',
        padding: '12px 16px 25px 16px',
        overflow: 'scroll !important',
        '&::placeholder': {
          textTransform: 'none',
        },
      },
    },
  })
);
