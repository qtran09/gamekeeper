const router = require('express').Router();
let Calendar = require('../models/calendar.model');

// router.route('/:id').get(async (req, res) => {
//     try {
//         const calendar = await Calendar.findById(req.params.id);
//         console.log(calendar);
//         res.json(
//             {
//                 id: calendar._id,
//                 calendarName: calender.calendarName,
//                 ownerId: calendar.ownerId
//             }
//         );
//     }
//     catch(err)
//     {
//         console.log(err.message);
//         res.status(500).json({error: err.message});
//     }

// });
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
    const { calendarName, ownerId } = req.body;
    if (!calendarName) return res.status(400).json({ msg: "Missing calendar name" });
    if (!ownerId) return res.status(400).json({ msg: "Missing user ID. How did this happen" });

    const newCalendar = new Calendar({ calendarName, ownerId });
    newCalendar.save()
        .then(() => res.json({ id: newCalendar._id, calendarName: calendarName },))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;