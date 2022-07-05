import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';
import { toREM } from '../../../../utils/generalUtils';

export const useStylesModalCards = makeStyles(theme =>
  createStyles({
    modalCards: {
      marginTop: 27,
      marginBottom: 20,
      justifyContent: 'center',
      paddingRight: 9,
      paddingLeft: 11,
      paddingTop: 0,
    },
    cardItemModal: {
      height: 170,
    },
    selectedCards: {
      margin: '47px 0px',
      justifyContent: 'center',
    },
    adminCards: {
      margin: '0px 0px',
      justifyContent: 'center',
    },
    note: {
      // marginTop: 42,
      width: '80%',
      margin: 'auto',
    },
    replaceModal: {
      width: 480,
      paddingBottom: 18,
    },
    deleteModalConfirmContent: {
      marginLeft: 0,
    },
    deleteModalText: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      color: STYLE.COLOR.SEPTENARY,
      marginBottom: `${toREM(42)}`,
    },
    replaceModalButton: {
      minWidth: 180,
    },
    replaceModalText: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      color: STYLE.COLOR.SEPTENARY,
      marginBottom: `${toREM(15)}`,
    },
    deleteModalButton: {
      width: `${toREM(120)} !important`,
      marginLeft: 0,
    },
  })
);
