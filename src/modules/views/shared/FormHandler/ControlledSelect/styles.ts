import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../../constants';
import { toREM } from '../../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    removeHover: {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: `${STYLE.COLOR.INPUT_HOVER_DISABLED} !important`,
        borderWidth: '2px',
      },
    },
    requiredMark: {
      color: '#FF6B6B',
    },
    formControl: {
      width: '100%',

      '& .MuiSelect-root': {
        position: 'relative',
        padding: '10px 14px',
        '& option': {
          color: `${STYLE.COLOR.BLACK} !important`,
        },
      },

      '& .MuiTypography-root': {
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      },

      '& .MuiOutlinedInput-root': {
        backgroundColor: STYLE.COLOR.INPUT_BACKGROUND,
      },

      '& .MuiOutlinedInput-root:hover': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: `${STYLE.COLOR.FOCUSED_PRIMARY}`,
          borderWidth: '2px',
        },
      },

      '& .MuiOutlinedInput-root.Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: `${STYLE.COLOR.FOCUSED_PRIMARY}`,
          borderWidth: '2px',
        },
      },

      '& .MuiSelect-select:focus': {
        backgroundColor: STYLE.COLOR.INPUT_BACKGROUND,
      },

      '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: '2px',
      },

      '& .MuiInputBase-root': {
        backgroundColor: STYLE.COLOR.INPUT_BACKGROUND,
      },
    },
    selectElement: {
      backgroundColor: STYLE.COLOR.INPUT_BACKGROUND,
      fontWeight: 600,
    },
    inactiveOption: {
      color: STYLE.COLOR.UNCOMPLETED,
      '& .MuiSelect-root': { fontWeight: 500 },
    },
    inlineSelect: {
      flexDirection: 'row',
      alignItems: 'center',

      '& h1': {
        width: 78,
        marginRight: 20,
      },
    },
    selectItem: {
      '&:hover': {
        backgroundColor: STYLE.COLOR.QUINARY_LIGHTER,
      },
      paddingTop: '10px',
      paddingBottom: '10px',

      '&:not(:first-child)': {
        borderTop: 'solid 1px #F5F5F5',
      },
    },
  })
);
