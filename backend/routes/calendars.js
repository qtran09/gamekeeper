const router = require('express').Router();
let Calendar = require('../models/calendar.model');

router.route('/:id').get((req, res) => {
        Calendar.findById(req.params.id)
        .then(calendar => res.json(
            {
                calendar: calendar
            }
        ))
        .catch( err => res.status(500).json({error : err.message}));
    
});

router.route('/add').post((req, res) => {
    const { calendarName, ownerId, ownerName } = req.body;
    if (!calendarName) return res.status(400).json({ msg: "Missing calendar name" });
    if (!ownerId) return res.status(400).json({ msg: "Missing user ID. How did this happen" });

    const newCalendar = new Calendar({ calendarName, ownerId, ownerName });
    console.log(newCalendar);
    newCalendar.save()
        .then(() => res.json({ id: newCalendar._id, calendarName: calendarName, ownerName: ownerName },))
        .catch(err => {
            console.log(err.message);
            res.status(400).json('Error: ' + err);
        });
});

router.route('/delete/:id').delete(async (req, res) =>
{
    try {
        console.log("ID: " + req.params.id);
        const deletedCalendar = await Calendar.findByIdAndRemove(req.params.id);
        console.log(deletedCalendar);
        res.json(deletedCalendar);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
})

module.exports = router;