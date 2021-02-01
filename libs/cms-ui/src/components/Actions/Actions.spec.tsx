import { mount, shallow } from 'enzyme';
import React from 'react';
import { Action } from './Action/Action';
import { Actions } from './Actions';
import { ActionData } from './Actions.models';

const spy = jest.fn();
const mockActions: ActionData[] = [
  { actionId: 'action1', label: 'action-label' },
  { actionId: 'action2', label: 'action-label' },
  { actionId: 'action3', label: 'action-label' },
];

describe('Actions', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(<Actions actions={[]} />);

    expect(wrapper).toBeTruthy();
  });

  it('renders an Action for each action', () => {
    const wrapper = shallow(<Actions actions={mockActions} />);

    const actions = wrapper.find(Action);

    expect(actions.length).toBe(mockActions.length);
  });

  it('raises the click event with the clicked action id', () => {
    const [firstMockAction] = mockActions;
    const wrapper = mount(
      <Actions actions={mockActions} onActionSelected={spy} />,
    );

    const action = wrapper.find(Action).first();

    action.simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(firstMockAction.actionId);
  });

  it('renders Actions with the passed in width prop', () => {
    const mockWidth = '150px';
    const wrapper = shallow(<Actions actions={[]} width={mockWidth} />);

    const width = wrapper.find('.container');

    expect(width.prop('style')).toHaveProperty('width', mockWidth);
  });

  it('displays an empty Actions container if no actions are passed in', () => {
    const wrapper = shallow(<Actions actions={[]} />);

    const container = wrapper.find('.container');
    const actions = wrapper.find(Action);

    expect(container.exists()).toBe(true);
    expect(actions.length).toBe(0);
  });
});
