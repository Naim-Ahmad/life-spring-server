const router = require("express").Router();

const verifyToken = require("../../middlewares/verifyToken");
const Reservation = require("../../models/Reservation");
const Test = require("../../models/Test");
const User = require('../../models/User')

router.get("/reservations", async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('test', 'testName date').populate('user', 'name email avatar');
    res.send(reservations);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

router.get("/reservations/:userId", verifyToken, async (req, res) => {
  try {
    // console.log('reservation');
    const reservations = await Reservation.find({user: req.params.userId}).populate('test', 'testName date').populate('user')
    res.send(reservations);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

/**
 * 2. $push in reservation array of user collection and test collection
 * 2.
 */

router.post("/reservations/:email", verifyToken, async (req, res) => {
  try {
    const { testId, slot } = req.body;

    const emailQuery = {email: req.params.email}

    const deleteSlotDoc = {
      $pull: { availableSlots: { $in: [slot] } },
    };

    // delete and item from available slots array
    await Test.findByIdAndUpdate(testId, deleteSlotDoc);

    // console.log(result, testId, slot);

    let reservation = new Reservation({...req.body, test: testId});
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

router.patch('/reservations/:id', async(req, res) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body , {upsert: true})
        res.send(reservation)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

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
