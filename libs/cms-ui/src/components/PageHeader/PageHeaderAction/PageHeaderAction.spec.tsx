import { shallow } from 'enzyme';
import React from 'react';
import { PageHeaderAction } from './PageHeaderAction';
import { noop } from 'helpers/utils';

describe('PageHeaderAction', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(
      <PageHeaderAction icon={'test'} alt={'alt'} onClick={noop} />,
    );

    expect(wrapper).toBeTruthy();
  });

  it('sets the icon and alt', () => {
    const wrapper = shallow(
      <PageHeaderAction icon={'test'} alt={'alt'} onClick={noop} />,
    );

    expect(wrapper.find('img').prop('src')).toEqual('test');
    expect(wrapper.find('img').prop('alt')).toEqual('alt');
  });

  it('raises onClick', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <PageHeaderAction icon={'test'} alt={'alt'} onClick={spy} />,
    );

    const img = wrapper.find('img');
    img.simulate('click');

    expect(spy).toHaveBeenCalled();
  });
});
