import { shallow } from 'enzyme';
import React from 'react';
import { ListCheckBox } from './ListCheckBox';

describe('ListCheckBox', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(<ListCheckBox />);

    expect(wrapper).toBeTruthy();
  });

  it('defaults to false', () => {
    const wrapper = shallow(<ListCheckBox />);

    const checkbox = wrapper.find('input[type="checkbox"]');

    expect(checkbox.props().checked).toEqual(false);
  });

  it('sets its state to isChecked prop', () => {
    const wrapper = shallow(<ListCheckBox isChecked={true} />);

    const checkbox = wrapper.find('input[type="checkbox"]');

    expect(checkbox.props().checked).toEqual(true);
  });

  it('raises the onCheckBoxToggled event with the current checkbox value', () => {
    const mockCheckedValue = true;
    const spy = jest.fn();
    const wrapper = shallow(<ListCheckBox onCheckBoxToggled={spy} />);
    const checkbox = wrapper.find('input[type="checkbox"]');

    checkbox.simulate('change', {
      currentTarget: { checked: mockCheckedValue },
    });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(mockCheckedValue);
  });

  it('enable checkbox if isDisabled prop is not provided', () => {
    const spy = jest.fn();
    const wrapper = shallow(<ListCheckBox onCheckBoxToggled={spy} />);
    const checkbox = wrapper.find('input[type="checkbox"]');
    expect(checkbox.prop('disabled')).toBeFalsy();
  });

  it('disable checkbox if isDisabled prop is true', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <ListCheckBox onCheckBoxToggled={spy} isDisabled={true} />,
    );
    const checkbox = wrapper.find('input[type="checkbox"]');
    expect(checkbox.prop('disabled')).toBeTruthy();
  });

  it('disables container click event propagation', () => {
    const spy = jest.fn();
    const mockedEvent = { stopPropagation: spy };
    const wrapper = shallow(<ListCheckBox />);

    const container = wrapper.find('.container');

    container.simulate('click', mockedEvent);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('allows the click event propagate when containerClickEvent is true', () => {
    const spy = jest.fn();
    const mockedEvent = { stopPropagation: spy };
    const wrapper = shallow(<ListCheckBox containerClickEvent={true} />);

    const container = wrapper.find('.container');

    container.simulate('click', mockedEvent);

    expect(spy).not.toHaveBeenCalled();
  });
});
