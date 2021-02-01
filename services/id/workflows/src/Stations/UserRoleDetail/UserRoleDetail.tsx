import React, { useCallback, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  ActionData,
  DetailsProps,
  Details,
  SingleLineTextField,
  ReadOnlyField,
  TagsField,
  Nullable,
  DateTimeField,
} from '@ax/cms-ui';
import { FormikValues, Field } from 'formik';
import classes from './UserRoleDetail.module.scss';
import * as Yup from 'yup';
import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';
import {
  useUserRoleQuery,
  Tag,
  useDeleteUserRoleMutation,
} from '../../generated/graphql';
import { client } from '../../apolloClient';
import { BreadcrumbResolver } from 'frontend-host';

const userRoleDetailSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is a required field')
    .max(200),
  description: Yup.string()
    .required('Description is a required field')
    .max(2000),
});

type FormData = Nullable<{
  name?: string;
  description?: string;
  tags: string[];
  tagsOptions: { [tagName: string]: Partial<Tag> };
  tagAssignments: { [tagName: string]: string }; // Value is tag assignment ID
}>;

export const UserRoleDetail: React.FC = () => {
  const { userRoleId } = useParams<{
    userRoleId: string;
  }>();

  // Query user role data
  const { loading, data, error } = useUserRoleQuery({
    client: client,
    variables: { id: userRoleId },
    fetchPolicy: 'no-cache',
  });

  const { actions, actionSelectedHandler } = useActions(userRoleId);

  const tagsOptions: { [tagName: string]: Partial<Tag> } = {};
  const tagAssignments: { [tagName: string]: string } = {}; // Value is tag assignment ID

  data?.userRole?.userRoleTagAssignments.nodes.forEach(tagAssignment => {
    if (tagAssignment?.tag) {
      tagAssignments[tagAssignment.tag.name] = tagAssignment.id;
    }
  });

  data?.tags?.nodes.forEach(tag => {
    if (tag) tagsOptions[tag.name] = tag;
  });

  const onSubmit = useCallback(
    async (
      formData: FormData,
      initialData: DetailsProps<FormData>['initialData'],
    ): Promise<any> => {
      if (initialData.loading) {
        return;
      }

      // Find new tag assignments created by the user
      // We need to dynamically generate calls to 'createUserRoleTagAssignment' mutation to create these new tag assignments
      let tagsToCreate: string[] = [];
      if (formData.tags) {
        tagsToCreate = formData.tags?.filter(tag => {
          return (
            initialData.data?.tags && !initialData.data?.tags.includes(tag)
          );
        });
      }

      // Find existing tag assignments that are deleted by the user
      // We need to dynamically generate calls to 'deleteUserRoleTagAssignment' mutation to delete these tag assignments
      let tagsToDelete: string[] = [];
      if (initialData.data?.tags) {
        tagsToDelete = initialData.data?.tags.filter(tag => {
          return !formData.tags?.includes(tag);
        });
      }

      // Following template mutation is used to dynamically generate calls to 'createUserRoleTagAssignment' mutation
      const createTagMutationTemplate = gql`
        mutation CreateTag($userRoleId: UUID!, $tagId: UUID!) {
          alias: createUserRoleTagAssignment(
            input: {
              userRoleTagAssignment: {
                userRoleId: "$userRoleId"
                tagId: "$tagId"
              }
            }
          ) {
            clientMutationId
          }
        }
      `;

      // Dynamically generate calls to 'createUserRoleTagAssignment' mutation depending on the number of tag assignments created by the user
      const createTagMutations = tagsToCreate.map((tagName, index) => {
        const tagId: string = initialData.data?.tagsOptions
          ? initialData.data.tagsOptions[tagName].id
          : null;

        if (tagId) {
          const lines = print(createTagMutationTemplate).split(`\n`);
          // Remove enclosing mutation and replace placeholders
          return lines.slice(1, lines.length - 2).map(str =>
            str
              .replace(`alias`, `create${index}`)
              .replace(`$userRoleId`, userRoleId)
              .replace(`$tagId`, tagId),
          );
        }
        return '';
      });

      // Following template mutation is used to dynamically generate calls to 'deleteUserRoleTagAssignment' mutation
      const deleteTagMutationTemplate = gql`
        mutation DeleteTag($id: UUID!) {
          alias: deleteUserRoleTagAssignment(input: { id: "$id" }) {
            clientMutationId
          }
        }
      `;

      // Dynamically generate calls to 'deleteUserRoleTagAssignment' mutation depending on the number of tag assignments created by the user
      const deleteTagMutations = tagsToDelete.map((tagName, index) => {
        const tagAssignmentId = initialData.data?.tagAssignments
          ? initialData.data?.tagAssignments[tagName]
          : null;

        if (tagAssignmentId) {
          const lines = print(deleteTagMutationTemplate).split(`\n`);
          // Remove enclosing mutation and replace placeholders
          return lines
            .slice(1, lines.length - 2)
            .map(str =>
              str
                .replace(`alias`, `delete${index}`)
                .replace(`$id`, tagAssignmentId),
            );
        }
        return '';
      });

      // Mutation to update user role along with created and deleted tag assignments
      const updateUserRole = gql`
        mutation UpdateUserRole($input: UpdateUserRoleInput!) {
          updateUserRole(input: $input) {
            clientMutationId
            userRole {
              name
              description
              updatedAt
              updatedBy
            }
          }
          ${createTagMutations.join('\n')}
          ${deleteTagMutations.join('\n')}
        }`;

      try {
        client.mutate({
          mutation: updateUserRole,
          variables: {
            input: {
              id: userRoleId,
              patch: createUpdateDto(formData, initialData.data, userRoleId),
            },
          },
        });
      } catch (error) {
        // TODO: Proper error handling using setStatus or setErrors()
        // https://stackoverflow.com/questions/52986962/how-to-properly-use-formiks-seterror-method-react-library
        throw error;
      }
    },
    [userRoleId, client],
  );

  return (
    <Details
      defaultTitle={data?.userRole?.name}
      subtitle={'User Role Details'}
      alwaysShowActionsPanel={true}
      actions={actions}
      onActionSelected={actionSelectedHandler}
      validationSchema={userRoleDetailSchema}
      initialData={{
        data: {
          ...data?.userRole,
          tags: Object.keys(tagAssignments),
          tagsOptions: tagsOptions,
          tagAssignments: tagAssignments,
        },
        loading,
        error: error?.message,
      }}
      saveData={onSubmit}
    >
      <Form tagsOptions={Object.keys(tagsOptions)} />
    </Details>
  );
};

const Form: React.FC<{
  tagsOptions: string[];
}> = ({ tagsOptions }) => {
  const [showHistory, setShowHistory] = useState(false);
  const toggleHistory = () => {
    setShowHistory(prev => !prev);
  };

  return (
    <>
      <Field name="name" label="Name" as={SingleLineTextField} />
      <Field name="description" label="Description" as={SingleLineTextField} />
      <Field
        name="tags"
        label="Tags"
        tagsOptions={tagsOptions}
        as={TagsField}
      />
      <Field name="tenantId" label="Tenant ID" as={ReadOnlyField} />
      <Field name="applicationId" label="Application ID" as={ReadOnlyField} />
      <Field name="id" label="User Role ID" as={ReadOnlyField} />
      <div className={classes.history} onClick={toggleHistory}>
        <svg viewBox="0 0 100 100" className={classes.historyIcon}>
          <rect width="100" height="100" strokeWidth="5" />
          <line x1="10" y1="50" x2="90" y2="50" strokeWidth="5" />
          <line x1="50" y1="10" x2="50" y2="90" strokeWidth="5" />
        </svg>
        History
      </div>
      {showHistory && (
        <div>
          <Field name="createdAt" label="Created At" as={DateTimeField} />
          <Field name="updatedAt" label="Updated At" as={DateTimeField} />
          <Field name="createdBy" label="Created By" as={ReadOnlyField} />
          <Field name="updatedBy" label="Updated By" as={ReadOnlyField} />
        </div>
      )}
    </>
  );
};

function useActions(id: string) {
  const history = useHistory();
  const [deleteUserRoleMutation] = useDeleteUserRoleMutation({
    client,
    fetchPolicy: 'no-cache',
  });

  const actions: ActionData[] = [
    {
      actionId: 'permissions',
      label: 'Permissions',
    },
    {
      actionId: 'parentRoleAssignments',
      label: 'Parent User Role Assignments',
    },
    {
      actionId: 'userAssignments',
      label: 'User Assignments',
    },
    {
      actionId: 'delete',
      label: 'Delete',
      confirmationRequired: true,
    },
  ];

  const actionSelectedHandler = (action: string): void => {
    const showPermissions = (): void => {
      // TODO: navigate to permissions
    };

    const showParentRoleAssignments = (): void => {
      // TODO: navigate to Parent User Role Assignments
    };

    const showUserAssignments = (): void => {
      // TODO: navigate to User Assignments
    };

    const deleteUserRole = async (): Promise<void> => {
      try {
        await deleteUserRoleMutation({ variables: { input: { id } } });
        history.push('/accessManagement/userRoles');
      } catch (error) {
        // TODO: Some proper error handling
        console.log(error);
      }
    };

    switch (action) {
      case 'permissions':
        showPermissions();
        break;
      case 'parentRoleAssignments':
        showParentRoleAssignments();
        break;
      case 'userAssignments':
        showUserAssignments();
        break;
      case 'delete':
        deleteUserRole();
        break;
    }
  };
  return { actions, actionSelectedHandler } as const;
}

function createUpdateDto(
  currentValues: FormikValues,
  initialValues: FormikValues | undefined,
  id: string,
): any {
  const updateData = initialValues
    ? Object.keys(currentValues).reduce<{
        [key: string]: any;
      }>(
        (previous, current) => {
          if (currentValues[current] !== initialValues[current]) {
            previous[current] = currentValues[current];
          }
          return previous;
        },
        { id },
      )
    : currentValues;
  delete updateData['id'];
  delete updateData['tags'];
  delete updateData['tagsOptions'];
  delete updateData['tagAssignments'];
  return updateData;
}

const GET_USER_ROLE_NAME = gql`
  query UserRoleName($id: UUID!) {
    userRole(id: $id) {
      name
    }
  }
`;

export const UserRoleDetailsCrumb: BreadcrumbResolver = params => {
  return async (): Promise<string> => {
    const response = await client.query({
      query: GET_USER_ROLE_NAME,
      variables: {
        id: params['userRoleId'],
      },
    });
    return response.data.userRole.name as string;
  };
};
