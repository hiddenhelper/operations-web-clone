import React from 'react';
import { useStyles } from './styles';
import Typography from '@material-ui/core/Typography';
import { Link, useHistory } from 'react-router-dom';
import { ROUTES } from '../../../../../constants';
interface ICardAdmin {
  title: string;
  bodyFirstLine: string;
  bodySecondLine: string;
  linkDescription: string;
  logo: React.ReactNode;
}

export const CardAdmin = ({ title, bodyFirstLine, bodySecondLine, linkDescription, logo }: ICardAdmin) => {
  const styles = useStyles();
  const history = useHistory();
  const redirectToMapping = () => {
    history.push(ROUTES.PROCORE_CLIENTS.path);
  };

  return (
    <div className={styles.cardContainer} data-testid="procoreCard" onClick={() => redirectToMapping()}>
      <div className={styles.titleContainer}>
        <div className={styles.logoContainer}>
          <div className={styles.grayCircle}>{logo}</div>
        </div>
        <div>
          <Typography className={styles.title}>{title}</Typography>
        </div>
      </div>
      <div className={styles.bodyContainer}>
        <Typography>{bodyFirstLine}</Typography>
        <Typography>{bodySecondLine}</Typography>
      </div>
      <div className={styles.linkContanier}>
        <Link to={ROUTES.PROCORE_CLIENTS.path} color="inherit">
          {linkDescription}
        </Link>
      </div>
    </div>
  );
};
