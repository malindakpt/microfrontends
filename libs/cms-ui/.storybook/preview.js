import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, addParameters } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

addDecorator(withKnobs);

addDecorator(StoryRouter());

addParameters({
  options: {
    /**
     * display the top-level grouping as a "root" in the sidebar
     * @type {Boolean}
     */
    showRoots: true,

    storySort: sort,
  },
});

function sort(a, b) {
  if (a[1].kind === b[1].kind) {
    return 0;
  }

  let res = getValue([
    putOnTop(a, b, i => i.kind === 'Docs/Intro'),
    putOnTop(a, b, i => i.kind.startsWith("Docs/")),
    putOnTop(a, b, i => i.kind.startsWith("Primary Components/")),
    putToBottom(a, b, i => i.kind.startsWith("Internal Components/")),
  ]);

  if (res !== undefined) {
    return res;
  } else {
    return a[1].id.localeCompare(b[1].id, undefined, { numeric: true });
  }  
}

function getValue(results) {
  for (const i in results) {
    if (results[i] !== undefined) {
      return results[i] ;
    }
  }
}

function putOnTop(a, b, fn) {
  if (fn(a[1])) {
    return -1;
  }
  else if(fn(b[1])) {
    return 1;
  }
}

function putToBottom(a, b, fn) {
  if (fn(a[1])) {
    return 1;
  }
  else if(fn(b[1])) {
    return -1;
  }
}
