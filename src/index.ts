import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { CONFIG } from './config/config';
import { errorHandler } from './middlewares/error-handler.middleware';
import routes from './routes/routes';

const app: Application = express();
const PORT: number = parseInt(CONFIG.PORT as string);

// Use Helmet to secure HTTP headers
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api', routes);

// Centralized error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
