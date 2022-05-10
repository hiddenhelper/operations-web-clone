import { makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../../constants';
import { toREM } from '../../../../../utils/generalUtils';

export const useStyles = makeStyles(() => ({
  controlledRadioLabel: {
    color: STYLE.COLOR.SECONDARY_DARKER,
    fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
    maxHeight: '20px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    lineHeight: '24px',
  },
  controlledRadioContainer: {
    marginTop: 15,
    '& .MuiFormControlLabel-label': {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_BIG)}`,
      color: STYLE.COLOR.SECONDARY_DARKER,
      lineHeight: '27px',
      '&.Mui-disabled': {
        opacity: 0.38,
        '> input[type="radio"] > span': {
          backgroundColor: 'red',
        },
      },
    },

    '& .MuiFormLabel-root.Mui-focused': {
      color: STYLE.COLOR.SECONDARY_DARKER,
    },
  },
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: '50%',
    width: 18,
    height: 18,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: STYLE.COLOR.WHITE,
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',

    '$root.Mui-focusVisible &': {
      outline: `2px auto ${STYLE.COLOR.ACCENT_PRIMARY}`,
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
  },
  activeIcon: {
    'input:disabled ~ &': {
      boxShadow: 'none',
    },
  },
  unactiveIcon: {
    'input:disabled ~ &': {
      background: '#fff',
    },
  },
  checkedIcon: {
    backgroundColor: STYLE.COLOR.ACCENT_PRIMARY,
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 18,
      height: 18,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: STYLE.COLOR.ACCENT_PRIMARY,
    },
  },
  disabledIcon: {
    background: 'rgba(206,217,224,.5)',
    boxShadow: 'none',
    'input:hover ~ &': {
      backgroundColor: 'rgba(206,217,224,.5)',
    },
  },
}));
