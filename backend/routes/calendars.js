const router = require('express').Router();
let Calendar = require('../models/calendar.model');

router.route('/').get((req,res) =>
{
    Calendar.find()
    .then(calendars => res.json(calendars))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res) =>
{
    const calendarName = req.body.calendarName;
    const newCalendar = new Calendar({calendarName});

    newCalendar.save()
    .then(() => res.json('Calendar added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;