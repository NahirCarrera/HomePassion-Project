import { useEffect, useState } from 'react';
import {
  Button,
  Typography,
  Box,
  TextField,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import Navbar from '../components/Navbar';

interface Customer {
  customer_id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
}

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/customers/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setCustomers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddCustomer = async () => {
    if (customerName.trim() === '' || customerEmail.trim() === '' || customerPhone.trim() === '' || customerAddress.trim() === '') {
      alert('Por favor, completa todos los campos.');
      return;
    }
    const token = localStorage.getItem('token');
    const newCustomer = { 
      customer_name: customerName, 
      customer_email: customerEmail, 
      customer_phone: customerPhone,
      customer_address: customerAddress
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/customers/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newCustomer),
    });

    if (response.ok) {
      const data = await response.json();
      setCustomers([...customers, data]);
      resetForm();
      setIsModalOpen(false);
    } else {
      console.error('Error adding customer:', response.statusText);
    }
  };

  const handleEditCustomer = (customer: Customer) => {
    setCustomerName(customer.customer_name);
    setCustomerEmail(customer.customer_email);
    setCustomerPhone(customer.customer_phone);
    setCustomerAddress(customer.customer_address);
    setEditId(customer.customer_id);
    setIsModalOpen(true);
  };

  const handleUpdateCustomer = async () => {
    if (customerName.trim() === '' || customerEmail.trim() === '' || customerPhone.trim() === '' || customerAddress.trim() === '') {
      alert('Por favor, completa todos los campos.');
      return;
    }
    const token = localStorage.getItem('token');
    const updatedCustomer = { 
      customer_name: customerName, 
      customer_email: customerEmail, 
      customer_phone: customerPhone,
      customer_address: customerAddress
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/customers/${editId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedCustomer),
    });

    if (response.ok) {
      const data = await response.json();
      setCustomers(customers.map(c => (c.customer_id === editId ? data : c)));
      resetForm();
      setIsModalOpen(false);
    } else {
      console.error('Error updating customer:', response.statusText);
    }
  };

  const handleDeleteCustomer = async (id: number) => {
    const userConfirmed = confirm("Are you sure you want to delete this customer?");
    
    if (!userConfirmed) {
      return;
    }
    
    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/customers/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });    

    if (response.ok) {
      setCustomers(customers.filter(c => c.customer_id !== id));
    } else {
      console.error('Error deleting customer:', response.statusText);
    }
  };

  const resetForm = () => {
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setCustomerAddress('');
    setEditId(null);
  };

  const openModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    const userConfirmed = confirm("Are you sure you want to cancel?");
    
    if (!userConfirmed) {
      return;
    }
    resetForm();
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Clientes</Typography>
        <Button
          data-testid="agregar-cliente"
          variant="contained"
          color="primary"
          onClick={openModal}
          sx={{
            mb: 2,
            '&:hover': {
              backgroundColor: 'purple',
            },
          }}
        >
          Agregar Cliente
        </Button>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {Array.isArray(customers) && customers.length > 0 ? (
            customers.map(customer => (
              <Card key={customer.customer_id} sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {customer.customer_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Email: {customer.customer_email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Phone: {customer.customer_phone}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Address: {customer.customer_address}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="secondary" onClick={() => handleEditCustomer(customer)} sx={{
                    mb: 2,
                    '&:hover': {
                      backgroundColor: 'purple',
                      color: 'white'
                    },
                  }}>Editar</Button>
                  <Button size="small" color="error" onClick={() => handleDeleteCustomer(customer.customer_id)} sx={{
                    mb: 2,
                    '&:hover': {
                      backgroundColor: 'red',
                      color: 'white'
                    },
                  }}>Eliminar</Button>
                </CardActions>
              </Card>
            ))
          ) : (
            <Typography variant="body1">No hay clientes disponibles.</Typography>
          )}
        </Box>
      </Box>
      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle>{editId ? 'Editar Cliente' : 'Agregar Cliente'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre del Cliente"
            value={customerName}
            onChange={e => setCustomerName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Correo Electrónico"
            value={customerEmail}
            onChange={e => setCustomerEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Teléfono"
            value={customerPhone}
            onChange={e => setCustomerPhone(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Dirección"
            value={customerAddress}
            onChange={e => setCustomerAddress(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="secondary">
            Cancelar
          </Button>
          <Button onClick={editId ? handleUpdateCustomer : handleAddCustomer} color="primary">
            {editId ? 'Actualizar' : 'Agregar'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
