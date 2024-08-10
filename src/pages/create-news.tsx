"use client";

import { useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import { useRouter } from 'next/navigation';

export default function CreateNews() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validación más estricta para evitar campos vacíos
        if (title.trim() === '' || content.trim() === '') {
            alert('Por favor, completa todos los campos con texto válido.');
            return;
        }

        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/news/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title: title.trim(), content: content.trim() }),
        });

        if (response.ok) {
            router.push('/news');
        } else {
            alert('Error al crear la noticia');
        }
    };

    return (
        <ProtectedRoute>
            <div>
                <h1>Crear Noticia</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Título:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Contenido:</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button type="submit">Crear Noticia</button>
                </form>
            </div>
        </ProtectedRoute>
    );
}
