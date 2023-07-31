const mongoose = require("mongoose");

const connect = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/NoteBookTest");
    console.log("connected to data base");
};
connect().catch((error) => {
  console.log(error);
});

module.exports = connect;
