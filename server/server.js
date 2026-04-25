import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import itineraryRoutes from './routes/itineraryRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

const app = express();

app.use(cors({
    origin: "http://localhost:5173", //Da sostituire con l'URL pubblico del frontend aggiornando la variabile d'ambiente
    credentials: true,
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/user-profile', profileRoutes);
app.use('/api/user-itinerary', itineraryRoutes)

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server in esecuzione sulla porta ${PORT}`);
})