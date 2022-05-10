import React from 'react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { render, fireEvent, act } from '@testing-library/react';
import { getInitialState } from 'test/rootState';
import ConfigureReportFrequency, { IConfigureReportFrequencyProps } from './ConfigureReportFrequency';
import { getDefaultLoading } from 'test/entities';

describe('Configure Report Frequency', () => {
  describe('With Suggested Mappings', () => {
    let props: IConfigureReportFrequencyProps;
    beforeEach(() => {
      props = {
        handleSaveProcoreReportFrequency: jest.fn(),
        procoreReportFrequency: 0,
        procoreSaveReportFrequencyLoading: getDefaultLoading(),
      };
    });

    it('should render', () => {
      const wrapper = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <ConfigureReportFrequency {...props} />
        </Provider>
      );

      expect(wrapper.container).toMatchSnapshot();
    });

    it('should open modal and close the modal', () => {
      const wrapper = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <ConfigureReportFrequency {...props} />
        </Provider>
      );
      act(() => {
        fireEvent.click(wrapper.getByTestId('action-configure-report-frequency-container'));
      });
      expect(wrapper.container).toMatchSnapshot();

      // close the modal
      act(() => {
        fireEvent.click(wrapper.getByTestId('modal-close-btn'));
      });
      expect(wrapper.container).toMatchSnapshot();
    });

    it('should change the report frequency', async () => {
      const wrapper = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <ConfigureReportFrequency {...props} />
        </Provider>
      );

      act(async () => {
        await fireEvent.click(wrapper.getByTestId('action-configure-report-frequency-container'));
      });

      const frequencySelect: any = await wrapper.getByTestId('select-report-frequency');
      await fireEvent.change(frequencySelect, { target: { value: 1, label: 'Daily / Hourly' } });
      await expect(frequencySelect.label).toBe('Daily / Hourly');
    });

    it('should call save with the right paramters', async () => {
      const wrapper = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <ConfigureReportFrequency {...props} />
        </Provider>
      );

      act(async () => {
        await fireEvent.click(wrapper.getByTestId('action-configure-report-frequency-container'));
      });
      act(async () => {
        await fireEvent.click(wrapper.getByTestId('modal-confirm-btn'));
      });
      await expect(props.handleSaveProcoreReportFrequency).toHaveBeenCalledWith(0);
    });

    it('should render the word Saving while saving the changes of the modal', () => {
      props.procoreSaveReportFrequencyLoading.isLoading = true;
      const wrapper = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <ConfigureReportFrequency {...props} />
        </Provider>
      );

      expect(wrapper.findAllByText('Saving...')).toBeDefined();
    });
    it('should render the word Error Saving if errors appears while saving the changes of the modal', () => {
      props.procoreSaveReportFrequencyLoading.hasError = true;
      const wrapper = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <ConfigureReportFrequency {...props} />
        </Provider>
      );

      expect(wrapper.findAllByText('Error Saving')).toBeDefined();
    });
  });
});
