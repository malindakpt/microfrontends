export const toSerializeEqual = (received: object, expected: object): void => {
  const sortOrder = Object.keys(received).sort();
  expect(JSON.stringify(received, sortOrder)).toBe(
    JSON.stringify(expected, sortOrder),
  );
};

export const dateToBeGreaterThan = (
  received: string | Date,
  expected: string | Date,
): void => {
  const date1 = new Date(received).getTime();
  const date2 = new Date(expected).getTime();
  expect(date1).toBeGreaterThan(date2);
};

// TODO: https://github.com/jest-community/jest-extended/issues/144
export const toBeIso8601Strict = (expected: string): void => {
  const regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T([0-1][0-9]|2[0-3])(:[0-5][0-9]){2}\.[0-9]{3}Z$/;
  const isIso = regex.test(expected);
  expect(isIso).toBe(true);
};

export const rejectionOf = (promise: Promise<any>): Promise<any> => {
  const onSuccess = (): never => {
    throw Error(
      'Tested function was expected to fail, but it succeeded without errors.',
    );
  };
  const onError = (reason: any): any => reason;
  return promise.then(onSuccess, onError);
};
