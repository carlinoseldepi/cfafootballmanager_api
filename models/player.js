var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({
    name:          { type: String, trim: true },
    description:   { type: String, trim: true },
    logo:          { type: String, trim: true },
    height:        { type: Number },
    weight:        { type: Number },
    phone:         { type: String, trim: true },
    image:         { type: String, trim: true },
    birthday:      { type: Date },
    foot:          { type: String, enum: ['right', 'left', 'both'] },
    position:      { type: String, enum: ['goalkeeper', 'defender', 'midfield', 'forward'] },
    dorsal:        { type: Number },
    team_id:       { type: Number },
    createdAt:     { type: Date, default: Date.now },
    updatedAt:     { type: Date },
    deletedAt:     { type: Date }
});

module.exports = mongoose.model('Player', playerSchema);