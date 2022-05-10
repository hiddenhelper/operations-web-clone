import React from 'react';
import { render } from '@testing-library/react';

import { ProjectModel } from '../../../models';
import RolePill, { IRolePillProps } from './RolePill';

describe('RolePill', () => {
  let props: IRolePillProps;

  beforeEach(() => {
    props = {
      role: ProjectModel.CompanyRole.DEVELOPER,
    };
  });

  it('should render DEV', () => {
    const { container } = render(<RolePill {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should render GC', () => {
    props.role = ProjectModel.CompanyRole.GENERAL_CONTRACTOR;
    const { container } = render(<RolePill {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should render SUB', () => {
    props.role = ProjectModel.CompanyRole.SUB_CONTRACTOR;
    const { container } = render(<RolePill {...props} />);
    expect(container).toMatchSnapshot();
  });
});
