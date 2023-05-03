import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Edit, Delete } from '@material-ui/icons';


const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  tableRow: {
    cursor: 'pointer'
  },
  tableCell: {
    fontWeight: 'bold'
  }
}));

const InvoiceList = ({handleSort,sortField,sortOrder,invoices,setSelectedInvoice,setOpenEditInvoiceDialog,setOpenDeleteInvoiceDialog}) => {
  const classes = useStyles();
      
  return (
    <Table className={classes.table}>
    <TableHead>
        <TableRow>
        <TableCell className={classes.tableCell} onClick={() => handleSort('invoiceNo')} >Invoice No {sortField === 'invoiceNo' && <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>}</TableCell>
        <TableCell className={classes.tableCell} onClick={() => handleSort('description')} >Description {sortField === 'description' && <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>}</TableCell>
        <TableCell className={classes.tableCell} onClick={() => handleSort('status')} >Status {sortField === 'status' && <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>}</TableCell>
        <TableCell className={classes.tableCell} onClick={() => handleSort('createdDate')} >Created Date {sortField === 'createdDate' && <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>}</TableCell>
        <TableCell className={classes.tableCell} onClick={() => handleSort('amount')} >Amount {sortField === 'amount' && <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>}</TableCell>
        <TableCell className={classes.tableCell}>Actions</TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
        {
        invoices.map((invoice) => (
            <TableRow key={invoice.id} className={classes.tableRow} onClick={() => setSelectedInvoice(invoice)}>
            <TableCell>{invoice.invoiceNo}</TableCell>
            <TableCell>{invoice.description}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell>{new Date(invoice.createdDate).toLocaleDateString()}</TableCell>
            <TableCell>{invoice.amount}</TableCell>
            <TableCell>
                <IconButton onClick={(event) => {
                event.stopPropagation();
                setSelectedInvoice(invoice);
                setOpenEditInvoiceDialog(true);
                }}>
                <Edit />
                </IconButton>
                <IconButton onClick={(event) => {
                event.stopPropagation();
                setSelectedInvoice(invoice);
                setOpenDeleteInvoiceDialog(true);
                }}>
                <Delete />
                </IconButton>
            </TableCell>
            </TableRow>
        ))
        }
    </TableBody>
    </Table>
  );
};
      
export default InvoiceList;
