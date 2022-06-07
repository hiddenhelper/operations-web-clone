import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from 'constants/style';
import { toREM } from 'utils';

export const useStepStyles = makeStyles(theme =>
  createStyles({
    step: {
      height: 12,
      display: 'flex',

      '& .MuiTouchRipple-root': {
        display: 'none',
      },
      '& > span': {
        width: '100%',
      },

      '& .MuiStepLabel-labelContainer': {
        overflow: 'hidden',
      },
    },
    label: {
      fontSize: 10,
      width: '100%',
      overflow: 'hidden',
    },
    typography: {
      fontSize: `${toREM(13)}`,
      lineHeight: '13px',
      display: 'flex',
      justifyContent: 'space-between',
      fontWeight: 600,
      color: STYLE.COLOR.UNCOMPLETED,
      position: 'relative',
      top: '1px',
      textAlign: 'left',

      '& > span:first-child': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
    completed: {
      color: STYLE.COLOR.ACCENT_TERTIARY,
    },
    active: {
      color: STYLE.COLOR.ACCENT_TERTIARY,
      fontWeight: 600,
    },
    labelContainer: {
      lineHeight: 10,
    },
    iconContainer: {
      paddingRight: '14px',
      paddingTop: '2px',
    },
    processOverviewTitle: {
      height: `${toREM(28)}`,
      fontSize: `${toREM(18)}`,
      fontWeight: 600,
      color: 'rgba(0,0,0,0.7)',
      lineHeight: `${toREM(28)}`,
      marginBottom: '12px',
    },
    processOverviewContainer: {
      paddingTop: `${toREM(80)}`,
    },
    stepperContainer: {
      padding: 12,
    },
    stepButton: {
      margin: 0,
      padding: 0,
      '& .MuiStepLabel-root': {
        padding: '4px',
        position: 'relative',
        right: '4px',
      },
    },
  })
);

export const stepperConnectorStyles = {
  root: {
    padding: '1px 0px 0px 0px',
    position: 'relative' as 'relative',
    top: 6,
    marginLeft: 0,
    left: 5.4,
    paddingLeft: 1.2,
  },
  line: {
    borderColor: STYLE.COLOR.UNCOMPLETED,
    borderTopWidth: 3,
    borderRadius: 1,
  },
};
