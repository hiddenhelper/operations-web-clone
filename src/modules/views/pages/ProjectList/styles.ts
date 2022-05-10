import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';
import { toREM } from '../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    drawerPaper: {
      width: 331,
      padding: '0px 30px',
      overflowX: 'hidden',

      '&.MuiPaper-root': {
        position: 'absolute',
        top: 80,
        zIndex: 1,
        height: props => ((props as any).projectListHeight > 900 ? (props as any).projectListHeight : '100%'),
        overflowY: 'hidden',
        minHeight: props => ((props as any).projectListHeight > 900 ? '100%' : `${toREM(900)}`),
      },
    },
    '& a': {
      outline: 'none',
      textDecoration: 'none',
    },
    projectRow: {
      '&:nth-child(1)': {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        top: '1px',
        '& .MuiAvatar-root': {
          backgroundColor: STYLE.COLOR.LIGHT_GRAY3,
          height: `${toREM(32)}`,
          width: `${toREM(32)}`,
          marginRight: `${toREM(20)}`,

          '& .MuiSvgIcon-root': {
            fill: STYLE.COLOR.INACTIVE,
          },
        },
      },
    },
    projectRowButtonWrapper: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    projectBannerButtonWrapper: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',

      '& .MuiButtonBase-root': {
        padding: 0,
        display: 'inline',
        width: '100%',

        '&:hover': {
          backgroundColor: 'initial',
        },
      },
    },
    bannerWrapper: {
      display: 'flex',
      alignItems: 'center',
      height: `${toREM(100)}`,
      border: `1px solid ${STYLE.COLOR.LIGHT_GRAY3}`,
      boxShadow: `0 2px 6px 0 rgba(0,0,0,0.03)`,
      marginBottom: '15px',
      cursor: 'pointer',
    },
    bannerTitle: {
      fontSize: `${toREM(STYLE.FONT.SIZE.HEADING_2)}`,
      color: STYLE.COLOR.BANNER_FONT,
    },
    bannerTitleAccent: {
      fontWeight: 'bold',
    },
    bannerProjectTitle: {
      position: 'relative',
      top: '4px',
    },
    bannerInformation: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_BIG)}`,
      color: STYLE.COLOR.BANNER_FONT,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      paddingRight: '15px',
    },
    bannerAvatarPosition: {
      marginLeft: `${toREM(23)}`,
    },
    bannerGrid: {
      paddingLeft: 60,
      justifyContent: 'flex-start',
    },
    bannerProjectWrapper: {
      width: '100%',
      maxWidth: '21.5%',
      '& p': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textAlign: 'left',
      },
    },
    bannerInformationSpacing: {
      display: 'flex',
      width: '95%',
    },
    bannerInformationWrapper: {
      display: 'flex',
      width: '100%',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      justifyContent: 'space-between',
    },
    iconWrapper: {
      width: '18px',
      height: '4px',
      position: 'relative',
      right: '34px',
      '& svg': {
        fill: STYLE.COLOR.INACTIVE,
      },
    },
    secondaryFilterPosition: {
      right: 8,
    },
  })
);
