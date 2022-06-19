import express from 'express';
import cors from 'cors';
import routes from './config/routes';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', routes);

app.listen(process.env.PORT || 3000);
