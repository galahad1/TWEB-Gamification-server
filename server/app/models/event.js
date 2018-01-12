/**
 * Model of an event with an associated user, a number of points earned by the player,
 * the type of the event and its date
 * @author Tano Iannetta
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  username: String,
  score: Number,
  type: String,
  createdAt: { type: Date, default: Date.now }
});

EventSchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('Event', EventSchema);

