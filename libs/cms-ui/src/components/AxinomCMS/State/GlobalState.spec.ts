import { getState, state, storeState } from './GlobalState';

describe('GlobalState', () => {
  const mockKey = 'test-key';
  const mockProp = 'test-prop';
  const mockValue = 'test-Value';

  // Reset state after each test
  afterEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    state = {};
  });
  it('state is initialized as an empty object', () => {
    expect(state).toEqual({});
  });

  it('storeState updates the current state with key, prop, and value', () => {
    storeState(mockKey, mockProp, mockValue);

    const [key] = Object.keys(state);
    const [[prop, value]] = Object.entries(state[key]);

    expect(key).toBe(mockKey);
    expect(prop).toBe(mockProp);
    expect(value).toBe(mockValue);
  });

  it('getState retrieves a stored value using a key and prop', () => {
    storeState(mockKey, mockProp, mockValue);

    const value = getState(mockKey, mockProp);

    expect(value).toBe(mockValue);
  });

  it('state returns the current state', () => {
    const currentState = { [mockKey]: { [mockProp]: mockValue } };

    storeState(mockKey, mockProp, mockValue);

    expect(currentState).toEqual(state);
  });
});
