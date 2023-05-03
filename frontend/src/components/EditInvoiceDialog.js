import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@material-ui/core';

const EditInvoiceDialog = ({ open, onClose, onEdit, invoice }) => {

  // States for managing dialog box fields
  const [invoiceNo, setInvoiceNo] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [amount, setAmount] = useState('');

  // Effect hook invoices data on component mount
  useEffect(() => {
    setInvoiceNo(invoice.invoiceNo);
    setDescription(invoice.description);
    setStatus(invoice.status);
    setCreatedDate(invoice.createdDate);
    setAmount(invoice.amount);
  }, [invoice]);

  // Handle Save form
  const handleSave = () => {
    const updatedInvoice = {
      ...invoice,
      invoiceNo,
      description,
      status,
      createdDate,
      amount,
    };
    onEdit(updatedInvoice);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Invoice</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Invoice No"
          value={invoiceNo}
          onChange={(event) => setInvoiceNo(event.target.value)}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Created Date"
          type="date"
          value={createdDate}
          onChange={(event) => setCreatedDate(event.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Amount"
          type="number"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditInvoiceDialog;
