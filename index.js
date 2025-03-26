import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Use the network routes
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});