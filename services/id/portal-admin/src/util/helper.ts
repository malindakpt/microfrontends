export const extractErrorString = (errorObj: {
  graphQLErrors: { message: string }[];
  message: string;
}): string => {
  const errorArr = errorObj.graphQLErrors;
  let errorString = '';
  errorArr.forEach(e => {
    errorString = errorString + e.message + '\n';
  });
  // If errorString not present then get the errorObj.message
  return errorString || errorObj.message;
};

export const getCookie = (key: string): string => {
  const cookieStr = document.cookie;
  const arr = cookieStr.split(';');

  for (const entry of arr) {
    const cookie = entry.split('=');
    if (cookie[0].trim() === key) {
      return cookie[1];
    }
  }
  return '';
};
