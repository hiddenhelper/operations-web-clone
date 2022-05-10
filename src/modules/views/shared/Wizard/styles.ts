import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';
import { toREM } from '../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      height: '100%',
    },
    wizardContainer: {
      height: '100%',
      minWidth: '0',
      width: `calc(100% - ${toREM(321)})`,
    },
    wizardContainerFullWidth: {
      width: `100%`,
    },
    fixedStepper: {
      top: `${toREM(140)}`,
      bottom: 0,
      right: 0,
      zIndex: 999,
      position: 'fixed',
    },
    fixedContainer: {
      marginTop: `${toREM(140)}`,
    },
    separator: {
      margin: '20px 0',
    },
    contentContainer: {
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
    },
    formContainer: {
      padding: 30,
      paddingTop: `${toREM(30)}`,
      paddingBottom: `${toREM(20)}`,
      paddingLeft: `${toREM(40)}`,
      paddingRight: `${toREM(40)}`,
      maxWidth: '100%',
    },
    processWrapper: {
      maxWidth: `${toREM(321)}`,
      width: '100%',
      right: '0',
      backgroundColor: STYLE.COLOR.WHITE,
    },
    selectLabelGeneral: {
      position: 'relative',
      top: '14px',
    },
    selectLabelTrades: {},
    selectLabel: {
      fontSize: toREM(STYLE.FONT.SIZE.PARAGRAPH),
      maxHeight: '20px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    otherTradeWrapper: {
      position: 'relative',
      top: '7px',
      left: '11px',
      paddingBottom: '26px',
      '& .MuiFormControl-root': {
        width: '100%',
        '& .MuiInputBase-root': {
          width: '25.5%',
        },
      },
    },
    formContainerPadding: {
      '& .MuiPaper-root': {
        paddingBottom: '42px',
      },
    },
  })
);
