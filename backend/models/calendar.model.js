const mongoose = require('mongoose');
const user = require('./user.model');
const Schema = mongoose.Schema;

const calendarSchema = new Schema(
    {
        calendarName:
        {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minLength: 3
        },
    },
    {
        timestamps: true,
    }
);

const Calendar = mongoose.model('Calendar',calendarSchema);
module.exports = Calendar;