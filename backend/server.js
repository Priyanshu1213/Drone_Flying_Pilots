const express = require('express');

const cors = require('cors');
const pilotRoutes = require('./routes/pilotRoutes');


const app = express();

// Middleware

const corsOptions = {
  origin: "https://priyanshu-drone-flying-pilot.netlify.app",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.send("hello from backend");
});

// Routes
app.use('/api/pilots', pilotRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
