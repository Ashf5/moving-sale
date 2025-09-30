
import express from 'express';
import { router } from './routers/router';
import cookieParser from 'cookie-parser';


const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api', router);

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`))