/* import bcrypt from 'bcryptjs';
import prisma from '../src/server/prisma/client.js';
import dotenv from 'dotenv';

dotenv.config();

async function createAdmin() {
  try {
    console.log(' Creating admin user...');
    
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@rehabcare.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!@#';
    const adminName = process.env.ADMIN_NAME || 'Joan - Psychologist';
    
    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    
    // Create or update admin user
    const admin = await prisma.user.upsert({
      where: { email: adminEmail },
      update: { 
        role: 'admin',
        name: adminName
      },
      create: {
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      }
    });
    
    console.log(' Admin user created successfully!');
    console.log(` Email: ${admin.email}`);
    console.log(` Name: ${admin.name}`);
    console.log(` Role: ${admin.role}`);
    console.log(` Access admin panel at: /admin`);
    
  } catch (error) {
    console.error(' Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin(); */