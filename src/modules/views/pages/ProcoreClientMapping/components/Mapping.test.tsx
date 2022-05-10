import React from 'react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { getInitialState } from 'test/rootState';
import { render, RenderResult, act, fireEvent, getByText, queryByText } from '@testing-library/react';

import Mapping, { IMappingProps, noOption } from './Mapping';
import { ProcoreMappingStatus } from '../../../../models/procore';

const MockData = [
  {
    id: 'f3-abf0-9dc9978ed6a4-1',
    name: '45 Park Place',
    status: ProcoreMappingStatus.NO,
    mapId: null,
    extraId: 'TPIN: 12-4774870',
    isDisabled: false,
  },
  {
    id: 'f3-abf0-9dc9978ed6a4-2',
    name: '55 Hudson Yards',
    status: ProcoreMappingStatus.MAPPED,
    mapId: 'f3-abf0-9dc9978ed6a4-3',
    extraId: 'TPIN: 12-4774871',
    isDisabled: false,
  },
  {
    id: 'f3-abf0-9dc9978ed6a4-3',
    name: '111 & 141',
    status: ProcoreMappingStatus.MAPPED,
    mapId: 'f3-abf0-9dc9978ed6a4-4',
    extraId: 'TPIN: 12-4774872',
    isDisabled: false,
  },
  {
    id: 'f3-abf0-9dc9978ed6a4-4',
    name: '300 Lafayette',
    status: ProcoreMappingStatus.NO,
    mapId: null,
    extraId: 'TPIN: 12-4774873',
    isDisabled: false,
  },
];

const MockDataWithSuggestion = [
  {
    id: 'f3-abf0-9dc9978ed6a4-2',
    name: '55 Hudson Yards',
    status: ProcoreMappingStatus.SUGGESTED,
    mapId: 'f3-abf0-9dc9978ed6a4-3',
    extraId: 'TPIN: 12-4774871',
    isDisabled: false,
  },
  {
    id: 'f3-abf0-9dc9978ed6a4-3',
    name: '111 & 141',
    status: ProcoreMappingStatus.MAPPED,
    mapId: 'f3-abf0-9dc9978ed6a4-4',
    extraId: 'TPIN: 12-4774872',
    isDisabled: false,
  },
];

const MockOptions = [
  {
    id: 'f3-abf0-9dc9978ed6a4-2',
    name: '45 Park Place',
    extraId: 'TPIN: 12-4774870',
  },
  {
    id: 'f3-abf0-9dc9978ed6a4-3',
    name: '55 Hudson Yards',
    extraId: null,
  },
  {
    id: 'f3-abf0-9dc9978ed6a4-4',
    name: '111 & 141',
    extraId: 'TPIN: 12-4774872',
  },
  {
    id: 'f3-abf0-9dc9978ed6a4-5',
    name: '300 Lafayette',
    extraId: 'TPIN: 12-4774873',
  },
];

describe('Procore Mapping Component', () => {
  let wrapper: RenderResult;
  let props: IMappingProps;

  describe('With Suggested Mappings', () => {
    beforeEach(() => {
      props = {
        options: MockOptions,
        items: MockDataWithSuggestion,
        onSave: jest.fn(),
      };
    });

    it('should render with the button save enabled to save suggestions', async () => {
      wrapper = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <Mapping {...props} />
        </Provider>
      );
      const buttonSaveInitial = await wrapper.findByTestId('save-mapping-btn');
      expect(buttonSaveInitial.className).not.toContain('Mui-disabled');
    });

    it('should call the onSave callback with the right parameters', async () => {
      wrapper = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <Mapping {...props} />
        </Provider>
      );
      const buttonSave = await wrapper.findByTestId('save-mapping-btn');
      const toSaveMapping1 = MockDataWithSuggestion[0];
      const toSaveMapping2 = MockDataWithSuggestion[1];
      const firstRowSelect = wrapper.getAllByTestId('procore-map-select')[1];

      await act(async () => {
        await fireEvent.keyDown(firstRowSelect, { key: 'ArrowDown' });
        fireEvent.click(wrapper.getByText(noOption.name));
      });
      await act(async () => {
        fireEvent.click(buttonSave);
      });

      expect(props.onSave).toHaveBeenCalledWith([
        { itemId: toSaveMapping1.id, disabled: false, mapId: toSaveMapping1.mapId },
        { itemId: toSaveMapping2.id, disabled: false, mapId: null },
      ]);
    });

    it('should call the onSave callback with the right parameters if one mapping is cleared', async () => {
      wrapper = render(<Mapping {...props} />);
      const buttonSave = await wrapper.findByTestId('save-mapping-btn');
      const toSaveMapping1 = MockDataWithSuggestion[0];

      await act(async () => {
        fireEvent.click(wrapper.getAllByTitle('Clear')[0]);
      });
      await act(async () => {
        fireEvent.click(buttonSave);
      });

      expect(props.onSave).toHaveBeenCalledWith([{ itemId: toSaveMapping1.id, mapId: null, disabled: false }]);
    });

    it('should call the onSave callback with the right parameters if the input text is cleared but no new option is selected', async () => {
      wrapper = render(<Mapping {...props} />);
      const buttonSave = await wrapper.findByTestId('save-mapping-btn');
      const toSaveMapping1 = MockDataWithSuggestion[0];

      await act(async () => {
        fireEvent.change(wrapper.getAllByTestId('procore-map-select-input')[0].querySelector('input'), { target: { value: '' } });
      });
      await act(async () => {
        fireEvent.click(buttonSave);
      });

      expect(props.onSave).toHaveBeenCalledWith([{ itemId: toSaveMapping1.id, mapId: toSaveMapping1.mapId, disabled: false }]);
    });

    it('should remove the suggested label if the selected option is not the suggested', async () => {
      wrapper = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <Mapping {...props} />
        </Provider>
      );
      // 55 Hudson Yard - suggested mapping
      const firstRowSelect = wrapper.getAllByTestId('procore-map-select')[0];
      const firstRow = wrapper.getAllByTestId('procore-map-row')[0];
      const mappedBefore = wrapper.getAllByTestId('procore-map-status-icon')[0];

      expect(mappedBefore.getAttribute('title')).toEqual('Mapped');
      expect(getByText(firstRow, 'Suggested Mapping')).toBeTruthy();

      await act(async () => {
        await fireEvent.keyDown(firstRowSelect, { key: 'ArrowDown' });
        const option45ParkOption = MockOptions[0];
        fireEvent.click(wrapper.getByText(option45ParkOption.name));
      });

      const firstRowAfter = wrapper.getAllByTestId('procore-map-row')[0];
      const mappedAfter = wrapper.getAllByTestId('procore-map-status-icon')[0];

      expect(mappedAfter.getAttribute('title')).toEqual('Mapped');
      expect(queryByText(firstRowAfter, 'Suggested Mapping')).toBeNull();
    });
  });

  describe('Without Suggested Mappings', () => {
    beforeEach(() => {
      props = {
        options: MockOptions,
        items: MockData,
        onSave: jest.fn(),
      };
    });

    it('should render with the button save disabled', async () => {
      wrapper = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <Mapping {...props} />
        </Provider>
      );
      const buttonSaveInitial = await wrapper.findByTestId('save-mapping-btn');
      expect(buttonSaveInitial.className).toContain('Mui-disabled');
    });

    it('should render an updated template for vendorMode', () => {
      wrapper = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <Mapping {...{ ...props, vendorMode: true }} />
        </Provider>
      );
      const vendorLabel = wrapper.findByText('Vendor ID');
      const clientNameLabel = wrapper.findByText('Client Name');
      expect(vendorLabel).toBeDefined();
      expect(clientNameLabel).toBeDefined();
    });

    it('should render the correct icon on each row', async () => {
      wrapper = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <Mapping {...props} />
        </Provider>
      );

      const mapped = wrapper.getAllByTestId('procore-map-status-icon');

      expect(mapped[0].getAttribute('title')).toEqual('Not Mapped');
      expect(mapped[1].getAttribute('title')).toEqual('Not Mapped');
      expect(mapped[2].getAttribute('title')).toEqual('Saved');
      expect(mapped[3].getAttribute('title')).toEqual('Saved');
    });

    it('should change the icon if an option is selected on a row', async () => {
      wrapper = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <Mapping {...props} />
        </Provider>
      );
      // 45 park place item - not yet mapped
      const firstRowSelect = wrapper.getAllByTestId('procore-map-select');
      const mappedBefore = wrapper.getAllByTestId('procore-map-status-icon');
      const buttonSaveInitial = await wrapper.findByTestId('save-mapping-btn');

      expect(mappedBefore[0].getAttribute('title')).toEqual('Not Mapped');
      expect(mappedBefore[1].getAttribute('title')).toEqual('Not Mapped');
      expect(mappedBefore[2].getAttribute('title')).toEqual('Saved');
      expect(mappedBefore[3].getAttribute('title')).toEqual('Saved');
      expect(buttonSaveInitial.className).toContain('Mui-disabled');

      await act(async () => {
        // Fire select 45 park place option
        const option45ParkOption = MockOptions[0];
        await act(async () => {
          await fireEvent.keyDown(firstRowSelect[0], { key: 'ArrowDown' });
          const all = wrapper.getAllByText(option45ParkOption.name);
          fireEvent.click(all[all.length - 1]);
        });
        await act(async () => {
          await fireEvent.keyDown(firstRowSelect[1], { key: 'ArrowDown' });
          const all = wrapper.getAllByText(noOption.name);
          fireEvent.click(all[all.length - 1]);
        });
        await act(async () => {
          await fireEvent.keyDown(firstRowSelect[2], { key: 'ArrowDown' });
          const all = wrapper.getAllByText(noOption.name);
          fireEvent.click(all[all.length - 1]);
        });
      });

      const mappedAfter = wrapper.getAllByTestId('procore-map-status-icon');

      const buttonSave = await wrapper.findByTestId('save-mapping-btn');
      expect(mappedAfter[0].getAttribute('title')).toEqual('Mapped');
      expect(mappedAfter[1].getAttribute('title')).toEqual('Not Mapped');
      expect(mappedAfter[2].getAttribute('title')).toEqual('Not Mapped');
      expect(mappedAfter[3].getAttribute('title')).toEqual('Saved');
      expect(buttonSave.className).not.toContain('Mui-disabled');
    });

    it('should change the icon back to saved if the user select the option originally cames from the server', async () => {
      wrapper = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <Mapping {...props} />)
        </Provider>
      );
      const firstRowSelect = wrapper.getAllByTestId('procore-map-select');

      // 45 park place item - not yet mapped
      const option45ParkOption = MockOptions[0];
      const select45ParkOption = firstRowSelect[2];
      // 55 Hudson Yards item - Mapped
      const option55HudsonYardsOption = MockOptions[1];
      const select55HudsonYardsOption = firstRowSelect[3];

      const mappedBefore = wrapper.getAllByTestId('procore-map-status-icon');
      expect(mappedBefore[0].getAttribute('title')).toEqual('Not Mapped');
      expect(mappedBefore[1].getAttribute('title')).toEqual('Not Mapped');
      expect(mappedBefore[2].getAttribute('title')).toEqual('Saved');
      expect(mappedBefore[3].getAttribute('title')).toEqual('Saved');

      await act(async () => {
        // Fire select 45 park place option
        // Fire 55 Hudson Yards item - to not mapped
        await act(async () => {
          await fireEvent.keyDown(select45ParkOption, { key: 'ArrowDown' });
          const all = wrapper.getAllByText(option45ParkOption.name);
          fireEvent.click(all[all.length - 1]);
        });
        await act(async () => {
          await fireEvent.keyDown(select55HudsonYardsOption, { key: 'ArrowDown' });
          const all = wrapper.getAllByText(noOption.name);
          fireEvent.click(all[all.length - 1]);
        });
      });

      const mappedAfter = wrapper.getAllByTestId('procore-map-status-icon');
      expect(mappedAfter[0].getAttribute('title')).toEqual('Not Mapped');
      expect(mappedAfter[1].getAttribute('title')).toEqual('Not Mapped');
      expect(mappedAfter[2].getAttribute('title')).toEqual('Mapped');
      expect(mappedAfter[3].getAttribute('title')).toEqual('Not Mapped');

      await act(async () => {
        // Fire select 45 park place option

        await act(async () => {
          await fireEvent.keyDown(select45ParkOption, { key: 'ArrowDown' });
          const all = wrapper.getAllByText(noOption.name);
          fireEvent.click(all[all.length - 1]);
        });
        await act(async () => {
          await fireEvent.keyDown(select55HudsonYardsOption, { key: 'ArrowDown' });
          const all = wrapper.getAllByText(option55HudsonYardsOption.name);
          fireEvent.click(all[all.length - 1]);
        });
      });

      const mappedRollBack = wrapper.getAllByTestId('procore-map-status-icon');
      expect(mappedRollBack[0].getAttribute('title')).toEqual('Not Mapped');
      expect(mappedRollBack[1].getAttribute('title')).toEqual('Not Mapped');
      expect(mappedRollBack[2].getAttribute('title')).toEqual('Not Mapped');
      expect(mappedRollBack[3].getAttribute('title')).toEqual('Saved');
    });
  });

  describe('Disable Mappings', () => {
    beforeEach(() => {
      props = {
        options: MockOptions,
        items: MockData,
        onSave: jest.fn(),
      };
    });

    it('should call the onSave callback with the right parameters if one mapping is disabled', async () => {
      wrapper = render(<Mapping {...props} />);
      const buttonSave = await wrapper.findByTestId('save-mapping-btn');
      const toSaveMapping = MockData[3];

      await act(async () => {
        fireEvent.click(wrapper.getAllByTestId('procore-disable-map-input')[0].querySelector('input'));
      });
      await act(async () => {
        fireEvent.click(buttonSave);
      });

      expect(props.onSave).toHaveBeenCalledWith([{ itemId: toSaveMapping.id, mapId: null, disabled: true }]);
    });

    it('should be able to enable a disabled mapping', async () => {
      props.items = [
        {
          id: 'f3-abf0-9dc9978ed6a4-1',
          name: '45 Park Place',
          status: ProcoreMappingStatus.NO,
          mapId: null,
          extraId: 'TPIN: 12-4774870',
          isDisabled: true,
        },
      ];
      wrapper = render(<Mapping {...props} />);
      const buttonSave = await wrapper.findByTestId('save-mapping-btn');

      await act(async () => {
        fireEvent.click(wrapper.getAllByTestId('procore-disable-map-input')[0].querySelector('input'));
      });
      await act(async () => {
        fireEvent.click(buttonSave);
      });

      expect(props.onSave).toHaveBeenCalledWith([{ itemId: 'f3-abf0-9dc9978ed6a4-1', mapId: null, disabled: false }]);
    });

    it('should render mapping as disabled if that is the stored setting, and should render after not mapped items', async () => {
      props.items[0].isDisabled = true;
      props.items[1].isDisabled = true;
      wrapper = render(<Mapping {...props} />);

      const disabledCheck1 = wrapper.getAllByTestId('procore-disable-map-input')[1];
      expect(disabledCheck1.classList).not.toContain('Mui-checked');
      const disabledSelect1 = wrapper.getAllByTestId('procore-map-select-input')[1].firstChild;
      expect(disabledSelect1.classList).toContain('Mui-disabled');

      await act(async () => {
        fireEvent.click(wrapper.getAllByTestId('procore-disable-map-input')[1].querySelector('input'));
      });

      expect(disabledCheck1.classList).toContain('Mui-checked');
      expect(disabledSelect1.classList).not.toContain('Mui-disabled');
    });
  });
});
