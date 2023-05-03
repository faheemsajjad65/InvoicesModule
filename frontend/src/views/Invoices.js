import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  TablePagination 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SearchInvoices from '../components/SearchInvoices';
import InvoicesList from '../components/InvoicesList';

import AddInvoiceDialog from '../components/AddInvoiceDialog';
import EditInvoiceDialog from '../components/EditInvoiceDialog';
import DeleteInvoiceDialog from '../components/DeleteInvoiceDialog';

import { getInvoices, addInvoice, editInvoice, deleteInvoice } from '../actions/api';

axios.defaults.baseURL = 'http://localhost:3001';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(3)
  },
  pagination: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(3),
    '& > *': {
      marginLeft: theme.spacing(2)
    }
  }
}));

const Invoices = () => {
  const classes = useStyles();

  const [invoices, setInvoices] = useState([]);
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [selectedInvoice, setSelectedInvoice] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openAddInvoiceDialog, setOpenAddInvoiceDialog] = useState(false);
  const [openEditInvoiceDialog, setOpenEditInvoiceDialog] = useState(false);
  const [openDeleteInvoiceDialog, setOpenDeleteInvoiceDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const fetchInvoices = async () => {
    try {
      const response = await getInvoices({
        search: searchTerm,
        sort: sortField,
        order: sortOrder,
        page: page,
        limit: rowsPerPage
      });
      
      setInvoices(response.invoices);
      setTotalInvoices(response.total);
    } catch (error) {
      console.log(error);
    }
  };
      
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };
      
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
      
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
      
  const handleAddInvoice = async (newInvoice) => {
    try {
      const response = await addInvoice(newInvoice);
      setInvoices([...invoices, newInvoice]);
      setOpenAddInvoiceDialog(false);
    } catch (error) {
      console.log(error);
    }
  };
      
  const handleEditInvoice = async (updatedInvoice) => {
    try {
      const response = await editInvoice(selectedInvoice.id,updatedInvoice);
      fetchInvoices();
      setOpenEditInvoiceDialog(false);
      setSelectedInvoice({});
    } catch (error) {
      console.log(error);
    }
  };
      
  const handleDeleteInvoice = async () => {
    try {
      await deleteInvoice(selectedInvoice.id);
      fetchInvoices();
      setOpenDeleteInvoiceDialog(false);
      setSelectedInvoice({});
    } catch (error) {
      console.log(error);
    }
  };

  const handleSort = field => {
    setSortField(field);

    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortOrder('asc');
    }
    setPage(0)
  };
      
  useEffect(() => {
    fetchInvoices();
  }, [sortOrder,searchTerm,rowsPerPage,page]);

      
  return (
    <div className={classes.root}>

      <SearchInvoices 
        handleSearch={handleSearch} 
        setOpenAddInvoiceDialog={setOpenAddInvoiceDialog} 
      />

      <InvoicesList 
        handleSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder} 
        invoices={invoices} 
        setSelectedInvoice={setSelectedInvoice} 
        setOpenEditInvoiceDialog={setOpenEditInvoiceDialog} 
        setOpenDeleteInvoiceDialog={setOpenDeleteInvoiceDialog} 
      />

      <TablePagination
        component="div"
        count={totalInvoices}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange ={handleRowsPerPageChange}
      />

      <AddInvoiceDialog 
        open={openAddInvoiceDialog} 
        onClose={() => setOpenAddInvoiceDialog(false)} 
        onAdd={handleAddInvoice} />

      <EditInvoiceDialog 
        open={openEditInvoiceDialog} 
        onClose={() => setOpenEditInvoiceDialog(false)} 
        invoice={selectedInvoice} onEdit={handleEditInvoice} />

      <DeleteInvoiceDialog 
        open={openDeleteInvoiceDialog} 
        onClose={() => setOpenDeleteInvoiceDialog(false)} 
        invoice={selectedInvoice} onDelete={handleDeleteInvoice} />
    
    </div>
  );
};
      
export default Invoices;
