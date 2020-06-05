const mongoose = require("mongoose");

const meetingItemSchema = mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
  },
  name: { type: String },
  description: { type: String },
  status: { type: String, default: "open", enum: ["open", "closed"] },
  tags: { type: Array },
  votesYes: { type: Array },
  votesNo: { type: Array },
  defaultView: { type: String, default: "rating", enum: ["rating", "vote"] },
  rating: { type: Number, max: 5, min: 1 },
  inFocus: { type: Boolean, default: false },
});

module.exports = mongoose.model("MeetingItem", meetingItemSchema);
module.exports.meetingItemSchema = meetingItemSchema;
