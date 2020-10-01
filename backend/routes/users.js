const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
let User = require('../models/user.model');

router.route('/').get(auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.json(
      {
        userName: user.userName,
        id: user._id,
        Calendars: user.Calendars
      }
    );
  }
  catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        userName: user.userName,
        Calendars: user.Calendars
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});


router.route('/register').post(async (req, res) => {
  try {
    const { userName, email, password, passwordCheck } = req.body;
    if (!email || !password || !passwordCheck || !userName) {
      return res.status(400).json({ msg: "Missing fields" });
    }
    if (password.length < 5) {
      return res.status(400).json({ msg: "Password needs to be at least 5 characters long" });
    }
    if (password !== passwordCheck) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ msg: "An account with this email already exists" });
    }
    if (!userName) userName = email;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({ userName, email, password: passwordHash });
    const savedUser = await newUser.save();
    res.json(savedUser);
  }
  catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.route('/tokenIsValid').post(async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) return res.json(false);
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);
    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    return res.json(true);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.route('/updateCalendar/:id').put(async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {$set: {"Calendars" : req.body.Calendars}},
      (error, data) =>
      {
        if(error)
        {
          return next(error);
        }
        else
        {
          res.json(data);
          console.log('Updated calendar ID list successfully');
        }
      });
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;