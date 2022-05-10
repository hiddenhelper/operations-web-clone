import { renderHook, act } from '@testing-library/react-hooks';
import { useForm } from './useForm';
import { IFormRules } from './useValidator';

const formData = {
  id: null,
  name: '',
};

const fieldRules: IFormRules = {
  name: {
    required: false,
    rules: [({ value }) => value.length < 5 && 'custom less than 5'],
  },
};

describe('useForm', () => {
  const onSubmit = jest.fn();

  describe('onSubmit', () => {
    it('should return form data', () => {
      const { result } = renderHook(
        () =>
          useForm({
            initValues: formData,
            formRules: fieldRules,
            onSubmitCallback: onSubmit,
          }),
        [] as any
      );
      act(() => {
        result.current.onChange(prevState => ({ ...prevState, name: 'some value' }));
      });
      act(() => {
        result.current.onSubmit();
      });
      expect(onSubmit).toHaveBeenCalledWith({
        id: null,
        name: 'some value',
      });
      expect(result.current.hasChanges).toBeFalsy();
    });

    it('should not return data', () => {
      const { result } = renderHook(
        () =>
          useForm({
            initValues: formData,
            formRules: fieldRules,
            onSubmitCallback: onSubmit,
          }),
        [] as any
      );
      act(() => {
        result.current.onChange(prevState => ({ ...prevState, name: 'tes' }));
      });
      act(() => {
        result.current.onSubmit();
      });
      expect(onSubmit).not.toHaveBeenCalledWith({
        id: null,
        name: 'tes',
      });
      expect(result.current.errors).toEqual({ name: 'custom less than 5' });
      expect(result.current.hasChanges).toBeTruthy();
    });
  });

  describe('onChange', () => {
    it('should update field', () => {
      const { result } = renderHook(
        () =>
          useForm({
            initValues: formData,
            formRules: fieldRules,
            onSubmitCallback: onSubmit,
          }),
        [] as any
      );
      act(() => {
        result.current.onChange(prevState => ({ ...prevState, name: 'some value' }));
      });
      expect(result.current.model).toEqual({ id: null, name: 'some value' });
      expect(result.current.hasChanges).toBeTruthy();
    });
  });

  describe('onValidate', () => {
    let res;
    it('should validate a field', () => {
      const { result } = renderHook(
        () =>
          useForm({
            initValues: formData,
            formRules: fieldRules,
            onSubmitCallback: onSubmit,
          }),
        [] as any
      );
      act(() => {
        result.current.onChange(prevState => ({ ...prevState, name: 'name', value: 'text' }));
      });
      act(() => {
        res = result.current.onValidate('name');
      });
      expect(res).toEqual('custom less than 5');
    });
  });

  describe('resetErrors', () => {
    it('should reset errors', () => {
      const { result } = renderHook(
        () =>
          useForm({
            initValues: formData,
            formRules: fieldRules,
            onSubmitCallback: onSubmit,
          }),
        [] as any
      );
      act(() => {
        result.current.resetErrors();
      });
      expect(result.current.errors).toEqual({});
    });
  });

  describe('updateRules', () => {
    it('should update Rules', () => {
      const { result } = renderHook(
        () =>
          useForm({
            initValues: formData,
            formRules: fieldRules,
            onSubmitCallback: onSubmit,
          }),
        [] as any
      );
      const updatedRules = { ...fieldRules, name: { ...fieldRules.name, required: true } };
      act(() => {
        result.current.updateRules(prevState => ({ ...prevState, ...updatedRules } as any));
      });
      expect(result.current.formRules).toEqual(updatedRules);
    });
  });

  describe('discardChanges', () => {
    it('should update Rules', () => {
      const { result } = renderHook(
        () =>
          useForm({
            initValues: formData,
            formRules: fieldRules,
            onSubmitCallback: onSubmit,
          }),
        [] as any
      );
      act(() => {
        result.current.discardChanges(prevState => ({ ...prevState, name: 'test' } as any));
      });
      expect(result.current.model).toEqual({ id: null, name: 'test' });
      expect(result.current.hasChanges).toBeFalsy();
    });
  });

  describe('update', () => {
    it('should update field', () => {
      const { result } = renderHook(
        () =>
          useForm({
            initValues: formData,
            formRules: fieldRules,
            onSubmitCallback: onSubmit,
          }),
        [] as any
      );
      act(() => {
        result.current.update(prevState => ({ ...prevState, name: 'some value' }));
      });
      expect(result.current.model).toEqual({ id: null, name: 'some value' });
      expect(result.current.hasChanges).toBeFalsy();
    });
  });
});
