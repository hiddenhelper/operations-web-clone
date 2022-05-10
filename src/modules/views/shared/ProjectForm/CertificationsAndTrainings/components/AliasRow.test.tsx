import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { getCertification_1 } from 'test/entities';
import AliasRow, { IAliasRowProps } from './AliasRow';

describe('AliasRow', () => {
  let props: IAliasRowProps;

  beforeEach(() => {
    props = {
      getErrors: jest.fn(),
      index: 0,
      item: { ...getCertification_1(), alias: 'Test alias' },
      onAliasUpdated: jest.fn(),
      onDeleteItem: jest.fn(),
    };
  });

  it('should render ', async () => {
    const wrapper = render(<AliasRow {...props} />);
    await wrapper.getByText(getCertification_1().name);
  });

  it('should show delete item on alias input focus', async () => {
    const wrapper = render(<AliasRow {...props} />);
    const aliasInput = await wrapper.getByTestId('item-alias');

    await fireEvent.focus(aliasInput.querySelector('input'));
    const deleteItemButton = await wrapper.getByTestId('delete-item-button');
    fireEvent.click(deleteItemButton);

    expect(props.onDeleteItem).toHaveBeenCalledWith(props.item.id);

    await fireEvent.blur(aliasInput.querySelector('input'));
  });

  it('should show delete item on row hover', async () => {
    const wrapper = render(<AliasRow {...props} />);

    await fireEvent.mouseEnter(wrapper.getByTestId('alias-row'));
    const deleteItemButton = await wrapper.getByTestId('delete-item-button');
    fireEvent.click(deleteItemButton);

    expect(props.onDeleteItem).toHaveBeenCalledWith(props.item.id);

    await fireEvent.mouseLeave(wrapper.getByTestId('alias-row'));
  });

  it('should call update function on alias updated', async () => {
    const wrapper = render(<AliasRow {...props} />);

    const aliasInput = await wrapper.getByTestId('item-alias');
    await fireEvent.change(aliasInput.querySelector('input'), { target: { value: 'New alias' } });

    expect(props.onAliasUpdated).toHaveBeenCalledWith(getCertification_1().id, 'New alias');
  });

  it('should render alias arrors', async () => {
    props.getErrors = jest.fn().mockReturnValue('Error on alias');
    const wrapper = render(<AliasRow {...props} />);
    expect(wrapper.getAllByText('Error on alias').length).toBe(2);
  });
});
