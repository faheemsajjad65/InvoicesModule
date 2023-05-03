// Import the necessary modules
import React, { useState, useEffect } from 'react';
import { 
  TablePagination 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Import Components for further use
import SearchInvoices from '../components/SearchInvoices';
import InvoicesList from '../components/InvoicesList';

import AddInvoiceDialog from '../components/AddInvoiceDialog';
import EditInvoiceDialog from '../components/EditInvoiceDialog';
import DeleteInvoiceDialog from '../components/DeleteInvoiceDialog';

// Import actions 
import { getInvoices, addInvoice, editInvoice, deleteInvoice } from '../actions/api';

// Styling the component
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

  // States for managing invoices data, filters, and sorting
  const [invoices, setInvoices] = useState([]);
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState({});

  // States for managing pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // State for managing dialog boxes (add, edit, delete)
  const [openAddInvoiceDialog, setOpenAddInvoiceDialog] = useState(false);
  const [openEditInvoiceDialog, setOpenEditInvoiceDialog] = useState(false);
  const [openDeleteInvoiceDialog, setOpenDeleteInvoiceDialog] = useState(false);

  // Effect hook to fetch invoices data from API on component mount
  useEffect(() => {
    fetchInvoices();
  }, [sortOrder, searchTerm, rowsPerPage, page]);

  
  // Handle fetch Invoices from API
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
      
  // Handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };
      
  // Handle page change
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  
  // Handle rows per page change
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
      
  // Handle Add new Invoice using API
  const handleAddInvoice = async (newInvoice) => {
    try {
      const response = await addInvoice(newInvoice);
      setInvoices([...invoices, newInvoice]);
      setOpenAddInvoiceDialog(false);
    } catch (error) {
      console.log(error);
    }
  };
      
  // Handle Edit Invoice using API
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
      
  // Handle Delete Invoice using API
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

  // Handle sort field change
  const handleSort = field => {
    setSortField(field);

    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortOrder('asc');
    }
    setPage(0)
  };
      
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
