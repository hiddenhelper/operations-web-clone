import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../constants/';
import { toREM } from '../../../utils/generalUtils';

export const inputGlobalStyles = makeStyles(theme =>
  createStyles({
    searchInput: {
      minWidth: `${toREM(280)}`,
      fontSize: `${toREM(16)}`,
      '& .MuiInputBase-root': {
        backgroundColor: STYLE.COLOR.WHITE,
        height: `${toREM(40)}`,
        maxWidth: `${toREM(280)}`,
        borderRadius: `${toREM(20)}`,
        fontSize: `${toREM(16)}`,
        '& ::placeholder': {
          fontSize: `${toREM(16)}`,
          fontWeight: 400,
          textTransform: 'inherit',
          lineHeight: `${toREM(26)}`,
        },

        '& .MuiOutlinedInput-input': {
          paddingLeft: '6px',
        },
      },
      '& .MuiOutlinedInput-root.Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: `${STYLE.COLOR.FOCUSED_PRIMARY}`,
          borderWidth: '1.5px',
        },
      },
    },
    searchSvg: {
      '& svg': {
        transform: 'scale(1.179)',
        '& path': {
          fill: STYLE.COLOR.UNCOMPLETED,
        },
      },
    },
    minimalisticSelect: {
      backgroundColor: 'transparent !important',
      height: `${toREM(26.5)}`,
      '& .MuiInputBase-root': {
        fontWeight: 400,
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
        backgroundColor: 'transparent !important',
        '&::before': {
          display: 'none',
        },
        '&::after': {
          display: 'none',
        },
      },
      '& .MuiSvgIcon-root': {
        right: '36px',
        top: '2px',
      },
    },
    selectInput: {
      marginBottom: toREM(17),

      '& .Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: STYLE.COLOR.FOCUSED_PRIMARY,
        },
      },

      '& .MuiInputBase-input': {
        '&::placeholder': {
          fontWeight: 400,
        },
      },
    },
    middleInput: {
      width: '95.8% !important',
    },
    lastMiddleInput: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    inputPaddingBottom: {
      paddingBottom: `${toREM(23)}`,
    },
    inputPaddingRight: {
      paddingRight: `${toREM(20)}`,
    },
  })
);
