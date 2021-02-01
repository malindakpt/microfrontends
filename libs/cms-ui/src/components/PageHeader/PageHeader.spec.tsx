import { shallow } from 'enzyme';
import React from 'react';
import { PageHeader } from './PageHeader';
import { PageHeaderAction } from './PageHeaderAction/PageHeaderAction';
import { noop } from '../../helpers/utils';

describe('PageHeader', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(<PageHeader />);

    expect(wrapper).toBeTruthy();
  });

  it('displays a title', () => {
    const mockTitle = 'test-title';
    const wrapper = shallow(<PageHeader title={mockTitle} />);

    const title = wrapper.find('.title');

    expect(title.text()).toBe(mockTitle);
  });

  it('displays a subtitle', () => {
    const mockSubtitle = 'test-subtitle';
    const wrapper = shallow(<PageHeader subtitle={mockSubtitle} />);

    const subtitle = wrapper.find('.subtitle');

    expect(subtitle.text()).toBe(mockSubtitle);
  });

  it('displays the actions buttons', () => {
    const wrapper = shallow(
      <PageHeader>
        <PageHeaderAction icon={'dummy'} alt={'alt'} onClick={noop} />
      </PageHeader>,
    );

    const action = wrapper.find(PageHeaderAction);
    expect(action.exists()).toBe(true);
  });

  it('renders the children', () => {
    const mockSubtitle = 'test-subtitle';
    const wrapper = shallow(
      <PageHeader subtitle={mockSubtitle}>
        <h1>Test</h1>
      </PageHeader>,
    );

    const subtitle = wrapper.find('.subtitle');

    expect(subtitle.text()).toBe(mockSubtitle);
  });
});
