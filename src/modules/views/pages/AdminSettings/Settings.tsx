import React, { memo } from 'react';
import Container from 'modules/views/shared/Container';
import PageTitle from 'modules/views/shared/PageTitle';
import { CardAdmin } from './components/CardAdmin';
import { useStyles } from './styles';
import { titleProcoreCard, bodyProcoreCardFirstLine, bodyProcoreCardSecondLine, logoProcore, linkDescriptionProcore } from './constants';

const AdminSettings = () => {
  const classes = useStyles();
  return (
    <Container>
      <PageTitle title="System Administration" />
      <div className={classes.cardsWrapper}>
        <CardAdmin
          title={titleProcoreCard}
          bodyFirstLine={bodyProcoreCardFirstLine}
          bodySecondLine={bodyProcoreCardSecondLine}
          logo={logoProcore}
          linkDescription={linkDescriptionProcore}
        />
      </div>
    </Container>
  );
};

export default memo(AdminSettings);
