const express = require("express");
const router = express.Router();

const {
  findPersons,
  findPerson,
  editPerson,
  checkTransfer,
  findByName,
  FinishTransfer,
} = require("../controllers/person-controller");

// Get All Persons
router.get("/", async (req, res) => {
  findPersons()
    .then((doc) => res.json(doc))
    .catch((err) => console.log(err));
});

//get one person  By ID
router.get("/:id",()=>{} ,async (req, res) => {
  const id = req.params.id;
  const person = await findPerson(id);
  //console.log(profile);
  res.json(person);
});
//get one person  By Name
router.get("/byName/:firstName", async (req, res) => {
  const firstName = req.params.firstName;
  const person = await findByName(firstName);
  res.json(person);
});

//----------------------------------------------------
// Create new Profile
// router.post("/createprofile", async (req, res, next) => {
//   const profile = req.body;
//   await createProfile(profile)
//     .then((doc) => res.json(doc))
//     .catch((err) => next(err));
// });

//----------------------------------------------------
//patch (Update) person
router.patch("/update/:id", async (req, res, next) => {
  const id = req.params.id;
  const person = req.body;
  await editPerson(id, person)
    .then((doc) => res.json(doc))
    .catch((err) => next(err));
});

//----------------------------------------------------
//Make Transfer Route
//--------------------------------------------
router.post("/check-Transfer", async (req, res) => {
  // const id = req.params.id;
  const { amountTransfer, nameReceiver, bankAcc } = req.body;
  console.log(req.body);
  await checkTransfer(amountTransfer, nameReceiver, bankAcc)
    .then((doc) => res.json(doc))
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

//----------------------------------------------------
//Finish Transfer Route
//--------------------------------------------
router.post("/finish-Transfer", async (req, res) => {
  // const id = req.params.id;
  const { amountTransfer, idSender, idReceiver } = req.body;
  console.log(req.body);
  await FinishTransfer(amountTransfer, idSender, idReceiver)
    .then((doc) => res.json(doc))
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

//----------------------------------------------------
//Delete profile
// router.delete("/delete/:id", (req, res, next) => {
//   const id = req.params.id;
//   removeProfile(id)
//     .then((doc) => res.json(doc))
//     .catch((err) => next(err));
// });

module.exports = router;
