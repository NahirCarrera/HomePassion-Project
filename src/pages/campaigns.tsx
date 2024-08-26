"use client";

import { useEffect, useState } from 'react';
import { Button, Typography, Box, TextField, Card, CardContent, CardActions, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Navbar from '../components/Navbar';

interface Campaign {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    totalBudget: number;
}

export default function Campaigns() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalBudget, setTotalBudget] = useState<number | ''>('');
    const [editId, setEditId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/campaigns/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                // Mapear datos a la estructura de Campaign
                const formattedData = data.map((campaign: any) => ({
                    id: campaign.campaign_id,
                    name: campaign.campaign_name,
                    startDate: campaign.start_date,
                    endDate: campaign.end_date,
                    totalBudget: campaign.total_budget,
                }));
                console.log(formattedData); // Verifica la estructura aquí
                setCampaigns(formattedData);
            })
            .catch(error => console.error('Error fetching campaigns:', error));
    }, []);
    
    const handleAddCampaign = async () => {
        // Validación de los campos
        if (name.trim() === '' || startDate.trim() === '' || endDate.trim() === '' || totalBudget === '') {
            alert('Por favor, completa todos los campos.');
            return;
        }
        const token = localStorage.getItem('token');
        const newCampaign = { name, startDate, endDate, totalBudget };
        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/campaigns/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newCampaign),
        });

        if (response.ok) {
            const data = await response.json();
            setCampaigns([...campaigns, data]);
            setName('');
            setStartDate('');
            setEndDate('');
            setTotalBudget('');
            setIsModalOpen(false);
        } else {
            console.error('Error adding campaign:', response.statusText);
        }
    };

    const handleEditCampaign = (campaign: Campaign) => {
        setName(campaign.name);
        setStartDate(campaign.startDate);
        setEndDate(campaign.endDate);
        setTotalBudget(campaign.totalBudget);
        setEditId(campaign.id);
        setIsModalOpen(true);
    };

    const handleUpdateCampaign = async () => {
        if (name.trim() === '' || startDate.trim() === '' || endDate.trim() === '' || totalBudget === '') {
            alert('Por favor, completa todos los campos.');
            return;
        }
        const token = localStorage.getItem('token');
        const updatedCampaign = { name, startDate, endDate, totalBudget };
        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/campaigns/${editId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedCampaign),
        });

        if (response.ok) {
            const data = await response.json();
            setCampaigns(campaigns.map(c => (c.id === editId ? data : c)));
            setName('');
            setStartDate('');
            setEndDate('');
            setTotalBudget('');
            setEditId(null);
            setIsModalOpen(false);
        } else {
            console.error('Error updating campaign:', response.statusText);
        }
    };

    const handleDeleteCampaign = async (id: number) => {
        const userConfirmed = confirm("Are you sure you want to delete this campaign?");
        
        if (!userConfirmed) {
            return;
        }
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/campaigns/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            setCampaigns(campaigns.filter(c => c.id !== id));
        } else {
            console.error('Error deleting campaign:', response.statusText);
        }
    };

    const openModal = () => {
        setName('');
        setStartDate('');
        setEndDate('');
        setTotalBudget('');
        setEditId(null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        const userConfirmed = confirm("Are you sure you want to cancel?");
        
        if (!userConfirmed) {
            return;
        }
        setIsModalOpen(false);
    };

    return (
        <>
            <Navbar />
            <Box sx={{ p: 3 }}>
                <Typography variant="h4">Noticias</Typography>
                <Button variant="contained" color="primary" onClick={openModal} sx={{
                    mb: 2,
                    '&:hover': {
                        backgroundColor: 'purple',
                        color: 'white'
                    },
                }}
                >
                    Agregar Campaña
                </Button>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {campaigns.length === 0 ? (
                        <Typography variant="body1">No hay campañas disponibles.</Typography>
                    ) : (
                        campaigns.map(campaign => (
                            <Card key={campaign.id} sx={{ maxWidth: 345 }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {campaign.name || 'Nombre no disponible'}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {`Inicio: ${campaign.startDate || 'Fecha no disponible'}`}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {`Fin: ${campaign.endDate || 'Fecha no disponible'}`}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {`Presupuesto: ${campaign.totalBudget !== undefined ? campaign.totalBudget : 'Presupuesto no disponible'}`}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="secondary" onClick={() => handleEditCampaign(campaign)} sx={{
                                        mb: 2,
                                        '&:hover': {
                                            backgroundColor: 'purple',
                                            color: 'white'
                                        },
                                    }}
                                    >Editar</Button>
                                    <Button size="small" color="error" onClick={() => handleDeleteCampaign(campaign.id)} sx={{
                                        mb: 2,
                                        '&:hover': {
                                            backgroundColor: 'red',
                                            color: 'white'
                                        },
                                    }}
                                    >Eliminar</Button>
                                </CardActions>
                            </Card>
                        ))
                    )}
                </Box>

                <Dialog open={isModalOpen} onClose={closeModal}>
                    <DialogTitle>{editId ? 'Editar Campaña' : 'Agregar Campaña'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            label="Fecha de Inicio"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            label="Fecha de Fin"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            label="Presupuesto"
                            type="number"
                            value={totalBudget}
                            onChange={(e) => setTotalBudget(Number(e.target.value))}
                            margin="normal"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeModal} color="secondary" sx={{
                            mb: 2,
                            '&:hover': {
                                backgroundColor: 'purple',
                                color: 'white'
                            },
                        }}
                        >Cancelar</Button>
                        <Button onClick={editId ? handleUpdateCampaign : handleAddCampaign} color="primary" sx={{
                            mb: 2,
                            '&:hover': {
                                backgroundColor: 'skyblue',
                                color: 'white'
                            },
                        }}
                        >
                            {editId ? 'Actualizar' : 'Agregar'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    );
}
