import { number, object, select, text } from '@storybook/addon-knobs';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { getRandomInt, Story } from 'helpers/storybook';
import { LandingPageTiles } from './LandingPageTiles';
import { LandingPageItem } from './LandingPageTiles.model';

export default {
  title: `Primary Components/LandingPage/LandingPageTiles`,
};

const defaultContainer = {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr',
  paddingTop: '30px',
  paddingBottom: '30px',
  backgroundColor: 'grey',
} as React.CSSProperties;

const largeTiles: LandingPageItem[] = [
  {
    path: '/contentset',
    label: 'Content Sets',
    icon: '/images/images.png',
    type: 'large',
    subtitle: 3,
  },
  {
    path: '/movies',
    label: 'Movies(Disbled)',
    icon: '/images/images.png',
    type: 'large',
    subtitle: '68',
    disabled: true,
  },
  {
    path: '/tvshows',
    label: 'TV Shows',
    icon: '/images/images.png',
    type: 'large',
    subtitle: '4198',
  },
];

const smallTiles: LandingPageItem[] = [
  {
    path: '/contentpipelines',
    label: 'Content Pipelines(Disabled)',
    icon: '/images/images.png',
    type: 'small',
    disabled: true,
  },
  {
    path: '/reporting',
    label: 'Reporting',
    icon: '/images/images.png',
    type: 'small',
  },
  {
    path: '/subscriptions',
    label: 'Subscriptions',
    icon: '/images/images.png',
    type: 'small',
  },
  {
    path: '/administration',
    label: 'Administration',
    icon: '/images/images.png',
    type: 'small',
  },
  {
    path: '/customers',
    label: 'Customers',
    icon: '/images/images.png',
    type: 'small',
  },
  {
    path: '/images',
    label: 'Images',
    icon: '/images/images.png',
    type: 'small',
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

export const ThreeByFour: Story = () => {
  const data = [...largeTiles, ...smallTiles];

  return (
    <div style={defaultContainer}>
      <MemoryRouter>
        <LandingPageTiles items={data} />
      </MemoryRouter>
    </div>
  );
};

export const FourByFour: Story = () => {
  const extraLargeTile: LandingPageItem = {
    path: '/liveevents',
    label: 'LIVE EVENTS',
    icon: '/images/images.png',
    type: 'large',
    subtitle: '528',
  };
  const data = [...largeTiles, extraLargeTile, ...smallTiles];

  return (
    <div style={defaultContainer}>
      <MemoryRouter>
        <LandingPageTiles
          items={data}
          gridTemplateColumns={4}
          gridRowHeight={'75px'}
          gridGap={'5px'}
          minWidth={'600px'}
          maxWidth={'900px'}
          alignment={'center'}
          largeTileColumnSpan={1}
          largeTileRowSpan={3}
          smallTileColumnSpan={1}
          smallTileRowSpan={2}
        />
      </MemoryRouter>
    </div>
  );
};

export const FlowingTiles: Story = () => {
  const data = [...largeTiles, ...smallTiles];
  return (
    <div style={defaultContainer}>
      <MemoryRouter>
        <LandingPageTiles
          items={data}
          gridTemplateColumns={12}
          gridRowHeight={'150px'}
          gridGap={'5px'}
          minWidth={'600px'}
          maxWidth={'900px'}
          alignment={'center'}
          largeTileColumnSpan={6}
          largeTileRowSpan={2}
          smallTileColumnSpan={3}
          smallTileRowSpan={1}
        />
      </MemoryRouter>
    </div>
  );
};

const CustomElement: React.FC = () => {
  const analyticsStyles = {
    fontSize: '22px',
    textAlign: 'center',
    margin: '10px',
  } as React.CSSProperties;

  const statsStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
  } as React.CSSProperties;

  const titleStyles = {
    textAlign: 'center',
  } as React.CSSProperties;

  const titles = ['Movies', 'Albums', 'Games', 'Tv Shows'];
  const stats = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

  return (
    <>
      <span style={analyticsStyles}>Analytics - Top Consumed</span>
      <div style={statsStyles}>
        {titles.map(t => (
          <div key={t} style={titleStyles}>
            <span>{t}</span>
            <ol>
              {stats.map(l => (
                <li key={l}>{l}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </>
  );
};

export const WithCustomElement: Story = () => {
  const customElementStyles = {
    display: 'grid',
    gridTemplateRows: 'min-content 1fr',
    gridColumn: '-1 / 7',

    gridRow: '3 / span 2',
    backgroundColor: 'white',
    color: '#444',
  } as React.CSSProperties;

  const data = [...largeTiles, ...smallTiles];

  return (
    <div style={defaultContainer}>
      <MemoryRouter>
        <LandingPageTiles items={data}>
          <div style={customElementStyles}>
            <CustomElement />
          </div>
        </LandingPageTiles>
      </MemoryRouter>
    </div>
  );
};

export const AsyncSubtitles: Story = () => {
  const subtitleLoadingFunction = (duration = 5000) => {
    return () =>
      new Promise<string>(resolve =>
        setTimeout(() => {
          resolve(String(duration));
        }, duration),
      );
  };

  const data = [
    ...largeTiles.map(t => ({
      ...t,
      subtitle: subtitleLoadingFunction(getRandomInt(1000, 5000)),
    })),
    ...smallTiles,
  ];

  return (
    <div style={defaultContainer}>
      <MemoryRouter>
        <LandingPageTiles items={data} />
      </MemoryRouter>
    </div>
  );
};

export const Knobs: Story = () => {
  const data = [...largeTiles, ...smallTiles];
  return (
    <div style={defaultContainer}>
      <MemoryRouter>
        <LandingPageTiles
          items={object('data', data, 'data')}
          gridTemplateColumns={number(
            'gridTemplateColumns',
            12,
            undefined,
            'style',
          )}
          gridRowHeight={text('gridRowHeight', '150px', 'style')}
          gridGap={text('gridGap', '5px', 'style')}
          minWidth={text('minWidth', '600px', 'style')}
          maxWidth={text('maxWidth', '900px', 'style')}
          alignment={select(
            'alignment',
            ['left', 'right', 'center'],
            'center',
            'style',
          )}
          largeTileColumnSpan={number(
            'largeTileColumnSpan',
            4,
            undefined,
            'style',
          )}
          largeTileRowSpan={number('largeTileRowSpan', 2, undefined, 'style')}
          smallTileColumnSpan={number(
            'smallTileColumnSpan',
            3,
            undefined,
            'style',
          )}
          smallTileRowSpan={number('smallTileRowSpan', 1, undefined, 'style')}
        />
      </MemoryRouter>
    </div>
  );
};
