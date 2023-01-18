import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Alert } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { Input } from "./Input";
import { Button } from "./Button";
import { Loading } from "./Loading";

export function DialogComponent({
  open,
  handleClose,
  title,
  handleSubmit,
  todo,
  description,
  error,
  editTitle,
  editDescription,
  onChangeTitle,
  onChangeDescr,
  dialogTitle,
  loading,
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent className="dialog_inputs">
        <Input
          className="modal_input"
          placeholder="Title"
          value={todo ? editTitle : title.value}
          onChange={todo ? onChangeTitle : title.onChange}
          type="text"
        />
        <Input
          className="modal_input"
          placeholder="Description"
          value={todo ? editDescription : description.value}
          onChange={todo ? onChangeDescr : description.onChange}
          type="text"
        />
      </DialogContent>
      <DialogActions className="dialog_actions">
        {loading ? (
          <Loading />
        ) : (
          <>
            <Button
              className="modal_btn"
              type="button"
              onClick={handleClose}
              title="Close"
            />
            <Button
              className="modal_btn"
              type="button"
              onClick={handleSubmit}
              title={todo ? "Edit" : "Add"}
            />
          </>
        )}
      </DialogActions>
      {error && (
        <Alert sx={{ width: "300px", m: 2 }} severity="error">
          {error}
        </Alert>
      )}
    </Dialog>
  );
}
