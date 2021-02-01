import React, { useState, useContext, useEffect } from "react";
import MaterialTable, { Column } from "material-table";
import { useHistory } from "react-router-dom";
import {
  useCreateTenantMutation,
  TenantStatus,
  useAllTenantsQuery,
  Tenant,
  useDeleteTenantMutation,
  useUpdateTenantMutation
} from "../../generated/graphql";
import { AppContext } from "../../app/App";
import { useApolloClient } from "@apollo/react-hooks";

type TenantForTableDef = { boolStatus: boolean } & Tenant;
interface TableDef {
  columns: Array<Column<TenantForTableDef>>;
  data: TenantForTableDef[];
}

export const Tenants: React.FC = () => {
  const context = useContext(AppContext);
  const apolloClient = useApolloClient();
  const history = useHistory();
  const onBreadcrumbChange = context.onBreadcrumbChange;
  const [dataChangedState, setDataChanged] = useState(false);

  useEffect(() => {
    onBreadcrumbChange([{ label: "Tenants" }]);
  }, [onBreadcrumbChange]);

  const { loading, error, data } = useAllTenantsQuery({
    client: apolloClient,
    fetchPolicy: "no-cache"
  });
  const [addTenant] = useCreateTenantMutation({
    client: apolloClient,
    fetchPolicy: "no-cache"
  });
  const [deleteTenant] = useDeleteTenantMutation({
    client: apolloClient,
    fetchPolicy: "no-cache"
  });
  const [updateTenant] = useUpdateTenantMutation({
    client: apolloClient,
    fetchPolicy: "no-cache"
  });

  const tableData = data?.tenants?.nodes.map(tenant => {
    const localTenant = {
      ...tenant,
      boolStatus: tenant?.status === TenantStatus.Enabled ? true : false
    };
    return localTenant;
  }) as TenantForTableDef[];

  const tableDef: TableDef = {
    columns: [
      { title: "Name", field: "name", defaultSort: "asc" },
      {
        title: "Active",
        field: "boolStatus",
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

  const showErrorAlert = (errorArr: Array<{ message: string }>) => {
    let errString = "";
    errorArr.forEach(value => {
      errString = errString + "\t\t" + value.message;
    });
    context.onShowAlert({ title: "Error", text: errString });
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
        headerStyle: { paddingLeft: "30px" }
      }}
      onRowClick={(event: any, rowData: any) => {
        if (rowData) {
          history.push("/tenants/detail/" + rowData.id + "/" + rowData.name);
        }
      }}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            addTenant({
              variables: {
                dto: {
                  tenant: {
                    name: newData.name
                  }
                }
              }
            })
              .then(res => {
                const tableArr = data?.tenants?.nodes;
                tableArr?.push(
                  res.data?.createTenant?.tenant as TenantForTableDef
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
          }),

        onRowUpdate: newData =>
          new Promise(resolve => {
            updateTenant({
              variables: {
                dto: {
                  id: newData?.id,
                  patch: {
                    name: newData.name,
                    status: newData.boolStatus
                      ? TenantStatus.Enabled
                      : TenantStatus.Disabled
                  }
                }
              }
            })
              .then(res => {
                const updatedObj = res.data?.updateTenant
                  ?.tenant as TenantForTableDef;
                updatedObj.boolStatus =
                  updatedObj?.status === TenantStatus.Enabled ? true : false;
                const tableArr = data?.tenants?.nodes as Tenant[];
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
          }),

        onRowDelete: oldData =>
          new Promise(resolve => {
            deleteTenant({
              variables: {
                dto: {
                  id: oldData.id
                }
              }
            })
              .then(res => {
                const tableArr = data?.tenants?.nodes as Tenant[];
                const idx = tableArr?.findIndex(
                  ele => ele.id === res.data?.deleteTenant?.tenant?.id
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
        <h3>Registered Tenants</h3>
      </div>
      <div>{renderResult}</div>
    </>
  );
};
