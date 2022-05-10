import React, { memo } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@material-ui/core';
import { Dehaze } from '@material-ui/icons';

import { IConsentFormField, IConsentFormFieldConfig, ConsentFormFieldDescriptions, ConsentFormFieldDataType } from 'modules/models/consentForm';
import ControlledCheckbox from 'modules/views/shared/FormHandler/Checkbox';
import Switch from 'modules/views/shared/Switch';
import { useStyles } from './styles';

export interface IWorkerConsentFormMappingProps {
  name: string;
  items: IConsentFormField[];
  value: IConsentFormFieldConfig[];
  onChange: (model: any) => void;
  error?: boolean;
}

const Mappings = ({ items: fields, name, value, onChange, error = false }: IWorkerConsentFormMappingProps) => {
  const classes = useStyles();

  const handleFieldChange = (field: IConsentFormField, changeType: 'visible' | 'mandatory', newValue: boolean, fieldConfig?: IConsentFormFieldConfig) => {
    if (fieldConfig) {
      const updatedConfig = value.map(item => {
        if (item.consentFormFieldId === field.id) {
          if (changeType === 'mandatory') {
            item.isMandatory = newValue;
            return item;
          }
          item.isVisible = newValue;
          /* istanbul ignore else */
          if (!item.isVisible) {
            // If field is configured to be non visible, then, set mandatory to false
            item.isMandatory = false;
          }
        }
        return item;
      });
      onChange(/* istanbul ignore next */ prevState => ({ ...prevState, [name]: updatedConfig }));
    } else {
      // If there's no config for the field, the only possible update is to make it visible
      const newConfig = [...value];
      newConfig.push({
        consentFormFieldId: field.id,
        consentFormFieldName: field.name,
        isVisible: true,
        isMandatory: false,
      });
      onChange(/* istanbul ignore next */ prevState => ({ ...prevState, [name]: newConfig }));
    }
  };

  return (
    <Table aria-label="form-consent-form">
      <TableHead>
        <TableRow className={classes.tableHeader}>
          <TableCell>Input Name</TableCell>
          <TableCell>Input Type</TableCell>
          <TableCell>Visible</TableCell>
          <TableCell>Mandatory</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {fields.map((field, index) => {
          const fieldConfig = value.find(item => item.consentFormFieldId === field.id);
          const isVisible = fieldConfig?.isVisible || false;
          const isMandatory = fieldConfig?.isMandatory || false;
          return (
            <TableRow key={index}>
              <TableCell className={classes.fieldTitleWrapper}>
                <Dehaze className={classes.reorderIcon} />
                <Typography display="inline" className={classes.fieldTitle}>
                  {fieldConfig?.consentFormFieldName ?? field.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.fieldDescription}>
                  {ConsentFormFieldDataType[field.dataType]} {ConsentFormFieldDescriptions[field.code]}
                </Typography>
              </TableCell>
              <TableCell>
                <Switch
                  checked={isVisible}
                  onChange={() => handleFieldChange(field, 'visible', !isVisible, fieldConfig)}
                  color="primary"
                  data-testid="field-is-visible-checkbox"
                />
              </TableCell>
              <TableCell>
                <ControlledCheckbox
                  disabled={!isVisible}
                  isChecked={isMandatory}
                  name={name}
                  value={field.id}
                  onChange={() => handleFieldChange(field, 'mandatory', !isMandatory, fieldConfig)}
                  error={error}
                  testId="field-is-mandatory-checkbox"
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default memo(Mappings);
