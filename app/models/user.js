/**
 * Model of an user with an username and a score
 * @author Tano Iannetta
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {type: String, unique: true},
  score: Number
});

UserSchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('User', UserSchema);

