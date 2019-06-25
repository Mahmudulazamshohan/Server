var mongoose = require('mongoose');

var GameSchema = new mongoose.Schema({
    title: String,
    crew_id:mongoose.Schema.Types.ObjectId
});     
var Games  = mongoose.model("games", GameSchema);
module.exports = {Games}