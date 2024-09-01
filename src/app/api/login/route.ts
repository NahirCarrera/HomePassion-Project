import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://oop:oop@cluster0.og4urrq.mongodb.net/";
const client = new MongoClient(uri);

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    await client.connect();
    const database = client.db("user_data");
    const users = database.collection("users");

    // Buscar usuario por email
    const user = await users.findOne({ user_email: email });

    if (user && user.user_password === password) {
      // Usuario válido
      return NextResponse.json({ message: 'Login successful' });
    } else {
      // Usuario inválido
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  } finally {
    await client.close();
  }
}
