import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { act } from 'react-dom/test-utils';
import { createMockStore } from 'redux-test-utils';
import { render, fireEvent } from '@testing-library/react';
import { LANG } from '../../../../../constants';
import { clientStepMap, ClientStep } from '../../../../models/client';
import NavigationTop, { INavigationTopProps } from './NavigationTop';
import { getInitialState } from '../../../../../test/rootState';
import { useHideScroll } from '../../../../../utils/useHideScroll';

jest.mock('../../../../../utils/useHideScroll', () => ({
  useHideScroll: jest.fn().mockImplementation(() => ({ isScrollHided: false })),
}));

describe('NavigationTop', () => {
  let props: INavigationTopProps;

  beforeEach(() => {
    props = {
      breadCrumb: { route: '/', title: 'NavTitle', pluralTitle: 'NavTitles' },
      step: clientStepMap[ClientStep.GENERAL_INFORMATION],
      stepIndex: 0,
      hasChanges: false,
      status: 'Draft',
      loadSuccess: true,
      isLoading: undefined,
      isSaveLoading: undefined,
      onNextStep: jest.fn(),
      onDiscard: jest.fn(),
      onSave: jest.fn(),
    };
  });

  it('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <NavigationTop {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render without scroll', () => {
    (useHideScroll as any).mockImplementation(() => ({ isScrollHided: true }));
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <NavigationTop {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should call onNextStep from props when Next button is clicked', async () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <NavigationTop {...props} />
        </MemoryRouter>
      </Provider>
    );
    await act(async () => {
      await fireEvent.click(wrapper.getByText('Next'));
    });
    expect(props.onNextStep).toHaveBeenCalled();
  });

  describe('hasChanges', () => {
    let wrapper;
    beforeEach(() => {
      props.hasChanges = true;
      wrapper = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <NavigationTop {...props} />
          </MemoryRouter>
        </Provider>
      );
    });

    it('should render discard and save buttons', () => {
      expect(wrapper.container).toMatchSnapshot();
    });

    it('should call onDiscard from props when Discard Changes button is clicked', async () => {
      await act(async () => {
        await fireEvent.click(wrapper.getByText('Discard Changes'));
      });
      expect(props.onDiscard).toHaveBeenCalled();
      expect(wrapper.findAllByText(LANG.EN.NAVIGATION_TOP.MESSAGE.DISCARD)).toBeTruthy();
    });

    it('should call onSave from props when Save Changes button is clicked', async () => {
      await act(async () => {
        await fireEvent.click(wrapper.getByText('Save Changes'));
      });
      expect(props.onSave).toHaveBeenCalled();
      expect(wrapper.findAllByText(LANG.EN.NAVIGATION_TOP.MESSAGE.SAVE)).toBeTruthy();
    });

    it('should hide message when change step', async () => {
      wrapper = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <NavigationTop {...props} />
          </MemoryRouter>
        </Provider>
      );
      props.stepIndex = 1;
      wrapper.rerender(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <NavigationTop {...props} />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.queryByTestId('action-message-wrapper')).toBeNull();
    });
  });
});
