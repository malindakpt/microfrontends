import React from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";

export interface BreadcrumbNode {
  url?: string;
  label: string;
}
interface Props {
  breadcrumbArr: Array<BreadcrumbNode>;
}
export const Breadcrumb: React.FC<Props> = React.memo(({ breadcrumbArr }) => {
  const styles = {
    textDecoration: "none"
  };
  return (
    <Box component="div" m={1}>
      <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbArr.map(val => {
          if (val.url) {
            return (
              <Link key={val.label} to={val.url} style={styles}>
                {val.label}
              </Link>
            );
          } else {
            return (
              <Typography key={val.label} color="textPrimary">
                {val.label}
              </Typography>
            );
          }
        })}
      </Breadcrumbs>
    </Box>
  );
});
