import axios from 'axios';

const BASE_URL = 'http://localhost:3001/invoices';

export const getInvoices = async (filters) => {
  const response = await axios.get(BASE_URL, {params: filters});
  return response.data;
};

export const addInvoice = async (invoice) => {
  const response = await axios.post(BASE_URL, invoice);
  return response.data;
};

export const editInvoice = async (id, invoice) => {
  const response = await axios.put(`${BASE_URL}/${id}`, invoice);
  return response.data;
};

export const deleteInvoice = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
