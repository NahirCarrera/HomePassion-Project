import { useEffect, useState } from 'react';
import { Button, Typography, Box, TextField, Card, CardContent, CardActions, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import Navbar from '../components/Navbar';
import ReactMapGL, { Marker, Popup, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Sale {
    sale_date: string;
    sale_total: number;
    sale_status: string;
    customer: number;
    payment_method: number;
    city: number;
    latitude: number;
    longitude: number;
}

interface Customer {
    customer_id: number;
    customer_name: string;
}

interface PaymentMethod {
    payment_method_id: number;
    payment_method_name: string;
}

interface City {
    city_id: number;
    city_name: string;
    latitude: number;
    longitude: number;
}

const MAPBOX_TOKEN = 'pk.eyJ1IjoibmRjYXJyZXJhMiIsImEiOiJjbTBnOWRhMXUxNDJvMmlvZW91b3hzNTZqIn0.Ps2OFJhOdFi_E2cFwhXR1g';

export default function Sales() {
    const [sales, setSales] = useState<Sale[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [saleDate, setSaleDate] = useState('');
    const [saleTotal, setSaleTotal] = useState<number | ''>('');
    const [saleStatus, setSaleStatus] = useState('');
    const [customerId, setCustomerId] = useState<number | ''>('');
    const [paymentMethodId, setPaymentMethodId] = useState<number | ''>('');
    const [cityId, setCityId] = useState<number | ''>('');
    const [editSaleDate, setEditSaleDate] = useState<string | null>(null);
    const [editSaleId, setEditSaleId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        // Fetch sales
        fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/sales/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                setSales(Array.isArray(data) ? data : []);
            })
            .catch(error => console.error('Error fetching sales:', error));

        // Fetch customers
        fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/customers/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                setCustomers(Array.isArray(data) ? data : []);
            })
            .catch(error => console.error('Error fetching customers:', error));

        // Fetch payment methods
        fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/methods/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                setPaymentMethods(Array.isArray(data) ? data : []);
            })
            .catch(error => console.error('Error fetching payment methods:', error));

        // Fetch cities
        fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/cities/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                setCities(Array.isArray(data) ? data : []);
            })
            .catch(error => console.error('Error fetching cities:', error));
    }, []);

    const handleAddSale = async () => {
        if (saleDate.trim() === '' || saleTotal === '' || saleStatus.trim() === '' || customerId === '' || paymentMethodId === '' || cityId === '') {
            alert('Por favor, completa todos los campos.');
            return;
        }
        const token = localStorage.getItem('token');
        const newSale = { 
            sale_date: saleDate, 
            sale_total: Number(saleTotal),
            sale_status: saleStatus,
            customer: Number(customerId),
            payment_method: Number(paymentMethodId),
            city: Number(cityId),
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/sales/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newSale),
        });

        if (response.ok) {
            const data = await response.json();
            setSales([...sales, data]);
            resetForm();
            setIsModalOpen(false);
        } else {
            console.error('Error adding sale:', response.statusText);
        }
    };

    const handleEditSale = (sale: Sale) => {
        setSaleDate(sale.sale_date);
        setSaleTotal(sale.sale_total);
        setSaleStatus(sale.sale_status);
        setCustomerId(sale.customer);
        setPaymentMethodId(sale.payment_method);
        setCityId(sale.city);
        setIsModalOpen(true);
    };

    const handleUpdateSale = async () => {
        if (saleDate.trim() === '' || saleTotal === '' || saleStatus.trim() === '' || customerId === '' || paymentMethodId === '' || cityId === '') {
            alert('Por favor, completa todos los campos.');
            return;
        }
        const token = localStorage.getItem('token');
        const updatedSale = { 
            sale_date: saleDate, 
            sale_total: Number(saleTotal),
            sale_status: saleStatus,
            customer: Number(customerId),
            payment_method: Number(paymentMethodId),
            city: Number(cityId),
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/sales/${editSaleId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedSale),
        });

        if (response.ok) {
            const data = await response.json();
            setSales(sales.map(s => (s.sale_date === editSaleDate ? data : s)));
            resetForm();
            setIsModalOpen(false);
        } else {
            console.error('Error updating sale:', response.statusText);
        }
    };

    const handleDeleteSale = async (saleDate: string) => {
        const userConfirmed = confirm("Are you sure you want to delete this sale?");
        
        if (!userConfirmed) {
            return;
        }
    
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/sales/${saleDate}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });    

        if (response.ok) {
            setSales(sales.filter(s => s.sale_date !== saleDate));
        } else {
            console.error('Error deleting sale:', response.statusText);
        }
    };

    const resetForm = () => {
        setSaleDate('');
        setSaleTotal('');
        setSaleStatus('');
        setCustomerId(''); 
        setPaymentMethodId(''); 
        setCityId(''); 
        setEditSaleId(null);
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

    // Filter sales to get unique cities where sales occurred
    const salesCities = Array.from(new Set(sales.map(sale => sale.city)));
    const citiesWithSales = cities.filter(city => salesCities.includes(city.city_id));

    return (
        <>
            <Navbar />
            <Box sx={{ p: 3 }}>
                <Typography variant="h4">Ventas</Typography>
                <Button
                    data-testid="agregar-venta"
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
                    Agregar Venta
                </Button>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {Array.isArray(sales) && sales.length > 0 ? (
                        sales.map(sale => (
                            <Card key={sale.sale_date} sx={{ maxWidth: 345 }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {sale.sale_date}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Total: ${sale.sale_total}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Estado: {sale.sale_status}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Cliente: {customers.find(c => c.customer_id === sale.customer)?.customer_name || 'Desconocido'}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Método de Pago: {paymentMethods.find(pm => pm.payment_method_id === sale.payment_method)?.payment_method_name || 'Desconocido'}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Ciudad: {cities.find(c => c.city_id === sale.city)?.city_name || 'Desconocido'}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => handleEditSale(sale)}>Editar</Button>
                                    <Button size="small" color="error" onClick={() => handleDeleteSale(sale.sale_date)}>Eliminar</Button>
                                </CardActions>
                            </Card>
                        ))
                    ) : (
                        <Typography>No hay ventas registradas.</Typography>
                    )}
                </Box>
                <Dialog open={isModalOpen} onClose={closeModal}>
                    <DialogTitle>{editSaleId ? 'Editar Venta' : 'Agregar Venta'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Fecha"
                            type="date"
                            fullWidth
                            variant="standard"
                            value={saleDate}
                            onChange={(e) => setSaleDate(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Total"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={saleTotal}
                            onChange={(e) => setSaleTotal(Number(e.target.value))}
                        />
                        <TextField
                            margin="dense"
                            label="Estado"
                            fullWidth
                            variant="standard"
                            value={saleStatus}
                            onChange={(e) => setSaleStatus(e.target.value)}
                        />
                        <FormControl fullWidth margin="dense">
                            <InputLabel>Cliente</InputLabel>
                            <Select
                                value={customerId}
                                onChange={(e) => setCustomerId(Number(e.target.value))}
                            >
                                {customers.map(customer => (
                                    <MenuItem key={customer.customer_id} value={customer.customer_id}>
                                        {customer.customer_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="dense">
                            <InputLabel>Método de Pago</InputLabel>
                            <Select
                                value={paymentMethodId}
                                onChange={(e) => setPaymentMethodId(Number(e.target.value))}
                            >
                                {paymentMethods.map(method => (
                                    <MenuItem key={method.payment_method_id} value={method.payment_method_id}>
                                        {method.payment_method_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="dense">
                            <InputLabel>Ciudad</InputLabel>
                            <Select
                                value={cityId}
                                onChange={(e) => setCityId(Number(e.target.value))}
                            >
                                {cities.map(city => (
                                    <MenuItem key={city.city_id} value={city.city_id}>
                                        {city.city_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeModal}>Cancelar</Button>
                        <Button onClick={editSaleId ? handleUpdateSale : handleAddSale}>
                            {editSaleId ? 'Actualizar' : 'Agregar'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>

            <Box sx={{ height: '500px', width: '100%' }}>
                <ReactMapGL
                    mapboxAccessToken={MAPBOX_TOKEN}
                    initialViewState={{
                        latitude: 40.7128,
                        longitude: -74.0060,
                        zoom: 10
                    }}
                    style={{ width: '100%', height: '100%' }}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                >
                    {citiesWithSales.map((city) => (
                        <Marker key={city.city_id} latitude={city.latitude} longitude={city.longitude}>
                            <div style={{ color: 'red' }}>📍</div>
                        </Marker>
                    ))}
                </ReactMapGL>
            </Box>
        </>
    );
}
