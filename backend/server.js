const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.port || 3000;

app.use(cors());
app.use(express.json());
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex : true, useUnifiedTopology: true, useFindAndModify: false});

const connection = mongoose.connection;

connection.once('open', function()
{
    console.log("MongoDB database connection established successfully");
});

const usersRouter = require('./routes/users');
const calendarRouter = require('./routes/calendars');
const eventsRouter = require('./routes/events');
app.use('/users', usersRouter);
app.use('/calendars', calendarRouter);
app.use('/events', eventsRouter);

app.listen(port, function()
{
    console.log('Server is running on port: ' + port);
});