const router = require('express').Router();
const Event = require('../models/event.model');

router.route('/').get((req, res) => 
{

});

router.route('/add').post((req, res) => 
{
    const {date, versus, result, notes} = req.body;
    if(!versus || !result || !date) return res.status(400).json({msg: "Versus, results and date must be completed"});

    const newEvent = new Event({date,versus,result,notes});
    newEvent.save()
    .then((newEventRes) => res.json(newEventRes))
    .catch(err => res.status(500).json({error: err.message}));
});

router.route('/delete').delete((req, res) => 
{

});

module.exports = router;
