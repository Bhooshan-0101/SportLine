require('dotenv').config({ path: __dirname + '/.env' });
console.log('All ENV:', process.env); // Debug line
console.log('MONGO_URI:', process.env.MONGO_URI); // Debug line
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import models
const User = require('./models/User');
const Product = require('./models/Product');
const Branch = require('./models/Branch');

// Sample data
const sampleUsers = [
  {
    name: 'Admin User',
    email: 'admin@sportsline.com',
    password: 'admin123',
    role: 'admin',
    phone: '1234567890'
  },
  {
    name: 'John Customer',
    email: 'john@example.com',
    password: 'customer123',
    role: 'customer',
    phone: '9876543210'
  }
];

const sampleProducts = [
  {
    name: 'Nike Basketball Jersey',
    description: 'Professional basketball jersey with moisture-wicking technology',
    price: 89.99,
    category: 'Jerseys',
    brand: 'Nike',
    images: ['/logo192.png'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Red', 'Blue', 'Black'],
    stock: 50,
    rating: 4.5
  },
  {
    name: 'Adidas Running Shoes',
    description: 'Lightweight running shoes with superior comfort',
    price: 129.99,
    category: 'Shoes',
    brand: 'Adidas',
    images: ['/logo192.png'],
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['White', 'Black', 'Gray'],
    stock: 30,
    rating: 4.2
  },
  {
    name: 'Puma Training Jersey',
    description: 'Comfortable training jersey for daily workouts',
    price: 69.99,
    category: 'Jerseys',
    brand: 'Puma',
    images: ['/logo192.png'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Green', 'Yellow', 'Orange'],
    stock: 40,
    rating: 4.0
  },
  {
    name: 'Nike Football Cleats',
    description: 'Professional football cleats with excellent grip',
    price: 149.99,
    category: 'Shoes',
    brand: 'Nike',
    images: ['/logo192.png'],
    sizes: ['8', '9', '10', '11', '12'],
    colors: ['White', 'Black'],
    stock: 25,
    rating: 4.7
  },
  {
    name: 'Basketball',
    description: 'Official size basketball for professional games',
    price: 29.99,
    category: 'Equipment',
    brand: 'Spalding',
    images: ['/logo192.png'],
    sizes: ['Standard'],
    colors: ['Orange'],
    stock: 100,
    rating: 4.8
  },
  {
    name: 'Tennis Racket',
    description: 'Professional tennis racket with excellent control',
    price: 199.99,
    category: 'Equipment',
    brand: 'Wilson',
    images: ['/logo192.png'],
    sizes: ['Standard'],
    colors: ['Black', 'Red'],
    stock: 15,
    rating: 4.6
  }
];

const sampleBranches = [
  {
    name: 'Downtown Branch',
    address: '123 Main Street, Downtown',
    phone: '555-0101',
    email: 'downtown@sportsline.com',
    hours: 'Mon-Sat: 9AM-8PM, Sun: 10AM-6PM'
  },
  {
    name: 'Mall Branch',
    address: '456 Shopping Mall, Westside',
    phone: '555-0102',
    email: 'mall@sportsline.com',
    hours: 'Mon-Sat: 10AM-9PM, Sun: 11AM-7PM'
  }
];

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Branch.deleteMany({});
    console.log('Cleared existing data');

    // Create users with hashed passwords
    const hashedUsers = await Promise.all(
      sampleUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10)
      }))
    );
    await User.insertMany(hashedUsers);
    console.log('Created users');

    // Create products
    await Product.insertMany(sampleProducts);
    console.log('Created products');

    // Create branches
    await Branch.insertMany(sampleBranches);
    console.log('Created branches');

    console.log('Database seeded successfully!');
    console.log('\nSample login credentials:');
    console.log('Admin: admin@sportsline.com / admin123');
    console.log('Customer: john@example.com / customer123');

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the seeder
seedData(); 