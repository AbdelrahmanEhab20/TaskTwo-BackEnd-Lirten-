const Persons = require("../models/personModel");

const findPersons = () => Persons.find();
const findPerson = (_id) => Persons.findById(_id);
const findByName = async (ReceiverName) => {
  const receiver = await Persons.findOne({ firstName: ReceiverName });
  if (receiver != null) {
    return receiver;
  } else {
    return;
  }
};
const editPerson = (_id, body) => Persons.findOneAndUpdate({ _id }, body);

// const createProfile = (query) => Persons.create(query);
// const removeProfile = (_id) => Persons.findOneAndDelete({ _id });
const checkTransfer = async (amountTransfer, nameReceiver, bankAcc) => {
  const sender = await Persons.findById({ _id: "62af2ee318eebeed601ef707" });
  const receiver = await Persons.findOne({ firstName: nameReceiver });
  console.log("Sent Name :" + nameReceiver);
  console.log(sender);
  console.log(receiver);
  //----------------------------
  //------------------------------------
  if (!sender) {
    //if id found then all data will be accessed ---> sender
    return { error: "There No User Account In This Id To send Money" };
  }
  if (receiver == null) {
    //if id found then all data will be accessed ---> receiver
    return { error: "This User Name Doesn't Exist" };
  }

  //Check The Amount Available fo transfer or not
  if (sender.amount < amountTransfer) {
    return { error: "You don't have this amount of money to transfer" };
  }
  //Check BankAcc
  if (receiver.bankAccount != bankAcc) {
    return { error: "Wrong Bank Account Number Enter Valid One" };
  } else {
    return { message: "Transfer Will be Made Successfully" };
  }
};

const FinishTransfer = async (amountTransfer, idSender, idReceiver) => {
  const sender = await Persons.findById(idSender);
  const receiver = await Persons.findById(idReceiver);

  console.log(sender);
  console.log(receiver);
  //-------------------------------------------
  var updateAmountReceiver = receiver.amount + amountTransfer;
  var updateAmountSender = sender.amount - amountTransfer;
  await Persons.findOneAndUpdate(
    {
      _id: idSender,
    },
    { amount: updateAmountSender }
  );
  await Persons.findOneAndUpdate(
    {
      _id: idReceiver,
    },
    { amount: updateAmountReceiver }
  );
  console.log(receiver);
  return { "Receiver Cash": updateAmountReceiver };
};
module.exports = {
  findPersons,
  findPerson,
  editPerson,
  checkTransfer,
  findByName,
  FinishTransfer,
};
