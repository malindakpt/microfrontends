import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Typography } from "@material-ui/core";

export interface AlertProps {
  isOpen?: boolean;
  title?: string;
  text?: string;
  subText?: string;
  onAlertClose?: (success: boolean) => void;
}
export const AlertDialog: React.FC<AlertProps> = ({
  isOpen = false,
  title,
  text,
  subText,
  onAlertClose = (success: boolean) => {}
}) => {
  const [open, setOpen] = useState(isOpen);
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          onAlertClose(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>{text}</Typography>
          {subText && <TextField id="standard-basic" value={subText} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onAlertClose(false)} color="primary" autoFocus>
            GOT IT!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
