import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(cors({
    origin: "http://localhost:5173", //Da sostituire con l'URL pubblico del frontend aggiornando la variabile d'ambiente
    credentials: true,
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server in esecuzione sulla porta ${PORT}`);
})