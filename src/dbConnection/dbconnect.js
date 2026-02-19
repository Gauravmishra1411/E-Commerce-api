const mongoose = require("mongoose");
const connecct = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connection get successful");
  } catch (error) {
    console.log(error.message);
    console.error(message.error);
  }
};
module.exports = connecct;
