const mongoose = require('mongoose');
const mongodb = require('mongodb');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true}
})
const User = mongoose.model("User", userSchema);

function saveNewUserToDatabase(username, response) {
  let newUser = new User({"username": username});
  console.log(`Writing ${newUser} to the database`);

  newUser.save((err, data) => {
    if (err) {
      console.error(err);
      response(err, null);
    }
    response(null, {_id: data._id, username: username});
  });
}

exports.saveNewUserToDatabase = saveNewUserToDatabase;