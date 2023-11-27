const router = require("express").Router();

const Reservation = require("../../models/Reservation");
const Test = require("../../models/Test");
const User = require('../../models/User')

router.get("/reservations", async (req, res) => {
  try {
    const reservations = await Reservation.find().populate([
      {path: 'test', model: 'Test', select: 'testName' },
      // {path: 'user', model: 'User', select: 'name' },
    ]);
    res.send(reservations);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

router.get("/reservations/:email", async (req, res) => {
  try {
    const reservations = await Reservation.find({
      user: req.params.email,
    }).populate('test', 'testName date');
    res.send(reservations);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/**
 * 2. $push in reservation array of user collection and test collection
 * 2.
 */

router.post("/reservations/:email", async (req, res) => {
  try {
    const { testId, slot } = req.body;

    const emailQuery = {email: req.params.email}

    const deleteSlotDoc = {
      $pull: { availableSlots: { $in: [slot] } },
    };

    // delete and item from available slots array
    await Test.findByIdAndUpdate(testId, deleteSlotDoc);

    // console.log(result, testId, slot);

    let reservation = new Reservation({...req.body, user: req.params.email, test: testId});
    reservation = await reservation.save();

    // push reservation id 
    const pushReservationId = { $push: { reservation:  reservation._id} };
    await Test.findByIdAndUpdate(testId, pushReservationId)
    await User.findOneAndUpdate(emailQuery, pushReservationId)

    res.send(reservation);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

router.delete("/reservations/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    console.log(reservation);
    res.send(reservation);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
