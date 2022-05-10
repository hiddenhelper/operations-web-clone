import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../../constants';
import { toREM } from '../../../../../utils/generalUtils';

export const useStepStyles = makeStyles(theme =>
  createStyles({
    step: {
      height: 12,
      display: 'flex',

      '& .MuiTouchRipple-root': {
        display: 'none',
      },
    },
    label: {
      fontSize: 10,
    },
    typography: {
      fontSize: `${toREM(13)}`,
      lineHeight: '13px',
      display: 'flex',
      justifyContent: 'space-between',
      width: 202,
      fontWeight: 600,
      color: STYLE.COLOR.UNCOMPLETED,
      position: 'relative',
      top: '1px',
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
      padding: 33,
      minHeight: ' calc(100vh - 222px)',
      borderLeft: `1px solid ${STYLE.COLOR.LIGHT_GRAY3}`,
      height: '100%',
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
