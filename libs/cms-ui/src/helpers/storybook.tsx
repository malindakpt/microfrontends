import React from 'react';
import { Providers } from 'components/AxinomCMS/Providers/Providers';

/**
 * Adds the properties from the defined parameters object to 'storyFunction.story.parameters._plugin_.*'
 * @param story the story function
 * @param plugin the name of the plugin/configuration property that should be set
 * @param parameters an object holding the settings that should be added to the configuration
 */
export const addParameters = (
  storyFunction: React.FC,
  plugin: string,
  params: object,
): void => {
  const s = (storyFunction as unknown) as {
    story: { parameters: { [key: string]: {} } };
  };

  s.story = s.story ?? {};
  s.story.parameters = s.story.parameters ?? {};
  s.story.parameters[plugin] = s.story.parameters[plugin] ?? {};

  s.story.parameters[plugin] = {
    ...s.story.parameters[plugin],
    ...params,
  };
};

/**
 * Adds the properties from the defined parameters object to 'storyFunction.story.parameters.info.*'
 * @param story the story function
 * @param parameters an object holding the settings that should be added to the configuration
 */
export const addInfo = (story: React.FC, parameters: object): void => {
  addParameters(story, 'info', parameters);
};

/**
 * Generates an array with the amount of items defined.
 * @param amount number of items
 * @param generator generator function that can generate an item
 */
export function generateItemArray<T>(
  amount: number,
  generator: (index: number) => T,
): T[] {
  return [...Array(amount)].map((_i, idx) => generator(idx));
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
export function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export type Story = React.FC & {
  story?: {
    [key: string]: any;
    name?: string;
    parameters?: {
      [key: string]: any;
      docs: {
        storyDescription: string;
      };
    };
  };
};

export function randomDate(start: Date = new Date(0), end: Date = new Date()) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

export function wait(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export function wrapWithProviders(children: JSX.Element): JSX.Element {
  return <Providers>{children}</Providers>;
}
