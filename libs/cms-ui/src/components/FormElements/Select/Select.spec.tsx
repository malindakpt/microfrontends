import { shallow } from 'enzyme';
import React from 'react';
import { Select } from './Select';

describe('Select', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(<Select name={'test-name'} />);

    expect(wrapper).toBeTruthy();
  });

  it('displays a label', () => {
    const mockLabel = 'mockLabel';
    const wrapper = shallow(<Select name={'test-name'} label={mockLabel} />);

    const label = wrapper.find('label');

    expect(label.text()).toBe(mockLabel);
  });

  it('uses optional props when passed in', () => {
    const mockProps = {
      autoFocus: true,
      children: [],
      className: '',
      disabled: true,
      id: 'test-id',
      name: 'test-name',
      onBlur: () => null,
      onChange: () => null,
      onFocus: () => null,
    } as {};

    const wrapper = shallow(<Select name="test-name" {...mockProps} />);

    const select = wrapper.find('select');

    expect(select.props()).toEqual(mockProps);
  });

  it('sets select field using the value prop and emits updated values', () => {
    const spy = jest.fn();
    const mockValue = 'test-value';
    const mockValueUpdated = 'updated-test-value';
    const wrapper = shallow(
      <Select name="test-name" value={mockValue} onChange={spy} />,
    );

    const select = wrapper.find('select');

    expect(select.prop('value')).toEqual(mockValue);

    select.simulate('change', { target: { value: mockValueUpdated } });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ target: { value: mockValueUpdated } });
  });

  it('raises change, blur, and focus events', () => {
    const changeSpy = jest.fn();
    const blurSpy = jest.fn();
    const focusSpy = jest.fn();
    const wrapper = shallow(
      <Select
        name={'test-name'}
        onChange={changeSpy}
        onBlur={blurSpy}
        onFocus={focusSpy}
      />,
    );

    const select = wrapper.find('select');

    select.simulate('change');
    expect(changeSpy).toHaveBeenCalledTimes(1);

    select.simulate('blur');
    expect(blurSpy).toHaveBeenCalledTimes(1);

    select.simulate('focus');
    expect(focusSpy).toHaveBeenCalledTimes(1);
  });

  it('applies error styling and renders error message when an error is passed', () => {
    const mockErrorMessage = 'test-error-message';
    const wrapper = shallow(
      <Select name={'test-name'} error={mockErrorMessage} />,
    );

    const errorMsg = wrapper.find('small');
    const errorStyling = wrapper.find('select');

    expect(errorMsg.text()).toBe(mockErrorMessage);
    expect(errorStyling.hasClass('hasError')).toEqual(true);
  });
});
