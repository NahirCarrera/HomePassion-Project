// src/components/ProtectedRoute.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Token:', token); // Añadir para depuración
        if (!token) {
            console.log('No token found, redirecting to login'); // Añadir para depuración
            router.push('/login');
        }
    }, [router]);

    return <>{children}</>;
};

export default ProtectedRoute;
