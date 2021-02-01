import * as faker from 'faker';
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Breadcrumb } from '../Header/Header.models';
import { Slide } from './Slide';

export default {
  title: `Other Components/Slide`,
};

export const AnimationDirections = () => {
  const styles = {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    justifyContent: 'space-around',
  };
  const breadcrumb1: Breadcrumb = { label: 'label_a', url: '/a', params: [] };
  const breadcrumbs = [breadcrumb1];

  return (
    <Router>
      <Route
        render={({ location }) => (
          <Slide breadcrumbs={breadcrumbs}>
            <Switch location={location}>
              <Route
                path=""
                exact
                component={() => (
                  <div className="route-animations" style={styles}>
                    {location.pathname !== '/b' && (
                      <>
                        <Link id="something" to={'/b'}>
                          Forward
                        </Link>
                        <br />
                        <p>{faker.lorem.paragraphs(10)}</p>
                      </>
                    )}
                    {location.pathname === '/b' && (
                      <>
                        <Link id="something" to={'/a'}>
                          Backward
                        </Link>
                        <br />
                        <p>{faker.lorem.paragraphs(10)}</p>
                      </>
                    )}
                  </div>
                )}
              />
            </Switch>
          </Slide>
        )}
      ></Route>
    </Router>
  );
};
