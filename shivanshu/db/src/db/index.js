import mongoose from 'mongoose';

const connectUserDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/user-data`);
        console.log("Connected to User Database");
    } catch (error) {
        console.error("Error connecting to User Database:", error);
    }
};

const connectBloodBankDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/blood-bank-data`);
        console.log("Connected to Blood Bank Database");
    } catch (error) {
        console.error("Error connecting to Blood Bank Database:", error);
    }
};

const connectHospitalDB = async () => { // Example for a third database
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/admin-data`);
        console.log("Connected to Admin Database");
    } catch (error) {
        console.error("Error connecting to Admin Database:", error);
    }
};

export { connectUserDB, connectBloodBankDB, connectHospitalDB };