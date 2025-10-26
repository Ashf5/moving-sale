
import express from 'express';
import { router } from './routers/router';
import cookieParser from 'cookie-parser';
import cors from 'cors';


const PORT = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // if you need cookies/auth headers
  })
);


app.use(express.json());
app.use(cookieParser());
app.use('/api', router);

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`))