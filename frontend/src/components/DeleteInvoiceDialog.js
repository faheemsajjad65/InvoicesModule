import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
  } from '@material-ui/core';
  
  const DeleteInvoiceDialog = ({ open, onClose, onDelete, invoice }) => {

    // Handle Delete Invoice
    const handleDelete = () => {
      onDelete(invoice);
      onClose();
    };
  
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Delete Invoice</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete invoice #{invoice.invoiceNo}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default DeleteInvoiceDialog;
  