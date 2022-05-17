import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { TextField } from '@mui/material';
import { addCustomerAddressRequest, removeCustomerAddressRequest, updateCustomerAddressRequest } from '../utils/requests';

const addrKeys = [
  "firstName",
  "lastName",
  "phone",
  "firstAddress",
  "secondAddress",
  "city",
  "country",
  "postcode",
]

export default function AdminCard(props) {
  const { customerId, type, address, setUpdate } = props;
  const actionRef = React.useRef(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (actionRef.current <= 2) {
      const form = new FormData(event.currentTarget);
      var data = {
        "customerId": customerId,
        "city": form.get("city"),
        "country": form.get("country"),
        "firstAddress": form.get("firstAddress"),
        "firstName": form.get("firstName"),
        "lastName": form.get("lastName"),
        "phone": form.get("phone"),
        "postcode": form.get("postcode"),
        "secondAddress": form.get("secondAddress")
      }
      if (type === 'UPDATE') {
        data['id'] = address.id;
        updateCustomerAddressRequest(data, setUpdate);
      }
      else {
        addCustomerAddressRequest(data, setUpdate);
      }
    }
    else if (actionRef.current === 3) {
      removeCustomerAddressRequest(address.id, setUpdate);
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ m: 3, textAlign: 'center' }}>
      <Card sx={{ width: '100%' }}>
        <CardHeader title={type === 'ADD' ? "Add New Address" : "Address"} />
        <CardContent>
          <Grid container rowSpacing={0} columnSpacing={3}>
            {addrKeys.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <TextField
                  fullWidth
                  margin="normal"
                  required
                  id={item}
                  label={item}
                  name={item}
                  defaultValue={type === 'UPDATE' ? address[item] : ''}
                  autoComplete={item}
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            variant='contained'
            type="submit"
            disabled={type === 'UPDATE'}
            sx={{ ml: 3, mr: 1 }}
            onClick={() => {
              actionRef.current = 1;
            }}>
            add
          </Button>
          <Button
            variant='contained'
            type="submit"
            sx={{ ml: 3, mr: 1 }}
            disabled={type === 'ADD'}
            onClick={() => {
              actionRef.current = 2;
            }}>
            update
          </Button>
          <Button
            variant='contained'
            type="submit"
            disabled={type === 'ADD'}
            sx={{ m: 3 }}
            onClick={() => {
              actionRef.current = 3;
            }}>
            delete
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

