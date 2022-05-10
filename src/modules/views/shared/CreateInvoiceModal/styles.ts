import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    modalContentWrapper: {
      backgroundColor: STYLE.COLOR.QUINARY_LIGHTER,
      minHeight: 400,
    },
    saveAndConfirmBtn: {
      width: 175,
    },
    modalInnerContainer: {
      padding: '30px 35px 33px 35px',
      margin: '5px 0',
    },
  })
);
