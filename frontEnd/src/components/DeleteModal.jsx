import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

export default function DeleteModal({ open, handleClose,label, record, onDelete }) {
  const handleDelete = () => {
    onDelete(record);
    handleClose();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography
            id="delete-modal-title"
            variant="h6"
            fontWeight="bold"
            gutterBottom
          >
            Delete {label}
          </Typography>

          <Typography
            id="delete-modal-description"
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Are you sure you want to delete {record?.name}? This action cannot be
            undone.
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}
