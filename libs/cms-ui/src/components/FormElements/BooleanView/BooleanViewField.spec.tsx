import { shallow } from 'enzyme';
import React from 'react';
import { BooleanViewField } from './BooleanViewField';

describe('BooleanViewField', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(<BooleanViewField />);

    expect(wrapper).toBeTruthy();
  });

  it('displays a label', () => {
    const mockLabel = 'mockLabel';
    const wrapper = shallow(<BooleanViewField label={mockLabel} />);

    const label = wrapper.find('label');

    expect(label.text()).toBe(mockLabel);
  });

  it('displays default true, false label values', () => {
    const wrapper1 = shallow(<BooleanViewField value={true} />);
    const text1 = wrapper1.find('.text');
    expect(text1.text()).toBe('True');

    const wrapper2 = shallow(<BooleanViewField value={false} />);
    const text2 = wrapper2.find('.text');
    expect(text2.text()).toBe('False');
  });

  it('renders value: true', () => {
    const trueLabel = 'Enabled';
    const falseLabel = 'Disabled';

    const wrapper = shallow(
      <BooleanViewField
        value={true}
        trueLabel={trueLabel}
        falseLabel={falseLabel}
      />,
    );

    const green = wrapper.find('.green');
    const red = wrapper.find('.red');
    const text = wrapper.find('.text');

    expect(green.exists()).toBe(true);
    expect(red.exists()).toBe(false);
    expect(text.text()).toBe(trueLabel);
  });

  it('renders value: false', () => {
    const trueLabel = 'Enabled';
    const falseLabel = 'Disabled';

    const wrapper = shallow(
      <BooleanViewField
        value={false}
        trueLabel={trueLabel}
        falseLabel={falseLabel}
      />,
    );

    const green = wrapper.find('.green');
    const red = wrapper.find('.red');
    const text = wrapper.find('.text');

    expect(green.exists()).toBe(false);
    expect(red.exists()).toBe(true);
    expect(text.text()).toBe(falseLabel);
  });

  it('defaults to show red circle', () => {
    const wrapper = shallow(<BooleanViewField />);

    const green = wrapper.find('.green');
    const red = wrapper.find('.red');

    expect(green.exists()).toBe(false);
    expect(red.exists()).toBe(true);
  });
});
