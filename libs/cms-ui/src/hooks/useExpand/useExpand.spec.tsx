import { shallow } from 'enzyme';
import React from 'react';
import { useExpand } from './useExpand';

const TestWrapper: React.FC = () => {
  const { isExpanded, expand, collapse } = useExpand();

  return (
    <div>
      <span>{String(isExpanded)}</span>
      <button id="expand" onClick={expand}></button>
      <button id="collapse" onClick={collapse}></button>
    </div>
  );
};

describe('useExpand', () => {
  it('isExpanded defaults to false', () => {
    const wrapper = shallow(<TestWrapper />);
    const isExpanded = JSON.parse(wrapper.find('span').text());

    expect(isExpanded).toBe(false);
  });

  it(`expand sets isExpanded to 'true'`, () => {
    const wrapper = shallow(<TestWrapper />);
    const expand = wrapper.find('#expand');

    expand.simulate('click');

    const isExpanded = JSON.parse(wrapper.find('span').text());

    expect(isExpanded).toBe(true);
  });

  it(`collapse sets isExpanded to 'false'`, () => {
    const wrapper = shallow(<TestWrapper />);
    const expand = wrapper.find('#expand');
    const collapse = wrapper.find('#collapse');

    expand.simulate('click');

    let isExpanded = JSON.parse(wrapper.find('span').text());

    expect(isExpanded).toBe(true);

    collapse.simulate('click');

    isExpanded = JSON.parse(wrapper.find('span').text());

    expect(isExpanded).toBe(false);
  });
});
