const mongoose = require('mongoose');
const Calendar = require('./calendar.model').schema;
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        userName:
        {
            type: String,
            required: true,
            trim: true,
            minLength: 3
        },
        email:
        {
            type: String,
            required : true,
            unique: true,
            trim: true,
            minLength: 5
        },
        password:
        {
            type: String,
            required : true,
            trim: true,
            minLength: 5
        },
        Calendars:
        {
            type: [Calendar], //Calendar IDs
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User',userSchema);
module.exports = User;