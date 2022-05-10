import React, { memo } from 'react';

import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Checkbox from '../../../shared/FormHandler/Checkbox';
import Review from '../../../shared/ProjectForm/Review';
import Card from '../../../shared/ResourceManagement/Card';

import { cardGlobalStyles } from '../../../../../assets/styles/Cards/styles';
import { useStyles } from '../styles';

const ReviewSettingsStep = ({ currentProject, serviceAgreement, handleToggleCheckbox, isServiceAgreementAccepted }) => {
  const classes = useStyles();
  const cardGlobalClasses = cardGlobalStyles();
  return (
    <>
      <Review isReviewStep={true} model={currentProject} showAssignClient={false} />
      <Card title={serviceAgreement.TITLE}>
        <div className={classes.cardContentPadding}>
          <Typography className={`${cardGlobalClasses.cardFontParagraph}`}>{serviceAgreement.CONTENT}</Typography>
          <FormControlLabel
            className={classes.serviceAgreementCheckbox}
            label={serviceAgreement.CHECKBOX_LABEL}
            control={
              <Checkbox
                name="serviceAgreementAccept"
                value="serviceAgreementAccept"
                isChecked={isServiceAgreementAccepted}
                onChange={handleToggleCheckbox}
                inputProps={{ 'data-testid': 'service-agreement-accept' }}
              />
            }
          />
        </div>
      </Card>
    </>
  );
};

export default memo(ReviewSettingsStep);
