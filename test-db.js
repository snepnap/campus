const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://admin:Anand912266@cluster0.oo1itji.mongodb.net/ggu-connect?retryWrites=true&w=majority&appName=Cluster0';

async function testConnection() {
    try {
        console.log('Attempting to connect to MongoDB Atlas...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ MongoDB Connected Successfully!');
        console.log('Connection State:', mongoose.connection.readyState);
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('❌ MongoDB Connection Failed:');
        console.error(error);
        process.exit(1);
    }
}

testConnection();
