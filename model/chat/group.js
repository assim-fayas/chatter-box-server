const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  groupName: {
    type: String,
    required: true
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Group', groupSchema);
