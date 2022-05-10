import React, { memo, useCallback, useMemo, useState } from 'react';
import { Divider } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Locations } from './components/Locations';
import AddressForm from '../../ResourceManagement/AddressForm';
import Card from '../../ResourceManagement/Card';
import Checkbox from '../../FormHandler/Checkbox';
import ControlledSelect from '../../FormHandler/ControlledSelect';
import { ProjectModel, AddressModel } from '../../../../models';
import { useStyles } from '../styles';

export interface IAddressesProps {
  model: ProjectModel.IProject;
  errors: any;
  onChange: (event: any) => void;
}

const Addresses = ({ onChange, model, errors }: IAddressesProps) => {
  const classes = useStyles();
  const [mailingMatchingType, setMailingMatchingType] = useState(ProjectModel.MailingAddressMatchingType.JOB_SITE_ADDRESS);
  const jobSiteAddress = useMemo(
    () => (model[ProjectModel.ProjectFields.JOB_SITE_ADDRESS] ? model[ProjectModel.ProjectFields.JOB_SITE_ADDRESS] : AddressModel.getFallbackAddress()),
    [model]
  );

  const onBadgingMatchAddressChange = useCallback(
    event => {
      event.persist();
      onChange(prevState => ({
        ...prevState,
        badgingSiteAddressMatchesJobSiteAddress: event.target.checked,
        badgingSiteAddress: event.target.checked ? prevState.badgingSiteAddress : AddressModel.getFallbackAddress(),
      }));
    },
    [onChange]
  );
  const onMailingMatchJobSiteAddressChange = useCallback(
    event => {
      event.persist();
      onChange(prevState => ({
        ...prevState,
        mailingAddressMatchingType: event.target.checked
          ? ProjectModel.MailingAddressMatchingType.JOB_SITE_ADDRESS
          : ProjectModel.MailingAddressMatchingType.NONE,
        mailingAddress: event.target.checked ? prevState.mailingAddress : AddressModel.getFallbackAddress(),
      }));
    },
    [onChange]
  );
  const onMailingNoneMatchesChange = useCallback(
    e => {
      e.persist();
      onChange(prevState => ({
        ...prevState,
        mailingAddressMatchingType: e.target.checked ? ProjectModel.MailingAddressMatchingType.JOB_SITE_ADDRESS : ProjectModel.MailingAddressMatchingType.NONE,
        mailingAddress: e.target.checked ? prevState.mailingAddress : AddressModel.getFallbackAddress(),
      }));
      setMailingMatchingType(e.target.checked ? ProjectModel.MailingAddressMatchingType.JOB_SITE_ADDRESS : ProjectModel.MailingAddressMatchingType.NONE);
    },
    [onChange, setMailingMatchingType]
  );
  const handleMailingMatchingTypeChange = useCallback(
    /* istanbul ignore next */
    e => {
      e.persist();
      setMailingMatchingType(parseInt(e.target.value, 10));
      onChange(prevState => ({
        ...prevState,
        mailingAddressMatchingType: parseInt(e.target.value, 10),
      }));
    },
    [onChange]
  );

  return (
    <>
      <Card title="Job Site Address">
        <AddressForm onChange={onChange} addressModel={jobSiteAddress} errors={errors} modelProperty={ProjectModel.ProjectFields.JOB_SITE_ADDRESS} />
      </Card>
      <Locations errors={errors} status={model.status} locationsList={model.locations} onChange={onChange} />
      <Card title="Badging Site Address" styleClass={classes.addressWrapper}>
        <FormControlLabel
          label="Same as Job Site Address"
          className={classes.addressCheckbox}
          control={
            <Checkbox
              name="badgingSiteAddressMatchesJobSiteAddress"
              value="badgingSiteAddressMatchesJobSiteAddress"
              isChecked={model.badgingSiteAddressMatchesJobSiteAddress}
              onChange={onBadgingMatchAddressChange}
              inputProps={{
                'data-testid': 'badgingMatchJobSite',
              }}
            />
          }
        />
        <Divider className={classes.divider} />
        {!model.badgingSiteAddressMatchesJobSiteAddress && (
          <AddressForm addressModel={model.badgingSiteAddress} onChange={onChange} modelProperty={ProjectModel.ProjectFields.BADGING_ADDRESS} errors={errors} />
        )}
      </Card>
      <Card title="Mailing Address" styleClass={classes.addressWrapper}>
        {model.badgingSiteAddressMatchesJobSiteAddress && (
          <FormControlLabel
            label="Same as Job Site Address"
            className={classes.addressCheckbox}
            control={
              <Checkbox
                name="mailingAddressMatchesJobSiteAddress"
                value="mailingAddressMatchesJobSiteAddress"
                isChecked={model.mailingAddressMatchingType === ProjectModel.MailingAddressMatchingType.JOB_SITE_ADDRESS}
                onChange={onMailingMatchJobSiteAddressChange}
                inputProps={{
                  'data-testid': 'mailingMatchJobSite',
                }}
              />
            }
          />
        )}
        <Divider className={classes.divider} />
        {!model.badgingSiteAddressMatchesJobSiteAddress && (
          <FormControlLabel
            label={
              <ControlledSelect
                label="Same as"
                inlineLabel={true}
                options={[
                  { label: 'Job Site Address', value: ProjectModel.MailingAddressMatchingType.JOB_SITE_ADDRESS },
                  { label: 'Badging Site Address', value: ProjectModel.MailingAddressMatchingType.BADGING_SITE_ADDRESS },
                ]}
                value={mailingMatchingType}
                onChange={handleMailingMatchingTypeChange}
                disabled={model.mailingAddressMatchingType === ProjectModel.MailingAddressMatchingType.NONE}
                name="mailingAddressMatchingType"
                includeNone={mailingMatchingType === ProjectModel.MailingAddressMatchingType.NONE}
                noneValue={ProjectModel.MailingAddressMatchingType.NONE}
                error={null}
                inputProps={{
                  'data-testid': 'mailingMatchType',
                }}
              />
            }
            className={classes.addressCheckbox}
            control={
              <Checkbox
                name="mailingAddressNoneMatches"
                value="mailingAddressNoneMatches"
                isChecked={model.mailingAddressMatchingType !== ProjectModel.MailingAddressMatchingType.NONE}
                onChange={onMailingNoneMatchesChange}
                inputProps={{
                  'data-testid': 'mailingMatchNone',
                }}
              />
            }
          />
        )}
        {model.mailingAddressMatchingType === ProjectModel.MailingAddressMatchingType.NONE && (
          <AddressForm addressModel={model.mailingAddress} onChange={onChange} modelProperty={ProjectModel.ProjectFields.MAILING_ADDRESS} errors={errors} />
        )}
      </Card>
    </>
  );
};

export default memo(Addresses);
