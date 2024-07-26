"use client";

import { useEffect, useState } from 'react';
import { Button, Typography, Box, TextField, Card, CardContent, CardActions, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Navbar from '../components/Navbar';

interface Comment {
    id: number;
    text: string;
}

export default function Comments() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [text, setText] = useState('');
    const [editId, setEditId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/comments/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => setComments(data))
            .catch(error => console.error('Error fetching comments:', error));
    }, []);

    const handleAddComment = async () => {
        const token = localStorage.getItem('token');
        const newComment = { text };
        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/comments/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newComment),
        });

        if (response.ok) {
            const data = await response.json();
            setComments([...comments, data]);
            setText('');
            setIsModalOpen(false);
        } else {
            console.error('Error adding comment:', response.statusText);
        }
    };

    const handleEditComment = (comment: Comment) => {
        setText(comment.text);
        setEditId(comment.id);
        setIsModalOpen(true);
    };

    const handleUpdateComment = async () => {
        const token = localStorage.getItem('token');
        const updatedComment = { text };
        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/comments/${editId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedComment),
        });

        if (response.ok) {
            const data = await response.json();
            setComments(comments.map(c => (c.id === editId ? data : c)));
            setText('');
            setEditId(null);
            setIsModalOpen(false);
        } else {
            console.error('Error updating comment:', response.statusText);
        }
    };

    const handleDeleteComment = async (id: number) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/comments/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            setComments(comments.filter(c => c.id !== id));
        } else {
            console.error('Error deleting comment:', response.statusText);
        }
    };

    const openModal = () => {
        setText('');
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
                <Typography variant="h4">Comentarios</Typography>
                <Button variant="contained" color="primary" onClick={openModal} sx={{ mb: 2 }}>
                    Agregar Comentario
                </Button>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {comments.map(comment => (
                        <Card key={comment.id} sx={{ maxWidth: 345 }}>
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {comment.text}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="secondary" onClick={() => handleEditComment(comment)}>Editar</Button>
                                <Button size="small" color="error" onClick={() => handleDeleteComment(comment.id)}>Eliminar</Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>

                <Dialog open={isModalOpen} onClose={closeModal}>
                    <DialogTitle>{editId ? 'Editar Comentario' : 'Agregar Comentario'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Comentario"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            margin="normal"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeModal} color="secondary">Cancelar</Button>
                        <Button onClick={editId ? handleUpdateComment : handleAddComment} color="primary">
                            {editId ? 'Actualizar' : 'Agregar'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    );
}
