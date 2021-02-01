import { shallow } from 'enzyme';
import React from 'react';
import { ErrorStation } from './ErrorStation';
jest.mock('hooks/useLabeledCrumb/useLabeledCrumb');

describe('ErrorStation', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(
      <ErrorStation
        error={new Error('')}
        errorInfo={{ componentStack: 'stack' }}
      />,
    );
    expect(wrapper).toBeTruthy();
  });
});
