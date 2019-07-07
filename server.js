const express = require('express');
const connectDB = require('./config/db');
const fileUpload = require('express-fileupload');

const app = express();

connectDB();

const cors = require('cors');
app.use(cors());

const passport = require('passport')
require('./passport')

app.use(express.json({ extended: false }));
app.use(fileUpload());

// Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/rooms', passport.authenticate('jwt', {session:false}), require('./routes/api/rooms'))
app.use('/api/bookings', passport.authenticate('jwt', {session:false}), require('./routes/api/bookings'))
app.use('/api/reviews', passport.authenticate('jwt', {session:false}), require('./routes/api/reviews'))
app.use('/api/promotions', passport.authenticate('jwt', {session:false}), require('./routes/api/promotions'))
app.use('/api/auth', require('./routes/api/auth.js'))
app.use('/api/dashboard', passport.authenticate('jwt', {session:false}), require('./routes/api/dashboard.js'))
app.use('/api/public', require('./routes/api/public.js'))

if(process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => `Server started on port ${PORT}`);

