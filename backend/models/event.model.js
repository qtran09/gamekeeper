const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
    {
        game:
        {
            type: String,
            required: true,
            trim: true
        },
        result:
        {
            type: String,
            required : true,
            trim : true
        },
        notes:
        {
            type: String,
            required: false,
            trim: true
        }
    },
    {
        timestamps: true,
    }
);

const Event = mongoose.model('Event',eventSchema);
module.exports = Event;