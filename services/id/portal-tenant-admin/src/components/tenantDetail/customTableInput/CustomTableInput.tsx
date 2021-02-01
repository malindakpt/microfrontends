import * as React from "react";
import { Input } from "@material-ui/core";

interface Props {
  isError: boolean;
  defaultVal: string;
  onChange: (e: any) => void;
}
export const CustomTableInput: React.FC<Props> = ({
  isError,
  defaultVal,
  onChange
}) => {
  const styles = {
    fontSize: "13px"
  };
  return (
    <Input
      style={styles}
      error={isError}
      defaultValue={defaultVal}
      onChange={e => onChange(e.target.value)}
    ></Input>
  );
};
