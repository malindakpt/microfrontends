import React, { useContext, useState, useEffect } from "react";
import MaterialTable, { Column } from "material-table";
import {
  useTenantAdminsQuery,
  TenantAdmin,
  useCreateTenantAdminMutation,
  useDeleteTenantAdminMutation,
  useUpdateTenantAdminMutation,
  useGenerateTenantAdminPasswordMutation
} from "../../generated/graphql";
import { useParams } from "react-router-dom";
import { AppContext } from "../../app/App";
import { CustomTableInput } from "./customTableInput/CustomTableInput";
import { useApolloClient } from "@apollo/react-hooks";

interface TableDef {
  columns: Array<Column<TenantAdmin>>;
  data: TenantAdmin[];
}

export const TenantDetail: React.FC = () => {
  const { tenantId, name } = useParams();
  const context = useContext(AppContext);
  const apolloClient = useApolloClient();
  const onBreadcrumbChange = context.onBreadcrumbChange;
  const [dataChangedState, setDataChanged] = useState(false);
  const [emailInputError, setEmailInputError] = useState(false);

  useEffect(() => {
    onBreadcrumbChange([
      { url: "/tenants", label: "Tenants" },
      { label: "Tenant Administrators" }
    ]);
  }, [onBreadcrumbChange]);

  const { loading, error, data } = useTenantAdminsQuery({
    client: apolloClient,
    fetchPolicy: "no-cache",
    variables: {
      dto: {
        tenantId: tenantId
      }
    }
  });
  const [addTenantAdmin] = useCreateTenantAdminMutation({
    client: apolloClient,
    fetchPolicy: "no-cache"
  });
  const [deleteTenantAdmin] = useDeleteTenantAdminMutation({
    client: apolloClient,
    fetchPolicy: "no-cache"
  });
  const [updateTenantAdmin] = useUpdateTenantAdminMutation({
    client: apolloClient,
    fetchPolicy: "no-cache"
  });
  const [generateTenantAdminPassword] = useGenerateTenantAdminPasswordMutation({
    client: apolloClient,
    fetchPolicy: "no-cache"
  });

  const tableData = data?.tenantAdmins?.nodes as TenantAdmin[];
  const tableDef: TableDef = {
    columns: [
      { title: "Name", field: "name" },
      {
        title: "Email",
        field: "email",
        editComponent: props => (
          <CustomTableInput
            defaultVal={props.rowData.email}
            isError={emailInputError}
            onChange={props.onChange}
          />
        )
      },
      {
        title: "Active",
        field: "active",
        type: "boolean",
        editable: "onUpdate"
      },
      {
        title: "Created At",
        field: "createdAt",
        editable: "never",
        type: "datetime"
      },
      {
        title: "Updated At",
        field: "updatedAt",
        editable: "never",
        type: "datetime"
      }
    ],
    data: tableData
  };

  const generatePwd = (adminId: string, email: string) => {
    generateTenantAdminPassword({
      variables: { dto: { id: adminId } }
    }).then(response => {
      const pwd = response.data?.generateTenantAdminPassword
        ?.password as string;
      context.onShowAlert({
        title: "New Password - " + email,
        text:
          "Please find below the newly generated password. Once the dialog is closed the password will not be retrievable. ",
        subText: pwd
      });
    });
  };

  const showErrorAlert = (errorArr: Array<{ message: string }>) => {
    let errString = "";
    errorArr.forEach(value => {
      errString = errString + "\t\t" + value.message;
    });
    context.onShowAlert({ title: "Error", text: errString });
  };

  const validateEmail = (email: string) => {
    var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/gim;
    if (email === "" || !re.test(email)) {
      context.onShowAlert({ title: "Error", text: "Invalid email address" });
      return false;
    }
    return true;
  };

  const renderResult = error ? (
    <div>Error occured while communicating to server</div>
  ) : (
    <MaterialTable
      columns={tableDef.columns}
      data={tableData}
      isLoading={loading}
      options={{
        paging: false,
        addRowPosition: "first",
        showTitle: false,
        headerStyle: {
          paddingLeft: "30px"
        }
      }}
      actions={[
        {
          icon: "vpn_key",
          tooltip: "Genrate Password",
          onClick: (event, rowData: TenantAdmin | TenantAdmin[]) => {
            const selectedRow = rowData as TenantAdmin;
            generatePwd(selectedRow.id, selectedRow.email);
          }
        }
      ]}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            if (validateEmail(newData.email)) {
              setEmailInputError(false);
              addTenantAdmin({
                variables: {
                  dto: {
                    tenantAdmin: {
                      email: newData.email,
                      name: newData.name,
                      tenantId: tenantId
                    }
                  }
                }
              })
                .then(res => {
                  const tableArr = data?.tenantAdmins?.nodes;
                  tableArr?.push(
                    res.data?.createTenantAdmin?.tenantAdmin as TenantAdmin
                  );
                  //To force a rerender of the UI
                  setDataChanged(!dataChangedState);
                })
                .catch(error => {
                  showErrorAlert(error.graphQLErrors);
                })
                .finally(() => {
                  resolve();
                });
            } else {
              setEmailInputError(true);
              reject();
            }
          }),

        onRowUpdate: newData =>
          new Promise((resolve, reject) => {
            if (validateEmail(newData.email)) {
              updateTenantAdmin({
                variables: {
                  dto: {
                    id: newData.id,
                    patch: {
                      active: newData.active,
                      email: newData.email,
                      name: newData.name
                    }
                  }
                }
              })
                .then(res => {
                  const updatedObj = res.data?.updateTenantAdmin
                    ?.tenantAdmin as TenantAdmin;
                  const tableArr = data?.tenantAdmins?.nodes as TenantAdmin[];
                  const idx = tableArr?.findIndex(
                    ele => ele.id === updatedObj.id
                  );
                  tableArr.splice(idx, 1, updatedObj);
                  setDataChanged(!dataChangedState);
                })
                .catch(error => {
                  showErrorAlert(error.graphQLErrors);
                })
                .finally(() => {
                  resolve();
                });
            } else {
              setEmailInputError(true);
              reject();
            }
          }),

        onRowDelete: oldData =>
          new Promise(resolve => {
            deleteTenantAdmin({
              variables: {
                dto: {
                  id: oldData.id
                }
              }
            })
              .then(res => {
                const tableArr = data?.tenantAdmins?.nodes as TenantAdmin[];
                const idx = tableArr?.findIndex(
                  ele => ele.id === res.data?.deleteTenantAdmin?.tenantAdmin?.id
                );
                tableArr.splice(idx, 1);
                setDataChanged(!dataChangedState);
              })
              .catch(error => {
                showErrorAlert(error.graphQLErrors);
              })
              .finally(() => {
                resolve();
              });
          })
      }}
    />
  );

  return (
    <>
      <div>
        <h3>Tenant Administrators - {name}</h3>
      </div>
      <div>{renderResult}</div>
    </>
  );
};
