import { shallow } from 'enzyme';
import React from 'react';
import { StationRoot } from './StationRoot';

describe('StationRoot', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(<StationRoot />);

    expect(wrapper).toBeTruthy();
  });
});
