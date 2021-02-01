import { mount, shallow } from 'enzyme';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LandingPageTiles } from './LandingPageTiles';
import { LandingPageItem } from './LandingPageTiles.model';

const mockItems: LandingPageItem[] = [
  {
    path: '/contentset',
    label: 'CONTENT SET',
    icon: '/images/images.png',
    type: 'large',
    subtitle: '3',
  },
  {
    path: '/tvshows',
    label: 'TV SHOWS',
    icon: '/images/images.png',
    type: 'large',
    subtitle: '4198',
  },
  {
    path: '/collections',
    label: 'Collections',
    icon: '/images/images.png',
    type: 'small',
  },
  {
    path: '/translations',
    label: 'Translations',
    icon: '/images/images.png',
    type: 'small',
  },
];

describe('LandingPageTiles', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(<LandingPageTiles items={mockItems} />);

    expect(wrapper).toBeTruthy();
  });

  it('renders a tile for each item in the data array', () => {
    const wrapper = mount(
      <Router>
        <LandingPageTiles items={mockItems} />
      </Router>,
    );
    const tiles = wrapper.find('.container').first();

    expect(tiles.children()).toHaveLength(mockItems.length);
  });

  it('displays the right row height, grid gap, and amount of columns when passed into props', () => {
    const mockRowHeight = '300px';
    const mockGidGap = '35px';
    const mockColumns = 36;
    const wrapper = shallow(
      <LandingPageTiles
        items={mockItems}
        gridTemplateColumns={mockColumns}
        gridGap={mockGidGap}
        gridRowHeight={mockRowHeight}
      />,
    );

    const gridStyles = wrapper
      .find('.container')
      .first()
      .prop('style') as React.CSSProperties;

    expect(gridStyles.gridAutoRows).toBe(mockRowHeight);
    expect(gridStyles.gridGap).toBe(mockGidGap);
    expect(gridStyles.gridTemplateColumns).toBe(`repeat(${mockColumns}, 1fr)`);
  });

  it('has the right minimum width, maximum width, and alignment when passed into props', () => {
    const mockMinWidth = '200px';
    const mockMaxWidth = '400px';
    const mockAlignment = 'right';
    const wrapper = shallow(
      <LandingPageTiles
        items={mockItems}
        minWidth={mockMinWidth}
        maxWidth={mockMaxWidth}
        alignment={mockAlignment}
      />,
    );

    const gridStyles = wrapper
      .find('.container')
      .first()
      .prop('style') as React.CSSProperties;

    expect(gridStyles.minWidth).toBe(mockMinWidth);
    expect(gridStyles.maxWidth).toBe(mockMaxWidth);
    expect(gridStyles.justifySelf).toBe(mockAlignment);
  });

  it('supports children elements to be passed in', () => {
    const wrapper = shallow(
      <LandingPageTiles items={mockItems}>
        <div id="test-child"></div>
      </LandingPageTiles>,
    );

    const child = wrapper.find('#test-child');

    expect(child).toHaveLength(1);
  });

  // These need tests. Currently, spying on these functions and useState/useEffect is broken.
  it.todo('setLargeTiles');
  it.todo('setSmallTiles');
  it.todo('seperateTiles');
});
