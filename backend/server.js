const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const {errorHandler} = require('./middleware/errorMiddlewre');

const app = express();
const port = process.env.PORT || 5000;

// Alternatrive: app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: true}));

// Routes
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/project', require('./routes/projectRoutes'));
app.use('/api/task', require('./routes/taskRoutes'));
app.use('/api/subtask', require('./routes/subtaskRoutes'));
app.use('/api/comment', require('./routes/commentRoutes'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../frontend/', 'build', 'index.html')));
}
else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Server started on port ${port}`);
});