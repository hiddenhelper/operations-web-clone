import React, { memo, useCallback, useEffect, useMemo } from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';

import ControlledError from '../FormHandler/ControlledError';
import ControlledInput from '../FormHandler/ControlledInput';
import AssignEntity from '../AssignEntity';
import AssignEntityOption from '../AssignEntityOption';
import AddEntityButton from '../AddEntityButton';
import InvoiceServiceRow from './InvoiceServiceRow';
import InformationNote from '../InformationNote';

import { GeneralModel, InvoiceModel, ClientModel, ResourceModel } from '../../../models';
import { FormRules, LANG } from '../../../../constants';
import { getConditionalDefaultValue, sanitizeNumber } from '../../../../utils/generalUtils';
import { inputGlobalStyles, invoiceFormGlobalStyles, tableGlobalStyles } from '../../../../assets/styles';
import { useStyles as errorStyles } from '../FormHandler/ControlledError/styles';
import { useStyles } from './styles';

export interface IInvoiceFormProps {
  model: InvoiceModel.IInvoice;
  errors: any;
  formRules: any;
  uiRelationMap: GeneralModel.IRelationUiMap;
  projectId?: string;
  client?: ClientModel.IClient;
  serviceList: GeneralModel.INamedEntity[];
  onChange: (model: any) => void;
  searchCompanies: (params: GeneralModel.IQueryParams, id: string) => void;
  searchProjects: (params: GeneralModel.IQueryParams, id: string) => void;
  fetchServices: () => void;
  clearRelationMap: () => void;
  resetErrors: () => void;
}

const InvoiceForm = ({
  model,
  errors,
  formRules,
  uiRelationMap,
  projectId,
  client,
  serviceList,
  onChange,
  searchCompanies,
  searchProjects,
  fetchServices,
  clearRelationMap,
  resetErrors,
}: IInvoiceFormProps) => {
  const classes = useStyles();
  const errorClasses = errorStyles();
  const tableGlobalClasses = tableGlobalStyles();
  const inputGlobalClasses = inputGlobalStyles();
  const invoiceStyles = invoiceFormGlobalStyles();

  const isAddDisabled = useMemo(() => model.items[model.items.length - 1]?.service?.name.length <= 0, [model]);
  const searchCompanyDisabled = useMemo(() => !projectId && !model.project?.id, [projectId, model.project]);
  const subtotal: number = useMemo(() => model && model.items.reduce((tot, act) => sanitizeNumber(tot) + sanitizeNumber(act.amount) || 0, 0), [model]);
  const shouldCalculateConvFee = !!(model?.company?.hasPaymentMethod || model.convenienceFeeAmount || client?.hasPaymentMethod);
  const convenienceFee = shouldCalculateConvFee && Number((subtotal * 0.03).toFixed(2));

  const onProjectChange = useCallback(
    selectedProject => {
      onChange(/* istanbul ignore next */ prevModel => ({ ...prevModel, project: selectedProject, company: null }));
    },
    [onChange]
  );

  const onChangeHandler = useCallback(
    event => {
      /* istanbul ignore else */
      if (event.persist) event.persist();
      onChange(
        /* istanbul ignore next */ prevState => ({
          ...prevState,
          [event.target.name]: event.target.value,
        })
      );
    },
    [onChange]
  );

  const onSelectClient = useCallback(
    (index: number, company, tempId: string) => {
      onChange(/* istanbul ignore next */ prevModel => ({ ...prevModel, company }));
    },
    [onChange]
  );

  const onSelectProject = useCallback(
    (index: number, item, tempId: string) => {
      onProjectChange(item);
    },
    [onProjectChange]
  );

  const onResetClient = useCallback(
    /* istanbul ignore next */ () => {
      onChange(/* istanbul ignore next */ prevModel => ({ ...prevModel, company: null }));
    },
    [onChange]
  );

  const onResetProject = useCallback(
    /* istanbul ignore next */ () => {
      onProjectChange(null);
    },
    [onProjectChange]
  );

  const renderOption = useCallback((option, inputValue) => <AssignEntityOption option={option} inputValue={inputValue} />, []);

  const onSearchCompany = useCallback(
    (query: GeneralModel.IQueryParams, tempId: string) => {
      const newQuery = getConditionalDefaultValue(projectId, { ...query, projectId }, { ...query, projectId: model.project?.id });
      searchCompanies(newQuery, tempId);
    },
    [searchCompanies, projectId, model.project]
  );

  const onSearchProject = useCallback(
    (query: GeneralModel.IQueryParams, tempId: string) => {
      const newQuery = getConditionalDefaultValue(
        client?.id,
        { ...query, activeForCompanyId: client?.id },
        { ...query, activeForCompanyId: model.company?.id }
      );
      searchProjects(newQuery, tempId);
    },
    [searchProjects, client, model.company]
  );

  const onAddInvoiceItem = useCallback(() => {
    onChange(
      /* istanbul ignore next */ prevModel => ({
        ...prevModel,
        items: [...prevModel.items, InvoiceModel.getFallbackInvoiceService()],
      })
    );
  }, [onChange]);

  const handleDeleteService = useCallback(
    (index: number) => {
      const items = model.items.slice(0, index).concat(model.items.slice(index + 1, model.items.length));
      onChange(/* istanbul ignore next */ prevModel => ({ ...prevModel, items }));
    },
    [model, onChange]
  );

  useEffect(() => {
    /* istanbul ignore else */
    if (!serviceList.length) fetchServices();
  }, [serviceList.length, fetchServices]);

  useEffect(() => {
    return function unMount() {
      onChange({ ...FormRules.invoice.initValues, items: [InvoiceModel.getFallbackInvoiceService()] });
      clearRelationMap();
      resetErrors();
    };
  }, [clearRelationMap, onChange, resetErrors]);
  return (
    <form autoComplete={'off'} noValidate={true} onSubmit={/* istanbul ignore next */ event => event.preventDefault()}>
      <Grid container={true}>
        {!projectId && (
          <Grid
            item={true}
            xl={getConditionalDefaultValue(client?.id, 12, 6)}
            xs={getConditionalDefaultValue(client?.id, 12, 6)}
            lg={getConditionalDefaultValue(client?.id, 12, 6)}
            className={`${classes.inputMarginBottom}`}
          >
            <div className={classes.errorInputWrapper}>
              <ControlledError
                show={!!errors.project}
                error={getConditionalDefaultValue(errors.project && errors.project === 'is required', 'Please enter a Project.', errors.project)}
              >
                <AssignEntity
                  index={0}
                  tempId={'invoice-project-id'}
                  optionLabel="name"
                  result={uiRelationMap['invoice-project-id']?.searchResult || []}
                  isLoading={false}
                  showCreateNew={false}
                  disableClearable={false}
                  assignValue={model.project}
                  placeholder="Select Project"
                  inputLabel="Project"
                  styleClass={`${inputGlobalClasses.middleInput} ${classes.autocompleteInput}`}
                  existRelation={uiRelationMap && uiRelationMap['invoice-project-id']}
                  onSelect={onSelectProject}
                  search={onSearchProject}
                  renderOption={renderOption}
                  onReset={onResetProject}
                  showError={false}
                  params={{ projectStatuses: [ResourceModel.Status.ACTIVE] }}
                />
              </ControlledError>
            </div>
          </Grid>
        )}
        {!client?.id && (
          <Grid
            item={true}
            xl={getConditionalDefaultValue(projectId, 12, 6)}
            xs={getConditionalDefaultValue(projectId, 12, 6)}
            lg={getConditionalDefaultValue(projectId, 12, 6)}
            className={classes.inputMarginBottom}
          >
            <div className={classes.errorInputWrapper}>
              <ControlledError
                show={!!errors.company}
                error={getConditionalDefaultValue(errors.company && errors.company === 'is required', 'Please enter a Client.', errors.company)}
              >
                <AssignEntity
                  index={1}
                  tempId={'invoice-company-id'}
                  optionLabel="name"
                  result={uiRelationMap['invoice-company-id']?.searchResult || []}
                  isLoading={false}
                  showCreateNew={false}
                  disableClearable={false}
                  assignValue={model.company}
                  placeholder="Select Client"
                  inputLabel="Bill To"
                  disabled={searchCompanyDisabled}
                  existRelation={uiRelationMap && uiRelationMap['invoice-company-id']}
                  styleClass={classes.autocompleteInput}
                  onSelect={onSelectClient}
                  search={onSearchCompany}
                  renderOption={renderOption}
                  onReset={onResetClient}
                  showError={false}
                />
              </ControlledError>
            </div>
          </Grid>
        )}
        <Grid item={true} xl={12} lg={12} className={`${classes.inputMarginBottom} ${tableGlobalClasses.tableWrapper}`}>
          <Table aria-label="invoice-services">
            <TableHead>
              <TableRow>
                <TableCell>Service</TableCell>
                <TableCell>Detail</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {model.items.map((service, index) => (
                <InvoiceServiceRow
                  serviceRow={service}
                  serviceList={serviceList}
                  key={index}
                  index={index}
                  onChange={onChange}
                  onDelete={handleDeleteService}
                />
              ))}
              {!!errors.items && (
                <TableRow>
                  <TableCell className={classes.errorPosition} style={{ padding: 0, border: 0 }}>
                    <Typography
                      className={errorClasses.errorMessage}
                      style={{ position: 'relative', margin: '5px 0px -5px 5px' }}
                      color="secondary"
                      variant="caption"
                      align="left"
                      component="h1"
                    >
                      {getConditionalDefaultValue(!!errors.items && errors.items === 'is required', 'At least one item is required.', errors.items)}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell style={{ padding: 0, border: 0 }}>
                  <AddEntityButton onAdd={onAddInvoiceItem} isAddDisabled={isAddDisabled} title="Service" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
        <Grid item={true} xl={12} lg={12} className={classes.errorPosition}>
          <ControlledError show={!!errors.notes} error={errors.notes}>
            <ControlledInput label="Notes (Optional)" styleClass={classes.descriptionInput}>
              <TextField
                variant="outlined"
                multiline={true}
                rows={2}
                data-testid="invoice-notes-wrapper"
                placeholder="Notes"
                type="text"
                autoComplete="off"
                fullWidth={true}
                name="notes"
                required={formRules.notes?.required}
                value={model.notes || ''}
                onChange={onChangeHandler}
                error={!!errors.notes}
                inputProps={{
                  'data-testid': 'invoice-notes',
                }}
              />
            </ControlledInput>
          </ControlledError>
        </Grid>
      </Grid>
      {model.items.length > 0 && (
        <>
          <InformationNote
            style={{ infoContainer: { marginTop: 20 } }}
            note={
              <>
                <Typography>{LANG.EN.INVOICE.PAYMENT_POLICY}</Typography>
                <Typography>{LANG.EN.INVOICE.TAXES_CALCULTAED}</Typography>
              </>
            }
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div className={invoiceStyles.invoiceTotalsContainer} style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'column' }}>
              <Typography className={invoiceStyles.subtotalLine} align="right">
                Subtotal: $ {subtotal}
              </Typography>
              <Typography align="right">{!!convenienceFee ? `Convenience Fee (3%): $ ${convenienceFee}` : null}</Typography>
              <Typography align="right" className={invoiceStyles.disclaimer}>
                Taxes will be calculated once the invoice is created and confirmed
              </Typography>
            </div>
          </div>
        </>
      )}
    </form>
  );
};

export default memo(InvoiceForm);
