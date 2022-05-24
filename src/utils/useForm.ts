import { useCallback, useState } from 'react';
import { useValidator, IFormRules, IErrorMessage } from './useValidator';

export interface IUseFormHandlerProps<FormType> {
  initValues: FormType;
  formRules: IFormRules;
  onSubmitCallback: (sanitizedForm: any) => void;
  onChangeCallback?: (data: FormType) => void;
  onDiscardChangesCallback?: (model: FormType) => void;
}

export interface IUseFormHandlerState<FormType> {
  model: FormType;
  snap: FormType;
  errors: IErrorMessage;
  formRules: IFormRules;
}

export function useForm<FormType>({ initValues: model, formRules, onSubmitCallback, onDiscardChangesCallback }: IUseFormHandlerProps<FormType>) {
  const { validateForm, validateField } = useValidator<FormType>();
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [state, setState] = useState<IUseFormHandlerState<FormType>>(() => ({
    errors: {},
    model,
    snap: model,
    formRules,
  }));

  const onValidate = useCallback(
    name => {
      const error = validateField(state.model, name, state.formRules[name]);
      setState(prevState => ({ ...prevState, errors: { ...prevState.errors, [name]: error[name] ? error[name] : undefined } }));
      return error[name] ? error[name] : false;
    },
    [validateField, state.model, state.formRules]
  );

  const discardChanges = useCallback(
    (s?: FormType | ((p: FormType) => FormType), callback?: () => void) => {
      let updatedModel = {} as FormType;
      setState(prevState => {
        updatedModel = typeof s === 'function' ? (s as Function)(prevState.model) : prevState.snap;

        return {
          ...prevState,
          model: updatedModel,
        };
      });
      setHasChanges(false);
      if (onDiscardChangesCallback) {
        onDiscardChangesCallback(updatedModel);
      }
    },
    [setState, setHasChanges, onDiscardChangesCallback]
  );

  const onSubmit = useCallback(() => {
    const formErrors = validateForm({ model: state.model, constraints: state.formRules });
    setState(prevState => ({ ...prevState, errors: formErrors }));
    if (Object.keys(formErrors).length === 0) {
      onSubmitCallback(state.model);
      setHasChanges(false);
    }
    return Object.keys(formErrors).length > 0 ? formErrors : false;
  }, [onSubmitCallback, validateForm, setState, setHasChanges, state.formRules, state.model]);

  const update = useCallback(
    (s: FormType | ((p: FormType) => FormType)) => {
      let key = 'address';
      setState(prevState => ({
        ...prevState,
        model: typeof s === 'function' ? (s as Function)(prevState.model) : s[key] ? { ...s, ...s[key] } : s,
        snap: typeof s === 'function' ? (s as Function)(prevState.model) : s[key] ? { ...s, ...s[key] } : s,
      }));
    },
    [setState]
  );

  const onChange = useCallback(
    (s: FormType | ((p: FormType) => FormType)) => {
      let key = 'address';
      setState(prevState => ({
        ...prevState,
        model: typeof s === 'function' ? (s as Function)(prevState.model) : s[key] ? { ...s, ...s[key] } : s,
      }));
      /* istanbul ignore else */
      if (!hasChanges) setHasChanges(true);
    },
    [hasChanges, setState, setHasChanges]
  );

  const resetErrors = useCallback(() => {
    setState(prevState => ({ ...prevState, errors: {} }));
  }, [setState]);

  const updateRules = useCallback(
    (s: IFormRules | ((p: IFormRules) => FormType)) =>
      setState(prevState => ({ ...prevState, formRules: typeof s === 'function' ? (s as Function)(prevState.formRules) : s })),
    [setState]
  );

  return {
    formRules: state.formRules,
    model: state.model,
    errors: state.errors,
    hasChanges,
    onSubmit,
    onValidate,
    onChange,
    resetErrors,
    update,
    updateRules,
    discardChanges,
    setHasChanges,
  };
}
