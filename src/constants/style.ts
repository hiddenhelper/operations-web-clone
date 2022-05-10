import 'typeface-hind';
import { createMuiTheme } from '@material-ui/core/styles';
import { toREM } from '../utils/generalUtils';

export const STYLE = {
  FONT: {
    PRIMARY_FONT: 'Hind',
    SIZE: {
      HEADING_BIG: 36,
      HEADING_MEDIUM: 30,
      HEADING: 24,
      HEADING_1: 18,
      HEADING_2: 20,
      PARAGRAPH_BIG: 17,
      PARAGRAPH: 15,
      PARAGRAPH_SMALL: 13,
    },
  },
  COLOR: {
    PRIMARY: '#38A66C',
    PRIMARY_LIGHTER: '#37A66C',
    SECONDARY: '#414141',
    SECONDARY_LIGHTER: '#4C4C4C',
    SECONDARY_DARKER: '#444444',
    TERTIARY: '#E7ECFA',
    QUATERNARY: '#9FA7BC',
    QUINARY: '#F6F6F6',
    QUINARY_LIGHTER: '#F5F5F5',
    SENARY: '#414141',
    SEPTENARY: '#999999',
    OCTONARY: '#F9F9F9',
    BLACK: '#000000',
    WHITE: '#FFF',
    SECONDARY_WHITE: '#FCFCFC',
    LIGHT_GRAY: '#EEEEEE',
    LIGHT_GRAY2: '#C8C8C8',
    LIGHT_GRAY3: '#E5E5E5',
    LIGHT_GRAY4: '#8F8F8F',
    LIGHT_GRAY5: '#777777',
    LIGHT_GRAY6: '#8B8B8B',
    LIGHT_GRAY7: '#D8D8D8',
    LIGHT_GRAY8: '#878787',
    LOGIN_BACKGROUND: '#F3F3F3',
    UNCOMPLETED: '#AAAAAA',
    GREEN_LIGHT: '#00AA66',
    LOGO_PRIMARY: '#000B48',
    ACCENT_PRIMARY: '#006DF7',
    ACCENT_PRIMARY_DARKER: '#00346B',
    ACCENT_PRIMARY_LIGHTER: '#1F86E8',
    ACCENT_PRIMARY_LIGHTER2: '#59A0FA',
    ACCENT_PRIMARY_LIGHTER3: '#B2D3FC',
    ACCENT_PRIMARY_BACKGROUND: 'rgba(31, 134, 232, 0.21)',
    ACCENT_SECONDARY: '#AEAEAE',
    ACCENT_TERTIARY: '#E9A61F',
    ACCENT_QUATERNARY: '#323C47',
    ACCENT_QUINARY: '#535353',
    ACCENT_SEPTENARY: '#E7E7E7',
    FOCUSED_PRIMARY: '#828282',
    INPUT_BACKGROUND: 'rgba(249, 249, 249, 0.5)',
    INPUT_BACKGROUND_HOVER: 'rgba(0, 0, 0, 0.1)',
    INACTIVE: '#C9C9C9',
    GRAY20: '#333333',
    SUCCESS: '#37A66C',
    ERROR: '#FF6B6B',
    SECONDARY_ERROR: 'rgba(224,53,53,0.8)',
    TERTIARY_ERROR: '#FBE2E2',
    ERROR_ICON: '#E03535',
    ERROR_FORM: '#FF5E65',
    EMERGENCY_CONTACT: '#D5031D',
    DIVIDER: '#EBEBEB',
    SELECTED_BACKGROUND: 'rgba(31, 134, 232, 0.1)',
    PENDING_FONT: '#F4A400',
    PENDING_BACKGROUND: 'rgba(244, 164, 0, 0.21)',
    AVAILABLE_FONT: '#26945B',
    AVAILABLE_BACKGROUND: '#E5F3EC',
    ASSIGNED_FONT: '#146EC2',
    ASSIGNED_BACKGROUND: '#E2F1FF',
    BANNER_FONT: '#293D4B',
    INPUT_HOVER_DISABLED: 'rgba(0, 0, 0, 0.23)',
  },
  HEADER: {
    HEIGHT: '80px',
    SPACER_HEIGHT: '80px',
  },
  SIDEBAR: {
    WIDTH: '80px',
  },
  APPBAR: {
    HEIGHT: '80px',
  },
  FLOATING_APPBAR: {
    HEIGHT: '100px',
  },
  DIALOG: {
    RIGHT_PADDING: '14px',
  },
  FORM: {
    BOTTOM_SPACING: '20px',
  },
  SPINNER: {
    SEGMENT_WIDTH: 2.3,
    SEGMENT_HEIGHT: 2.5,
  },
  BORDER_FOCUS: `#006DF7 auto 2px`,
};

export const badgeEditorColorMap = {
  setOne: { backgroundColor: '1E86E8', fontColor: 'FFFFFF' },
  setTwo: { backgroundColor: '0469B3', fontColor: 'FFFFFF' },
  setThree: { backgroundColor: '7E368B', fontColor: 'FFFFFF' },
  setFour: { backgroundColor: 'A9115D', fontColor: 'FFFFFF' },
  setFive: { backgroundColor: 'D50F1C', fontColor: 'FFFFFF' },
  setSix: { backgroundColor: 'E9640C', fontColor: 'FFFFFF' },
  setSeven: { backgroundColor: 'FFE304', fontColor: '444444' },
  setEight: { backgroundColor: 'B5CB03', fontColor: '444444' },
  setNine: { backgroundColor: '32A32C', fontColor: 'FFFFFF' },
  setTen: { backgroundColor: 'BBBBBB', fontColor: 'FFFFFF' },
  setEleven: { backgroundColor: '444444', fontColor: 'FFFFFF' },
  setTwelve: { backgroundColor: 'FFFFFF', fontColor: '444444' },
};

export const badgeEditorFontMap = {
  arial: 'Arial',
  verdana: 'Verdana',
  impact: 'Impact',
  georgia: 'Georgia',
  times: 'Times',
};

/* Custom theme defined for the whole App
   Ref to https://material-ui.com/customization/theming/#theme-configuration-variables
   for API exposure of consumables
*/
export const theme = createMuiTheme({
  typography: {
    fontFamily: [STYLE.FONT.PRIMARY_FONT].join(','),
  },
  palette: {
    primary: {
      main: STYLE.COLOR.ACCENT_PRIMARY,
    },
    secondary: {
      main: STYLE.COLOR.SECONDARY_DARKER,
    },
    background: {
      default: STYLE.COLOR.QUINARY_LIGHTER,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        boxShadow: 'none !important',
        textTransform: 'none',
      },
      contained: {
        '&$disabled': {
          color: STYLE.COLOR.WHITE,
          backgroundColor: STYLE.COLOR.UNCOMPLETED,
        },
      },
    },
    MuiInputBase: {
      root: {
        height: '50px',
        color: STYLE.COLOR.SECONDARY_DARKER,
        '& ::placeholder': {
          fontWeight: '500',
          textTransform: 'capitalize',
          fontSize: toREM(17),
          position: 'relative',
          top: '1px',
        },

        '& .MuiOutlinedInput-input': {
          padding: '15.5px 14px',
        },
      },
    },
    MuiInput: {
      root: {
        height: '50px',
        color: STYLE.COLOR.SECONDARY_DARKER,
        '& ::placeholder': {
          fontWeight: '500',
          textTransform: 'capitalize',
          fontSize: toREM(17),
          position: 'relative',
          top: '1px',
        },

        '& .MuiOutlinedInput-input': {
          padding: '15.5px 14px',
        },
      },
    },
    MuiCheckbox: {
      root: {
        color: STYLE.COLOR.INACTIVE,
        '& .MuiSvgIcon-root': {
          fontSize: '1.5rem',
          marginRight: '4px',
        },
        '& .MuiIconButton-label': {
          position: 'relative',
          left: '2px',
        },
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiCssBaseline: {
      '@global': {
        body: {
          '&::focus': {
            outline: STYLE.BORDER_FOCUS,
          },
          '&.using-mouse': {
            '& button': {
              outline: 'none',
            },
          },
          '& .MuiCheckbox-colorSecondary.Mui-checked': {
            color: `${STYLE.COLOR.ACCENT_PRIMARY_LIGHTER}`,
          },
          '& .MuiCheckbox-colorSecondary.Mui-disabled': {
            color: 'rgba(0, 0, 0, 0.26)',
          },
        },
        html: {
          /* Styles for Google Maps Suggestion Box
             These styles are injected globally, due to how Google inserts it's component
          */
          overflowY: 'scroll',
          '& .pac-logo:after': {
            display: 'none',
          },
          '& .pac-container': {
            '& .pac-icon': {
              marginTop: 0,
              marginLeft: '7px',
            },
            '& .pac-item': {
              display: 'flex',
              alignItems: 'center',
              height: '57px',
              fontFamily: STYLE.FONT.PRIMARY_FONT,

              '& .pac-item-query': {
                color: STYLE.COLOR.ACCENT_QUINARY,
                fontSize: '17px',
                letterSpacing: 0,
                lineHeight: '27px',
                paddingRight: '10px',
              },
            },
          },
        },
      },
    },
  },
});
