import * as React from 'react';
import { render } from '@testing-library/react';

import { ToastType } from '../../../models/general';
import ToastList, { IToastListProps } from './ToastList';

describe('ToastList', () => {
  global.console.error = () => null;
  global.console.warn = () => null;
  let props: IToastListProps;
  let Component;

  beforeEach(() => {
    global.console.error = () => null;
    props = {
      list: [
        { message: 'boom', type: ToastType.ERROR, _id: '1' },
        { message: 'the blah was blah succesfully. the blah was blah succesfully', type: ToastType.SUCCESS, _id: '2' },
        { message: 'something somehting', type: ToastType.INFO, _id: '3' },
        { message: 'warn something somehting', type: ToastType.WARN, _id: '4' },
      ],
    };
    Component = render(<ToastList {...props} />);
  });

  it('should render', () => {
    expect(Component.container).toMatchSnapshot();
  });
});
