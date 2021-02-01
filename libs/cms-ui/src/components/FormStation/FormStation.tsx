import { PageHeaderAction } from 'components/PageHeader/PageHeaderAction/PageHeaderAction';
import { Formik, FormikHelpers, FormikValues, useFormikContext } from 'formik';
import { noop } from 'helpers/utils';
import { useNavigateBack } from 'hooks/useNavigateBack/useNavigateBack';
import React, { PropsWithChildren, useCallback } from 'react';
import { Schema as YupSchema } from 'yup';
import { ActionData, Actions, ActionsProps } from '../Actions';
import { PageHeader, PageHeaderProps } from '../PageHeader';
import classes from './FormStation.scss';
import cancel from './images/cancel.png';
import refresh from './images/refresh.png';
import { SaveOnNavigate } from './SaveOnNavigate/SaveOnNavigate';

export interface InitialFormData<T> {
  /** Indicates whether the data is still loading or not */
  loading: boolean;
  /** Holds the data after the loading is finished */
  data?: T;
  /** Holds the error message in case something went wrong while loading */
  error?: string;
}

export interface FormStationProps<T> {
  /** name of the property on the form that holds the title */
  titleProperty?: string;
  /** fallback title if no value can be determined */
  defaultTitle?: string;
  /** Subtitle shown in page header */
  subtitle?: string;
  /** If set to true, the actions panel is shown, even if no actions are defined. */
  alwaysShowActionsPanel?: boolean;
  // /** An array of the actions that should be executable on the page */
  actions?: ActionData[];
  /** The width of the Actions container (as CSS width) */
  actionsWidth?: string;
  /**
   * Callback emitted when a user clicks on an Action.
   * The actionId is supplied as an argument.
   */
  onActionSelected?: (action: string) => void;
  /**
   * An object containing the initial data of the form.
   */
  initialData: InitialFormData<T>;
  /**
   * Called whenever the form needs to be saved.
   */
  saveData: (
    /** The current values of the form */
    values: T,
    /** The initial values of the form */
    initialData: InitialFormData<T>,
    /** The Formik state helpers */
    formikHelpers: FormikHelpers<T>,
  ) => void | Promise<unknown>;
  /** The Yup validation object (or any other Formik compatible validation schema) */
  validationSchema?: YupSchema<Partial<T>>;
  /** Sets whether a cancel action should be available (usually on a create station) */
  canCancel?: boolean;
}

export const FormStation = <T,>({
  titleProperty,
  defaultTitle,
  subtitle,
  children,
  alwaysShowActionsPanel = false,
  actions,
  actionsWidth,
  onActionSelected = noop,
  canCancel = false,
  initialData,
  saveData,
  validationSchema,
}: PropsWithChildren<FormStationProps<T>>): JSX.Element => {
  const onSubmit = useCallback(
    async (values: T, formikHelpers: FormikHelpers<T>): Promise<void> => {
      try {
        await saveData(values, initialData, formikHelpers);
      } catch (error) {
        throw error;
      }
    },
    [initialData, saveData],
  );

  return (
    <div className={classes.container}>
      <Formik
        initialValues={initialData.data ?? ({} as T)}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        <>
          <FormStationHeader
            titleProperty={titleProperty}
            defaultTitle={defaultTitle}
            subtitle={subtitle}
            canCancel={canCancel}
          />
          <div className={classes.children}>
            <SaveOnNavigate />
            {!initialData.loading && <form>{children}</form>}
          </div>
          {alwaysShowActionsPanel || (actions?.length ?? 0) > 0 ? (
            <FormStationAction
              actions={actions}
              width={actionsWidth}
              onActionSelected={onActionSelected}
            />
          ) : null}
        </>
      </Formik>
    </div>
  );
};

/**
 * Saves the form before the action is performed.
 */
const FormStationAction: React.FC<ActionsProps> = props => {
  const { onActionSelected } = props;
  const { isValid, submitForm, resetForm, values } = useFormikContext();
  const onActionCallback = useCallback(
    (action: string) => {
      (async () => {
        if (!isValid) {
          // we can't perform the action if the data is not valid
          // think about messaging to the user and also maybe graying out the buttons already before
          console.log('from invalid, action not performed');
          return;
        }

        try {
          await submitForm();

          resetForm({ values });
        } catch (error) {
          console.log('Error on saving, not executing action', error);
          return;
        }

        onActionSelected && onActionSelected(action);
      })();
    },
    [isValid, onActionSelected, resetForm, submitForm, values],
  );
  return <Actions {...props} onActionSelected={onActionCallback} />;
};

/**
 * Handles showRefresh and cancel buttons based on form states
 */
const FormStationHeader: React.FC<Omit<PageHeaderProps, 'title'> & {
  titleProperty?: string;
  defaultTitle?: string;
  canCancel: boolean;
}> = ({ titleProperty, defaultTitle, subtitle, canCancel }) => {
  const { dirty, resetForm, values } = useFormikContext<FormikValues>();

  const title =
    titleProperty && values[titleProperty]
      ? values[titleProperty]
      : defaultTitle ?? '';

  return (
    <PageHeader title={title} subtitle={subtitle}>
      {dirty && (
        // TODO: Replace this image with an svg, its just here for development
        <PageHeaderAction
          icon={refresh}
          alt={'Reset Form'}
          onClick={() => {
            resetForm();
          }}
        />
      )}
      {canCancel && (
        // TODO: Replace this image with an svg, its just here for development
        <PageHeaderAction
          icon={cancel}
          alt={'Cancel'}
          onClick={() => {
            resetForm();
            console.log('#TODO: Navigating back currently disabled');
            //navigateBack();
          }}
        />
      )}
    </PageHeader>
  );
};
