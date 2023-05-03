import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@material-ui/core';

const AddInvoiceDialog = ({ open, onClose, onAdd }) => {

  // States for managing dialog box fields
  const [invoiceNo, setInvoiceNo] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [amount, setAmount] = useState('');

  // Handle add new invoice params
  const handleAdd = () => {
    const newInvoice = {
      invoiceNo,
      description,
      status,
      createdDate,
      amount,
    };
    onAdd(newInvoice);
    setInvoiceNo('');
    setDescription('');
    setStatus('');
    setCreatedDate('');
    setAmount('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Invoice</DialogTitle>
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
        <Button onClick={handleAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddInvoiceDialog;