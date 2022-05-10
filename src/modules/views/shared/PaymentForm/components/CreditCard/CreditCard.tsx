import React, { memo, useMemo, useCallback, useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import ControlledInput from '../../../FormHandler/ControlledInput';
import ControlledError from '../../../FormHandler/ControlledError';
import ButtonLoader from '../../../ButtonLoader';

import { GeneralModel, PaymentModel } from '../../../../../models';
import { FormRules } from '../../../../../../constants';
import { useForm } from '../../../../../../utils/useForm';
import { getConditionalDefaultValue } from '../../../../../../utils/generalUtils';

import { useStyles } from './style';
export interface ICreditCardProps {
  createLoading: GeneralModel.ILoadingStatus;
  createPayment: (id: string) => void;
  clearLoading: () => void;
  onSuccessCallback?: () => void;
}

const CreditCard = ({ createLoading, createPayment, clearLoading, onSuccessCallback }: ICreditCardProps) => {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();

  const [cardErrors, setCardErrors] = useState(null);
  const [isProcessing, setProcessing] = useState(false);

  const currentPaymentMethod = useMemo(() => PaymentModel.getPaymentMethodFallback(), []);

  const handleSubmit = useCallback(
    async (data: PaymentModel.IPaymentMethodRequest) => {
      /* istanbul ignore next */ if (!!cardErrors) return;
      setProcessing(true);
      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        metadata: {
          nameOnCard: data.nameOnCard,
          countryOrRegion: data.countryOrRegion,
        },
      });
      /* istanbul ignore else */
      if (!error) createPayment(paymentMethod.id);
      else setProcessing(false);
    },
    [stripe, elements, cardErrors, setProcessing, createPayment]
  );

  const { model, formRules, errors, onSubmit, onChange } = useForm<PaymentModel.IPaymentMethodRequest>({
    initValues: FormRules.payment.creditCardFormInitData,
    formRules: FormRules.payment.creditCardFormRules,
    onSubmitCallback: handleSubmit,
  });

  const onChangeHandler = useCallback(
    event => {
      event.persist();
      onChange(prevState => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    },
    [onChange]
  );

  const onChangeCreditCard = useCallback(
    e => {
      onChange(prevState => ({ ...prevState, creditCard: e }));
      setCardErrors(e.error);
    },
    [onChange, setCardErrors]
  );

  useEffect(() => {
    /* istanbul ignore else */
    if (createLoading && !createLoading.isLoading) {
      setProcessing(false);
      /* istanbul ignore else */
      if (onSuccessCallback) onSuccessCallback();
    }
  }, [createLoading, onSuccessCallback]);

  useEffect(() => {
    return function unMount() {
      clearLoading();
    };
  }, [clearLoading]);
  return (
    <Grid container={true} style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Grid item={true} xl={9} lg={9}>
        <Grid container={true}>
          <>
            <Grid item={true} xl={12} lg={12} className={classes.inputSeparator}>
              <Typography className={classes.title} color="primary" align="left" component="h1" variant="h5">
                {getConditionalDefaultValue(currentPaymentMethod.brand, 'Edit Payment Method', 'Pay With Card')}
              </Typography>
            </Grid>
            <Grid item={true} xl={12} lg={12} className={classes.inputSeparator}>
              <ControlledError
                show={!!cardErrors?.message || !!errors?.creditCard}
                error={getConditionalDefaultValue(
                  !cardErrors?.message && errors?.creditCard === 'is required',
                  'Card Information is required.',
                  cardErrors?.message
                )}
              >
                <ControlledInput label="Card Information">
                  <div
                    style={{
                      borderRadius: '4px',
                      padding: '15.5px 14px',
                      border: '2px solid',
                      borderColor: getConditionalDefaultValue(!!cardErrors?.message || !!errors?.creditCard, '#FF5E65', 'rgba(0, 0, 0, 0.23)'),
                    }}
                  >
                    <CardElement
                      onChange={onChangeCreditCard}
                      options={{
                        style: {
                          base: {
                            color: '#444',
                            fontWeight: '500',
                            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                            fontSize: '16px',
                            fontSmoothing: 'antialiased',
                            ':-webkit-autofill': { color: '#AAA' },
                            '::placeholder': { color: '#AAA' },
                          },
                        },
                      }}
                    />
                  </div>
                </ControlledInput>
              </ControlledError>
            </Grid>
            <Grid item={true} xl={12} lg={12} className={classes.inputSeparator}>
              <ControlledError
                show={!!errors.nameOnCard}
                error={getConditionalDefaultValue(errors?.nameOnCard === 'is required', 'Name on card is required.', errors?.nameOnCard)}
              >
                <ControlledInput label="Name On Card">
                  <TextField
                    variant="outlined"
                    placeholder="Name on card"
                    type="text"
                    autoComplete="off"
                    fullWidth={true}
                    name="nameOnCard"
                    required={formRules.nameOnCard.required}
                    value={model.nameOnCard || ''}
                    onChange={onChangeHandler}
                    error={!!errors.nameOnCard}
                    inputProps={{
                      'data-testid': 'name-on-card',
                    }}
                  />
                </ControlledInput>
              </ControlledError>
            </Grid>
            <Grid item={true} xl={12} lg={12} className={classes.inputSeparator}>
              <ControlledError
                show={!!errors.countryOrRegion}
                error={getConditionalDefaultValue(errors?.countryOrRegion === 'is required', 'Country or region is required.', errors?.countryOrRegion)}
              >
                <ControlledInput label="Country Or Region">
                  <TextField
                    variant="outlined"
                    placeholder="Country or region"
                    type="text"
                    autoComplete="off"
                    name="countryOrRegion"
                    fullWidth={true}
                    error={!!errors.countryOrRegion}
                    required={formRules.countryOrRegion.required}
                    value={model.countryOrRegion || ''}
                    onChange={onChangeHandler}
                    inputProps={{
                      'data-testid': 'country-or-region',
                    }}
                  />
                </ControlledInput>
              </ControlledError>
            </Grid>
            <Grid item={true} xl={12} lg={12} className={classes.inputSeparator}>
              <ButtonLoader
                data-testid="save-payment-method-btn"
                color="primary"
                variant="contained"
                size="large"
                type="submit"
                loadingText="Saving..."
                fullWidth={true}
                isLoading={isProcessing}
                text={getConditionalDefaultValue(currentPaymentMethod.brand, 'Update Payment Method', 'Save Card Information')}
                onClick={onSubmit}
              />
            </Grid>
          </>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default memo(CreditCard);
