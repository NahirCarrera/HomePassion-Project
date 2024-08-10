"use client";

import { useEffect, useState } from 'react';
import { Button, Typography, Box, TextField, Card, CardContent, CardActions, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Navbar from '../components/Navbar';

interface News {
    id: number;
    title: string;
    content: string;
}

export default function News() {
    const [news, setNews] = useState<News[]>([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editId, setEditId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/news/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => setNews(data))
            .catch(error => console.error('Error fetching news:', error));
    }, []);

    const handleAddNews = async () => {
        // Validación de los campos
        if (title.trim() === '' || content.trim() === '') {
            alert('Por favor, completa todos los campos.');
            return;
        }
        const token = localStorage.getItem('token');
        const newNews = { title, content };
        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/news/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newNews),
        });

        if (response.ok) {
            const data = await response.json();
            setNews([...news, data]);
            setTitle('');
            setContent('');
            setIsModalOpen(false);
        } else {
            console.error('Error adding news:', response.statusText);
        }
    };

    const handleEditNews = (newsItem: News) => {
        setTitle(newsItem.title);
        setContent(newsItem.content);
        setEditId(newsItem.id);
        setIsModalOpen(true);
    };

    const handleUpdateNews = async () => {
        const token = localStorage.getItem('token');
        const updatedNews = { title, content };
        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/news/${editId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedNews),
        });

        if (response.ok) {
            const data = await response.json();
            setNews(news.map(n => (n.id === editId ? data : n)));
            setTitle('');
            setContent('');
            setEditId(null);
            setIsModalOpen(false);
        } else {
            console.error('Error updating news:', response.statusText);
        }
    };

    const handleDeleteNews = async (id: number) => {
        const userConfirmed = confirm("Are you sure you want to delete this new?");
        
        if (!userConfirmed) {
            return;
        }
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/news/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            setNews(news.filter(n => n.id !== id));
        } else {
            console.error('Error deleting news:', response.statusText);
        }
    };

    const openModal = () => {
        setTitle('');
        setContent('');
        setEditId(null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Navbar />
            <Box sx={{ p: 3 }}>
                <Typography variant="h4">Noticias</Typography>
                <Button variant="contained" color="primary" onClick={openModal} sx={{ mb: 2 }}>
                    Agregar Noticia
                </Button>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {news.map(newsItem => (
                        <Card key={newsItem.id} sx={{ maxWidth: 345 }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {newsItem.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {newsItem.content}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="secondary" onClick={() => handleEditNews(newsItem)}>Editar</Button>
                                <Button size="small" color="error" onClick={() => handleDeleteNews(newsItem.id)}>Eliminar</Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>

                <Dialog open={isModalOpen} onClose={closeModal}>
                    <DialogTitle>{editId ? 'Editar Noticia' : 'Agregar Noticia'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Título"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            label="Contenido"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            margin="normal"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeModal} color="secondary">Cancelar</Button>
                        <Button onClick={editId ? handleUpdateNews : handleAddNews} color="primary">
                            {editId ? 'Actualizar' : 'Agregar'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    );
}
