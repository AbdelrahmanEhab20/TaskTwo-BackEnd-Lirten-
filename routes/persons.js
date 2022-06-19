const express = require("express");
const router = express.Router();

const {
  findPersons,
  findPerson,
  editPerson,
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
  const profile = await findPerson(id);
  //console.log(profile);
  res.json(profile);
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
//patch (Update) profile
router.patch("/update/:id", async (req, res, next) => {
  const id = req.params.id;
  const profile = req.body;
  await editPerson(id, profile)
    .then((doc) => res.json(doc))
    .catch((err) => next(err));
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
