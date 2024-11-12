import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

import { ResponsiveDialogType } from "./ResponsiveDialog.types";

export const ResponsiveDialog = (props: ResponsiveDialogType) => {
  return (
    <Dialog
      fullScreen={props.fullScreen}
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {props.showContinueButton && (
          <Button autoFocus onClick={props.handleContinue}>
            Yes
          </Button>
        )}
        <Button onClick={props.handleClose} autoFocus>
          {props.CloseButtonName}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
