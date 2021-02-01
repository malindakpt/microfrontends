import React, { useState, useCallback } from 'react';
import { Story } from 'helpers/storybook';
import { NavigationAwareStation } from './NavigationAwareStation';
import { MemoryRouter, Switch, Route, Link } from 'react-router-dom';
import { action } from '@storybook/addon-actions';

export default {
  title: `Primary Components/Station Controls/NavigationAwareStation`,
  component: NavigationAwareStation,
};

export const Configurable: Story = () => {
  const Station: React.FC = () => {
    const [restrictNavigation, setRestrictNavigation] = useState(true);
    const [onNavigateResult, setOnNavigateResult] = useState(false);

    const onNavigate = useCallback(() => {
      action('onNavigate called, returning')(onNavigateResult);
      return onNavigateResult;
    }, [onNavigateResult]);

    return (
      <NavigationAwareStation
        restrictNavigation={restrictNavigation}
        onNavigate={onNavigate}
      >
        <>
          <h1>Page</h1>
          <p>
            This station will prevent navigation whenever
            &apos;restrictNavigation&apos; is checked.
          </p>
          <p>
            The return value of &apos;onNavigate&apos; can be configured using
            the &apos;onNavigate result&apos; dropdown.
          </p>
          <p>
            Keep in mind that the &apos;onNavigate&apos; callback will only be
            executed for internal links and when &apos;restrictNavigation&apos;
            is set to &apos;true&apos;.
          </p>
          <p>
            <label>
              restrictNavigation
              <input
                type="checkbox"
                checked={restrictNavigation}
                onChange={e => {
                  setRestrictNavigation(e.target.checked);
                }}
              />
            </label>
          </p>
          <p>
            <label>
              onNavigate result
              <select
                value={String(onNavigateResult)}
                onChange={e => {
                  setOnNavigateResult(e.target.value === 'true');
                }}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </label>
          </p>
          <ul>
            <li>
              External Link: <a href="https://www.axinom.com">Axinom</a>
            </li>
            <li>
              Internal Link: <Link to="/linked">another page</Link>
            </li>
          </ul>
        </>
      </NavigationAwareStation>
    );
  };

  return (
    <MemoryRouter>
      <Switch>
        <Route exact path="/" component={Station} />
        <Route exact path="/linked" render={() => <Link to="/">back</Link>} />
      </Switch>
    </MemoryRouter>
  );
};
