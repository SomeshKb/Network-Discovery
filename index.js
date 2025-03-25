import express from 'express';
import cors from 'cors';
import networkRoutes from './routes/networkRoutes.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Use the network routes
app.use('/api/network', networkRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});