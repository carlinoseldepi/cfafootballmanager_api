var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
    name:          { type: String, trim: true },
    description:   { type: String, trim: true },
    logo:          { type: String, trim: true },
    email:         { type: String, trim: true, lowercase: true },
    address:       { type: String, trim: true },
    phone:         { type: String, trim: true },
    local:         { type: String, trim: true },
    image_local:   { type: String, trim: true },
    visitor:       { type: String, trim: true },
    image_visitor: { type: Strin, trim: trueg },
    image:         { type: String, trim: true },
    category:      { type: Number},
    stadium:       { type: String, trim: true },
    stadium_image: { type: String, trim: true },
    foundation:    { type: Number },
    createdAt:     { type: Date, default: Date.now },
    updatedAt:     { type: Date },
    deletedAt:     { type: Date }
});

module.exports = mongoose.model('Team', teamSchema);