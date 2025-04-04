import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt'; // Import bcrypt

export async function GET(request: NextRequest) {
  try {
    const userEmail = request.cookies.get('userEmail')?.value; // Get the user's email from cookies
    if (!userEmail) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 }); // Return 401 if no email found
    }

    const user = await prisma.utilisateur.findUnique({
      where: { email: userEmail }, // Find user by email
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 }); // Return 404 if user not found
    }

    const { password: _, ...userWithoutPassword } = user; // Exclude password from response
    return NextResponse.json(userWithoutPassword, { status: 200 }); // Return user data
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 }); // Return 500 for server errors
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userEmail = request.cookies.get('userEmail')?.value; // Get the user's email from cookies
    if (!userEmail) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 }); // Return 401 if no email found
    }

    const body = await request.json(); // Parse the request body
    const { nom, prenom, etablissement, password } = body; // Exclude role from destructuring

    // Hash the password if it's provided
    let hashedPassword;
    if (password) {
      const saltRounds = 10; // You can adjust the salt rounds as needed
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    // Update user data without changing the role
    const updatedUser = await prisma.utilisateur.update({
      where: { email: userEmail }, // Find user by email
      data: { 
        nom, 
        prenom, 
        etablissement, 
        ...(hashedPassword && { password: hashedPassword }) // Only update password if it's provided
      },
    });

    const { password: _, ...userWithoutPassword } = updatedUser; // Exclude password from response
    return NextResponse.json(userWithoutPassword, { status: 200 }); // Return updated user data
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 }); // Return 500 for server errors
  }
}