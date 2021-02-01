import { notification } from "antd";
import { GraphQLError } from "graphql";
import React from "react";

export interface GraphQLErrorComponentProps {
  graphQlErrors: ReadonlyArray<GraphQLError>;
}

const notifyErrors = (graphQlErrors: ReadonlyArray<GraphQLError>) => {
  const errorDescriptions = graphQlErrors.map((error: any) => {
    return (
      <div key={error.path}>
        Code: {error.code}
        <br />
        Message: {error.message}
        <br />
        Path: {error.path}
        {error.details ? (
          <>
            <br />
            Details: {JSON.stringify(error.details)}
          </>
        ) : null}
      </div>
    );
  });

  errorDescriptions.forEach((errorDescription) => {
    notification.error({
      message: <b>Aw, Snap!</b>,
      description: errorDescription,
      duration: 0,
      style: {
        width: 650,
        marginLeft: 335 - 650,
      },
    });
  });
};

export const GraphQLErrorComponent: React.FC<GraphQLErrorComponentProps> = (
  props
) => {
  const { graphQlErrors } = props;
  notifyErrors(graphQlErrors);

  return null;
};
