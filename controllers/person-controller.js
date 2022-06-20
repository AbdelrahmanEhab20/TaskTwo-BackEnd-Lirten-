const persons = require("../models/personModel");
const Persons = require("../models/personModel");

const findPersons = (query) => Persons.find(query);
const findPerson = (_id) => Persons.findById(_id);
const editPerson = (_id, body) => Persons.findOneAndUpdate({ _id }, body);

// const createProfile = (query) => Persons.create(query);
// const removeProfile = (_id) => Persons.findOneAndDelete({ _id });
const makeTransfer = async (idSender, amountTransfer, idReceiver) => {
  const sender = await Persons.findById({ _id: idSender });
  const receiver = await Persons.findById({ _id: idReceiver });
  //----------------------------
  // console.log(sender.firstName);
  // console.log(receiver.firstName);
  // console.log(amountTransfer);
  //------------------------------------
  if (!sender) {
    //if id found then all data will be accessed ---> sender
    return { message: "There No User Account In This Id To send Money" };
  }
  if (!receiver) {
    //if id found then all data will be accessed ---> receiver
    return { message: "There User Account In This Id To receive Money" };
  }

  //Check The Amount Available fo transfer or not
  if (sender.amount < amountTransfer) {
    return { message: "You don't have this amount of money to transfer" };
  } else {
    await console.log("Receiver Before :" + receiver.amount);
    console.log("Sender Before :" + sender.amount);
    const updateAmountReceiver = receiver.amount + amountTransfer;
    const updateAmountSender = sender.amount - amountTransfer;
    await Persons.findByIdAndUpdate(
      {
        _id: idSender,
      },
      { amount: updateAmountSender }
    );
    await Persons.findByIdAndUpdate(
      {
        _id: idReceiver,
      },
      { amount: updateAmountReceiver }
    );
    console.log("Receiver After :" + receiver.amount);
    console.log("Sender After :" + sender.amount);
    return { message: "Transfer Made Successfully" };
  }
};

module.exports = {
  findPersons,
  findPerson,
  editPerson,
  makeTransfer,
  //   createProfile,
  //   removeProfile,
};
