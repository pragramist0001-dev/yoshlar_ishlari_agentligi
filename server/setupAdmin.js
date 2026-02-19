const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const createAdmin = async () => {
    try {
        console.log('Connecting to:', process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log('Connected to MongoDB successfully');

        const User = require('./models/User');
        const adminExists = await User.findOne({ role: 'superadmin' });

        if (adminExists) {
            console.log('Superadmin already exists:', adminExists.email);
            process.exit(0);
        }

        const admin = new User({
            name: 'Super Admin',
            email: 'admin@yoshlar.uz',
            password: 'adminpassword123',
            role: 'superadmin'
        });

        await admin.save();
        console.log('Superadmin created successfully');
        console.log('Email: admin@yoshlar.uz');
        console.log('Password: adminpassword123');
        process.exit(0);
    } catch (error) {
        console.error('CRITICAL ERROR:', error.message);
        console.error(error);
        process.exit(1);
    }
};

createAdmin();
