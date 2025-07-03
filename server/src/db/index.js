import mongoose from "mongoose";


const connectDb = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
        console.log("MONGODB CONNECTED SUCCESFULLY", connection.connection.host)
    } catch (error) {
        console.log('MONGODB CONNECTION FAILED', error)
        process.exit(1)
    }
}

export {connectDb}