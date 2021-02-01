/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { mount, shallow } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Link, MemoryRouter } from 'react-router-dom';
import { Breadcrumb } from '../Header.models';
import { Breadcrumbs } from './Breadcrumbs';

const mockCrumbs: Breadcrumb[] = [
  {
    label: 'Test Label 1',
    url: 'test-route-1',
    params: [],
  },
  {
    label: 'Test Label 2',
    url: 'test-route-2',
    params: [],
  },
  {
    label: 'Test Label 3',
    url: 'test-route-3',
    params: [],
  },
];

describe('Breadcrumbs', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(<Breadcrumbs crumbs={mockCrumbs} />);

    expect(wrapper).toBeTruthy();
  });

  it('renders an element for each breadcrumb', () => {
    const defaultsLinks = 1;
    const wrapper = shallow(<Breadcrumbs crumbs={mockCrumbs} />);

    const crumbs = wrapper.find(Link);

    expect(crumbs).toHaveLength(mockCrumbs.length + defaultsLinks);
  });

  it('renders only the home button if no breadcrumb props are passed in', () => {
    const defaultsLinks = 1;
    const wrapper = shallow(<Breadcrumbs />);

    const crumbs = wrapper.find(Link);
    const homeButton = wrapper.find('.homeLink');

    expect(crumbs).toHaveLength(defaultsLinks);
    expect(homeButton.exists()).toBe(true);
  });

  it('links the home button to root', () => {
    const wrapper = shallow(<Breadcrumbs crumbs={mockCrumbs} />);

    const homeButton = wrapper.find('.homeLink');

    expect(homeButton.prop('to')).toEqual({ pathname: '/' });
  });

  it('includes a link for each crumb', () => {
    const wrapper = shallow(<Breadcrumbs crumbs={mockCrumbs} />);

    const links = wrapper.find(Link);

    links.forEach(link => {
      const props = link.props();
      expect(props.to).toBeTruthy();
    });
  });

  it('renders a label for each breadcrumb passed into the component', () => {
    const wrapper = shallow(<Breadcrumbs crumbs={mockCrumbs} />);

    const labels = wrapper.find('span');

    labels.forEach((label, index) => {
      expect(label.text()).toBe(mockCrumbs[index].label);
    });
  });

  it('renders a label when a callback has been passed in', async () => {
    const mockLazyLabel = 'Mock Lazy Label';
    const asyncLabel = () => {
      return () =>
        new Promise<string>(resolve =>
          setTimeout(() => {
            resolve(mockLazyLabel);
          }),
        );
    };
    const mockLoadingCrumb: Breadcrumb[] = [
      {
        label: asyncLabel(),
        url: 'lazy-route',
        params: [],
      },
    ];

    const wrapper = mount(
      <MemoryRouter>
        <Breadcrumbs crumbs={mockLoadingCrumb} />
      </MemoryRouter>,
    );
    await act(async () => {
      await Promise.resolve(wrapper);
      await new Promise(resolve => setImmediate(resolve));
      wrapper.update();
    });

    const label = wrapper.find('span');

    expect(label.text()).toBe(mockLazyLabel);
  });

  it('renders a tooltip, with the same text, when the label has an active ellipsis', () => {
    Object.defineProperty(HTMLParagraphElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 1,
    });

    Object.defineProperty(HTMLParagraphElement.prototype, 'scrollWidth', {
      configurable: true,
      value: 2,
    });

    const [mockCrumb] = mockCrumbs;

    const wrapper = mount(
      <MemoryRouter>
        <Breadcrumbs crumbs={[mockCrumb]} />
      </MemoryRouter>,
    );

    let tooltip = wrapper.find('.toolTip');
    expect(tooltip.exists()).toBe(false);

    const label = wrapper.find(`a[href="${mockCrumb.url}"] p`);

    act(() => {
      // @ts-ignore
      label.prop('onMouseEnter')();
    });

    wrapper.update();

    tooltip = wrapper.find('.toolTip');

    expect(label.text()).toBe(mockCrumb.label);
    expect(tooltip.exists()).toBe(true);
    expect(tooltip.text()).toBe(mockCrumb.label);
  });

  it('does not render a tooltip when the label is not truncated', () => {
    Object.defineProperty(HTMLParagraphElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 0,
    });

    Object.defineProperty(HTMLParagraphElement.prototype, 'scrollWidth', {
      configurable: true,
      value: 0,
    });

    const [mockCrumb] = mockCrumbs;

    const wrapper = mount(
      <MemoryRouter>
        <Breadcrumbs crumbs={[mockCrumb]} />
      </MemoryRouter>,
    );

    const label = wrapper.find(`a[href="${mockCrumb.url}"] p`);

    act(() => {
      // @ts-ignore
      label.prop('onMouseEnter')();
    });

    wrapper.update();

    const tooltip = wrapper.find('.toolTip');

    expect(tooltip.exists()).toBe(false);
  });

  describe('Dropdown', () => {
    const dropDownCrumbs: Breadcrumb[] = [
      ...mockCrumbs,
      {
        label: 'Test Label 4',
        url: 'test-route-4',
        params: [],
      },
      {
        label: 'Test Label 5',
        url: 'test-route-5',
        params: [],
      },
    ];
    it('does not render drop down if there is less then 4 crumbs', () => {
      const wrapper = shallow(<Breadcrumbs crumbs={mockCrumbs} />);

      const dropdown = wrapper.find('.dropDownAnchor');

      expect(dropdown.exists()).toBe(false);
    });
    it('dropdown is rendered with an ellipsis as a label when more then 3 breadcrumbs are passed in', () => {
      const wrapper = shallow(<Breadcrumbs crumbs={dropDownCrumbs} />);

      const dropdown = wrapper.find('.dropDownAnchor');
      const ellipsis = wrapper.find('.ellipsisLabel');

      expect(dropdown.exists()).toBe(true);
      expect(ellipsis.text()).toBe('. . .');
    });

    it('renders home button, first crumb, dropdownanchor, second-to-last crumb, and the last crumb, in order', () => {
      const wrapper = shallow(<Breadcrumbs crumbs={dropDownCrumbs} />);
      const container = wrapper.find('.container');
      const homeButton = container.childAt(0);
      const first = container.childAt(1);
      const dropDownAnchor = container.childAt(2);
      const secondToLast = container.childAt(3);
      const last = container.childAt(4);

      expect(homeButton.hasClass('homeLink')).toEqual(true);
      expect(first.find('Label').prop('label')).toBe(dropDownCrumbs[0].label);
      expect(dropDownAnchor.find('.ellipsisLabel').text()).toBe('. . .');
      expect(secondToLast.find('Label').prop('label')).toBe(
        dropDownCrumbs[dropDownCrumbs.length - 2].label,
      );
      expect(last.find('Label').prop('label')).toBe(
        dropDownCrumbs[dropDownCrumbs.length - 1].label,
      );
    });

    it('renders the dropdown list when the mouse is hovered over', () => {
      const wrapper = mount(
        <MemoryRouter>
          <Breadcrumbs crumbs={dropDownCrumbs} />
        </MemoryRouter>,
      );
      const anchor = wrapper.find('.dropDownAnchor');

      let dropDown = wrapper.find('.dropDownList');
      expect(dropDown.exists()).toBe(false);

      act(() => {
        // @ts-ignore
        anchor.prop('onMouseEnter')();
      });

      wrapper.update();

      dropDown = wrapper.find('.dropDownList');

      expect(dropDown.exists()).toBe(true);
    });

    it('closes dropdown list when mouse leaves', () => {
      const wrapper = mount(
        <MemoryRouter>
          <Breadcrumbs crumbs={dropDownCrumbs} />
        </MemoryRouter>,
      );
      const anchor = wrapper.find('.dropDownAnchor');

      act(() => {
        // @ts-ignore
        anchor.prop('onMouseEnter')();
      });

      wrapper.update();

      let dropDown = wrapper.find('.dropDownList');

      expect(dropDown.exists()).toBe(true);

      act(() => {
        // @ts-ignore
        anchor.prop('onMouseLeave')();
      });

      wrapper.update();

      dropDown = wrapper.find('.dropDownList');

      expect(dropDown.exists()).toBe(false);
    });

    it('renders a link for each breadcrumb not displayed in the main breadcrumb container', () => {
      const dropDownListCrumbs = dropDownCrumbs.slice(1, -2);
      const wrapper = mount(
        <MemoryRouter>
          <Breadcrumbs crumbs={dropDownCrumbs} />
        </MemoryRouter>,
      );
      const anchor = wrapper.find('.dropDownAnchor');

      act(() => {
        // @ts-ignore
        anchor.prop('onMouseEnter')();
      });

      wrapper.update();

      const labels = wrapper.find('.dropDownList a');

      labels.forEach((crumb, idx) => {
        expect(crumb.prop('href')).toBe(dropDownListCrumbs[idx].url);
        expect(crumb.text()).toBe(dropDownListCrumbs[idx].label);
      });
    });
  });
});
