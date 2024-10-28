import express from 'express';
//import blogsRoutes from "./routes/blogs.route.js"
import authRoutes from './routes/auth-route'
import invoiceRoutes from './routes/invoice-route'
//import cookieParser from 'cookie-parser'
import cors from 'cors';
import {connectDB} from './db'

connectDB();

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
//app.use(cookieParser());

//app.use("/api", blogsRoutes);
app.use("/api", authRoutes);
app.use("/api", invoiceRoutes)
app.listen(5000);

export default app;
