import { shallow } from 'enzyme';
import React from 'react';
import { NotFoundStation } from './NotFoundStation';
import { useLabeledCrumb } from 'hooks/useLabeledCrumb/useLabeledCrumb';
jest.mock('hooks/useLabeledCrumb/useLabeledCrumb');

describe('NotFoundStation', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(<NotFoundStation />);
    expect(wrapper).toBeTruthy();
    expect(useLabeledCrumb).toHaveBeenCalled();
  });
});
