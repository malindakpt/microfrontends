import { shallow, mount } from 'enzyme';
import React from 'react';
import { SingleLineText } from './SingleLineText';

describe('TextField', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(<SingleLineText name={'test-name'} />);

    expect(wrapper).toBeTruthy();
  });

  it('displays a label', () => {
    const mockLabel = 'mockLabel';
    const wrapper = shallow(
      <SingleLineText name={'test-name'} label={mockLabel} />,
    );

    const label = wrapper.find('label');

    expect(label.text()).toBe(mockLabel);
  });

  it('sets input field using the value prop and emits updated values', () => {
    const spy = jest.fn();
    const mockValue = 'test-value';
    const mockValueUpdated = 'updated-test-value';
    const wrapper = shallow(
      <SingleLineText name={'test-name'} value={mockValue} onChange={spy} />,
    );

    const input = wrapper.find('input');

    expect(input.prop('value')).toEqual(mockValue);

    input.simulate('change', { target: { value: mockValueUpdated } });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ target: { value: mockValueUpdated } });
  });

  it(`defaults to an empty string if prop value is 'null' `, () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const wrapper = shallow(<SingleLineText name={'test-name'} value={null} />);

    const input = wrapper.find('input');

    expect(input.prop('value')).toEqual('');
  });

  it(`defaults to an empty string if prop value is 'undefined' `, () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const wrapper = shallow(
      <SingleLineText name={'test-name'} value={undefined} />,
    );

    const input = wrapper.find('input');

    expect(input.prop('value')).toEqual('');
  });

  it('uses optional props when passed in', () => {
    const mockProps = {
      autoComplete: 'on',
      autoFocus: true,
      className: '',
      disabled: true,
      id: 'test-id',
      name: 'test-name',
      onBlur: () => null,
      onFocus: () => null,
      placeholder: 'test-placeholder',
      type: 'number',
      value: '',
    } as {};

    const wrapper = shallow(
      <SingleLineText name={'test-name'} {...mockProps} />,
    );

    const input = wrapper.find('input');
    const inputProps = input.props();
    expect(inputProps).toEqual(expect.objectContaining(mockProps));
  });

  it('raises change, blur, and focus events', () => {
    const changeSpy = jest.fn();
    const blurSpy = jest.fn();
    const focusSpy = jest.fn();
    const mockValue = 'test input';
    const wrapper = shallow(
      <SingleLineText
        name={'test-name'}
        onChange={changeSpy}
        onBlur={blurSpy}
        onFocus={focusSpy}
      />,
    );

    const input = wrapper.find('input');

    input.simulate('change', { target: { value: mockValue } });
    expect(changeSpy).toHaveBeenCalledTimes(1);

    input.simulate('blur');
    expect(blurSpy).toHaveBeenCalledTimes(1);

    input.simulate('focus');
    expect(focusSpy).toHaveBeenCalledTimes(1);
  });

  it('applies error styling and renders error message when an error is passed', () => {
    const mockErrorMessage = 'test-error-message';
    const wrapper = shallow(
      <SingleLineText name={'test-name'} error={mockErrorMessage} />,
    );

    const errorMsg = wrapper.find('small');
    const errorStyling = wrapper.find('input');

    expect(errorMsg.text()).toBe(mockErrorMessage);
    expect(errorStyling.hasClass('hasError')).toEqual(true);
  });

  it('show a dummy value as the input value, when type is password', () => {
    const dummyPwd = '0000000000';
    const wrapper = mount(
      <SingleLineText name={'test-pwd'} type="password" value="1234" />,
    );

    const input = wrapper.find('input');

    expect(input.prop('value')).toBe(dummyPwd);
  });

  it('when user changes the value it should be displayed, when type is password', () => {
    const initialVal = undefined;
    const mockValueUpdated = 'New Password';
    const changeSpy = jest.fn();

    const wrapper = mount(
      <SingleLineText
        name={'test-pwd'}
        type="password"
        value={initialVal}
        onChange={changeSpy}
      />,
    );

    const input = wrapper.find('input');
    input.simulate('change', { target: { value: mockValueUpdated } });

    expect(changeSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        target: { value: mockValueUpdated },
      }),
    );
  });

  it('renders an empty string if value is not provided, when type is password', () => {
    const initialVal = undefined;
    const wrapper = mount(
      <SingleLineText name={'test-pwd'} type="password" value={initialVal} />,
    );

    const input = wrapper.find('input');

    expect(input.prop('value')).toBe('');
  });
});
