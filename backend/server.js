const express = require('express');

const cors = require('cors');
const pilotRoutes = require('./routes/pilotRoutes');


const app = express();

// Middleware

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());


// Routes
app.use('/api/pilots', pilotRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
