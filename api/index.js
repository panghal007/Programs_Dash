const express = require('express');
const programRoutes = require('./routes/programRoutes');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./db/connection');
const cors = require('cors');
const cookieParser=require('cookie-parser');
const path=require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname,'frontend','build')));

app.use(express.text());
app.use(express.urlencoded({extended :false}));
app.use(cookieParser());

app.use('/programs', programRoutes);

// Sync Sequelize models with the database
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    // Sync the models with the database
    await sequelize.sync({ alter: true });
    console.log('Models have been synchronized.');

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
app.post('/createProgram', (req, res) => {
    
    res.json({ message: 'Program created successfully' });
  });
app.use('/api/users',userRoutes);
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
// });

