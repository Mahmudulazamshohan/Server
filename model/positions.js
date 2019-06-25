var mongoose = require('mongoose');

var PositionSchema = new mongoose.Schema({
    title: String,
    crew_id:mongoose.Schema.Types.ObjectId
});
var Positions  = mongoose.model("positions", PositionSchema);
module.exports = {Positions}