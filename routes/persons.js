const express = require("express");
const router = express.Router();

const {
  findPersons,
  findPerson,
  editPerson,
  makeTransfer,
} = require("../controllers/person-controller");

// Get All Persons
router.get("/", async (req, res, next) => {
  findPersons({})
    .then((doc) => res.json(doc))
    .catch((err) => console.log(err));
});

//get one person  By ID
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  const person = await findPerson(id);
  //console.log(profile);
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
router.post("/Transfer", async (req, res) => {
  // const id = req.params.id;
  const { idSender, amountTransfer, idReceiver } = req.body;
  await makeTransfer(idSender, amountTransfer, idReceiver)
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
