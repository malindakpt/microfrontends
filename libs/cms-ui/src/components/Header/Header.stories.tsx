import React, { useEffect, useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './Header';
import { Breadcrumb } from './Header.models';
import { AuthProps } from './Auth/Auth';
import { action } from '@storybook/addon-actions';
import { User } from '@ax/core';

export default {
  title: `Other Components/Header`,
};

const defaultBreadcrumbs: Breadcrumb[] = [];
const defaultUser: AuthProps = {
  user: {
    name: 'Axinom User',
    email: 'user@axinom.com',
    profilePictureUrl: '/images/ax.png',
    id: '1',
  } as User,
  logout: action('logout'),
};

const twoCrumbs: Breadcrumb[] = [
  {
    label: 'Movies',
    url: '/movies',
    params: [],
  },
  {
    label: 'The God Father',
    url: '/movies/3js98j3fg038swj',
    params: [],
  },
];

export const Default: React.FC = () => {
  return (
    <div>
      <MemoryRouter>
        <Header crumbs={defaultBreadcrumbs} auth={defaultUser} />
      </MemoryRouter>
    </div>
  );
};

export const WithCrumbs: React.FC = () => {
  return (
    <div>
      <MemoryRouter>
        <Header crumbs={twoCrumbs} auth={defaultUser} />
      </MemoryRouter>
    </div>
  );
};

const ProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(70);

  useEffect(() => {
    const interval = setInterval(() => {
      progress >= 100 ? setProgress(0) : setProgress(progress + 10);
    }, 1500);
    return () => clearInterval(interval);
  }, [progress]);

  const wrapper = {
    gridColumnStart: -2,
    display: 'grid',
    placeItems: 'center',
  } as React.CSSProperties;

  const progressContainer = {
    display: 'grid',
    width: '250px',
    marginRight: '20px',
  } as React.CSSProperties;

  const progressBar = {
    display: 'grid',
    width: '100%',
    backgroundColor: '#999999',
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, .2)',
  } as React.CSSProperties;

  const progressBarFill = {
    display: 'grid',
    alignItems: 'center',
    height: '22px',
    backgroundColor: '#659cef',
    transition: 'width 500ms ease-in-out',
    width: `${progress}%`,
  } as React.CSSProperties;

  const progressLabel = {
    color: 'white',
    marginLeft: '10px',
    whiteSpace: 'nowrap',
  } as React.CSSProperties;

  return (
    <div style={wrapper}>
      <div style={progressContainer}>
        <div style={progressBar}>
          <span style={progressBarFill}>
            <span style={progressLabel}>Publish Progress {`${progress}%`}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export const WithCustomElement: React.FC = () => {
  return (
    <div>
      <MemoryRouter>
        <Header crumbs={defaultBreadcrumbs} auth={defaultUser}>
          <ProgressBar />
        </Header>
      </MemoryRouter>
    </div>
  );
};

export const AsyncLabels: React.FC = () => {
  const labelLoadingFunction = () => {
    return () =>
      new Promise<string>(resolve =>
        setTimeout(() => {
          resolve('The God Father');
        }, 1500),
      );
  };

  const mockAsyncCrumbs: Breadcrumb[] = [
    twoCrumbs[0],
    { ...twoCrumbs[1], label: labelLoadingFunction() },
  ];

  return (
    <div>
      <MemoryRouter>
        <Header crumbs={mockAsyncCrumbs} auth={defaultUser} />
      </MemoryRouter>
    </div>
  );
};

export const WithDropdown: React.FC = () => {
  const labelLoadingFunction = () => {
    return () =>
      new Promise<string>(resolve =>
        setTimeout(() => {
          resolve(
            'Really long item title with label that should show up on a tool tip',
          );
        }, 1500),
      );
  };

  const mockAsyncCrumbs: Breadcrumb[] = [
    twoCrumbs[0],
    {
      label: 'Images',
      url: '/images',
      params: [],
    },
    { ...twoCrumbs[1], label: labelLoadingFunction() },
    {
      label: 'Videos',
      url: '/videos',
      params: [],
    },
    {
      label: 'A long label that does not show overflow',
      url: '/placeholder',
      params: [],
    },
    {
      label: 'Current Station',
      url: '/station',
      params: [],
    },
  ];

  return (
    <div>
      <MemoryRouter>
        <Header crumbs={mockAsyncCrumbs} auth={defaultUser} />
      </MemoryRouter>
    </div>
  );
};
