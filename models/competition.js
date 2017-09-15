var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var competitionSchema = new Schema({
    name:        { type: String, trim: true  },
    description: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    deletedAt: { type: Date }
});

module.exports = mongoose.model('Competition', competitionSchema);