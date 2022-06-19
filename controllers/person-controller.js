const Persons = require("../models/personModel");

const findPersons = (query) => Persons.find(query);
const findPerson = (_id) => Persons.findById(_id);
const editPerson = (_id, amount) => {
  const sender = Persons.findById(_id);
  const receiver = Persons.findById(_id);
  
};

// const createProfile = (query) => Persons.create(query);
// const removeProfile = (_id) => Persons.findOneAndDelete({ _id });

module.exports = {
  findPersons,
  findPerson,
  editPerson,
  //   createProfile,
  //   removeProfile,
};
