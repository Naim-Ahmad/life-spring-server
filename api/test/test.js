const express = require("express");

const router = express.Router();

const Test = require("../../models/Test");
const verifyToken = require("../../middlewares/verifyToken");
const verifyAdmin = require("../../middlewares/verifyAdmin");

router.get("/tests", async (req, res) => {
  try {
    const tests = await Test.find();
    res.send(tests);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/tests/:id", async (req, res) => {
  try {
    const tests = await Test.findById(req.params.id);
    res.send(tests);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// router.get("/getPageData", async (req, res) => {
//   try {
//     if (req.query?.date) {
//       const date = new Date(req.query.date);
//       console.log(date);
//       const query = { date: { $gt: date } };
//       const result = await Test.find(query);
//       return res.send(result);
//     }

//     const skip = req.query?.skip * 9;

//     // console.log(skip, req.query?.skip);

//     // console.log(localDate);
//     const date = new Date();
//     // console.log(date);

//     const query = { date: { $gt: date } }; // Corrected the variable name to "date"

//     const tests = await Test.find(query).skip(skip).limit(9);
//     // console.log(tests);
//     res.send(tests);
//   } catch (error) {
//     res.status(500).send(error.message);
//     console.log(error);
//   }
// });

router.get("/getPageData", async (req, res) => {
  try {
    const { date, skip = 0 } = req.query;

    let filter = {};

    filter.date = { $gt: new Date() };

    if (date) {
      const searchDate = new Date(date);
      console.log(date);
      filter.date = { $gt: searchDate };
    }
    // console.log(date, skip);
    // console.log(filter);
    const tests = await Test.find(filter)
      .skip(skip * 9)
      .limit(9);
    const data = {
      totalData: await Test.countDocuments(filter),
      tests,
    };
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/testCount", async (req, res) => {
  try {
    const date = new Date();
    // console.log(date);

    let query = { date: { $gt: date } }; // Corrected the variable name to "date"

    if (req.query?.date) {
      const searchDate = new Date(req.query?.date);
      console.log(searchDate);
      console.log("date query");
      query = { date: { $gt: searchDate } };
    }

    const tests = await Test.find(query);
    const length = tests.length;
    res.send({ count: length });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

router.post("/tests", async (req, res) => {
  try {
    let test = new Test(req.body);
    test = await test.save();
    res.send(test);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

router.put("/tests/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const test = await Test.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(test);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/tests/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const test = await Test.findByIdAndDelete(req.params.id);
    res.send(test);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/popularServices", async (req, res) => {
  try {
    const tests = await Test.aggregate([
      {
        $project: {
          // reservation: 1,
          testName: 1,
          description: 1,
          imageURL: 1,
          arrayLength: { $size: "$reservation" },
        },
      },
      {
        $sort: { arrayLength: -1 },
      },
      {
        $limit: 6,
      },
    ]);
    res.send(tests);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
