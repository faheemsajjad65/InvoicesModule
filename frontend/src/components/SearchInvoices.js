import React from 'react';
import { 
  TextField, 
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  search: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
    '& > *': {
      marginRight: theme.spacing(2)
    }
  }
}));

const SearchInvoices = ({handleSearch,setOpenAddInvoiceDialog}) => {
  const classes = useStyles();
      
  return (
    <div className={classes.search}>
        <TextField label="Search" variant="outlined" size="small" onChange={handleSearch} />
        
        <Button variant="contained" color="primary" onClick={() => setOpenAddInvoiceDialog(true)}>
            <Add />
        </Button>
    </div>
  );
};
      
export default SearchInvoices;
