// Import the necessary modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Create a new Express app
const app = express();

const port = 3001;

let invoices = [  
  {    
    id: uuidv4(),    
    invoiceNo: 'INV-001',    
    description: 'Website design and development',    
    status: 'Paid',    
    createdDate: '2022-01-01',    
    amount: 10000  
  },  
  {    
    id: uuidv4(),    
    invoiceNo: 'INV-002',    
    description: 'Mobile app development',    
    status: 'Pending',    
    createdDate: '2022-02-01',    
    amount: 8000  
  },  
  {    
    id: uuidv4(),    
    invoiceNo: 'INV-003',   
    description: 'E-commerce website development',    
    status: 'Overdue',    
    createdDate: '2022-03-01',    
    amount: 12000  
  },
  // ... up to 17 entries
];

// Set up CORS headers to allow cross-origin requests
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// Define the routes for get all invoices with filters
app.get('/invoices', (req, res) => {
  let { search, sort, order, page, limit } = req.query;

  if (!search) {
    search = '';
  }

  if (!sort) {
    sort = 'createdDate';
  }

  if (!order) {
    order = 'desc';
  }

  if (!page) {
    page = 1;
  }

  if (!limit) {
    limit = 10;
  }

  const start = page * limit;
  const end = start + parseInt(limit);

  // Filter Invoices as per params
  const filteredInvoices = invoices.filter(
    invoice =>
      invoice.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
      invoice.description.toLowerCase().includes(search.toLowerCase()) ||
      invoice.status.toLowerCase().includes(search.toLowerCase()) ||
      invoice.createdDate.toLowerCase().includes(search.toLowerCase()) ||
      invoice.amount.toString().includes(search)
  );

  // Sort Invoices as per need
  const sortedInvoices = filteredInvoices.sort((a, b) => {
    if (order === 'asc') {
      return a[sort] > b[sort] ? 1 : -1;
    } else {
      return a[sort] < b[sort] ? 1 : -1;
    }
  });

  // Get Invoices according to pagination
  const slicedInvoices = sortedInvoices.slice(start, end);

  res.json({
    invoices: slicedInvoices,
    total: filteredInvoices.length
  });
});

// Define the routes for post/add a new invoices with params
app.post('/invoices', (req, res) => {
  const { invoiceNo, description, status, createdDate, amount } = req.body;
  const newInvoice = {
      id: uuidv4(),
      invoiceNo,
      description,
      status,
      createdDate,
      amount
    };
    
  invoices.push(newInvoice);
  res.json({ success: true });
});
    
// Define the routes for update a new invoices with params
app.put('/invoices/:id', (req, res) => {
  const id = req.params.id;
  const { invoiceNo, description, status, createdDate, amount } = req.body;
  const index = invoices.findIndex(invoice => invoice.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Invoice not found' });
  } else {
    invoices[index] = {
      ...invoices[index],
      invoiceNo,
      description,
      status,
      createdDate,
      amount
    };
    res.json({ success: true });
  }
});
   

// Define the routes for remove invoices
app.delete('/invoices/:id', (req, res) => {
  const id = req.params.id;
  const index = invoices.findIndex(invoice => invoice.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Invoice not found' });
  } else {
    invoices.splice(index, 1);
    res.json({ success: true });
  }
});
    
// Server Listen on specific port
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
