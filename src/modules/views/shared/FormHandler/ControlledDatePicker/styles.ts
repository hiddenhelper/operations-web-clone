import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../../constants';
import { toREM } from '../../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    datePicker: {
      backgroundColor: STYLE.COLOR.INPUT_BACKGROUND,
      '& .MuiButtonBase-root': {
        outline: 'none',
        '& svg': {
          '& path': {
            fill: STYLE.COLOR.INACTIVE,
          },
        },
      },
      '& p': {
        color: `${STYLE.COLOR.ERROR} !important`,
        fontWeight: 600,
        fontSize: `${toREM(13)}`,
        lineHeight: '21px',
        position: 'absolute',
        top: '49px',
        width: '100%',
        marginLeft: 0,
        marginRight: 0,
      },
    },
    blackIcon: {
      '& .MuiButtonBase-root': {
        outline: 'none',
        '& svg': {
          '& path': {
            fill: `${STYLE.COLOR.BLACK} !important`,
          },
        },
      },
      '& .MuiIconButton-root': {
        padding: '8px',
      },
      '& .MuiOutlinedInput-input': {
        marginLeft: '0px',
        padding: 0,
      },
    },
    fullWidth: { width: '100%' },
    adornmentStart: {
      '& .MuiInputAdornment-positionStart': {
        marginRight: 0,
        marginLeft: '2px',
      },
      '& .MuiOutlinedInput-adornedStart': {
        paddingLeft: 0,
      },
    },
    adornmentEnd: {
      '& .MuiOutlinedInput-adornedEnd': {
        paddingRight: 0,
      },
    },
    leftInput: {
      '& .MuiInputBase-input': {
        paddingLeft: 0,
      },
    },
    baseInput: {
      '& .MuiInputBase-input': {
        height: '40px',
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
      },
    },
    timePicker: {
      backgroundColor: STYLE.COLOR.INPUT_BACKGROUND,
      '& .MuiButtonBase-root': {
        outline: 'none',
        '& svg': {
          '& path': {
            fill: STYLE.COLOR.INACTIVE,
          },
        },
      },
      '& p': {
        color: `${STYLE.COLOR.ERROR} !important`,
        fontWeight: 600,
        fontSize: `${toREM(13)}`,
        lineHeight: '21px',
        position: 'absolute',
        top: '49px',
        width: '100%',
        marginLeft: 0,
        marginRight: 0,
      },
    },
  })
);
