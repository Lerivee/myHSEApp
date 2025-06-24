const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3000;

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Failed to connect to MongoDB", err);
});

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

const authRoutes = require('./routes/authRoutes');
const healthRoutes = require('./routes/healthRoutes');
const safetyRoutes = require('./routes/safetyRoutes');
const environmentRoutes = require('./routes/environmentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

app.use('/api', uploadRoutes);
app.use('/auth/api', authRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/safety', safetyRoutes);
app.use('/api/environment', environmentRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
