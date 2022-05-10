import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    pagination: {
      marginTop: 40,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& li button': {
        lineHeight: '35px',
        outline: 'none',
      },
      '& .Mui-disabled svg': {
        fill: STYLE.COLOR.LIGHT_GRAY2,
      },
      '& .MuiPaginationItem-page': {
        fontFamily: STYLE.FONT.PRIMARY_FONT,
        color: STYLE.COLOR.SECONDARY_DARKER,
        fontSize: '15px',
      },
      '& .Mui-selected': {
        backgroundColor: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
        color: STYLE.COLOR.WHITE,
        '&:hover': {
          backgroundColor: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
          color: STYLE.COLOR.WHITE,
        },
      },
      '& .MuiPaginationItem-icon': {
        fill: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
      },
      '& button:hover': {
        background: 'none',
      },
      '& .MuiPaginationItem-page.Mui-disabled': {
        color: STYLE.COLOR.LIGHT_GRAY2,
      },
    },
  })
);
