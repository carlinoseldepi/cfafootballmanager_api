var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name:      { type: String, trim: true  },
    username:  { type: String, trim: true },
    email:     { type: String, unique: true, lowercase: true, trim: true },
    password:  { type: String },
    token:     { type: String },
    image:     { type: String, trim: true },
    role:      { type: Number, enum: [1, 2], default: 2 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    deletedAt: { type: Date }
});

module.exports = mongoose.model('User', userSchema);