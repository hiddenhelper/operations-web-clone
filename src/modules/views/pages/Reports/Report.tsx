import React, { memo } from 'react';

import Container from 'modules/views/shared/Container';
import PageTitle from 'modules/views/shared/PageTitle';

const Report = () => {
  return (
    <Container>
      <PageTitle title="Reports" />
    </Container>
  );
};

export default memo(Report);
