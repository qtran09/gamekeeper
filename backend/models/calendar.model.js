const mongoose = require('mongoose');
const User = require('./user.model');
const Event = require('./event.model').schema;
const Schema = mongoose.Schema;

const calendarSchema = new Schema(
    {
        calendarName:
        {
            type: String,
            required: true,
            trim: true,
            minLength: 3
        },
        ownerId:
        {
            type: String, //User ID
            required: true
        },
        ownerName:
        {
            type: String
        },
        events:
        {
            type: [Event]
        },
        id:
        {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true,
    }
);

const Calendar = mongoose.model('Calendar',calendarSchema);
module.exports = Calendar;