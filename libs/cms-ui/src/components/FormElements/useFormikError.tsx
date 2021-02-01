import { useFormikContext } from 'formik';

interface ErrorsType {
  [property: string]: string | undefined;
}

export const useFormikError = (name: string) => {
  const { errors } = useFormikContext();
  return errors && (errors as ErrorsType)[name];
};
