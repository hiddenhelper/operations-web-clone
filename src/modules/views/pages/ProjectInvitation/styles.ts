import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';
import { toREM } from '../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    stepWrapper: {
      fontSize: `${toREM(15)}`,
      color: STYLE.COLOR.ACCENT_SECONDARY,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    floatingActionBar: {
      top: 'auto',
      bottom: 0,
      width: '100vw',
      height: STYLE.FLOATING_APPBAR.HEIGHT,
      padding: '16px 40px',
      display: 'flex',
      zIndex: 2,
      borderTop: `1px solid ${STYLE.COLOR.LIGHT_GRAY3}`,
      boxShadow: '0 -2px 6px 0 rgba(0,0,0,0.03)',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      backgroundColor: STYLE.COLOR.WHITE,
    },
    cardContentPadding: {
      paddingTop: `${toREM(9)}`,
    },
    serviceAgreementCheckbox: {
      color: STYLE.COLOR.LIGHT_GRAY6,
      marginTop: 15,
      '& .MuiTypography-root': {
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      },
    },
    checkboxFont: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
    },
    actionBarPadding: { paddingBottom: 60 },
  })
);

export const tableRowStyles = () =>
  createStyles({
    root: {
      '& .MuiTableCell-root': {
        paddingTop: `${toREM(18.5)}`,
        paddingBottom: `${toREM(18.5)}`,

        '& .MuiButtonBase-root': {
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
      '&:nth-of-type(odd)': {
        backgroundColor: STYLE.COLOR.WHITE,
      },
    },
  });
