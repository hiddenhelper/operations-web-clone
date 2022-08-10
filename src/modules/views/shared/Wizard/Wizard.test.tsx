import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Link, useParams } from 'react-router-dom';

import { getProject_1 } from '../../../../test/entities';

import NavigationTop from '../ResourceManagement/NavigationTop';
import Wizard, { IWizardProps } from './Wizard';
import { ProjectModel } from '../../../models';
import { createMockStore } from 'redux-test-utils';
import { getInitialState } from '../../../../test/rootState';
import { Provider } from 'react-redux';
import { useHideScroll } from '../../../../utils/useHideScroll';
import { useScroll } from '../../../../utils/useScroll';
import { noop } from '../../../../utils/generalUtils';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

jest.mock('../../../../utils/useHideScroll', () => ({
  useHideScroll: jest.fn().mockImplementation(() => ({ isScrollHided: false, setHideScroll: jest.fn() })),
}));
jest.mock('../../../../utils/useScroll', () => ({
  useScroll: jest.fn().mockImplementation(() => ({ toggleClass: false })),
}));

describe('Wizard Component', () => {
  let props: IWizardProps<any>;

  beforeEach(() => {
    props = {
      completedFieldMap: {
        'general-information': { completed: 1, required: 1, title: 'General Information', order: 0 },
        review: { completed: 0, required: 0, title: 'Review', order: 1 },
      },
      route: '/somewhere',
      fallback: ProjectModel.getFallbackProject(),
      isValidForNavigation: false,
      isConfirmEnabled: true,
      isLoadSuccess: false,
      isStepper: true,
      deps: { currentEntity: getProject_1() },
      stepMap: {
        'general-info': {
          key: 'general-info',
          title: 'General Information',
          subtitle: 'Create New Project',
          hideControls: false,
          order: 0,
          fields: [{ name: 'name', required: true }],
        },
        review: {
          key: 'review',
          title: 'Review',
          subtitle: 'Review',
          hideControls: true,
          order: 1,
          fields: [],
        },
      },
      formRuleMap: {
        name: {
          required: true,
          rules: [],
        },
      },
      navigationProps: {
        id: getProject_1().id,
        step: 'general-info',
        entityId: 'uuid-182b-bdff12-a8fb5-babc2145',
        currentEntity: getProject_1(),
        currentStepKey: 'general-info',
        currentStep: {
          key: 'general-info',
          title: 'General Information',
          subtitle: 'Create New Project',
          hideControls: false,
          order: 0,
          fields: [{ name: 'name', required: true }],
        },
        setStep: jest.fn(),
      },
      loading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      renderForm: ({ model, onChange, formRules, errors }) => {
        const onChangeHandler = event => {
          event.persist();
          onChange(prevModel => ({ ...prevModel, name: event.target.value }));
        };
        return (
          <>
            <div>
              Name
              {formRules.name.required ? 'is required' : ''}
              <input data-testid="name" value={model.name || ''} type="text" onChange={onChangeHandler} />
            </div>
            <div>{errors.name}</div>
          </>
        );
      },
      renderNavigator: ({ currentStep, activeStep, hasChanged, isConfirmEnabled, onNextStep, onDiscard, onSave, onConfirm }) => {
        return (
          <NavigationTop
            breadCrumb={{
              route: '/somewhere',
              title: 'Project',
              pluralTitle: 'Projects',
            }}
            step={currentStep}
            stepIndex={activeStep}
            status={'Draft'}
            entityName={'some name'}
            hasChanges={hasChanged}
            loadSuccess={false}
            isSaveLoading={false}
            isLoading={false}
            isConfirmEnabled={isConfirmEnabled}
            onNextStep={onNextStep}
            onDiscard={onDiscard}
            onSave={onSave}
            onConfirm={onConfirm}
          />
        );
      },
      onSave: jest.fn(),
      onLoad: jest.fn(),
      navigate: jest.fn(),
      onDiscard: jest.fn(),
      onConfirm: jest.fn(),
      onLoadSuccess: jest.fn(),
      clearLoadingMap: jest.fn(),
      clearErrors: jest.fn(),
    };
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: '' }));
  });

  it.skip('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <Wizard {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it.skip('should render without scroll', () => {
    (useHideScroll as any).mockImplementationOnce(() => ({ isScrollHided: true, setHideScroll: jest.fn() }));
    (useScroll as any).mockImplementation(() => ({ toggleClass: true }));
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <Wizard {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should change step', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <Wizard {...props} />
        </MemoryRouter>
      </Provider>
    );

    props.navigationProps = {
      ...props.navigationProps,
      currentStepKey: 'review',
    };

    wrapper.rerender(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <Wizard {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(props.navigationProps.setStep).toHaveBeenCalled();
  });

  it('should navigate on Next', () => {
    props.isValidForNavigation = true;
    props.fallback = getProject_1();
    props.navigationProps = {
      ...props.navigationProps,
      currentEntity: getProject_1(),
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <Wizard {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByText('Next'));
    });

    expect(props.navigate).toHaveBeenCalledWith(`/somewhere/${getProject_1().id}/review`);
  });

  it('should call navigate when step button is clicked', () => {
    props.isValidForNavigation = true;
    props.fallback = getProject_1();
    props.navigationProps = {
      ...props.navigationProps,
      currentEntity: getProject_1(),
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <Wizard {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('step-button')[1]);
    });

    expect(props.navigate).toHaveBeenCalledWith(`/somewhere/${getProject_1().id}/review`);
  });

  it('should save', () => {
    props.isValidForNavigation = true;
    props.navigationProps = {
      ...props.navigationProps,
      currentEntity: getProject_1(),
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <Wizard {...props} />
        </MemoryRouter>
      </Provider>
    );

    const nameInput = wrapper.getByTestId('name');

    act(() => {
      fireEvent.change(nameInput, {
        persist: noop,
        target: { name: 'name', value: 'some value' },
      });
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Save Changes'));
    });

    expect(props.onSave).toHaveBeenCalled();
  });

  it('should NOT navigate when loading and click away', async () => {
    props.loading = {
      isLoading: true,
      hasError: false,
      error: undefined,
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <Link to={{ pathname: '/projects', state: { success: true } }} data-testid="link-to-another" />
          <Wizard {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('link-to-another'));
    });

    expect(props.navigate).not.toHaveBeenCalled();
  });

  it('should unMount', () => {
    const { unmount } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <Wizard {...props} />
        </MemoryRouter>
      </Provider>
    );
    unmount();
    expect(props.clearErrors).toHaveBeenCalled();
    expect(props.clearLoadingMap).toHaveBeenCalled();
  });
});
