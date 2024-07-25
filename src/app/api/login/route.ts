import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // Aquí deberías validar el usuario (esto es solo un ejemplo)
  if (email === 'user@example.com' && password === 'password') {
    // Usuario válido
    return NextResponse.json({ message: 'Login successful' });
  } else {
    // Usuario inválido
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
}
