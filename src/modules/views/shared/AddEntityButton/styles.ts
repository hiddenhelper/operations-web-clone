import { createStyles, makeStyles } from '@material-ui/core/styles';
import { toREM } from '../../../../utils/generalUtils';
import { STYLE } from '../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    addEntityButton: {
      display: 'flex',
      justifyContent: 'flex-start',
      padding: 0,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      textTransform: 'capitalize',
      height: `${toREM(20)}`,
      position: 'relative',
      right: '2px',
      marginTop: `${toREM(41)}`,
      fontWeight: 600,
      lineHeight: '24px',

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
    disableButton: {
      opacity: '0.5',
      cursor: 'not-allowed !important',
      color: `${STYLE.COLOR.BLACK} !important`,
    },
    enableButton: {
      opacity: '1',
    },
  })
);
