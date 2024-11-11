const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(`MongoDb is connected to the host:${con.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDatabase;
