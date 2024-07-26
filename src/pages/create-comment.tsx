"use client";

import { useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import { useRouter } from 'next/navigation';

export default function CreateComment() {
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/comments/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ username, comment }),
        });

        if (response.ok) {
            router.push('/comments');
        } else {
            alert('Error al crear el comentario');
        }
    };

    return (
        <ProtectedRoute>
            <div>
                <h1>Crear Comentario</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre de usuario:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Comentario:</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button type="submit">Crear Comentario</button>
                </form>
            </div>
        </ProtectedRoute>
    );
}
