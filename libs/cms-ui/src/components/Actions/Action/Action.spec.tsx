import { shallow } from 'enzyme';
import React from 'react';
import { Action } from './Action';

const defaultProps = {
  action: {
    actionId: 'action1',
    label: 'action-label',
  },
  onActionSelected: () => null,
};

describe('Action', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(<Action {...defaultProps} />);

    expect(wrapper).toBeTruthy();
  });

  it('renders a label', () => {
    const mockLabel = 'test-label';
    const wrapper = shallow(
      <Action
        {...defaultProps}
        action={{ actionId: 'test-action', label: mockLabel }}
      />,
    );

    const label = wrapper.find('span');

    expect(label.text()).toBe(mockLabel);
  });

  it('displays a chevron', () => {
    const wrapper = shallow(<Action {...defaultProps} />);

    const chevron = wrapper.find('svg');

    expect(chevron.exists()).toBe(true);
  });

  it('raises the onActionSelected event with the action id', () => {
    const mockId = 'test-id';
    const spy = jest.fn();
    const wrapper = shallow(
      <Action
        {...defaultProps}
        action={{ actionId: mockId, label: 'test-label' }}
        onActionSelected={spy}
      />,
    );

    wrapper.simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(mockId);
  });

  it('change background color when click for the first time', () => {
    const mockId = 'test-id';
    const spy = jest.fn();
    const wrapper = shallow(
      <Action
        {...defaultProps}
        action={{
          actionId: mockId,
          label: 'test-label',
          confirmationRequired: true,
        }}
        onActionSelected={spy}
      />,
    );
    expect(wrapper.hasClass('confirm')).toEqual(false);
    wrapper.simulate('click');

    wrapper.update();

    expect(wrapper.hasClass('confirm')).toEqual(true);
  });

  it('renders a confirmation message then raises the onActionSelected event after confirmation and resets the action label', () => {
    const mockId = 'test-id';
    const mockLabel = 'test-label';
    const confirmationMsg = 'Click again to confirm';
    const spy = jest.fn();
    const wrapper = shallow(
      <Action
        {...defaultProps}
        action={{
          actionId: mockId,
          label: mockLabel,
          confirmationRequired: true,
        }}
        onActionSelected={spy}
      />,
    );

    let span = wrapper.find('span');

    expect(span.text()).toBe(mockLabel);

    wrapper.simulate('click');

    span = wrapper.find('span');

    expect(span.text()).toBe(confirmationMsg);

    wrapper.simulate('click');

    span = wrapper.find('span');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(mockId);
    expect(span.text()).toBe(mockLabel);
  });

  it(`renders the action label again and doesn't raise the onActionSelected event on 'mouseleave' when confirmation is required`, () => {
    const mockLabel = 'test-label';
    const confirmationMsg = 'Click again to confirm';
    const spy = jest.fn();
    const wrapper = shallow(
      <Action
        {...defaultProps}
        action={{
          actionId: 'test-id',
          label: mockLabel,
          confirmationRequired: true,
        }}
        onActionSelected={spy}
      />,
    );

    wrapper.simulate('click');

    let span = wrapper.find('span');

    expect(span.text()).toBe(confirmationMsg);
    expect(spy).not.toHaveBeenCalled();

    wrapper.simulate('mouseleave');
    span = wrapper.find('span');

    expect(span.text()).toBe(mockLabel);
    expect(spy).not.toHaveBeenCalled();
  });
});
