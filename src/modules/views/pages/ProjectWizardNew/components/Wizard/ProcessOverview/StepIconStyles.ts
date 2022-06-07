import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from 'constants/style';
import { toREM } from 'utils';

export const useStepIconStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: 14,
      height: 14,
    },
    completedAndActive: {
      boxShadow: '0px 0px 0px 3px rgba(247,202,24,.25)',
    },
    active: {
      boxShadow: '0px 0px 0px 3px rgba(247,202,24,.25)',
      backgroundColor: STYLE.COLOR.ACCENT_TERTIARY,
    },
    completed: {
      color: STYLE.COLOR.ACCENT_TERTIARY,
      backgroundColor: STYLE.COLOR.ACCENT_TERTIARY,
      border: `solid 1px  ${STYLE.COLOR.ACCENT_TERTIARY}`,
    },
    started: {
      color: 'rgba(0,0,0,0)',
      background: `linear-gradient(90deg, ${STYLE.COLOR.WHITE} 50%, ${STYLE.COLOR.UNCOMPLETED} 50%)`,
      border: `solid 1px ${STYLE.COLOR.ACCENT_TERTIARY}`,
    },
    uncompleted: {
      border: `solid 1px ${STYLE.COLOR.UNCOMPLETED}`,
    },
    startedAndActive: {
      border: `solid 1px ${STYLE.COLOR.ACCENT_TERTIARY}`,
      background: `linear-gradient(90deg, ${STYLE.COLOR.WHITE} 50%, ${STYLE.COLOR.ACCENT_TERTIARY} 50%)`,
    },
    circle: {
      width: 12,
      height: 12,
      borderRadius: '50%',
      margin: 'auto',
    },
    checkmark: {
      width: `${toREM(3)}`,
      height: `${toREM(7)}`,
      display: 'flex',
      transform: 'rotate(45deg)',
      borderRight: `${toREM(1.3)} solid ${STYLE.COLOR.WHITE}`,
      borderBottom: `${toREM(1.3)} solid ${STYLE.COLOR.WHITE}`,
      position: 'relative',
      bottom: `${toREM(12)}`,
      left: `${toREM(5)}`,
    },
  })
);
